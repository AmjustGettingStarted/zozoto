<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your Next.js app

This is a Next.js App Router migration of the Zozoto marketing app. Existing component markup, Tailwind classes, animation settings, and responsive behavior are kept intact.

View your app in AI Studio: https://ai.studio/apps/26df4d7c-d569-43a3-8c96-1968ea099084

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Project structure

- `app/` contains the App Router layout, page entrypoint, and global Tailwind CSS.
- `components/` contains the existing UI components.
- `lib/` contains browser-only helpers such as the Lenis provider.
- `content.ts` contains the shared marketing content.
- `public/` is reserved for static assets.

The project intentionally has no `src/` directory. The old Vite-only files
`index.html`, `vite.config.ts`, and `src/main.tsx` were removed; `metadata.json`
was migrated into `app/layout.tsx`.

## Production

```bash
npm run build
npm run start
```
