---
name: react-build
description: "Fix React, JSX, or TSX build and type errors, including bundler failures, hydration errors, and server/client boundaries."
---

# Fix a React build

1. Detect Vite, webpack, Next.js, CRA, Parcel, esbuild, or Bun from actual project configuration. Run the configured build first and the local type checker where available. Reproduce a hydration failure in a browser where needed.
2. Group diagnostics and fix one root cause at a time. Check JSX transform settings, imports and aliases, missing types and hook imports, and deterministic server rendering. Apply client boundaries only where hooks or browser capabilities require them and check prop serialization across that boundary.
3. Rerun the smallest failing build or type check after each fix. Preserve compiler strictness, bundler settings and unrelated code. Stop if three focused attempts fail on the same root cause or the solution requires dependency or architectural changes.
4. Run the full build and relevant smoke tests. Report the detected build system, baseline, fixes, verification and blockers.
