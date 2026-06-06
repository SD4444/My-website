import Anthropic from '@anthropic-ai/sdk';
import { PERSONA, SITE_CONTENT } from '../../botContent';

export const runtime = 'nodejs';
export const maxDuration = 30;

// Model: claude-haiku-4-5 — fast and cost-effective for public site Q&A.
// Swap to 'claude-opus-4-8' for higher-quality (but ~5x pricier) answers.
const MODEL = 'claude-haiku-4-5';
const MAX_OUTPUT_TOKENS = 1024;

// ----- input limits -----
const MAX_TURNS = 16;          // total messages in a conversation
const MAX_CHARS_PER_MSG = 1500;

// ----- simple per-IP rate limit (best-effort; in-memory, per server instance) -----
const WINDOW_MS = 60_000;
const MAX_REQ_PER_WINDOW = 10;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_REQ_PER_WINDOW;
}

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from the environment

type Msg = { role: 'user' | 'assistant'; content: string };

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response('The bot is not configured yet (missing API key).', { status: 503 });
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'local';
  if (rateLimited(ip)) {
    return new Response('Too many messages — give it a minute.', { status: 429 });
  }

  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response('Bad request.', { status: 400 });
  }

  const raw = Array.isArray(body.messages) ? body.messages : [];
  const messages: Msg[] = raw
    .filter(
      (m): m is Msg =>
        !!m &&
        typeof (m as Msg).content === 'string' &&
        ((m as Msg).role === 'user' || (m as Msg).role === 'assistant'),
    )
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS_PER_MSG) }));

  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    return new Response('Bad request.', { status: 400 });
  }

  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: MAX_OUTPUT_TOKENS,
    system: [
      { type: 'text', text: PERSONA },
      // Large, stable site content — cached so every request after the first
      // reads it at ~10% cost. cache_control on the last system block caches
      // the whole persona+content prefix together.
      { type: 'text', text: SITE_CONTENT, cache_control: { type: 'ephemeral' } },
    ],
    messages,
  });

  const encoder = new TextEncoder();
  const rs = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            // Simon hates em dashes — strip them even if the model slips one in.
            const clean = event.delta.text.replace(/\s*—\s*/g, ', ');
            controller.enqueue(encoder.encode(clean));
          }
        }
      } catch (err) {
        console.error('chat stream error', err);
        controller.enqueue(encoder.encode('\n\n[Something went wrong. Try again in a moment.]'));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(rs, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
