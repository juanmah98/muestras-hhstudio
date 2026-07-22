import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { AproClinicaComponent } from './apro-clinica.component';

describe('AproClinicaComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AproClinicaComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(AproClinicaComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the brand name in navigation', () => {
    const fixture = TestBed.createComponent(AproClinicaComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.apro__nav-brand')?.textContent).toContain(
      'Apro',
    );
  });

  it('should render all major sections', () => {
    const fixture = TestBed.createComponent(AproClinicaComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.apro__hero')).toBeTruthy();
    expect(compiled.querySelector('.apro__services')).toBeTruthy();
    expect(compiled.querySelector('.apro__gallery')).toBeTruthy();
    expect(compiled.querySelector('.apro__reviews')).toBeTruthy();
    expect(compiled.querySelector('.apro__contact')).toBeTruthy();
    expect(compiled.querySelector('.apro__footer')).toBeTruthy();
  });

  it('should render the services accordion with visible categories', () => {
    const fixture = TestBed.createComponent(AproClinicaComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const headers = compiled.querySelectorAll(
      '.apro__services-category-header',
    );
    // Should show first 5 categories (visibleCount)
    expect(headers.length).toBe(5);
  });

  it('should render three review cards', () => {
    const fixture = TestBed.createComponent(AproClinicaComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const reviews = compiled.querySelectorAll('.apro__review-card');
    expect(reviews.length).toBe(3);
  });

  it('should render the FAB button', () => {
    const fixture = TestBed.createComponent(AproClinicaComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.apro__fab-btn')).toBeTruthy();
  });

  it('should toggle mobile menu state', () => {
    const fixture = TestBed.createComponent(AproClinicaComponent);
    const component = fixture.componentInstance;

    expect(component.mobileMenuOpen).toBe(false);
    component.toggleMobileMenu();
    expect(component.mobileMenuOpen).toBe(true);
    component.toggleMobileMenu();
    expect(component.mobileMenuOpen).toBe(false);
  });

  it('should close mobile menu on closeMobileMenu call', () => {
    const fixture = TestBed.createComponent(AproClinicaComponent);
    const component = fixture.componentInstance;

    component.mobileMenuOpen = true;
    component.closeMobileMenu();
    expect(component.mobileMenuOpen).toBe(false);
  });

  it('should call scrollIntoView on the correct element and close mobile menu', () => {
    const fixture = TestBed.createComponent(AproClinicaComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.mobileMenuOpen = true;

    // Create a mock element and spy on scrollIntoView
    const mockElement = document.createElement('div');
    mockElement.id = 'servicios';
    vi.spyOn(mockElement, 'scrollIntoView');
    vi.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    component.scrollTo('servicios');

    expect(document.getElementById).toHaveBeenCalledWith('servicios');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
    expect(component.mobileMenuOpen).toBe(false);
  });

  it('should not throw when scrollTo target does not exist', () => {
    const fixture = TestBed.createComponent(AproClinicaComponent);
    const component = fixture.componentInstance;
    vi.spyOn(document, 'getElementById').mockReturnValue(null);

    expect(() => component.scrollTo('nonexistent')).not.toThrow();
    expect(component.mobileMenuOpen).toBe(false);
  });

  it('should toggle category expansion on toggleCategory call', () => {
    const fixture = TestBed.createComponent(AproClinicaComponent);
    const component = fixture.componentInstance;

    expect(component.expandedIndex).toBeNull();

    component.toggleCategory(2);
    expect(component.expandedIndex).toBe(2);

    // Toggle same category closes it
    component.toggleCategory(2);
    expect(component.expandedIndex).toBeNull();

    // Different category opens it
    component.toggleCategory(0);
    expect(component.expandedIndex).toBe(0);
  });

  it('should show all categories when showAllCategories is called', () => {
    const fixture = TestBed.createComponent(AproClinicaComponent);
    const component = fixture.componentInstance;

    expect(component.showAll).toBe(false);
    expect(component.visibleCategories.length).toBe(component.visibleCount);
    expect(component.hasMore).toBe(true);

    component.showAllCategories();

    expect(component.showAll).toBe(true);
    expect(component.visibleCategories.length).toBe(
      component.categories.length,
    );
    expect(component.hasMore).toBe(false);
  });

  it('should render all categories when showAll is true', () => {
    const fixture = TestBed.createComponent(AproClinicaComponent);
    const component = fixture.componentInstance;

    component.showAll = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const headers = compiled.querySelectorAll(
      '.apro__services-category-header',
    );
    expect(headers.length).toBe(component.categories.length);
  });

  it('should render a "Ver todos los servicios" button when not showing all', () => {
    const fixture = TestBed.createComponent(AproClinicaComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('.apro__services-fade .apro__btn--solid'),
    ).toBeTruthy();
  });

  it('should not render the fade when showAll is true', () => {
    const fixture = TestBed.createComponent(AproClinicaComponent);
    const component = fixture.componentInstance;

    component.showAll = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.apro__services-fade')).toBeFalsy();
  });

  it('should render updated address in contact section', () => {
    const fixture = TestBed.createComponent(AproClinicaComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const addressEl = compiled.querySelector('.apro__contact-value');
    expect(addressEl?.textContent).toContain('Av. Riu Ebre, 19');
    expect(addressEl?.textContent).toContain('12540 Vila-real, Castelló');
  });

  it('should have 7 service categories defined', () => {
    const fixture = TestBed.createComponent(AproClinicaComponent);
    const component = fixture.componentInstance;
    expect(component.categories.length).toBe(7);
  });
});
