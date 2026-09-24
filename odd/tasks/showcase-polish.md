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

12. **[2026-09-24] La auditoría de imaginería estaba mal y sobre-dimensionaba el problema.**
    Comparaba la resolución nativa contra el **ancho del viewport**, ignorando las dos cosas
    que deciden si una imagen se ve borrosa:
    - **el tamaño de la caja donde se dibuja**, y
    - **la opacidad con la que se pinta**.

    Medido de nuevo: de las 6 imágenes "críticas", **4 se dibujaban al 4–7% de opacidad**.
    Eso incluye a `pasteleria/chef-hands.jpg`, dibujada en una caja de **320×380** — o sea su
    fuente de 343×512 se **reduce** y nunca fue borrosa. Otras dos
    (`estetica/hero-bg`, `reformas/hero-bg`) sí estaban detrás de un gradiente del **mismo
    color que el `background-color`**, que existía para oscurecer la foto, no para dar
    profundidad. El problema real eran **2 imágenes, no 6**.

13. **[2026-09-24] No hay forma de codificar WebP en esta máquina.** GDI+ expone solo
    `image/bmp`, `image/jpeg`, `image/gif`, `image/tiff`, `image/png`; `ImageFormat.Webp` no
    existe. Tampoco hay `cwebp`, ImageMagick, `ffmpeg` ni `sharp`. **Salida sin instalar nada**:
    el CDN de Unsplash sirve WebP real vía `?fm=webp&w=…`, verificado leyendo los magic bytes
    (`RIFF` + `WEBP` en offset 8).

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

### Defectos preexistentes encontrados (no eran de este trabajo)

- [x] **T13** — `npm test` estaba en rojo **desde `46472ea`**. **Arreglado.** Decisión del
  usuario: la feature del acordeón se había eliminado a propósito, así que los tests
  obsoletos se borran. Al destrabar el compile aparecieron **tres causas raíz más, todas de
  infraestructura de tests y todas preexistentes**, que el compile roto venía enmascarando:

  1. **`window.matchMedia` no existe en jsdom.** Rompía todo test que llamara
     `detectChanges()`, porque las 9 páginas lo leen en `ngAfterViewInit` para
     `prefers-reduced-motion`. → `src/test-setup.ts` con polyfill, registrado vía el
     `setupFiles` del builder.
  2. **`IntersectionObserver` tampoco existe en jsdom** (8 páginas lo usan). → shim no-op que
     **nunca invoca el callback**, a propósito: el callback dispara GSAP y jsdom no tiene motor
     de layout, así que dispararlo solo animaría valores que ninguna aserción puede observar.
     También `Element.prototype.scrollIntoView` y `window.scrollTo`.
  3. **El spy de `document.getElementById` filtraba a los tests siguientes.** Sin
     `restoreMocks`, Angular dejaba de encontrar su propio root de tests → `NG05104` con
     selectores `#root9`/`#root10`. Esto es lo que hacía fallar los 3 tests de metadata de
     T7b: no estaban mal, venían después del spy. → `restoreMocks: true` en `vitest.config.ts`.

  **Bonus de mérito propio**: `src/test-setup.ts` no estaba en la compilación de TS, así que
  el shim se bundleaba **sin chequear tipos**. Al agregarlo a `tsconfig.spec.json`, el
  type-check reveló que al shim le faltaba `scrollMargin` (requerido por la interfaz
  `IntersectionObserver` en `lib.dom.d.ts`). O sea: el arreglo se veía verde *porque* nadie
  lo type-checkeaba.

  **También se reparó `node_modules`**: faltaba `@rolldown/binding-win32-x64-msvc`, que sí
  figura en `package-lock.json` (bug de optional deps de npm, `npm/cli#4828`). Instalado con
  `--no-save`: `package.json` y el lockfile quedaron sin tocar.

  **Migración autorizada por el usuario**: el runner avisaba que el `buildTarget` usaba el
  builder legacy `@angular-devkit/build-angular:application`. Migrado a
  `@angular/build:application`; el warning desapareció y el build sigue verde.

  **Resultado verificado**: `npm test` → **7/7 archivos, 30/30 tests, cero warnings**.
  `npm run build` → exit 0, 9 rutas prerenderizadas, un solo warning (el preexistente de
  `pasteleria.component.scss`), `Initial` 683.59 kB / 136.43 kB.
- [x] **T14** — Nit: canonical del 404. **Hecho.** Se sacó `url` de la llamada de
  `not-found`, así que ya no emite un canonical hacia una URL inexistente.

### Defectos preexistentes nuevos, NO arreglados

- [ ] **T15** — **La integración de Supabase está muerta y es una bomba latente.**
  `src/environments/environment.ts` y `environment.development.ts` tienen **placeholders**
  (`'URL_DE_SUPABASE_AQUI'`, `'ANON_KEY_DE_SUPABASE_AQUI'`), y `environment.ts` declara
  `production: false` con un comentario que dice "cámbialo a true".
  - **No hay `fileReplacements` en `angular.json`**, así que `environment.ts` es el único que
    se usa y `production` nunca se pone en `true`. Es un campo muerto.
  - `SupabaseService` **no lo inyecta nadie**: cero usos en todo `src/`.
    `@supabase/supabase-js` se importa solo desde ahí.
  - `createClient` con una URL placeholder **lanza** `Invalid supabaseUrl`. Como el servicio
    es `providedIn: 'root'`, el constructor explotaba al inyectarlo.
  - **Arreglado parcialmente y de forma defensiva**: el cliente ahora se crea **lazy** (en el
    getter `client`), así que falla al usarse y no al inyectarse. La API pública no cambió.

  *Decisión pendiente del usuario*: ¿se conecta Supabase de verdad (credenciales + token de
  config), o se elimina el servicio, su spec y la dependencia? Hoy es andamiaje que nadie usa.
  `vi.mock` con imports relativos está prohibido por el sistema de tests de Angular, así que
  no se puede simplemente mockear el environment desde el spec.

