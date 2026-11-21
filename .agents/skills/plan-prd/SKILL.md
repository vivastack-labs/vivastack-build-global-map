---
name: plan-prd
description: "Write a lightweight problem-first PRD for a product or feature and identify the first milestone for the plan skill."
---

# Lightweight PRD

Use the idea in the request. When it is absent, ask who experiences which problem and what outcome would improve. Gather only evidence needed to distinguish assumptions from observations. When the decision is material, resolve the riskiest question with the user before writing.

1. Frame the problem, affected users, current workaround, and evidence. State a falsifiable hypothesis and how it will be checked.
2. Set success metrics with baseline, target, and time window when known. Mark unknown values as open questions. Decide in-scope and out-of-scope work and list risks, owners, or dependencies where known.
3. Save `docs/prds/<name>.prd.md` using sections for Problem, Evidence, Users, Hypothesis, Success Metrics, Scope, Delivery Milestones, Open Questions, and Risks.
4. In Delivery Milestones, use columns `Milestone | Outcome | Validation | Status | Plan`. Initialize each row as `pending` and leave Plan empty.
5. Share the path, key assumptions, and first milestone. Hand off the artifact to [plan](../plan/SKILL.md) when implementation planning is requested.

Use [prp-prd](../prp-prd/SKILL.md) when the user wants deeper iterative discovery and technical validation.
