---
title: "CSS Custom Properties as Design Tokens"
description: "How CSS variables bridge the gap between design systems and implementation."
pubDatetime: 2026-01-28T00:00:00.000Z
tags: ["css", "design systems"]
---

CSS custom properties have fundamentally changed how we think about design tokens in the browser. They're not just variables — they're a contract between design and code.

## Beyond Sass Variables

Unlike preprocessor variables, custom properties are live. They cascade, they inherit, and they can be changed at runtime. This makes them perfect for theming, responsive design, and component-level overrides.

Sass variables compile away. Once the CSS is generated, `$primary-color` no longer exists. A custom property like `--color-primary` persists in the browser. You can inspect it, override it in a media query, or change it with JavaScript. The variable is the value.

## Naming as Architecture

A naming convention isn't bikeshedding — it's architecture. The names you choose determine how your system scales and how easily others can use it.

A practical approach uses three tiers. Primitive values define the raw palette. Semantic tokens map those primitives to purpose. Component tokens create local scopes when needed.

```css
/* Primitives — the raw palette */
:root {
  --color-stone-100: #f5f5f4;
  --color-stone-800: #292524;
  --color-stone-900: #1c1917;
}

/* Semantic tokens — purpose, not appearance */
:root {
  --color-bg: var(--color-stone-100);
  --color-text: var(--color-stone-900);
  --color-text-muted: var(--color-stone-800);
}
```

The semantic layer is where theming happens. Dark mode doesn't redefine primitives — it reassigns semantic tokens to different primitives. The components never know the difference.

## Theming with Selectors

Custom properties make theme switching elegant. Define your tokens once, then remap them under a selector.

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: var(--color-stone-900);
    --color-text: var(--color-stone-100);
  }
}

html[data-theme="dark"] {
  --color-bg: var(--color-stone-900);
  --color-text: var(--color-stone-100);
}
```

The duplication between the media query and the selector is intentional. The media query handles the default. The data attribute handles the override. Together they cover both automatic and manual theme switching.

## Scoping and Composition

Custom properties cascade, which means components can override tokens locally without affecting the rest of the page.

```css
.card {
  --card-padding: 1.5rem;
  padding: var(--card-padding);
}

.card.compact {
  --card-padding: 0.75rem;
}
```

This is component-level configuration without a build tool. No props, no classes for every variant — just a variable that any child can read and any modifier can change.

## A Practical System

A well-structured set of custom properties gives you a design system that lives in the browser. The naming convention matters. Surface scales, semantic tokens, and systematic spacing create a vocabulary that both designers and engineers can share.

The goal isn't comprehensiveness — it's consistency. A small set of well-chosen tokens is more useful than an exhaustive set that no one can remember. Start with color, typography, and spacing. Add tokens as patterns emerge, not before.
