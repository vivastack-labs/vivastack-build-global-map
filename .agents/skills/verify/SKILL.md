---
name: verify
description: "Verify changes through build, types, lint, tests, secret and log checks, and diff review. Use before a PR, checkpoint, or release."
---

# Verification

Accept `quick` for the fastest relevant checks, `full` (also `pre-pr` or `pre-deploy`) for repository-wide checks where applicable, and `continuous` for repeat checks at implementation milestones. Derive commands from `AGENTS.md`, CI, and project configuration.

1. Check build and type checks, then lint and tests. Use coverage for full verification where available. Use repo thresholds, or report 80% as a reference only when the repo has no threshold.
2. Review changes for accidentally committed secrets, debug logs, and regressions with the repository's tools. Preserve pipeline exit status when truncating logs and redact sensitive values from the report.
3. Report each phase with commands, PASS/FAIL/SKIPPED and the reason, test counts or coverage when available, and overall readiness. Verify target acceptance separately when authorized and required. Record environment, version, evidence, and access blockers as applicable.

This is a verification request. Fix failures when the user also authorized repairs. A skipped prerequisite leaves readiness conditional.
