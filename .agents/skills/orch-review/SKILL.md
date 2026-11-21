---
name: orch-review
description: "Adversarially review a local diff or GitHub PR across quality, language, and security dimensions, then verify each proposed blocker."
---

# Review with counter-evidence

Accept a PR number, a full GitHub PR URL, or no input for local staged and unstaged changes. Validate PR identifiers, preserve repository identity in URLs, and collect the diff and reviewable file paths. Include scoped untracked files in local mode, and report an empty diff or retrieval failure.

1. Run the quality dimension and add a language-specific dimension when one language dominates. Add defensive security review when changes touch auth, input trust, database queries, filesystem, crypto, secrets, command execution or external requests.
2. Give each dimension the same snapshot and ask for file, line, severity, evidence, and impact. Deduplicate by file and normalized evidence or location, keeping the highest severity and dimensions reporting it.
3. For each unique CRITICAL/HIGH finding obtain a fresh, independent verification pass when authorized and available. Ask it to look for existing guards, unreachable paths, or other counter-evidence before assessing validity. Keep confirmed, unverified, and uncertain findings blocking. A refutation with evidence and confidence of 80% or higher can move it to advisory.
4. Report APPROVE only when every required dimension ran and all blockers cleared. Otherwise report CHANGES_REQUESTED with blocking, advisory, failed or incomplete dimensions, and counts for raw, unique, confirmed, unverified, uncertain, and refuted findings.

Use Codex subagents locally when delegation is authorized, with concurrency within the session limit. Inline dimensions can identify findings, but record any unavailable independent blocker verification explicitly. This skill does not require the Claude workflow runner. Publication requires authorization.
