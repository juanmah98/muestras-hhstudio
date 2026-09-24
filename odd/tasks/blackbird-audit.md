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

- ✅ **S1** (warn) — `.bb__sites{background:#0a0a0a}`: una sección de tinta a sangre en medio
  de un documento de papel. El audit lo declara **dispositivo legítimo** (compartimento reverso), no
  violación. **Cerrado en U3**: es la **única** reversión deliberada de la página y ahora está escrito
  en el archivo cuáles son las cuatro clases de superficie (`paper`, `paper-deep`, `ink`, `plate`) y
  dónde se permite cada una.
- ✅ **S2** (warn) — hay **CUATRO masas oscuras en dos tonalidades** (la franja, la banda, la placa del
  manifiesto, la banda de sedes), no **una** reversión deliberada. Faltaba una regla de cuándo cada
  una. **Cerrado en U3**: las cuatro masas pasan a **dos** — una reversión a tinta deliberada (la banda
  de sedes) + **una sola familia fotográfica**, porque las dos placas ahora pasan por la misma trama
  1-bit. La regla de cuándo cada superficie es oscura quedó escrita en el archivo.
- ✅ **S3** (warn) — el `sepia(1)` del duotono agregaba croma a cada píxel y `brightness(0.72)`
  es multiplicativo (nunca llega a `#0a0a0a`) → las placas caían **dentro de la familia del
  acento**. **Arreglado** con `grayscale(1) contrast(1.35) brightness(0.82)`.
- ✅ **S4** (nit) — `#F4F4F0` **y** `#EAE8E3` como fondos sin regla de cuándo cada uno.
  **Cerrado en U3** con la regla escrita: `paper-deep` es **sólo** el `aside` de suplementos, que es
  el único registro donde el lector paga un precio que no está en la carta.

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
- ✅ **T3** (warn) — el stack mono resuelve distinto por sistema operativo (3 anchos de avance),
  así que la grilla mecánica era client-dependiente. **Cerrado en U4**: se carga **JetBrains Mono**
  (la primera cara que nombra el §3.2) junto a Inter en el mismo `<link>` de `index.html`, con el stack
  del SO conservado detrás como fallback. Verificado en el navegador: `fonts.check('16px "JetBrains
  Mono"') → true` y la familia computada del precio es `'JetBrains Mono'`. A 320 y 2560px sin overflow.
  así que la grilla mecánica es client-dependiente. Arreglarlo pediría cargar un mono webfont,
  que va **contra** T6 (reducir familias). **Decisión pendiente.**
- ✅ **T4** (warn) — 7 valores de tracking mono, dos bajo el piso de 0.05em. **Arreglado.**
- ✅ **T5** (nit) — tracking negativo aplicado a 18–24px donde debería reservarse a ≥32px.
  **Arreglado** en U1: borradas las dos declaraciones por debajo del umbral (`.bb__method-name`,
  `.bb__site-name`), con la regla escrita en el archivo. El `-0.045em` del hero **no se toca**: es
  *load-bearing* del presupuesto de T2, y el `-0.03em` de `.bb__head-title` está sobre el umbral.
- ✅ **T6** (nit) — `line-height: 0.82` en el hero, bajo el rango 0.85–0.95. **Arreglado** en U1:
  `0.9`. Es inerte hoy porque el hero es de una sola línea (`nowrap`), pero era el valor que
  colisionaba en cuanto se restaure el wrapping.
- ✅ **T7** (nit) — `__site-hours-note` era el único rótulo de su grupo sin mayúsculas.
  **Arreglado.**
- ✅ **T8** — el split macro/micro es real y limpio. **PASS.**
- ✅ **T9** (nit) — `__item-size` a 9.92px contra un piso de 10px. **Arreglado** (0.66rem).

### Layout (L)

- ✅ **L1** (warn) — **sin medida de página en ningún lado**, y `.container{max-width:1320px}`
  **definido en el mismo archivo y nunca usado**. A 2560px el precio quedaba a ~2.2 m del nombre.
  **Se probaron dos arreglos y los dos los rechazó el dueño de la página**: capar `.bb__main` a 1320px
  (300px de papel muerto por lado a 1920px) y después mover esa medida a cada registro como
  `max-width` (cada regla de sección cortada a mitad de página). **Estado final: la página entera va a
  ancho completo, y L1 queda como desviación aceptada y escrita en el archivo** — el precio puede
  quedar a la distancia que dé el ancho de la pantalla. Ver U6.
