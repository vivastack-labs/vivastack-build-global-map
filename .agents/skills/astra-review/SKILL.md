---
name: astra-review
description: "Get an isolated GPT-6-Astra review of Git changes, verify findings, and run up to three targeted repair rounds."
---

# Astra review

Accept one of `--base <branch>`, `--commit <sha>`, `--files <paths>`, `--files-from-commit <sha>`, or no selector for uncommitted changes. Pass additional reviewer guidance as `--instructions`. Validate refs/paths and forward arguments individually.

1. From the repo root, run `node .claude/scripts/astra-review.js --dry-run` with the scope. This command needs Node.js and the existing repository helper, which is read-only in dry-run and uses the Codex CLI for review. Summarize what would be sent, without exposing secret content in the conversation. Stop when there is no material to review.
2. Verify a suitable Codex model and account are available. Run the helper with `--consent-to-openai` only after the user authorizes sending that scope. Use a private temporary directory for `--output`. Exit 0 is PASS, 1 is FAIL, and 2 is an execution error. Stop on execution error and report its cause.
3. Check findings against the code. Fix confirmed high or critical findings and clearly correct smaller issues if repairs were requested. Apply focused edits in the parent Codex session and run project checks. Preserve pre-existing changes and omit publication.
4. Re-review from a fresh context for at most three repair rounds. For a reviewed historical commit use `--files-from-commit <sha>` when reviewing the repaired working tree. Stop with the remaining findings if the cap is reached.
5. Report the reviewer model, scope, verdict, rounds, tests, fixes, and rejected or unresolved findings. The separate review context can be used even if the parent also runs an OpenAI model.
