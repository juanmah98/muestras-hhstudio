# CONTEXT.md — Referencias de Diseño y Contexto

> **Instrucciones**: Completá cada sección con los recursos de diseño del proyecto.
> Este archivo sirve como punto central de referencia para todo el equipo.

## 🎨 Enlaces de Figma

- **Diseño UI**: [Link al archivo de Figma]
- **Prototipo interactivo**: [Link al prototipo]
- **Design System / Componentes**: [Link al design system]

## 🎯 Paleta de Colores

| Nombre | Variable SCSS | Hex | Uso |
|--------|-------------|-----|-----|
| Primary | `$primary` | `#XXXXXX` | Botones principales, links, navbar |
| Secondary | `$secondary` | `#XXXXXX` | Fondos secundarios, badges |
| Accent | `$accent` | `#XXXXXX` | CTAs, elementos destacados |
| Background | `$bg` | `#XXXXXX` | Fondo de página |
| Surface | `$surface` | `#XXXXXX` | Cards, modales |
| Text Primary| `$text-primary` | `#XXXXXX` | Texto principal |
| Text Muted | `$text-muted` | `#XXXXXX` | Texto secundario |
| Success | `$success` | `#XXXXXX` | Estados positivos |
| Error | `$error` | `#XXXXXX` | Estados de error |
| Warning | `$warning` | `#XXXXXX` | Estados de advertencia |

> **Tip**: Definí las variables en `src/styles.scss` y sobreescribí las variables CSS de Bootstrap.

## 🔤 Tipografías

| Uso | Familia | Pesos | Google Fonts Link |
|-----|---------|-------|-------------------|
| Headings | | 400, 700 | |
| Body | | 400, 600 | |
| Code | Fira Code / JetBrains Mono | 400 | |

### Escala Tipográfica

| Elemento | Tamaño (Mobile) | Tamaño (Desktop) | Weight |
|----------|----------------|-----------------|--------|
| h1 | | | |
| h2 | | | |
| h3 | | | |
| h4 | | | |
| Body | | | |
| Small / Caption | | | |

## 🖼️ Assets y Recursos

- **Logo**: `public/assets/logo.svg`
- **Favicon**: `public/favicon.ico`
- **Imágenes**: `public/assets/images/`
- **Iconos**: Bootstrap Icons (incluido) + custom SVG en `public/assets/icons/`
- **SEO Preview**: `public/assets/seo-preview.jpg` (1200×630px)

## 📝 Notas Técnicas

- **Responsive**: Mobile-first. Breakpoints: `sm` (576px), `md` (768px), `lg` (992px), `xl` (1200px), `xxl` (1400px).
- **Animaciones**: Usar GSAP para animaciones complejas. Preferir transiciones CSS para micro-interacciones.
- **Accesibilidad**: Contraste mínimo WCAG AA (4.5:1 para texto normal). Todos los elementos interactivos deben ser navegables por teclado.
- **Performance**: Imágenes optimizadas (WebP), lazy loading para imágenes fuera del viewport.

---

> **Nota**: Este documento es un template. Borrá estas instrucciones y completá con
> la información real de tu proyecto.
