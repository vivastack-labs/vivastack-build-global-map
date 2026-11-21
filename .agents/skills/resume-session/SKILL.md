---
name: resume-session
description: "Load a saved Codex handoff by latest, path, date, ID, or alias and prepare to resume from its last verified checkpoint."
---

# Resume from a saved handoff

Accept a date, short ID, alias, path, or no argument for the newest entry. For managed notes, use the helper in [sessions](../sessions/SKILL.md) with `load <selector>` (use `latest` for no input). Resolve same-day ambiguity using session info. For an explicit path, read that note directly, including a Claude handoff when explicitly supplied.

Read the whole note. Check current repository, branch, relevant files, and Git status against the recorded state before trusting it. Summarize verified progress, outdated claims, blocked items, and the exact next step. Wait for the user to authorize resumed work unless they already requested that specific continuation.

A handoff restores recorded context. To resume an actual Codex conversation with its native history, use the client resume feature.
