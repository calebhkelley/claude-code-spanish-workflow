#!/usr/bin/env bash
# render_check.sh <file.pptx> [outdir]
#
# Converts a deck to PDF, rasterizes every slide and builds a contact sheet.
# Then open the pages and look at them. Geometry never shows a collision,
# because text boxes run full width with left-aligned text.
set -euo pipefail

DECK="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
OUT="${2:-$(dirname "$DECK")/render}"
mkdir -p "$OUT"

soffice --headless --convert-to pdf --outdir "$OUT" "$DECK" >/dev/null 2>&1
PDF="$OUT/$(basename "${DECK%.*}").pdf"
[ -f "$PDF" ] || { echo "conversion failed"; exit 1; }

pdftoppm -png -r 80 "$PDF" "$OUT/slide"

if command -v python3 >/dev/null; then
python3 - "$OUT" <<'PY'
import sys, glob, os
from PIL import Image
out = sys.argv[1]
pages = sorted(glob.glob(os.path.join(out, 'slide-*.png')))
if not pages: sys.exit(0)
cols = 3
thumbs = [Image.open(p).convert('RGB') for p in pages]
tw = 520
thumbs = [t.resize((tw, int(t.height * tw / t.width))) for t in thumbs]
th = max(t.height for t in thumbs)
rows = (len(thumbs) + cols - 1) // cols
sheet = Image.new('RGB', (cols * tw + (cols + 1) * 12, rows * th + (rows + 1) * 12), 'white')
for i, t in enumerate(thumbs):
    r, c = divmod(i, cols)
    sheet.paste(t, (12 + c * (tw + 12), 12 + r * (th + 12)))
sheet.save(os.path.join(out, 'contact_sheet.png'))
print('contact sheet:', os.path.join(out, 'contact_sheet.png'))
print('pages:', len(pages))
PY
fi
echo "Open every page in $OUT and look at it."
