# Current State — mynoosaheads.com v2 build

**Mission:** MSN-2901
**Branch:** `feat/mynoosaheads-v2`
**Created:** 2026-08-24 (mission window 10:05–16:05 BST)
**Owner:** Dexter

## 1. Mission context

- **Authoritative brief:** `/Volumes/OpenClawLive/state/control/evidence/MSN-2901/MISSION_BRIEF.md`
- **Approved inputs:** MSN-2899 audit v2 + MSN-2900 monetisation v2 (both Victor PASS)
- **Brand positioning:** "Plan your Noosa trip well." Warm, practical, tourism-positive.
- **Hard exclusions:** No sample data, fake webcams, fake fishing reports, invented affiliate IDs, fabricated citations, scraping of prohibited sources, daily/weekly owner-maintenance, paid accounts without authorisation.
- **Legacy project state:** the prior `noosa-site-v2.vercel.app` build is the *unreviewed* "Honest Guide" anti-tourism build (audit Finding #1 confirms zero JSON-LD, sparse attribution, anti-tourism posture). MSN-2899 says *do not patch* the legacy code; build fresh and replace on the existing Vercel project.

## 2. Existing infrastructure

| Surface | State | Source |
|---|---|---|
| Vercel account | authenticated | `vercel whoami` → `myreplicantlives-5263` |
| Vercel project | `noosa-site-v2` (Next.js) | `vercel inspect noosa-site-v2.vercel.app` |
| Live preview URL | `https://noosa-site-v2.vercel.app` | currently serves legacy anti-tourism build (will be replaced) |
| Custom domain `mynoosaheads.com` | **PARKED at GoDaddy** | DNS `A 76.223.67.189 / 13.248.213.45` (AWS Global Accelerator parked service); NS `ns63/64.domaincontrol.com`. **Blocker:** GoDaddy DNS credentials are not in Dexter's credential set — DNS flip is the **chairman-authorised reserved decision** and is out of build scope. The build is delivered to the existing Vercel project so the domain flips in a single step. |
| Image inventory | 15 CC-licensed Wikimedia Commons images | `/Volumes/OpenClawLive/workspaces/sally/assets/noosa/IMAGE_MANIFEST.md` — all CC BY / BY-SA, commercial use OK with attribution |
| Tooling | Node 22.23.1, npm 10.9.8, git, Vercel CLI 50.32.5, Lighthouse, Playwright CLI | ready |

## 3. Plan summary

- **Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, statically exportable (`output: 'export'`) so the build is portable and self-maintaining.
- **Design system:** warm parchment + ocean palette, photo-led hero, comparison tables (Main Beach vs Sunshine Beach style), practical-info-first typography, generous whitespace. No emoji UI; SVG icons only.
- **Architecture:** per-page `.tsx` files, shared `Layout`/`SiteHeader`/`SiteFooter`, shared data modules under `src/data/*.ts` so all copy is version-controlled and reviewable. JSON-LD generated from per-page metadata. No CMS, no database — purely static + scheduled refresh.
- **Monetisation:** environment-driven affiliate links (`NEXT_PUBLIC_BOOKING_AID` etc.) with official-fallback destinations and explicit "not yet monetised" disclosure when the env var is unset. Per-CTA source recorded in `src/data/affiliate.ts`.
- **Maintenance:** a small Node script (`scripts/refresh-data.ts`) refreshes live-source snapshots (BOM, QPWS) on a cron. Health endpoint at `/health.json` exposes per-source `lastChecked`, `status`, `notes`. Runbook documents monthly owner-review.

## 4. Branch / commit policy

Per TWE-1453 REC-06, every meaningful milestone gets its own commit. No `v1.py` → `v2.py` in same dir. Branch `feat/mynoosaheads-v2` carries the entire build.

## 5. Out-of-scope blockers to record

1. **DNS flip:** `mynoosaheads.com` still parked at GoDaddy. The build is production-ready and the Vercel project is reusable. The flip is a 1-record A + 1-record CNAME/www change in GoDaddy. Recorded as the explicit escalation item.
2. **Affiliate network IDs:** No approved Booking.com / Viator / GetYourGuide / Klook affiliate IDs are stored in the workspace. The build uses environment-driven placeholders (`NEXT_PUBLIC_BOOKING_AID` etc.) and falls back to the official search URL with disclosure. Adding real IDs is a 5-minute env change once approved.

## 6. Acceptance gate tracking

| Criterion | Status | Evidence |
|---|---|---|
| Fresh git repo + meaningful commits + clean status | pending | this commit + subsequent |
| Brand positioning "Plan your Noosa trip well" | pending | homepage hero, all meta tags |
| All utility surfaces exist and navigable | pending | nav + per-page evidence |
| Where-to-stay comparable to Visit Noosa benchmark | pending | `/where-to-stay` filters |
| Every live number dated + sourced | pending | per-page footer with timestamp + source |
| Provider failure → explicit error state | pending | `/health.json` + UI fallback |
| Noosa National Park + Fraser/K'gari with safety/permit caveats | pending | dedicated pages with QPWS + DES links |
| Affiliate disclosure present, no invented IDs | pending | global footer + per-link badge |
| Lighthouse 90+ target | pending | run during QA prep |
| No placeholder/stub/fake data | pending | final evidence sweep |
| `mynoosaheads.com` live (custom domain) | **BLOCKED — DNS flip at GoDaddy** | preserved: production-ready on `noosa-site-v2.vercel.app` |
| Drive folder with evidence | pending | created during QA prep |

Last updated: 2026-08-24 10:13 BST (mission start).