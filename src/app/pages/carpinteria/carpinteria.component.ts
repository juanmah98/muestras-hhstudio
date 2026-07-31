import {
  Component,
  AfterViewInit,
  HostListener,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';

interface Service {
  icon: string;
  title: string;
  description: string;
  chips: string[];
  image: string;
  layout: 'left' | 'right';
}

interface Project {
  title: string;
  chip: string;
  image: string;
  layoutClass: string;
}

interface Value {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-carpinteria',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './carpinteria.component.html',
  styleUrl: './carpinteria.component.scss',
})
export class CarpinteriaComponent implements AfterViewInit {
  readonly currentYear = new Date().getFullYear();
  mobileMenuOpen = false;
  scrolled = false;

  readonly services: Service[] = [
    {
      icon: 'table_restaurant',
      title: 'Custom Dining Tables',
      description:
        'Our primary focus. We design and build heirloom-quality dining tables tailored to your space, crafted from solid, ethically sourced hardwoods.',
      chips: ['WALNUT', 'WHITE OAK', 'ASH'],
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDWO0Y7rEYfTWTLQEquSDQcfbFwdOTcMTwCk31cPHdcWnSm21bqyisXNmma9ZHQ2RjRacfVrzDlUdTDchIwHP2UwXVjzHKtOVVjXqZM9cJL6H-b6P8rvruF8ooanQyrkJdqBAN9EV-eD8Iic9FZocP6ZcCoYT50_oNhz6qPC4u-gC9592LlMZe9zaqoY0oYPF_uC82GvYeqJy1eXYhbydEpAlPRMEwZr2pGs0P5BPjM_oPdAKaCdrXk',
      layout: 'left',
    },
    {
      icon: 'draw',
      title: 'Bespoke Furniture Design',
      description:
        'Collaborate with our master carpenters to bring your unique furniture concepts to life, blending form and function seamlessly.',
      chips: [],
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAJvUKFGfzT0AQY_8tcg-Tmjrw4nbi8Rk2wrKbUMQGHbHYbkpiNPTK9zvarinlbD1O-mN0jodcJ9ElT8aP_N8WZD4Q7vCU6r1VhFfFYLnnvJFUHlr_HhXsDdR6XNt9WvVHp6hbxmBYF1bedsv2omIUXevKV96kh4Q69N86KMhw47idtd5TCWw3i5ForSxk8Rk8ddtSDz_1xnX6hLrKWtznYxHdu9tRz5Bnl6oLZdXPH6erIbwV98WU9',
      layout: 'right',
    },
    {
      icon: 'handyman',
      title: 'Artisanal Woodwork',
      description:
        'From custom shelving to architectural accents, we apply meticulous attention to detail to elevate any interior space.',
      chips: [],
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ2RospDhuKvuhrqMlMJoLqz3JW2tdnB5InowzjasBRM79cgfBaPwxhJuHqFS9ZxPeLeFr8g2yT-r91Khhpq2vLnDwyVQSy5S4xSYdUNXqtdQ_uItoV9K8VgO-thigbSfMqyv3Ns2CyQ8uqpZVdkJjOad3DC-xwx4pkg8dAPjME9AeSIPhIFd73-ujpiREDdhbyAM94DdrX-f2u82fbUE_1ZBc4qSgS8rSrI_O7U6c96Wq8xnGALSh',
      layout: 'left',
    },
  ];

  readonly projects: Project[] = [
    {
      title: 'The Aida Table',
      chip: 'WALNUT',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDWLNskfDkntlZ_iqucUeo3Vtt4L3Th7ljJ-1PSLKEIT0aGGl1kjjKTAmDKu2G4TNXdDHLDGa_GMSom4Tw7vEf-zEeDa0tEvKhiJdqIXuXgCBQaK2X5L5aRV6CMtZAWApGPaWgph3CwDt1RMB-G7cOKA7MWx6QfdofaKTdK3JmCVMBvWm0hMgJW3gfYyYPfJz6BiPuaJwZeNsl1pi_9GxUkTro3VClK92_mmQveG1BT9Rix3PR_iI1Z',
      layoutClass: 'alamo__work-card--large',
    },
    {
      title: 'Minimalist Desk',
      chip: 'WHITE OAK',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDhHBb0zW4TNrRWCQmD6Y1rmTG3cc34Eg3i6jUVdzDYLhmmNgIZfYs1B_0tkrQ83zoP2elsrih2TAbej3Q6EtU1ELLgAeTuqAauxnhDMNpk_kv70IYfjp2fpcczJxk9r7uS5ndVOFSpLrFiFGg8h-huSzKRavhohp456m8t3Un730qUBe3DOQfiZVwjELntHv5EtA5G9_Gv91v_j9e2VXM5mERhpgVCWiKT3JJnrGMNuCiK_QWlYDZ-',
      layoutClass: '',
    },
    {
      title: 'Island Centerpiece',
      chip: 'ASH',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuADoUwhNFzBTCW_AGR-9e0cLQ0k343XC20FrvZ4PXQZ5FzeUa4weel9_VbIHvLVmrxVemUXfh2JyNNeLvuqKPeYpl2z6gF3tXA4TwxUA9CzyZBebndFnYMwPdYVZRDVTYb025k-VeyT4D1LhbSU6SW0-71BIW4zxzrfR7U0L__gVZDtUb-al6_phoxvgSuM_Rx2KQhWMrphDeYm-5JdcvAJ29AITcijWs9RmhYUjebEjRtzpNKjA6KN',
      layoutClass: '',
    },
    {
      title: 'Library Shelving',
      chip: 'WALNUT',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCYVFpkcEMg1OrMrb8saIjCPe9uxoCiWSK6vSHWXlrfJ4NTGsR3uqB0LdQ-KuC7q8ddBY_G9J6Q67_f1JJc9ViSyZDFmkp5xc1CoIaW_IUXkdelArmkl4miRvTEJIEUYVq7J3nchNy1H7i53VkxY_OwiV9JoCKC2HMI78wAdaAvBocHmKuNI2iHFRHolKrYB7Jk8Y525vY3Oov1PEQFRfYHVmaja4INx-b-WAj9IiApuM6KPgwLmxHl',
      layoutClass: 'alamo__work-card--wide',
    },
  ];

  readonly values: Value[] = [
    {
      icon: 'straighten',
      title: 'Perfectly Proportioned',
      description:
        'Stop settling for "almost fits." We design precisely for your spatial requirements and aesthetic vision.',
    },
    {
      icon: 'forest',
      title: 'Ethically Sourced',
      description:
        'We source only the finest sustainable hardwoods, ensuring your heirloom piece respects the environment.',
    },
    {
      icon: 'auto_awesome',
      title: 'A Unique Narrative',
      description:
        'Your furniture should reflect you, not a showroom. We craft functional art that carries your distinct story.',
    },
  ];

  readonly mapImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCG4Z9r7yxPPA74SJh53l53G5aRueVLwYMIuTkFVQnT6V38_UocQL42RerU9iV2knnjuzSMDobbcBACdADuTwlxqu8eit-NIw7OGUtrx59fg0jTch9uQTRRxKVUkwm2AFKzRL_WQm2OMS74ao6YLeq3ZSWAtcIitYUFQXOzNM3LGIu-nZYS_QCcLEQZx-3mCE_P3GVQB-ocnJoAnMRi7Q8JPvMFnshV9Bgoei_byoYVkLa9erGJ-dya';

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
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.18,
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
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
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
}
