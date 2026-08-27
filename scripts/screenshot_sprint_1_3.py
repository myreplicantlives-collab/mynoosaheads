#!/usr/bin/env python3
"""Sprint 1.3 evidence — screenshot key category + editorial routes."""
from playwright.sync_api import sync_playwright
from pathlib import Path
import sys

OUT = Path("/Volumes/OpenClawLive/state/control/evidence/MSN-2957/SPRINT-1.3")
OUT.mkdir(parents=True, exist_ok=True)

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:3010"
PAGES = [
    ("surf-and-weather", f"{BASE}/surf-and-weather"),
    ("accommodation", f"{BASE}/accommodation"),
    ("how-we-make-money", f"{BASE}/how-we-make-money"),
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    for name, url in PAGES:
        for vp_name, vp in [("desktop", {"width": 1440, "height": 900}), ("mobile", {"width": 390, "height": 844})]:
            ctx = browser.new_context(viewport=vp)
            page = ctx.new_page()
            page.goto(url, wait_until="networkidle")
            page.wait_for_timeout(1500)
            out_path = OUT / f"{name}_{vp_name}.png"
            page.screenshot(path=str(out_path), full_page=True)
            print(f"  ✓ {out_path.name}  ({url})")
            ctx.close()
    browser.close()

print("\nAll Sprint 1.3 screenshots captured.")
