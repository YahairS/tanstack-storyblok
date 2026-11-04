# Project context

Website built with **TanStack Start** (React) using **Storyblok** as headless CMS.

## Stack

- **Framework:** TanStack Start (React, Vite, TanStack Router). Deployment adapter: Vercel.
- **CMS SDK:** `@storyblok/react` **v7**. Uses `storyblokInit` + `apiPlugin`.
  - Do NOT use the v8 API (`defineStoryblokBlocks`, `@storyblok/api-client`) unless we explicitly decide to migrate.
- **Storyblok region:** EU (`apiOptions.region: 'eu'`).
- **Storyblok CLI:** v4, installed as devDependency (`npx storyblok …`). Config in `storyblok.config.ts`.
- **Linting:** ESLint (TanStack config).
- **Local dev runs on HTTPS** (`@vitejs/plugin-basic-ssl`), required by the Storyblok Visual Editor.

## Current structure

- `src/lib/storyblok.ts` — `storyblokInit` and block registration (`components` map). Imported in `src/routes/__root.tsx`.
- `src/lib/fetch-story.ts` — `fetchStory(slug)`: fetches a story from the CDN API, returns `{ story }`, throws `notFound()` on 404.
- `src/lib/storyblok-types.ts` — re-exports the generated block interfaces so they can be imported as `@/lib/storyblok-types`. `@/` resolves to `src/` only, and the generated file sits outside it; this also keeps the space id in one place. Add new blocks to its export list.
- `src/lib/utils.ts` — re-exports `cn` from the `cn` package.
- `src/components/StoryView.tsx` — renders a story with `useStoryblokState` (live updates in Visual Editor) + `StoryblokComponent`.
- `src/components/ui/` — shadcn primitives (`button`, `card`). Generated, excluded from ESLint, never hand-edited.
- `src/components/ContentCard.tsx` — presentational card: optional `title`, `description`, `imageSrc`, `imageAlt`, knows nothing about Storyblok, forwards unknown props to its root.
- `src/routes/index.tsx` — home, loads the `home` story.
- `src/routes/$.tsx` — catch-all route, loads the story matching the URL path (`params._splat`).
- `src/routes/ui.tsx` — `/ui`, development sandbox for the primitives and `ContentCard`. Not a page of the site.
- `src/storyblok/` — React components for Storyblok blocks (`Page`, `Grid`, `Teaser`, `Feature`, `ImageCard`). `Page` and `Grid` are the components; `Feature` and `ImageCard` are adapters over `ContentCard`.
- `.storyblok/components/` — block schemas pulled from Storyblok (versioned).
- `.storyblok/types/` — generated TypeScript types (versioned).
- `public/placeholder.svg` — placeholder image for the sandbox, so it works without network access.

## Architecture

The component architecture (how UI components and Storyblok blocks are organized) is **still to be defined with the team**. Do not introduce new architectural patterns, folder structures or conventions without asking first.

## Environment variables

Defined in `.env` (never committed). `.env.example` lists them empty.

- `VITE_STORYBLOK_TOKEN` — space access token (Preview). Exposed to the client.
- `STORYBLOK_SPACE_ID` — used by the Storyblok CLI.

## Commands

- `npm run dev` — dev server (`https://localhost:3000`).
- `npm run lint` — ESLint.
- `npm run sb:pull` — download block schemas from Storyblok.
- `npm run sb:types` — generate TypeScript types from the pulled schemas.
- `npm run sb:sync` — both of the above. Run it after any block change in Storyblok.

## Conventions

- **Content version:** `draft` in development, `published` in production (`import.meta.env.DEV`).
- **Block field names** must match the Storyblok schema exactly. Check `.storyblok/components/` or the generated types; never guess field names.
- **Block registration:** keys in the `components` map must match the block's technical name in Storyblok.
- Every block component's root element spreads `storyblokEditable(blok)` so it is clickable in the Visual Editor.
- **Do not rename block technical names or fields** without a content migration: renaming does not migrate existing stories.
- Schema changes go through a PR together with the generated types and the related component.
- **Import alias:** use `@/` for anything under `src/` (`@/components/ui/card`, not `../components/ui/card`). `tsconfig.json` maps both `@/*` and `#/*` to `./src/*`, and Vite resolves them through `resolve: { tsconfigPaths: true }`. Keep `#/` for the paraglide imports only (`#/paraglide/runtime`, `#/paraglide/messages`): `#/*` is also declared in `package.json` `imports`, so it is a Node subpath import, which is what the paraglide + TanStack i18n example uses. Nothing enforces this — ESLint has no rule for it. The 14 pre-existing relative imports are still to be migrated.

## Security

- Never commit `.env` or any token.
- The Storyblok CLI uses a Personal Access Token (stored by `storyblok login`), separate from the space access token. Never print, log or commit it.

## Deployment

Hosted on Vercel, on the **Hobby** plan, which cannot connect to a private repository owned by a GitHub organization. The Vercel project is therefore imported from **`YahairS/tanstack-storyblok`** (private, personal account), not from the org repo.

- `origin` points at that personal repo, and `main` tracks it, so a plain `git push` deploys.
- `main` is the production branch; any other branch gets a preview deployment with its own URL.
- `VITE_STORYBLOK_TOKEN` is set in Vercel for **Production and Preview**, holding the Storyblok **Public** token. Not for Development: `vercel env pull` would overwrite the local `.env`, which holds the Preview token the Visual Editor needs.
- The build runs `vite build` on Vercel, so ESLint never runs there; lint warnings in the install log do not affect the deployment.
- `Digital360-Connect/tanstack-storyblok` is no longer configured as a remote and goes stale. Re-add it with `git remote add d360 git@github.com:Digital360-Connect/tanstack-storyblok.git`.

## Known issues / pending

- **`happy-dom` vulnerability** (via `@storyblok/richtext` → `@tiptap/html`). If no fixed `@storyblok/react` release is available, apply an npm `overrides` for `happy-dom` (`^21.0.4`) and test rich text rendering. Do not run `npm audit fix --force`.
- **`postcss-selector-parser`** moderate vulnerability (via `@tailwindcss/typography`): build-time only, accepted.
- **ESLint peer dependency warnings** (`@tanstack/eslint-config` expects ESLint 10): harmless.
- **Stale published content on Vercel after publishing in Storyblok.** `storyblok-js-client` tracks the Storyblok cache version (`cv`) per token in a module-level variable, and the default config is `{ clear: "manual" }`, which never refreshes it. A warm serverless instance therefore keeps requesting the snapshot it first saw, so a story published afterwards is not served. It does not show up locally: the dev server restarts often and asks for `draft`, which is not affected.
  Confirmed on 2026-11-03 — the deployment served content published the previous day while the API returned the current one. A redeploy fixes it, because new instances start with a fresh `cv`.
  `apiOptions.cache = { clear: 'auto', type: 'memory' }` is the obvious candidate, but it was **not** verified: the auto-flush triggers on the space version, which the client only reads from `/cdn/spaces/me` responses, not from ordinary content requests. Do not add it without testing that it actually fires in this flow.
  The real fix is an architectural decision still to be made with the team: cache deliberately and have a Storyblok publish webhook invalidate or redeploy, instead of fetching per request with no invalidation.
