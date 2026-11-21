---
name: sessions
description: "List, load, alias, and inspect repository-local Codex session handoff notes managed by save-session."
---

# Manage session handoffs

Run `python3 <skill-dir>/scripts/sessions.py --help` from the repo. Pass the user's arguments separately to the helper.

- `list [--limit N] [--date YYYY-MM-DD] [--search TEXT]` is the default. It lists newest notes first with branch, worktree, and aliases.
- `load ID_OR_ALIAS` prints the Markdown handoff. `info [ID_OR_ALIAS]` shows metadata and statistics, defaulting to the latest note.
- `alias ID_OR_ALIAS NAME` creates a memorable name. `aliases` lists names. `alias --remove NAME` and `unalias NAME` remove only the alias. `help` shows usage.
- The selector can be `latest`, date, short ID, file name, or an alias. Resolve ambiguous dates or IDs explicitly.

Storage is `artifacts/codex/sessions/` for the current worktree. [save-session](../save-session/SKILL.md) creates handoffs and [resume-session](../resume-session/SKILL.md) interprets them. Codex-native conversation lists and full history are managed by the Codex client.
