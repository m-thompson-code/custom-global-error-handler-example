import { ErrorHandler, Injectable } from '@angular/core';

export type ErrorHandlingBehavior = 'log' | 'throw';

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  private behavior: ErrorHandlingBehavior = 'throw';

  setBehavior(behavior: ErrorHandlingBehavior): void {
    this.behavior = behavior;
  }

  handleError(error: unknown): void {
    if (this.behavior === 'log') {
      console.error(error);
      return;
    }

    throw error;
  }
}
