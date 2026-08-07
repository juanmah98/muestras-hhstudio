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
  stars: number;
}

interface NavLink {
  label: string;
  fragment: string;
}

interface StatItem {
  number: string;
  label: string;
}

interface TimelineItem {
  year: string;
  event: string;
}

interface ContactInfo {
  icon: string;
  text: string;
  href?: string;
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
  contactForm = { name: '', email: '', phone: '', motivo: '' };
  contactFormSuccess = false;
  readonly whatsappUrl = 'https://wa.me/41441234567';

  readonly navLinks: NavLink[] = [
    { label: 'Inicio', fragment: 'inicio' },
    { label: 'Servicios', fragment: 'servicios' },
    { label: 'Nosotros', fragment: 'nosotros' },
    { label: 'Beneficios', fragment: 'features' },
    { label: 'Testimonios', fragment: 'testimonios' },
    { label: 'Contacto', fragment: 'contacto' },
  ];

  readonly heroStats: StatItem[] = [
    { number: '15+', label: 'Años' },
    { number: 'Zürich', label: 'Suiza' },
    { number: '+3000', label: 'Pacientes' },
    { number: 'Suiza', label: 'Tecnología' },
  ];

  readonly features: FeatureItem[] = [
    {
      icon: 'bi-heart-pulse',
      title: 'Atención Personalizada',
      desc: 'Cada paciente es único. Diseñamos tu plan de salud a tu medida, con dedicación plena.',
    },
    {
      icon: 'bi-cpu',
      title: 'Tecnología Avanzada',
      desc: 'Equipamiento suizo de última generación para diagnósticos precisos y tratamientos efectivos.',
    },
    {
      icon: 'bi-award',
      title: 'Profesionales Expertos',
      desc: 'Médicos certificados con amplia trayectoria internacional y formación continua.',
    },
    {
      icon: 'bi-flower1',
      title: 'Ambiente Tranquilo',
      desc: 'Un espacio diseñado para tu calma. La naturaleza y el confort se unen en cada rincón.',
    },
    {
      icon: 'bi-graph-up-arrow',
      title: 'Seguimiento Continuo',
      desc: 'Acompañamos tu evolución con monitoreo constante y ajustes personalizados.',
    },
    {
      icon: 'bi-shield-check',
      title: 'Resultados Comprobados',
      desc: 'Miles de pacientes satisfechos avalan nuestro enfoque integral de la salud.',
    },
  ];

  readonly services: ServiceItem[] = [
    {
      icon: 'bi-heart-pulse',
      title: 'Medicina General',
      desc: 'Atención primaria integral con diagnóstico de precisión y seguimiento continuo.',
    },
    {
      icon: 'bi-clipboard2-pulse',
      title: 'Chequeos Preventivos',
      desc: 'Evaluaciones completas para detectar y prevenir antes de que aparezcan los síntomas.',
    },
    {
      icon: 'bi-flower1',
      title: 'Nutrición',
      desc: 'Planes nutricionales personalizados que transforman tu relación con la alimentación.',
    },
    {
      icon: 'bi-activity',
      title: 'Fisioterapia',
      desc: 'Rehabilitación y terapia física con técnicas modernas para tu recuperación integral.',
    },
    {
      icon: 'bi-chat-heart',
      title: 'Psicología',
      desc: 'Salud mental con enfoque humano. Terapia y acompañamiento en un espacio seguro.',
    },
    {
      icon: 'bi-droplet',
      title: 'Laboratorio',
      desc: 'Análisis clínicos de alta precisión con resultados rápidos y confiables.',
    },
  ];

  readonly timeline: TimelineItem[] = [
    { year: '2008', event: 'Fundación en Zürich con un equipo de 3 especialistas' },
    { year: '2012', event: 'Expansión a medicina integral con 6 áreas de especialidad' },
    { year: '2016', event: 'Incorporación de tecnología diagnóstica de vanguardia' },
    { year: '2020', event: 'Reconocimiento internacional por excelencia clínica' },
    { year: '2024', event: '+3000 pacientes confían en nuestro cuidado' },
  ];

  readonly testimonials: TestimonialItem[] = [
    {
      quote:
        'Por primera vez sentí que un médico realmente me escuchaba. MS LIFE cambió mi forma de ver la salud.',
      author: 'Ana García',
      role: 'Paciente de Nutrición',
      stars: 5,
    },
    {
      quote:
        'El plan nutricional que diseñaron para mí no fue una dieta, fue un cambio de vida. Bajé 12kg sin pasar hambre.',
      author: 'Carlos Mendoza',
      role: 'Paciente Regular',
      stars: 5,
    },
    {
      quote:
        'Llegué con ansiedad crónica y ahora tengo herramientas reales para manejarla. El equipo de salud mental es excepcional.',
      author: 'Laura Fernández',
      role: 'Paciente de Psicología',
      stars: 5,
    },
    {
      quote:
        'La fisioterapia en MS LIFE me devolvió la movilidad que creía perdida. Profesionales increíbles y un ambiente que sana.',
      author: 'Marco Weber',
      role: 'Paciente de Fisioterapia',
      stars: 5,
    },
  ];

