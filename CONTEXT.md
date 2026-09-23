# CONTEXT.md — Referencias de Diseño y Contexto

> Showcase público de HH Studio. Vidriera de proyectos para captación de clientes.
> Cada rubro/sección es una ruta independiente con lazy loading.

## 🎨 Enlaces de Figma

- **Diseño UI**: *Pendiente — definir cuando esté disponible*
- **Prototipo interactivo**: *Pendiente*
- **Design System / Componentes**: *Pendiente*

## 🎯 Paleta de Colores

> **Alcance de esta paleta.** La tabla de abajo es la paleta de marca propia de HH Studio (variables `--hh-*`), usada por el chrome del proyecto: el índice home, el chrome compartido, la página 404 y las tarjetas sociales/OG.
>
> **No es un design system global para los demos.** Cada demo/ruta declara su propia paleta y tipografía, y esa independencia por demo es deliberada y debe preservarse.
>
> **Lo que sí debe ser uniforme entre demos es el piso de calidad, no el estilo visual:**
> - Imágenes renderizadas a resolución nativa o cercana.
> - Sin scroll jank.
> - `prefers-reduced-motion` respetado.
> - Meta tags por ruta.
> - Comportamiento responsive consistente a 375px.
> - Foco de teclado visible.
> - Contraste WCAG AA.
>
> **Dónde viven las specs de identidad por demo.** En la práctica, en los briefs de Open Design (cada proyecto Open Design lleva sus propios `customInstructions` con la paleta, fuentes y postura de ese demo). Hoy solo el demo `salud` tiene brief de Open Design, con tokens terracota `#c17b60`, cream `#faf7f4`, texto `#2D2926`, y Playfair Display + Montserrat.

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

Familias cargadas desde Google Fonts de forma global en `src/index.html` (5 familias):

| Familia | Uso | Pesos |
|---------|-----|-------|
| Montserrat | Body / Headings | 400, 700 |
| Playfair Display | Hero / Acento | 400, 700, 400i, 700i, 800 |
| Space Grotesk | Display alt | 700 |
| Cormorant Garamond | Headlines serif | 300..700 (+ italic) |
| Inter | Body sans | 100..900 |

Uso real por demo (verificado):

| Demo | Tipografías |
|------|-------------|
| `apro-clinica` | Montserrat + Playfair Display |
| `salud` | Montserrat + Playfair Display |
| `estetica` | Playfair Display + Montserrat |
| `pasteleria` | Playfair Display + Montserrat |
| `reformas` | Playfair Display + Montserrat |
| `carpinteria` | Cormorant Garamond (headlines) + Inter (body) |
| `electricista` | Space Grotesk (headlines) + Montserrat (body) |
| `seo-ia` | Montserrat, Space Grotesk + stack monospace de sistema |

> Las fuentes se siguen cargando globalmente en `index.html` (un solo `<link>`), **no** por ruta. Es un pendiente conocido: idealmente cada demo debería descargar solo las familias que usa.
>
> **Open Sans y Manrope fueron removidas** del link global de fuentes porque solo aparecían como fallback de segunda opción (con fallbacks de sistema ya después), así que removerlas no puede cambiar el render.

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

- **Logo**: `public/assets/logo.svg` *(pendiente — no existe todavía)*
- **Favicon**: `public/favicon.ico` ✅ (existe, 1565 bytes)
- **Imágenes**: `public/assets/images/<rubro>/`
- **Iconos**: Bootstrap Icons (incluido) + custom SVG en `public/assets/icons/`
- **SEO Preview**: `public/assets/seo-preview.jpg` ✅ (existe, 1200×630, ~55 KB). Referenciada por `og:image` y `twitter:image` en `src/index.html`. Se genera con `tools/make-og-image.ps1` (PowerShell + GDI+, sin dependencias nuevas), así que se puede regenerar en un solo comando si cambia el branding.

> La tarjeta OG usa fuentes de sistema (Georgia + Segoe UI) en lugar de las webfonts de marca, a propósito, para no enviar archivos de fuente.

## 🧩 Estructura de Secciones (Rubros)

Cada rubro es una ruta lazy-loading independiente. El home (`/`) es el índice simple que las lista.

Rutas reales registradas en `src/app/app.routes.ts` (todas lazy-loading):

| Ruta | Rubro / Pantalla | Estado |
|------|------------------|--------|
| `` (vacío) | Home / Índice | ✅ Registrada |
| `/apro-clinica` | Apro Clínica | ✅ Registrada |
| `/salud` | Salud | ✅ Registrada |
| `/carpinteria` | Carpintería | ✅ Registrada |
| `/reformas` | ST REFORMAS | ✅ Registrada |
| `/electricista` | VOLTIO Electricista | ✅ Registrada |
| `/estetica` | LUMINA Estética | ✅ Registrada |
| `/pasteleria` | Pastelería | ✅ Registrada |
| `/seo-ia` | SEO & IA | ✅ Registrada |
| `**` | Not found | ✅ Registrada |

El índice del home (`src/app/pages/home/home.component.ts`) lista 7 demos en este orden: Apro Clínica, Salud, Carpintería, ST REFORMAS, VOLTIO Electricista, LUMINA Estética, Pastelería.

> **Pregunta abierta**: `seo-ia` tiene ruta y página completa pero **no** está listada en el índice del home — solo se llega por URL directa. ¿Es intencional?

> No existe ruta `/forms`: el showcase de signal forms vive como componente en `src/app/forms/`, pero no está ruteado.

> **Convención**: rutas en español (`/ecommerce`, `/landing`, `/dashboard`), slugs descriptivos.

## 📝 Notas Técnicas

- **Responsive**: Mobile-first. Breakpoints Bootstrap estándar: `sm` (576px), `md` (768px), `lg` (992px), `xl` (1200px), `xxl` (1400px).
- **Animaciones**: GSAP para animaciones de entrada y scroll. Transiciones CSS para micro-interacciones (hover, focus).
- **Accesibilidad**: Contraste mínimo WCAG AA (4.5:1 para texto normal). Todos los elementos interactivos deben ser navegables por teclado.
- **Performance**: Imágenes optimizadas (WebP), lazy loading nativo (`loading="lazy"`), componentes con lazy loading de Angular.
- **SEO**: Tags Open Graph y Twitter Cards por sección. `SeoService` en `core/services/` para actualizar meta tags dinámicamente.
- **SSR**: La app usa SSR híbrido de Angular 22. GSAP se ejecuta del lado del cliente post-hydration. Las rutas estáticas se prerenderizan para SEO.
- **Dominio**: El dominio canónico de producción es `muestras.hhstudio.es` (verificado en los meta tags de `src/index.html`). El footer del home enlaza a `hhstudio.es`.
- **Deploy**: Vercel (free tier) con adaptador SSR automático. Sin funciones serverless adicionales al inicio.
- **README desactualizado**: `README.md` todavía menciona `hhstudio.com.ar`; está out of date.
