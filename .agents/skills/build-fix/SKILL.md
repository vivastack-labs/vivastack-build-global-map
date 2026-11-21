---
name: build-fix
description: "Diagnose and resolve build or type-check errors incrementally with minimal changes. Use react-build for React-specific failures."
---

# Fix a build

1. Identify the project's package manager and canonical build/type-check commands from CI, manifests and lockfiles. Run the relevant command and capture a baseline with its actual exit code. Distinguish environment and dependency blockers from code defects.
2. Group diagnostics by file and root cause. Fix an upstream import, syntax, or type error before its secondary diagnostics. Inspect context, make the smallest fix, and rerun the relevant check after each group.
3. Stop and report if failures expand, the same error survives three focused attempts, or the remedy requires a dependency decision or architectural change. Preserve the user's work and reverse only your own unsuccessful changes.
4. Run the full build and relevant tests after recovery. Report fixed, remaining, and new diagnostics with paths and actual commands.
