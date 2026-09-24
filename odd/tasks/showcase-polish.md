# odd/tasks/showcase-polish.md — Pulido de la vidriera HHStudio

> **Objetivo**: que los 8 demos del showcase se vean mejor y más profesionales al
> mostrárselos a clientes potenciales.
>
> **NO es objetivo**: optimización de producción. Esto es una vidriera, no un sitio
> en producción real. Lo que no se *ve*, no es prioridad.

## Restricciones (no negociables)

- **Cada demo es una identidad visual distinta y eso es el producto.** Paleta,
  tipografías, layout y tono se mantienen independientes por demo. No unificar estilos.
- **El piso de calidad sí debe ser uniforme**: lo que se percibe como amateur
  (imágenes borrosas, jank, flicker de fuentes) no puede variar de demo en demo.
- Escala de prioridad: **lo visible > lo técnico invisible**.

## Hallazgos verificados (read-only, medidos)

Verificados con evidencia, no inferidos. Los archivos y líneas están en el historial.

1. **Imágenes de viewport renderizadas 3–5.6× más grandes que su resolución nativa.**
   El defecto visual más grave y más extendido. Se ve blando/compresionado al instante:

   | Demo | Imagen | Mide | Upscale a 1920px |
   |---|---|---|---|
   | `estetica` | `hero-bg.jpg` | 343×512 | **5.6×** |
   | `estetica` | `treatment-room.jpg` | 343×512 | **5.6×** |
   | `pasteleria` | `chef-hands.jpg` | 343×512 | **5.6×** |
   | `reformas` | `hero-bg.jpg` | 512×286 | **3.75×** |
   | `salud` | `clinic-interior.jpg` | 512×286 | **3.75×** |
   | `salud` | `spa-treatment.jpg` | 512×286 | **3.75×** |
   | `apro-clinica` | `hero.webp` | 1440×960 | 1.3× ✅ **referencia de cómo hacerlo** |

2. **`background-attachment: fixed` en `estetica` y `reformas`.** Causa jank al
   scrollear. iOS Safari lo ignora, así que no aporta nada en móvil. Ambas páginas
   ya tienen un fallback a `scroll` en `@media (max-width: 768px)`.

3. **[RESUELTO 2026-09-24]** *2.55 MB de imágenes huérfanas sin ninguna referencia* en
   `src/` ni `public/` (10 archivos). La peor: `apro-clinica/aalo-lens-...-unsplash.jpg`,
   2.17 MB y 5000×2812. No afectaba la carga porque nunca se servía; era peso de repo.
   Verificado antes de borrar: 0 ocurrencias de los 10 basenames en el repo entero
   (excluyendo `node_modules`, `dist`, `.git`, `.angular`) y ningún patrón de path
   dinámico. Total confirmado al byte: 2,673,302 bytes. Borradas con `git rm` →
   `public/assets/images/` pasó de 34 archivos / ~3.85 MB a 24 archivos / 1.3 MB.

4. **CSS global de 316 kB** (`styles-*.css`) — el asset más grande del proyecto,
   más que todo el JS inicial. Ahí viven Bootstrap + 8 familias tipográficas.

5. **8 familias tipográficas cargadas en todas las rutas**: Cormorant Garamond, Inter,
   Manrope, **Material Symbols Outlined** (icon-font de Material en un proyecto con
   Bootstrap Icons — dependencia colada), Montserrat, Open Sans, Playfair Display,
   Space Grotesk. `CONTEXT.md` declara 5. Rompe la independencia por demo: un demo que
   solo usa 2 familias descarga las 8.

6. **`SeoService` en 0 de 10 páginas.** El P1 del PRD no está implementado. Impacto
   real: al compartir el link de cualquier demo, la preview es idéntica. Relevante
   porque los demos se comparten con clientes.

7. **`reduced-motion` inconsistente**: `salud` tiene 11 llamadas a GSAP y 2 guardas;
   `not-found` tiene 0. El resto, 1 guarda.

8. **Build de producción: PASA**, exit 0, 8s. Un warning no bloqueante:
   `pasteleria.component.scss` 32.54 kB vs 31 kB de warning (5.46 kB bajo el error de
   38 kB). `initial` 685 kB / 134 kB transfer. **No hay riesgo de deploy.**

9. `seo-ia` tiene ruta y página propia pero **no figura en el índice del home**
   (el home lista 7 demos). Verificar si es intencional.

