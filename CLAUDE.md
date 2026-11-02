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
- `src/components/StoryView.tsx` — renders a story with `useStoryblokState` (live updates in Visual Editor) + `StoryblokComponent`.
- `src/routes/index.tsx` — home, loads the `home` story.
- `src/routes/$.tsx` — catch-all route, loads the story matching the URL path (`params._splat`).
- `src/storyblok/` — React components for Storyblok blocks (`Page`, `Grid`, `Teaser`, `Feature`).
- `.storyblok/components/` — block schemas pulled from Storyblok (versioned).
- `.storyblok/types/` — generated TypeScript types (versioned).

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

## Security

- Never commit `.env` or any token.
- The Storyblok CLI uses a Personal Access Token (stored by `storyblok login`), separate from the space access token. Never print, log or commit it.

## Known issues / pending

- **`happy-dom` vulnerability** (via `@storyblok/richtext` → `@tiptap/html`). If no fixed `@storyblok/react` release is available, apply an npm `overrides` for `happy-dom` (`^21.0.4`) and test rich text rendering. Do not run `npm audit fix --force`.
- **`postcss-selector-parser`** moderate vulnerability (via `@tailwindcss/typography`): build-time only, accepted.
- **ESLint peer dependency warnings** (`@tanstack/eslint-config` expects ESLint 10): harmless.
- **Deployment** not set up yet (Vercel Hobby can't import private org repos; Netlify attempt failed).
