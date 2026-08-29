#!/usr/bin/env node
/**
 * MSN-2975 perf chunk 1 — hero image download + WebP conversion.
 *
 * Downloads Wikimedia Commons originals for every hero used on V2
 * routes, then converts each to WebP at four sizes (640 / 1080 / 1920
 * / 3840 px wide) using cwebp -q 80.
 *
 * Outputs:
 *   public/photos/originals/hero-{slug}.jpg      (originals)
 *   public/photos/hero-{slug}-{size}w.webp      (responsive WebP set)
 *
 * Idempotent: if an original already exists locally, it's skipped
 * (so re-runs only regenerate WebPs).
 *
 * No other files are touched. No git operations.
 */

import { execFileSync } from "node:child_process";
import { mkdirSync, statSync, existsSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const OUT_DIR = join(ROOT, "public", "photos");
const ORIG_DIR = join(OUT_DIR, "originals");
const SIZES = [640, 1080, 1920, 3840];

mkdirSync(ORIG_DIR, { recursive: true });

/**
 * V2 hero image manifest — slug → Wikimedia original URL.
 *
 * URLs are resolved from the 1280-px thumbnail by stripping the
 * `/thumb/{hash}/{filename}/{size}px-{filename}` suffix. The remaining
 * `/wikipedia/commons/{hash1}/{hash2}/{filename}` is the original
 * upload.wikimedia.org URL.
 */
const HEROES = [
  {
    slug: "home",
    caption: "Sunset over Noosa Main Beach, April 2020",
    thumb:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Sunset_over_Noosa_Beach%2C_Noosa_Heads%2C_Queensland_04.jpg/1280px-Sunset_over_Noosa_Beach%2C_Noosa_Heads%2C_Queensland_04.jpg",
    licence: "CC BY-SA 4.0",
    author: "Kgbo",
  },
  {
    slug: "surf-and-weather",
    caption: "Noosa Main Beach in late afternoon",
    thumb:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Noosa_Heads_beach_on_Christmas_Day_2015_03.jpeg/1280px-Noosa_Heads_beach_on_Christmas_Day_2015_03.jpeg",
    licence: "CC BY-SA 4.0",
    author: "Kgbo",
  },
  {
    slug: "noosa-national-park",
    caption: "The Noosa Headlands coastal walk",
    thumb:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Noosa_Heads_and_Weyba_Creek.JPG/1280px-Noosa_Heads_and_Weyba_Creek.JPG",
    licence: "CC BY-SA 4.0",
    author: "Kgbo",
  },
  {
    slug: "accommodation",
    caption: "Hastings Street storefronts and palms",
    thumb:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Hastings_Street_Noosa_Heads%2C_Queensland.jpg/1280px-Hastings_Street_Noosa_Heads%2C_Queensland.jpg",
    licence: "CC BY-SA 4.0",
    author: "Kgbo",
  },
  {
    slug: "things-to-do",
    caption: "Noosa Main Beach in December 2022",
    thumb:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Noosa_Beach%2C_Noosa_Heads%2C_Queensland%2C_2022.jpg/1280px-Noosa_Beach%2C_Noosa_Heads%2C_Queensland%2C_2022.jpg",
    licence: "CC BY-SA 4.0",
    author: "Kgbo",
  },
  {
    slug: "fishing-reports",
    caption: "The Noosa River mouth from the headland",
    thumb:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Noosa_Heads_%2823720155369%29.jpg/1280px-Noosa_Heads_%2823720155369%29.jpg",
    licence: "CC BY 2.0",
    author: "dronepicr",
  },
  {
    slug: "boats-and-watercraft",
    caption: "Noosa Ferry at Sofitel wharf",
    thumb:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Noosa_Ferry_outside_Sofitel_Noosa_Pacific_Resort%2C_Noosa_Heads%2C_Queensland.jpg/1280px-Noosa_Ferry_outside_Sofitel_Noosa_Pacific_Resort%2C_Noosa_Heads%2C_Queensland.jpg",
    licence: "CC BY-SA 4.0",
    author: "Kgbo",
  },
  {
    slug: "travel-and-transport",
    caption: "Boardwalk along Noosa Main Beach",
    thumb:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Boardwalk_along_Noosa_Heads%E2%80%99_main_beach%2C_Queensland.jpg/1280px-Boardwalk_along_Noosa_Heads%E2%80%99_main_beach%2C_Queensland.jpg",
    licence: "CC BY-SA 4.0",
    author: "Kgbo",
  },
  {
    slug: "webcams",
    caption: "Noosa Heads township and the river mouth",
    thumb:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Noosa_Heads_%28134205593%29.jpeg/1280px-Noosa_Heads_%28134205593%29.jpeg",
    licence: "CC BY 3.0",
    author: "dronepicr",
  },
];

/**
 * Convert a 1280-px thumbnail URL to its upload.wikimedia.org original.
 *
 * Pattern: /thumb/a/ab/Filename.jpg/1280px-Filename.jpg
 *       → /a/ab/Filename.jpg
 *
 * If the URL doesn't match the /thumb/ pattern, it's returned as-is.
 */
function thumbToOriginal(thumbUrl) {
  const m = thumbUrl.match(
        /^(https?:\/\/upload\.wikimedia\.org\/wikipedia\/commons)\/thumb\/([^?]+)\/\d+px-[^/?]+(\?.*)?$/,
  );
  if (!m) return thumbUrl;
  return `${m[1]}/${m[2]}${m[3] ?? ""}`;
}

function download(url, dest) {
  // Use curl — handles HTTPS, redirects, and gives us a clean progress.
  execFileSync(
    "curl",
    [
      "-fsSL",
      "--retry", "3",
      "--retry-delay", "2",
      "-A", "MyNoosaHeads-PerfBot/1.0 (chunk-1; contact: ops@mynoosaheads.local)",
      "-o", dest,
      url,
    ],
    { stdio: ["ignore", "ignore", "pipe"], maxBuffer: 32 * 1024 * 1024 },
  );
}

function cwebp(input, output, width) {
  execFileSync(
    "cwebp",
    [
      "-q", "80",
      "-resize", String(width), "0",
      "-m", "6",
      "-af",
      "-o", output,
      input,
    ],
    { stdio: ["ignore", "ignore", "pipe"], maxBuffer: 32 * 1024 * 1024 },
  );
}

function bytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

const log = (...a) => console.log("[perf-chunk1]", ...a);
const report = {
  startedAt: new Date().toISOString(),
  heroes: [],
  errors: [],
};

for (const hero of HEROES) {
  const origUrl = thumbToOriginal(hero.thumb);
  const origPath = join(ORIG_DIR, `hero-${hero.slug}.jpg`);
  const entry = {
    slug: hero.slug,
    caption: hero.caption,
    licence: hero.licence,
    author: hero.author,
    originalUrl: origUrl,
    originalBytes: 0,
    webp: {},
  };

  try {
    if (!existsSync(origPath)) {
      log(`download ${hero.slug} ← ${origUrl}`);
      download(origUrl, origPath);
    } else {
      log(`cached   ${hero.slug} (skipping download)`);
    }
    entry.originalBytes = statSync(origPath).size;

    for (const w of SIZES) {
      const out = join(OUT_DIR, `hero-${hero.slug}-${w}w.webp`);
      log(`webp     ${hero.slug} ${w}w`);
      cwebp(origPath, out, w);
      entry.webp[`${w}w`] = statSync(out).size;
    }
  } catch (err) {
    const msg = err?.stderr ? err.stderr.toString().trim() : String(err);
    log(`FAIL     ${hero.slug}: ${msg.slice(0, 200)}`);
    report.errors.push({ slug: hero.slug, error: msg.slice(0, 500) });
  }

  report.heroes.push(entry);
}

// Summary
const totalOrig = report.heroes.reduce((s, h) => s + h.originalBytes, 0);
const totalsBySize = Object.fromEntries(
  SIZES.map((w) => [w, report.heroes.reduce((s, h) => s + (h.webp[`${w}w`] ?? 0), 0)]),
);
const totalWebp = Object.values(totalsBySize).reduce((s, v) => s + v, 0);

log("---");
log(`Originals: ${report.heroes.length} files, ${bytes(totalOrig)}`);
for (const w of SIZES) {
  const t = totalsBySize[w];
  const pct = totalOrig ? ((t / totalOrig) * 100).toFixed(1) : "n/a";
  log(`WebP ${w}w:  ${bytes(t)}  (${pct}% of originals)`);
}
log(`WebP total (all sizes): ${bytes(totalWebp)}`);
log(
  `Compression ratio (total WebP across all sizes / total original): ${
    totalOrig ? ((totalWebp / totalOrig) * 100).toFixed(1) : "n/a"
  }%`,
);
log(`Errors: ${report.errors.length}`);

writeFileSync(
  join(OUT_DIR, "_chunk1-report.json"),
  JSON.stringify(
    { ...report, finishedAt: new Date().toISOString(), totalOrig, totalsBySize, totalWebp },
    null,
    2,
  ),
);
log("Wrote manifest:", join(OUT_DIR, "_chunk1-report.json"));
