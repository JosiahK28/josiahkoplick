# josiahkoplick.com

House index for Josiah Koplick. One page, plain HTML. The Hidden Forge stays on its own site.

## Publish

The name is registered at Namecheap. DNS is still Namecheap parking until the nameservers change.

1. Push this folder to a public GitHub repo.
2. In Cloudflare, add the site on the Free plan and create a Pages project from that repo. Framework preset: None. Output directory: `/`.
3. In Pages, set the custom domain to `josiahkoplick.com`.
4. In Namecheap, set the domain to Custom DNS and replace the `registrar-servers.com` nameservers with the two Cloudflare gives you.
5. After the domain answers, attach `www` as well if Pages offers it, and send `www` to the bare domain.

Email forwarding, if wanted, is turned on inside Cloudflare. The destination inbox stays there.

## How it runs

Cloudflare Workers with static assets (`wrangler.jsonc`). Files are served as-is. `worker.js` only answers
paths that are not files. Right now that is one endpoint, `/api/essays`, which reads the Substack feed and
returns the newest three posts, cached for an hour. `js/essays.js` fills the "Latest from the desk" section
from it. If the feed fails, the section stays hidden. `.assetsignore` keeps the Worker, config and README
off the public site.

`og.png` is the 1200×630 card shown when the link is shared.

## Backups

`backup/forge-2026-11-17` is the site exactly as it was before the essays, preview card and Worker were
added. To go back, point `main` at that branch, or deploy it directly.
