---
name: refactor-clean
description: "Find and safely remove confirmed dead code or redundant dependencies with incremental validation and rollback of your own edits."
---

# Remove dead code

1. Establish a baseline with the relevant test suite. Prefer repo-configured Knip, static analyzers, or language tooling. Use search and dependency tracing if no tool is present.
2. Separate internal unused code from dynamically referenced code and externally consumed entry points. Check public exports, routes, reflection, plugin/config strings, dynamic imports, generated references, and external consumers before removing anything.
3. Remove one confirmed item at a time and rerun the relevant suite. On regression, undo only your own edit and keep the candidate. Leave ambiguous cases and public entry points in place pending evidence.
4. After cleanup, consolidate confirmed duplicates only if requested and behavior can be covered. Rerun final checks and report removed items, skipped candidates, and results.
