---
name: loop-status
description: "Inspect or watch repository-local status snapshots for managed Codex loops and recommend whether to continue, pause, or stop."
---

# Inspect a managed Codex loop

Accept a run ID, `--json`, `--watch`, `--watch-count N`, `--interval SECONDS`, and optionally `--stale-seconds N` or `--exit-code`. Without an ID list all known runs. To inspect a sibling or busy session, execute the same command in another terminal.

Run `python3 <skill-dir>/scripts/loop_status.py --help` from the repository root, then pass the selected arguments as separate argv values. The CLI reads snapshots produced by [loop-start](../loop-start/SKILL.md). In watch mode it defaults to three observations and prints one JSON object per observation with `--json`. Its staleness flag is based on the last snapshot timestamp. With `--exit-code`, blocked or stale runs and failing checks return 2. An unreadable snapshot returns 1 unless a run also returns 2.

Report state, phase, last checkpoint, failed checks, measured drift if available, and a continue/pause/inspect recommendation. A missing or old snapshot establishes a visibility gap. Use Codex's live session or terminal controls to confirm a process is still running before intervening.
