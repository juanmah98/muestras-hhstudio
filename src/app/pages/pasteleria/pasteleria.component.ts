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
import { DecimalPipe } from '@angular/common';
import gsap from 'gsap';

interface NavLink {
  label: string;
  fragment: string;
}

interface Product {
  name: string;
  description: string;
  price: string;
  gradient: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

interface MenuItem {
  name: string;
  description: string;
  price: string;
}

interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  link?: string;
}

type CakeBase = 'bizcocho' | 'brownie' | 'galleta';
type CakeFlavor = 'chocolate' | 'vainilla' | 'fresa' | 'limon' | 'caramelo';
type CakeSize = 'mini' | 'mediano' | 'grande';
type CakeDecoration = 'frutas' | 'flores' | 'chocolate' | 'fondant' | 'oro';

interface CakeBaseOption {
  value: CakeBase;
  name: string;
  description: string;
  emoji: string;
}

interface CakeFlavorOption {
  value: CakeFlavor;
  name: string;
  emoji: string;
  color: string;
  multiplier: number;
}

interface CakeSizeOption {
  value: CakeSize;
  name: string;
  description: string;
  emoji: string;
  basePrice: number;
}

interface CakeDecorationOption {
  value: CakeDecoration;
  name: string;
  emoji: string;
  price: number;
}

interface CakeConfig {
  base: CakeBase | null;
  flavor: CakeFlavor | null;
  size: CakeSize | null;
  decorations: CakeDecoration[];
}

@Component({
  selector: 'app-pasteleria',
  standalone: true,
  imports: [RouterLink, FormsModule, DecimalPipe],
  templateUrl: './pasteleria.component.html',
  styleUrl: './pasteleria.component.scss',
})
export class PasteleriaComponent implements AfterViewInit {
  readonly currentYear = new Date().getFullYear();
  scrolled = false;

  @ViewChild('heroContent') heroContent!: ElementRef<HTMLElement>;

