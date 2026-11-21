---
name: code-review
description: "Run a checklist-based review of local uncommitted changes or one GitHub PR, with concrete evidence and optional authorized review publication."
---

# Checklist code review

Use the local staged and unstaged diff against HEAD by default, including relevant untracked files. A PR number or supported GitHub PR URL selects PR mode. Validate and resolve the repository for URLs. Fetch PR head/base, metadata and diff using GitHub or `gh`. Verify the revision for cited lines and tests, and preserve the user's worktree if a checkout is needed.

1. Read applicable `AGENTS.md`, relevant planning artifacts, the changed code in context and neighboring tests. Check correctness, regressions, compatibility, error paths, privacy/security, performance, maintainability, and missing tests.
2. Keep issues attributable to the diff and supported by observed code or behavior. Include severity, a precise file/line, outcome, and a concise fix direction. Run scoped verification when it helps confirm an issue and report checks that could not run.
3. Report APPROVE, REQUEST CHANGES, or BLOCK with a summary and findings ordered by severity. Critical issues block, high issues request changes, and validation failures or incomplete evidence preclude clean approval. In PR mode, save a review to `docs/reviews/pr-<number>-review.md` unless the user opts out or requests another location.
4. Publish a review, comment, approval, or change request only when explicitly authorized for that PR. Verify the posted review and report its URL when available.

For distinct review dimensions use [review-pr](../review-pr/SKILL.md). For independent counter-review of blockers use [orch-review](../orch-review/SKILL.md).