### Imaginería — cerrada el 2026-09-24

> **La auditoría original estaba mal.** Ver hallazgo 12. De las 6 "críticas", 4 se dibujaban
> al 4–7% de opacidad. El problema real eran **2 imágenes, no 6**.

- [x] **T2** — `estetica/hero-bg` y `reformas/hero-bg` (las 2 que sí se veían borrosas).
  **Hecho, con decisión del usuario**: en vez de buscar reemplazo, **se sacó la foto y se dejó
  el gradiente**. Motivo verificado: en ambos heroes el gradiente es **del mismo color que el
  `background-color`** (`rgba(61,43,31,…)` sobre `#3d2b1f`; `rgba(26,45,61,…)` sobre `#1a2d3d`),
  así que existía para **oscurecer la foto**, no para dar profundidad. También se quitaron
  `background-size`/`position`/`repeat`, que solo posicionaban la foto.
  *Pendiente de gusto*: los dos heroes quedan como campo oscuro texturizado (grain al 0.04 en
  `estetica`, más dos radial-glow al 0.08/0.06). Si se quiere profundidad, la corrección es
  cambiar ese gradiente mismo-color por uno de dos tonos.
- [x] **T4** — Texturas casi invisibles + `salud/clinic-interior`.
  - Borrados **3 archivos** (137.824 bytes) con sus 4 usos al 4–7%: `estetica/treatment-room.jpg`
    (0.05), `pasteleria/chef-hands.jpg` (0.055, caja 320×380), `salud/spa-treatment.jpg`
    (0.07 / 0.06 / 0.04 — un archivo, tres usos). Los bloques `::before` eran **textura pura**
    (content / position / inset / background / opacity / pointer-events); se borraron enteros,
    conservando `position: relative` y `overflow` de los padres.
  - **`salud/clinic-interior.jpg` reemplazada** por `clinic-interior.webp` 1600×900
    (157.720 bytes), elegida por el usuario entre candidatas (se descartó una con texto legible
    incrustado). La referencia del SCSS pasó a `.webp`.

  **Corrección de un error mío**: al ofrecer la opción dije "4 archivos, 208 KB". Son
  **3 archivos y 137.824 bytes**.

  **Licencia verificada en la fuente**: Unsplash permite uso comercial libre, **sin atribución
  obligatoria**; no permite vender la imagen sin modificar ni compilar para replicar un servicio
  competidor. Se prefirieron interiores/texturas sobre caras identificables (la licencia no
  incluye releases de modelo).
- [x] **T5-bis** — El método de detección de huérfanas estaba roto y se corrigió.
  Buscaba por **nombre de archivo**, y `hero-bg.jpg` existe en 4 demos, así que las referencias
  de una página tapaban la orfandad de otra. Con búsqueda por **path completo** aparecieron
  **2 huérfanas que T5 no vio**: `electricista/hero-bg.jpg` (69.630 bytes) y
  `pasteleria/hero-bg.jpg` (62.641 bytes). Borradas. Las 10 de `bedc7de` tenían nombres únicos,
  así que ese borrado sigue siendo correcto — pero el método era poco sólido.
  `public/assets/images/` quedó en **980 KB** (venía de ~3.85 MB).
- [ ] **T16** — Home: la tarjeta de `seo-ia` no debe parecer un demo. **Pedido del usuario.**
  Hoy quedó como la 8ª tarjeta de la misma grilla (`sections` en `home.component.ts`), pero
  `seo-ia` es **contenido informativo**, no una muestra: hay que **bajarla** de la grilla de
  demos y darle **una card de otro tipo**. Ojo con `home.component.spec.ts`, que ahora afirma
  que `sections` tiene 8 elementos — si `seo-ia` sale de ese array, el test vuelve a 7.

- [x] **T16** — Home: la tarjeta de `seo-ia` dejó de parecer un demo. **Hecho.**
  `seo-ia` salió del array `sections` (que volvió a **7 demos**) y se convirtió en un
  `readonly resource` aparte, renderizado como **tira informativa a ancho completo debajo de la
  grilla**, antes del footer.
  - **Estructura distinta, no una card más**: grilla horizontal `auto 1fr auto` (ícono en
    círculo + cuerpo + CTA "Ver la guía"), borde izquierdo de 4px en vez de borde completo,
    fondo translúcido del primario, y una **eyebrow "Recurso"** en mayúsculas en lugar de los
    tags de demo. En mobile colapsa a dos columnas con el CTA abajo.
  - El bloque `.home` es flex column y `.home__grid` tiene `flex: 1`, así que la tira queda
    empujada abajo por construcción.
  - **Verificado en el HTML prerenderizado**: orden `grid < resource < footer`, 7 hrefs de
    demo sin `seo-ia` entre ellos, `href="/seo-ia"` en la tira, label y título correctos.
  - Test nuevo que lo fija: la tira existe, linkea a `/seo-ia`, y la grilla tiene exactamente 7
    `.home__card`. El spec pasó de 8 a 7 en `sections`.
  - `npm test` 7/7 archivos, **31/31 tests**.

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
