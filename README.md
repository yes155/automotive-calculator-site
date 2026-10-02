# Automotive Calculators

A static Astro + TypeScript site with eight calculators and five supporting guides. Formula modules live in `src/lib/calculators/`; the shared browser binder handles validation, unit changes, results, URL inputs, and reset.

## Local development

Use Node 22.12 or newer.

```sh
npm ci
npx playwright install chromium
npm run dev -- --background
```

The server prints its URL. Use `npm run dev -- status`, `npm run dev -- logs`, and `npm run dev -- stop` to manage it. To inspect a static build, run `npm run build` followed by `npm run preview`.

## Verification

```sh
npm test
npm run build
npx playwright test --reporter=list
```

Playwright builds and serves static output on port 4323. Its deployment origin is an isolated test fixture, `https://autocalc.test`. `CHROMIUM_EXECUTABLE_PATH` can select an existing Chromium installation when the standard browser download is unavailable.

The browser suite checks every calculator, invalid-input recovery, unit conversion, links that restore inputs, reset without navigation, metadata, internal links and fragments, and all pages at a 320px viewport.

## Deployment configuration

Set `SITE_URL` to the real HTTPS origin assigned to the project. Do not use the test fixture or an example domain for deployment. Set `SITE_NOINDEX=true` for previews. For production indexing, set it to `false` or leave it unset.

These values are read during the build. Rebuild after changing them. Without an origin, pages are marked `noindex, nofollow`, robots disallows crawling, the sitemap is empty, and no fabricated absolute canonical or structured-data URLs are emitted.

Cloudflare Pages build command: `npm run build`. Output directory: `dist`. Configure the environment variables for each deployment environment. Publishing this Git branch does not deploy or merge it into `master`.

## Build references

`docs/` preserves the approved automotive handoff and shared calculator-site conventions. `docs/BUILD-STATUS.md` records current progress and decisions that refine the older plan.
