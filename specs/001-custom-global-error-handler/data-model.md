# Data Model: Custom Global Error Handler (Route-Based Behavior)

**Branch**: `001-custom-global-error-handler`  
**Spec**: `specs/001-custom-global-error-handler/spec.md`

## Entities

### Global Error Handling Configuration

- **Description**: Represents the currently active strategy for dealing with unexpected, uncaught errors across the Angular application.
- **Fields**:
- `behavior: 'log' | 'throw'` — current global behavior for uncaught errors.
- **Relationships**:
- Used by the global error handler (`MyErrorHandler`) to decide how to process each uncaught error.
- Updated by route guards when specific routes are activated.

### Error Event

- **Description**: An occurrence of an unexpected failure captured by the global error handler.
- **Fields**:
- `error: unknown` — the raw error object.
- `timestamp: Date` (conceptual; may not be persisted) — when the error occurred.
- `contextRoute?: string` — conceptual route or context where the error was triggered (if available).
- **Relationships**:
- Produced by the global error handler when `handleError` is invoked.
- In this demo, error events are surfaced via `console.error` rather than being persisted.

### Navigation Context

- **Description**: Captures how a user reached a given page and which configuration should apply.
- **Fields**:
- `routePath: string` — the active route (e.g., `'/log-error'`, `'/throw-error'`).
- **Relationships**:
- Used indirectly by Angular routing and guards to decide which error-handling behavior to set.

## State Transitions

### Global Error Handling Configuration

- **Initial State**:
- `behavior = 'throw'` (default behavior before any route-specific guard runs).

- **Transitions**:
- `setBehavior('log')` — invoked by `logOnUncaughtErrorGuard` when the user navigates to the log-errors route; sets `behavior` to `'log'`.
- `setBehavior('throw')` — invoked by `throwOnUncaughtErrorGuard` when the user navigates to the throw-errors route; sets `behavior` to `'throw'`.

- **Invariants**:
- `behavior` is always either `'log'` or `'throw'`.
- At any given time, there is exactly one active global behavior.

### Error Event Handling

- **When behavior is `'log'`**:
- Incoming uncaught error → logged via `console.error` → application continues running; no additional error UI is shown.

- **When behavior is `'throw'`**:
- Incoming uncaught error → rethrown by `MyErrorHandler` → treated as an uncaught error by the environment (e.g., tests fail, default error UI may appear).
