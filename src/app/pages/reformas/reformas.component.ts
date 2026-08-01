import {
  Component,
  AfterViewInit,
  HostListener,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, LowerCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

interface ProjectItem {
  title: string;
  location: string;
  category: string;
  gradient: string;
}

interface FaqItem {
  question: string;
  answer: string;
  open: boolean;
}

interface NavLink {
  label: string;
  fragment: string;
}

interface TrustBadge {
  icon: string;
  text: string;
}

interface CompareSlider {
  beforeLabel: string;
  beforeGradient: string;
  afterLabel: string;
  afterGradient: string;
  position: number;
  imageUrl?: string;
}

@Component({
  selector: 'app-reformas',
  standalone: true,
  imports: [RouterLink, FormsModule, CurrencyPipe, LowerCasePipe],
  templateUrl: './reformas.component.html',
  styleUrl: './reformas.component.scss',
})
export class ReformasComponent implements AfterViewInit {
  readonly currentYear = new Date().getFullYear();
  mobileMenuOpen = false;
  scrolled = false;

  readonly navLinks: NavLink[] = [
    { label: 'Inicio', fragment: 'inicio' },
    { label: 'Servicios', fragment: 'servicios' },
    { label: 'Trabajos', fragment: 'trabajos' },
    { label: 'Proyectos', fragment: 'proyectos' },
    { label: 'Presupuesto', fragment: 'presupuesto' },
    { label: 'FAQ', fragment: 'faq' },
    { label: 'Contacto', fragment: 'contacto' },
  ];

  readonly trustBadges: TrustBadge[] = [
    { icon: 'bi-award', text: '15+ Años de Experiencia' },
    { icon: 'bi-building-check', text: '+200 Proyectos' },
    { icon: 'bi-shield-check', text: 'Garantía 5 Años' },
    { icon: 'bi-file-text', text: 'Presupuesto sin Compromiso' },
  ];

  readonly services: ServiceItem[] = [
    {
      icon: 'bi-house-gear',
      title: 'Reformas Integrales',
      description:
        'Transformamos tu hogar por completo con proyecto y ejecución llave en mano. Desde la demolición hasta el último detalle.',
    },
    {
      icon: 'bi-droplet',
      title: 'Baños',
      description:
        'Reformas de baños funcionales y modernos. Renovamos azulejos, sanitarios, mamparas y platos de ducha con diseño actual.',
    },
    {
      icon: 'bi-egg-fried',
      title: 'Cocinas',
      description:
        'Cocinas a medida con los mejores materiales. Diseño práctico y elegante que convierte tu cocina en el corazón del hogar.',
    },
    {
      icon: 'bi-grid-3x3',
      title: 'Suelos',
      description:
        'Instalación y renovación de todo tipo de suelos: parquet, tarima, cerámica, porcelánico y vinílico de alta resistencia.',
    },
    {
      icon: 'bi-lightning-charge',
      title: 'Electricidad',
      description:
        'Instalaciones eléctricas completas, renovación de cableado, cuadros eléctricos nuevos y certificaciones oficiales.',
    },
    {
      icon: 'bi-droplet-fill',
      title: 'Fontanería',
      description:
        'Reparaciones, instalaciones nuevas y mantenimiento de sistemas de agua, calefacción y saneamiento sin obras innecesarias.',
    },
    {
      icon: 'bi-paint-bucket',
      title: 'Pintura',
      description:
        'Pintura interior y exterior, empapelado, estucos y acabados decorativos profesionales que transforman cualquier espacio.',
    },
    {
      icon: 'bi-tree',
      title: 'Exteriores',
      description:
        'Terrazas, fachadas, patios y jardines. Embellecemos tu espacio exterior con materiales resistentes y diseños duraderos.',
    },
  ];

  readonly compareSliders: CompareSlider[] = [
    {
      beforeLabel: 'Cocina Antigua',
      beforeGradient:
        'linear-gradient(135deg, #5c4a3a 0%, #8b7355 30%, #a0886c 60%, #6b5b4a 100%)',
      afterLabel: 'Cocina Renovada',
      afterGradient:
        'linear-gradient(135deg, #f5f0eb 0%, #e8e0d5 30%, #eef6fa 60%, #faf7f2 100%)',
      position: 50,
      imageUrl: '/assets/images/reformas/kitchen-before-after.jpg',
    },
    {
      beforeLabel: 'Baño Anticuado',
      beforeGradient:
        'linear-gradient(135deg, #7a6b58 0%, #5c4e3c 30%, #8b7a65 60%, #4a3e2f 100%)',
      afterLabel: 'Baño Moderno',
      afterGradient:
        'linear-gradient(135deg, #f8f6f2 0%, #e8e2d8 30%, #edf4f8 60%, #f5f0e8 100%)',
      position: 50,
      imageUrl: '/assets/images/reformas/bathroom-before-after.jpg',
    },
    {
      beforeLabel: 'Salón Oscuro',
      beforeGradient:
        'linear-gradient(135deg, #3b2f24 0%, #2a221b 25%, #4a3a2e 50%, #33281f 75%, #231c15 100%)',
      afterLabel: 'Salón Luminoso',
      afterGradient:
        'linear-gradient(135deg, #fdfcf9 0%, #f5efe7 25%, #eef3f7 50%, #f8f4ed 75%, #fcfaf7 100%)',
      position: 50,
    },
  ];

  readonly projects: ProjectItem[] = [
    {
      title: 'Reforma Integral en Chamberí',
      location: 'Madrid',
      category: 'Reforma Integral',
      gradient:
        'linear-gradient(135deg, #2c5f8a 0%, #1a2d3d 50%, #3a7099 100%)',
    },
    {
      title: 'Cocina Abierta en Malasaña',
      location: 'Madrid',
      category: 'Cocinas',
      gradient:
        'linear-gradient(135deg, #c4943a 0%, #8b6830 50%, #d4a44a 100%)',
    },
    {
      title: 'Baño de Lujo en Salamanca',
      location: 'Madrid',
      category: 'Baños',
      gradient:
        'linear-gradient(135deg, #4a7a94 0%, #2c5f8a 50%, #6a9ab4 100%)',
    },
    {
      title: 'Renovación de Ático en Retiro',
      location: 'Madrid',
      category: 'Reforma Integral',
      gradient:
        'linear-gradient(135deg, #3d5a70 0%, #1a2d3d 50%, #5d7a90 100%)',
    },
    {
      title: 'Local Comercial en Chueca',
      location: 'Madrid',
      category: 'Locales',
      gradient:
        'linear-gradient(135deg, #8b7355 0%, #5c4a3a 50%, #a0886c 100%)',
    },
    {
      title: 'Chalet en La Moraleja',
      location: 'Madrid',
      category: 'Reforma Integral',
      gradient:
        'linear-gradient(135deg, #c4943a 0%, #a07830 50%, #d4a44a 100%)',
    },
  ];

  readonly faqs: FaqItem[] = [
    {
      question: '¿Cuánto dura una reforma integral?',
      answer:
        'Depende del tamaño de la vivienda y el alcance del proyecto. Una vivienda de 80 m² con reforma integral completa suele realizarse en 8 a 12 semanas. Antes de empezar te entregamos un cronograma detallado con cada fase.',
      open: false,
    },
    {
      question: '¿Dais garantía por escrito?',
      answer:
        'Sí, todos nuestros trabajos incluyen 5 años de garantía por escrito, reflejada en el contrato. Cubre tanto materiales como mano de obra. Además, realizamos una visita de revisión a los 12 meses sin coste adicional.',
      open: false,
    },
    {
      question: '¿Necesito licencia de obras?',
      answer:
        'Para reformas que afectan a elementos estructurales, fachadas o instalaciones comunes, sí se requiere licencia. Nosotros gestionamos todos los permisos y licencias necesarias ante el ayuntamiento. Tú solo tienes que preocuparte de imaginar tu nuevo espacio.',
      open: false,
    },
    {
      question: '¿Cómo se organizan los pagos?',
      answer:
        'Trabajamos con un sistema de pagos fraccionados vinculados a hitos del proyecto: 30% al inicio para materiales, 40% a mitad de la obra cuando se alcanzan los objetivos principales, y 30% restante a la entrega final con tu conformidad.',
      open: false,
    },
    {
      question: '¿Puedo vivir en casa durante la reforma?',
      answer:
        'En reformas parciales de una sola estancia, sí es posible convivir con la obra. Para reformas integrales recomendamos buscar una alternativa temporal por comodidad, seguridad y para que el trabajo avance más rápido. Te asesoramos sobre la mejor opción.',
      open: false,
    },
    {
      question: '¿Qué materiales utilizáis?',
      answer:
        'Trabajamos exclusivamente con primeras marcas y materiales certificados. Tenemos acuerdos directos con los principales fabricantes y distribuidores, lo que nos permite ofrecerte la mejor relación calidad-precio sin intermediarios.',
      open: false,
    },
  ];

  calculatorType = 'integral';
  calculatorSqm: number | null = 80;
  calculatorRooms = 3;
  calculatorQuality = 'medio';

  readonly qualityRates: Record<string, { label: string; rate: number }> = {
    basico: { label: 'Básico', rate: 800 },
    medio: { label: 'Medio', rate: 1200 },
    premium: { label: 'Premium', rate: 1800 },
  };

  contactForm = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };

  contactSubmitted = false;

  @ViewChild('heroContent') heroContent!: ElementRef<HTMLElement>;

  @ViewChildren('animateSection') animateSections!: QueryList<
    ElementRef<HTMLElement>
  >;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.scrolled = window.scrollY > 50;
  }

  get estimatedPrice(): number {
    if (!this.calculatorSqm || this.calculatorSqm <= 0) return 0;
    const rate = this.qualityRates[this.calculatorQuality]?.rate || 800;
    return this.calculatorSqm * rate;
  }

  get reformTypeLabel(): string {
    const labels: Record<string, string> = {
      integral: 'Reforma Integral',
      bano: 'Baño',
      cocina: 'Cocina',
      parcial: 'Reforma Parcial',
    };
    return labels[this.calculatorType] || 'Reforma';
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    if (this.heroContent) {
      const heroChildren = this.heroContent.nativeElement.children;
      gsap.fromTo(
        heroChildren,
        { y: 64, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
        },
      );
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target,
              { y: 64, opacity: 0, filter: 'blur(6px)' },
              {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 0.9,
                ease: 'power3.out',
              },
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

  toggleFaq(index: number): void {
    this.faqs[index].open = !this.faqs[index].open;
  }

  submitContact(event: Event): void {
    event.preventDefault();
    if (!this.contactForm.name || !this.contactForm.email) return;
    console.log('Contacto enviado:', this.contactForm);
    this.contactForm = { name: '', email: '', phone: '', message: '' };
    this.contactSubmitted = true;
    setTimeout(() => (this.contactSubmitted = false), 8000);
  }

  submitBudget(event: Event): void {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
