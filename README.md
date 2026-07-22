# HH Studio — Plantilla Base Angular 22

Plantilla base para proyectos **Angular 22 SPA** de alto rendimiento mantenida por [HH Studio](https://hhstudio.com.ar).

## Stack Tecnológico

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| [Angular](https://angular.dev) | 22.0+ | Framework SPA, standalone components, zoneless CD |
| [TypeScript](https://www.typescriptlang.org) | 6.0+ | Type-safe JavaScript superset |
| [Bootstrap](https://getbootstrap.com) | 5.3+ | Sistema de grillas y componentes UI |
| [Bootstrap Icons](https://icons.getbootstrap.com) | 1.13+ | Iconografía vectorial |
| [GSAP](https://gsap.com) | 3.14+ | Animaciones de alto rendimiento |
| [Supabase](https://supabase.com) | 2.x | Backend-as-a-Service (auth, DB, storage) |
| ESLint | 8.x | Linting TypeScript + plantillas Angular |
| Prettier | 3.x | Formateo automático de código |
| Vitest | 4.x | Unit testing (zoneless-ready) |

## Guía de Uso Rápido (5 Pasos)

### Paso 1 — Crear el repo desde esta plantilla

En GitHub, hacé clic en **"Use this template"** → **"Create a new repository"**.
Elegí un nombre para tu proyecto (ej: `mi-app-angular`) y crealo.

### Paso 2 — Clonar localmente

```bash
git clone https://github.com/tu-usuario/mi-app-angular.git
cd mi-app-angular
```

### Paso 3 — Instalar dependencias

```bash
npm install
```

### Paso 4 — Personalizar el proyecto

Antes de empezar a codear, actualizá estos archivos con los datos de tu proyecto:

1. **`package.json`** — cambiá `name`, `description`, `author`
2. **`src/index.html`** — actualizá `<title>`, meta tags (SEO, Open Graph), canonical URL
3. **`.env`** — configurá las credenciales de Supabase y Google Analytics
4. **`CONTEXT.md`** — completá los links de Figma, paleta de colores y tipografías
5. **`PRD.md`** — documentá el propósito, features y criterios de éxito del proyecto

### Paso 5 — Iniciar el servidor de desarrollo

```bash
ng serve
```

Abrí `http://localhost:4200/` en tu navegador. La app usa **SSR híbrido** con incremental hydration por defecto y **change detection zoneless**.

## Comandos Disponibles

```bash
# Desarrollo
npm start              # ng serve
npm run watch          # ng build --watch

# Calidad de código
npm run lint           # ESLint
npm run format         # Prettier (formatea todo)
npm run format:check   # Verificar formato sin escribir

# Testing
npm test               # Unit tests (Vitest)

# Build
npm run build          # Producción (AOT, SSR híbrido, minificado, hashed)
```

## Arquitectura del Proyecto

```
src/
├── app/
│   ├── core/           # Servicios globales, interceptores, guards
│   │   └── services/   # Supabase, SEO, Analytics
│   ├── forms/          # Showcase: Signal Forms example (Angular 22)
│   ├── shared/         # Componentes, pipes y directivas reutilizables
│   ├── layouts/        # Layouts de página (header, footer, sidebar)
│   └── pages/          # Páginas de la aplicación
├── environments/       # Variables de entorno por ambiente
├── styles.scss         # Estilos globales
└── index.html          # HTML raíz con SEO tags
```

Para más detalles sobre la arquitectura y convenciones, consultá **[ESTRUCTURA.md](ESTRUCTURA.md)**.

## Recursos

- [Documentación oficial de Angular](https://angular.dev)
- [Angular CLI](https://angular.dev/tools/cli)
- [Signal Forms API](https://angular.dev/guide/forms/signals)
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3)
- [Supabase Docs](https://supabase.com/docs)
- [GSAP Docs](https://gsap.com/docs/)