10. El home enlaza a **`hhstudio.es`**; el README dice `hhstudio.com.ar`.
    **Verificar cuál es el dominio correcto.**

11. **[2026-09-24] No hay SSR ni prerender, pese a que `CONTEXT.md` lo afirma.**
    `CONTEXT.md` declara: *"SSR: La app usa SSR híbrido de Angular 22... Las rutas
    estáticas se prerenderizan para SEO."* Es **falso**. Evidencia verificada:

    | Evidencia | Resultado |
    |---|---|
    | `dist/.../prerendered-routes.json` | `{"routes": {}}` → **0 rutas** |
    | `dist/.../browser/` | solo `index.html`, ningún HTML por ruta |
    | `main.server.ts` / `server.ts` | **no existen** |
    | builder `build` en `angular.json` | `browser: src/main.ts`, sin `server`, sin `prerender`, sin `outputMode` |
    | `vercel.json` | `outputDirectory: dist/.../browser` + rewrite catch-all a `/index.html` |
    | `package.json` → `serve:ssr` | apunta a `dist/.../server/server.mjs` → **ese archivo no existe** (config muerta) |
    | `@angular/ssr`, `@angular/platform-server`, `express` | instalados, **sin usar** |

    **Consecuencia que rompe T7.** T7 nació de *"al compartir el link de cualquier
    demo, la preview es idéntica"*. Pero los scrapers de WhatsApp / Facebook /
    Twitter / LinkedIn / Slack **no ejecutan JavaScript**: leen el `index.html`
    estático. `SeoService` setea los meta tags en runtime, así que el scraper nunca
    los ve. Conectar `SeoService` en las 10 rutas **no arregla el problema que T7
    vino a arreglar**. Lo mismo desperdicia T10: la imagen OG existe pero solo se
    referencia desde el `<head>` global.

    La corrección real es habilitar **prerender** (`outputMode: "static"` +
    entrypoints server). Eso genera un HTML estático por ruta con su `<head>` propio.

    *Riesgo medido*: prerender corre en Node, así que las guardas
    `typeof window === 'undefined'` pasan de decorativas a obligatorias. Verificado:
    10 de 11 páginas ya tienen guarda; la única sin ninguna es `not-found`, que no
    se prerenderiza (es la ruta catch-all `**`). Riesgo bajo.

## Decisiones tomadas

- **Piloto: `estetica`.** Es el peor caso visual del showcase (dos imágenes a 5.6×),
  tiene el chunk lazy más grande (102 kB), tiene `attachment: fixed` (jank), y su
  posicionamiento es "Soft Luxe premium" — donde una imagen blanda hace más daño.
  Arreglarlo produce un patrón repetible para los otros 3 demos afectados.
- **[2026-09-24] La imaginería de T2/T4 la resuelve el agente** con imágenes libres
  (Unsplash/Pexels), a resolución nativa y WebP. El usuario revisa candidatas antes
  de integrar. Reemplaza la decisión previa de "el usuario reemplaza las imágenes".
- **[2026-09-24] T7 se reformula: prerender primero.** Ver hallazgo 11. Conectar
  `SeoService` sin prerender no arregla nada para los scrapers sociales.
- **[2026-09-24] `seo-ia` se agrega al índice del home** (pasa a listar 8 demos).
- **[2026-09-24] Las 10 imágenes huérfanas se borran** (`git rm`, reversible).

## Tareas

### Cerrables ahora (sin dependencias externas)

- [x] **T1** — Identidad de diseño: reconciliar dos autoridades en conflicto.
  **Hecho** en `26999a1`. `CONTEXT.md` ahora declara el alcance real de la paleta
  `--hh-*`: es la paleta de marca del chrome (home, chrome compartido, 404, tarjetas
  OG), **no** un design system global para los demos. Verificado 10/10 por
  verificador independiente.
- [x] **T3** — Quitar `background-attachment: fixed` de `estetica` y `reformas`.
  **Hecho** en `ecd8344`. Se quitó la propiedad y el bloque `@media (max-width: 768px)`
  que la revertía (quedó redundante). Verificado: `background-attachment` ya no
  aparece en `dist/muestras-hhstudio/browser/` ni en `src/`.
  *Efecto secundario aceptado*: se pierde el parallax en desktop. Si se quiere
  recuperar, la forma correcta es `transform: translate3d()` sobre un hijo
  (compuesto por GPU), no `background-attachment`.
