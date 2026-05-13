import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const pagePath = path.join(root, 'src/app/page.tsx');
const logoDir = path.join(root, 'public/logos');
const manifestPath = path.join(root, 'src/app/projectLogos.json');

const source = await readFile(pagePath, 'utf8');
const dealsSource = source.slice(0, source.indexOf('const thoughts'));
const deals = [...dealsSource.matchAll(/title:\s*'([^']+)'[\s\S]*?website:\s*'([^']+)'/g)]
  .map(([, title, website]) => ({ title, website }));

const overrides = {
  Collie: {
    website: 'https://www.collie.eu/',
    candidates: [
      'https://cdn.prod.website-files.com/67926f6051d52946b93dfd03/679a01a201a698790b22b85e_collie_logo_black.svg',
    ],
  },
  Owlin: {
    candidates: [
      'https://owlin.com/wp-content/uploads/2025/03/header.svg',
      'https://cdn.shortpixel.ai/spai/q_lossy+ret_img/owlin.com/wp-content/uploads/2025/03/header.svg',
    ],
  },
  Evert: {
    candidates: [
      'https://evert.com/assets/evert-logo-BtsjZT8h.svg',
      'https://evert.com/assets/evert-logo-dark-hxgGCD5I.svg',
    ],
  },
  Junea: {
    candidates: [
      'https://junea.nl/wp-content/themes/junea/img/icons/junea.svg',
    ],
  },
  Tarnoc: {
    candidates: [
      'https://tarnoc.nl/wp-content/uploads/2026/03/tarnoc.svg',
    ],
  },
};

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const absoluteUrl = (src, base) => {
  try {
    return new URL(src, base).toString();
  } catch {
    return null;
  }
};

const extensionFor = (url, contentType) => {
  if (contentType.includes('svg')) return 'svg';
  if (contentType.includes('png')) return 'png';
  if (contentType.includes('webp')) return 'webp';
  if (contentType.includes('avif')) return 'avif';
  if (contentType.includes('jpeg') || contentType.includes('jpg')) return 'jpg';
  const pathname = new URL(url).pathname;
  const ext = pathname.split('.').pop()?.toLowerCase();
  return ['svg', 'png', 'webp', 'jpg', 'jpeg'].includes(ext || '') ? ext.replace('jpeg', 'jpg') : 'png';
};

const candidatesFromHtml = (html, base) => {
  const candidates = [];

  for (const match of html.matchAll(/<img\b([^>]+)>/gi)) {
    const attrs = match[1];
    const src = attrs.match(/\s(?:src|data-src|data-lazy-src)=["']([^"']+)["']/i)?.[1];
    if (!src) continue;
    const url = absoluteUrl(src, base);
    if (!url) continue;
    const text = attrs.toLowerCase();
    let score = 0;
    if (/logo|brand|identity/.test(text)) score += 80;
    if (/header|nav|navbar|site/.test(text)) score += 20;
    if (/logo|brand/.test(url.toLowerCase())) score += 50;
    if (/svg/i.test(url)) score += 15;
    candidates.push({ url, score });
  }

  for (const match of html.matchAll(/<link\b([^>]+)>/gi)) {
    const attrs = match[1];
    const href = attrs.match(/\shref=["']([^"']+)["']/i)?.[1];
    const rel = attrs.match(/\srel=["']([^"']+)["']/i)?.[1]?.toLowerCase() || '';
    if (!href || !/icon|mask-icon|apple-touch-icon/.test(rel)) continue;
    const url = absoluteUrl(href, base);
    if (url) candidates.push({ url, score: rel.includes('apple') ? 35 : 25 });
  }

  const ogImage = html.match(/<meta\b[^>]*(?:property|name)=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i)?.[1];
  const ogUrl = ogImage ? absoluteUrl(ogImage, base) : null;
  if (ogUrl) candidates.push({ url: ogUrl, score: 15 });

  return candidates
    .sort((a, b) => b.score - a.score)
    .filter((candidate, index, all) => all.findIndex(item => item.url === candidate.url) === index);
};

const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'user-agent': 'Mozilla/5.0 logo asset fetcher',
        accept: options.accept || '*/*',
      },
      redirect: 'follow',
    });
  } finally {
    clearTimeout(timeout);
  }
};

await mkdir(logoDir, { recursive: true });

const manifest = [];

for (const deal of deals) {
  const slug = slugify(deal.title);
  const override = overrides[deal.title];
  const website = override?.website || deal.website;
  console.log(`Fetching ${deal.title}`);

  try {
    const page = await fetchWithTimeout(website, { accept: 'text/html,image/*' });
    const finalUrl = page.url || website;
    const html = await page.text();
    const domain = new URL(finalUrl).hostname.replace(/^www\./, '');
    const candidates = [
      ...(override?.candidates || []).map(url => ({ url, score: 200 })),
      ...candidatesFromHtml(html, finalUrl),
    ];

    let asset = null;
    for (const candidate of candidates.slice(0, 12)) {
      try {
        const response = await fetchWithTimeout(candidate.url, { accept: 'image/*,*/*' });
        if (!response.ok) continue;
        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('image') && !candidate.url.endsWith('.svg')) continue;

        const buffer = Buffer.from(await response.arrayBuffer());
        if (buffer.length < 300) continue;

        const ext = extensionFor(candidate.url, contentType);
        const fileName = `${slug}.${ext}`;
        await writeFile(path.join(logoDir, fileName), buffer);
        asset = `/logos/${fileName}`;
        break;
      } catch {
        continue;
      }
    }

    manifest.push({
      title: deal.title,
      domain,
      logo: asset,
    });
  } catch (error) {
    manifest.push({
      title: deal.title,
      domain: new URL(website).hostname.replace(/^www\./, ''),
      logo: null,
    });
    console.warn(`Failed ${deal.title}: ${error.message}`);
  }
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Wrote ${manifestPath}`);
