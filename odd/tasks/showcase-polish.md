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

3. **2.55 MB de imágenes huérfanas sin ninguna referencia** en `src/` ni `public/`
   (10 archivos). La peor: `apro-clinica/aalo-lens-...-unsplash.jpg`, 2.17 MB y
   5000×2812. No afecta la carga porque no se sirve nunca; es peso de repo.

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

## Decisiones tomadas

- **Piloto: `estetica`.** Es el peor caso visual del showcase (dos imágenes a 5.6×),
  tiene el chunk lazy más grande (102 kB), tiene `attachment: fixed` (jank), y su
  posicionamiento es "Soft Luxe premium" — donde una imagen blanda hace más daño.
  Arreglarlo produce un patrón repetible para los otros 3 demos afectados.

## Tareas

- [ ] **T1** — Identidad de diseño: reconciliar dos autoridades en conflicto.
  `CONTEXT.md` declara un tema oscuro global (`#121418`); los briefs de OD declaran
  identidades por demo (`salud` = terracota `#c17b60` sobre crema `#faf7f4`).
  Definir cuál manda y dejarlo escrito. **Bloquea el resto: sin esto el pulido
  pelea contra sí mismo.**
- [ ] **T2** — Resolver la imaginería de `estetica`: obtener `hero-bg` y
  `treatment-room` en resolución adecuada (≥1440px de ancho), en WebP.
  El overlay del hero es `rgba(61,43,31, 0.88 → 0.55)`, así que la imagen es
  textura/color más que detalle: un upscale es viable.
- [x] **T3** — Quitar `background-attachment: fixed` de `estetica` y `reformas`.
  **Hecho.** Se quito la propiedad y el bloque `@media (max-width: 768px)` que la
  revertia (quedo redundante). Verificado: `background-attachment` ya no aparece
  en `dist/muestras-hhstudio/browser/` ni en `src/`.
  *Efecto secundario aceptado*: se pierde el parallax en desktop. Si se quiere
  recuperar, la forma correcta es `transform: translate3d()` sobre un hijo
  (compuesto por GPU), no `background-attachment`.
- [x] **T10** — Crear `public/assets/seo-preview.jpg` (1200x630).
  **Hecho.** Los meta tags `og:image` y `twitter:image` apuntaban a un archivo
  que NO existia -> preview rota al compartir el link con un cliente.
  Generado con `tools/make-og-image.ps1` (GDI+ / System.Drawing, sin agregar
  dependencias al proyecto). 55110 bytes, 1200x630, presente en el build.
  **Correccion**: son **2** meta tags los que referencian la imagen, no 5
  (`og:image` linea 24 y `twitter:image` linea 30). Mi conteo inicial contaba
  todos los tags OG/Twitter del documento.
- [x] **T11** — Sacar `Material Symbols Outlined` de `index.html`.
  **Hecho.** 0 usos en todo el repo (verificado). Era un `<link>` extra a Google
  Fonts con una variable de 4 ejes. Verificado: 0 ocurrencias en `src/index.html`
  y en el `index.html` compilado. `styles-*.css` quedo IDENTICO (316.19 kB): el
  beneficio es un request externo menos, no tamano de bundle.
- [ ] **T4** — Aplicar el mismo tratamiento de imaginería a `pasteleria`, `reformas`
  y `salud` (5 fondos de viewport en total).
- [ ] **T5** — Limpiar las 10 imágenes huérfanas (2.55 MB).
- [ ] **T6** — Tipografías: cargar por demo solo las familias que ese demo usa, y
  arreglar el mono de `seo-ia` (`Fira Code` / `JetBrains Mono` se declaran pero
  NO se cargan, asi que caen a `monospace`). Bajar los 316 kB de CSS global.
- [ ] **T7** — Conectar `SeoService` en las 10 rutas (title, description, OG, Twitter
  únicos por demo).
- [ ] **T8** — Revisión de diseño con OD (`design-review`) sobre el piloto ya limpio.
  Comisionar solo *después* de T2: si se revisa una página que aún carga mal,
  el diagnóstico se contamina.
- [ ] **T9** — Verificar el estado de `seo-ia` en el índice (tiene ruta y página
  pero el home lista 7 demos, no 8).
  *Dominio resuelto*: es `muestras.hhstudio.es` (confirmado en los meta tags).
  El footer del home usa `hhstudio.es` (correcto). El `README.md` dice
  `hhstudio.com.ar` -> desactualizado.

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
