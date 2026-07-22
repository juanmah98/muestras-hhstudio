# ESTRUCTURA.md — Arquitectura del Proyecto

Documentación técnica de la arquitectura, estructura de carpetas y decisiones de diseño.

## 📁 Estructura de Carpetas

```
hh-base-angular22/
├── .env.example              # Template de variables de entorno (no contiene secretos)
├── .editorconfig             # Configuración de editor (charset, indentación)
├── .prettierrc               # Reglas de formato Prettier
├── .prettierignore           # Archivos ignorados por Prettier
├── eslint.config.js          # Configuración ESLint (flat config)
├── angular.json              # Configuración del CLI de Angular
├── tsconfig.json             # TypeScript base + path aliases
├── tsconfig.app.json         # TypeScript para la app
├── tsconfig.spec.json        # TypeScript para tests
├── package.json              # Dependencias y scripts
│
├── public/                   # Assets estáticos servidos tal cual
│   ├── favicon.ico
│   └── assets/
│       ├── images/
│       ├── icons/
│       └── seo-preview.jpg
│
├── src/
│   ├── index.html            # HTML raíz con SEO meta tags
│   ├── main.ts               # Punto de entrada (bootstrapApplication)
│   ├── styles.scss           # Estilos globales + overrides Bootstrap
│   ├── env.d.ts              # Declaración de tipos para process.env
│   │
│   ├── environments/         # Variables de entorno por build
│   │   ├── environment.ts              # Producción
│   │   └── environment.development.ts  # Desarrollo
│   │
│   └── app/
│       ├── app.component.ts        # Componente raíz
│       ├── app.component.html      # Template raíz
│       ├── app.component.scss      # Estilos raíz
│       ├── app.component.spec.ts   # Tests del componente raíz
│       ├── app.config.ts           # Configuración de la aplicación (providers zoneless)
│       ├── app.routes.ts           # Definición de rutas
│       │
│       ├── core/                   # Capa de infraestructura global
│       │   ├── services/           # Servicios singleton
│       │   │   ├── supabase/       # Cliente Supabase
│       │   │   └── seo.service.ts  # Servicio de SEO
│       │   ├── interceptors/       # HTTP interceptors
│       │   └── errors/             # Global error handler
│       │
│       ├── forms/                  # Showcase: Signal Forms (Angular 22)
│       │   ├── signal-form.component.ts   # Componente standalone con form() API
│       │   ├── signal-form.component.html # Template con bindings de señales
│       │   └── index.ts                   # Barrel export
│       │
│       ├── shared/                 # Componentes reutilizables
│       │   ├── components/         # Botones, cards, modales, etc.
│       │   ├── pipes/              # Pipes personalizados
│       │   └── directives/         # Directivas personalizadas
│       │
│       ├── layouts/                # Estructuras de página
│       │   ├── main-layout/        # Layout principal (header + footer)
│       │   └── auth-layout/        # Layout para auth (sin header/footer)
│       │
│       └── pages/                  # Páginas de la aplicación
│           ├── home/               # Página principal
│           └── not-found/          # Página 404
```

## 🏛️ Decisiones de Arquitectura

### ¿Por qué SSR híbrido con incremental hydration?

- Angular 22 habilita **SSR híbrido** por defecto con el builder `@angular-devkit/build-angular:application`.
- **Incremental hydration** delega eventos del DOM y mejora el tiempo de interacción (TTI) sin bloquear la hidratación completa.
- El SEO se maneja con meta tags en `index.html` y `SeoService`; el SSR prerenderiza rutas estáticas.
- GSAP y Bootstrap se ejecutan del lado del cliente después de la hidratación — sin conflictos con SSR.
- Mejor DX: `ng serve` sin configuraciones adicionales, SSR incluido en build de producción.

### ¿Por qué Standalone Components y Zoneless?

Angular 22 usa standalone components como default y change detection zoneless. Beneficios:
- Sin NgModules → menos boilerplate
- Árbol de dependencias explícito en cada componente (imports)
- Lazy loading más granular con `loadComponent`
- Zoneless CD → sin zone.js, mejor performance y debugging
- Signal-based reactivity → actualizaciones granulares sin detección global de cambios

### ¿Por qué path aliases?

```typescript
// Antes (relativo)
import { environment } from '../../../../environments/environment';

// Ahora (alias)
import { environment } from '@environments/environment';
```

- Refactorizaciones más seguras (no se rompen imports al mover archivos)
- Mejor legibilidad
- El IDE resuelve los aliases correctamente

### ¿Por qué ESLint + Prettier (en vez de solo uno)?

- **ESLint**: Calidad de código (bugs potenciales, mejores prácticas, reglas de Angular)
- **Prettier**: Formato consistente (espaciado, comillas, punto y coma, etc.)
- `eslint-config-prettier` desactiva reglas de ESLint que conflictúan con Prettier

### ¿Por qué @ngx-env/builder para variables de entorno?

- `.env` nunca se commitea → secretos seguros
- `.env.example` documenta qué variables necesita el proyecto
- Las variables se inyectan en tiempo de build sin configuración adicional

## 📐 Convenciones de Código

### Componentes

```typescript
// Estructura estándar de un componente standalone
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mi-componente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mi-componente.component.html',
  styleUrl: './mi-componente.component.scss',
})
export class MiComponente implements OnInit {
  @Input() titulo: string = '';

  ngOnInit(): void {
    // Inicialización
  }
}
```

### Servicios

```typescript
// Servicio singleton (providedIn: 'root')
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MiServicio {
  // Lógica de negocio aquí
}
```

### Lazy Loading

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'productos',
    loadComponent: () =>
      import('@pages/productos/productos.component').then(
        (m) => m.ProductosComponent
      ),
  },
];
```

## 🚀 Cómo Extender la Plantilla

### Agregar una nueva página

1. Crear la carpeta: `src/app/pages/mi-pagina/`
2. Crear el componente: `mi-pagina.component.ts`
3. Agregar la ruta en `app.routes.ts` (usar `loadComponent` para lazy loading)
4. Si necesita un layout diferente, crear el layout en `src/app/layouts/`

### Agregar un servicio global

1. Crear el archivo: `src/app/core/services/mi-servicio.service.ts`
2. Usar `@Injectable({ providedIn: 'root' })`
3. Crear su test: `mi-servicio.service.spec.ts`

### Agregar un componente compartido

1. Crear la carpeta: `src/app/shared/components/mi-componente/`
2. Implementar el componente standalone
3. Re-exportar desde un `index.ts` en `shared/components/`

## 📊 Stack Tecnológico — Racional

| Tecnología | ¿Por qué esta y no otra? |
|-----------|--------------------------|
| Angular 22 | Última versión estable, zoneless CD, signal forms, SSR híbrido |
| TypeScript 6.0 | Type safety avanzado, mejor inferencia, soporte para Node 22 |
| Bootstrap 5.3 | Sistema de grillas maduro, sin dependencia de jQuery, personalizable vía SCSS |
| GSAP 3.14 | Mejor performance que CSS animations para animaciones complejas |
| Supabase | Alternativa open-source a Firebase, Postgres real, RLS integrado |
| ESLint 8 + Prettier 3 | Flat config moderno, sin conflictos entre linter y formateador |
| Vitest 4.x | Test runner nativo de Angular 22, zoneless-ready, compatible con Vite |
