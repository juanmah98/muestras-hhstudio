import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';

interface Section {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  status: 'available' | 'coming-soon';
  icon: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  readonly sections: Section[] = [
    {
      slug: 'apro-clinica',
      title: 'Apro Clínica',
      description:
        'Landing page para centro médico-estético. Diseño editorial cálido con bento grid, animaciones sutiles y UX de lujo.',
      tags: ['Landing Page', 'Salud', 'Diseño Editorial'],
      status: 'available',
      icon: 'bi bi-building',
    },
  ];

  readonly currentYear = new Date().getFullYear();

  @ViewChildren('sectionCard') sectionCards!: QueryList<ElementRef<HTMLElement>>;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    const cards = this.sectionCards.map((ref) => ref.nativeElement);
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power2.out',
      },
    );
  }
}
