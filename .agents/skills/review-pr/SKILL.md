---
name: review-pr
description: "Review all or selected perspectives of a GitHub PR, covering code, comments, tests, silent failures, types, and simplification."
---

# Multi-perspective PR review

Accept a PR number or full GitHub PR URL, defaulting to the current branch's PR. Accept `--focus=comments|tests|errors|types|code|simplify`. Resolve the correct repository and PR revision, fetch the diff and file list with GitHub or `gh`, and read applicable repository guidance.

- Code: functional correctness, compatibility, and regressions.
- Comments: accuracy, assumptions, and maintainability.
- Tests: meaningful behavior coverage and fragile or missing cases.
- Errors: exceptions, silent failures, recovery, cleanup, and diagnostics.
- Types: invariant representation, boundaries, and invalid states.
- Simplification: changes that reduce complexity while preserving behavior.

Give each requested perspective the same diff and relevant constraints. Use separate authorized Codex reviewers when available, or run each requested checklist inline. Deduplicate, keep findings with at least 80% confidence, rank critical and important issues, and include advisory suggestions only when requested. Cite file and line with evidence. Report any unreviewed perspective. Publication requires explicit authorization.
