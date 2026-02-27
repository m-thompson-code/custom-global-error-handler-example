import { Component } from "@angular/core";

@Component({
  selector: "app-throw-error-page",
  template: `
    <h1>Throw Error Page</h1>
    <button (click)="throwError()">Throw Error</button>
  `,
})
export class ThrowErrorPageComponent {
  throwError() {
    throw new Error("This is a test error thrown from ThrowErrorPageComponent.");
  }
}
