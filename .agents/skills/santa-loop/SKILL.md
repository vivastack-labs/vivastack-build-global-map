---
name: santa-loop
description: "Require two independent review verdicts on local work and repeat focused repairs until both pass or the round cap is reached."
---

# Santa review loop

Resolve scope from the user's request or use the uncommitted diff. Prepare one objective rubric for correctness, security, error handling, completeness, consistency, and regressions, adding domain checks only where relevant.

1. Give two independent read-only reviewers identical input and rubric, without each other's findings. Use authorized Codex subagents where available. If the user authorizes sending the scope to a second configured model/provider, a fresh read-only CLI review may fill one slot. If two independent reviewers cannot run, report the gate as incomplete.
2. Require each reviewer to return a PASS/FAIL, per-criterion results and evidence-backed critical issues. Malformed, failed, or missing output leaves the gate incomplete. Await both verdicts.
3. Two PASS results yield NICE. Otherwise report NAUGHTY, verify and deduplicate concrete findings, apply authorized focused fixes and run checks. A repair-round commit is optional when authorized. Run fresh reviewers on the same updated snapshot with the same rubric, up to three rounds total.
4. Report scope, reviewer backends, verdicts, rounds, verification, and remaining findings. Only push on NICE with separate publishing authorization. Escalate unresolved issues after the round cap.
