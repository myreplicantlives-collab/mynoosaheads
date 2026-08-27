import { chromium } from "playwright-core";

async function main() {
  const b = await chromium.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-gpu"],
  });
  const pages = [
    "/itineraries/one-day",
    "/itineraries/weekend",
    "/itineraries/four-days",
    "/itineraries/family",
  ];
  try {
    for (const r of pages) {
      const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
      const p = await ctx.newPage();
      await p.goto("https://noosa-site-v2.vercel.app" + r, { waitUntil: "networkidle", timeout: 30000 });
      await p.waitForTimeout(800);
      const label = r.replace(/^\//, "").replace(/\//g, "-");
      await p.screenshot({ path: "evidence/screenshots-prod/" + label + "-desktop.png", fullPage: false });
      await ctx.close();
      console.log("shot " + label);
    }
  } finally {
    await b.close();
  }
}

main();
