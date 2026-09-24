# odd/tasks/blackbird-audit.md — Inventario del audit de Open Design

> Auditoría de diseño de la página `blackbird-cafe` hecha por **Open Design** (agente
> `pi`), no por el review nativo. **41 hallazgos: 4 blockers, 21 warnings, 16 nits**, más
> 6 pases explícitos y una sección **WHAT NOT TO CHANGE**.
>
> Corrida: `7c972452-58f3-4e3a-a2c1-c3de0a5e797b` · Proyecto OD: `blackbird-cafe-brutalist`
> · duración 354 s · 4 blockers en total, 2 de ellos falsos (ver abajo).
>
> **Cómo se armó la copia que OD revisó, y qué la invalida parcialmente**: se extrajo el
> HTML **tal cual del prerender** (`dist/.../blackbird-cafe/index.html`) y el CSS
> **compilado del SCSS real con `sass`**. Se limpiaron los atributos `_ngcontent-*` /
> `ng-version` / `ng-server-context` y se reemplazaron los `src` de las dos placas por su
> URL de origen en Unsplash, porque el proyecto de OD no tiene los WebP locales.
> **Esas dos sustituciones produjeron dos hallazgos falsos.**

## ⚠️ FALSOS POSITIVOS — no arreglar

| ID | Qué dice | Por qué es falso |
|---|---|---|
| **T1** (blocker) | "Inter no carga: `@font-face` → 0, `<link` → 0. Todo el macro type renderiza en `system-ui`" | Al extraer la copia se tomó solo `<app-root>` y **se omitió el `<link>` a Google Fonts del `<head>`**. En la app Inter **sí** carga |
| **P7** (blocker) | "Imágenes hotlinkeadas desde `images.unsplash.com`; si la URL muere, la banda queda un bloque de tinta sólido" | **Yo** referencié las placas por URL porque el proyecto de OD no tenía los assets locales. En la app son archivos locales |
| **C4** (warning) | "8 hexes, `var(--` → 0, `:root` → 0: sin fuente de verdad" | Las **variables SCSS son la fuente de verdad**; que el CSS compilado tenga hexes literales es lo correcto y esperado en un componente sin theming runtime. Ya se atendió igual: `$bb-rule` y `$bb-rule-on-ink` ahora derivan del palette |

**T2 también parecía falso y NO lo era.** Ver abajo.

## Estado por dimensión

Los IDs son los del audit. ✅ = arreglado · ⬜ = abierto · ❌ = falso positivo.

### Sustrato (S)

- ⬜ **S1** (warn) — `.bb__sites{background:#0a0a0a}`: una sección de tinta a sangre en medio
  de un documento de papel. El audit lo declara **dispositivo legítimo** (compartimento
  reverso), no violación.
- ⬜ **S2** (warn) — hay **CUATRO masas oscuras en dos tonalidades** (la franja, la banda, la
  placa del manifiesto, la banda de sedes), no **una** reversión deliberada. Falta una regla
  de cuándo cada una.
- ✅ **S3** (warn) — el `sepia(1)` del duotono agregaba croma a cada píxel y `brightness(0.72)`
  es multiplicativo (nunca llega a `#0a0a0a`) → las placas caían **dentro de la familia del
  acento**. **Arreglado** con `grayscale(1) contrast(1.35) brightness(0.82)`.
- ⬜ **S4** (nit) — `#F4F4F0` **y** `#EAE8E3` como fondos sin regla de cuándo cada uno.

### Geometría (G)

- ✅ **G1** `border-radius` → una sola, el reset. **PASS.**
- ✅ **G2** `box-shadow`/`text-shadow` → cero. **PASS.**
- ✅ **G3** gradientes → cero. **PASS.**
- ✅ **G4** translucidez → cero `rgba(`/`hsla(`/`backdrop-filter`/`opacity<1`. **PASS.**
- ✅ **G5** (warn) — el borde de 4px de `.bb__action` corrompía el gutter de 1px: regla de
  tinta a **56px** de una celda y **60px** de la siguiente. **Arreglado**: la señal de hover
  pasó del marco a la etiqueta.

