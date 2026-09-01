#!/bin/bash
# MSN-3057 M2 — Lighthouse mobile audit on representative commercial routes.
#
# Targets the LIVE DEV URL (no production deploy per M2 constraints).
# Captures Performance / Accessibility / Best Practices / SEO scores.
#
# Output: /Volumes/OpenClawLive/workspaces/dexter/MSN-3057/M2/lighthouse-<slug>.json
# Summary: /Volumes/OpenClawLive/workspaces/dexter/MSN-3057/M2/lighthouse_summary.json

set +e  # don't bail — collect partial results
BASE="https://mynoosaheads.twainent.workers.dev"
EVIDENCE=/Volumes/OpenClawLive/workspaces/dexter/MSN-3057/M2
mkdir -p "$EVIDENCE"

ROUTES=(
  "/"
  "/accommodation/best-places-to-stay-in-noosa"
  "/accommodation/hastings-street"
  "/things-to-do/surf-lessons"
  "/things-to-do/everglades-tours"
  "/travel-and-transport/brisbane-airport-to-noosa"
  "/surf-and-weather"
)

SUMMARY="$EVIDENCE/lighthouse_summary.json"
echo "[" > "$SUMMARY"

FIRST=1
for route in "${ROUTES[@]}"; do
  slug=$(echo "$route" | sed 's|^/$|home|; s|^/||; s|/|_|g')
  echo "=== Lighthouse mobile: ${slug} ==="
  echo "    URL: $BASE$route"

  # mobile form factor (no --preset=desktop)
  /opt/homebrew/bin/lighthouse "$BASE$route" \
    --chrome-flags="--headless --no-sandbox --disable-gpu --disable-dev-shm-usage" \
    --output=json \
    --output-path="$EVIDENCE/lighthouse-${slug}.json" \
    --quiet \
    --only-categories=performance,accessibility,best-practices,seo \
    --form-factor=mobile \
    --throttling-method=simulate \
    2>&1 | tail -3

  if [ -f "$EVIDENCE/lighthouse-${slug}.json" ]; then
    python3 - <<PY
import json
with open("$EVIDENCE/lighthouse-${slug}.json") as f:
    r = json.load(f)
cats = r["categories"]
out = {
    "route": "$route",
    "slug": "$slug",
    "url": "$BASE$route",
    "performance": round(cats.get("performance", {}).get("score", 0) * 100),
    "accessibility": round(cats.get("accessibility", {}).get("score", 0) * 100),
    "best_practices": round(cats.get("best-practices", {}).get("score", 0) * 100),
    "seo": round(cats.get("seo", {}).get("score", 0) * 100),
    "lcp_ms": int(r.get("audits", {}).get("largest-contentful-paint", {}).get("numericValue", 0)),
    "fcp_ms": int(r.get("audits", {}).get("first-contentful-paint", {}).get("numericValue", 0)),
    "cls": round(r.get("audits", {}).get("cumulative-layout-shift", {}).get("numericValue", 0), 3),
    "tbt_ms": int(r.get("audits", {}).get("total-blocking-time", {}).get("numericValue", 0)),
}
print(f"    Perf={out['performance']} A11y={out['accessibility']} BP={out['best_practices']} SEO={out['seo']} LCP={out['lcp_ms']}ms")
with open("$EVIDENCE/lighthouse_summary.json", "a") as g:
    import os
    if os.path.getsize("$EVIDENCE/lighthouse_summary.json") > 2:
        g.write(",")
    json.dump(out, g)
PY
  else
    echo "    !! Lighthouse did not produce output for $slug"
  fi
done

echo "]" >> "$SUMMARY"
echo
echo "Done. JSON at: $EVIDENCE/lighthouse-*.json"
echo "Summary at: $SUMMARY"
