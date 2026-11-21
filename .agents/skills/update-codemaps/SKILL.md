---
name: update-codemaps
description: "Generate short architecture codemaps from actual entry points, integrations and data flows, with a diff and freshness report."
---

# Update architecture codemaps

1. Identify repo type, source roots and entry points. Trace service or module boundaries, control/data flow, frontend pages and state, backend routes and middleware, data models and migrations, and dependencies that exist.
2. Draft applicable maps under the established map directory, defaulting to `docs/CODEMAPS/`. Use concise paths, names, diagrams and signatures. Prefer fewer than 1000 tokens per map. Include generated date, files scanned and estimated token count.
3. Compare proposed and previous maps before writing. If more than 30% of lines change, show the diff and wait for approval before overwriting. Preserve handwritten notes and highlight architectures that lack enough evidence.
4. Save `.reports/codemap-diff.txt` with added, removed, or changed files, dependency and architecture changes, and potentially stale docs (90+ days plus relevant source changes). Report artifact paths.
