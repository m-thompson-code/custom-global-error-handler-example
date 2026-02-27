import { ErrorHandler, Provider } from '@angular/core';

import { MyErrorHandler } from './my-error-handler';

export const provideMyErrorHandler = (): Provider[] => [
  MyErrorHandler,
  { provide: ErrorHandler, useExisting: MyErrorHandler },
];
