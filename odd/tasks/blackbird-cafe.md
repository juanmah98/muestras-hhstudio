# odd/tasks/blackbird-cafe.md — Blackbird Café (página nueva, brutalismo)

> **Objetivo**: una landing de muestra nueva para la vidriera, con identidad
> **brutalista** y contenido **real** de Blackbird Café (Valencia).
>
> **Fuentes de contenido** (provistas por el usuario):
> - Web: `https://www.blackbirdvlc.com`
> - Instagram: `https://www.instagram.com/blackbirdvlc/`
> - Carta (PDF): `https://dd0447e4-87c1-42ff-8901-e3e0a6b86a8a.filesusr.com/ugd/b8bd8b_84e3e19ad5d04391a392d56261c34b79.pdf`

## Restricciones heredadas del proyecto (verificadas hoy)

- **Cada demo es una identidad visual distinta y eso es el producto.** Nada de unificar.
- **`border-radius: 0`** en toda la página: es la regla central del brutalismo y a la vez lo
  que más la diferencia de las 7 páginas premium existentes.
- **Techo de CSS**: el budget mide el CSS **compilado**, no el SCSS crudo. El error está en
  **38 kB** y el warning en **31 kB**. Referencia medida: `pasteleria` tiene 43.6 kB de SCSS y
  compila a 32.18 kB. **Hay que medir el compilado, no estimar.**
- **Fuentes**: se cargan 5 familias globalmente en `src/index.html`. `Inter` ya está como
  variable `wght@100..900`, así que **Inter Black sale gratis**. No se agregan familias nuevas.
- **Nada de datos inventados** sobre un negocio real.

## Decisión de identidad (aprobada por el usuario)

**Arquetipo: Swiss Industrial Print (sustrato CLARO).** Elegido sobre el oscuro porque
`carpinteria` (`#1a1513`) y `electricista` (`#050505`) ya ocupan el espacio oscuro — este
último es literalmente brutalismo industrial oscuro con acento ámbar — y porque el brief de
Blackbird **es blanco y negro**. El skill prohíbe mezclar sustrato claro y oscuro.

### Tokens (contrastes MEDIDOS, no estimados)

| Token | Hex | Uso | Contraste verificado |
|---|---|---|---|
| `$bb-paper` | `#F4F4F0` | Fondo, papel mate | — |
| `$bb-paper-deep` | `#EAE8E3` | Bloques alternos | — |
| `$bb-ink` | `#0A0A0A` | Tinta, texto, bordes, bandas macizas | 17.96:1 sobre papel ✅ |
| `$bb-ink-soft` | `#4A4A46` | Texto secundario | 8.07:1 sobre papel ✅ |
| `$bb-coffee` | `#6B4423` | **Único acento**, sobre papel | 7.69:1 sobre papel ✅ |
| `$bb-coffee-lift` | `#C08A5E` | El **mismo matiz**, solo sobre bandas de tinta | 6.64:1 sobre `#0A0A0A` ✅ |

> **Por qué dos marrones.** El skill exige **un solo acento**, y se respeta: es **un matiz** con
> dos luminosidades. `#6B4423` sobre tinta da **3.55:1 y falla**; `#C08A5E` sobre papel da
> **3.5:1 y también falla**. Un valor único no puede servir a los dos sustratos.

Sin gradientes, sin sombras, sin translucidez. Ningún `border-radius`.

### Tipografía

- **Macro** (titulares estructurales): `Inter` 900, mayúsculas, `letter-spacing: -0.04em`,
  `line-height: 0.88`, `clamp(3.5rem, 12vw, 11rem)`.
- **Micro** (datos, nav, metadatos): stack monoespaciado del sistema, mayúsculas,
  `letter-spacing: 0.05–0.1em`, `0.7–0.875rem`.
- Utilidades del lenguaje: marcas `[ ]`, `>>>`, cruces `+`, códigos de unidad, reglas `<hr>`
  a todo el ancho, y `display: grid; gap: 1px` sobre fondo tinta para generar líneas de 1px
  sin declarar bordes.

## Contenido real extraído de la carta (PDF, 3 páginas)

**Bebidas de café** — una sola taza, café de especialidad, de temporada, recién tostado por
micro-tostadores. Se pide **en barra**.

`Espresso 2.3 · Americano 2.3 · Cortado 2.4 · Café con leche 2.8 · Flat white 3.2 ·
Iced latte 3.5 · Iced coffee 2.5 · Filtro (batch brew) 2.2(S) / 3.7(L) · Cold brew 3.5`
Suplemento leches vegetales (avena, coco, soja) +0.30 · Grande +1

**Otras calientes** — `Chocolate caliente (Madagascar 70% · Puchero) 4 · Chai latte Minor
Figures (soja) 4 · Matcha latte 3.5 · Infusiones a granel (La Petit Planethé) 3`

**Fríos** — `Limonada casera con maracuyá 4 · Zumo de naranja 4.5 · Licuado de naranja,
zanahoria, manzana y jengibre 6 · Agua de coco 100% natural (520 ml) 4.5 ·
Cerveza Tyris (Blonde o IPA) 4 · Fritz Kola 3.5 · Agua / con gas 2 / 2.2`

**Tostadas** — `Tomate y AOVE 4` (+avocado +3.8, +huevo +2.5) ·
`Aguacate 12` (tomates cherry, queso de cabra, lima y brotes; opción vegana con tahini)

**Huevos** — `Huevos turcos 10.5` (dos a la plancha, yogur aliñado, mantequilla de chile
aleppo y eneldo, con pan y ensalada de pepino cítrica)

