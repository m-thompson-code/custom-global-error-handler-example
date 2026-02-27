import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';

import { MyErrorHandler } from './my-error-handler';

export const logOnUncaughtErrorGuard: CanActivateFn = () => {
  const errorHandler = inject(MyErrorHandler);
  errorHandler.setBehavior('log');

  return true;
};
