/* josiahkoplick.com Worker.
   Every request passes through here first (run_worker_first), so www can be
   sent to the bare domain. Everything else goes to the static files, plus:
     GET /api/essays  ->  the newest Substack posts as JSON, cached for an hour.
   Every response also gets the security headers below. */

const FEED = "https://josiahkoplick.substack.com/feed";
const LIMIT = 3;
const TTL = 3600;

const SECURITY = {
  "content-security-policy":
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; " +
    "connect-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
  "strict-transport-security": "max-age=31536000; includeSubDomains",
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "cross-origin-opener-policy": "same-origin",
};

function secure(res) {
  const out = new Response(res.body, res);
  for (const [k, v] of Object.entries(SECURITY)) out.headers.set(k, v);
  return out;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.hostname.startsWith("www.")) {
      url.hostname = url.hostname.slice(4);
      return secure(Response.redirect(url.toString(), 301));
    }
    if (url.pathname === "/api/essays") return secure(await essays(request, ctx));
    return secure(await env.ASSETS.fetch(request));
  },
};

async function essays(request, ctx) {
  const cache = caches.default;
  const key = new Request(new URL("/api/essays", request.url).toString());
  const hit = await cache.match(key);
  if (hit) return hit;

  let posts = [];
  try {
    const res = await fetch(FEED, { headers: { "User-Agent": "josiahkoplick.com" } });
    if (res.ok) posts = parse(await res.text()).slice(0, LIMIT);
  } catch (e) {
    posts = [];
  }

  const body = JSON.stringify({ posts });
  const out = new Response(body, {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": posts.length ? `public, max-age=${TTL}` : "public, max-age=60",
    },
  });
  if (posts.length) ctx.waitUntil(cache.put(key, out.clone()));
  return out;
}

export function parse(xml) {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
  return items
    .map((it) => ({
      title: field(it, "title"),
      subtitle: field(it, "description"),
      url: field(it, "link"),
      date: new Date(field(it, "pubDate")).toISOString(),
    }))
    .filter((p) => p.title && /^https:\/\//.test(p.url))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function field(xml, tag) {
  const m = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  if (!m) return "";
  let v = m[1].trim();
  const cdata = v.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  v = cdata ? cdata[1] : decode(v);
  return v.trim();
}

function decode(s) {
  return s
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'").replace(/&amp;/g, "&");
}
