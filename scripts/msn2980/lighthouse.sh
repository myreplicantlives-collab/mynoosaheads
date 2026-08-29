#!/bin/bash
# MSN-2980 — Lighthouse audits (desktop + mobile) for 5 critical routes.
#
# Outputs JSON results into evidence/MSN-2980/lighthouse/<surface>-<form>.json
# and a one-line summary at lighthouse_summary.json.
#
# Requires a running dev server at http://localhost:3010.

set -e
EVIDENCE=/Volumes/OpenClawLive/state/control/evidence/MSN-2980/lighthouse
mkdir -p "$EVIDENCE"

ROUTES=(
  "/"
  "/accommodation"
  "/things-to-do"
  "/shopping"
  "/noosa-national-park"
)

for route in "${ROUTES[@]}"; do
  slug=$(echo "$route" | sed 's|^/$|home|; s|^/||; s|/|_|g')
  echo "=== Lighthouse: ${slug} (desktop + mobile) ==="

  for form in desktop mobile; do
    if [ "$form" = "desktop" ]; then
      preset="--preset=desktop"
    else
      preset=""
    fi

    /opt/homebrew/bin/lighthouse "http://localhost:3010${route}" \
      $preset \
      --chrome-flags="--headless --no-sandbox --disable-gpu" \
      --output=json \
      --output-path="$EVIDENCE/${slug}-${form}.json" \
      --quiet \
      --only-categories=performance,accessibility,best-practices,seo \
      2>&1 | tail -5 || true

    if [ -f "$EVIDENCE/${slug}-${form}.json" ]; then
      python3 - <<PY
import json
with open("$EVIDENCE/${slug}-${form}.json") as f:
    r = json.load(f)
cats = r["categories"]
out = {k: round(cats[k]["score"] * 100) for k in ["performance","accessibility","best-practices","seo"]}
print(f"  ${form}: {out}")
PY
    fi
  done
done

echo
echo "Done. Lighthouse JSON at: $EVIDENCE/"
