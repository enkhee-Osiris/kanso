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

- **Prettier** with `prettier-plugin-css-order` + `prettier-plugin-astro` — config in `.prettierrc`, 2-space indent, double quotes, `es5` trailing commas, `arrowParens: avoid`. CSS declarations are auto-sorted in `concentric-css` order (outside-in: position → box model → visual).
- **ESLint** flat config (`eslint.config.mjs`) — `@eslint/js` + `typescript-eslint` + `eslint-plugin-astro` + `eslint-plugin-import` (enforced import ordering) + `eslint-plugin-prettier` + `eslint-config-prettier`. Config files (`*.config.js`, `*.config.mjs`) are excluded from linting.
- **Husky + lint-staged** — Pre-commit hook runs eslint + prettier on staged files
- **Deployment** — GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`), project site at `enkhee-Osiris.github.io/kanso`. Deploy only triggers on changes to source code, static assets, and build config (`src/`, `public/`, `astro.config.mjs`, `ec.config.mjs`, `package.json`, `package-lock.json`, `tsconfig.json`). Manual deploy available via `workflow_dispatch`.
- **Skills** — Project-level agent skills in `.agents/skills/`: astro, css-architecture, accessibility-compliance, best-practices

## Architecture

This is an Astro 5 site with a minimal, content-focused design.

**Content system:** Writings live in `src/content/writing/` as `.md`/`.mdx` files. The collection schema is defined in `src/content.config.ts` — frontmatter requires `title`, `description`, `pubDatetime` (ISO 8601), `author` (defaults to `AUTHOR` constant), `tags` (defaults to `["others"]`), and optionally `modDatetime`, `ogImage`, `featured` (boolean), and `draft` (boolean). Writings are queried via `getCollection('writing')` and rendered through `src/pages/writing/[...slug].astro`.

**Data utilities:** `src/utils/data.ts` exports helper functions for querying writings:

- `getSortedWritings(writings)` — sorted by date descending
- `getFeaturedWritings(writings, limit?)` — featured only, sorted by date
- `getNonFeaturedWritings(writings, limit?)` — non-featured only, sorted by date
- `getRelatedWritings(current, writings, limit?)` — writings sharing tags with the current entry, ranked by shared tag count then date
- `getTagsWithWritings(writings)` — `{ tag, writings[] }` pairs for all tags
- `getWritingsByYear(writings)` — `{ year, writings[] }` pairs sorted by year descending

**Navigation:** `FloatingNav.astro` is a fixed right-side bar (z-index 100) with menu toggle, search link, and theme toggle. `FullscreenNav.astro` is a full-screen overlay (z-index 90) with centered nav links (Home, Writings, About, Search) — visibility is CSS-driven via `html[data-menu-open]` (set by FloatingNav's menu toggle). Page scroll is locked when the overlay is open (`overflow: hidden` on `html`). Both components are included on every page.

**Page layout chain:** Pages use `Head.astro` (global CSS import, meta tags, OG/Twitter cards, font preloads) + `SkipLink.astro` (skip to `#main-content`, z-index 200) + `Footer.astro` (copyright line) for site chrome. The writing detail page (`src/pages/writing/[...slug].astro`) is self-contained — it imports components directly rather than using a layout wrapper. Markdown content is rendered inside a `.prose` div with scoped `:global()` styles for all typography elements. The writing detail page also includes a related writings section (filtered by shared tags, limited to `RELATED_WRITINGS_LIMIT`).

**Key integrations:**

- `@astrojs/mdx` — MDX support for writings
- `@astrojs/sitemap` — Auto-generated sitemap
- `@astrojs/rss` — RSS feed at `/rss.xml` (see `src/pages/rss.xml.ts`)
- `astro-expressive-code` — Code blocks with Kanagawa Wave/Lotus themes, JetBrains Mono font, line numbers (`ec.config.mjs`). Uses `themeCssSelector` to map theme type to `[data-theme="dark"]`/`[data-theme="light"]`.
- `sharp` — Image optimization