- ✅ **L2** (warn) — cuatro `minmax(208/230/240/280px)` mágicos, cuatro conteos de columna no
  controlados. **Cerrado en la parte que importa (U2b)**: los cuatro valores son ahora tokens
  declarados con la regla escrita, y la medida de 1320px acota el conteo de todos los registros
  (6 / 4 / 3 / 2 columnas a pantalla ancha). **No hecho**: la alineación literal de pistas entre
  secciones (12 pistas con `span`, o `subgrid`) — ver U2.
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
- ✅ **L9** (nit) — el type oversize estaba calibrado para quedar **dentro** de su gutter, o sea lo
  contrario de "viewport-bleeding". **Cerrado en U6**: el título del hero dejó de topar a `13rem` y
  ahora **resuelve su tamaño** desde el ancho disponible, así que llena la pantalla en cualquier
  monitor. Medido: **94.0%** del ancho disponible a 1920px y **92.5%** a 2560px. No *sangra* (no cruza
  el borde) porque el sangrado real a 320px produce scroll horizontal; se queda en el borde con ~6% de
  aire, que además absorbe una sustitución de fuente.
- ✅ **L10** (nit) — regla doble de 2px en el único límite acciones/footer. **Arreglado** en U1: se
  quitó el `border-top` de `.bb__footer-line`; queda el `border-bottom` de `.bb__actions`, que es el
  que cierra un compartimento de `gap: 1px`. El `padding-top` se mantuvo para no colapsar el ritmo.

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
- ✅ **D2** (nit) — `>>>` literal en el manifiesto y en suplementos: guarnición de telemetría sobre
  sustrato de imprenta. **Cerrado en U5**, y la decisión fue **sacarlo de los dos lados**: §2 dice
  elegir UN modo por proyecto y no mezclarlos, y `>>>` es el dispositivo direccional del modo *Tactical
  Telemetry*. El manifiesto pierde el prefijo y la lista de suplementos pasa a `–`, que es puntuación
  de imprenta. Verificado: `>>>` restante → `false`.
  sobre sustrato de imprenta. El audit dice **elegir UN modo y no mezclar**.
- ✅ **D3** (warn) — `+` significaba **viñeta** en el hero e **incremento de precio** en la
  carta, a un scroll de distancia. **Arreglado**: `/` en el hero.
- ✅ **D4** (nit) — `®` y `©` inline a 0.7rem = texto legal, no elemento estructural. **Cerrado en
  U5**: los tres pasan a ser **marcas** (`.bb__mark`: más grandes que su vecino y elevados con
  `vertical-align`), o sea sellos sobre el rótulo en vez de texto legal corrido. Verificado: 3 marcas
  en el DOM. *(El año `© 2026` no era un bug de código: es `new Date().getFullYear()`.)*
- ✅ **D5** (warn) — **toda la degradación analógica del §7 ausente**: sin halftone, sin
  1-bit dithering, sin scanlines, sin grain. *"La sección más incumplida, y explica por qué
  las superficies leen vector-clean."* **Cerrado en U3**: las placas pasan a
  `grayscale(1) contrast(2.2) brightness(1.12)` — un rango 1-bit, sin medios tonos continuos que se
  lean como fotografía — con una **trama de puntos determinista** encima en `mix-blend-mode: multiply`
  (nunca opacidad: la dimensión Geometría del audit prohíbe translucidez y §7 pide *"low-opacity"*;
  el blend resuelve la contradicción). Más el **grain global** del §7, también por `multiply`.
  Sin scanlines a propósito: §7 las pide *"for terminal interfaces"* y esta página es Swiss Print.
- ✅ **D6** (nit) — sin cruces, códigos de barras ni franjas de advertencia. **Cerrado en U3** con
  los tres: cruces `+` sobre los extremos de cada regla de cabecera, código de barras como regla de
  colofón en el pie, y franja de advertencia sobre los suplementos. Los cuatro patrones son **tiles
  SVG, no gradientes** — un `repeating-linear-gradient` para fingir un código de barras sigue siendo
  un gradiente, y la dimensión Geometría los prohíbe. **El cuarto dispositivo del §6 (datos de cadena
  aleatorios tipo `REV 2.6` / `UNIT / D-01`) se descartó a conciencia**: inventar un número de revisión
  o un código de unidad en la página de un negocio real es exactamente la fabricación de contenido que
  ya nos costó caro con los parámetros de extracción. No se cambia integridad por un adorno.
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
- ✅ **P9** (nit) — `.bb__footer-note a` es el único link sin hover/focus/transition. **Arreglado**
  en U1: `transition` + hover/focus que **suben** el contraste (a `$bb-ink`, + underline) + outline
  propio en `:focus-visible`, y sumado al bloque `prefers-reduced-motion`.
