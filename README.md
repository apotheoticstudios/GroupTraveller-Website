# GroupTraveller

A polished, responsive product site for the GroupTraveller mobile app. It
explains the create–share–vote flow, includes an interactive product demo,
showcases the post-decision planning toolkit, and is designed to deploy directly
to Cloudflare Workers or Pages. The production site also includes an App Store-ready
privacy policy at `/privacy`, with account and guest data disclosures, device
permissions, third-party service providers, retention, privacy rights, and
account-deletion instructions.

## Stack

- React 19 + TypeScript
- Vite 8
- Lucide React icons
- Hand-authored responsive CSS
- No server, database, runtime secrets, or external API dependency

## Run locally

Requirements: Node.js 20.19 or newer.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Production build

```bash
npm test
```

This performs the TypeScript check and creates the deployable static site in
`dist/`.

## Deploy to Cloudflare

The live `grouptraveller` Worker uses Cloudflare Workers Builds. Its
`wrangler.jsonc` publishes the Vite output in `dist/` as static assets and sends
unknown paths such as `/privacy` to the React app.

### Connect a Git repository

1. Push this repository to GitHub.
2. In the Cloudflare dashboard, open the `grouptraveller` Worker and choose
   **Settings → Build → Connect**.
3. Select `apotheoticstudios/GroupTraveller-Website` and use:
   - Production branch: `main`
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
   - Root directory: leave blank
4. Save and deploy.

No environment variables are required. A push to `main` starts a production
build and deployment. Other branches can create preview builds when
non-production branch builds are enabled.

### Direct upload

Build locally with `npm run build`, then drag the generated `dist/` folder into
the Worker's **New deployment** screen. Under **Advanced settings**, set
**Not found handling** to `single-page-application` so `/privacy` and other
client-side routes load correctly.

## Custom domain

After the first deployment, open the Worker, choose **Domains → Add a domain**,
and enter the intended hostname. The production Worker is connected to
`grouptraveller.app`.

## Contact form

The site remains backend-free: submitting the app-access form opens the
visitor's email application with their address prefilled to
`hello@grouptraveller.com`. Replace that inbox and wire the real App Store and
Google Play URLs in `src/App.tsx` before the public app launch.

## Image credits

Photography is downloaded into `public/images/` so the deployed site has no
image-CDN dependency. Photos are used under the
[Unsplash License](https://unsplash.com/license):

- [Justin Buisson](https://unsplash.com/photos/vIluu0IH6Ps)
- [Hikerwise.com](https://unsplash.com/photos/l3fkqYm1_5E)
- [Markus Spiske](https://unsplash.com/photos/V2f98ETXFTo)
