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
  imageUrl?: string;
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

type CakeType = 'tarta-queso' | 'brownie';

interface CakeTypeOption {
  value: CakeType;
  name: string;
  description: string;
  emoji: string;
  gradient: string;
}

interface CakeBaseOption {
  value: string;
  name: string;
  description: string;
  emoji: string;
}

interface CakeFlavorOption {
  value: string;
  name: string;
  emoji: string;
  color: string;
  multiplier: number;
}

interface CakeSizeOption {
  value: string;
  name: string;
  description: string;
  emoji: string;
  basePrice: number;
}

interface CakeDecorationOption {
  value: string;
  name: string;
  emoji: string;
  price: number;
}

interface CakeConfig {
  type: CakeType | null;
  base: string | null;
  flavor: string | null;
  size: string | null;
  decorations: string[];
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
      imageUrl: 'assets/images/pasteleria/products/croissant.jpg',
    },
    {
      name: 'Tarta de Chocolate',
      description: 'Chocolate Valrhona 70%, ganache sedosa y crujiente de cacao.',
      price: '32,00 €',
      gradient: 'linear-gradient(135deg, #3d2b1f 0%, #5a3a2a 40%, #2d1f15 100%)',
      imageUrl: 'assets/images/pasteleria/products/chocolate-cake.jpg',
    },
    {
      name: 'Macarons Franceses',
      description: '12 unidades surtidas: frambuesa, pistacho, limón y caramelo.',
      price: '18,50 €',
      gradient: 'linear-gradient(135deg, #f0d4da 0%, #c8d8ca 40%, #e0c8a0 100%)',
    },
    {
      name: 'Pan de Masa Madre',
      description: 'Fermentación lenta 48h con masa madre natural de centeno.',
      price: '5,50 €',
      gradient: 'linear-gradient(135deg, #d4c8a8 0%, #c9b896 40%, #b8a682 100%)',
    },
    {
      name: 'Éclairs de Vainilla',
      description: 'Pasta choux crujiente rellena de crema pastelera bourbon.',
      price: '4,50 €',
      gradient: 'linear-gradient(135deg, #faf7f2 0%, #f0e6d8 40%, #e8dcc4 100%)',
      imageUrl: 'assets/images/pasteleria/products/eclairs.jpg',
    },
    {
      name: 'Tarta de Frutas',
      description: 'Base de sablé breton, crema diplomática y frutas frescas de temporada.',
      price: '28,00 €',
      gradient: 'linear-gradient(135deg, #e8734a 0%, #c17b60 40%, #d4956c 100%)',
      imageUrl: 'assets/images/pasteleria/products/fruit-tart.jpg',
    },
    {
      name: 'Palmeritas',
      description: 'Hojaldre caramelizado con mantequilla francesa y azúcar perlado.',
      price: '3,20 €',
      gradient: 'linear-gradient(135deg, #e8d4a0 0%, #f0e0b8 40%, #d4be80 100%)',
    },
    {
      name: 'Pain au Chocolat',
      description: 'Masa hojaldrada con dos barras de chocolate negro 66%.',
      price: '3,00 €',
      gradient: 'linear-gradient(135deg, #6b4c3b 0%, #8b6b5a 40%, #c4943a 100%)',
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
  priceAnimated = false;

  currentStep = 0;
  readonly totalSteps = 5;

  cakeConfig: CakeConfig = {
    type: null,
    base: null,
    flavor: null,
    size: null,
    decorations: [],
  };

  readonly typeOptions: CakeTypeOption[] = [
    {
      value: 'tarta-queso',
      name: 'Tarta de Queso',
      description: 'Cremosa y suave, estilo La Viña. Elige tu base, sabor frutal o clásico, y coronála con decoraciones frescas.',
      emoji: '🧀',
      gradient: 'linear-gradient(135deg, #faf7f2 0%, #f0e6d8 40%, rgba(193, 123, 96, 0.12) 100%)',
    },
    {
      value: 'brownie',
      name: 'Brownie',
      description: 'Intenso y denso, con chocolate de origen. Nueces, dulce de leche y coberturas que lo hacen irresistible.',
      emoji: '🍫',
      gradient: 'linear-gradient(135deg, #f0e6d8 0%, #e0d0b8 40%, rgba(193, 123, 96, 0.1) 100%)',
    },
  ];

  private readonly tartaQuesoBases: CakeBaseOption[] = [
    { value: 'clasica', name: 'Clásica', description: 'Bizcocho esponjoso tradicional, horneado a baja temperatura', emoji: '🍰' },
    { value: 'galleta-digestive', name: 'Galleta Digestive', description: 'Base crujiente de galleta triturada con mantequilla', emoji: '🍪' },
    { value: 'sin-base', name: 'Sin Base', description: 'Solo crema de queso, ligera y aireada', emoji: '🥄' },
  ];

  private readonly brownieBases: CakeBaseOption[] = [
    { value: 'clasico', name: 'Clásico', description: 'Brownie denso de chocolate intenso, textura perfecta', emoji: '🍫' },
    { value: 'con-nueces', name: 'Con Nueces', description: 'Brownie con nueces caramelizadas para un toque crujiente', emoji: '🥜' },
    { value: 'dulce-de-leche', name: 'Relleno de Dulce de Leche', description: 'Brownie relleno de dulce de leche argentino', emoji: '🥛' },
  ];

  private readonly tartaQuesoFlavors: CakeFlavorOption[] = [
    { value: 'natural', name: 'Natural', emoji: '🧀', color: '#f5e6d3', multiplier: 1.0 },
    { value: 'frutos-rojos', name: 'Frutos Rojos', emoji: '🫐', color: '#c94057', multiplier: 1.0 },
    { value: 'mango-maracuya', name: 'Mango & Maracuyá', emoji: '🥭', color: '#f4a460', multiplier: 1.15 },
    { value: 'chocolate-blanco', name: 'Chocolate Blanco', emoji: '🤍', color: '#faf0e6', multiplier: 1.0 },
    { value: 'lotus', name: 'Lotus', emoji: '🍪', color: '#c4943a', multiplier: 1.2 },
  ];

  private readonly brownieFlavors: CakeFlavorOption[] = [
    { value: 'chocolate-intenso', name: 'Chocolate Intenso', emoji: '🍫', color: '#3d2b1f', multiplier: 1.0 },
    { value: 'chocolate-blanco-frambuesa', name: 'Chocolate Blanco & Frambuesa', emoji: '🍓', color: '#e8a0b4', multiplier: 1.15 },
    { value: 'menta-chocolate', name: 'Menta & Chocolate', emoji: '🌿', color: '#98d8a0', multiplier: 1.0 },
    { value: 'naranja-confitada', name: 'Naranja Confitada', emoji: '🍊', color: '#f4a460', multiplier: 1.15 },
    { value: 'cafe-chocolate', name: 'Café & Chocolate', emoji: '☕', color: '#6b4c3b', multiplier: 1.0 },
  ];

  private readonly tartaQuesoSizes: CakeSizeOption[] = [
    { value: 'mini', name: 'Mini', description: '15 cm — 4 a 6 personas', emoji: '🧁', basePrice: 22 },
    { value: 'mediano', name: 'Mediano', description: '22 cm — 8 a 10 personas', emoji: '🎂', basePrice: 38 },
    { value: 'grande', name: 'Grande', description: '28 cm — 14 a 16 personas', emoji: '🍰', basePrice: 58 },
  ];

  private readonly brownieSizes: CakeSizeOption[] = [
    { value: 'mini', name: 'Mini', description: '15 cm — 4 a 6 personas', emoji: '🧁', basePrice: 18 },
    { value: 'mediano', name: 'Mediano', description: '22 cm — 8 a 10 personas', emoji: '🎂', basePrice: 32 },
    { value: 'grande', name: 'Grande', description: '28 cm — 14 a 16 personas', emoji: '🍰', basePrice: 48 },
  ];

  private readonly tartaQuesoDecorations: CakeDecorationOption[] = [
    { value: 'frutas-frescas', name: 'Frutas Frescas', emoji: '🍓', price: 5 },
    { value: 'salsa-frutos-rojos', name: 'Salsa de Frutos Rojos', emoji: '🫐', price: 4 },
    { value: 'chocolate-fundido', name: 'Chocolate Fundido', emoji: '🍫', price: 5 },
    { value: 'flores-comestibles', name: 'Flores Comestibles', emoji: '🌸', price: 8 },
    { value: 'pan-de-oro', name: 'Pan de Oro', emoji: '✨', price: 15 },
  ];

  private readonly brownieDecorations: CakeDecorationOption[] = [
    { value: 'helado-vainilla', name: 'Helado de Vainilla', emoji: '🍦', price: 4 },
    { value: 'frutos-secos', name: 'Frutos Secos', emoji: '🥜', price: 5 },
    { value: 'chocolate-fundido', name: 'Chocolate Fundido', emoji: '🍫', price: 4 },
    { value: 'salsa-caramelo', name: 'Salsa Caramelo', emoji: '🍯', price: 5 },
    { value: 'pan-de-oro', name: 'Pan de Oro', emoji: '✨', price: 15 },
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

  getBaseOptions(): CakeBaseOption[] {
    return this.cakeConfig.type === 'brownie' ? this.brownieBases : this.tartaQuesoBases;
  }

  getFlavorOptions(): CakeFlavorOption[] {
    return this.cakeConfig.type === 'brownie' ? this.brownieFlavors : this.tartaQuesoFlavors;
  }

  getSizeOptions(): CakeSizeOption[] {
    return this.cakeConfig.type === 'brownie' ? this.brownieSizes : this.tartaQuesoSizes;
  }

  getDecorationOptions(): CakeDecorationOption[] {
    return this.cakeConfig.type === 'brownie' ? this.brownieDecorations : this.tartaQuesoDecorations;
  }

  selectType(value: CakeType): void {
    this.cakeConfig = { type: value, base: null, flavor: null, size: null, decorations: [] };
    setTimeout(() => this.nextStep(), 350);
  }

  selectBase(value: string): void {
    this.cakeConfig = { ...this.cakeConfig, base: value, flavor: null, size: null, decorations: [] };
    setTimeout(() => this.nextStep(), 300);
  }

  selectFlavor(value: string): void {
    this.cakeConfig = { ...this.cakeConfig, flavor: value, size: null, decorations: [] };
    setTimeout(() => this.nextStep(), 300);
  }

  selectSize(value: string): void {
    this.cakeConfig = { ...this.cakeConfig, size: value };
    setTimeout(() => this.nextStep(), 300);
  }

  toggleDecoration(value: string): void {
    const idx = this.cakeConfig.decorations.indexOf(value);
    if (idx >= 0) {
      this.cakeConfig = {
        ...this.cakeConfig,
        decorations: this.cakeConfig.decorations.filter((_, i) => i !== idx),
      };
    } else {
      this.cakeConfig = {
        ...this.cakeConfig,
        decorations: [...this.cakeConfig.decorations, value],
      };
    }
  }

  removeDecoration(value: string): void {
    this.cakeConfig = {
      ...this.cakeConfig,
      decorations: this.cakeConfig.decorations.filter((d) => d !== value),
    };
  }

  nextStep(): void {
    if (this.currentStep < this.totalSteps - 1) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  resetBuilder(): void {
    this.currentStep = 0;
    this.cakeConfig = { type: null, base: null, flavor: null, size: null, decorations: [] };
  }

  basePrice(): number {
    const sizes = this.getSizeOptions();
    const size = sizes.find((s) => s.value === this.cakeConfig.size);
    return size ? size.basePrice : 0;
  }

  flavorMultiplier(): number {
    const flavors = this.getFlavorOptions();
    const flavor = flavors.find((f) => f.value === this.cakeConfig.flavor);
    return flavor ? flavor.multiplier : 1;
  }

  isFlavorPremium(): boolean {
    return this.flavorMultiplier() > 1;
  }

  flavorPremiumPercent(): number {
    return Math.round((this.flavorMultiplier() - 1) * 100);
  }

  flavorUpcharge(): number {
    const bp = this.basePrice();
    return Math.round((bp * this.flavorMultiplier()) - bp);
  }

  private _lastPrice = 0;

  calculatedPrice(): number {
    const bp = this.basePrice();
    if (!bp) {
      this._lastPrice = 0;
      return 0;
    }
    let price = bp * this.flavorMultiplier();
    for (const d of this.cakeConfig.decorations) {
      const decos = this.getDecorationOptions();
      const deco = decos.find((x) => x.value === d);
      if (deco) price += deco.price;
    }
    const rounded = Math.round(price * 100) / 100;
    if (rounded !== this._lastPrice && rounded > 0 && this._lastPrice > 0) {
      this._lastPrice = rounded;
      this.priceAnimated = true;
      setTimeout(() => (this.priceAnimated = false), 420);
    } else {
      this._lastPrice = rounded;
    }
    return rounded;
  }

  selectedDecorations(): CakeDecorationOption[] {
    const decos = this.getDecorationOptions();
    return decos.filter((d) => this.cakeConfig.decorations.includes(d.value));
  }

  sizeLabel(): string {
    const sizes = this.getSizeOptions();
    const found = sizes.find((s) => s.value === this.cakeConfig.size);
    return found ? found.description : '';
  }

  typeLabel(): string {
    const found = this.typeOptions.find((t) => t.value === this.cakeConfig.type);
    return found ? found.name : '';
  }

  flavorLabel(): string {
    const flavors = this.getFlavorOptions();
    const found = flavors.find((f) => f.value === this.cakeConfig.flavor);
    return found ? found.name : '';
  }

  baseLabel(): string {
    const bases = this.getBaseOptions();
    const found = bases.find((b) => b.value === this.cakeConfig.base);
    return found ? found.name : '';
  }

  configPreviewText(): string {
    if (!this.cakeConfig.type || !this.cakeConfig.size) return '';
    const parts: string[] = [];
    const type = this.typeLabel();
    const flavor = this.flavorLabel();
    const size = this.sizeLabel().split(' — ')[0];
    const decoNames = this.selectedDecorations().map((d) => d.name);

    let name = type;
    if (flavor) name += ` ${flavor}`;
    name += `, ${size}`;
    if (decoNames.length) name += `, con ${decoNames.join(' y ')}`;
    name += ` — ${this.calculatedPrice().toFixed(0)}€ estimado`;
    return name;
  }

  cakeLabel(): string {
    if (!this.cakeConfig.type) return 'Elige un tipo de tarta para empezar';
    const parts: string[] = [];
    const type = this.typeLabel();
    const base = this.baseLabel();
    const flavor = this.flavorLabel();
    const sizeLabel = this.sizeLabel().split(' — ')[0];
    if (type) parts.push(type);
    if (base) parts.push(base);
    if (flavor) parts.push(flavor);
    if (sizeLabel) parts.push(sizeLabel);
    return parts.length ? parts.join(' · ') : 'Configura tu tarta';
  }

  stepLabel(step: number): string {
    const labels = ['Tipo', 'Base', 'Sabor', 'Tamaño', 'Decoración'];
    return labels[step] || '';
  }

  isCurrentStepValid(): boolean {
    switch (this.currentStep) {
      case 0: return this.cakeConfig.type !== null;
      case 1: return this.cakeConfig.base !== null;
      case 2: return this.cakeConfig.flavor !== null;
      case 3: return this.cakeConfig.size !== null;
      default: return true;
    }
  }

  private configSummary(): string {
    if (!this.cakeConfig.type) return '';
    const parts: string[] = [];
    parts.push(`Producto: ${this.typeLabel()}`);
    const base = this.baseLabel();
    const flavor = this.flavorLabel();
    if (base) parts.push(`Base: ${base}`);
    if (flavor) parts.push(`Sabor: ${flavor}`);
    const sl = this.sizeLabel();
    if (sl) parts.push(`Tamaño: ${sl}`);
    if (this.cakeConfig.decorations.length) {
      const decoNames = this.selectedDecorations().map((d) => d.name).join(', ');
      parts.push(`Decoraciones: ${decoNames}`);
    }
    const price = this.calculatedPrice();
    if (price > 0) parts.push(`Precio estimado: ${price} €`);
    return parts.join('\n');
  }
}
