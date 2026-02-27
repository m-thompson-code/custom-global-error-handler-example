# Contracts: Custom Global Error Handler (Route-Based Behavior)

**Branch**: `001-custom-global-error-handler`  
**Spec**: `specs/001-custom-global-error-handler/spec.md`

This feature primarily exposes behavior to two kinds of consumers:

1. **Route configuration / guards** — which configure the global error handler.
2. **Integration tests** — which navigate routes and assert global error behavior.

## Contract 1: Global Error Handler Provider

- **Name**: `provideMyErrorHandler`
- **Type**: Angular provider factory
- **Responsibility**: Registers `MyErrorHandler` as both a concrete injectable service and as the implementation for Angular's global `ErrorHandler` token.

### Behavior

- Providing `provideMyErrorHandler()` MUST:
- Make a singleton `MyErrorHandler` available for injection.
- Override Angular's default `ErrorHandler` so that uncaught errors are delegated to the same `MyErrorHandler` instance.

## Contract 2: Route Guards for Behavior Configuration

- **Names**:
- `throwOnUncaughtErrorGuard`
- `logOnUncaughtErrorGuard`
- **Type**: Angular `CanActivateFn` guards
- **Responsibility**: Set the global error-handling behavior when navigating to specific demo routes.

### Behavior

- When `throwOnUncaughtErrorGuard` runs:
- It MUST set the global behavior to `'throw'` before the target route is activated.
- It MUST return `true` to allow navigation to proceed; it MUST NOT block navigation.

- When `logOnUncaughtErrorGuard` runs:
- It MUST set the global behavior to `'log'` before the target route is activated.
- It MUST return `true` to allow navigation to proceed; it MUST NOT block navigation.

## Contract 3: Integration Test Scenarios

- **Name**: Global error handling integration tests
- **Type**: Test contracts (Vitest + Angular test harness)
- **Responsibility**: Verify that navigation + guards + global error handler produce the expected behavior.

### Behavior

- **Log mode test**:
- MUST navigate to the log-errors route.
- MUST trigger the demo action that causes an uncaught error.
- MUST assert that the application remains usable and no additional error UI appears.
- MUST assert that the error was logged (e.g., by spying on `console.error`).

- **Throw mode test**:
- MUST navigate to the throw-errors route.
- MUST trigger the demo action that causes an uncaught error.
- MUST assert that the error is treated as uncaught by the test environment (e.g., test fails or error is surfaced as expected).
