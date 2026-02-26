---
title: "Typography on the Web"
description: "Choosing and pairing typefaces for screen reading, and why serif fonts deserve a comeback."
pubDatetime: 2026-02-10T00:00:00.000Z
tags: ["typography", "design"]
---

The web has a serif problem. For years, the default advice was to use sans-serif fonts for screen readability. But with modern displays and better font rendering, that advice is outdated.

## The Case for Serifs

High-resolution screens render serifs beautifully. The extra detail that was once a liability at 72 DPI is now an asset at 200+ PPI. Serifs add warmth, personality, and readability to long-form text.

Studies on screen readability have been inconclusive for over a decade. The measurable differences between serif and sans-serif at modern resolutions are negligible. What matters more is the typeface's design quality, its x-height, and how it's set — not whether it has serifs.

## Pairing Strategy

A display serif for headings paired with a text serif for body creates hierarchy without contrast shock. Lora and PT Serif, for example, share enough DNA to feel cohesive while maintaining distinct roles.

The key to good pairing is contrast with compatibility. The fonts should be different enough to establish hierarchy but similar enough to feel like they belong together. Contrast can come from weight, style, or proportion — it doesn't need to come from an entirely different genre.

Avoid pairing fonts that are too similar. Two text serifs with similar proportions will create confusion rather than hierarchy. The reader's eye needs clear signals about what's a heading and what's body text.

## Measure and Rhythm

Line length — the measure — is the single most impactful typographic decision for readability. Too long, and the eye struggles to track back to the start of the next line. Too short, and reading becomes choppy with constant line breaks.

The classic range of 45-75 characters per line exists for a reason. On the web, this translates to something like `max-width: 65ch` on your content container. The `ch` unit is particularly useful here because it scales with the font.

## Vertical Rhythm

Line height and margin create the vertical rhythm of a page. Consistent spacing between elements produces a sense of order that readers feel even if they can't articulate it.

A base line height of 1.5 to 1.6 works well for body text in most typefaces. Headings benefit from tighter line heights — around 1.2 to 1.3 — because their larger size creates enough space between lines at tighter ratios.

Margins between elements should relate to the base line height. If your body text has a line height of 1.6rem, paragraph margins of 1.6rem maintain the rhythm. Heading margins might use multiples of this value to create larger breaks in the flow.

## The Details

Line height, measure, and spacing matter more than font choice. A well-set paragraph in any typeface will outperform a poorly set paragraph in the "perfect" font. Start with `line-height: 1.5` and a measure of 45-75 characters, then refine from there.

Web fonts add another consideration: loading performance. A font that arrives late causes layout shift. Use `font-display: swap` for text fonts and `font-display: optional` for display fonts where the fallback is acceptable. Preload critical fonts in the `<head>` to minimize the flash.
