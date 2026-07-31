import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
  HostListener,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import gsap from 'gsap';

interface ServiceItem {
  icon: string;
  title: string;
  desc: string;
}

interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
}

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

interface NavLink {
  label: string;
  fragment: string;
}

interface StatItem {
  number: string;
  label: string;
}

interface CheckItem {
  label: string;
}

interface ContactInfo {
  icon: string;
  text: string;
}

interface FooterLink {
  label: string;
  fragment: string;
}

@Component({
  selector: 'app-salud',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './salud.component.html',
  styleUrl: './salud.component.scss',
})
export class SaludComponent implements AfterViewInit {
  readonly currentYear = new Date().getFullYear();
  mobileMenuOpen = false;
  scrolled = false;
  showBookingModal = false;
  bookingSuccess = false;
  bookingForm = { name: '', email: '', phone: '', motivo: '' };

  readonly navLinks: NavLink[] = [
    { label: 'Inicio', fragment: 'inicio' },
    { label: 'Servicios', fragment: 'servicios' },
    { label: 'Nosotros', fragment: 'nosotros' },
    { label: 'Testimonios', fragment: 'testimonios' },
    { label: 'Contacto', fragment: 'contacto' },
  ];

  readonly heroStats: StatItem[] = [
    { number: '15K+', label: 'Pacientes' },
    { number: '24/7', label: 'Atención' },
    { number: '40+', label: 'Especialistas' },
  ];

  readonly features: FeatureItem[] = [
    {
      icon: 'bi-heart-pulse',
      title: 'Cuidado Integral',
      desc: 'Enfoque holístico que considera todos los aspectos de tu bienestar físico y emocional.',
    },
    {
      icon: 'bi-cpu',
      title: 'Tecnología Avanzada',
      desc: 'Equipamiento de última generación para diagnósticos precisos y tratamientos efectivos.',
    },
    {
      icon: 'bi-people',
      title: 'Trato Humano',
      desc: 'Entendemos que detrás de cada consulta hay una persona. Te escuchamos y acompañamos.',
    },
  ];

  readonly services: ServiceItem[] = [
    {
      icon: 'bi-heart-pulse',
      title: 'Medicina General',
      desc: 'Atención primaria integral con diagnóstico de precisión y seguimiento continuo.',
    },
    {
      icon: 'bi-flower1',
      title: 'Nutrición',
      desc: 'Planes nutricionales personalizados que transforman tu relación con la alimentación.',
    },
    {
      icon: 'bi-chat-heart',
      title: 'Salud Mental',
      desc: 'Terapia y acompañamiento psicológico en un espacio seguro y sin juicios.',
    },
    {
      icon: 'bi-shield-check',
      title: 'Chequeos Preventivos',
      desc: 'Evaluaciones completas para detectar y prevenir antes de que aparezcan los síntomas.',
    },
  ];

  readonly checkItems: CheckItem[] = [
    { label: 'Tecnología Humana' },
    { label: 'Atención sin Prisas' },
    { label: 'Ambiente Tranquilo' },
    { label: 'Seguimiento Personalizado' },
  ];

  readonly testimonials: TestimonialItem[] = [
    {
      quote:
        'Por primera vez sentí que un médico realmente me escuchaba. MS LIFE cambió mi forma de ver la salud.',
      author: 'Ana García',
      role: 'Paciente de Nutrición',
    },
    {
      quote:
        'El plan nutricional que diseñaron para mí no fue una dieta, fue un cambio de vida. Bajé 12kg sin pasar hambre.',
      author: 'Carlos Mendoza',
      role: 'Paciente Regular',
    },
    {
      quote:
        'Llegué con ansiedad crónica y ahora tengo herramientas reales para manejarla. El equipo de salud mental es excepcional.',
      author: 'Laura Fernández',
      role: 'Paciente Preventiva',
    },
  ];

  readonly contactInfo: ContactInfo[] = [
    { icon: 'bi-geo-alt', text: 'Bahnhofstrasse 42, 8001 Zürich, Switzerland' },
    { icon: 'bi-telephone', text: '+41 44 123 45 67' },
    { icon: 'bi-envelope', text: 'hola@mslife.com' },
    { icon: 'bi-clock', text: 'Lun–Vie: 8:00–20:00 | Sáb: 9:00–14:00' },
  ];

  readonly footerLinks: FooterLink[] = [
    { label: 'Inicio', fragment: 'inicio' },
    { label: 'Servicios', fragment: 'servicios' },
    { label: 'Nosotros', fragment: 'nosotros' },
    { label: 'Testimonios', fragment: 'testimonios' },
    { label: 'Contacto', fragment: 'contacto' },
  ];