### Tipografía (T)

- ❌ **T1** (blocker) — falso positivo, ver arriba.
- ✅ **T2** (blocker) — **REAL Y ERA MÍO.** `white-space: nowrap` + `overflow: hidden` con piso
  de `3.6rem`: a 320px el piso **subía** el font a 57.6px contra 48.5px disponibles → **~53px
  de la D amputados**, invisibles. Avance medido del wordmark: **5.842 em** → el límite es
  ~15.75vw. **Arreglado** con `clamp(2.4rem, 13.6vw, 13rem)`. Verificado: 43.52px, 254.3px en
  283.2px, 29px de margen, sin scroll horizontal.
- ⬜ **T3** (warn) — el stack mono resuelve distinto por sistema operativo (3 anchos de avance),
  así que la grilla mecánica es client-dependiente. Arreglarlo pediría cargar un mono webfont,
  que va **contra** T6 (reducir familias). **Decisión pendiente.**
- ✅ **T4** (warn) — 7 valores de tracking mono, dos bajo el piso de 0.05em. **Arreglado.**
- ⬜ **T5** (nit) — tracking negativo aplicado a 18–24px donde debería reservarse a ≥32px.
- ⬜ **T6** (nit) — `line-height: 0.82` en el hero, bajo el rango 0.85–0.95.
- ✅ **T7** (nit) — `__site-hours-note` era el único rótulo de su grupo sin mayúsculas.
  **Arreglado.**
- ✅ **T8** — el split macro/micro es real y limpio. **PASS.**
- ✅ **T9** (nit) — `__item-size` a 9.92px contra un piso de 10px. **Arreglado** (0.66rem).

### Layout (L)

- ✅ **L1** (warn) — **sin medida de página en ningún lado**, y `.container{max-width:1320px}`
  **definido en el mismo archivo y nunca usado**. A 2560px el precio quedaba a ~2.2 m del
  nombre. **Arreglado**: `.bb__main` capada a 1320px. *Efecto secundario*: la banda de tinta
  dejó de ser a sangre, que es lo que S3 pedía por otra razón.
- ⬜ **L2** (warn) — cuatro `minmax(208/230/240/280px)` mágicos, cuatro conteos de columna no
  controlados. Solo `.bb__manifesto` es una composición declarada.
- ✅ **L3** (warn) — el precio a **112px** mientras todo lo demás está en la línea de 56px
  (doble inset: el grupo insetea por `$bb-pad` y la fila sumaba otro). **Arreglado.**
- ✅ **L4** (warn) — el líder de puntos se desprendía: es un span vacío y `align-self: end` lo
  estacionaba al fondo → en nombres que envuelven ("Sandwich de bacon y huevo a la plancha",
  que envuelve en todo teléfono) el líder iba a la **última** línea y el precio quedaba en la
  **primera**. **Arreglado** con `align-items: baseline`. *(El review nativo levantó
  `R3-LEADER-BASELINE` sobre este arreglo y no está verificado visualmente — ver Pendientes.)*
- ✅ **L5** (warn) — las dos reglas de 1px medían **1.37:1** sobre papel y **1.56:1** sobre
  tinta: invisibles, mientras las del truco del lecho estaban a 17.96:1. **Arreglado**:
  `$bb-rule: $bb-ink-soft` y `$bb-rule-on-ink: $bb-paper`, simétricas entre sustratos.
- ✅ **L6** — `grid; gap:1px; background:$bb-ink` en grupos/items/acciones/métodos. **PASS.**
  El audit lo llamó *"lo mejor del archivo"*.
- ✅ **L7** — la matriz de alérgenos cierra sin dobles en cualquier conteo, sobre un `<dl>`
  real. **PASS.**
