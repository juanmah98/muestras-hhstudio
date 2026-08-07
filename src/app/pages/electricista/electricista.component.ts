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
  size: 'lg' | 'md';
}

interface CertificationItem {
  icon: string;
  label: string;
}

interface WorkStep {
  step: number;
  icon: string;
  title: string;
  description: string;
}

interface ZoneItem {
  name: string;
  areas: string;
  icon: string;
}

interface NavLink {
  label: string;
  fragment: string;
}

interface TrustBadge {
  icon: string;
  text: string;
}

@Component({
  selector: 'app-electricista',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './electricista.component.html',
  styleUrl: './electricista.component.scss',
})
export class ElectricistaComponent implements AfterViewInit {
  readonly currentYear = new Date().getFullYear();
  mobileMenuOpen = false;
  scrolled = false;

  readonly navLinks: NavLink[] = [
    { label: 'Inicio', fragment: 'inicio' },
    { label: 'Servicios', fragment: 'servicios' },
    { label: 'Proyectos', fragment: 'proyectos' },
    { label: 'Certificaciones', fragment: 'certificaciones' },
    { label: 'Proceso', fragment: 'proceso' },
    { label: 'Zonas', fragment: 'zonas' },
    { label: 'Contacto', fragment: 'contacto' },
  ];

  readonly trustBadges: TrustBadge[] = [
    { icon: 'bi-award', text: '15+ Años' },
    { icon: 'bi-lightning-charge', text: '+3000 Instalaciones' },
    { icon: 'bi-patch-check', text: 'Certificado Oficial' },
    { icon: 'bi-shield-check', text: 'Garantía 3 Años' },
  ];

  readonly services: ServiceItem[] = [
    {
      icon: 'bi-plug',
      title: 'Instalaciones Eléctricas',
      description:
        'Instalaciones completas en viviendas, locales y oficinas. Cableado nuevo, puntos de luz, enchufes y protecciones según normativa REBT.',
    },
    {
      icon: 'bi-gear',
      title: 'Mantenimiento Industrial',
      description:
        'Planes de mantenimiento preventivo y correctivo para naves, fábricas y talleres. Evita paradas y asegura el funcionamiento continuo de tu negocio.',
    },
    {
      icon: 'bi-lightning-charge',
      title: 'Cuadros Eléctricos',
      description:
        'Diseño, montaje y renovación de cuadros eléctricos. Protecciones magnetotérmicas, diferenciales y automatismos para máxima seguridad.',
    },
    {
      icon: 'bi-lightbulb',
      title: 'Iluminación LED',
      description:
        'Proyectos de iluminación eficiente con tecnología LED. Reforma de luminarias, tiras LED decorativas y sistemas de control inteligente.',
    },
    {
      icon: 'bi-house-gear',
      title: 'Domótica',
      description:
        'Automatización de viviendas y edificios. Control de iluminación, climatización, persianas y seguridad desde el móvil o por voz.',
    },
    {
      icon: 'bi-shield-exclamation',
      title: 'Emergencias 24h',
      description:
        'Servicio urgente disponible las 24 horas los 365 días del año. Respuesta en menos de 60 minutos en toda la Comunidad de Madrid.',
    },
  ];

