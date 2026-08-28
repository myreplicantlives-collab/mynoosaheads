#!/usr/bin/env python3
"""MSN-2974 evidence — fresh screenshots covering the new /shopping
page (8 categories × 5 places = 40 cards), the updated /things-to-do
9-card grid (now with Shop Noosa), the updated /accommodation
("What's in the list and what isn't" disclosure), and a / homepage
sanity check to confirm the homepage is unchanged.
"""
from playwright.sync_api import sync_playwright
from pathlib import Path
import sys

OUT = Path("/Volumes/OpenClawLive/state/control/evidence/MSN-2974/screenshots")
OUT.mkdir(parents=True, exist_ok=True)

BASE = sys.argv[1] if len(sys.argv) > 1 else "https://mynoosaheads.twainent.workers.dev"

PAGES = [
    # 1440 desktop, full page
    ("01-shopping-desktop", f"{BASE}/shopping"),
    ("02-shopping-desktop-top", f"{BASE}/shopping"),  # viewport-only screenshot
    ("03-things-to-do-desktop", f"{BASE}/things-to-do"),
    ("04-accommodation-desktop", f"{BASE}/accommodation"),
    ("05-home-desktop", f"{BASE}/"),
    # 390 mobile
    ("06-shopping-mobile", f"{BASE}/shopping"),
    ("07-things-to-do-mobile", f"{BASE}/things-to-do"),
    ("08-home-mobile", f"{BASE}/"),
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
        full_page = "-top" not in name
        page.screenshot(path=str(out_path), full_page=full_page)
        print(f"  ✓ {out_path.name}  ({url})  viewport={vp}  full={full_page}")
        ctx.close()
    browser.close()

print(f"\nAll {len(PAGES)} screenshots captured to {OUT}")