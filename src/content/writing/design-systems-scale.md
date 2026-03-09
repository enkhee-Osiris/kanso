---
title: "Design Systems Don't Scale Themselves"
description: "A design system is a product, not a deliverable. The teams that treat it that way are the ones that see it actually used."
pubDatetime: 2024-05-22T00:00:00.000Z
tags: ["design", "design-systems", "engineering"]
---

Design systems look like a coordination problem. You build the components once, teams use them everywhere, consistency follows automatically. In practice, the coordination problem is only the beginning.

## The Adoption Gap

A design system that no one uses is a documentation project. The gap between "we have a design system" and "teams are building with it" is where most system efforts stall.

The gap isn't usually a quality problem. The components work. The documentation exists. The gap is that the system competes with teams' existing habits and local solutions. Switching to the system has a cost, and that cost has to be justified by the benefit.

This is an adoption problem. Adoption problems are product problems.

## Treating the System as a Product

A product has users with needs. It has a roadmap. It responds to feedback. It measures whether people are getting value from it.

Most design system teams don't work this way. They build components based on their own judgment, publish them, and expect adoption. When adoption is low, they add more documentation.

The teams that succeed at scale treat adoption as the metric. They talk to the teams using (and not using) the system. They prioritize work based on where the gaps are. They measure coverage — what percentage of product UI is built with system components — and treat that number seriously.

## The Living Decisions Problem

A design system codifies decisions. But decisions made at system creation time may not be right for every context, and they definitely won't be right forever.

Teams encounter edge cases the system didn't anticipate. They extend components, override styles, build local variants. This is inevitable. The question is whether it happens in a coordinated way or in isolation.

The worst outcome is a system that's too rigid to adapt, so teams maintain forks. You end up with a system and a set of undocumented shadow systems that diverge over time.

The better outcome is a contribution process — a way for teams to surface gaps, propose solutions, and get them into the system. Not every team should maintain every component. But some team should be able to.

## Consistency Is Not the Goal

Consistency is often cited as the purpose of a design system. But consistency is a means, not an end. The actual goal is a coherent user experience — one where the product feels like a single thing rather than a collection of separately-built parts.

Consistency contributes to coherence, but it's not sufficient. A consistently bad experience is consistent. The system should be opinionated about the right way to solve common problems, not just the standardized way.

The components that make the biggest difference aren't buttons and inputs. They're the ones that encode hard-won understanding about how the product should behave — patterns that took a long time to get right and would be expensive to reinvent in isolation.

That knowledge is what a design system is actually for.