**CSS comments:** Style blocks use SMACSS-style section headers throughout. Format: `/* -------------------------\n * [Category] — [Name]\n * [Optional description]\n * ------------------------- */`. Categories: **Theme** (variables, color tokens), **Base** (element defaults), **Layout** (major structural containers), **Module** (components and sub-elements), **State** (interactive states, media queries, attribute-driven states). CSS declaration order is enforced by `prettier-plugin-css-order` (concentric-css) — do not manually reorder; run `npm run format` instead.

**Styling:** Global styles in `src/styles/global.css` (imported via `Head.astro`). Fonts: Lora (display/headings) and PT Serif (body) loaded globally via Google Fonts in `Head.astro`; JetBrains Mono (code) loaded only on the writing detail page. CSS variables on `:root` for colors (`--color-surface-*`), fonts (`--font-body`, `--font-display`), and semantic tokens (`--color-bg`, `--color-text`, `--color-border`, `--color-code-bg`, `--color-code-text`, `--color-mark-bg`, `--color-mark-text`). Dark mode via `prefers-color-scheme` with `html[data-theme]` override. Theme variables are defined in four blocks: `:root`, `@media (prefers-color-scheme: dark)`, `html[data-theme="light"]`, `html[data-theme="dark"]`. Component-scoped styles use `<style>` tags in `.astro` files.

**SVG icons:** Stored in `src/assets/icons/` and imported via `?raw` suffix + `set:html` directive (e.g., `const icon = await import("@/assets/icons/name.svg?raw")`). For CSS usage (e.g., blockquote decoration), SVGs are embedded as data URIs with `mask-image` so `background-color` can use CSS variables for theme-aware coloring.

**Components:**

- `TagChip.astro` — pill-shaped tag link using `URLS.tag()`
- `Image.astro` — wraps Astro's `<Image>` with `<figure>`/optional `<figcaption>`, fills container width with `height: auto`
- `BackLink.astro` — back navigation link with arrow-left icon; accepts `href` (default: `URLS.writings`) and `label` (default: `"Back to writings"`) props
- `FormattedDate.astro` — renders a `<time>` element; accepts `date: Date` and optional `formatOptions: Intl.DateTimeFormatOptions` (default: `{ year: "numeric", month: "short", day: "numeric" }`)
- `SkipLink.astro` — skip-to-content link targeting `#main-content`, visually hidden until focused, z-index 200

**Pages:**

- `src/pages/index.astro` — homepage with featured and latest writings
- `src/pages/writing/index.astro` — all writings list
- `src/pages/writing/[...slug].astro` — writing detail with prose styles and related writings
- `src/pages/tag/index.astro` — all tags with writing counts
- `src/pages/tag/[tag].astro` — writings filtered by tag
- `src/pages/rss.xml.ts` — RSS feed

**Links:** The site uses `base: "/kanso"` in `astro.config.mjs`. Internal links must use `import.meta.env.BASE_URL` as prefix or use `URLS` constants.

**Site constants:** `src/constants.ts` exports:

- `SITE_TITLE`, `SITE_DESCRIPTION`, `AUTHOR` — site metadata
- `HOME_LATEST_WRITINGS_LIMIT`, `HOME_FEATURED_WRITINGS_LIMIT`, `RELATED_WRITINGS_LIMIT` — display limits
- `FULL_URL` — resolved site URL with base path
- `SOCIAL` — social link URLs (`github`, `linkedin`, `email`)
- `URLS` — route map (`home`, `writings`, `writing(slug)`, `tags`, `tag(slug)`, `search`, `about`), all prefixed with `BASE_URL`
- `TITLES` — static strings for fixed pages + `writing(title)` and `tag(tag)` functions
- `DESCRIPTIONS` — static strings for fixed pages + `writing(description)` and `tag(tag)` functions

**TypeScript:** Extends `astro/tsconfigs/strict` (provides `strict`, `noEmit`, `verbatimModuleSyntax`, etc.). Additional: `target: ES2022`, `noImplicitReturns`, path aliases (`@/components/*`, `@/layouts/*`, `@/styles/*`, `@/utils/*`, `@/assets/*`, `@/constants`), and `@astrojs/ts-plugin`.
