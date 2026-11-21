---
name: prp-plan
description: "Create a detailed PRP implementation plan from a feature brief or PRD, with repository evidence and runnable validation."
---

# PRP implementation plan

Accept a feature description or PRD path. If the PRD contains multiple phases, take the requested one or next pending one. Resolve material ambiguity before committing to a design.

1. Trace relevant architecture, analogous features, integrations, data models, test layout, naming, error and logging patterns, and validation commands. Record concrete file and symbol references. Use current primary references for external APIs when needed.
2. Specify the user story, scope, acceptance criteria, and risks. For UX work, include before/after flow, affected states, accessibility, and validation. Explain design decisions and compatibility or rollout constraints.
3. Save `docs/PRPs/plans/<name>.plan.md`. Include Summary, Mandatory Reading, External References, Patterns to Mirror, Files to Change, Exclusions, ordered Tasks, Testing Strategy, Validation Commands, Acceptance Criteria, Checklist, and Risks. For each task specify action, target path, pattern, caveat, and command or observable check. Include repro and full validation when relevant.
4. Check a fresh implementer could follow the plan using its references. Update only the selected phase and plan link in a Codex PRD. For an input under `.claude/`, record the phase in the new plan.
5. Present the plan for review and point to [prp-implement](../prp-implement/SKILL.md) for execution.
