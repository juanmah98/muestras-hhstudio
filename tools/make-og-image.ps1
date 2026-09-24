# Generates the Open Graph cards for the HH Studio showcase (1200x630).
#
# Emits:
#   public/assets/seo-preview.jpg   -> site card ("Showcase de Proyectos")
#   public/assets/og/<slug>.jpg     -> one card per demo, using that demo's palette
#
# The site card and every demo card share a single drawing function and one
# measured layout, so they stay consistent. Cards are differentiated by color,
# by serif-vs-sans headline and by a low-key layout accent.
#
# Regenerate from the repository root:
#   powershell -ExecutionPolicy Bypass -File tools/make-og-image.ps1
#
# Uses GDI+ via System.Drawing: no new project dependencies. System fonts only:
# Georgia (serif) and Segoe UI (sans). The brand webfonts (Playfair Display,
# Cormorant Garamond, Space Grotesk) are intentionally not installed, shipped or
# embedded (decision T10). The site palette comes from CONTEXT.md (HH Studio
# dark theme).

Add-Type -AssemblyName System.Drawing

$ROOT     = Split-Path -Parent $PSScriptRoot
$OUT_SITE = Join-Path $ROOT "public\assets\seo-preview.jpg"
$OUT_DIR  = Join-Path $ROOT "public\assets\og"

$W = 1200
$H = 630
$M = 88                      # left/right margin
$CONTENT_W = $W - (2 * $M)   # usable text width

# --- Color helpers ---

# Opaque color from explicit channels (kept for the original site palette).
function C($r, $gr, $b, $a) { [System.Drawing.Color]::FromArgb($a, $r, $gr, $b) }

# Opaque color from a "#rrggbb" string.
function HexColor($h) {
  $s = $h.TrimStart('#')
  $r  = [Convert]::ToInt32($s.Substring(0, 2), 16)
  $gr = [Convert]::ToInt32($s.Substring(2, 2), 16)
  $b  = [Convert]::ToInt32($s.Substring(4, 2), 16)
  return [System.Drawing.Color]::FromArgb(255, $r, $gr, $b)
}

# Same color at a different alpha.
function WithAlpha($c, $a) {
  return [System.Drawing.Color]::FromArgb($a, $c.R, $c.G, $c.B)
}

# Lighten every channel by $amount (clamped) to build a subtle gradient.
function Lighten($c, $amount) {
  $r  = [Math]::Min(255, ([int]$c.R + $amount))
  $gr = [Math]::Min(255, ([int]$c.G + $amount))
  $b  = [Math]::Min(255, ([int]$c.B + $amount))
  return [System.Drawing.Color]::FromArgb(255, $r, $gr, $b)
}

# Accented characters by code point: PowerShell 5.1 reads this file as ANSI, so
# every non-ASCII character must be produced with [char]0x.... .
$Aacute = [char]0x00C1   # A with acute
$Eacute = [char]0x00C9   # E with acute
$Iacute = [char]0x00CD   # I with acute
$eacute = [char]0x00E9   # e with acute
$iacute = [char]0x00ED   # i with acute
$oacute = [char]0x00F3   # o with acute

# --- Shared drawing helpers ---

# Precise typographic format so text can be measured and tracked consistently.
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

# Largest font size (down to a floor) at which every text fits $maxWidth.
function New-FittedFont($gfx, $texts, $family, $style, $size, $maxWidth) {
  $s = [int]$size
  while ($s -gt 10) {
    $f  = New-Object System.Drawing.Font($family, $s, $style, [System.Drawing.GraphicsUnit]::Pixel)
    $ok = $true
    foreach ($t in $texts) {
      $w = $gfx.MeasureString($t, $f, [System.Drawing.PointF]::new(0, 0), $sf).Width
      if ($w -gt $maxWidth) { $ok = $false; break }
    }
    if ($ok) { return $f }
    $f.Dispose()
    $s -= 2
  }
  return New-Object System.Drawing.Font($family, $s, $style, [System.Drawing.GraphicsUnit]::Pixel)
}