- ✅ **P10** (nit) — `.bb__action:hover` a `#eae8e3` da ΔL de 0.035 en OKLab contra 0.06–0.12
  requeridos. **Primero** se arregló en U1 con el acento de fondo (ΔL ~0.55); **el dueño pidió después
  volver al marco**, así que **U6 lo dejó en el borde y nada más**. Sigue cumpliendo la remediación del
  audit por la puerta que el propio audit abre (*"or accept via another signal"*): un marco de tinta de
  2px sobre papel es una señal fuerte, y se dibuja con `outline` con offset negativo para no tocar el
  gutter de 1px (el error de G5). Verificado: `outline 2px solid #0a0a0a`, `offset -4px`, **sin cambio
  de `background`** en el estado.

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

## Plan de cierre — decidido en sesión 2

Cuatro unidades de trabajo, cada una un candidato de review chico. ⬜ pendiente · 🔄 en curso · ✅ cerrada.

### Decisiones tomadas

1. **Superficie (S2/S4/D5/D6): 1-bit + grain.** Las dos placas pasan a trama determinista 1-bit
   con `mix-blend-mode: multiply`; grain global también por `multiply`. El grain **no** se hace con
   `opacity`, porque la dimensión Geometría del audit prohíbe translucidez, aunque §7 pida
   "low-opacity": se resuelve con el modo de fusión, no con alfa.
   **La idea que ordena esto**: S2 y D5 son la misma causa. Las dos placas son oscuras
   *fotográficamente*, no por tinta. Con 1-bit, las cuatro masas oscuras pasan a **dos**: una
   reversión a tinta deliberada (la banda de sedes) + una sola familia fotográfica.
2. **Acento (C1): se mantiene el marrón de marca.** Es una desviación de **matiz**, respaldada por
   la medición del propio audit: el rojo del contrato falla AA en los dos sustratos (`#E61919`
   **4.22:1** sobre papel y **4.26:1** sobre tinta; `#FF2A2A` **3.39:1** sobre papel). Queda escrito
   en el archivo y acá.
3. **Mono (T3): se carga JetBrains Mono** (primera cara del §3.2), subset latino. Hoy
   `ui-monospace` resuelve como Consolas / SF Mono / DejaVu → tres anchos de avance distintos, así
   que la columna de corchetes y la de precios **no son reproducibles** entre máquinas.
4. **Espacio: sólo L2** (una gramática de columnas compartida). **L8 y L9 quedan como desviación
   documentada**: el bleed pelea con el presupuesto de `13.6vw` que ya se midió en T2 y arriesga
   scroll horizontal en mobile.
5. **CORRECCIÓN (feedback del usuario mirando la página en un monitor ancho): la página vuelve a
   sangre completa.** El usuario vio márgenes laterales y los rechazó: *"me gustaba la vista sin
   márgenes"*. Esos márgenes eran el cap de **L1** (`max-width: 1320px; margin-inline: auto` en
   `.bb__main`, commit `fb93c29`): a 1920px dejaba **300px** de papel muerto por lado y a 2560px,
   **620px**. Blackbird era la **única** página de la vidriera capada así (las otras usan el
   `.container` de Bootstrap, que es convención preexistente).

   **El audit se contradice, y eso hay que saberlo**: L1 pide una medida de página y **L9** marca como
   defecto que *"nada sangra"* — textual: atrapar el tipo macro perfectamente dentro del marco es
   *"el movimiento opuesto a sangrarlo, y el más frágil"*. No es una contradicción real: **L1 es una
   regla de medida de texto; L9 es una regla de composición.** Se resuelven en capas distintas.

   **Resolución**: no se capa la *página*, se capa la *medida del texto*. La página sangra de borde a
   borde (franja, bandas, placas, reglas) y el **ledger** se ata a una columna declarada de una
   grilla compartida. Ese es el movimiento de la imprenta suiza: la grilla ocupa todo el ancho, el
   texto respeta su medida. Arregla L1 **y** L2 con el mismo cambio.

### Unidades

