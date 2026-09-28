# Anime Dice Guide

Independent, fan-made player resource for **Anime Dice** on Roblox, published at
<https://anime-dice-roblox.github.io/>.

The site covers the questions players actually search for: codes status, tier list logic,
traits, grades, mutations, rebirth timing and a beginner walkthrough. It is not affiliated
with Roblox or with the game's developer, More & More Games.

## Requirements

- Node.js 22 or newer
- npm

## Local development

```bash
npm ci
npm run dev
```

The dev server runs at <http://localhost:3000>.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run validate` | Content/config validation plus the cleanliness audit |
| `npm run build:site` | Static export via `next build` plus post-build steps |
| `npm run audit:seo` | Audit the exported HTML for SEO and link problems |
| `npm run build` | `validate` + `build:site` + `audit:seo` |

`npm run build` must pass before anything is deployed.

## Content

All page content lives in data files, so pages can be edited without touching components:

| Path | Contents |
| --- | --- |
| `content/data/site.json` | Site name, hosting URLs, game facts, assets, SEO defaults |
| `content/data/home.json` | Homepage copy, sections and FAQ |
| `content/data/pages.json` | The eight guide pages (metadata, sections, tables, FAQ) |
| `content/data/integrations.json` | Google Analytics measurement ID and optional site-verification tokens |
| `content/legal.ts` | About, privacy, terms and copyright pages |

Content is maintained from game-specific source research rather than copied wholesale from
third-party pages. Fast-changing facts should be cross-checked before publishing.

Adding a page means adding an entry to `content/data/pages.json`. The registry, sitemap,
navigation and footer all read from that file, and `npm run validate` will fail if a page
is orphaned or links to a slug that does not exist.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which validates, builds and publishes
the static export to GitHub Pages.

The production origin is `content/data/site.json`. The deploy workflow does not override
`siteUrl`, `basePath`, or `customDomain`. The Google Analytics measurement ID lives in
`content/data/integrations.json`.

Optional values still come from repository variables and secrets (nothing secret is committed):

- Variable: `NEXT_PUBLIC_THEME_PRESET`
- Secrets: `NEXT_PUBLIC_ADSTERRA_NATIVE_SCRIPT_URL`, `NEXT_PUBLIC_ADSTERRA_NATIVE_CONTAINER_ID`, `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`

Copy `.env.example` to `.env.local` for a local override. Leave a value blank to keep the
committed default. `NEXT_PUBLIC_GA_MEASUREMENT_ID` overrides the measurement ID only when it
is non-empty.

### Hosting notes

- The site is a static export (`output: "export"`) with `trailingSlash: true`, so every
  page is written as `<slug>/index.html`.
- Canonical URLs, the sitemap and Open Graph tags are derived from `hosting.siteUrl`.
- This repository is the GitHub user site, so `basePath` stays empty and `customDomain` stays null.
- A local `NEXT_PUBLIC_CUSTOM_DOMAIN` still writes a `CNAME` file if you set one outside production.

## Project layout

```
app/           Next.js App Router entry points, sitemap, robots, manifest
components/    Page and layout components
config/        Site config, theme tokens, content type definitions
content/       Page content and the content registry
lib/           URL, SEO, schema and font helpers
public/        Images and self-hosted fonts
scripts/       Validation and audit scripts run by npm scripts and CI
```
