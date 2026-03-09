---
title: "Reading Code Is a Skill"
description: "Writing code gets most of the attention. Reading it is harder, more common, and rarely practiced deliberately."
pubDatetime: 2024-02-14T00:00:00.000Z
tags: ["dummy", "engineering"]
---

Programming education focuses almost entirely on writing code. Syntax, algorithms, data structures, design patterns — the output of a developer. But most of a developer's time is spent reading code someone else wrote.

Reading code is a distinct skill, and most people never practice it deliberately.

## The Ratio Problem

Estimates vary, but most developers spend far more time reading code than writing it. A common figure is 10:1. Every line you write requires reading many lines to understand the context around it.

This ratio explains why code is written more often than refactored, why documentation is sparse, and why onboarding is slow. The people who wrote the code built up a mental model incrementally. Reading the finished product without that history is harder.

## What Good Reading Looks Like

Experienced developers read code the way experienced readers read text — not linearly, but strategically. They look at file structure before opening files. They read interfaces before implementations. They follow the call stack from the entry point down.

The goal isn't to read every line. It's to build a mental model quickly enough to ask the right questions. What does this system do? What are the moving parts? Where is the complexity concentrated?

The answer to those questions tells you where to slow down and read carefully.

## Reading to Debug

Debugging is a reading task. You're tracing a path through the code to find where the behavior diverges from the expectation. This requires reading code at different levels of detail — overview to locate the problem, then careful line-by-line reading to find the cause.

A useful technique: before adding any logging or breakpoints, read the code and write down your hypothesis about what's wrong. Then instrument to verify. This habit builds a stronger mental model than instrumenting first and letting the output tell you where to look.

## Reading Unfamiliar Code

Reading code in an unfamiliar codebase is a research task. You're building vocabulary alongside understanding. An unknown variable name forces you to find its definition. An unknown function forces you to find its implementation.

The temptation is to read everything before acting. This rarely works. Better to start with a specific question — "how does authentication work?" — and read enough to answer it. Each question you answer gives you more context for the next.

Tests are often the fastest entry point into unfamiliar code. They show what the code is supposed to do, with concrete inputs and expected outputs. A well-tested codebase lets you understand a component's interface before reading its implementation.

## The Practice

Reading code deliberately means reading code you don't have to. Open source projects, older parts of your own codebase, code written by people with different backgrounds and styles. The friction of unfamiliarity is the practice.

The developers who are easiest to work with aren't just good at writing clear code. They're good at reading unclear code. They can work with what exists rather than rewriting it to match their mental model.

That ability comes from practice.
