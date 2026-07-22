import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-apro-clinica',
  standalone: true,
  templateUrl: './apro-clinica.component.html',
  styleUrl: './apro-clinica.component.scss',
})
export class AproClinicaComponent implements AfterViewInit {
  readonly currentYear = new Date().getFullYear();
  mobileMenuOpen = false;

  @ViewChildren('animateSection') animateSections!: QueryList<
    ElementRef<HTMLElement>
  >;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    this.animateSections.forEach((ref) => observer.observe(ref.nativeElement));
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  scrollTo(sectionId: string): void {
    this.mobileMenuOpen = false;
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
