import { Component } from '@angular/core';

@Component({
  selector: 'app-about-page',
  standalone: true,
  template: `
    <h1>About This Demo</h1>
    <p>
      This demo shows how to use a custom global error handler in Angular.
      Both error pages will throw an error on button click.
      The "Throw Error Page" will throw an error that is not caught, which will trigger the global error handler and rethrow that error preserving the existing behavior of the global error handler.
      The "Log Error Page" will do the same, but instead, the custom error handler will log the error to the console and swallow the error.
    </p>
    <p>
      This is a simple demo to show how to have custom behaviors of the global error handler that can be changed at runtime. This demo uses a mixture of Guards to set the behavior of our custom global error handler.
  `,
  styles: []
})
export class AboutPageComponent {}
