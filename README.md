# Swati & Anil — Wedding Invitation

A single-page, animated wedding invitation (static HTML/CSS/JS — no server or Flask needed).
Deploys for free on **GitHub Pages**, served on your own subdomain via **Cloudflare DNS**.

## Files
- `index.html` — content & structure
- `style.css` — theme, layout, animations
- `script.js` — countdown timer, scroll reveals, petal/toran effects
- `CNAME` — tells GitHub Pages this site should answer to `invitation.mfgtech.in`

## 1. Push to GitHub
```bash
git init
git add .
git commit -m "Wedding invitation site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## 2. Enable GitHub Pages
1. Go to your repo → **Settings → Pages**.
2. Under "Build and deployment", set **Source: Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`. Save.
4. Under **Custom domain**, enter `invitation.mfgtech.in` and save
   (this matches the `CNAME` file already in the repo — GitHub will recreate/keep it in sync).
5. Wait a minute, then tick **Enforce HTTPS** once it becomes available (needs DNS below to be live first).

## 3. Point Cloudflare DNS at GitHub Pages
In the Cloudflare dashboard for `mfgtech.in` → **DNS**, add:

| Type  | Name         | Content                  | Proxy status |
|-------|--------------|---------------------------|--------------|
| CNAME | `invitation` | `<your-username>.github.io` | DNS only (grey cloud) *initially* |

Notes:
- Use your GitHub Pages default host (`<username>.github.io`) as the target — GitHub matches the request to this repo using the `CNAME` file.
- Keep the record **"DNS only" (grey cloud, not orange)** while GitHub issues the SSL certificate for your custom domain. Once "Enforce HTTPS" is available/enabled in GitHub Pages settings, you can switch the record to **Proxied (orange cloud)** if you want Cloudflare's CDN/caching in front of it — this stays free.
- Propagation is usually a few minutes; occasionally up to ~24 hours.

## 4. Verify
Visit `https://invitation.mfgtech.in` — you should see the invitation live.

## Editing content later
All text is in `index.html` (Marathi, plain HTML — no build step). Colors/fonts/animation timing are in `style.css` under `:root` at the top. The countdown target date is set in `script.js` (`initCountdown`) as `2026-07-24T18:00:00+05:30`.

## Why not Flask?
GitHub Pages only serves static files — it cannot run Python/Flask. Since this invitation has no dynamic backend need (no database, no user accounts), a static site achieves the same result at zero cost. If you later want an RSVP form that actually stores responses server-side, that would need a Python-capable host (e.g. Render, PythonAnywhere free tier) instead of GitHub Pages — happy to help set that up separately if you want it.
