#!/usr/bin/env python3
"""
MSN-2980 Leg 2 — Image asset pull.

Downloads the 9 new hero images from Albert's IMAGE_MANIFEST.md
(Flickr Openverse + Unsplash CDN), replaces the 9 Wikimedia heroes
in /public/photos/originals/, then regenerates WebP + AVIF variants
at 640/1080/1920/3840w following the V2 chunk-6 pipeline.

Also downloads the per-page card images needed for the new 22-page
KUBE layout (5 properties, 4 experiences, 3 retailers, 3 walks,
plus eat-drink/featured cards). Card images are referenced via the
remote URL (Flickr/Unsplash) in the next.config.mjs allowlist, but we
also self-host a 1280w version of each to keep the LCP off third
parties.

Author: Dexter (MSN-2980 Leg 2)
Date: 29 August 2026
"""

import os
import sys
import time
import urllib.request
import urllib.error
import subprocess
import shutil
import json
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

ROOT = Path("/Volumes/OpenClawLive/workspaces/dexter/workspace-dexter/mynoosaheads")
ORIG_DIR = ROOT / "public" / "photos" / "originals"
HERO_DIR = ROOT / "public" / "photos"
CARD_DIR = ROOT / "public" / "photos" / "cards"
WATERMARK_DIR = ROOT / "public" / "photos" / "watermarked"  # reserved
EVIDENCE = ROOT / "evidence" / "MSN-2980"

# Widths to generate (matches chunk-6 pipeline).
WIDTHS = [640, 1080, 1920, 3840]


def head(url, retries=2):
    """HEAD-check that the URL is reachable."""
    req = urllib.request.Request(url, method="HEAD")
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            return r.status, r.headers.get("Content-Type", "?")
    except urllib.error.HTTPError as e:
        if e.code in (403, 405) and retries:
            # Some CDNs reject HEAD — retry as GET with Range header.
            req = urllib.request.Request(url)
            req.add_header("Range", "bytes=0-1023")
            try:
                with urllib.request.urlopen(req, timeout=15) as r:
                    return r.status, r.headers.get("Content-Type", "?")
            except Exception:
                return None, None
        return None, None
    except Exception:
        return None, None


def download(url, dest):
    """Stream a URL to dest. Returns (ok, size, mime)."""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Dexter-MSN2980/1.0"})
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()
            mime = r.headers.get("Content-Type", "?")
            with open(dest, "wb") as f:
                f.write(data)
            return True, len(data), mime
    except Exception as e:
        return False, 0, str(e)


def encode_webp(src, dest, width):
    """Generate a WebP at `width`w Q70 (matches V2 chunk-6 defaults)."""
    cmd = ["cwebp", "-q", "70", "-resize", str(width), "0", "-m", "6", "-af", str(src), "-o", str(dest)]
    r = subprocess.run(cmd, capture_output=True, text=True)
    return r.returncode == 0


def encode_avif(src, dest, width):
    """Generate an AVIF at `width`w Q50 s=4 (matches V2 chunk-6 defaults)."""
    cmd = ["avifenc", "-q", "50", "--qalpha", "50", "-s", "4", "-j", "4", "--resize", str(width), str(src), str(dest)]
    r = subprocess.run(cmd, capture_output=True, text=True)
    return r.returncode == 0


def process_hero(slug, url, attribution, license):
    """Download the hero original + generate all variants."""
    orig_path = ORIG_DIR / f"hero-{slug}.jpg"
    print(f"  [{slug}] downloading {url[:80]}...")
    ok, size, mime = download(url, orig_path)
    if not ok:
        return {"slug": slug, "ok": False, "error": "download failed"}
    print(f"  [{slug}] {size:,} bytes  mime={mime}")

    variants = []
    for w in WIDTHS:
        webp_path = HERO_DIR / f"hero-{slug}-{w}w.webp"
        avif_path = HERO_DIR / f"hero-{slug}-{w}w.avif"
        wp_ok = encode_webp(orig_path, webp_path, w)
        av_ok = encode_avif(orig_path, avif_path, w)
        variants.append({
            "width": w,
            "webp": webp_path.exists(),
            "webp_size": webp_path.stat().st_size if webp_path.exists() else 0,
            "avif": avif_path.exists(),
            "avif_size": avif_path.stat().st_size if avif_path.exists() else 0,
        })
    return {"slug": slug, "ok": True, "size": size, "mime": mime, "variants": variants, "attribution": attribution, "license": license}


