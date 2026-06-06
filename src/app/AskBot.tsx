'use client';

import React, { useState, useRef, useEffect } from 'react';

type Msg = { role: 'user' | 'assistant'; content: string };

const GREETING = "Hi. I'm Simon's bot. Ask me about his work, projects, writing, or for a silly economics joke.";
const SUGGESTIONS = ['What does Simon do?', 'Which deals has he worked on?', 'What does he write about?'];

export default function AskBot({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [panelTop, setPanelTop] = useState<number | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Anchor the panel just below the last nav link ("Contact"), with breathing
  // room, so it tucks under the navigation instead of covering it.
  useEffect(() => {
    if (!open) return;
    const measure = () => {
      if (window.innerWidth <= 720) { setPanelTop(null); return; }
      const links = document.querySelectorAll('.sidebar nav a');
      const last = links[links.length - 1] as HTMLElement | undefined;
      setPanelTop(last ? Math.round(last.getBoundingClientRect().bottom + 22) : null);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [open]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    const next: Msg[] = [...messages, { role: 'user', content: q }];
    setMessages([...next, { role: 'assistant', content: '' }]);
    setInput('');
    setBusy(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok || !res.body) {
        let msg = 'Hmm, something broke on my end. Try again in a moment.';
        if (res.status === 429) {
          msg = 'Easy now, too many questions at once. Give it a minute.';
        } else {
          try {
            const t = (await res.text()).trim();
            if (t) msg = t;
          } catch {
            /* keep the generic message */
          }
        }
        setMessages((m) => updateLast(m, msg));
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => updateLast(m, acc));
      }
    } catch {
      setMessages((m) => updateLast(m, 'Something went wrong. Try again.'));
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  if (!open) return null;

  return (
    <div
      className="askbot-panel"
      role="dialog"
      aria-label="Site assistant"
      style={panelTop != null ? ({ ['--askbot-top']: `${panelTop}px` } as React.CSSProperties) : undefined}
    >
      <div className="askbot-head">
        <span className="askbot-dot" />
        <span>Ask me anything</span>
        <button className="askbot-close" onClick={onClose} aria-label="Close">✕</button>
      </div>

      <div className="askbot-log" ref={logRef}>
        <div className="askbot-msg bot">{GREETING}</div>
        {messages.length === 0 && (
          <div className="askbot-suggest">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => send(s)} disabled={busy}>{s}</button>
            ))}
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`askbot-msg ${m.role === 'user' ? 'user' : 'bot'}`}>
            {m.content || (m.role === 'assistant' && busy ? <span className="askbot-typing">…</span> : '')}
          </div>
        ))}
      </div>

      <form
        className="askbot-form"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question…"
          maxLength={1500}
          autoComplete="off"
        />
        <button className="askbot-send" type="submit" disabled={busy || !input.trim()}>↗</button>
      </form>
      <div className="askbot-foot">Disclaimer: may contain undertones of sarcasm, dry humour, or bad economist jokes.</div>
    </div>
  );
}

function updateLast(list: Msg[], content: string): Msg[] {
  const copy = list.slice();
  for (let i = copy.length - 1; i >= 0; i--) {
    if (copy[i].role === 'assistant') {
      copy[i] = { ...copy[i], content };
      break;
    }
  }
  return copy;
}
