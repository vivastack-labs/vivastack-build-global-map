---
name: plan
description: "Plan an implementation from a feature brief or PRD, identify risks and tests, and stop for approval before coding."
---

# Implementation plan

Use the request accompanying this skill as a feature brief or a path to a `.prd.md` file. If the scope is missing, ask for the objective.

1. Read the applicable `AGENTS.md` files and inspect the affected entry points, callers, conventions, and tests. Use a read-only exploration pass.
2. Restate requirements, out-of-scope items, assumptions, dependencies, and risks. Propose an ordered implementation with concrete paths, estimated complexity, tests, rollout or rollback details where relevant, and acceptance criteria.
3. For a PRD, select the next pending delivery milestone or implementation phase unless the user specified one. Save `docs/plans/<name>.plan.md`. For a Codex PRD, update only its selected milestone row to `in-progress` and link the plan. Read a legacy Claude PRD as input and record its proposed status in the new plan.
4. Present the plan and stop for confirmation before implementing. For a plain brief, keep the plan in the conversation unless a file is requested. The native Plan mode can be used when the client offers it.

Use [plan-prd](../plan-prd/SKILL.md) for a lightweight PRD or [prp-plan](../prp-plan/SKILL.md) for a detailed PRP implementation plan.