# Low-key layout accent in the empty lower-right area. Deliberately subtle: the
# brand line and the headline must dominate at thumbnail size.
function Draw-Motif($g, $card) {
  $mc = $card.MotifColor
  switch ($card.Motif) {
    'grid' {
      # Faint dot grid (studio texture, not stock).
      $dot = New-Object System.Drawing.SolidBrush($mc)
      for ($x = 900; $x -lt 1180; $x += 22) {
        for ($y = 400; $y -lt 600; $y += 22) {
          $g.FillEllipse($dot, $x, $y, 3, 3)
        }
      }
      $dot.Dispose()
    }
    'rings' {
      $pen = New-Object System.Drawing.Pen($mc, 2)
      $g.DrawEllipse($pen, 880, 330, 320, 320)
      $g.DrawEllipse($pen, 940, 390, 200, 200)
      $g.DrawEllipse($pen, 1000, 450, 80, 80)
      $pen.Dispose()
    }
    'bars' {
      $brush = New-Object System.Drawing.SolidBrush($mc)
      $g.FillRectangle($brush, 880, 400, 220, 8)
      $g.FillRectangle($brush, 940, 440, 160, 8)
      $g.FillRectangle($brush, 1000, 480, 100, 8)
      $g.FillRectangle($brush, 1050, 520, 50, 8)
      $brush.Dispose()
    }
    'block' {
      $brush = New-Object System.Drawing.SolidBrush($mc)
      $g.FillRectangle($brush, 940, 380, 180, 180)
      $brush.Dispose()
      $outline = (WithAlpha $card.Accent 150)
      $pen = New-Object System.Drawing.Pen($outline, 2)
      $g.DrawRectangle($pen, 910, 350, 180, 180)
      $pen.Dispose()
    }
  }
}

