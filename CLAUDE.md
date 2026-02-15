# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start dev server at localhost:4321
- `npm run build` — Production build to `./dist/`
- `npm run preview` — Preview production build locally
- `npm run generate` — Run `astro sync` to generate content collection types
- `npm run format` — Format all files with Prettier
- `npm run format:check` — Check formatting without writing
- `npm run lint` — Run ESLint
- `npm run lint:fix` — Run ESLint with auto-fix

## Tooling

- **Prettier** with `prettier-plugin-astro` — config in `.prettierrc`, 2-space indent, double quotes, `es5` trailing commas, `arrowParens: avoid`
- **ESLint** flat config (`eslint.config.mjs`) — `@eslint/js` + `typescript-eslint` + `eslint-plugin-astro` + `eslint-plugin-import` (enforced import ordering) + `eslint-plugin-prettier` + `eslint-config-prettier`. Config files (`*.config.js`, `*.config.mjs`) are excluded from linting.
- **Husky + lint-staged** — Pre-commit hook runs eslint + prettier on staged files
- **Deployment** — GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`), project site at `enkhee-Osiris.github.io/kanso`. Deploy only triggers on changes to source code, static assets, and build config (`src/`, `public/`, `astro.config.mjs`, `ec.config.mjs`, `package.json`, `package-lock.json`, `tsconfig.json`). Manual deploy available via `workflow_dispatch`.
- **Skills** — Project-level agent skills in `.agents/skills/`: astro, css-architecture, accessibility-compliance, best-practices

## Architecture

This is an Astro 5 blog site with a minimal, content-focused design.

**Content system:** Blog posts live in `src/content/blog/` as `.md`/`.mdx` files. The collection schema is defined in `src/content.config.ts` — frontmatter requires `title`, `description`, `pubDate`, and optionally `updatedDate` and `heroImage`. Posts are queried via `getCollection('blog')` and rendered through `src/pages/blog/[...slug].astro`.

**Page layout chain:** Pages use `Head.astro` (global CSS import, meta tags, OG/Twitter cards, font preloads) + `Footer.astro` for site chrome. Blog posts specifically use the `BlogPost.astro` layout which wraps this pattern.

**Key integrations:**

- `@astrojs/mdx` — MDX support for blog posts
- `@astrojs/sitemap` — Auto-generated sitemap
- `@astrojs/rss` — RSS feed at `/rss.xml` (see `src/pages/rss.xml.ts`)
- `astro-expressive-code` — Code blocks with Dracula/Solarized Light themes and line numbers (`ec.config.mjs`)
- `sharp` — Image optimization

**Styling:** Global styles in `src/styles/global.css` (imported via `Head.astro`). Fonts: Lora (display/headings) and PT Serif (body) loaded via Google Fonts. CSS variables on `:root` for colors (`--color-surface-*`), fonts (`--font-body`, `--font-display`), and semantic tokens (`--color-bg`, `--color-text`, `--color-border`). Dark mode via `prefers-color-scheme` with `html[data-theme]` override. Component-scoped styles use `<style>` tags in `.astro` files.

**Site constants:** `src/constants.ts` exports `SITE_TITLE` and `SITE_DESCRIPTION`. The site URL is configured in `astro.config.mjs`.

**TypeScript:** Extends `astro/tsconfigs/strict` (provides `strict`, `noEmit`, `verbatimModuleSyntax`, etc.). Additional: `target: ES2022`, `noImplicitReturns`, path aliases (`@/components/*`, `@/layouts/*`, `@/styles/*`, `@/utils/*`, `@/assets/*`, `@/constants`), and `@astrojs/ts-plugin`.
