---
title: "Working with Astro's Content Layer"
description: "A look at Astro's content collections and how they make working with Markdown feel natural."
pubDatetime: 2026-01-10T00:00:00.000Z
tags: ["astro", "engineering"]
---

Astro's content layer is one of those features that feels obvious in hindsight. Define a schema, write Markdown, and get type-safe data in your templates.

## The Schema

Content collections start with a schema. You define what frontmatter fields exist, their types, and which are required. Astro generates TypeScript types from this, so your editor knows exactly what data is available.

```ts
const writing = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDatetime: z.date(),
    tags: z.array(z.string()).default(["others"]),
    draft: z.boolean().optional(),
  }),
});
```

This schema does more than validate. It becomes the source of truth for your content structure. If you add a field, every query knows about it. If you make a field required, Astro tells you which files are missing it at build time — not at runtime.

## The Workflow

Write a Markdown file, add frontmatter that matches your schema, and query it with `getCollection()`. No GraphQL, no REST API, no build plugins. Just files and types.

The query layer is deliberately minimal. You get an array of entries and filter or sort them however you want. This simplicity is a feature — it means you can write plain functions to transform your data without learning a query language.

```ts
const writings = await getCollection("writing");
const published = writings
  .filter(w => !w.data.draft)
  .sort((a, b) => b.data.pubDatetime.getTime() - a.data.pubDatetime.getTime());
```

There's no magic here. It's TypeScript all the way down. Your IDE autocompletes `w.data.title` because the schema told it that field exists.

## File-Based Routing

Each content entry maps naturally to a page. Astro's dynamic routes let you generate a page for every entry in a collection, with full type safety on the params and props.

The slug comes from the filename. The data comes from the frontmatter. The rendered HTML comes from the Markdown body. Everything has a clear, predictable source.

## Why It Works

The content layer succeeds because it removes friction without adding abstraction. Your content is still Markdown files in a folder. The schema just makes sure everything stays consistent.

Compare this to a CMS. A CMS gives you a UI for editing content, but it also gives you an API to learn, a dashboard to maintain, and a deployment to manage. For a site where you're the author, the file system is the best CMS there is.

The content layer also stays out of the way at runtime. Everything resolves at build time. There are no client-side fetches, no loading states, no API keys. The result is static HTML with zero JavaScript overhead for content pages.