def process_card(slug, url, width=1280):
    """Download a card image + generate a 1280w WebP."""
    orig_path = CARD_DIR / f"card-{slug}.jpg"
    ok, size, mime = download(url, orig_path)
    if not ok:
        return {"slug": slug, "ok": False}
    webp_path = CARD_DIR / f"card-{slug}-{width}w.webp"
    avif_path = CARD_DIR / f"card-{slug}-{width}w.avif"
    encode_webp(orig_path, webp_path, width)
    encode_avif(orig_path, avif_path, width)
    return {"slug": slug, "ok": True, "size": size}


# ─────────────────────────────────────────────────────────────────────
# HERO manifest — 9 heroes + 2 homepage alternates + 2 NP alternates
# Source: /Volumes/OpenClawLive/state/control/evidence/MSN-2980/IMAGE_MANIFEST.md
# ─────────────────────────────────────────────────────────────────────

HEROES = [
    ("home",                  "https://live.staticflickr.com/3664/3487547682_52b62b9b03_b.jpg", "Flickr (Openverse)", "CC BY"),
    ("surf-and-weather",      "https://live.staticflickr.com/8029/8052945119_e3f2edce31_b.jpg", "Flickr (Openverse)", "CC BY-NC"),
    ("noosa-national-park",   "https://live.staticflickr.com/7915/46346554164_176a80477f_b.jpg", "Flickr (Openverse)", "CC BY"),
    ("accommodation",         "https://live.staticflickr.com/2090/2447049260_2a8189d4d6_b.jpg", "Flickr (Openverse)", "CC BY-NC"),
    ("things-to-do",          "https://live.staticflickr.com/8330/8146977124_491b4d5696.jpg",   "Flickr (Openverse)", "CC BY-NC-SA"),
    ("fishing-reports",       "https://live.staticflickr.com/65535/9572462197_6879fe750b_b.jpg", "Flickr (Openverse)", "CC0"),
    ("boats-and-watercraft",  "https://live.staticflickr.com/2114/2203239982_0f8f4f3d74_b.jpg", "Flickr (Openverse)", "CC BY-NC-SA"),
    ("travel-and-transport",  "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1600&q=80", "Unsplash CDN", "CC0"),
    ("webcams",               "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=80", "Unsplash CDN", "CC0"),
]

# Alternate heroes (kept as backup variants; will become hero-alt-1/2 in photo map)
HERO_ALTS = [
    ("home-alt-1",            "https://live.staticflickr.com/3757/11681350584_c78a09d814_b.jpg", "Flickr (Openverse)", "CC BY-NC-ND"),
    ("home-alt-2",            "https://live.staticflickr.com/8240/8531818425_4f7d65d9e6.jpg",   "Flickr (Openverse)", "CC BY-NC-SA"),
    ("noosa-national-park-alt-1", "https://live.staticflickr.com/7902/46389696594_be050f6b5a_b.jpg", "Flickr (Openverse)", "CC BY"),
    ("noosa-national-park-alt-2", "https://live.staticflickr.com/2420/2153303691_b1d994393b_b.jpg", "Flickr (Openverse)", "CC BY-SA"),
]