**Sandwiches** — `Grilled cheese 9.5` (scamorza ahumada, emmental, cebolleta, salsa tatemada
ranchera, jalapeños encurtidos caseros) · `Breakfast sandwich 12` (longaniza italiana casera,
huevo, mayo paprika, rúcula) · `Mixto 9.5` (masa madre, emmental, jamón, mostaza dijon) ·
`César 12` · `Bacon y huevo 11.5`

**Dulce** — `Granola casera 8.5` · `Tostada de mantequilla y mermelada 5` ·
`French toast 9` (pan casero de croissant, sirope de arce, mascarpone)

**Alérgenos**: leyenda numerada del 1 al 14 (gluten, crustáceos, huevos, pescados, cacahuete,
soja, lácteos, frutos de cáscara, apio, mostaza, sésamo, sulfitos, moluscos, altramuces).
Cada plato de la carta trae sus números entre paréntesis.

> **Esto es el mejor activo de la página.** La carta real **ya es un documento técnico**:
> precios, tallas, suplementos `+€` y códigos de alérgeno. Es exactamente el material que el
> brutalismo industrial quiere exhibir. La sección de carta va a ser el centro de la página.

## Datos de contacto

| Dato | Valor | Estado |
|---|---|---|
| Sede 1 — Ruzafa | `C/ de la Reina Na Maria, 7 — L'Eixample, 46006 València` | ✅ 4 fuentes |
| Sede 2 — Little Blackbird | `C/ de les Danses, 2 — Ciutat Vella, 46001 València` | ✅ 2 fuentes (El Carmen) |
| Teléfono | `+34 960 05 10 90` | ✅ |
| Email | `blackbirdvalencia@gmail.com` | ✅ |
| Instagram | `@blackbirdvlc` | ✅ |
| Tagline | *Pastelería artesana / Café de especialidad · From scratch bakery / Specialty coffee* | ✅ |
| Hashtag propio | `#madefresheveryday` | ✅ |

### Horarios — RESUELTO por el usuario: horario de verano

Fuente elegida: **su publicación de Facebook del 28/06/2026**, que es la más reciente y cubre
las dos sedes. Como son **estacionales**, la página los muestra rotulados como
**`HORARIO DE VERANO`** — presentarlos como permanentes sería desinformar.

| Sede | Horario de verano |
|---|---|
| Ruzafa (Reina Na Maria, 7) | todos los días `9:00 – 15:30` (cocina cierra 15:00) |
| Little Blackbird (de les Danses, 2) | todos los días `9:30 – 14:20` |

> **Conflicto descartado, y por qué importa.** La web declara *Lun–Dom 9–19.30, martes
> cerrado* y HappyCow coincide; CoffeeLobo declara para Little Blackbird `09:30–14:00 /
> 14:30–16:30` (y hasta 19:30 de jueves a domingo). **Tres fuentes, tres horarios.** El
> usuario eligió la publicación propia más reciente. Es la única de las tres que el negocio
> escribió sobre sí mismo y con fecha.

## Estructura de la página (7 secciones)

1. **Franja técnica** — pegajosa, monoespaciada: estado, `VALENCIA / ES`, `#madefresheveryday`
2. **Hero** — "BLACKBIRD" en macro sangrando la grilla + tira de datos mono
3. **Manifiesto** — bloque de declaración con espacio negativo asimétrico
4. **La carta** — tabla brutalista con los precios reales y los códigos de alérgeno
5. **Métodos** — compartimentos con proporción y temperatura en mono
6. **El local** — **banda negra maciza** invertida con dirección y contacto
7. **Pedidos** — botones cuadrados, borde grueso, hover en acento

**Imágenes: mínimo y tratadas.** El skill dice que en brutalismo la imaginería es *secundaria*
y la tipografía es la infraestructura. Se usan **2–3 imágenes como máximo**, con tratamiento
duotono papel/tinta. Esto además esquiva el problema de resolución que ya nos costó trabajo.

## Tareas

- [ ] **B1** — Scaffold: `src/app/pages/blackbird-cafe/` (.ts/.html/.scss) + ruta en
  `app.routes.ts` + entrada en el índice del home + `SeoService` en el constructor.
- [ ] **B2** — Tokens de diseño y tipografía (macro Inter 900 + micro mono). Sin
  `border-radius`, sin gradientes, sin sombras.
- [ ] **B3** — Secciones 1–3: franja técnica, hero, manifiesto.
- [ ] **B4** — Sección 4: **la carta** como tabla brutalista, con la leyenda de 14 alérgenos.
- [ ] **B5** — Secciones 5–7: métodos, local (banda invertida), pedidos.
- [ ] **B6** — Tarjeta OG propia en `tools/make-og-image.ps1` + regeneración.
- [ ] **B7** — Verificación: build, **medición del CSS compilado contra el techo de 38 kB**,
  prerender de la ruta nueva, tests, y `CONTEXT.md` actualizado (tabla de rutas + fuentes).
- [ ] **B8** — Imágenes (2–3, duotono) si aportan. **Opcional y al final**: la página puede
  sostenerse sin imágenes, que es lo más fiel al arquetipo.

## Decisiones pendientes del usuario

- [x] **Horarios**: el **horario de verano** del Facebook (ver arriba).
- [x] **Segunda sede**: **sí**, se incluyen las dos (Ruzafa y Little Blackbird).

Nada pendiente: **el contenido está completo y trazable a fuentes**.
