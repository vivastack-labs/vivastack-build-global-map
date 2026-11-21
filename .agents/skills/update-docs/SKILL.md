---
name: update-docs
description: "Synchronize existing documentation with manifests, example environment files, schemas, routes, exports and deployment configuration."
---

# Synchronize documentation

1. Identify the requested docs and their sources of truth. Use package scripts, Makefiles, manifests, example env files, schemas, routes, exports and deployment configuration. Extract documented variable names and formats from example files, omitting real secret values.
2. Update the applicable command, env, API or contribution references and deployment runbook. Include supported prerequisites, tests, configuration, health checks, recovery and rollback only when evidenced. Preserve manual prose and surround generated blocks with the repo's markers or paired `<!-- AUTO-GENERATED -->` markers.
3. Flag potentially stale docs older than 90 days when their sources have changed. Create new document files only when requested.
4. Run relevant docs checks and report updated, flagged, skipped and any missing source-of-truth inputs.