- ⬜ **L8** (nit) — solo dos composiciones asimétricas; catorce gutters idénticos.
- ⬜ **L9** (nit) — el type oversize está calibrado para quedar **dentro** de su gutter, o sea
  lo contrario de "viewport-bleeding". *(Nota: bleed en mobile causa scroll horizontal, así que
  puede ser una desviación deliberada.)*
- ⬜ **L10** (nit) — regla doble de 2px en el único límite acciones/footer.

### Color (C)

- ⬜ **C1** (warn) — el contrato pide `#E61919`/`#FF2A2A`; la página usa marrón. Desviación de
  **matiz**, defendible por marca (el brief dice blanco/negro + marrones).
- ✅ **C2** — los dos valores están **7.69:1** y **6.64:1**, cada uno confinado a su sustrato.
  **PASS.**
- ✅ **C3** (BLOCKER) — **8–15 objetos en acento por viewport**: el código de alérgeno `7` era
  exactamente del mismo marrón que `[ CARTA ]` y que la nota de grupo. **Arreglado**: el acento
  pasó de **19 declaraciones a 5** y ahora está reservado a **tiempo y acción**. Medido: 1
  objeto en la carta, 2 en la banda de sedes, contra el techo de 2.
- ❌ **C4** — falso positivo, ver arriba.

### Decoración (D)

- ✅ **D1** (warn) — `[ 01 ] → (sin marcador) → [ 02 ] → [ 03 ]`: secuencia que no indexa nada,
  compitiendo con una segunda secuencia `01–04`. **Arreglado**: se rotulan por nombre
  (`[ CARTA ]`, `[ LOCAL ]`, `[ PEDIDOS ]`). *Era una regresión del recorte de eyebrows de T8.*
- ⬜ **D2** (nit) — `>>>` literal en el manifiesto y en suplementos: guarnición de telemetría
  sobre sustrato de imprenta. El audit dice **elegir UN modo y no mezclar**.
- ✅ **D3** (warn) — `+` significaba **viñeta** en el hero e **incremento de precio** en la
  carta, a un scroll de distancia. **Arreglado**: `/` en el hero.
- ⬜ **D4** (nit) — `®` y `©` inline a 0.7rem = texto legal, no elemento estructural.
- ⬜ **D5** (warn) — **toda la degradación analógica del §7 ausente**: sin halftone, sin
  1-bit dithering, sin scanlines, sin grain. *"La sección más incumplida, y explica por qué
  las superficies leen vector-clean."*
- ⬜ **D6** (nit) — sin cruces, códigos de barras ni franjas de advertencia.
- ✅ **D7** — `<data>`, `<dl>`, `<address>`, `<dt>/<dd>`, líderes con `aria-hidden`. **PASS**
  (único hueco: no hay `<samp>/<kbd>/<output>`).

### Independientes del arquetipo (P)

- ❌ **P7** (blocker) — falso positivo, ver arriba.
- ⬜ **P6** (warn) — **fuga de framework en un artefacto cliente-facing**: más de 100 nodos
  `<!---->`, `<router-outlet>`, `_nghost-…`, `routerlink="/"`, `jsaction="click:;"`. Y `<title>`
  que anuncia que es una copia de revisión. *(Los marcadores de Angular aplican solo a mi copia;
  el `<title>` es mío. Los `<!---->` existen también en la app.)*
- ✅ **P8** (warn) — `.bb__site-tel:hover` **atenuaba** el teléfono: 17.96:1 → 6.64:1, una
  **reducción de contraste del 63%** como señal de "interactivo". **Arreglado**: invierte y
  sube el contraste.
- ⬜ **P9** (nit) — `.bb__footer-note a` es el único link sin hover/focus/transition.
- ⬜ **P10** (nit) — `.bb__action:hover` a `#eae8e3` da ΔL de 0.035 en OKLab contra 0.06–0.12
  requeridos: la señal de hover es solo el marco.

