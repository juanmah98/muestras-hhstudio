# CONTEXT.md — Referencias de Diseño y Contexto

> Showcase público de HH Studio. Vidriera de proyectos para captación de clientes.
> Cada rubro/sección es una ruta independiente con lazy loading.

## 🎨 Enlaces de Figma

- **Diseño UI**: *Pendiente — definir cuando esté disponible*
- **Prototipo interactivo**: *Pendiente*
- **Design System / Componentes**: *Pendiente*

## 🎯 Paleta de Colores

> Tema oscuro base. La paleta se refina por sección si el rubro lo requiere.

| Nombre | Variable CSS/SCSS | Hex | Uso |
|--------|------------------|-----|-----|
| Background | `--hh-bg` / `$bg-dark-section` | `#121418` | Fondo principal del sitio |
| Primary | `--hh-primary` / `$brand-primary` | `#4e6a7f` | Links, acentos fríos, botones outline |
| Secondary | `--hh-secondary` | `#e8dcc4` | Texto crema, acentos cálidos |
| Accent | `--hh-accent` / `$brand-accent` | `#e5cc98` | Acento dorado, CTAs, highlights |
| Surface | `--hh-surface` | `#1a1d23` | Cards, contenedores elevados |
| Text Primary | `--hh-text-primary` | `#f1f5f9` | Texto principal sobre fondo oscuro |
| Text Secondary | `--hh-text-secondary` | `#a0aab2` | Texto secundario, descripciones |
| Text Muted | `--hh-text-muted` | `#64748b` | Metadatos, fechas, texto terciario |
| Border | `--hh-border` | `#2d323c` | Bordes sutiles, separadores |
| Success | `--hh-success` | `#22c55e` | Estados positivos |
| Error | `--hh-error` | `#ef4444` | Estados de error |
| Warning | `--hh-warning` | `#f59e0b` | Estados de advertencia |

### Aplicación en Bootstrap

Sobreescribir las variables CSS de Bootstrap en `src/styles.scss`:

```scss
$body-bg: #121418;
$body-color: #f1f5f9;
$link-color: #4e6a7f;
$link-hover-color: #5f7e94;
$card-bg: #1a1d23;
$border-color: #2d323c;
```

## 🔤 Tipografías

| Uso | Familia | Pesos | Google Fonts Link |
|-----|---------|-------|-------------------|
| Body / Headings | Montserrat | 400, 700 | Ya cargada en `index.html` |
| Body fallback | Open Sans | 400, 700 | Ya cargada en `index.html` |
| Hero / Acento | Playfair Display | 400, 700, 400i, 700i, 800 | Ya cargada en `index.html` |
| UI / Hero | Manrope | 300, 400, 500, 700 | Ya cargada en `index.html` |
| Display alt | Space Grotesk | 700 | Ya cargada en `index.html` |

### Escala Tipográfica

| Elemento | Tamaño (Mobile) | Tamaño (Desktop) | Weight |
|----------|----------------|-----------------|--------|
| h1 | `clamp(1.75rem, 4vw, 2.5rem)` | `2.5rem` | 700 |
| h2 | `clamp(1.5rem, 3vw, 2rem)` | `2rem` | 700 |
| h3 | `clamp(1.25rem, 2.5vw, 1.5rem)` | `1.5rem` | 700 |
| h4 | `1.125rem` | `1.25rem` | 700 |
| Body | `1rem` | `1rem` | 400 |
| Small / Caption | `0.875rem` | `0.875rem` | 400 |

## 🖼️ Assets y Recursos

- **Logo**: `public/assets/logo.svg` *(pendiente — crear/agregar)*
- **Favicon**: `public/favicon.ico` *(pendiente)*
- **Imágenes**: `public/assets/images/`
- **Iconos**: Bootstrap Icons (incluido) + custom SVG en `public/assets/icons/`
- **SEO Preview**: `public/assets/seo-preview.jpg` (1200×630px) *(pendiente)*

## 🧩 Estructura de Secciones (Rubros)

Cada rubro es una ruta lazy-loading independiente. El home (`/`) es el índice simple que las lista.

| Ruta | Rubro | Descripción | Estado |
|------|-------|-------------|--------|
| `/` | Home / Índice | Listado simple de rubros disponibles | 🔲 Pendiente |
| `/forms` | Signal Forms | Demo de la API `form()` de Angular 22 | ✅ Existe (showcase) |
| `/rubro-a` | — | Próximo rubro | 🔲 Por definir |
| `/*` | 404 | Página no encontrada | 🔲 Pendiente |

> **Convención**: rutas en español (`/ecommerce`, `/landing`, `/dashboard`), slugs descriptivos.

## 📝 Notas Técnicas

- **Responsive**: Mobile-first. Breakpoints Bootstrap estándar: `sm` (576px), `md` (768px), `lg` (992px), `xl` (1200px), `xxl` (1400px).
- **Animaciones**: GSAP para animaciones de entrada y scroll. Transiciones CSS para micro-interacciones (hover, focus).
- **Accesibilidad**: Contraste mínimo WCAG AA (4.5:1 para texto normal). Todos los elementos interactivos deben ser navegables por teclado.
- **Performance**: Imágenes optimizadas (WebP), lazy loading nativo (`loading="lazy"`), componentes con lazy loading de Angular.
- **SEO**: Tags Open Graph y Twitter Cards por sección. `SeoService` en `core/services/` para actualizar meta tags dinámicamente.
- **SSR**: La app usa SSR híbrido de Angular 22. GSAP se ejecuta del lado del cliente post-hydration. Las rutas estáticas se prerenderizan para SEO.
- **Deploy**: Vercel (free tier) con adaptador SSR automático. Sin funciones serverless adicionales al inicio.