| # | Unidad | Hallazgos | Archivos | Estado |
|---|---|---|---|---|
| U1 | Tipografía y estados | T5, T6, L10, P9, P10 + comentario de `R3-plate-filter-reachability` | `.scss` | ✅ |
| U2a | Sangre y medida | L1 (revertido y re-resuelto) | `.scss` | ✅ |
| U2b | Grilla declarada | L2 (parcial: unidad y regla declaradas, medida acota los conteos) | `.scss` | ✅ |
| U3 | Superficie | S1, S2, S4, D5, D6 + BB-R8 | `.scss`, `.html` | ✅ |
| U4 | Mono determinista | T3 | `.scss`, `index.html` | ✅ |
| U5 | Cierre y desviaciones | D2, D4 + BB-R9 + las disposiciones escritas | `.scss`, `.html`, `.ts` | ✅ |
| U6 | Ancho completo (revierte la medida) | L1 (desviación aceptada), L9, P10, hover de Pedidos | `.scss` | ✅ |

**U2 va antes que U3 a propósito**: conviene ver la página a sangre completa en 1920 y 2560px *antes*
 de agregar la trama 1-bit, porque el 1-bit interactúa con el ancho de la banda (S3 ya había marcado
 que una masa de acento a sangre es la que erosiona la escasez del acento).

### U2 — cerrada (U2a + U2b)

**El diseño final, en una frase**: todo lo que carga contenido se sienta en `$bb-measure` (1320px,
anclado a la izquierda); todo lo que es banda, placa o franja sangra. El espacio que la medida deja a
la derecha **es** el espacio negativo de la página. Se aplica **una sola vez**, como `max-width` en un
bloque agrupado, y no repetido por registro.

**La evolución del mecanismo vale como lección** (es lo más útil de esta unidad): el primer intento usó
`padding-right` en lugar de `max-width`, y era el mecanismo **correcto para ese estado intermedio** —
un `max-width` capa el elemento *y su regla*, así que la regla de 2px de una cabecera quedaba cortada a
mitad de página arriba de un registro todavía a sangre, y se leía como error. El padding encogía sólo
la caja de contenido, así que la regla sangraba y el texto adentro respetaba la medida.

**Ese truco dejó de ser el correcto en cuanto el usuario decidió medir también los registros de
celdas**: con todos los bloques en la misma columna, la regla de cada uno y su caja ya coinciden, y
mantener el padding sólo servía para dejar sangrando reglas que el usuario había pedido acortar. Se
reemplazó por `max-width` agrupado. **Moraleja: el mecanismo correcto depende del estado del diseño, no
de una preferencia general** — y el de la etapa anterior queda documentado acá para no volver a
inventarlo.

Dos defectos propios, encontrados **mirando el render** y no razonando:
1. Las cabeceras con `max-width` dejaban su regla cortada a 1320px arriba de un registro a sangre.
2. La matriz de alérgenos, sin medida, pasaba de 6 a 12 columnas a 2560px y su fila final dejaba una
   banda entera vacía *y con borde* — una regresión introducida al quitar el cap. El propio archivo ya
   explicaba por qué esa matriz usa bordes por celda y no el lecho de tinta: es la misma causa.

**Evidencia medida (no estimada)**: borde derecho de la nota de cabecera = borde derecho del precio =
**1284px** (o sea 1320 menos el inset de `$bb-pad`), a 2560 y a 1920px; registros de métodos, sedes,
pedidos y manifiesto en **1320px**; la lista de alérgenos en 1284px; `scrollWidth == innerWidth` en
2560, 1920 y **320** (sin scroll horizontal). Build exit 0, tests 31/31.

**U2b — qué se hizo de L2 y qué no.** Se hizo: los cuatro `minmax()` mágicos pasaron a **tokens
declarados** (`$bb-col-allergen/method/action/site`) con la regla escrita — *la unidad es el ancho más
chico que todavía aguanta lo más ancho que una celda de ese registro tiene que cargar* — y la medida
ahora **acota el conteo** de todos los registros, así que a pantalla ancha caen en 6 / 4 / 3 / 2
columnas sin ningún número suelto. Prueba de que el renombre es inerte: los valores compilados siguen
siendo `minmax(208px,1fr)`, `230px`, `240px`, `280px`, exactos.