  readonly socialLinks = [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Facebook', href: '#' },
  ];

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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const animation = el.getAttribute('data-anim');
            switch (animation) {
              case 'hero':
                gsap.fromTo(
                  el.querySelectorAll('.salud__hero-badge, .salud__hero-title, .salud__hero-subtitle, .salud__hero-actions'),
                  { y: 30, opacity: 0 },
                  {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: 'power2.out',
                  },
                );
                gsap.fromTo(
                  el.querySelectorAll('.salud__hero-stat'),
                  { y: 20, opacity: 0 },
                  {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    delay: 0.6,
                    ease: 'power2.out',
                  },
                );
                gsap.fromTo(
                  el.querySelector('.salud__hero-image'),
                  { opacity: 0, scale: 0.9 },
                  {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    delay: 0.3,
                    ease: 'power2.out',
                  },
                );
                break;
              case 'features':
                gsap.fromTo(
                  el.querySelector('.salud__features-headline-mark'),
                  { rotate: 45, scale: 0.5, opacity: 0 },
                  { rotate: 0, scale: 1, opacity: 1, duration: 0.7, ease: 'power2.out' },
                );
                gsap.fromTo(
                  el.querySelector('.salud__features-headline-title'),
                  { x: -30, opacity: 0 },
                  { x: 0, opacity: 1, duration: 0.6, delay: 0.15, ease: 'power2.out' },
                );
                gsap.fromTo(
                  el.querySelector('.salud__features-headline-subtitle'),
                  { x: -20, opacity: 0 },
                  { x: 0, opacity: 1, duration: 0.6, delay: 0.25, ease: 'power2.out' },
                );
                gsap.fromTo(
                  el.querySelectorAll('.salud__features-item'),
                  { x: 40, opacity: 0 },
                  {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.18,
                    delay: 0.35,
                    ease: 'power2.out',
                  },
                );
                break;
              case 'services':
                gsap.fromTo(
                  el.querySelectorAll('.salud__services-card'),
                  { y: 60, rotateX: 10, opacity: 0 },
                  {
                    y: 0,
                    rotateX: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.12,
                    ease: 'power2.out',
                  },
                );
                break;
              case 'about':
                gsap.fromTo(
                  el.querySelectorAll('.salud__nosotros-illustration-circle'),
                  { scale: 0, opacity: 0 },
                  {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'back.out(1.4)',
                  },
                );
                gsap.fromTo(
                  el.querySelector('.salud__nosotros-content'),
                  { x: 40, opacity: 0 },
                  { x: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power2.out' },
                );
                break;
              case 'testimonials':
                gsap.fromTo(
                  el.querySelectorAll('.salud__testimonials-card'),
                  { x: -30, opacity: 0 },
                  {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'power2.out',
                  },
                );
                break;
              case 'contact':
                gsap.fromTo(
                  el.querySelector('.salud__contact-map'),
                  { scale: 0.95, opacity: 0 },
                  { scale: 1, opacity: 1, duration: 0.7, ease: 'power2.out' },
                );
                gsap.fromTo(
                  el.querySelector('.salud__contact-details'),
                  { x: 30, opacity: 0 },
                  {
                    x: 0,
                    opacity: 1,
                    duration: 0.7,
                    delay: 0.15,
                    ease: 'power2.out',
                  },
                );
                gsap.fromTo(
                  el.querySelector('.salud__contact-info-btn'),
                  { scale: 0.8, opacity: 0 },
                  {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    delay: 0.3,
                    ease: 'back.out(1.7)',
                  },
                );
                gsap.fromTo(
                  el.querySelector('.salud__contact-cta-bar'),
                  { opacity: 0 },
                  { opacity: 1, duration: 0.6, delay: 0.4, ease: 'power2.out' },
                );
                break;
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 },
    );

    this.animateSections.forEach((ref) => observer.observe(ref.nativeElement));
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.showBookingModal) {
      this.closeBookingModal();
      document.body.style.overflow = '';
    }
  }

  openBookingModal(): void {
    this.showBookingModal = true;
    this.bookingSuccess = false;
    this.bookingForm = { name: '', email: '', phone: '', motivo: '' };
    document.body.style.overflow = 'hidden';
  }

  closeBookingModal(): void {
    this.showBookingModal = false;
    this.bookingSuccess = false;
    document.body.style.overflow = '';
  }

  submitBooking(): void {
    if (!this.bookingForm.name || !this.bookingForm.email) return;
    this.bookingSuccess = true;
    setTimeout(() => {
      this.closeBookingModal();
    }, 2000);
  }

  scrollTo(sectionId: string): void {
    this.mobileMenuOpen = false;
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
