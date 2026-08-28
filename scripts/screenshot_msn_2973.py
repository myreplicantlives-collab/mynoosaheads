#!/usr/bin/env python3
"""MSN-2973 evidence — capture 8 fresh screenshots covering the new
homepage hero, /accommodation curated picks, /things-to-do 8-card grid,
and the new /photo-credits page."""
from playwright.sync_api import sync_playwright
from pathlib import Path
import sys

OUT = Path("/Volumes/OpenClawLive/state/control/evidence/MSN-2973/screenshots")
OUT.mkdir(parents=True, exist_ok=True)

BASE = sys.argv[1] if len(sys.argv) > 1 else "https://mynoosaheads.twainent.workers.dev"

PAGES = [
    ("01-home-desktop", f"{BASE}/"),
    ("02-accommodation-desktop", f"{BASE}/accommodation"),
    ("03-things-to-do-desktop", f"{BASE}/things-to-do"),
    ("04-noosa-national-park-desktop", f"{BASE}/noosa-national-park"),
    ("05-surf-and-weather-desktop", f"{BASE}/surf-and-weather"),
    ("06-photo-credits-desktop", f"{BASE}/photo-credits"),
    ("07-home-mobile", f"{BASE}/"),
    ("08-accommodation-mobile", f"{BASE}/accommodation"),
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    for name, url in PAGES:
        if name.endswith("-mobile"):
            vp = {"width": 390, "height": 844}
        else:
            vp = {"width": 1440, "height": 900}
        ctx = browser.new_context(viewport=vp)
        page = ctx.new_page()
        page.goto(url, wait_until="networkidle", timeout=30000)
        # Wait for any images to settle
        page.wait_for_timeout(2500)
        out_path = OUT / f"{name}.png"
        page.screenshot(path=str(out_path), full_page=True)
        print(f"  ✓ {out_path.name}  ({url})  viewport={vp}")
        ctx.close()
    browser.close()

print(f"\nAll {len(PAGES)} screenshots captured to {OUT}")