**No se hizo, y se decidió a conciencia**: la alineación literal de pistas entre secciones (un sistema
de 12 pistas con `span` declarado por celda, o `subgrid`). Se evaluó en detalle y se descartó porque
reemplaza un mecanismo **auto-ajustado por construcción** (`auto-fill`/`auto-fit` + mínimo derivado del
contenido) por **4 o 5 breakpoints a mano por registro** — o sea degrada el mantenimiento para ganar
una coincidencia de bordes que hoy nadie ve. Queda disponible: si el usuario quiere el alineamiento
literal, son ~40 líneas de media queries y una verificación en 320/480/768/1024/1320/2560.

### U4 y U5 — cerradas

**U4 (T3)**: JetBrains Mono se carga en el `<link>` de Google Fonts que ya traía Inter — cero
infraestructura nueva, mismo mecanismo que el resto de la vidriera — y el stack del SO queda detrás
como fallback. La verificación que importa no es la vista sino `fonts.check()`: que la familia
*computada* diga `'JetBrains Mono'` no prueba que el archivo haya cargado, y una fuente que no carga
se ve igual (cae al fallback) mientras la grilla sigue sin ser reproducible.

**U5**: `–` en los suplementos, `>>>` fuera, las tres marcas `®`/`©` elevadas, y `detail` opcional en
`bar` con las dos cadenas vacías borradas. Además, en el archivo: **la interacción de la medida con
los bordes por celda de la matriz de alérgenos** (que el review levantó como
`R3-MEASURE-ALLERGEN-CELL-BORDERS`) y **las dos desviaciones deliberadas** de L9 (nada sangra) y L8
(dos composiciones asimétricas), escritas ahí para que un pase futuro no "arregle" una decisión.

### R3-LEADER-BASELINE — cerrado como falso positivo, MEDIDO

Se midió en el navegador, que es lo que el propio doc pedía ("no confiar ni descartarlo"). Método:
baseline del nombre = `top` del elemento + half-leading + `fontBoundingBoxAscent` del canvas con la
fuente computada; se compara contra el borde inferior del líder.

**Resultado: DELTA = −0.09px** — el borde del líder queda **0.09px por encima** de la baseline del
texto. La hipótesis del reviewer ("unos píxeles arriba") **no es alcanzable**: un span vacío
blockificado no tiene line box, así que por especificación su baseline se sintetiza desde el borde
inferior, y eso es exactamente el comportamiento observado. Sub-píxel, imperceptible, y coherente con
la medición física previa (la caja del líder mide ancho-de-pista × 1px). **Falso positivo.**

### U6 — ancho completo (revierte la medida de U2)

Feedback del dueño mirando la página: *"Antes todo cubría el ancho entero, está bien pero Carta debería
respetarlo, el hero también, En la barra también, Pedidos también. El hover que tienen teléfono, email e
instagram me gustaba como antes, que resaltás el borde solamente. El footer tampoco tiene el ancho
completo."*

Se eliminó **la medida entera** (los nueve selectores agrupados y el token `$bb-measure`, sin dejar
declaraciones muertas) y se subió el techo del título del hero. Verificado midiendo:

| | 1920px | 2560px |
|---|---|---|
| Título del hero (ancho de texto vs disponible) | **1696 / 1804 = 94.0%** | **2260 / 2444 = 92.5%** |
| `.bb__head` / `.bb__groups` / `.bb__allergens` | **1920** = ancho completo | **2560** |
| `scrollWidth` vs `innerWidth` | igual ✓ | igual ✓ |

El hover de las tres celdas de Pedidos pasó a **marco y nada más** (`outline` inset, sin `background`,
sin subrayado, sin transición), verificado forzando el estado y leyendo el estilo computado: `outline 2px
solid rgb(10,10,10)`, `offset -4px`, `background rgb(244,244,240)` **sin cambio**.

**Lo que el título pasó a hacer, y por qué es una fórmula y no un número**: antes era
`clamp(2.4rem, 13.6vw, 13rem)`, y el techo de `13rem` es lo que dejaba media pantalla vacía a partir de
1530px. Ahora resuelve `(100vw − 2 × $bb-pad) / 6.2`: el 6.2 es el avance medido de la palabra (5.8420
em) más ~6% de aire, así que el título llena en la misma proporción a 320px que a 2560px, y el aire
es lo que absorbe una fuente de fallback más ancha que Inter sin volver a amputar la D.

**Dos observaciones honestas sobre el resultado**:
1. **El defecto L1 vuelve**, y ahora es una desviación aceptada y escrita en el archivo: sin medida, el
   líder de puntos puede separar el precio del nombre por todo el ancho de la pantalla.
