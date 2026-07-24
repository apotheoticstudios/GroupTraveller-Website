# GroupTraveller

A polished, responsive product site for the GroupTraveller mobile app. It
explains the create–share–vote flow, includes an interactive product demo,
showcases the post-decision planning toolkit, and is designed to deploy directly
to Cloudflare Pages.

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

## Deploy to Cloudflare Pages

### Connect a Git repository

1. Push this repository to GitHub or GitLab.
2. In the Cloudflare dashboard, open **Workers & Pages** and choose
   **Create application → Pages → Connect to Git**.
3. Select the repository and use:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: leave blank
4. Save and deploy.

No environment variables are required. Cloudflare will automatically create a
preview URL for each branch and a production deployment from the production
branch.

### Direct upload

Build locally with `npm run build`, then drag the generated `dist/` folder into
a new Cloudflare Pages project using **Create application → Get started → Drag
and drop your files**. Choose this route only if you do not need Git-triggered
deployments; Cloudflare does not currently let a Direct Upload project switch to
Git integration later.

## Custom domain

After the first deployment, open the Pages project, choose **Custom domains →
Set up a domain**, and enter the intended hostname. Apex domains must use
Cloudflare nameservers. For a subdomain using another DNS provider, create the
CNAME Cloudflare shows after associating the hostname with the Pages project.

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