## WHAT NOT TO CHANGE (textual del audit)

1. **La construcción de líneas con `gap: 1px`** en grupos/items/acciones/métodos. Arreglar L5
   cambiando el **color del gutter** a papel, **nunca la técnica**.
2. **Los dos valores de acento, nunca colapsados en un token.** 7.69:1 y 6.64:1 hoy; un
   `--accent` único baja un sustrato al rango de 4.2:1 y falla AA.
3. **Los líderes de puntos sobre `1fr` y las cabeceras alineadas a baseline.** El movimiento
   "modernizador" (`flex; justify-content: space-between`) borra los dos en silencio.
   Arreglar L4 con `align-items: baseline`, **no** sacando el líder.
4. **El margen negativo óptico del hero y el reset de `border-radius: 0`.** El `-0.055em` cuelga
   el bearing izquierdo de la B fuera de la grilla a propósito.
5. **El stack plano sin cajas y la matriz cerrada de alérgenos.** Un futuro pase de "jerarquía
   visual" va a encajonar el registro de alérgenos y convertir un documento en un dashboard.

## Y una validación que vale guardar

El audit **calculó** que el acento que exige el contrato falla su propio requisito:
`#E61919` da **4.22:1** sobre papel y **4.26:1** sobre tinta → **falla AA en ambos**;
`#FF2A2A` da 3.39:1 sobre papel. Conclusión textual: el par de dos luminosidades *"no es una
licencia que la página se dio a sí misma, es **el workaround correcto para un defecto real del
contrato**"*.

## Pendientes que salieron de los reviews nativos

- ⬜ **R3-LEADER-BASELINE** (WARNING, `scss:365-372`) — sobre el arreglo de L4. **Hipótesis a
  verificar mirando**: un span vacío no tiene baseline de texto, y por spec la suya es su
  *bottom margin edge*, así que la línea punteada puede haber quedado unos píxeles arriba de la
  baseline del nombre. **No confiar en el WARNING ni descartarlo: medir.**
- ⬜ **R3-plate-filter-reachability** (SUGGESTION, `scss:288-291`) — sobre el filtro neutro.
- ⬜ **R3-ROUND-SEQUENCE / R3-HOVER-COLOR / R3-RULE-VARS / R3-NOWRAP-FLOOR** — sin descripción
  en el sobre, no accionables con precisión.
- ⬜ **BB-R8 / BB-R9** — nits cosméticos viejos (alts casi duplicados de las placas; `detail: ''`
  en el array `bar`). **No perseguir sueltos**: viajan con el próximo cambio real.

## Cómo volver a correr el audit

1. Compilar el CSS real: `node_modules/.bin/sass --no-source-map --style=expanded src/app/pages/blackbird-cafe/blackbird-cafe.component.scss <tmp>/bb.css`
2. Extraer el HTML del prerender: `dist/muestras-hhstudio/browser/blackbird-cafe/index.html`,
   sacar el contenido de `<app-root>`, limpiar `_ngcontent-*`, y **reemplazar los `src` locales por
   URL accesible** (o copiar los WebP al proyecto de OD — mejor, evita el falso positivo P7).
3. Escribir **un HTML autocontenido** en
   `…\Open Design\namespaces\release-stable-win\data\projects\blackbird-cafe-brutalist\index.html`
   (OD usa UN archivo autocontenido; ver `ms-life-salud/landing-v2.html`).
   **El daemon lee del disco**: `list_files` lo confirma sin necesidad de pasar el contenido por
   el modelo.
4. `start_run` con `agent: "pi"`, `project`, un prompt de crítica (pedir **crítica escrita, no
   reescritura**) y `skill: "industrial-brutalist-ui"`.
5. Pollear `get_run(runId)` y leer `agentMessage`; el log de eventos
   (`…/runs/<runId>/events.jsonl`) da señal en vivo con eventos `thinking_delta`.