  readonly contactInfo: ContactInfo[] = [
    { icon: 'bi-geo-alt', text: 'Bahnhofstrasse 42, 8001 Zürich, Switzerland' },
    { icon: 'bi-telephone', text: '+41 44 123 45 67', href: 'tel:+41441234567' },
    { icon: 'bi-envelope', text: 'hola@mslife.com', href: 'mailto:hola@mslife.com' },
    { icon: 'bi-clock', text: 'Lun–Vie: 8:00–20:00 | Sáb: 9:00–14:00' },
  ];

  readonly footerLinks: FooterLink[] = [
    { label: 'Inicio', fragment: 'inicio' },
    { label: 'Servicios', fragment: 'servicios' },
    { label: 'Nosotros', fragment: 'nosotros' },
    { label: 'Beneficios', fragment: 'features' },
    { label: 'Testimonios', fragment: 'testimonios' },
    { label: 'Contacto', fragment: 'contacto' },
  ];

  readonly socialLinks = [
    { label: 'Instagram', href: '#', icon: 'bi-instagram' },
    { label: 'LinkedIn', href: '#', icon: 'bi-linkedin' },
    { label: 'Facebook', href: '#', icon: 'bi-facebook' },
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
                  el.querySelectorAll(
                    '.bio__hero-title, .bio__hero-subtitle, .bio__hero-stats, .bio__hero-actions',
                  ),
                  { y: 40, opacity: 0, scale: 0.97 },
                  {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                  },
                );
                gsap.fromTo(
                  el.querySelector('.bio__hero-leaf'),
                  { scale: 0.85, opacity: 0 },
                  {
                    scale: 1,
                    opacity: 1,
                    duration: 1.2,
                    delay: 0.4,
                    ease: 'power3.out',
                  },
                );
                gsap.fromTo(
                  el.querySelector('.bio__hero-deco-bl'),
                  { scale: 0.85, opacity: 0 },
                  {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    delay: 0.5,
                    ease: 'power3.out',
                  },
                );
                break;

              case 'services':
                gsap.fromTo(
                  el.querySelectorAll('.bio__services-card'),
                  { y: 40, opacity: 0, scale: 0.97 },
                  {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                  },
                );
                break;

              case 'about':
                gsap.fromTo(
                  el.querySelector('.bio__nosotros-blob-shape'),
                  { scale: 0.8, opacity: 0 },
                  {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                  },
                );
                gsap.fromTo(
                  el.querySelector('.bio__nosotros-content'),
                  { y: 40, opacity: 0, scale: 0.97 },
                  {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    delay: 0.2,
                    ease: 'power3.out',
                  },
                );
                gsap.fromTo(
                  el.querySelectorAll('.bio__nosotros-timeline-item'),
                  { y: 40, opacity: 0, scale: 0.97 },
                  {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    delay: 0.35,
                    ease: 'power3.out',
                  },
                );
                break;

              case 'features':
                gsap.fromTo(
                  el.querySelectorAll('.bio__features-item'),
                  { y: 40, opacity: 0, scale: 0.97 },
                  {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                  },
                );
                break;

              case 'testimonials':
                gsap.fromTo(
                  el.querySelectorAll('.bio__testimonials-card'),
                  { y: 40, opacity: 0, scale: 0.97 },
                  {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                  },
                );
                break;

              case 'contact':
                gsap.fromTo(
                  el.querySelector('.bio__contact-info'),
                  { y: 40, opacity: 0, scale: 0.97 },
                  {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                  },
                );
                gsap.fromTo(
                  el.querySelector('.bio__contact-form'),
                  { y: 40, opacity: 0, scale: 0.97 },
                  {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    delay: 0.15,
                    ease: 'power3.out',
                  },
                );
                break;
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
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

  submitContactForm(): void {
    if (!this.contactForm.name || !this.contactForm.email) return;
    this.contactFormSuccess = true;
    setTimeout(() => {
      this.contactFormSuccess = false;
      this.contactForm = { name: '', email: '', phone: '', motivo: '' };
    }, 3000);
  }

  scrollTo(sectionId: string): void {
    this.mobileMenuOpen = false;
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  starArray(count: number): number[] {
    return Array(count).fill(0);
  }
}
