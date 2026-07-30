import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-salud',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './salud.component.html',
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        text-align: center;
        padding: 2rem;
      }
      .placeholder__icon {
        font-size: 4rem;
        color: var(--hh-accent);
        margin-bottom: 1.5rem;
      }
      .placeholder__title {
        font-family: 'Playfair Display', serif;
        font-size: clamp(1.75rem, 4vw, 2.5rem);
        font-weight: 700;
        color: var(--hh-text-primary);
        margin-bottom: 0.75rem;
      }
      .placeholder__desc {
        font-size: 1rem;
        color: var(--hh-text-secondary);
        max-width: 480px;
        margin-bottom: 2rem;
        line-height: 1.6;
      }
      .placeholder__back {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.6rem 1.25rem;
        border: 1px solid var(--hh-border);
        border-radius: 6px;
        color: var(--hh-text-secondary);
        text-decoration: none;
        font-size: 0.9rem;
        transition: border-color 0.2s ease, color 0.2s ease;
      }
      .placeholder__back:hover {
        border-color: var(--hh-accent);
        color: var(--hh-accent);
      }
    `,
  ],
})
export class SaludComponent {}
