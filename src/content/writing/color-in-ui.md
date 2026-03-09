---
title: "Color Is the Last Thing to Add"
description: "Most UI color problems are actually hierarchy and contrast problems in disguise. Solve those first."
pubDatetime: 2025-03-20T00:00:00.000Z
tags: ["design", "css"]
---

The most common mistake in interface design is adding color too early. Color is so expressive that it tends to cover up structural problems — and then you ship those problems.

## Grayscale First

The classic advice — design in grayscale first — is still correct. When you can only use shades of gray, hierarchy has to come from size, weight, spacing, and position. These are the fundamentals. Color can reinforce them, but it can't replace them.

An interface that works in grayscale works in color. An interface that only works in color has a design problem wearing a color solution.

## What Color Actually Does

Color communicates a limited set of things: status, category, emphasis, and brand. That's roughly it. Every time you reach for color, ask which of these you're communicating.

Status: success, error, warning, neutral. Category: this belongs to that group. Emphasis: look here first. Brand: this is us.

If the color isn't serving one of these purposes, it's decoration. Decoration isn't always wrong, but it should be a conscious choice, not a default.

## The Semantic Layer

The most maintainable color system separates primitive values from semantic tokens.

```css
/* Primitives */
:root {
  --color-red-600: #dc2626;
  --color-green-600: #16a34a;
}

/* Semantic tokens */
:root {
  --color-error: var(--color-red-600);
  --color-success: var(--color-green-600);
}
```

Components reference semantic tokens, not primitives. This means you can change "what red we use for errors" by updating one variable, without touching any component code.

The semantic layer also makes dark mode tractable. Switching themes reassigns semantic tokens to different primitives. The components don't change.

## Accessibility Is Not Optional

Color contrast isn't a compliance checkbox — it's a readability baseline. Text that fails WCAG AA contrast ratios is harder to read for everyone, not just users with visual impairments. Glare, aging eyes, a bright screen in sunlight — there are many reasons contrast matters.

The minimum contrast ratio for normal text is 4.5:1. For large text (18pt+ or 14pt+ bold) it's 3:1. These aren't conservative targets. They're the floor.

Browsers can't catch contrast errors. Linters can't catch them. The only way to find them is to look, measure, and fix.

## Restraint as Strategy

A limited palette is easier to use consistently. When you have 40 colors, decisions are harder and inconsistency is more likely. When you have 8, every color use is deliberate.

Start with a neutral scale, an accent color, and semantic tokens for error, warning, and success. Add more only when a specific need arises — not speculatively.

Color restraint is design restraint. The two reinforce each other.
