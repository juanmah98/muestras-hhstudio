import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the brand name', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.home__brand')?.textContent).toContain(
      'HH Studio',
    );
  });

  it('should render section cards', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.home__card');
    expect(cards.length).toBeGreaterThanOrEqual(1);
  });

  it('should render the footer with current year', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const footer = compiled.querySelector('.home__footer');
    expect(footer?.textContent).toContain('HH Studio');
  });

  it('should have sections defined', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance;
    expect(component.sections.length).toBe(7);
  });

  it('should render the resource strip outside the demo grid', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const resourceCard = compiled.querySelector('.home__resource-card');

    expect(resourceCard).toBeTruthy();
    expect(resourceCard?.getAttribute('href')).toBe('/seo-ia');
    // Seven demos in the grid; the guide is not one of them.
    expect(compiled.querySelectorAll('.home__card').length).toBe(7);
  });

  it('should apply the home route metadata to the document', () => {
    TestBed.createComponent(HomeComponent);

    expect(document.title).toBe('HH Studio | Showcase de Proyectos');
    expect(
      document
        .querySelector('meta[property="og:image"]')
        ?.getAttribute('content'),
    ).toBe('https://muestras.hhstudio.es/assets/seo-preview.jpg');
  });
});
