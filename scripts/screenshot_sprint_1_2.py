#!/usr/bin/env python3
"""Sprint 1.2 evidence — screenshot the live dev server."""
from playwright.sync_api import sync_playwright
from pathlib import Path
import sys

OUT = Path("/Volumes/OpenClawLive/state/control/evidence/MSN-2957/SPRINT-1.2")
OUT.mkdir(parents=True, exist_ok=True)

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:3013"
PAGES = [
    ("homepage", f"{BASE}/"),
    ("styleguide", f"{BASE}/styleguide"),
    ("hello-noosa", f"{BASE}/hello-noosa"),
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    for name, url in PAGES:
        for vp_name, vp in [("desktop", {"width": 1440, "height": 900}), ("mobile", {"width": 390, "height": 844})]:
            ctx = browser.new_context(viewport=vp)
            page = ctx.new_page()
            page.goto(url, wait_until="networkidle")
            page.wait_for_timeout(800)
            out_path = OUT / f"{name}_{vp_name}.png"
            page.screenshot(path=str(out_path), full_page=True)
            print(f"  ✓ {out_path.name}  ({url})")
            ctx.close()
    browser.close()

print("\nAll screenshots captured.")
