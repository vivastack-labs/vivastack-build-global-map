---
name: save-session
description: "Save a dated Codex handoff with verified progress, decisions, blockers, and a precise next step for later resumption."
---

# Save a session handoff

Gather evidence from the current conversation, worktree, and checks. Save a UTF-8 Markdown note under `artifacts/codex/sessions/YYYY-MM-DD-<short-id>-session.md` at the Git root. Use today's date and an unused short lowercase alphanumeric ID. Create a new file with exclusive creation or confirm before replacing any existing handoff.

Start the note with the title and metadata lines `Project:`, `Branch:`, and `Worktree:` for [sessions](../sessions/SKILL.md). Include the objective, what worked with evidence, failed attempts and reasons, untried approaches, current files or commits, decisions, open questions, exact next step, and relevant setup. Mark assumptions and omit credentials, secret values, and raw transcripts.

Report the saved path and next step. The note can be loaded with [resume-session](../resume-session/SKILL.md).
