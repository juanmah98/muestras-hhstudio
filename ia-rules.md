# ia-rules.md — Reglas de Interacción para Agentes de IA

> **Propósito**: Este archivo define las reglas y convenciones que TODO agente de IA
> (Copilot, Cursor, Codeium, etc.) debe seguir al trabajar en este proyecto.
> Es mandatorio — no son sugerencias.

## 🏗️ Arquitectura

### Componentes Standalone

- **TODOS los componentes deben ser `standalone: true`**. No se permiten NgModules.
- Usar `imports: [...]` para declarar dependencias del componente.
- Bootstrap de la aplicación vía `app.config.ts` con providers, NO con `AppModule`.

```typescript
// ✅ CORRECTO
@Component({
  selector: 'app-mi-componente',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mi-componente.component.html',
})
export class MiComponente {}

// ❌ INCORRECTO — NgModules no están permitidos
@NgModule({
  declarations: [MiComponente],
  imports: [CommonModule],
})
export class MiModulo {}
```

### Estructura de Carpetas

```
src/app/
├── core/           # Servicios globales, interceptores, guards, error handlers
│   ├── services/   # SupabaseService, SeoService, AnalyticsService
│   ├── interceptors/ # HTTP interceptors
│   └── errors/     # Global ErrorHandler
├── forms/          # Showcase: Signal Forms example (Angular 22)
│   └── signal-form.component.ts  # Componente standalone con form() API
├── shared/         # Componentes, pipes, directivas reutilizables
│   ├── components/
│   ├── pipes/
│   └── directives/
├── layouts/        # Layouts de página (header, footer, sidebar)
│   ├── main-layout/
│   └── auth-layout/
└── pages/          # Páginas de la aplicación (una carpeta por ruta)
    ├── home/
    ├── about/
    └── contact/
```

## 📝 Convenciones

### Nombrado

| Contexto | Convención | Ejemplo |
|----------|-----------|---------|
| Componentes | kebab-case en templates, PascalCase en TS | `<app-mi-componente>`, `MiComponente` |
| Servicios | PascalCase + `Service` sufijo | `SupabaseService`, `SeoService` |
| Archivos | kebab-case | `mi-componente.component.ts` |
| Variables/Funciones | camelCase | `miVariable`, `calcularTotal()` |
| Nombres de negocio | **Español** | `ProductoService`, `crearPedido()` |
| Nombres técnicos | **Inglés** | `HttpClient`, `ngOnInit`, `Observable` |

### Path Aliases

Usar los aliases definidos en `tsconfig.json`:

```typescript
import { SupabaseService } from '@core/services/supabase/supabase.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { MainLayoutComponent } from '@layouts/main-layout/main-layout.component';
import { environment } from '@environments/environment';
```

### Estilos (SCSS)

- **Metodología BEM** para clases CSS: `bloque__elemento--modificador`
- Variables SCSS en `src/styles.scss` para colores, tipografías, breakpoints
- No usar estilos inline (usar clases SCSS)
- Cada componente tiene su propio archivo `.component.scss`

```scss
// ✅ CORRECTO — BEM
.card {
  &__header { /* ... */ }
  &__body { /* ... */ }
  &--destacado { /* ... */ }
}

// ❌ INCORRECTO
.miClase { /* camelCase */ }
#mi-id { /* IDs para estilos */ }
```

## 🧪 Testing

- **Todo servicio y componente debe tener su `.spec.ts`**
- Usar `TestBed.configureTestingModule` con standalone components
- Los servicios se inyectan con `TestBed.inject()`
- Test runner: **Vitest** (`npx ng test`) — usa las APIs estándar (`describe`, `it`, `expect`, `beforeEach`)
- No importar Jasmine ni Karma — el proyecto usa Vitest como runner nativo de Angular 22
- Cobertura mínima: enunciar en el PR. Sin umbral forzado aún.

```typescript
// ✅ CORRECTO — Standalone testing con Vitest
await TestBed.configureTestingModule({
  imports: [MiComponente],
}).compileComponents();

// ❌ INCORRECTO — NgModule-style testing
TestBed.configureTestingModule({
  declarations: [MiComponente],
});
```

## 🚫 Prohibiciones

| Regla | Razón |
|-------|-------|
| `any` sin justificación | Pierde type safety. Si no hay otra forma, documentar por qué. |
| NgModules | El proyecto es standalone-only |
| HTTP directo desde componentes | Usar servicios. Los componentes son para UI. |
| Suscripciones manuales sin `async` pipe | Usar `| async` en templates. Evita memory leaks. |
| `console.log` en producción | Usar un servicio de logging. |
| `!` (non-null assertion) sin validación | Si puede ser null, manejalo. |

## 🗄️ Supabase

- Credenciales en `.env` → NUNCA commitear `.env`
- Cliente inicializado en `SupabaseService` (singleton, `providedIn: 'root'`)
- Usar RLS (Row Level Security) en producción
- Tipos generados con `supabase generate types`

## 🔄 Signal Forms (Angular 22)

- Usar `@angular/forms/signals` para formularios reactivos basados en señales
- La API `form()` crea un `FieldTree` con validación declarativa vía `required()`, `email()`, etc.
- No mezclar con `ReactiveFormsModule` en el mismo componente — son APIs diferentes
- Ver `src/app/forms/signal-form.component.ts` como ejemplo de referencia

```typescript
// ✅ CORRECTO — Signal Forms API
import { form, required, email } from '@angular/forms/signals';

readonly contactForm = form(
  signal({ name: '', email: '', message: '' }),
  (schema) => {
    required(schema.name);
    email(schema.email);
    required(schema.message);
  },
);

// Acceder al valor: contactForm().value()
// Validación: contactForm().invalid()
// Campo individual: contactForm.name().value.set('John')
```

## ⚡ Zoneless Change Detection

- La app usa `provideZonelessChangeDetection()` en `app.config.ts`
- No usar `ChangeDetectionStrategy.Eager` — no es necesario en modo zoneless
- No importar `NgZone` para forzar detección de cambios — usar signals y `effect()`
- Los bindings de templates con signals disparan actualizaciones automáticamente

## 🔍 SEO

- `<title>` y meta tags en `index.html` como defaults
- `SeoService` para actualizar meta tags por página
- Canonical URL configurado por página
- Open Graph y Twitter Cards incluidos

---

> **Nota**: Todo agente de IA DEBE leer este archivo antes de generar código.
> Si una regla no se cumple, el código será rechazado en review.
