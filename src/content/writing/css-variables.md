---
title: "CSS Custom Properties as Design Tokens"
description: "How CSS variables bridge the gap between design systems and implementation."
pubDatetime: 2026-01-28T00:00:00.000Z
tags: ["css", "design systems"]
---

CSS custom properties have fundamentally changed how we think about design tokens in the browser. They're not just variables — they're a contract between design and code.

## Beyond Sass Variables

Unlike preprocessor variables, custom properties are live. They cascade, they inherit, and they can be changed at runtime. This makes them perfect for theming, responsive design, and component-level overrides.

## A Practical System

A well-structured set of custom properties gives you a design system that lives in the browser:

```css
:root {
  --color-surface-100: #e5e5e5;
  --color-surface-900: #1a1a1a;
  --color-bg: var(--color-white);
  --color-text: var(--color-black);
}
```

The naming convention matters. Surface scales, semantic tokens, and systematic spacing create a vocabulary that both designers and engineers can share.
