# Genera public/assets/seo-preview.jpg (1200x630, estandar Open Graph).
# Usa GDI+ via System.Drawing: sin dependencias nuevas en el proyecto.
# Paleta tomada de CONTEXT.md (tema oscuro HH Studio).

Add-Type -AssemblyName System.Drawing

$OUT = "C:\Development\HHStudios\muestras-hh\muestras-hhstudio\public\assets\seo-preview.jpg"

$W = 1200
$H = 630

$bmp = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# --- Paleta (CONTEXT.md) ---
function C($r, $gr, $b, $a) { [System.Drawing.Color]::FromArgb($a, $r, $gr, $b) }
$bgTop    = C 18 20 24 255      # #121418
$bgBot    = C 30 34 41 255      # hacia #1e2229
$gold     = C 229 204 152 255   # #e5cc98 accent
$white    = C 241 245 249 255   # #f1f5f9 text primary
$secondary= C 160 170 178 255   # #a0aab2 text secondary
$muted    = C 100 116 139 255   # #64748b text muted
$border   = C 45 50 60 255      # #2d323c

# --- Fondo: gradiente vertical sutil ---
$rect = New-Object System.Drawing.Rectangle(0, 0, $W, $H)
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $bgTop, $bgBot, 90)
$g.FillRectangle($bgBrush, $rect)
$bgBrush.Dispose()

# --- Glow dorado: radial suave. GDI+ no tiene un radial con alfa limpio, y un
# SolidBrush deja el borde de la elipse visible como un circulo. Se aproxima
# apilando elipses concentricas de alfa bajo: el centro acumula capas y la
# caida hacia el borde queda continua. ---
# --- Se quito el glow dorado. A alfa bajo, el oro (229,204,152) sobre el fondo
# azulado (#121418) produce un cast oliva/verdoso que ensucia la esquina y
# compite con el texto. Una tarjeta casi negra con jerarquia dorada se ve mas
# limpia y mas premium que un manchon de color. ---

# --- Grilla de puntos tenue (textura de estudio, no de stock) ---
$dot = New-Object System.Drawing.SolidBrush((C 45 50 60 90))
for ($x = 900; $x -lt 1180; $x += 22) {
  for ($y = 400; $y -lt 600; $y += 22) {
    $g.FillEllipse($dot, $x, $y, 3, 3)
  }
}
$dot.Dispose()

# --- Formato tipografico preciso para poder medir y trackear ---
$sf = [System.Drawing.StringFormat]::GenericTypographic
$sf.FormatFlags = $sf.FormatFlags -bor [System.Drawing.StringFormatFlags]::MeasureTrailingSpaces

function Draw-Tracked($gfx, $text, $font, $brush, $x, $y, $tracking) {
  $cx = $x
  foreach ($ch in $text.ToCharArray()) {
    $s = [string]$ch
    $gfx.DrawString($s, $font, $brush, $cx, $y, $sf)
    $sz = $gfx.MeasureString($s, $font, [System.Drawing.PointF]::new(0, 0), $sf)
    $cx += $sz.Width + $tracking
  }
  return $cx
}

$M = 88  # margen izquierdo

# --- Wordmark: linea dorada + "HH STUDIO" con tracking ---
$accentPen = New-Object System.Drawing.Pen($gold, 3)
$g.DrawLine($accentPen, $M, 104, $M + 34, 104)
$accentPen.Dispose()

$fWordmark = New-Object System.Drawing.Font("Segoe UI", 17, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$goldBrush = New-Object System.Drawing.SolidBrush($gold)
$null = Draw-Tracked $g "HH STUDIO" $fWordmark $goldBrush ($M + 52) 95 5.2

# --- Titular en dos tonos ---
$fHead = New-Object System.Drawing.Font("Georgia", 76, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString("Showcase de", $fHead, (New-Object System.Drawing.SolidBrush($white)), $M, 168, $sf)
$g.DrawString("Proyectos", $fHead, $goldBrush, $M, 262, $sf)

# --- Separador ---
$sepPen = New-Object System.Drawing.Pen($border, 2)
$g.DrawLine($sepPen, $M, 392, $M + 1040, 392)
$sepPen.Dispose()

# --- Bajada ---
$fSub = New-Object System.Drawing.Font("Segoe UI", 27, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$secBrush = New-Object System.Drawing.SolidBrush($secondary)
$g.DrawString("Demos funcionales por rubro, listos para explorar", $fSub, $secBrush, $M, 428, $sf)

# --- Rubros ---
# Cada rubro se dibuja por separado y el separador es una elipse explicita.
# Construir la linea concatenando [char] daba problemas y no permite controlar
# el tamano del punto, que a este color/tamano de texto era invisible.
# Los no-ASCII van por code point: PowerShell 5.1 lee este archivo como ANSI.
$I = [char]0x00ED   # i acentuada
$E = [char]0x00E9   # e acentuada

$fRub = New-Object System.Drawing.Font("Segoe UI", 21, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$rubBrush = New-Object System.Drawing.SolidBrush((C 152 164 177 255))
$dotBrush = New-Object System.Drawing.SolidBrush((C 150 134 100 255))

# NOTA DE MANTENIMIENTO: los literales de array multilinea con @(...) en este
# archivo se parsean como UN STRING si el archivo tiene finales de linea
# mezclados (LF del write + CRLF de ediciones posteriores). Eso hizo que
# $rubros.Count fuera 1 y que el loop dibujara todo como una sola palabra, sin
# separadores. Mantener los arrays en UNA SOLA LINEA.
$rubros = @(("Cl" + $I + "nica"), "Salud", ("Carpinter" + $I + "a"), "Reformas", "Electricista", ("Est" + $E + "tica"), ("Pasteler" + $I + "a"))

$rx = $M
$ry = 478
for ($k = 0; $k -lt $rubros.Count; $k++) {
  $sfMeasure = $g.MeasureString($rubros[$k], $fRub, [System.Drawing.PointF]::new(0, 0), $sf)
  $g.DrawString($rubros[$k], $fRub, $rubBrush, $rx, $ry, $sf)
  $rx += $sfMeasure.Width
  if ($k -lt $rubros.Count - 1) {
    $g.FillEllipse($dotBrush, ($rx + 9), ($ry + 10), 5, 5)
    $rx += 24
  }
}

# --- Pie: dominio ---
$fFoot = New-Object System.Drawing.Font("Segoe UI", 22, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString("muestras.hhstudio.es", $fFoot, $goldBrush, $M, 546, $sf)

# --- Limpieza ---
$fWordmark.Dispose(); $fHead.Dispose(); $fSub.Dispose(); $fRub.Dispose(); $fFoot.Dispose()
$goldBrush.Dispose(); $secBrush.Dispose(); $rubBrush.Dispose(); $dotBrush.Dispose()
$g.Dispose()

$bmp.Save($OUT, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Dispose()

$fi = Get-Item $OUT
Write-Output ("OK: " + $fi.FullName)
Write-Output ("bytes: " + $fi.Length)
