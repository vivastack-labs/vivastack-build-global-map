---
name: loop-start
description: "Prepare a bounded Codex runbook and launch command for sequential, continuous-pr, rfc-dag, or open-ended work."
---

# Prepare a managed Codex loop

Accept `sequential|continuous-pr|rfc-dag|infinite` and `--mode safe|fast` (safe). Default to sequential. The request must define the objective and allowed changes. This skill prepares a runbook and launch command. Start an actual run only when the user asks.

1. Inspect the worktree, branch, baseline checks, and relevant hooks. Verify [verify](../verify/SKILL.md) in quick mode. Use `VCW_HOOK_PROFILE=strict` for safe mode and `standard` for fast mode where the repository provides these hooks. Keep approval gates for publication in both modes.
2. Pick a run ID using letters, digits, and hyphens. Under `artifacts/codex/loops/<id>/`, create `runbook.md` and `status.json`. Include objective, working directory, constraints, task order (or dependency DAG), checks, iteration or time limit for this run, and stopping conditions. Stop on repeated failure, blocked authorization, or exhaustion of the limit. For infinite mode use separately authorized, bounded batches.
3. Store a status object with `pattern`, `mode`, `state` (`prepared` initially), `phase`, `last_checkpoint`, `failing_checks` (array), and `updated_at` (UTC ISO 8601). The runbook must tell the running Codex to replace this snapshot atomically after major transitions, using `running`, `blocked`, `completed`, or `stopped`. Add elapsed time or measured cost when available.
4. In sequential mode use a fixed ordered queue. In continuous-pr mode work from an explicitly scoped PR queue and respect authorization for writes and publishing. In rfc-dag mode process only unblocked tasks. Give each task a checkpoint and check result.
5. Print the exact launch command, for example `VCW_HOOK_PROFILE=strict codex exec --sandbox workspace-write - < artifacts/codex/loops/<id>/runbook.md` from the repo root. The runbook is the prompt. Include the [loop-status](../loop-status/SKILL.md) monitoring command and state that the snapshot advances only when the runner writes it.