- [x] **T6** — Tipografías: higiene del `<link>` global.
  **Hecho** en `587e5cf`. `Open Sans` y `Manrope` fuera (solo eran fallback de
  segunda opción). `styles-*.css` quedó idéntico (316.19 kB): el beneficio es un
  request externo menos, no tamaño de bundle.
  **Pendiente dentro de T6**: carga de fuentes por demo (sigue global) y el mono
  de `seo-ia` (`Fira Code` / `JetBrains Mono` se declaran pero NO se cargan, caen a
  `monospace`).
- [x] **T10** — Crear `public/assets/seo-preview.jpg` (1200x630).
  **Hecho** en `546927e`. Los meta tags `og:image` y `twitter:image` apuntaban a un
  archivo que NO existía -> preview rota al compartir el link con un cliente.
  Generado con `tools/make-og-image.ps1` (GDI+ / System.Drawing, sin agregar
  dependencias al proyecto). 55110 bytes, 1200x630, presente en el build.
  **Corrección**: son **2** meta tags los que referencian la imagen, no 5
  (`og:image` línea 24 y `twitter:image` línea 30). Mi conteo inicial contaba
  todos los tags OG/Twitter del documento.
  **Corrección 2026-09-24**: esta imagen hoy está casi desperdiciada, porque sin
  prerender los scrapers sociales nunca leen los tags por ruta (ver hallazgo 11).
- [x] **T11** — Sacar `Material Symbols Outlined` de `index.html`.
  **Hecho** en `587e5cf`. 0 usos en todo el repo (verificado). Era un `<link>` extra
  a Google Fonts con una variable de 4 ejes. Verificado: 0 ocurrencias en
  `src/index.html` y en el `index.html` compilado.
- [x] **T5** — Borrar las 10 imágenes huérfanas. **Hecho.** Verificado al byte antes
  de borrar: 2,673,302 bytes (2.55 MB), 0 referencias en el repo entero, sin paths
  dinámicos. `git rm` de los 10 archivos. `public/assets/images/` pasó de 34
  archivos / ~3.85 MB a 24 archivos / 1.3 MB.
- [x] **T12** — Corregir la afirmación falsa de SSR/prerender en `CONTEXT.md`.
  **Hecho.** El bullet "SSR" fue reemplazado por "Prerender estático (no SSR)": el estado
  real (entrypoints, 9 rutas, catch-all salteado, fallback a `index.csr.html`) más las dos
  deudas escritas en voz alta (`src/server.ts` inexistente, `serve:ssr` apuntando a un
  archivo que no se genera).
- [x] **T7a** — Habilitar prerender estático.
  **Hecho.** `angular.json`: `"server": "src/main.server.ts"` en `options` y
  `"outputMode": "static"` **solo** en `production` (así `ng serve` no cambia).
  Nuevos: `src/main.server.ts` (con `BootstrapContext`) y `src/app/app.config.server.ts`
  (`provideServerRendering` desde `@angular/ssr`). `tsconfig.app.json` suma
  `src/main.server.ts` a `files` para que se type-checke.

  **Corrección a mi propio plan**: pedí una entrada `"prerender"` con la lista inline de 9
  rutas. **Eso no es expresable en Angular 22**:
  - el schema del builder acepta solo `routesFile` / `discoverRoutes` (`additionalProperties: false`);
  - con `outputMode` presente, `prerender` se **ignora y emite warning**
    (`@angular/build/.../options.js`).

  **Corrección de una afirmación mía (verificada por verificador independiente)**: le
  indicé al writer que `provideServerRendering` **no** está exportado por
  `@angular/platform-server`. **Falso**: sí lo está en 22.0.2
  (`node_modules/@angular/platform-server/types/platform-server.d.ts:50`, `@publicApi`).
  Mi grep buscó en el nivel raíz del paquete y el archivo vive en `types/`. `@angular/ssr`
  sigue siendo el import correcto para v22 (es el que usa el scaffold oficial), así que no
  hay cambio de código; la afirmación de la consigna era falsa y queda anotada.

  Se usó `discoverRoutes` (default con `server` + `outputMode: "static"`), que rinde
  exactamente las 9 rutas porque el builder saltea deliberadamente toda ruta con `*`.

  **Verificado**: `npm run build` exit 0, 11.2s, `prerendered-routes.json` con las 9 rutas
  (sin `**`), 9 directorios con HTML real (home 6.312 chars dentro de `<app-root>`),
  sin carpeta `server/`. Un solo warning, el preexistente de `pasteleria.component.scss`.
  `Initial` 682.50 kB / 136.83 kB transfer (baseline 685.23 / 134.26).
