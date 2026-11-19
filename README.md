# josiahkoplick.com

House index for Josiah Koplick. One page, plain HTML. The Hidden Forge stays on its own site.

## Publish

The site is a Cloudflare Worker with static assets, deployed from this repo with `npx wrangler deploy`.
The domain is registered at Namecheap and uses Cloudflare nameservers. `josiahkoplick.com` and `www` are
custom domains on the Worker; `www` is redirected to the bare domain by `worker.js`.

Email forwarding, if wanted, is turned on inside Cloudflare Email Routing. The destination inbox stays there.

## How it runs

Cloudflare Workers with static assets (`wrangler.jsonc`). Files are served as-is. `worker.js` only answers
paths that are not files. Right now that is one endpoint, `/api/essays`, which reads the Substack feed and
returns the newest three posts, cached for an hour. `js/essays.js` fills the "Latest from the desk" section
from it. If the feed fails, the section stays hidden. `.assetsignore` keeps the Worker, config and README
off the public site. `worker.js` also adds security headers (CSP, HSTS, nosniff, referrer and permissions policies; the CSP also allows Cloudflare Web Analytics)
to every response; the CSP allows only this site's own scripts, styles, fonts and images, so any new
external resource must be added there. Fonts are self-hosted in `fonts/` (latin subset), with no calls to Google.

`og.png` is the 1200×630 card shown when the link is shared. `DESIGN.md` is the full design system (colors, type, components, motion, voice) for making anything else in this style.

Every request runs through `worker.js` first (`run_worker_first`), so `www.` gets a 301 to the bare domain.
Any address that is not a file gets `404.html`, styled like the index, with a real 404 status.

## Backups

`backup/forge-2026-11-17` is the site exactly as it was before the essays, preview card and Worker were
added. To go back, point `main` at that branch, or deploy it directly.
