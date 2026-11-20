#!/usr/bin/env bash
# plan_to_docx.sh <plan.html> [out.docx]
#
# Absolute paths are required or soffice fails silently.
set -euo pipefail
SRC="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
OUTDIR="$(dirname "$SRC")"
soffice --headless --convert-to 'docx:MS Word 2007 XML' --outdir "$OUTDIR" "$SRC" >/dev/null 2>&1
MADE="$OUTDIR/$(basename "${SRC%.*}").docx"
[ -f "$MADE" ] || { echo "conversion failed"; exit 1; }
if [ "${2:-}" ]; then
  DEST="$(cd "$(dirname "$2")" && pwd)/$(basename "$2")"
  [ "$MADE" != "$DEST" ] && mv "$MADE" "$DEST"
  echo "$DEST"
else
  echo "$MADE"
fi
