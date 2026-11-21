---
name: pr
description: "Create a GitHub pull request for the current branch using repository templates and verified base, diff, and test evidence."
---

# Create a pull request

Accept an optional base branch (default `main`) and `--draft`. Resolve repository, remote, head, and base before comparing changes. Treat unsupported flags and ambiguous targets as input errors.

1. Inspect branch status, remote refs, GitHub repository identity, auth, and existing PRs. Stop for detached HEAD, head equal to base, or a missing base/empty PR diff. If a PR for the same head and base exists, return its URL. Identify uncommitted changes and keep them outside the PR unless separately committed.
2. Analyze the merge-base diff, commits, affected paths, and actual verification evidence. Check repository PR templates (named templates in `.github/PULL_REQUEST_TEMPLATE/`, followed by single templates in `.github/`, root, and `docs/`) and relevant plans/reports under `docs/`. Read matching legacy planning artifacts if explicitly relevant.
3. Draft a meaningful title and a body from the template when present. Otherwise include Summary, Changes, Testing, and Related Issues when known. Pass the exact Markdown with a body file or structured GitHub tool.
4. When publishing is authorized, push the exact current branch to the intended remote if needed. Use the normal non-force push. If it is rejected, fetch and inspect divergence before proposing an authorized recovery. Create the PR against the verified base and honor `--draft`; when calling GitHub via CLI use explicit head/base and verify the created PR with `gh pr view`.
5. Report URL, branch pair, draft or open state, and verification that ran. If authentication, permissions, or connectivity block publication, preserve the draft and report what was attempted.
