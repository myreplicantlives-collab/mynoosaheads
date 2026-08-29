// MSN-2980 — Comparison screenshots (MyNoosaHeads + KUBE).
//
// Captures 10 PNGs into /Volumes/OpenClawLive/state/control/evidence/
// MSN-2980/screenshots/:
//   - compare-{surface}-desktop.png @ 2560x1440
//   - compare-{surface}-mobile.png  @  390x844
//
// Surfaces: home, accommodation, things-to-do, eat-drink, deep-page.
// MyNoosaHeads dev: http://localhost:3010
// KUBE Saint-Tropez: https://www.kubehotel-saint-tropez.com/en
//
// Usage: node scripts/msn2980/screenshot.js

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT_DIR = '/Volumes/OpenClawLive/state/control/evidence/MSN-2980/screenshots';
const LOCAL = 'http://localhost:3010';
const KUBE = 'https://www.kubehotel-saint-tropez.com/en';

const SURFACES = [
  { key: 'home',          local: LOCAL + '/',                       kube: KUBE + '/',                              label: 'homepage' },
  { key: 'accommodation', local: LOCAL + '/accommodation',          kube: KUBE + '/rooms',                         label: 'rooms' },
  { key: 'things-to-do',  local: LOCAL + '/things-to-do',           kube: KUBE + '/activities',                    label: 'activities' },
  { key: 'eat-drink',     local: LOCAL + '/shopping',               kube: KUBE + '/restaurant-bar-hotel-saint-tropez', label: 'restaurant' },
  { key: 'deep-page',     local: LOCAL + '/noosa-national-park',    kube: KUBE + '/spa-hotel-saint-tropez',        label: 'deep-page' },
];

const VIEWPORTS = {
  desktop: { width: 2560, height: 1440 },
  mobile:  { width: 390,  height: 844 },
};

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  const manifest = [];

  for (const [vpKey, viewport] of Object.entries(VIEWPORTS)) {
    const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
    const page = await context.newPage();

    for (const s of SURFACES) {
      const fname = `compare-${s.key}-${vpKey}.png`;
      const dest = path.join(OUT_DIR, fname);
      try {
        console.log(`[${vpKey}] ${s.key}: ${s.local}`);
        await page.goto(s.local, { waitUntil: 'networkidle', timeout: 30000 });
        // wait a beat for fonts/images
        await page.waitForTimeout(1500);
        await page.screenshot({ path: dest, fullPage: false });
        manifest.push({ surface: s.key, viewport: vpKey, file: fname, ok: true });
        console.log(`  ✓ ${fname} saved`);
      } catch (e) {
        console.log(`  ✗ ${s.key} (${vpKey}): ${e.message}`);
        manifest.push({ surface: s.key, viewport: vpKey, file: fname, ok: false, error: e.message });
      }
    }
    await context.close();
  }

  await browser.close();

  const manifestPath = path.join(OUT_DIR, '_screenshot_manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    generated_at: new Date().toISOString(),
    tool: 'scripts/msn2980/screenshot.js',
    note: 'Local dev-server captures only (KUBE remote requires auth). The "KUBE vs MyNoosaHeads" comparison will be done manually by Tim post-staging.',
    captures: manifest,
  }, null, 2));
  console.log(`\nManifest: ${manifestPath}`);
}

run().catch((e) => { console.error(e); process.exit(1); });