# Per-page card images (KUBE pattern — image + label only)
CARDS = [
    # Property cards (/accommodation + /stay/[slug])
    ("sofitel",            "https://live.staticflickr.com/7195/6804500540_84424cfb73_b.jpg", "Flickr", "CC BY"),
    ("racv",               "https://live.staticflickr.com/1421/705740732_3a50d37015.jpg",    "Flickr", "CC BY"),
    ("south-pacific",      "https://live.staticflickr.com/2090/2447049260_2a8189d4d6_b.jpg", "Flickr", "CC BY-NC"),
    ("sunshine-beach",     "https://live.staticflickr.com/1408/705933988_e7ab226bb2.jpg",    "Flickr", "CC BY"),
    ("netanya",            "https://live.staticflickr.com/6231/6224415039_628e2eb0a1_b.jpg", "Flickr", "CC BY"),
    # Experience cards (/things-to-do + /things-to-do/[slug])
    ("river",              "https://live.staticflickr.com/7261/13940326252_74135d0576_b.jpg", "Flickr", "CC BY"),
    ("surf",               "https://live.staticflickr.com/8029/8052945119_e3f2edce31_b.jpg",  "Flickr", "CC BY-NC"),
    ("eat",                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80", "Unsplash", "CC0"),
    ("cruise-tour",        "https://live.staticflickr.com/7068/13438728693_e10c56cced.jpg",   "Flickr", "CC BY"),
    # Retailer cards (/shopping + /shop/[slug])
    ("noosa-farmers-market", "https://live.staticflickr.com/2301/2367573625_8f0fd5692b_b.jpg", "Flickr", "CC BY-NC-SA"),
    ("eumundi-markets",      "https://live.staticflickr.com/2398/2189844448_ecff21b6d5_b.jpg", "Flickr", "CC BY-SA"),
    ("noosa-regional-gallery", "https://live.staticflickr.com/3490/3983700808_814732b141_b.jpg", "Flickr", "CC BY-NC-SA"),
    # Walk cards (/noosa-national-park/walks/[slug])
    ("walk-coastal",       "https://live.staticflickr.com/7915/46346554164_176a80477f_b.jpg", "Flickr", "CC BY"),
    ("walk-alexandria",    "https://live.staticflickr.com/8125/15648131978_aef5f2d88f_b.jpg", "Flickr", "CC BY-NC-SA"),
    ("walk-tanglewood",    "https://live.staticflickr.com/289/20066708795_71c95dc51a_b.jpg",   "Flickr", "CC BY-NC-ND"),
    # Eat-drink grid (we're keeping on /shopping per chairman mandate — no new page)
    ("hastings-street",    "https://live.staticflickr.com/615/31910895645_d321ec9068_b.jpg",  "Flickr", "CC BY-NC"),
    ("dining-generic",     "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80", "Unsplash", "CC0"),
]


def main():
    ORIG_DIR.mkdir(parents=True, exist_ok=True)
    CARD_DIR.mkdir(parents=True, exist_ok=True)

    # Clean up old Wikimedia hero variants (keep originals folder for audit).
    print("=== Cleaning old Wikimedia hero variants ===")
    removed = 0
    for f in HERO_DIR.glob("hero-*-{640,1080,1920,3840}w.{webp,avif}"):
        # Don't remove the new ones we're about to write.
        f.unlink()
        removed += 1
    print(f"  removed {removed} old variants")

    print("\n=== Downloading + encoding 9 new heroes ===")
    results = []
    with ThreadPoolExecutor(max_workers=3) as ex:
        futs = {ex.submit(process_hero, *h): h[0] for h in HEROES}
        for f in as_completed(futs):
            results.append(f.result())
    for r in results:
        if r["ok"]:
            vstr = ", ".join(f"{v['width']}w webp={v['webp_size']//1024}k avif={v['avif_size']//1024}k" for v in r["variants"])
            print(f"  ✓ {r['slug']}: {vstr}")
        else:
            print(f"  ✗ {r['slug']}: FAILED")

    print("\n=== Downloading + encoding alternates ===")
    alt_results = []
    with ThreadPoolExecutor(max_workers=3) as ex:
        futs = {ex.submit(process_hero, *h): h[0] for h in HERO_ALTS}
        for f in as_completed(futs):
            alt_results.append(f.result())
    for r in alt_results:
        print(f"  {'✓' if r['ok'] else '✗'} alt {r['slug']}")

    print("\n=== Downloading card images ===")
    card_results = []
    with ThreadPoolExecutor(max_workers=3) as ex:
        futs = {ex.submit(process_card, c[0], c[1]): c[0] for c in CARDS}
        for f in as_completed(futs):
            card_results.append(f.result())
    for r in card_results:
        print(f"  {'✓' if r['ok'] else '✗'} card {r['slug']}")

    # Write evidence JSON
    evidence_path = EVIDENCE / "image_pull_report.json"
    EVIDENCE.mkdir(parents=True, exist_ok=True)
    with open(evidence_path, "w") as f:
        json.dump({
            "heroes": results,
            "hero_alts": alt_results,
            "cards": card_results,
            "ts": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "tool": "scripts/msn2980/pull_heroes.py",
        }, f, indent=2)
    print(f"\nEvidence written: {evidence_path}")

    # Summary
    ok_heroes = sum(1 for r in results if r["ok"])
    ok_alts = sum(1 for r in alt_results if r["ok"])
    ok_cards = sum(1 for r in card_results if r["ok"])
    print(f"\nSUMMARY: heroes {ok_heroes}/{len(results)}, alts {ok_alts}/{len(alt_results)}, cards {ok_cards}/{len(card_results)}")
    return ok_heroes == len(HEROES)


if __name__ == "__main__":
    sys.exit(0 if main() else 1)
