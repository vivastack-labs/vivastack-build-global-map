---
name: prp-commit
description: "Commit a requested subset of Git changes selected by paths, globs, staged state, or a natural-language description."
---

# Select and commit changes

Use the arguments with the skill as the commit selection. With an explicit bare commit request, the default scope is all worktree changes. Supported selections include `staged`, named paths, globs, `only new files`, `except tests`, and semantic descriptions such as “the auth changes”.

1. Inspect `git status --short`, the staged diff, and the worktree diff. Resolve ambiguous paths or mixed hunks and tell the user which changes are in scope. If unrelated staged changes would be included, preserve them and resolve the index scope before committing.
2. Stage only the selected changes. Pass paths as individual arguments after `--` and use literal pathspecs for resolved names. Keep existing hooks enabled. Check the staged name/status and diff for scope and secrets. A staged-only request uses the existing index as-is.
3. Create a commit only when authorized and the final staged content matches the selection. Use a conventional type and an imperative subject under 72 characters by default, respecting repo conventions. Run any required local checks.
4. Report the short hash, subject, and changed file count. A push or PR requires its own authorization.
