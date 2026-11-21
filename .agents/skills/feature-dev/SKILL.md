---
name: feature-dev
description: "Guide a feature through codebase discovery, design approval, implementation, review, and verification."
---

# Guided feature development

1. Turn the request into acceptance criteria. Trace how the relevant feature works today from entry points to dependencies, data boundaries, and tests. Read local guidance and inspect related implementations.
2. Present material design and edge-case questions raised by discovery. Wait for answers when choices change scope or behavior.
3. Propose a blueprint with file-level changes, alternatives if they matter, and a validation plan. Wait for the user's design approval before implementing.
4. Follow the approved design, using focused tests for observable behavior and small coherent changes. A commit requires authorization.
5. Review the diff for correctness, regression risks, and coverage. Use [code-review](../code-review/SKILL.md) and [verify](../verify/SKILL.md) as needed. Address confirmed important issues and report what shipped and how it was verified.

If the user asks for delegation and Codex provides agents, exploration, design feedback, and review can be separate assignments. The same phases work inline.
