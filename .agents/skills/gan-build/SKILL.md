---
name: gan-build
description: "Build or improve an implementation through a bounded planning, generation, and rubric-based evaluation loop."
---

# Generator and evaluator build loop

Use the user brief and optional `--max-iterations N` (15), `--pass-threshold N` (7.0 out of 10), `--skip-planner`, and `--eval-mode playwright|screenshot|code-only` (playwright). Validate positive iteration count and threshold on the 0–10 scale.

1. Create `gan-harness/` with `spec.md`, `eval-rubric.md`, `feedback/`, and, if needed, `screenshots/`. With `--skip-planner`, require both existing spec and rubric. Agree on weighted design, originality, craft, and functionality criteria with observable anchors.
2. For each cycle implement the next improvements against the spec and previous feedback. Run repo checks and start the app only when the chosen evaluation mode needs it. Maintain `generator-state.md` with completed work, checks and blockers.
3. Evaluate the snapshot against the fixed rubric in the selected mode. Use an independent Codex reviewer when authorized and available; otherwise disclose single-session evaluation. Capture evidence for scores and next changes in `feedback/feedback-<NNN>.md`. If the requested mode needs unavailable tooling, report a blocker or obtain agreement on a mode change.
4. Stop on pass, two consecutive iterations without improvement, the round cap, or a blocker. Save `gan-harness/build-report.md` with result, score history, elapsed time, measured costs if available, remaining issues, and artifact paths. Commit only when authorized.
