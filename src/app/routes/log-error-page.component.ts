import { Component } from "@angular/core";

@Component({
  selector: "app-log-error-page",
  template: `
    <h1>Log Error Page</h1>
    <button (click)="throwError()">Throw Error</button>
  `,
})
export class LogErrorPageComponent {
  throwError() {
    throw new Error("This is a test error thrown from LogErrorPageComponent.");
  }
}