  readonly projects: ProjectItem[] = [
    {
      title: 'Nave Industrial Getafe',
      location: 'Getafe, Madrid',
      category: 'Industrial',
      gradient:
        'linear-gradient(135deg, #1a1d23 0%, #2a2010 30%, #f0a50040 60%, #0f1115 100%)',
      size: 'lg',
    },
    {
      title: 'Edificio Oficinas Chamartín',
      location: 'Chamartín, Madrid',
      category: 'Comercial',
      gradient:
        'linear-gradient(135deg, #06b6d420 0%, #1a1d23 50%, #0f1115 100%)',
      size: 'md',
    },
    {
      title: 'Reforma Eléctrica en Retiro',
      location: 'Retiro, Madrid',
      category: 'Residencial',
      gradient:
        'linear-gradient(135deg, #f0a50020 0%, #1a1d23 40%, #0f1115 100%)',
      size: 'md',
    },
    {
      title: 'Restaurante La Latina',
      location: 'La Latina, Madrid',
      category: 'Comercial',
      gradient:
        'linear-gradient(135deg, #0f1115 0%, #1a1d23 50%, #f0a50020 100%)',
      size: 'md',
    },
    {
      title: 'Emergencia Centro Logístico Sanse',
      location: 'San Sebastián de los Reyes',
      category: 'Emergencias',
      gradient:
        'linear-gradient(135deg, #f0a50030 0%, #0f1115 40%, #1a1d23 100%)',
      size: 'md',
    },
    {
      title: 'Instalación Domótica en Moralzarzal',
      location: 'Moralzarzal, Madrid',
      category: 'Residencial',
      gradient:
        'linear-gradient(135deg, #06b6d420 0%, #0f1115 50%, #1a1d23 100%)',
      size: 'md',
    },
  ];

  readonly certifications: CertificationItem[] = [
    { icon: 'bi-patch-check', label: 'Certificado Oficial' },
    { icon: 'bi-shield-check', label: 'Seguro de RC' },
    { icon: 'bi-journal-check', label: 'Normativa REBT' },
    { icon: 'bi-award', label: '3 Años de Garantía' },
  ];

  readonly workSteps: WorkStep[] = [
    {
      step: 1,
      icon: 'bi-search',
      title: 'Diagnóstico Gratuito',
      description:
        'Visitamos tu instalación sin coste ni compromiso. Evaluamos el estado actual y detectamos posibles mejoras.',
    },
    {
      step: 2,
      icon: 'bi-file-text',
      title: 'Presupuesto Detallado',
      description:
        'Te entregamos un presupuesto cerrado por escrito con desglose de materiales y mano de obra. Sin sorpresas.',
    },
    {
      step: 3,
      icon: 'bi-tools',
      title: 'Ejecución Profesional',
      description:
        'Realizamos el trabajo con materiales de primera calidad, herramientas profesionales y cumpliendo la normativa.',
    },
    {
      step: 4,
      icon: 'bi-check2-circle',
      title: 'Certificación y Garantía',
      description:
        'Emitimos el boletín oficial y certificado de instalación. Todo nuestro trabajo incluye 3 años de garantía por escrito.',
    },
  ];

  readonly zones: ZoneItem[] = [
    {
      name: 'Madrid Capital',
      areas: 'Todos los distritos, servicio en menos de 45 min',
      icon: 'bi-building',
    },
    {
      name: 'Zona Norte',
      areas: 'Alcobendas, Sanse, Tres Cantos, Colmenar Viejo',
      icon: 'bi-compass',
    },
    {
      name: 'Zona Sur',
      areas: 'Getafe, Leganés, Fuenlabrada, Parla, Móstoles',
      icon: 'bi-compass',
    },
    {
      name: 'Zona Este',
      areas: 'Alcalá de Henares, Torrejón, Coslada, San Fernando',
      icon: 'bi-compass',
    },
  ];

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
        { y: 48, opacity: 0, filter: 'blur(6px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.7,
          stagger: 0.12,
          ease: 'cubic-bezier(0.32, 0.72, 0, 1)',
        },
      );
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target,
              { y: 48, opacity: 0, filter: 'blur(6px)' },
              {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 0.7,
                ease: 'cubic-bezier(0.32, 0.72, 0, 1)',
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

  submitContact(event: Event): void {
    event.preventDefault();
    if (!this.contactForm.name || !this.contactForm.email) return;
    console.log('Contacto enviado:', this.contactForm);
    this.contactForm = { name: '', email: '', phone: '', message: '' };
    this.contactSubmitted = true;
    setTimeout(() => (this.contactSubmitted = false), 8000);
  }
}
