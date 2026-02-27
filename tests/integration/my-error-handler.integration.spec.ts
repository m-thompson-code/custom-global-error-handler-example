import { ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { App } from '../../src/app/app';
import { routes } from '../../src/app/app.routes';
import { provideMyErrorHandler } from '../../src/app/routes/error-handling/provide-my-error-handler';

describe('MyErrorHandler integration', () => {
  let router: Router;
  let errorHandler: ErrorHandler;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [
        ...provideMyErrorHandler(),
        provideRouter(routes),
      ],
    });

    router = TestBed.inject(Router);
    errorHandler = TestBed.inject(ErrorHandler);
  });

  it('keeps the app usable and logs when an error is thrown on /log-error', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const fixture = TestBed.createComponent(App);

    await router.navigateByUrl('/log-error');
    fixture.detectChanges();

    const button: HTMLButtonElement | null = fixture.nativeElement.querySelector('button');
    expect(button).not.toBeNull();

    // Trigger the real component error; this should be handled by
    // the custom error handler in "log" mode without crashing the app.
    button!.click();
    fixture.detectChanges();

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(fixture.nativeElement.textContent).toContain('Log Error Page');

    consoleErrorSpy.mockRestore();
  });

  it('logs and silences errors when behavior is set to log', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    TestBed.createComponent(App);

    await router.navigateByUrl('/log-error');

    expect(() => errorHandler.handleError(new Error('test log error'))).not.toThrow();
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it('rethrows errors when behavior is set to throw', async () => {
    TestBed.createComponent(App);

    await router.navigateByUrl('/throw-error');

    expect(() => errorHandler.handleError(new Error('test throw error'))).toThrow();
  });
});