- [x] **T7a-bis** — Regresión de soft-404 prevenida.
  `vercel.json` mandaba el fallback SPA a `/index.html`, que ahora **es el home
  prerenderizado**: una URL inexistente habría servido el home con HTTP 200. Se cambió el
  destino a `/index.csr.html` (shell CSR), que reproduce exactamente el comportamiento
  previo al prerender.
  *Prueba de que Vercel resuelve filesystem antes que rewrites*: si no, `/main-abc.js` y
  `/assets/*` también caerían en el catch-all y la app no cargaría nunca.
- [x] **T7b** — Conectar `SeoService` en las 10 rutas. **Hecho.** Las 10 páginas llaman
  `updateMetaTags` en el constructor (no en `ngAfterViewInit`), para que el prerender lo
  hornee en el HTML estático. Verificado en `dist/`: 9 rutas con `<title>` y `og:title`
  **únicos** y `og:image` / `og:url` / `canonical` propios por ruta.

  **Regresión que introduje y corregí**: en la consigna le pasé al writer rutas de imagen
  **relativas** (`/assets/og/x.jpg`). `ogp.me` define el tipo URL como *"All valid URLs that
  utilize the http:// or https:// protocols"*, así que un path relativo **no** es un
  `og:image` válido y los scrapers no lo resuelven. Peor: el `<head>` global ya tenía la
  absoluta correcta, así que cada ruta la **pisaba con una relativa**. Corregido a absolutas
  en las 10 páginas + 3 specs.
  *Cuidado que casi me come un reemplazo masivo*: hay 9 `'/assets/...'` que **no** son meta
  tags (6 galerías de `electricista`, `imageUrl` de `estetica` y `reformas`) y deben seguir
  relativos. La regla aplicada fue tocar solo `/assets/og/` y `/assets/seo-preview.jpg`.
- [x] **T9** — Agregar `seo-ia` al índice del home (8 demos). **Hecho.** La entrada se agregó
  al final de `sections`, con `bi bi-graph-up-arrow`. El spec del home pasó de 7 a 8.
  *Dominio resuelto*: es `muestras.hhstudio.es` (confirmado en los meta tags).
  El footer del home usa `hhstudio.es` (correcto). El `README.md` dice
  `hhstudio.com.ar` -> desactualizado.

### Defecto preexistente encontrado (NO es de este trabajo)

- [ ] **T13** — `npm test` está en rojo **desde `46472ea`** (corregido: antes dije `609b0ff`;
  el verificador independiente lo rastreó más atrás). `apro-clinica.component.spec.ts`
  **nació** referenciando una forma del componente que nunca existió: `categories`,
  `visibleCategories`, `visibleCount`, `showAll`, `hasMore`, `showAllCategories()`,
  `toggleCategory()`, `expandedIndex`, y las clases `.apro__services-category-header` /
  `.apro__services-fade` / `.apro__btn--solid`. El componente nunca definió esos miembros en
  `HEAD`, `HEAD~1`, `609b0ff` ni `46472ea`.

  El builder `@angular/build:unit-test` compila todo el bundle de specs junto, así que **un
  solo error de TS impide que corra cualquier test**. Consecuencia concreta: los 3 tests de
  metadata agregados en T7b están escritos y verificados **por inspección** (los strings
  esperados coinciden byte a byte con los de los componentes), pero **no pueden ejecutarse**.
  El spec del home y el de not-found tampoco corren.

  *Pregunta de producto antes de tocarlo*: ¿la feature de acordeón de servicios con
  "Ver todos los servicios" se **eliminó a propósito** en el refactor premium, o se perdió?
  Según la respuesta, el arreglo es borrar los tests obsoletos (feature eliminada) o
  reimplementar la feature (se perdió). **No borro tests por mi cuenta.**

  *Evidencia primaria alternativa ya observada*: la prueba end-to-end en `dist/` demuestra
  que los meta tags se aplican en el pipeline real de prerender, que es más fuerte que el
  unit test que no puede correr.
