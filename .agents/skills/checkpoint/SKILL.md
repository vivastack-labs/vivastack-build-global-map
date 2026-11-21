---
name: checkpoint
description: "Create, compare, list, or clear local workflow checkpoints with Git references and verification evidence."
---

# Manage workflow checkpoints

Use `create <name>`, `verify <name>`, `list`, or `clear`. Use the repository-local helper `python3 <skill-dir>/scripts/checkpoints.py --help`. Resolve the skill directory from this file's installed path and run from the repository.

- **Create** — Run [verify](../verify/SKILL.md) in quick mode. Record the current commit and observed build, test, and coverage metrics using the helper. If the checkpoint must capture uncommitted changes, obtain authorization for a separate checkpoint commit, then record it. Otherwise label the checkpoint as a snapshot of the current commit.
- **Verify** — Ask the helper to resolve the saved commit and show file changes through the current worktree. Re-run comparable checks and report metric deltas; explicitly identify unavailable baseline metrics.
- **List** — Show name, time, commit and current/behind/ahead/diverged status relative to HEAD.
- **Clear** — Keep the newest five metadata rows after authorization to delete older rows. The helper does not mutate Git refs.

Report the checkpoint name and commit along with actual verification status.
