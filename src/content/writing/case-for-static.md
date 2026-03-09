---
title: "The Case for Static"
description: "Most websites don't need a server. The best architecture for content-driven sites is often the simplest one."
pubDatetime: 2024-11-12T00:00:00.000Z
tags: ["dummy", "engineering", "web"]
---

The default architecture for web projects has crept toward complexity. Databases, server-side rendering, background jobs, caches — a stack that would have seemed excessive for a company blog ten years ago is now routine.

For many sites, this complexity solves problems that don't exist.

## What Static Actually Means

A static site is one where the HTML is generated at build time rather than at request time. Every visitor receives the same file from the same server. There's no database query, no template rendering, no session lookup.

This isn't a limitation — it's a feature. The constraints of static generation force you to think carefully about what your site actually needs.

## The Reliability Argument

A static file served from a CDN is nearly indestructible. There's no database to go down, no application server to restart, no memory leak to grow. Requests hit an edge node close to the user and return a file.

This reliability is structural, not operational. You don't achieve it by being careful — you get it for free by removing the moving parts.

Operational reliability (staying up, recovering from failures) is hard. Structural reliability (having fewer things that can fail) is achieved by design.

## Performance Without Configuration

Static sites are fast by default. The HTML is pre-rendered. The files are cached at the CDN edge. There's no server round-trip for dynamic content.

A dynamic site can be made equally fast, but it requires significant engineering: caching strategies, edge rendering, cache invalidation logic. All of this is complexity that static sites don't need.

## Where Static Falls Short

Static generation has real limits. Content that changes per user — dashboards, account pages, personalized feeds — can't be fully static. Real-time data requires some kind of server. Forms that do something complex need an endpoint.

These are genuine constraints, not excuses. The answer is usually a hybrid: static HTML for content pages, dynamic behavior only where needed. Most sites have far more content than interaction.

## The Right Default

The question isn't whether static sites are better than dynamic ones. It's what the right default is for a new project.

Starting dynamic and simplifying later is hard. Starting static and adding dynamism where needed is easier. The complexity lives where the requirements demand it, not everywhere by default.

For content, documentation, portfolios, and most blogs: serve files. Add servers when you need them.
