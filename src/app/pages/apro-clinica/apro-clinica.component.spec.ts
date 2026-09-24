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

  it('should render the address in the contact section', () => {
    const fixture = TestBed.createComponent(AproClinicaComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const contactValues = Array.from(
      compiled.querySelectorAll('.apro__contact-value'),
    ).map((el) => el.textContent ?? '');

    // The first contact value is the phone number, so assert against the
    // whole set instead of the first match.
    expect(contactValues.some((t) => t.includes('Av. Riu Ebre, 19'))).toBe(
      true,
    );
    expect(
      contactValues.some((t) => t.includes('12540 Vila-real, Castelló')),
    ).toBe(true);
  });

  it('should apply the apro-clinica route metadata to the document', () => {
    TestBed.createComponent(AproClinicaComponent);

    expect(document.title).toBe(
      'Apro Clínica | Centro médico-estético — HH Studio',
    );
    expect(
      document
        .querySelector('meta[property="og:image"]')
        ?.getAttribute('content'),
    ).toBe('https://muestras.hhstudio.es/assets/og/apro-clinica.jpg');
  });
});
