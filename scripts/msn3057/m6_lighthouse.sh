#!/bin/bash
# M6 perf polish Lighthouse re-run — same 7 routes as Victor's M5 QA + M4 baseline + M5 fixes.

set +e
export CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BASE="https://mynoosaheads.twainent.workers.dev"
EVIDENCE=/Volumes/OpenClawLive/workspaces/dexter/MSN-3057/M6/lighthouse
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

SUMMARY="$EVIDENCE/lighthouse_flat.json"
echo "[" > "$SUMMARY"

first=1
for route in "${ROUTES[@]}"; do
  slug=$(echo "$route" | sed 's|^/$|home|; s|^/||; s|/|_|g')
  echo "=== M6 perf polish Lighthouse: ${slug} ==="
  echo "    URL: $BASE$route"

  /opt/homebrew/bin/lighthouse "$BASE$route" \
    --chrome-flags="--headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage" \
    --output=json \
    --output-path="$EVIDENCE/lighthouse-${slug}.json" \
    --quiet \
    --only-categories=performance,accessibility,best-practices,seo \
    --form-factor=mobile \
    --throttling-method=simulate \
    2>&1 | tail -3

  if [ -f "$EVIDENCE/lighthouse-${slug}.json" ]; then
    python3 - <<PY
import json, os
with open("$EVIDENCE/lighthouse-${slug}.json") as f:
    r = json.load(f)
cats = r["categories"]
out = {
    "route": "$route",
    "slug": "$slug",
    "performance": round(cats.get("performance", {}).get("score", 0) * 100),
    "accessibility": round(cats.get("accessibility", {}).get("score", 0) * 100),
    "best_practices": round(cats.get("best-practices", {}).get("score", 0) * 100),
    "seo": round(cats.get("seo", {}).get("score", 0) * 100),
    "lcp_ms": int(r.get("audits", {}).get("largest-contentful-paint", {}).get("numericValue", 0)),
    "fcp_ms": int(r.get("audits", {}).get("first-contentful-paint", {}).get("numericValue", 0)),
    "cls": round(r.get("audits", {}).get("cumulative-layout-shift", {}).get("numericValue", 0), 3),
    "tbt_ms": int(r.get("audits", {}).get("total-blocking-time", {}).get("numericValue", 0)),
    "si_ms": int(r.get("audits", {}).get("speed-index", {}).get("numericValue", 0)),
}
print("    P={} A={} BP={} SEO={} LCP={}ms TBT={}ms CLS={}".format(
    out['performance'], out['accessibility'], out['best_practices'], out['seo'],
    out['lcp_ms'], out['tbt_ms'], out['cls']), flush=True)
with open("$EVIDENCE/lighthouse_flat.json", "a") as g:
    if os.path.getsize("$EVIDENCE/lighthouse_flat.json") > 2:
        g.write(",")
    json.dump(out, g)
PY
  fi
done

echo "]" >> "$SUMMARY"
echo ""
echo "Done. Summary at: $SUMMARY"
