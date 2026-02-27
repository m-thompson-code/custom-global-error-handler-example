# What the feature is

There will be a custom global error handler that will override the default global error handler for this Angular application. This custom global error handler will have 2 behaviors:

1. log and silence errors
2. rethrow errors so they remain uncaught

# Why this feature exists

This project is a demo for [how to implement a custom global error handler in Angular](https://angular.dev/api/core/ErrorHandler). It will showcase how to customize the behavior of the custom global error handler at runtime. In this demo, we'll be changing the behavior of the custom global error handler based on routing using [Guards](https://angular.dev/guide/routing/route-guards). This project will also showcase how to do an integration test for the custom global error handler.

# High-level scope and constraints

The custom global error handler should be implemented in such a way that the default error handler is overridden by our custom one. All set up and behavior changes for error handling should be done in a way that the implementation of the components at a route is unaware of a custom error handler exists or is doing anything special.

All implementations involving the custom global error handler should be tested using integration testing where all moving parts are included and minimal to zero mocking is done outside of the standard built-in blocking that Angular provides for things like routing, etc.

# Implementation nodes

Here is an example of the error handler that would allow for switching between throwing the error and logging it:

```ts
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  private readonly behavior: 'log' | 'throw' = 'throw';

  setBehavior(behavior: 'log' | 'throw'): void {
    this.behavior = behavior;
  }

  /**
   * Custom behavior for handling uncaught errors.
   */
  handleError(error: unknown): void {
    // Silence and log error
    if (this.behavior === 'log') {
      console.error(error);
      return;
    }

    // Throw error so it remains being uncaught
    throw error;
  }
}
```

The provider for the error handler should look like this:

```ts
export const provideMyErrorHandler = () => [
  // Provide the custom error handler as itself so the behavior property can be
  // set. This is required since behavior isn't a property of ErrorHandler.
  MyErrorHandler,
  // Override ErrorHandler to catch uncaught errors, while keeping
  // `MyErrorHandler` as a singleton.
  { provide: ErrorHandler, useExisting: MyErrorHandler },
];
```

The reasons for this is:
1. `MyErrorHandler` has to be accessible to the guards so they can call `MyErrorHandler.setBehavior`.
2. We need to provide `MyErrorHandler` for `ErrorHandler` to customize the global error handling for uncaught errors.

For setting the behavior of the custom global error handler, this should be done in the routing and never in the components being rendered. Only utilities like guards/resolvers should perform direct access to `MyErrorHandler`:

```ts
import { MyErrorhandler } from './my-error-handler';
import { inject, CanActivateFn } from '@angular/core';

export const throwOnUncaughtErrorGuard = (() => {
  const errorHandler = inject(MyErrorHandler);
  errorHandler.setBehavior('throw');
  // always return true. This guard isn't blocking navigation, it just sets
  // the behavior for custom error handling.
  return true;
}) satisfies CanActivateFn;
```

```ts
import { MyErrorhandler } from './my-error-handler';
import { inject, CanActivateFn } from '@angular/core';

export const logOnUncaughtErrorGuard = (() => {
  const errorHandler = inject(MyErrorHandler);
  errorHandler.setBehavior('log');
  // always return true. This guard isn't blocking navigation, it just sets
  // the behavior for custom error handling.
  return true;
}) satisfies CanActivateFn;
```

```ts
// app.routes.ts
import { AboutPageComponent } from './routes/about-page.component';
import { ThrowErrorPageComponent } from './routes/throw-error-page.component';
import { LogErrorPageComponent } from './routes/log-error-page.component';
import { Routes } from '@angular/router';
import { logOnUncaughtErrorGuard} from './error-handling';

export const routes: Routes = [
	{
    path: 'throw-error',
    component: ThrowErrorPageComponent,
    canActivate: [throwOnUncaughtErrorGuard],
  },
	{
    path: 'log-error',
    component: LogErrorPageComponent,
    canActivate: [logOnUncaughtErrorGuard],
  },
  // ...
];
```

For testing, we do NOT want to do unit tests where we test `MyErrorHandler` directly. The expected integration tests should include routing to a component and using whatever guards/resolvers are used to set the behavior of `MyErrorHandler` and then verifying that uncaught errors after navigating to a specific route results in the expected behavior of uncaught errors:

```ts
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMyErrorHandler } from './provide-my-error-handler';

describe('MyErrorHandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMyErrorHandler(),
        provideRouter([/* TODO: add paths with guards to set error handler behavior */]),
    });
  });

  it('should log errors when...', () => {
    // TODO: verify behavior of MyErrorHandler when behavior is set to 'log'
  });

  it('should throw errors when...', () => {
    // TODO: verify behavior of MyErrorHandler when behavior is set to 'throw'
  });
})
```