2. **La matriz de alérgenos a 2560px vuelve a repartirse en 12 columnas** y su fila final queda parcial
   (el borde por celda evita el bloque de tinta, que es lo que el archivo ya explicaba). A 1920px se ve
   bien; si molesta a pantallas muy anchas, la unidad `$bb-col-allergen` es la perilla.

### U3 — cerrada

**El movimiento que ordena la unidad**: S2 y D5 eran la misma causa. Las cuatro masas oscuras eran la
franja y la banda de sedes (tinta real) **más las dos placas, que eran oscuras fotográficamente y no
por tinta**, cada una en su propia tonalidad. Con las placas pasando por una trama 1-bit determinista
las masas bajan de cuatro a dos, y la página pasa de dos familias fotográficas a una. El §7 pide
justamente eso para Swiss Print (`1-bit dithering` con `multiply`), no las scanlines del modo terminal.

**La contradicción del contrato, resuelta sin romper ninguno de los dos lados**: §7 pide grain
*"low-opacity"* y la dimensión Geometría del audit prohíbe `opacity<1` (era un PASS, G4). Se resuelve
con `mix-blend-mode: multiply`, que da el mismo resultado sin alfa. Y el tile de ruido lleva una curva
`feComponentTransfer` que lo mantiene **casi blanco**: el `feTurbulence` crudo promedia gris medio, y
multiplicar la página entera por gris medio la oscurecería a la mitad. Ninguno de los dos detalles se ve
en el resultado, y sin ellos el cambio era un error visible.

**Corrección terminológica que importa**: la trama es una **trama**, no un *halftone* de verdad — CSS
no puede modular el tamaño del punto según el tono. El comentario del archivo lo dice así, para no
dejar una afirmación que no coincide con la realidad (el error más frecuente de este repo).

**Evidencia**: en el render a 2560px se ven la trama sobre las placas, el grain en multiply, las cruces
en los extremos de las cuatro reglas de cabecera (blancas dentro de la banda de tinta), la franja sobre
`[ SUPLEMENTOS ]` y el código de barras en el pie. A 320px `scrollWidth == innerWidth`. En el CSS
compilado: `filter:grayscale(1) contrast(2.2) brightness(1.12)` y exactamente **2**
`mix-blend-mode:multiply` (la trama de la placa y el grain de la página). Guardas del audit: sin
`rgba(`/`hsla(`/`backdrop-filter`/gradientes (el único hit de `gradient` está **dentro del comentario
que explica por qué no se usan**), sin `opacity<1`, y `border-radius` sólo en el reset a `0`.
Build exit 0, tests 31/31.

### U1 — cerrada

Build `exit 0`, **31/31 tests en 7 archivos**, y los 7 cambios confirmados línea por línea por un
verificador independiente. Cambios: `line-height: 0.82 → 0.9`; dos `letter-spacing` negativos
borrados por debajo de 32px (con la regla escrita para que no vuelvan); el borde duplicado del footer
reducido a uno; el link del footer con estados que **suben** contraste; el hover de acción pasado a
`$bb-coffee` (ΔL 0.035 → ~0.55, y es el acento marcando *acción*, que es su función); y las dos
frases del comentario que afirmaban algo que `brightness(0.82)` no puede hacer.

### Disposiciones — se cierran sin arreglar, con razón verificable

