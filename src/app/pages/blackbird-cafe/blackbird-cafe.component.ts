import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';

import { SeoService } from '../../core/services/seo.service';

interface MenuItem {
  name: string;
  detail?: string;
  /** Allergen numbers as printed on the shop's own menu. */
  allergens?: string;
  price: string;
  size?: string;
}

interface MenuGroup {
  id: string;
  label: string;
  note?: string;
  items: MenuItem[];
}

interface Site {
  label: string;
  name: string;
  street: string;
  city: string;
  hours: string;
  hoursNote?: string;
}

@Component({
  selector: 'app-blackbird-cafe',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blackbird-cafe.component.html',
  styleUrl: './blackbird-cafe.component.scss',
})
export class BlackbirdCafeComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  private readonly seo = inject(SeoService);

  private static readonly PAPER_THEME_CLASS = 'bb-paper-theme';

  // Swaps the shell's dark root background for this page's paper substrate
  // while the page is mounted. Runs during prerender too, so the emitted static
  // HTML for this route already carries the right body background.
  ngOnInit(): void {
    if (typeof document === 'undefined') return;
    document.body.classList.add(BlackbirdCafeComponent.PAPER_THEME_CLASS);
  }

  ngOnDestroy(): void {
    if (typeof document === 'undefined') return;
    document.body.classList.remove(BlackbirdCafeComponent.PAPER_THEME_CLASS);
  }

  constructor() {
    this.seo.updateMetaTags({
      title: 'BLACKBIRD Café | Café de especialidad en Valencia — HH Studio',
      description:
        'Café de especialidad y pastelería artesana en Valencia. Ruzafa y Little Blackbird, El Carmen. Tostado de temporada por micro-tostadores.',
      image: 'https://muestras.hhstudio.es/assets/og/blackbird-cafe.jpg',
      url: 'https://muestras.hhstudio.es/blackbird-cafe',
    });
  }

  readonly statement =
    'En nuestras tazas solo empleamos café de especialidad, de temporada y recién tostado por los mejores micro-tostadores. Pregunta a nuestros baristas para más información.';

  readonly supplements = [
    'Suplemento por leches vegetales — avena, coco, soja +0.30',
    'Tamaño grande en bebidas calientes +1',
  ];

  readonly menu: MenuGroup[] = [
    {
      id: 'cafe',
      label: 'CAFÉ',
      note: 'Realiza tu pedido en barra',
      items: [
        { name: 'Espresso', price: '2.30' },
        { name: 'Americano', price: '2.30' },
        { name: 'Cortado', price: '2.40' },
        { name: 'Café con leche', price: '2.80' },
        { name: 'Flat white', price: '3.20' },
        { name: 'Iced latte', price: '3.50' },
        { name: 'Iced coffee', price: '2.50' },
        { name: 'Filtro (batch brew)', price: '2.20 / 3.70', size: 'S / L' },
        { name: 'Cold brew', price: '3.50' },
      ],
    },
    {
      id: 'calientes',
      label: 'OTRAS CALIENTES',
      items: [
        {
          name: 'Chocolate caliente',
          detail: 'Madagascar 70% · Puchero',
          price: '4.00',
        },
        { name: 'Chai latte', detail: 'Minor Figures · soja', price: '4.00' },
        { name: 'Matcha latte', price: '3.50' },
        {
          name: 'Infusiones a granel',
          detail:
            'La Petit Planethé · verde sencha, English Breakfast, menta poleo, rooibos vainilla, manzanilla, té rojo Pu-erh',
          price: '3.00',
        },
      ],
    },
    {
      id: 'frios',
      label: 'FRÍOS',
      items: [
        { name: 'Limonada casera con maracuyá', price: '4.00' },
        { name: 'Zumo de naranja', price: '4.50' },
        {
          name: 'Licuado',
          detail: 'Naranja, zanahoria, manzana y jengibre',
          price: '6.00',
        },
        { name: 'Agua de coco 100% natural', detail: '520 ml', price: '4.50' },
        { name: 'Cerveza Tyris', detail: 'Blonde o IPA', price: '4.00' },
        { name: 'Fritz Kola', price: '3.50' },
        { name: 'Agua / Agua con gas', price: '2.00 / 2.20' },
      ],
    },
    {
      id: 'tostadas',
      label: 'TOSTADAS',
      items: [
        {
          name: 'Tostada de tomate y AOVE',
          allergens: '1',
          detail:
            '+ Avocado (11) +3.80 · + Huevo a la plancha (3,11) +2.50',
          price: '4.00',
        },
        {
          name: 'Tostada de aguacate',
          allergens: '1,7,11',
          detail:
            'Tomates cherry, queso de cabra, lima y brotes. Pídela con tahini en vez de queso para hacerla vegana · + Huevo +2.50 · + Bacon crujiente +2.80',
          price: '12.00',
        },
      ],
    },
    {
      id: 'huevos',
      label: 'HUEVOS',
      items: [
        {
          name: 'Huevos turcos',
          allergens: '1,3,7,11',
          detail:
            'Dos huevos a la plancha con yogur aliñado, mantequilla de chile aleppo y eneldo. Con pan y ensalada de pepino cítrica.',
          price: '10.50',
        },
      ],
    },
    {
      id: 'sandwiches',
      label: 'SANDWICHES',
      items: [
        {
          name: 'Grilled cheese sandwich',
          allergens: '1,7,10,12',
          detail:
            'Scamorza ahumada, emmental y cebolleta, con salsa tatemada ranchera para mojar. Recomendado: añade nuestros jalapeños encurtidos caseros.',
          price: '9.50',
        },
        {
          name: 'Breakfast sandwich',
          allergens: '1,3,6,7,11,12',
          detail:
            'Longaniza italiana casera, huevo a la plancha, mayo paprika y rúcula.',
          price: '12.00',
        },
        {
          name: 'Sandwich mixto',
          allergens: '1,2,3,4,6,7,10,12',
          detail:
            'En pan de masa madre, con queso emmental, jamón de pierna cocido y mostaza dijon.',
          price: '9.50',
        },
        {
          name: 'Sandwich César',
          allergens: '1,2,3,4,6,7,10,11,12,13',
          detail:
            'Pollo asado a baja temperatura, salsa César cremosa, cebolla morada encurtida, bacon crujiente y rúcula, en pan de masa madre.',
          price: '12.00',
        },
        {
          name: 'Sandwich de bacon y huevo a la plancha',
          allergens: '1,3,6,7,8,10,11,12',
          detail:
            'Rúcula, tomate en rodajas, mayonesa de pesto casero, en pan de masa madre.',
          price: '11.50',
        },
      ],
    },
    {
      id: 'dulce',
      label: 'ALGO DULCE',
      items: [
        {
          name: 'Granola casera',
          allergens: '1,7,8,11',
          detail:
            'Arándanos rojos, coco, nueces y semillas, con yogur griego y fruta de temporada.',
          price: '8.50',
        },
        {
          name: 'Tostada de mantequilla y mermelada',
          allergens: '1,5,7,8',
          detail:
            'Mantequilla o crema de cacahuete, con nuestras mermeladas de estación caseras.',
          price: '5.00',
        },
        {
          name: 'French toast',
          allergens: '1,3,7',
          detail:
            'Tostada francesa hecha con pan casero de croissant, sirope de arce, crema de mascarpone y fruta de temporada.',
          price: '9.00',
        },
      ],
    },
  ];

  /** Printed on the shop's own menu. Kept as a numbered list, 1 to 14. */
  readonly allergens: { code: string; label: string }[] = [
    { code: '1', label: 'Gluten' },
    { code: '2', label: 'Crustáceos / Crustacean' },
    { code: '3', label: 'Huevos / Eggs' },
    { code: '4', label: 'Pescados / Fish' },
    { code: '5', label: 'Cacahuete / Peanuts' },
    { code: '6', label: 'Soja / Soy' },
    { code: '7', label: 'Lácteos / Dairy' },
    { code: '8', label: 'Frutos de cáscara / Nuts' },
    { code: '9', label: 'Apio / Celery' },
    { code: '10', label: 'Mostaza / Mustard' },
    { code: '11', label: 'Granos de sésamo / Sesame seeds' },
    { code: '12', label: 'Dióxido de azufre y sulfitos / Sulphites' },
    { code: '13', label: 'Moluscos / Molluscs' },
    { code: '14', label: 'Altramuces / Lupins' },
  ];

  readonly methods = [
    { id: '01', name: 'Espresso', spec: '9 bar · 92 °C · 25 s' },
    { id: '02', name: 'Filtro / batch', spec: '1:16 · 94 °C · 4 min' },
    { id: '03', name: 'Cold brew', spec: '1:8 · en frío · 18 h' },
    { id: '04', name: 'Leches vegetales', spec: 'avena · coco · soja' },
  ];

  readonly sites: Site[] = [
    {
      label: 'SEDE 01',
      name: 'Ruzafa',
      street: 'C/ de la Reina Na Maria, 7',
      city: "L'Eixample · 46006 València",
      hours: '9:00 — 15:30',
      hoursNote: 'cocina cierra 15:00',
    },
    {
      label: 'SEDE 02',
      name: 'Little Blackbird',
      street: 'C/ de les Danses, 2',
      city: 'Ciutat Vella · 46001 València',
      hours: '9:30 — 14:20',
    },
  ];

  readonly phone = '+34 960 05 10 90';
  readonly phoneHref = 'tel:+34960051090';
  readonly email = 'blackbirdvalencia@gmail.com';
  readonly instagram = '@blackbirdvlc';
  readonly instagramUrl = 'https://www.instagram.com/blackbirdvlc/';
  readonly currentYear = new Date().getFullYear();

  @ViewChildren('reveal') reveals!: QueryList<ElementRef<HTMLElement>>;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    const blocks = this.reveals.map((ref) => ref.nativeElement);
    if (blocks.length === 0) return;

    // Deliberately mechanical: a short linear rise and nothing else. No easing
    // flourish, no scale, no blur. The page is supposed to feel printed.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target,
              { y: 14, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.28, ease: 'none' },
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' },
    );

    blocks.forEach((block) => observer.observe(block));
  }
}
