---
name: prp-implement
description: "Execute a PRP plan with per-task verification, final acceptance checks, an implementation report, and completed-plan archival."
---

# Execute a PRP plan

Use the plan path in the request. Without a path, identify candidate active plans under `docs/PRPs/plans/` and resolve ambiguity before execution. A plan under `.claude/` may be read as legacy input.

1. Read the entire plan, its required references, and repository rules. Inspect the worktree and preserve unrelated changes. Identify baseline check failures, blockers, and implementation order.
2. Execute each task in order. Validate it before continuing. Diagnose failures in scope, retry after a focused fix, and record justified deviations. Escalate a material scope change or unavailable external dependency.
3. Run the plan's final static checks, targeted and full tests, and database, browser, or manual checks when applicable. Mark skipped or blocked checks with evidence. Verify each acceptance criterion independently of test command success.
4. Write `docs/PRPs/reports/<plan>-report.md` with summary, changed files, decisions, task outcomes, validation commands and results, acceptance criteria, and open risks. On success, archive a Codex-owned plan under `docs/PRPs/plans/completed/` without overwriting another plan, and update the corresponding Codex PRD phase when known. Record completion in the report for legacy input. Leave a failed or incomplete plan active.
5. Report outcomes and artifact paths. Commit or publish only if requested. Use [prp-commit](../prp-commit/SKILL.md) or [prp-pr](../prp-pr/SKILL.md) for those steps.