- [ ] **T14** — Nit: canonical del 404. `not-found.component.ts` pasa
  `url: 'https://muestras.hhstudio.es/404'`, así que `SeoService` emite un canonical
  apuntando a una URL que no existe. Impacto real **bajo**, verificado: la ruta `**` no se
  prerenderiza (el builder emite 9 HTML de ruta y ningún `404.html`), así que los scrapers
  sin JS nunca lo ven; solo lo vería un bot con JS en una página que igual no se indexa.
  Arreglo: sacar `url` de esa llamada (deja el canonical por defecto) o agregar
  `<meta name="robots" content="noindex">`.

### Dependen de imágenes nuevas (T2/T4)

- [ ] **T2** — Resolver la imaginería de `estetica`: obtener `hero-bg` y
  `treatment-room` en resolución adecuada (≥1440px de ancho), en WebP.
  El overlay del hero es `rgba(61,43,31, 0.88 → 0.55)`, así que la imagen es
  textura/color más que detalle.
- [ ] **T4** — Aplicar el mismo tratamiento de imaginería a `pasteleria`, `reformas`
  y `salud` (5 fondos de viewport en total).

### Al final

- [ ] **T8** — Revisión de diseño con OD (`design-review`) sobre el piloto ya limpio.
  Comisionar solo *después* de T2: si se revisa una página que aún carga mal,
  el diagnóstico se contamina.

## Orden de ejecución (2026-09-24)

| # | Unidad de trabajo | Tareas | Commit previsto |
|---|---|---|---|
| A | Imágenes huérfanas | T5 | `chore(assets): drop unreferenced images` |
| B | Prerender | T7a + T7a-bis + T12 | `feat(prerender): emit per-route HTML so social previews work` |
| C | Metadata por ruta | T7b + T9 | `feat(seo): per-route metadata across the showcase` || D | Imaginería piloto | T2 | `fix(estetica): native-resolution imagery` |
| E | Imaginería resto | T4 | `fix(imagery): native-resolution hero imagery` |
| F | Revisión de diseño | T8 | sin código |

## Evidencia de cierre

| Tarea | Verificación | Resultado |
|---|---|---|
| T1 | Verificador independiente contra el repo | 10/10 afirmaciones de `CONTEXT.md` VERIFICADAS (rutas, orden de demos, assets, dominio, uso de fuentes) |
| T3 | Build + grep en output compilado | `background-attachment` ausente en `dist/` y en `src/`. Build exit 0. |
| T6 | Build + grep | `Open Sans` y `Manrope` fuera del `<link>`; 5 familias intactas; `JetBrains Mono`/`Fira Code` → 0 en `src/` |
| T10 | Build + dimensiones del JPEG | 1200x630, 55110 bytes, presente en `dist/.../browser/assets/` |
| T11 | Build + grep | 0 ocurrencias de `Material Symbols`; build exit 0 |

**Build de producción** (verificado por `gentle-ai-verify`, delegado): exit 0,
6.285s, cero errores. Un solo warning, preexistente y sin relación:
`pasteleria.component.scss` 32.54 kB vs 31 kB (umbral de error: 38 kB).
`initial` 685.23 kB / 134.35 kB transfer.

## Commits de unidad de trabajo

Rama `polish/showcase`, creada desde `main`. Solo se commiteó trabajo propio; los
archivos `.atl/*`, `.gitignore` y `opencode.json` quedan **fuera**, sin tocar.

| Commit | Unidad | Archivos |
|---|---|---|
| `587e5cf` | `fix(fonts): trim global font loading` | `src/index.html`, `src/app/pages/seo-ia/seo-ia.component.scss` |
| `ecd8344` | `fix(styles): remove fixed background attachment from hero sections` | `estetica.component.scss`, `reformas.component.scss` |
| `546927e` | `feat(seo): add the social preview image referenced by the meta tags` | `public/assets/seo-preview.jpg`, `tools/make-og-image.ps1` |

Los commits de T1 y T6 van juntos por archivo: `src/index.html` contiene tanto la
remoción de `Material Symbols` (T11) como la de `Open Sans`/`Manrope` (T6), así que
separarlos habría requerido partir un archivo entre dos commits.

## Nota de proceso

El preflight de review (RDD global activo) llegó a `status: ready` con lineage
`review-4b3c3c38a075c40b`, pero la proyección `workspace` arrastraba cuatro
archivos ajenos (`.atl/*`, `.gitignore`, `opencode.json`). El candidato correcto
es el **rango commiteado** de esta rama, no el workspace sucio.
