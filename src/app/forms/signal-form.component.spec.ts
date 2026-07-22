import { TestBed } from '@angular/core/testing';
import { SignalFormComponent } from './signal-form.component';

describe('SignalFormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalFormComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(SignalFormComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have a contact form with name, email, and message fields', () => {
    const fixture = TestBed.createComponent(SignalFormComponent);
    const component = fixture.componentInstance;
    const form = component.contactForm;

    expect(form).toBeTruthy();
    // FieldTree is callable: form() returns the root FieldState
    const rootState = form();
    const value = rootState.value();
    expect(value).toBeDefined();
    expect(value.name).toBe('');
    expect(value.email).toBe('');
    expect(value.message).toBe('');
  });

  it('should mark form as invalid when fields are empty', () => {
    const fixture = TestBed.createComponent(SignalFormComponent);
    const component = fixture.componentInstance;
    const form = component.contactForm;
    fixture.detectChanges();

    // With required validators on name and message, and email validator on email,
    // an empty form should be invalid
    const invalid = form().invalid();
    expect(invalid).toBe(true);
  });

  it('should mark form as valid when all fields are correctly filled', () => {
    const fixture = TestBed.createComponent(SignalFormComponent);
    const component = fixture.componentInstance;
    const form = component.contactForm;
    fixture.detectChanges();

    // Fill in valid values via individual field signals
    form.name().value.set('John Doe');
    form.email().value.set('john@example.com');
    form.message().value.set('Hello, this is a test message.');
    fixture.detectChanges();

    const invalid = form().invalid();
    expect(invalid).toBe(false);
  });

  it('should show email validation error for invalid email', () => {
    const fixture = TestBed.createComponent(SignalFormComponent);
    const component = fixture.componentInstance;
    const form = component.contactForm;
    fixture.detectChanges();

    // Name and message filled, but email is invalid
    form.name().value.set('John Doe');
    form.email().value.set('not-an-email');
    form.message().value.set('Hello, this is a test message.');
    fixture.detectChanges();

    const invalid = form().invalid();
    expect(invalid).toBe(true);
  });
});
