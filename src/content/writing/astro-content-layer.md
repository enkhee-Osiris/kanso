---
title: "Working with Astro's Content Layer"
description: "A look at Astro's content collections and how they make working with Markdown feel natural."
pubDatetime: 2026-01-10T00:00:00.000Z
tags: ["astro", "engineering"]
---

Astro's content layer is one of those features that feels obvious in hindsight. Define a schema, write Markdown, and get type-safe data in your templates.

## The Schema

Content collections start with a schema. You define what frontmatter fields exist, their types, and which are required. Astro generates TypeScript types from this, so your editor knows exactly what data is available.

## The Workflow

Write a Markdown file, add frontmatter that matches your schema, and query it with `getCollection()`. No GraphQL, no REST API, no build plugins. Just files and types.

## Why It Works

The content layer succeeds because it removes friction without adding abstraction. Your content is still Markdown files in a folder. The schema just makes sure everything stays consistent.
