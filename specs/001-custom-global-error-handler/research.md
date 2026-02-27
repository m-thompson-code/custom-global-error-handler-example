# Phase 0 Research: Custom Global Error Handler (Route-Based Behavior)

**Branch**: `001-custom-global-error-handler`  
**Spec**: `specs/001-custom-global-error-handler/spec.md`  
**Date**: 2026-02-27

## Decisions

### D1: Global error handling mechanism

- **Decision**: Use a custom Angular `ErrorHandler` implementation (`MyErrorHandler`) registered as the global error handler via Angular DI.
- **Rationale**: Aligns with official Angular guidance for customizing global error handling, provides a single interception point for uncaught errors, and keeps behavior configuration centralized.
- **Alternatives considered**:
- Use per-component `error` handling: Rejected because it would leak error-handling concerns into individual components and violate the requirement that components remain unaware of the global handler.
- Wrap the router in a top-level `try/catch`: Rejected as brittle and not idiomatic; would not reliably capture all uncaught asynchronous errors.

### D2: Behavior configuration mechanism

- **Decision**: Configure the error handler behavior (`log` vs `throw`) using Angular route guards that inject the singleton `MyErrorHandler` and call `setBehavior` when specific routes are activated.
- **Rationale**: Guards are designed to run during navigation, have access to DI, and can set global state before the target route is displayed. This keeps components unaware of error handling while allowing route-based behavior.
- **Alternatives considered**:
- Use route resolvers: Possible, but guards are simpler when only configuration is needed and no data must be resolved.
- Use component constructors or lifecycle hooks: Rejected because components should not be aware of global error handling and this would duplicate logic per component.

### D3: Logging behavior in `log` mode

- **Decision**: In `log` mode, log uncaught errors via `console.error` and do not show additional error UI to the user as long as the application remains usable.
- **Rationale**: Matches the "log and silence errors" requirement and keeps the demo focused on the difference between silent logging and uncaught errors, without adding extra UX complexity.
- **Alternatives considered**:
- Show a friendly inline message: Rejected for this demo to keep the UX simple and avoid conflating global error handling with user-facing error surfaces.

### D4: Behavior lifetime

- **Decision**: Once a route configures a specific error-handling behavior, that behavior remains globally active until another route explicitly changes it.
- **Rationale**: Matches the natural semantics of a singleton error handler and guard-based configuration; avoids the need for extra reset logic on every navigation.
- **Alternatives considered**:
- Reset behavior on every navigation to a default: Rejected as unnecessary complexity for a small demo and does not add value over explicit guard-based changes.

### D5: Testing strategy

- **Decision**: Use integration-style tests (via `ng test` + Vitest) that boot the Angular app, configure routes with guards, navigate to the demo routes, trigger the sample error, and assert behavior (logged vs uncaught).
- **Rationale**: Satisfies the requirement to test "all moving parts" together and matches the explicit constraint of the demo: it is a showcase of how to implement and integration-test a custom global error handler, not of how to unit-test the handler itself.
- **Alternatives considered**:
- Unit-test `MyErrorHandler` directly: Rejected because the demo explicitly forbids testing the handler in isolation; tests must go through routing + guards + global error handling to reflect real usage.

## Open Questions

No outstanding NEEDS CLARIFICATION items remain; all open questions from the specification have been resolved and captured there and in this research summary.
