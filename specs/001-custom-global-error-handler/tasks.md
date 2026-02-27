# Tasks: Custom Global Error Handler (Route-Based Behavior)

**Input**: Design documents from `specs/001-custom-global-error-handler/`  
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Automated integration tests are explicitly required by the feature specification (FR-008, FR-009). Test tasks are included primarily under User Story 3.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies).
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3).
- Include exact file paths in descriptions.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm local project and test setup for this feature.

- [x] T001 Verify Angular dev server and test runner commands in package.json (scripts `start` and `test`) in `package.json`.
- [x] T002 [P] Create base integration tests directory for global error handler scenarios in `tests/integration/`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core error-handling infrastructure that MUST be complete before ANY user story can be fully implemented.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T003 Create error-handling feature folder for global error handler artifacts in `src/app/routes/error-handling/`.
- [x] T004 Implement `MyErrorHandler` class with `'log' | 'throw'` behavior and `handleError` method in `src/app/routes/error-handling/my-error-handler.ts`.
- [x] T005 Implement `provideMyErrorHandler` provider factory that registers `MyErrorHandler` as the global `ErrorHandler` in `src/app/routes/error-handling/provide-my-error-handler.ts`.
- [x] T006 Wire `provideMyErrorHandler` into the application bootstrap providers so it overrides the default `ErrorHandler` and defaults to `'throw'` behavior in `src/app/app.config.ts`.
- [x] T007 Create placeholder integration test file with failing test cases for log and throw flows in `tests/integration/my-error-handler.integration.spec.ts`.

**Checkpoint**: Foundation ready — user story implementation can now begin in parallel.

---

## Phase 3: User Story 1 - Log uncaught errors without breaking the page (Priority: P1) 🎯 MVP

**Goal**: When a user visits the log-errors route and triggers the demo error, the app remains usable with no additional error UI while the error is logged via `console.error`.

**Independent Test**: Run the app, navigate to `/log-error`, trigger the demo action, and verify that the app continues to function, no extra error UI appears, and the error is visible in the browser console.

### Implementation for User Story 1

 [x] T008 [P] [US1] Verify or create the `log-error` route using `LogErrorPageComponent` in `src/app/app.routes.ts`.
 [x] T009 [US1] Implement `logOnUncaughtErrorGuard` as a `CanActivateFn` that sets `MyErrorHandler` behavior to `'log'` and returns `true` in `src/app/routes/error-handling/log-on-uncaught-error.guard.ts`.
 [x] T010 [US1] Register `logOnUncaughtErrorGuard` on the `log-error` route so navigation activates log behavior in `src/app/app.routes.ts`.
 [x] T011 [US1] Ensure `LogErrorPageComponent` exposes a demo action (e.g., button) that triggers an uncaught error without referencing `MyErrorHandler` directly in `src/app/routes/log-error-page.component.ts`.

**Checkpoint**: User Story 1 can be manually exercised and validated independently via `/log-error`.

---

## Phase 4: User Story 2 - Surface uncaught errors for debugging and monitoring (Priority: P2)

**Goal**: When a user visits the throw-errors route and triggers the demo error, the error is surfaced as an uncaught error for debugging/monitoring purposes.

**Independent Test**: Run the app, navigate to `/throw-error`, trigger the demo action, and verify that the error is not silently handled and is treated as an uncaught error by the environment.

### Implementation for User Story 2

 [x] T012 [P] [US2] Verify or create the `throw-error` route using `ThrowErrorPageComponent` in `src/app/app.routes.ts`.
 [x] T013 [US2] Implement `throwOnUncaughtErrorGuard` as a `CanActivateFn` that sets `MyErrorHandler` behavior to `'throw'` and returns `true` in `src/app/routes/error-handling/throw-on-uncaught-error.guard.ts`.
 [x] T014 [US2] Register `throwOnUncaughtErrorGuard` on the `throw-error` route so navigation activates throw behavior in `src/app/app.routes.ts`.
 [x] T015 [US2] Ensure `ThrowErrorPageComponent` exposes the same demo action pattern (e.g., button) that triggers an uncaught error without referencing `MyErrorHandler` directly in `src/app/routes/throw-error-page.component.ts`.

**Checkpoint**: User Story 2 can be manually exercised and validated independently via `/throw-error`.

---

## Phase 5: User Story 3 - Verify behavior via integration tests (Priority: P3)

**Goal**: Automated integration tests start the app, navigate to demo routes, trigger the sample errors, and assert that global error handling behaves as expected for each route.

**Independent Test**: Run `npm test` and confirm that the integration tests for log-errors and throw-errors routes pass and correctly distinguish logged vs uncaught behavior.

