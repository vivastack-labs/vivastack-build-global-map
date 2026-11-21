---
name: react-review
description: "Review React and JSX/TSX changes for hooks, rendering, component boundaries, accessibility, and client-side security risks."
---

# Review React changes

Resolve the requested files or diff. If none were supplied, review React-related worktree changes. Read surrounding component code, call sites and tests.

- Check hook ordering and dependencies, effect lifetime and cleanup, stale closures, state updates, list keys, and unnecessary renders.
- Check server/client splits, browser API access, hydration stability, serialized props, forms, keyboard focus, semantic HTML, accessible labels, loading/error states, and safe handling of untrusted markup and data.
- For TSX and shared typed props, review the relevant type contracts, discriminated states, async boundaries, and unsafe casts alongside React behavior.
- Trace each reproducible impact and cite path and line. Report severity-ranked findings, validation performed, and coverage gaps. If the change has no React scope use [code-review](../code-review/SKILL.md) for the general review.
