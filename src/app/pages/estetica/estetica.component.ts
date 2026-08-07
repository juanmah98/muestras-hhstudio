import {
  Component,
  AfterViewInit,
  HostListener,
  ElementRef,
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

interface PricePlan {
  name: string;
  price: number;
  features: string[];
  popular: boolean;
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

@Component({
  selector: 'app-estetica',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './estetica.component.html',
  styleUrl: './estetica.component.scss',
})
export class EsteticaComponent implements AfterViewInit {
  readonly currentYear = new Date().getFullYear();
  mobileMenuOpen = false;
  scrolled = false;
  activeTestimonial = 0;

  readonly navLinks: NavLink[] = [
    { label: 'Inicio', fragment: 'inicio' },
    { label: 'Tratamientos', fragment: 'tratamientos' },
    { label: 'Antes/Después', fragment: 'antes-despues' },
    { label: 'Precios', fragment: 'precios' },
    { label: 'Testimonios', fragment: 'testimonios' },
    { label: 'Reservar', fragment: 'reserva' },
    { label: 'Contacto', fragment: 'contacto' },
  ];

  readonly trustBadges: TrustBadge[] = [
    { icon: 'bi-award', text: '10+ Años' },
    { icon: 'bi-people', text: '+5000 Clientes' },
    { icon: 'bi-stars', text: 'Productos Premium' },
    { icon: 'bi-gift', text: 'Primera Consulta Gratis' },
  ];

  readonly services: ServiceItem[] = [
    {
      icon: 'bi-stars',
      title: 'Tratamientos Faciales',
      description:
        'Limpiezas profundas, hidratación intensiva y tratamientos antiedad con tecnología avanzada y cosmética de alta gama para una piel radiante.',
    },
    {
      icon: 'bi-heart-pulse',
      title: 'Tratamientos Corporales',
      description:
        'Reducción, tonificación y remodelación corporal con técnicas no invasivas. Envolturas, drenajes y tratamientos reductores personalizados.',
    },
    {
      icon: 'bi-scissors',
      title: 'Cuidado Capilar',
      description:
        'Diagnóstico capilar, tratamientos de keratina, mesoterapia y revitalización para un cabello fuerte, brillante y saludable.',
    },
    {
      icon: 'bi-flower1',
      title: 'Bienestar & Masajes',
      description:
        'Masajes descontracturantes, relajantes, drenaje linfático y reflexología en un ambiente diseñado para la desconexión absoluta.',
    },
    {
      icon: 'bi-hand-index-thumb',
      title: 'Manicura & Pedicura',
      description:
        'Servicio completo de uñas con esmaltes semipermanentes, tratamientos de parafina y diseño personalizado con productos hipoalergénicos.',
    },
    {
      icon: 'bi-lightning-charge',
      title: 'Depilación Láser',
      description:
        'Depilación definitiva con láser de última generación. Segura, eficaz y apta para todo tipo de pieles. Resultados visibles desde la primera sesión.',
    },
  ];

  readonly compareSliders: CompareSlider[] = [
    {
      beforeLabel: 'Antes',
      beforeGradient: '',
      afterLabel: 'Después',
      afterGradient: '',
      position: 50,
      imageUrl: '/assets/images/estetica/facial-before-after.jpg',
    },
    {
      beforeLabel: 'Antes',
      beforeGradient:
        'linear-gradient(135deg, #8a7e78 0%, #6b5e58 30%, #a09088 60%, #7a6e68 100%)',
      afterLabel: 'Después',
      afterGradient:
        'linear-gradient(135deg, #faf8f5 0%, #e8e3db 30%, #f0ede8 60%, #f5f2ee 100%)',
      position: 50,
    },
    {
      beforeLabel: 'Antes',
      beforeGradient:
        'linear-gradient(135deg, #7a6e68 0%, #5a4e48 30%, #8a7e78 60%, #6b5e58 100%)',
      afterLabel: 'Después',
      afterGradient:
        'linear-gradient(135deg, #faf8f5 0%, #e0dbd3 30%, #f0ede8 60%, #f8f5f1 100%)',
      position: 50,
    },
  ];

  readonly pricePlans: PricePlan[] = [
    {
      name: 'Básico',
      price: 49,
      features: [
        '1 tratamiento facial al mes',
        '10% descuento en productos',
        'Acceso a horarios preferentes',
        'Consulta de diagnóstico gratuita',
        'Revista digital de bienestar',
      ],
      popular: false,
    },
    {
      name: 'Premium',
      price: 89,
      features: [
        '2 tratamientos al mes a elegir',
        '20% descuento en productos',
        '1 masaje relajante mensual',
        'Acceso prioritario a citas',
        'Acompañante gratis 1 vez al mes',
        'Regalo de bienvenida valorado en 50€',
      ],
      popular: true,
    },
    {
      name: 'Exclusivo',
      price: 149,
      features: [
        'Tratamientos ilimitados',
        '30% descuento en productos',
        'Masajes y tratamientos VIP',
        'Atención personalizada 24/7',
        'Acceso a eventos exclusivos',
        '2 invitaciones al mes',
        'Kit premium de temporada',
      ],
      popular: false,
    },
  ];

  readonly testimonials: TestimonialItem[] = [
    {
      quote:
        'Desde que empecé en Lumina mi piel ha cambiado completamente. El trato es excepcional y los resultados hablan por sí solos. Nunca me había sentido tan cuidada.',
      author: 'María Sánchez',
      role: 'Cliente Facial',
      stars: 5,
    },
    {
      quote:
        'Llevo años probando centros de estética y ninguno como Lumina. La profesionalidad del equipo y la calidad de los productos son insuperables. Mi piel lo agradece.',
      author: 'Carmen Ortega',
      role: 'Cliente Premium',
      stars: 5,
    },
    {
      quote:
        'El tratamiento corporal cambió mi vida. Bajé dos tallas sin pasar hambre ni someterme a procedimientos invasivos. El equipo me acompañó en cada paso.',
      author: 'Laura Vidal',
      role: 'Cliente Corporal',
      stars: 5,
    },
    {
      quote:
        'Regalé una sesión de masaje a mi madre y quedó encantada. Ambiente impecable, música relajante y manos expertas. Volveremos todos los meses sin falta.',
      author: 'Elena Domínguez',
      role: 'Cliente Bienestar',
      stars: 5,
    },
    {
      quote:
        'La depilación láser aquí fue la mejor decisión. Sin dolor, resultados permanentes y el personal te explica todo con paciencia. Recomiendo Lumina sin dudarlo.',
      author: 'Patricia Ruiz',
      role: 'Cliente Láser',
      stars: 5,
    },
  ];

  contactForm = {
    name: '',
    email: '',
    message: '',
  };

  bookingForm = {
    name: '',
    email: '',
    phone: '',
    treatment: '',
    date: '',
    time: '',
  };

  contactSubmitted = false;
  bookingSubmitted = false;

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
            gsap.fromTo(
              entry.target,
              { y: 64, opacity: 0, filter: 'blur(6px)' },
              {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 0.9,
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

  onTestimonialScroll(event: Event): void {
    const container = event.target as HTMLElement;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const index = Math.round(scrollLeft / cardWidth);
    this.activeTestimonial = index;
  }

  scrollToTestimonial(index: number): void {
    const container = document.querySelector('.estetica__testimonials-track');
    if (container) {
      const cardWidth = container.clientWidth;
      container.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
    }
  }

  submitBooking(event: Event): void {
    event.preventDefault();
    if (!this.bookingForm.name || !this.bookingForm.email) return;
    console.log('Reserva enviada:', this.bookingForm);
    this.bookingForm = { name: '', email: '', phone: '', treatment: '', date: '', time: '' };
    this.bookingSubmitted = true;
    setTimeout(() => (this.bookingSubmitted = false), 8000);
  }

  submitContact(event: Event): void {
    event.preventDefault();
    if (!this.contactForm.name || !this.contactForm.email) return;
    console.log('Contacto enviado:', this.contactForm);
    this.contactForm = { name: '', email: '', message: '' };
    this.contactSubmitted = true;
    setTimeout(() => (this.contactSubmitted = false), 8000);
  }
}
