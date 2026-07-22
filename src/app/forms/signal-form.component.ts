import { Component, signal } from '@angular/core';
import { form, required, email, FormRoot } from '@angular/forms/signals';

/**
 * Standalone showcase component demonstrating Angular 22 Signal Forms
 * using the new `@angular/forms/signals` API.
 *
 * This component is NOT included in app.component.html — it is a
 * reference example for template consumers of this boilerplate.
 */
@Component({
  selector: 'app-signal-form',
  standalone: true,
  imports: [FormRoot],
  templateUrl: './signal-form.component.html',
  styleUrl: './signal-form.component.scss',
})
export class SignalFormComponent {
  /**
   * Contact form with signal-based model and reactive validation.
   * - name: required
   * - email: required + email format
   * - message: required
   */
  readonly contactForm = form(
    signal({
      name: '',
      email: '',
      message: '',
    }),
    (schema) => {
      required(schema.name);
      email(schema.email);
      required(schema.message);
    },
  );
}
