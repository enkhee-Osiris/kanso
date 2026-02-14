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

- **Prettier** with `prettier-plugin-astro` — config in `.prettierrc`, 2-space indent, double quotes, `es5` trailing commas
- **ESLint** flat config (`eslint.config.js`) — `typescript-eslint` + `eslint-plugin-astro` + `eslint-config-prettier`
- **Husky + lint-staged** — Pre-commit hook runs eslint + prettier on staged files
- **Deployment** — GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`), project site at `enkhee-Osiris.github.io/kanso`

## Architecture

This is an Astro 5 blog site using the blog starter template, styled after Bear Blog.

**Content system:** Blog posts live in `src/content/blog/` as `.md`/`.mdx` files. The collection schema is defined in `src/content.config.ts` — frontmatter requires `title`, `description`, `pubDate`, and optionally `updatedDate` and `heroImage`. Posts are queried via `getCollection('blog')` and rendered through `src/pages/blog/[...slug].astro`.

**Page layout chain:** Pages use `BaseHead.astro` (global CSS import, meta tags, OG/Twitter cards, font preloads) → `Header.astro` + `Footer.astro` for site chrome. Blog posts specifically use the `BlogPost.astro` layout which wraps this pattern.

**Key integrations:**

- `@astrojs/mdx` — MDX support for blog posts
- `@astrojs/sitemap` — Auto-generated sitemap
- `@astrojs/rss` — RSS feed at `/rss.xml` (see `src/pages/rss.xml.js`)
- `astro-expressive-code` — Code blocks with Dracula/Solarized Light themes and line numbers (`ec.config.mjs`)
- `sharp` — Image optimization

**Styling:** Global styles in `src/styles/global.css` (imported via `BaseHead.astro`). Uses Atkinson font (woff files in `public/fonts/`). CSS variables defined on `:root` for colors. Component-scoped styles use `<style>` tags in `.astro` files.

**Site constants:** `src/consts.ts` exports `SITE_TITLE` and `SITE_DESCRIPTION`. The site URL is configured in `astro.config.mjs`.

**TypeScript:** Strict mode with `strictNullChecks` enabled, extending `astro/tsconfigs/strict`.