# --- Shared card layout ---
# Draw-Card owns the layout for every card; a card definition only supplies
# palette, copy, font choice and the accent motif.
function Draw-Card($card) {
  $bmp = New-Object System.Drawing.Bitmap($W, $H)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode   = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

  # --- Background: subtle vertical gradient ---
  $rect = New-Object System.Drawing.Rectangle(0, 0, $W, $H)
  $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $card.BgTop, $card.BgBot, 90)
  $g.FillRectangle($bgBrush, $rect)
  $bgBrush.Dispose()

  # --- Layout accent (drawn under all text) ---
  # The radial gold glow was removed: at low alpha the gold (229,204,152) over
  # the bluish background (#121418) produces an olive/green cast that dirties
  # the corner and competes with the text. A nearly black card with golden
  # hierarchy reads cleaner and more premium than a color smear. GDI+ has no
  # clean alpha radial anyway, and a SolidBrush would leave the ellipse edge
  # visible as a circle.
  Draw-Motif $g $card

  # --- Brushes ---
  $primaryBrush = New-Object System.Drawing.SolidBrush($card.TextPrimary)
  $secondBrush  = New-Object System.Drawing.SolidBrush($card.TextSecondary)
  $brandBrush   = New-Object System.Drawing.SolidBrush($card.BrandColor)
  $footerBrush  = New-Object System.Drawing.SolidBrush($card.FooterColor)
  $head2Brush   = New-Object System.Drawing.SolidBrush($card.Headline2Color)

  # --- Wordmark: accent rule + brand line with tracking ---
  $accentPen = New-Object System.Drawing.Pen($card.BrandColor, 3)
  $g.DrawLine($accentPen, $M, 104, $M + 34, 104)
  $accentPen.Dispose()

  $fBrand = New-Object System.Drawing.Font("Segoe UI", 17, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $null = Draw-Tracked $g $card.Brand $fBrand $brandBrush ($M + 52) 95 5.2

  # --- Headline in two tones (line 1 primary, line 2 signature accent) ---
  $headTexts = @($card.Headline1, $card.Headline2)
  $fHead = New-FittedFont $g $headTexts $card.HeadlineFont $card.HeadlineStyle 76 $CONTENT_W
  $g.DrawString($card.Headline1, $fHead, $primaryBrush, $M, 168, $sf)
  $g.DrawString($card.Headline2, $fHead, $head2Brush, $M, 262, $sf)

  # --- Separator ---
  $sepPen = New-Object System.Drawing.Pen((HexColor "#2d323c"), 2)
  $g.DrawLine($sepPen, $M, 392, $M + 1040, 392)
  $sepPen.Dispose()

  # --- Subline ---
  $subTexts = @($card.Subline)
  $fSub = New-FittedFont $g $subTexts "Segoe UI" ([System.Drawing.FontStyle]::Regular) 27 $CONTENT_W
  $g.DrawString($card.Subline, $fSub, $secondBrush, $M, 428, $sf)

  # --- Rubros row (site card only) ---
  # Each rubro is drawn separately and the separator is an explicit ellipse.
  # Building the line by concatenating [char] caused problems and does not let
  # us control the dot size, which at this color/text size was invisible.
  if ($card.Rubros.Count -gt 0) {
    $fRub = New-Object System.Drawing.Font("Segoe UI", 21, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
    $rubBrush = New-Object System.Drawing.SolidBrush($card.RubroTextColor)
    $dotBrush = New-Object System.Drawing.SolidBrush($card.RubroDotColor)
    $rx = $M
    $ry = 478
    for ($k = 0; $k -lt $card.Rubros.Count; $k++) {
      $sfMeasure = $g.MeasureString($card.Rubros[$k], $fRub, [System.Drawing.PointF]::new(0, 0), $sf)
      $g.DrawString($card.Rubros[$k], $fRub, $rubBrush, $rx, $ry, $sf)
      $rx += $sfMeasure.Width
      if ($k -lt $card.Rubros.Count - 1) {
        $g.FillEllipse($dotBrush, ($rx + 9), ($ry + 10), 5, 5)
        $rx += 24
      }
    }
    $fRub.Dispose(); $rubBrush.Dispose(); $dotBrush.Dispose()
  }

  # --- Footer: domain (+ slug for demo cards) ---
  $footTexts = @($card.Footer)
  $fFoot = New-FittedFont $g $footTexts "Segoe UI" ([System.Drawing.FontStyle]::Bold) 22 $CONTENT_W
  $g.DrawString($card.Footer, $fFoot, $footerBrush, $M, 546, $sf)

  # --- Cleanup ---
  $fBrand.Dispose(); $fHead.Dispose(); $fSub.Dispose(); $fFoot.Dispose()
  $primaryBrush.Dispose(); $secondBrush.Dispose(); $brandBrush.Dispose(); $footerBrush.Dispose(); $head2Brush.Dispose()
  $g.Dispose()

  $bmp.Save($card.Out, [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $bmp.Dispose()

  $fi = Get-Item $card.Out
  Write-Output ("OK: " + $fi.FullName)
  Write-Output ("bytes: " + $fi.Length)
}

# --- Card definitions ---
# NOTE: the rubros list below is a multi-line-capable @(...) array kept on ONE
# line on purpose. With mixed LF/CRLF endings, PowerShell parses a multi-line
# @(...) as a SINGLE STRING, which silently collapses $array.Count to 1 (that
# made the rubros loop draw everything as one word, without separators).
# Keep every @(...) array in this file on one line.

$cardSite = @{
  Out            = $OUT_SITE
  BgTop          = (HexColor "#121418")
  BgBot          = (HexColor "#1e2229")
  Accent         = (HexColor "#e5cc98")
  TextPrimary    = (HexColor "#f1f5f9")
  TextSecondary  = (HexColor "#a0aab2")
  BrandColor     = (HexColor "#e5cc98")
  FooterColor    = (HexColor "#e5cc98")
  Headline2Color = (HexColor "#e5cc98")
  Brand          = "HH STUDIO"
  Headline1      = "Showcase de"
  Headline2      = "Proyectos"
  HeadlineFont   = "Georgia"
  HeadlineStyle  = [System.Drawing.FontStyle]::Regular
  Subline        = "Demos funcionales por rubro, listos para explorar"
  Footer         = "muestras.hhstudio.es"
  Motif          = "grid"
  MotifColor     = (C 45 50 60 90)
  Rubros         = @(("Cl" + $iacute + "nica"), "Salud", ("Carpinter" + $iacute + "a"), "Reformas", "Electricista", ("Est" + $eacute + "tica"), ("Pasteler" + $iacute + "a"))
  RubroTextColor = (C 152 164 177 255)
  RubroDotColor  = (C 150 134 100 255)
}

$cardAproClinica = @{
  Out            = (Join-Path $OUT_DIR "apro-clinica.jpg")
  BgTop          = (HexColor "#1b1c1b")
  BgBot          = (Lighten (HexColor "#1b1c1b") 18)
  Accent         = (HexColor "#8b5e3c")
  TextPrimary    = (HexColor "#f1f5f9")
  TextSecondary  = (HexColor "#e0d3c3")
  BrandColor     = (HexColor "#e0d3c3")
  FooterColor    = (HexColor "#e0d3c3")
  Headline2Color = (HexColor "#8b5e3c")
  Brand          = ("APRO CL" + $Iacute + "NICA")
  Headline1      = ("Cl" + $iacute + "nica")
  Headline2      = ("M" + $eacute + "dico-Est" + $eacute + "tica")
  HeadlineFont   = "Georgia"
  HeadlineStyle  = [System.Drawing.FontStyle]::Regular
  Subline        = ("Landing editorial para centros m" + $eacute + "dico-est" + $eacute + "ticos")
  Footer         = "muestras.hhstudio.es/apro-clinica"
  Motif          = "grid"
  MotifColor     = (WithAlpha (HexColor "#8b5e3c") 120)
  Rubros         = @()
  RubroTextColor = (C 152 164 177 255)
  RubroDotColor  = (C 150 134 100 255)
}

$cardSalud = @{
  Out            = (Join-Path $OUT_DIR "salud.jpg")
  BgTop          = (HexColor "#2d3a2f")
  BgBot          = (Lighten (HexColor "#2d3a2f") 18)
  Accent         = (HexColor "#7a9a8a")
  TextPrimary    = (HexColor "#f1f5f9")
  TextSecondary  = (HexColor "#a8c2b4")
  BrandColor     = (HexColor "#a8c2b4")
  FooterColor    = (HexColor "#7a9a8a")
  Headline2Color = (HexColor "#7a9a8a")
  Brand          = "MS LIFE"
  Headline1      = ("Cl" + $iacute + "nica de")
  Headline2      = "Bienestar"
  HeadlineFont   = "Georgia"
  HeadlineStyle  = [System.Drawing.FontStyle]::Regular
  Subline        = "Landing biophilic para centros de salud"
  Footer         = "muestras.hhstudio.es/salud"
  Motif          = "rings"
  MotifColor     = (WithAlpha (HexColor "#7a9a8a") 130)
  Rubros         = @()
  RubroTextColor = (C 152 164 177 255)
  RubroDotColor  = (C 150 134 100 255)
}

$cardCarpinteria = @{
  Out            = (Join-Path $OUT_DIR "carpinteria.jpg")
  BgTop          = (HexColor "#1a1513")
  BgBot          = (Lighten (HexColor "#1a1513") 18)
  Accent         = (HexColor "#c8a87c")
  TextPrimary    = (HexColor "#f1f5f9")
  TextSecondary  = (HexColor "#d9c5b2")
  BrandColor     = (HexColor "#c8a87c")
  FooterColor    = (HexColor "#c8a87c")
  Headline2Color = (HexColor "#c8a87c")
  Brand          = ([string]$Aacute + "LAMO")
  Headline1      = ([string]$Aacute + "LAMO")
  Headline2      = ("Carpinter" + $iacute + "a")
  HeadlineFont   = "Georgia"
  HeadlineStyle  = [System.Drawing.FontStyle]::Regular
  Subline        = ("Wabi-sabi: carpinter" + $iacute + "a a medida")
  Footer         = "muestras.hhstudio.es/carpinteria"
  Motif          = "bars"
  MotifColor     = (WithAlpha (HexColor "#c8a87c") 130)
  Rubros         = @()
  RubroTextColor = (C 152 164 177 255)
  RubroDotColor  = (C 150 134 100 255)
}

$cardReformas = @{
  Out            = (Join-Path $OUT_DIR "reformas.jpg")
  BgTop          = (HexColor "#1a2d3d")
  BgBot          = (Lighten (HexColor "#1a2d3d") 18)
  Accent         = (HexColor "#c4943a")
  TextPrimary    = (HexColor "#f1f5f9")
  TextSecondary  = (HexColor "#f1f5f9")
  BrandColor     = (HexColor "#c4943a")
  FooterColor    = (HexColor "#c4943a")
  Headline2Color = (HexColor "#c4943a")
  Brand          = "ST REFORMAS"
  Headline1      = "Reformas"
  Headline2      = "Integrales"
  HeadlineFont   = "Georgia"
  HeadlineStyle  = [System.Drawing.FontStyle]::Regular
  Subline        = ("Presupuesto online y antes/despu" + $eacute + "s")
  Footer         = "muestras.hhstudio.es/reformas"
  Motif          = "block"
  MotifColor     = (WithAlpha (HexColor "#c4943a") 110)
  Rubros         = @()
  RubroTextColor = (C 152 164 177 255)
  RubroDotColor  = (C 150 134 100 255)
}

$cardElectricista = @{
  Out            = (Join-Path $OUT_DIR "electricista.jpg")
  BgTop          = (HexColor "#050505")
  BgBot          = (Lighten (HexColor "#050505") 18)
  Accent         = (HexColor "#f0a500")
  TextPrimary    = (HexColor "#f1f5f9")
  TextSecondary  = (HexColor "#94a3b8")
  BrandColor     = (HexColor "#f0a500")
  FooterColor    = (HexColor "#f0a500")
  Headline2Color = (HexColor "#f0a500")
  Brand          = "VOLTIO"
  Headline1      = "VOLTIO"
  Headline2      = "Electricista"
  HeadlineFont   = "Segoe UI"
  HeadlineStyle  = [System.Drawing.FontStyle]::Bold
  Subline        = "Portfolio industrial con urgencias 24h"
  Footer         = "muestras.hhstudio.es/electricista"
  Motif          = "bars"
  MotifColor     = (WithAlpha (HexColor "#f0a500") 130)
  Rubros         = @()
  RubroTextColor = (C 152 164 177 255)
  RubroDotColor  = (C 150 134 100 255)
}

$cardEstetica = @{
  Out            = (Join-Path $OUT_DIR "estetica.jpg")
  BgTop          = (HexColor "#3d2b1f")
  BgBot          = (Lighten (HexColor "#3d2b1f") 18)
  Accent         = (HexColor "#c4a59d")
  TextPrimary    = (HexColor "#f1f5f9")
  TextSecondary  = (HexColor "#d4c5b9")
  BrandColor     = (HexColor "#c4a59d")
  FooterColor    = (HexColor "#c4a59d")
  Headline2Color = (HexColor "#c4a59d")
  Brand          = "LUMINA"
  Headline1      = "LUMINA"
  Headline2      = ("Est" + $eacute + "tica")
  HeadlineFont   = "Georgia"
  HeadlineStyle  = [System.Drawing.FontStyle]::Regular
  Subline        = ("Soft luxe: centro de est" + $eacute + "tica premium")
  Footer         = "muestras.hhstudio.es/estetica"
  Motif          = "rings"
  MotifColor     = (WithAlpha (HexColor "#c4a59d") 130)
  Rubros         = @()
  RubroTextColor = (C 152 164 177 255)
  RubroDotColor  = (C 150 134 100 255)
}

$cardPasteleria = @{
  Out            = (Join-Path $OUT_DIR "pasteleria.jpg")
  BgTop          = (HexColor "#2d2522")
  BgBot          = (Lighten (HexColor "#2d2522") 18)
  Accent         = (HexColor "#c17b60")
  TextPrimary    = (HexColor "#f1f5f9")
  TextSecondary  = (HexColor "#f0e8d8")
  BrandColor     = (HexColor "#c17b60")
  FooterColor    = (HexColor "#c17b60")
  Headline2Color = (HexColor "#c17b60")
  Brand          = "DULCERA"
  Headline1      = "DULCERA"
  Headline2      = ("Pasteler" + $iacute + "a")
  HeadlineFont   = "Georgia"
  HeadlineStyle  = [System.Drawing.FontStyle]::Regular
  Subline        = ("Pasteler" + $iacute + "a artesanal")
  Footer         = "muestras.hhstudio.es/pasteleria"
  Motif          = "block"
  MotifColor     = (WithAlpha (HexColor "#c17b60") 110)
  Rubros         = @()
  RubroTextColor = (C 152 164 177 255)
  RubroDotColor  = (C 150 134 100 255)
}

$cardSeoIa = @{
  Out            = (Join-Path $OUT_DIR "seo-ia.jpg")
  BgTop          = (HexColor "#121418")
  BgBot          = (HexColor "#1e2229")
  Accent         = (HexColor "#e5cc98")
  TextPrimary    = (HexColor "#f1f5f9")
  TextSecondary  = (HexColor "#a0aab2")
  BrandColor     = (HexColor "#e5cc98")
  FooterColor    = (HexColor "#e5cc98")
  Headline2Color = (HexColor "#e5cc98")
  Brand          = "HH STUDIO"
  Headline1      = "SEO & IA"
  Headline2      = "Servicios"
  HeadlineFont   = "Segoe UI"
  HeadlineStyle  = [System.Drawing.FontStyle]::Bold
  Subline        = ("Posicionamiento, datos y automatizaci" + $oacute + "n")
  Footer         = "muestras.hhstudio.es/seo-ia"
  Motif          = "grid"
  MotifColor     = (WithAlpha (HexColor "#e5cc98") 90)
  Rubros         = @()
  RubroTextColor = (C 152 164 177 255)
  RubroDotColor  = (C 150 134 100 255)
}

$cards = @($cardSite, $cardAproClinica, $cardSalud, $cardCarpinteria, $cardReformas, $cardElectricista, $cardEstetica, $cardPasteleria, $cardSeoIa)

# --- Run ---
if (-not (Test-Path $OUT_DIR)) { $null = New-Item -ItemType Directory -Path $OUT_DIR -Force }

# Guard against the mixed-EOL @() parsing bug collapsing the card list.
if ($cards.Count -ne 9) { throw ("Expected 9 cards, got " + $cards.Count) }

foreach ($card in $cards) { Draw-Card $card }
