import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';

interface Source {
  number: string;
  title: string;
  description: string;
  action: string;
  icon: string;
  colorClass: string;
}

interface Factor {
  icon: string;
  title: string;
  description: string;
  detail: string;
}

interface ChecklistItem {
  area: string;
  action: string;
  deliverable: string;
  icon: string;
}

@Component({
  selector: 'app-seo-ia',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './seo-ia.component.html',
  styleUrl: './seo-ia.component.scss',
})
export class SeoIaComponent implements AfterViewInit {
  readonly sources: Source[] = [
    {
      number: '01',
      title: 'APIs de Mapas',
      description:
        'Google Maps, Bing Places, Apple Maps. La IA filtra por distancia geográfica, verifica que el negocio exista, horarios y teléfono.',
      action: 'Perfil de Google Business completo y verificado. Bing Places como respaldo.',
      icon: 'geo-alt-fill',
      colorClass: 'card--primary',
    },
    {
      number: '02',
      title: 'Plataformas de Opiniones',
      description:
        'Google Reviews, Tripadvisor, Doctoralia, habitissimo. La IA analiza número, calidad y contenido textual de reseñas vía NLP.',
      action: 'Reseñas recientes con mención explícita al servicio + ciudad. Responder a todas.',
      icon: 'star-fill',
      colorClass: 'card--accent',
    },
    {
      number: '03',
      title: 'Schema Markup (Web)',
      description:
        'La IA entiende JSON-LD estructurado mejor que texto plano. Tipos: BeautySalon, MedicalBusiness, LocalBusiness.',
      action: 'Implementar hasOfferCatalog, areaServed, geo, openingHours en el build.',
      icon: 'code-slash',
      colorClass: 'card--secondary',
    },
    {
      number: '04',
      title: 'Menciones Web & Sociales',
      description:
        'Lo que terceros dicen del negocio pesa más que lo que la propia web afirma. Prensa local, blogs, foros.',
      action: 'Notas en prensa local, directorios de la comarca, colaboraciones con medios.',
      icon: 'share-fill',
      colorClass: 'card--surface',
    },
  ];

  readonly factors: Factor[] = [
    {
      icon: 'check2-all',
      title: 'Consistencia NAP',
      description:
        'Name, Address, Phone. Si varían entre plataformas la IA descarta el negocio.',
      detail:
        'El NAP debe ser idéntico carácter por carácter en web, Google Business, Bing, Instagram y directorios.',
    },
    {
      icon: 'braces-asterisk',
      title: 'Schema JSON-LD',
      description:
        'Datos estructurados que la IA procesa como hechos, no como texto ambiguo.',
      detail:
        'BeautySalon, MedicalBusiness, hasOfferCatalog, areaServed. Sin areaServed la IA no geolocaliza.',
    },
    {
      icon: 'chat-quote-fill',
      title: 'Factor Consenso (NLP)',
      description:
        'La IA analiza el contenido textual de reseñas, no solo la nota media.',
      detail:
        '«La mejor depilación láser de Castellón» asocia la clínica directamente a esa consulta específica.',
    },
    {
      icon: 'building-fill',
      title: 'Entity Building',
      description:
        'La IA confía más en lo que terceros dicen del negocio que en la propia web.',
      detail:
        'Apariciones en prensa local, directorios regionales y blogs de estilo de vida.',
    },
  ];

  readonly checklist: ChecklistItem[] = [
    {
      area: 'Google Business Profile',
      action: 'Perfil completo, verificado, categoría correcta, fotos reales, horarios.',
      deliverable: 'Setup + guía de mantenimiento',
      icon: 'google',
    },
    {
      area: 'Bing Places',
      action: 'Misma información que Google Business.',
      deliverable: 'Setup secundario',
      icon: 'microsoft',
    },
    {
      area: 'Páginas de Servicio',
      action: 'URLs /tratamiento-facial-castellon con FAQ respondidas de forma concisa.',
      deliverable: 'Desarrollo + SEO copy',
      icon: 'file-earmark-richtext-fill',
    },
    {
      area: 'Schema JSON-LD',
      action: 'BeautySalon / MedicalBusiness / LocalBusiness con areaServed, geo, hasOfferCatalog.',
      deliverable: 'Implementación técnica en build',
      icon: 'braces-asterisk',
    },
    {
      area: 'Reseñas',
      action: 'Estrategia para conseguir reseñas con mención explícita de tratamiento + ciudad.',
      deliverable: 'Guía para el cliente',
      icon: 'chat-quote-fill',
    },
    {
      area: 'NAP Consistency',
      action: 'Auditoría de NAP en todas las plataformas del cliente.',
      deliverable: 'Informe de consistencia',
      icon: 'check2-all',
    },
    {
      area: 'Entity Building',
      action: 'Apariciones en prensa local, directorios, blogs.',
      deliverable: 'Listado de medios + outreach',
      icon: 'building-fill',
    },
  ];

  readonly jsonLdExample = `{
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Nombre de la Clínica",
  "telephone": "+34 964 12 34 56",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Ejemplo 123",
    "addressLocality": "Castellón de la Plana",
    "addressRegion": "Castellón",
    "postalCode": "12001",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 39.9861,
    "longitude": -0.0362
  },
  "areaServed": {
    "@type": "City",
    "name": "Castellón de la Plana"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Tratamientos Faciales",
    "itemListElement": [...]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "47"
  }
}`;

  @ViewChildren('animateSection') animateSections!: QueryList<ElementRef<HTMLElement>>;

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
              { y: 32, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );

    this.animateSections.forEach((ref) => observer.observe(ref.nativeElement));
  }
}
