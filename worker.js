/* josiahkoplick.com Worker.
   Static files are served straight from the assets folder; this script only
   runs for paths that are not files. It adds one endpoint:
     GET /api/essays  ->  the newest Substack posts as JSON, cached for an hour. */

const FEED = "https://josiahkoplick.substack.com/feed";
const LIMIT = 3;
const TTL = 3600;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/essays") return essays(request, ctx);
    return env.ASSETS.fetch(request);
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
