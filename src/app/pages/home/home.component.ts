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
    {
      slug: 'salud',
      title: 'Salud',
      description:
        'Landing page para centros de salud, clínicas y consultorios médicos.',
      tags: ['Landing Page', 'Salud', 'Consultorios'],
      status: 'coming-soon',
      icon: 'bi bi-heart-pulse-fill',
    },
    {
      slug: 'carpinteria',
      title: 'Carpintería',
      description:
        'Showcase para carpinterías, mueblerías y talleres de madera a medida.',
      tags: ['Landing Page', 'Carpintería', 'Muebles'],
      status: 'available',
      icon: 'bi bi-hammer',
    },
    {
      slug: 'reformas',
      title: 'Reformas & Fontanería',
      description:
        'Landing page para empresas de reformas, plomería y servicios del hogar.',
      tags: ['Landing Page', 'Reformas', 'Fontanería'],
      status: 'coming-soon',
      icon: 'bi bi-tools',
    },
    {
      slug: 'electricista',
      title: 'Electricista',
      description:
        'Landing page para electricistas, instaladores y servicios de electricidad.',
      tags: ['Landing Page', 'Electricidad', 'Instalaciones'],
      status: 'coming-soon',
      icon: 'bi bi-lightning-charge-fill',
    },
    {
      slug: 'estetica',
      title: 'Estética',
      description:
        'Landing page para centros de estética, salones de belleza y cosmética.',
      tags: ['Landing Page', 'Estética', 'Belleza'],
      status: 'coming-soon',
      icon: 'bi bi-stars',
    },
    {
      slug: 'pasteleria',
      title: 'Pastelería',
      description:
        'Landing page para pastelerías, reposterías y tiendas de productos dulces.',
      tags: ['Landing Page', 'Pastelería', 'Repostería'],
      status: 'coming-soon',
      icon: 'bi bi-cake2-fill',
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