- **C1** — desviación de matiz, respaldada por contraste (ver arriba).
- **L8 / L9** — desviación deliberada: el documento prioriza que nada sangre antes que el
  arquetipo, porque el bleed rompe a 320px y compite con el margen óptico del hero
  (WHAT-NOT-TO-CHANGE #4).
- **P6** — no accionable en el componente: `<!---->`, `_nghost-*`, `ngh` y `routerlink` los emite
  Angular. El `<title>` que anunciaba *"copia para revisión"* era de la copia que armé para
  alimentar el audit, no del repo. Los `<meta>` escasos también son de esa copia.
- **S1** — el audit mismo lo declara *dispositivo legítimo*; se cierra junto con S2.
- **R3-ROUND-SEQUENCE / R3-HOVER-COLOR / R3-RULE-VARS / R3-NOWRAP-FLOOR** — el sobre del review trae
  `id`/`lens`/`location`/`severity`/`disposition` **pero ninguna descripción**. Es un **hueco de
  evidencia**, no un hallazgo accionable: cualquier cambio sería adivinar.
- **R3-plate-filter-reachability** — único accionable de los R3: el comentario del bloque promete
  *"de papel a tinta"* y `brightness(0.82)` es multiplicativo, así que nunca llega a `#0a0a0a`. Se
  corrige el comentario en U1 — y el filtro desaparece en U2 con el 1-bit.
- **BB-R8 / BB-R9** — cosméticos, viajan con U2 y U4 en vez de merecer un ciclo de review propio
  (regla ya establecida: *no perseguir nits sueltos*).
- **R3-LEADER-BASELINE** — el mapeo determinó que el desprendimiento **ya está arreglado** por
  `align-items: baseline`, y que la desviación física máxima del líder vacío es **1px**: su caja mide
  exactamente *ancho de pista × 1px* (0 de contenido + el borde punteado), así que el peor caso es
  `[baseline−1px, baseline]`. **Se mide en navegador antes de tocar nada**; si no hay desvío
  visible, se cierra como falso positivo.

## Pendientes que salieron de los reviews nativos

- ✅ **R3-LEADER-BASELINE** (WARNING) — **cerrado como falso positivo, medido**: DELTA = **−0.09px**
  (el borde del líder queda 0.09px por encima de la baseline del nombre). Sub-píxel, imperceptible, y
  es exactamente lo que predice la especificación para un span vacío sin line box. Ver la sección
  "R3-LEADER-BASELINE — cerrado como falso positivo, MEDIDO".
- ✅ **R3-plate-filter-reachability** (SUGGESTION) — cerrado en U1 corrigiendo el comentario que
  prometía un rango que `brightness()` no puede alcanzar, y el filtro entero desapareció en U3 al
  pasar las placas a la trama 1-bit.
- ⬜ **R3-ROUND-SEQUENCE / R3-HOVER-COLOR / R3-RULE-VARS / R3-NOWRAP-FLOOR** — el sobre trae
  `id`/`lens`/`location`/`severity`/`disposition` **sin descripción**. **Hueco de evidencia, no
  hallazgo accionable.** El mapeo propuso una línea candidata para cada uno con el nivel de confianza
  marcado como conjetura; no se tocan sin el texto del sobre.
- ✅ **BB-R9** — cerrado en U5: `bar` tiene tipo explícito con `detail?` opcional y se borraron las dos
  cadenas vacías.
- ✅ **BB-R8** — los dos `alt` de las placas eran casi iguales y las placas son **textura decorativa**,
  así que el alt correcto es **vacío**. Cerrado en U3: ambos pasaron a `alt=""`.

### Del review del rango de cierre (`review-33208a1fea43b7ca`, aprobado y quemado)

Tres hallazgos, **todos `informational`**: ninguno abrió corrección, ninguno reabre el candidato, y por
contrato se tratan como trabajo posterior — **nunca** como motivo para re-correr el review.

- ⬜ **`R3-MULTIPLY-Z-INDEX-OVERLAY`** (WARNING, `scss:142-155`) — la capa de grain a página completa
  con `mix-blend-mode`. Es **el riesgo que ya estaba marcado antes de correr el review** (compositing
  de una capa de blend sobre la franja sticky que repinta al scrollear). Quedó **documentado en el
  archivo como el precio aceptado** del grain unificado que pide §7, y anotado como lo primero a
  revisar si el scroll se siente pesado.
- ⬜ **`R3-MEASURE-ALLERGEN-CELL-BORDERS`** (WARNING, `scss:926-935`) — la interacción entre la medida
  y los bordes por celda de la matriz de alérgenos. **Documentado en el archivo**: la medida acorta el
  registro pero nunca los bordes propios de las celdas, y la fila final parcial es el resultado
  esperado, no un desborde.
- ⬜ **`R3-SCREEN-PSEUDO-OVER-PLATE`** (SUGGESTION, `scss:403-410`) — el pseudoelemento de la trama
  sobre la placa. **Documentado en el archivo**: pinta por encima de la imagen a propósito, porque la
  trama es lo que convierte una foto contrastada en una plancha impresa.

**Dato de proceso del review**: ofrecido en **78 archivos / 3843 inserciones** (`base-ref e97e9bd`, la
8ª vez que no avanza) y re-anclado a **3 archivos / 490 líneas**. Tier `medium`, **un solo lente**
(`review-reliability`): el conjunto de lentes lo elige el riesgo, no la cantidad de líneas.

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
