# Implementation Plan: Custom Global Error Handler (Route-Based Behavior)

**Branch**: `001-custom-global-error-handler` | **Date**: 2026-02-27 | **Spec**: `specs/001-custom-global-error-handler/spec.md`  
**Input**: Feature specification from `specs/001-custom-global-error-handler/spec.md`

**Note**: This plan is produced by `/speckit.plan` and will guide implementation and testing of the custom global error handler, its route-based behaviors, and integration tests.

## Summary

Implement a custom global error handler for the Angular demo application that replaces the default `ErrorHandler` and supports two behaviors for uncaught errors:

- `log` mode: silently logs uncaught errors via `console.error` while keeping the UI usable and not showing additional error UI to the user.
- `throw` mode: rethrows uncaught errors so they surface normally, allowing tests and tooling to observe failures.

The active behavior is configured via routing using lightweight guards that inject the shared `MyErrorHandler` instance and set its behavior when specific routes are activated. Demo routes will showcase both behaviors, and integration tests will verify end-to-end behavior (navigation + guard configuration + global error handling) without unit-testing `MyErrorHandler` in isolation.

## Technical Context

**Language/Version**: TypeScript (via Angular CLI, TypeScript ~5.9)  
**Primary Dependencies**: Angular 21 (`@angular/core`, `@angular/router`, `@angular/common`), RxJS 7.8  
**Storage**: N/A (no persistence required for this demo)  
**Testing**: Vitest (configured via `ng test`), JS DOM test environment  
**Target Platform**: Browser-based Angular single-page application served by the Angular CLI dev server  
**Project Type**: Frontend web application (single Angular app)  
**Performance Goals**: No strict throughput/latency goals; interactions should feel instantaneous for a single demo user  
**Constraints**: Keep implementation simple and idiomatic for Angular 21; avoid introducing additional libraries beyond the existing stack  
**Scale/Scope**: Small demo application with a handful of routes and components, focused on illustrating global error handling rather than large-scale usage

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Constitution Source**: No `.specify/memory/constitution.md` file is present in this repository; there are no additional repository-wide constitutional constraints to enforce beyond the general guidance in the speckit templates.
- **Complexity**: This feature will keep to a single Angular application with minimal new files (one error handler, provider wiring, two guards, demo routes/components, and tests). No new packages, projects, or layers (e.g., custom DI containers or repositories) will be introduced.
- **Testing Strategy**: Favor integration tests that exercise routing + guards + global error handler together, in line with the feature spec; do not add low-level unit tests for `MyErrorHandler` unless later required by other features.

**Gate Evaluation (Pre–Phase 0)**: PASS — The planned approach is simple, uses the existing Angular stack, and avoids unnecessary architectural complexity.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
```text
```text
src/
├── main.ts
├── styles.css
└── app/
    ├── app.config.ts
    ├── app.routes.ts
    ├── app.html
    ├── app.css
    ├── app.ts
    └── routes/
        ├── about-page.component.ts
        ├── about-page.component.css
        ├── throw-error-page.component.ts
        ├── log-error-page.component.ts
        └── [NEW] error-handling/
            ├── my-error-handler.ts
            ├── provide-my-error-handler.ts
            ├── throw-on-uncaught-error.guard.ts
            └── log-on-uncaught-error.guard.ts

tests/ (to be aligned with Angular CLI + Vitest conventions)
├── integration/
│   └── my-error-handler.integration.spec.ts
└── [other existing test files]
```

**Structure Decision**: Use the existing single Angular application structure under `src/app` and group all global error handling artifacts (handler, provider, guards) in a dedicated `error-handling` folder under `src/app/routes` (or similar feature folder). Integration tests will live under a dedicated `tests/integration` area (or the Angular/Vitest-equivalent folder) and will exercise navigation and error behavior end-to-end.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
