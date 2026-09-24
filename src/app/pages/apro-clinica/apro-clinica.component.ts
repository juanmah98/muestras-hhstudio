import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
  HostListener,
  inject,
} from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import gsap from 'gsap';

@Component({
  selector: 'app-apro-clinica',
  standalone: true,
  templateUrl: './apro-clinica.component.html',
  styleUrl: './apro-clinica.component.scss',
})
export class AproClinicaComponent implements AfterViewInit {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.updateMetaTags({
      title: 'Apro Clínica | Centro médico-estético — HH Studio',
      description:
        'Demo de landing editorial para centro médico-estético: bento grid, animaciones sutiles y tratamiento premium de la marca.',
      image: 'https://muestras.hhstudio.es/assets/og/apro-clinica.jpg',
      url: 'https://muestras.hhstudio.es/apro-clinica',
    });
  }

  readonly currentYear = new Date().getFullYear();
  mobileMenuOpen = false;
  navScrolled = false;

  @ViewChildren('animateSection') animateSections!: QueryList<
    ElementRef<HTMLElement>
  >;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.navScrolled = window.scrollY > 30;
  }

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
              { y: 48, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
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