### Tests for User Story 3

 [x] T016 [P] [US3] Implement integration test for the log-errors flow that navigates to `/log-error`, triggers the demo error, asserts the app remains usable with no additional error UI, and verifies `console.error` is called in `tests/integration/my-error-handler.integration.spec.ts`.
 [x] T017 [P] [US3] Implement integration test for the throw-errors flow that navigates to `/throw-error`, triggers the demo error, and asserts the error is treated as uncaught by the test environment in `tests/integration/my-error-handler.integration.spec.ts`.
 [x] T018 [US3] Add shared test helpers for navigating between routes and triggering the demo error without directly accessing `MyErrorHandler` in `tests/integration/my-error-handler.integration.spec.ts` (or a nearby helper file).
 [x] T019 [US3] Update the quickstart guide to document how to run and interpret the integration tests for both behaviors in `specs/001-custom-global-error-handler/quickstart.md`.

- [ ] T018 [US3] Add shared test helpers for navigating between routes and triggering the demo error without directly accessing `MyErrorHandler` in `tests/integration/my-error-handler.integration.spec.ts` (or a nearby helper file).
- [ ] T019 [US3] Update the quickstart guide to document how to run and interpret the integration tests for both behaviors in `specs/001-custom-global-error-handler/quickstart.md`.

**Checkpoint**: User Story 3 is complete when both integration tests pass consistently and the quickstart reflects the testing workflow.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories.

 [x] T020 [P] Add a short section to the main README describing the custom global error handler demo and linking to `custom-error-handler-implementation-notes.md` and `specs/001-custom-global-error-handler/quickstart.md` in `README.md`.
 [x] T021 Run through the full quickstart flow and adjust any mismatched route names or instructions between `specs/001-custom-global-error-handler/quickstart.md` and `src/app/app.routes.ts`.

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories.
- **User Stories (Phase 3–5)**: All depend on Foundational phase completion.
  - User Story 1 (P1) can start after Phase 2.
  - User Story 2 (P2) can start after Phase 2; may be developed in parallel with US1 once shared files (e.g., `app.routes.ts`) are coordinated.
  - User Story 3 (P3) can start after Phase 2 and after at least the basic routes/guards for US1 and US2 are available.
- **Polish (Final Phase)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Depends on Phase 2 foundational tasks (MyErrorHandler + provider + wiring). No dependency on other user stories.
- **User Story 2 (P2)**: Depends on Phase 2 foundational tasks (same as US1). Does not require US1 to be complete but shares routing files.
- **User Story 3 (P3)**: Depends on Phase 2 foundational tasks and on the existence of the routes and guards from US1 and US2, but its tests are focused on verifying behavior rather than changing runtime behavior.

### Within Each User Story

- For US1 and US2:
  - Guards should be implemented before route registration that depends on them.
  - Routes should be configured before manual or automated testing.
  - Components must not reference `MyErrorHandler` directly.
- For US3:
  - Basic test skeleton (T007) should exist before filling in detailed test behavior (T016, T017).
  - Shared helpers (T018) can be added alongside or before the detailed tests.

### Parallel Opportunities

- T001 and T002 can be performed in parallel during setup.
- Within Phase 2, T003–T006 should generally be sequenced, but T007 can be prepared in parallel once the tests directory exists.
- After Phase 2:
  - Parts of US1 (T008, T011) and US2 (T012, T015) that touch different files can be done in parallel, with coordination for edits to `src/app/app.routes.ts`.
  - US3 test tasks T016 and T017 are marked [P] and can be implemented in parallel inside `tests/integration/my-error-handler.integration.spec.ts` once T007 and foundational work are done.
- Polish tasks T020 and T021 can run after user stories are complete and can be parallelized with other non-conflicting work.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories).
3. Complete Phase 3: User Story 1 (log-errors flow).
4. **STOP and VALIDATE**: Manually test `/log-error` to ensure the app remains usable and errors are logged via `console.error`.
5. Optionally demo or share this minimal MVP.

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready.
2. Add User Story 1 → Test independently via `/log-error` → Demo as MVP.
3. Add User Story 2 → Test independently via `/throw-error` → Demo side-by-side comparison of log vs throw behavior.
4. Add User Story 3 → Implement and stabilize integration tests → Use as regression suite for ongoing changes.
5. Apply Polish phase to improve documentation and validate quickstart instructions.

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together.
2. Once Foundational is done:
   - Developer A: Phase 3 (US1 — log-errors route and guard).
   - Developer B: Phase 4 (US2 — throw-errors route and guard).
   - Developer C: Phase 5 (US3 — integration tests and helpers).
3. After all stories are complete, one developer can handle Phase N (Polish) while others refine tests or demo scenarios.

---

## Notes

- [P] tasks = different files, no hard dependencies.
- [Story] label maps tasks to specific user stories for traceability.
- Each user story is independently testable and deliverable.
- Integration tests for the global error handler MUST go through routing and guards; `MyErrorHandler` MUST NOT be unit-tested directly in isolation.
- Commit after each task or logical group to keep changes reviewable.
- At any checkpoint, you can stop and validate that the corresponding user story still works independently.
