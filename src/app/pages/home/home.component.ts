import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
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
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.updateMetaTags({
      title: 'HH Studio | Showcase de Proyectos',
      description:
        'Vidriera de proyectos de HH Studio. Desarrollo web, aplicaciones y software a medida. Mirá lo que hacemos.',
      image: 'https://muestras.hhstudio.es/assets/seo-preview.jpg',
      url: 'https://muestras.hhstudio.es/',
    });
  }

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
      status: 'available',
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
      title: 'ST REFORMAS',
      description:
        'Landing page para empresas de reformas integrales. Calculadora de presupuesto, antes/después, 7 secciones full-screen.',
      tags: ['Landing Page', 'Reformas', 'Presupuestos'],
      status: 'available',
      icon: 'bi bi-tools',
    },
    {
      slug: 'electricista',
      title: 'VOLTIO Electricista',
      description:
        'Portfolio industrial dark para electricista profesional. Galería de proyectos, certificaciones, zonas de servicio y urgencias 24h.',
      tags: ['Landing Page', 'Electricidad', 'Portfolio'],
      status: 'available',
      icon: 'bi bi-lightning-charge-fill',
    },
    {
      slug: 'estetica',
      title: 'LUMINA Estética',
      description:
        'Centro de estética premium con diseño Soft Luxe. Reserva online, antes/después, precios transparentes.',
      tags: ['Landing Page', 'Estética', 'Belleza'],
      status: 'available',
      icon: 'bi bi-stars',
    },
    {
      slug: 'pasteleria',
      title: 'Pastelería',
      description:
        'Landing page para pastelerías, reposterías y tiendas de productos dulces.',
      tags: ['Landing Page', 'Pastelería', 'Repostería'],
      status: 'available',
      icon: 'bi bi-cake2-fill',
    },
    {
      slug: 'seo-ia',
      title: 'SEO & IA',
      description:
        'Showcase de servicios de posicionamiento, datos y automatización con IA. Auditoría técnica, schema markup y APIs de mapas.',
      tags: ['Landing Page', 'SEO', 'IA'],
      status: 'available',
      icon: 'bi bi-graph-up-arrow',
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
