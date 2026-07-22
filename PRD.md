# PRD — HHStudio Showcase

> Vidriera pública de proyectos de HH Studio. Sitio desplegado en Vercel para demostrar capacidades técnicas y captar clientes.

## 1. Propósito del Proyecto

- **¿Qué problema resuelve?** HH Studio necesita una vidriera online donde potenciales clientes puedan ver ejemplos concretos de trabajo por rubro. No es un portfolio tradicional — es una colección de demos funcionales que prueban lo que el estudio puede construir.
- **¿Para quién es?** Empresas y emprendedores que buscan un equipo de desarrollo para proyectos web. El perfil es un decisor técnico o de negocio que quiere ver trabajo real antes de contratar.
- **¿Por qué ahora?** El estudio necesita presencia online con casos reales. Tener un sitio propio corriendo en producción es la mejor carta de presentación.

## 2. Características Clave (Features)

| Prioridad | Funcionalidad | Descripción | Criterio de Aceptación |
|-----------|--------------|-------------|------------------------|
| P0 (MVP)  | Home / Índice | Listado simple de rubros disponibles con links a cada sección | El usuario ve las categorías y puede navegar a cualquier demo |
| P0 (MVP)  | Signal Forms Demo | Showcase existente: formularios reactivos con la API `form()` de Angular 22 | El demo funciona, se ve bien en mobile y desktop |
| P0 (MVP)  | Routing por rubro | Cada rubro tiene su propia ruta lazy-loading con slug en español | `/ecommerce`, `/landing`, etc. cargan sin bloquear la app |
| P0 (MVP)  | Diseño responsivo | Mobile-first con Bootstrap 5.3. Navegable en cualquier dispositivo | La home y cada demo funcionan en mobile (375px+) y desktop |
| P1        | Layout compartido | Header/footer minimalista con branding de HH Studio y links a redes | Consistencia visual en todas las secciones |
| P1        | Animaciones GSAP | Entradas sutiles con scroll-trigger. Transiciones entre secciones | Animaciones < 300ms, sin jank, respetan `prefers-reduced-motion` |
| P1        | SEO por sección | `SeoService` actualiza title, description, OG, y Twitter Cards por ruta | Cada ruta tiene meta tags únicos y funcionales |
| P2        | Formulario de contacto | Form simple para que clientes potenciales puedan escribir | Se envía a Supabase y notifica al equipo |
| P2        | Analytics | Seguimiento básico de visitas (sin trackers invasivos) |Saber qué rubros generan más interés |

## 3. Necesidades del Usuario

### Historias de Usuario

- **Como** potencial cliente, **quiero** ver ejemplos reales de trabajos anteriores, **para** evaluar si HH Studio puede construir lo que necesito.
- **Como** potencial cliente, **quiero** navegar el sitio desde mi celular, **para** revisar proyectos en cualquier momento.
- **Como** potencial cliente, **quiero** encontrar fácilmente el rubro que me interesa (ecommerce, landing, dashboard), **para** no perder tiempo buscando.
- **Como** miembro de HH Studio, **quiero** agregar un nuevo demo/rubro sin tocar la estructura existente, **para** mantener el sitio vivo con mínimo esfuerzo.

### Flujos Principales

1. **Exploración**: Usuario llega al home → ve listado de rubros → hace clic en uno → ve el demo → vuelve al índice o explora otro.
2. **Contacto** (futuro): Usuario ve un demo que le gusta → hace clic en "Contactar" → llena formulario → recibe confirmación.

## 4. Criterios de Éxito

- **Métricas cuantitativas**:
  - Tiempo de carga < 2s en 3G (Lighthouse)
  - Lighthouse score > 90 en Performance, Accessibility, SEO
  - Cero errores en consola
- **Métricas cualitativas**: El sitio se siente rápido, profesional, y "pesado" en el buen sentido (no genérico).
- **Hitos temporales**:
  - MVP (home + forms demo) → ya en desarrollo
  - Primer rubro adicional → luego del MVP

## 5. Restricciones y Suposiciones

- **Técnicas**: Vercel free tier (limita funciones serverless y ancho de banda). SSR híbrido de Angular 22. Sin base de datos obligatoria al inicio.
- **De negocio**: Sin presupuesto de diseño (Figma pendiente). El diseño se define en código directamente.
- **Suposiciones**: El tráfico inicial será bajo (< 1000 visitas/mes). No se necesita i18n todavía (solo español).

## 6. Fuera de Alcance (Out of Scope)

- Panel de administración para gestonar demos (se agregan manualmente por ahora)
- Blog o sección de artículos
- Autenticación de usuarios
- Pasarela de pagos
- Multi-idioma (i18n)
- PWA offline-first
