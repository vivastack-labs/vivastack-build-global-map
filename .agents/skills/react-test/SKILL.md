---
name: react-test
description: "Implement or change React behavior using tests first with React Testing Library, Vitest or Jest, and observable accessibility checks."
---

# React test-driven development

1. Identify the component or hook API, expected behavior, existing test runner and conventions. Map user-visible states such as loading, error, empty, success, disabled, and keyboard interactions as relevant.
2. Write the smallest observable tests and run them first. Confirm the expected RED failure comes from the unimplemented behavior. Use role or label queries, `userEvent.setup()` per test, `findBy` or `waitFor` for async behavior, and the project's MSW setup for network boundaries where present. Use `renderHook` for hooks whose behavior can be isolated.
3. Implement the minimal logic, rerun tests to GREEN, refactor while green, and run affected suites. Check accessibility and avoid assertions on component internals, arbitrary delays, or snapshots as sole evidence.
4. Follow repository coverage gates. Where there is no defined gate, report reference targets of 90% for pure utilities, 85% for hooks, 80% for presentational components and 70% for containers. Check page behavior through E2E tests where available.
5. Report the initial failure, final results, coverage and any gaps.
