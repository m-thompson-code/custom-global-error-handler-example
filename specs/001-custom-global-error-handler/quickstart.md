# Quickstart: Custom Global Error Handler (Route-Based Behavior)

**Branch**: `001-custom-global-error-handler`  
**Spec**: `specs/001-custom-global-error-handler/spec.md`

This guide explains how to run and manually exercise the custom global error handler demo.

## 1. Install and run

```bash
npm install
npm start
```

- Open the application in your browser at the URL printed by `ng serve` (typically `http://localhost:4200`).

## 2. Navigate the demo routes

- Go to the **Log Errors** route (e.g., `/log-error`).
- Go to the **Throw Errors** route (e.g., `/throw-error`).

The exact links will be wired into the app's main navigation or accessible by directly entering the route URLs.

## 3. Trigger the demo error

On each route (log and throw):

1. Use the provided UI (such as a button) to trigger the demo action that intentionally causes an uncaught error.
2. Observe the behavior:
   - On the **Log Errors** route:
     - The page remains usable; no additional error UI is shown.
     - The error is logged to the browser console via `console.error`.
   - On the **Throw Errors** route:
     - The error is not handled silently; it surfaces as an uncaught error.

## 4. Run tests

To execute the automated tests (including integration tests for the global error handler):

```bash
npm test
```

- The integration tests in `tests/integration/my-error-handler.integration.spec.ts` will:
  - Navigate to the **log-errors** route (`/log-error`), trigger the demo error, assert that the page remains usable with no additional error UI, and verify that `console.error` was called.
  - Navigate to the **throw-errors** route (`/throw-error`), trigger the demo error, and assert that the error is surfaced as uncaught rather than being silently handled.

## 5. Where to change behavior

- Global error handler implementation and provider (planned):
  - `src/app/routes/error-handling/my-error-handler.ts`
  - `src/app/routes/error-handling/provide-my-error-handler.ts`
- Route-based configuration guards (planned):
  - `src/app/routes/error-handling/throw-on-uncaught-error.guard.ts`
  - `src/app/routes/error-handling/log-on-uncaught-error.guard.ts`
- Route configuration:
  - `src/app/app.routes.ts`

Modify these files to extend or adjust the error-handling behavior while keeping components unaware of the global handler.