  @ViewChildren('animateSection') animateSections!: QueryList<
    ElementRef<HTMLElement>
  >;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.scrolled = window.scrollY > 50;
  }

  readonly navLinks: NavLink[] = [
    { label: 'Inicio', fragment: 'inicio' },
    { label: 'Carta', fragment: 'carta' },
    { label: 'Proceso', fragment: 'proceso' },
    { label: 'Productos', fragment: 'productos' },
    { label: 'Encargos', fragment: 'encargos' },
    { label: 'Contacto', fragment: 'contacto' },
  ];

  readonly products: Product[] = [
    {
      name: 'Croissant Artesano',
      description: 'Hojaldre francés con mantequilla pura, 72 horas de fermentación.',
      price: '2,80 €',
      gradient: 'linear-gradient(135deg, #d4a574 0%, #c17b60 40%, #e8c9a0 100%)',
    },
    {
      name: 'Tarta de Chocolate',
      description: 'Chocolate Valrhona 70%, ganache sedosa y crujiente de cacao.',
      price: '32,00 €',
      gradient: 'linear-gradient(135deg, #3d2b1f 0%, #5a3a2a 40%, #2d1f15 100%)',
    },
    {
      name: 'Macarons Franceses',
      description: '12 unidades surtidas: frambuesa, pistacho, limón y caramelo.',
      price: '18,50 €',
      gradient: 'linear-gradient(135deg, #e8b4b8 0%, #a3b5a6 40%, #c4943a 100%)',
    },
    {
      name: 'Pan de Masa Madre',
      description: 'Fermentación lenta 48h con masa madre natural de centeno.',
      price: '5,50 €',
      gradient: 'linear-gradient(135deg, #c4943a 0%, #d4a554 40%, #a07830 100%)',
    },
    {
      name: 'Éclairs de Vainilla',
      description: 'Pasta choux crujiente rellena de crema pastelera bourbon.',
      price: '4,50 €',
      gradient: 'linear-gradient(135deg, #faf7f2 0%, #f0e6d8 40%, #e8dcc4 100%)',
    },
    {
      name: 'Tarta de Frutas',
      description: 'Base de sablé breton, crema diplomática y frutas frescas de temporada.',
      price: '28,00 €',
      gradient: 'linear-gradient(135deg, #e8734a 0%, #c17b60 40%, #d4956c 100%)',
    },
    {
      name: 'Palmeritas',
      description: 'Hojaldre caramelizado con mantequilla francesa y azúcar perlado.',
      price: '3,20 €',
      gradient: 'linear-gradient(135deg, #c4943a 0%, #e8c46c 40%, #a07830 100%)',
    },
    {
      name: 'Pain au Chocolat',
      description: 'Masa hojaldrada con dos barras de chocolate negro 66%.',
      price: '3,00 €',
      gradient: 'linear-gradient(135deg, #3d2b1f 0%, #5a4030 40%, #c4943a 100%)',
    },
  ];

  readonly steps: Step[] = [
    {
      number: '01',
      title: 'Selección de Ingredientes',
      description:
        'Elegimos a mano cada ingrediente: mantequilla francesa, harinas ecológicas molidas a piedra, huevos camperos y fruta de temporada de productores locales.',
    },
    {
      number: '02',
      title: 'Elaboración Artesanal',
      description:
        'Cada pieza se trabaja a mano con técnicas tradicionales. Fermentaciones lentas, laminados precisos y reposos que respetan los tiempos de la materia prima.',
    },
    {
      number: '03',
      title: 'Horneado Perfecto',
      description:
        'Horneamos en horno de solera en pequeñas tandas. Controlamos temperatura, humedad y tiempo para conseguir el punto exacto de cocción.',
    },
    {
      number: '04',
      title: 'Entrega en 24h',
      description:
        'Envío urgente a domicilio en Madrid y alrededores. Cada producto se empaqueta individualmente para llegar como recién hecho.',
    },
  ];

  readonly menuCategories: MenuCategory[] = [
    {
      title: 'Bollería',
      items: [
        { name: 'Croissant Clásico', description: 'Mantequilla francesa AOP, fermentación 72h', price: '2,80 €' },
        { name: 'Pain au Chocolat', description: 'Dos barras de chocolate negro 66%', price: '3,00 €' },
        { name: 'Palmera de Hojaldre', description: 'Caramelo artesano y azúcar perlado', price: '3,20 €' },
        { name: 'Napolitana de Crema', description: 'Crema pastelera de vainilla bourbon', price: '3,00 €' },
        { name: 'Brioche de Mantequilla', description: 'Miga esponjosa, corteza dorada', price: '3,50 €' },
      ],
    },
    {
      title: 'Tartas',
      items: [
        { name: 'Tarta de Chocolate', description: 'Ganache Valrhona 70%, crujiente de cacao', price: '32,00 €' },
        { name: 'Tarta de Queso Vasca', description: 'Estilo La Viña, cremosa y tostada', price: '26,00 €' },
        { name: 'Tarta de Frutas', description: 'Crema diplomática y fruta de temporada', price: '28,00 €' },
        { name: 'Tarta Sacher', description: 'Bizcocho de chocolate, mermelada de albaricoque', price: '30,00 €' },
      ],
    },
    {
      title: 'Pastelería Francesa',
      items: [
        { name: 'Macarons (12 uds.)', description: 'Frambuesa, pistacho, limón y caramelo', price: '18,50 €' },
        { name: 'Éclair de Vainilla', description: 'Crema pastelera bourbon, glaseado', price: '4,50 €' },
        { name: 'Paris-Brest', description: 'Crema de avellanas, praliné artesano', price: '5,50 €' },
        { name: 'Tarta Tatín', description: 'Manzana caramelizada, masa quebrada', price: '24,00 €' },
      ],
    },
    {
      title: 'Panes',
      items: [
        { name: 'Masa Madre Natural', description: 'Fermentación 48h, centeno ecológico', price: '5,50 €' },
        { name: 'Pan de Cristal', description: 'Corteza fina, alveolo grande', price: '4,00 €' },
        { name: 'Baguette de Tradición', description: 'Harina T65, poolish 24h', price: '2,80 €' },
        { name: 'Pan de Aceitunas', description: 'Aceitunas arbequinas, romero fresco', price: '4,50 €' },
      ],
    },
  ];

  readonly contactInfo: ContactInfo[] = [
    {
      icon: 'bi-telephone',
      label: 'Teléfono',
      value: '+34 911 234 567',
      link: 'tel:+34911234567',
    },
    {
      icon: 'bi-envelope',
      label: 'Email',
      value: 'hola@dulcera.es',
      link: 'mailto:hola@dulcera.es',
    },
    {
      icon: 'bi-geo-alt',
      label: 'Dirección',
      value: 'Calle del Amor, 23, Madrid',
    },
    {
      icon: 'bi-clock',
      label: 'Horario',
      value: 'Mar–Sáb: 9:00–20:00 | Dom: 9:00–14:00',
    },
  ];

  orderForm = {
    name: '',
    email: '',
    phone: '',
    dateNeeded: '',
    message: '',
  };

  contactForm = {
    name: '',
    email: '',
    message: '',
  };

  orderSubmitted = false;
  contactSubmitted = false;

  currentStep = 0;

  cakeConfig: CakeConfig = {
    base: null,
    flavor: null,
    size: null,
    decorations: [],
  };

  readonly baseOptions: CakeBaseOption[] = [
    {
      value: 'bizcocho',
      name: 'Bizcocho Clásico',
      description: 'Esponjoso y ligero, receta tradicional francesa con mantequilla pura',
      emoji: '🍰',
    },
    {
      value: 'brownie',
      name: 'Brownie de Chocolate',
      description: 'Denso e intenso, con chocolate Valrhona 70% y nueces caramelizadas',
      emoji: '🍫',
    },
    {
      value: 'galleta',
      name: 'Galleta Crujiente',
      description: 'Base de speculoos belga con un toque de canela y mantequilla tostada',
      emoji: '🍪',
    },
  ];

  readonly flavorOptions: CakeFlavorOption[] = [
    { value: 'chocolate', name: 'Chocolate Belga', emoji: '🍫', color: '#3d2b1f', multiplier: 1.2 },
    { value: 'vainilla', name: 'Vainilla Bourbon', emoji: '🌸', color: '#f5ecd7', multiplier: 1.0 },
    { value: 'fresa', name: 'Fresa Natural', emoji: '🍓', color: '#e8a0b4', multiplier: 1.0 },
    { value: 'limon', name: 'Limón Siciliano', emoji: '🍋', color: '#f0e68c', multiplier: 1.0 },
    { value: 'caramelo', name: 'Caramelo Salado', emoji: '🍯', color: '#c4943a', multiplier: 1.2 },
  ];

  readonly sizeOptions: CakeSizeOption[] = [
    { value: 'mini', name: 'Mini', description: '15 cm — 4 a 6 personas', emoji: '🧁', basePrice: 25 },
    { value: 'mediano', name: 'Mediano', description: '22 cm — 8 a 10 personas', emoji: '🎂', basePrice: 45 },
    { value: 'grande', name: 'Grande', description: '28 cm — 14 a 16 personas', emoji: '🍰', basePrice: 75 },
  ];

  readonly decorationOptions: CakeDecorationOption[] = [
    { value: 'frutas', name: 'Frutas Frescas', emoji: '🍓', price: 5 },
    { value: 'flores', name: 'Flores Comestibles', emoji: '🌸', price: 8 },
    { value: 'chocolate', name: 'Chocolate Fundido', emoji: '🍫', price: 5 },
    { value: 'fondant', name: 'Fondant Personalizado', emoji: '🎨', price: 12 },
    { value: 'oro', name: 'Pan de Oro', emoji: '✨', price: 15 },
  ];

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
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
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
              { y: 32, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
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

  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  submitOrder(event: Event): void {
    event.preventDefault();
    if (!this.orderForm.name || !this.orderForm.email) return;

    const configSummary = this.configSummary();
    const messageWithConfig = configSummary
      ? `${configSummary}\n\n---\n\n${this.orderForm.message || 'Sin mensaje adicional.'}`
      : this.orderForm.message;

    console.log('Encargo enviado:', {
      ...this.orderForm,
      cakeConfig: this.cakeConfig,
      estimatedPrice: this.calculatedPrice(),
      message: messageWithConfig,
    });
    this.orderForm = { name: '', email: '', phone: '', dateNeeded: '', message: '' };
    this.orderSubmitted = true;
    setTimeout(() => (this.orderSubmitted = false), 8000);
  }

  submitContact(event: Event): void {
    event.preventDefault();
    if (!this.contactForm.name || !this.contactForm.email) return;
    console.log('Contacto enviado:', this.contactForm);
    this.contactForm = { name: '', email: '', message: '' };
    this.contactSubmitted = true;
    setTimeout(() => (this.contactSubmitted = false), 8000);
  }

  // --- Cake Builder Methods ---

  selectBase(value: CakeBase): void {
    this.cakeConfig.base = value;
    setTimeout(() => this.nextStep(), 300);
  }

  selectFlavor(value: CakeFlavor): void {
    this.cakeConfig.flavor = value;
    setTimeout(() => this.nextStep(), 300);
  }

  selectSize(value: CakeSize): void {
    this.cakeConfig.size = value;
    setTimeout(() => this.nextStep(), 300);
  }

  toggleDecoration(value: CakeDecoration): void {
    const idx = this.cakeConfig.decorations.indexOf(value);
    if (idx >= 0) {
      this.cakeConfig.decorations.splice(idx, 1);
    } else {
      this.cakeConfig.decorations = [...this.cakeConfig.decorations, value];
    }
  }

  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  basePrice(): number {
    const size = this.sizeOptions.find((s) => s.value === this.cakeConfig.size);
    return size ? size.basePrice : 0;
  }

  flavorMultiplier(): number {
    const flavor = this.flavorOptions.find((f) => f.value === this.cakeConfig.flavor);
    return flavor ? flavor.multiplier : 1;
  }

  calculatedPrice(): number {
    const size = this.sizeOptions.find((s) => s.value === this.cakeConfig.size);
    if (!size) return 0;
    let price = size.basePrice;
    const flavor = this.flavorOptions.find((f) => f.value === this.cakeConfig.flavor);
    if (flavor) {
      price *= flavor.multiplier;
    }
    for (const d of this.cakeConfig.decorations) {
      const deco = this.decorationOptions.find((x) => x.value === d);
      if (deco) price += deco.price;
    }
    return Math.round(price);
  }

  selectedDecorations(): CakeDecorationOption[] {
    return this.decorationOptions.filter((d) =>
      this.cakeConfig.decorations.includes(d.value),
    );
  }

  sizeLabel(size: CakeSize): string {
    const found = this.sizeOptions.find((s) => s.value === size);
    return found ? found.description : '';
  }

  cakeLabel(): string {
    const parts: string[] = [];
    const base = this.baseOptions.find((b) => b.value === this.cakeConfig.base);
    const flavor = this.flavorOptions.find((f) => f.value === this.cakeConfig.flavor);
    const size = this.sizeOptions.find((s) => s.value === this.cakeConfig.size);
    if (base && flavor && size) {
      parts.push(`Tarta ${size.name} de ${flavor.name} sobre ${base.name}`);
    } else {
      if (base) parts.push(base.name);
      if (flavor) parts.push(flavor.name);
      if (size) parts.push(size.name);
    }
    return parts.length ? parts.join(' · ') : 'Tu tarta personalizada';
  }

  cakePreviewClasses(): string {
    const classes = ['dulcera__cake-preview-cake'];
    if (this.cakeConfig.flavor) {
      classes.push(`dulcera__cake-preview-cake--${this.cakeConfig.flavor}`);
    }
    if (this.cakeConfig.size) {
      classes.push(`dulcera__cake-preview-cake--${this.cakeConfig.size}`);
    }
    return classes.join(' ');
  }

  private configSummary(): string {
    const parts: string[] = [];
    const base = this.baseOptions.find((b) => b.value === this.cakeConfig.base);
    const flavor = this.flavorOptions.find((f) => f.value === this.cakeConfig.flavor);
    const size = this.sizeOptions.find((s) => s.value === this.cakeConfig.size);
    if (base) parts.push(`Base: ${base.name}`);
    if (flavor) parts.push(`Sabor: ${flavor.name}`);
    if (size) parts.push(`Tamaño: ${size.description}`);
    if (this.cakeConfig.decorations.length) {
      const decoNames = this.selectedDecorations().map((d) => d.name).join(', ');
      parts.push(`Decoraciones: ${decoNames}`);
    }
    const price = this.calculatedPrice();
    if (price > 0) parts.push(`Precio estimado: ${price} €`);
    return parts.length ? parts.join('\n') : '';
  }
}
