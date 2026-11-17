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
