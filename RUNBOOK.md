# Runbook — mynoosaheads.com v2

Operations manual for the mynoosaheads.com build. Target operator: the chairman's monthly review.

## TL;DR

The site is largely self-maintaining. The chairman's involvement is a **monthly review**, not weekly intervention. The cron and health surfaces do the rest.

## Daily (automatic)

The Vercel deployment auto-runs `scripts/refresh-data.ts` style refreshes via the data-fetch path baked into the build. The `/health.json` endpoint exposes current source status.

To check the live health:
```
curl https://noosa-site-v2.vercel.app/health.json | python3 -m json.tool
```

Expected `ok` sources: BOM marine, Open-Meteo. Expected `unavailable` sources: QPWS (HTTP 403 from build, manual check recommended).

## Weekly (manual, ~5 min)

```bash
cd /Volumes/OpenClawLive/workspaces/dexter/mynoosaheads-v2
npm run link:scan -- https://noosa-site-v2.vercel.app
```

This checks every internal route returns 200, plus a sample of links across 7 pages. Output: `evidence/broken-link-scan.json`.

If anything fails:
1. Inspect the JSON — each broken link lists source page + target + status.
2. Common causes: a source URL changed (update `/data/sources.ts`), a destination restaurant closed (remove or replace), a partner page moved.

## Monthly (chairman review, ~15 min)

1. **Open the site**: https://noosa-site-v2.vercel.app — skim for visual regressions.
2. **Check live data**: `/surf-weather` — confirm the BOM/Open-Meteo refresh worked (last refresh time in the page header).
3. **Check sources**: open `/sources` — confirm "Last verified" dates are recent. Anything older than 90 days needs a manual check.
4. **Check restaurants**: open `/eat-drink` — spot-check 2–3 of the official links in your browser. Any dead venue = update or remove.
5. **Check partners**: open `/where-to-stay` — click one Booking.com link, confirm the destination is current.
6. **Check lighthouse**: `npm run lighthouse` against `/`, `/where-to-stay`, `/surf-weather`. Performance/Accessibility/Best Practices/SEO should all be ≥90. If any drops below 90, investigate.
7. **Check screenshots**: compare this month's screenshots in `evidence/screenshots-prod/` against last month's. Any visual drift = regression.
8. **Log a correction if needed**: if you fix a factual error, append an entry to `src/app/corrections/page.tsx` and commit.

## Quarterly (deep maintenance, ~1 hour)

1. Refresh the image inventory at `/Volumes/OpenClawLive/workspaces/sally/assets/noosa/IMAGE_MANIFEST.md` — drop any images whose licences have changed or whose photographer objects.
2. Re-evaluate the where-to-stay area set. Has a new area emerged? Has any dropped in quality?
3. Review the affiliate partner list in `src/data/affiliate.ts`. Are new affiliate programmes available? Are any underperforming?
4. Run a full Lighthouse pass on every route, not just the 3 priority pages.

## Annual

- Reconsider the stack. Next.js, Tailwind and the BOM data sources have moved on. Anything better suited?
- Audit the full editorial policy for changes in ACMA, Privacy Act, GST thresholds.
- Update the chair-facing summary in MSN-2901 evidence.

## When something breaks

### Site is down

1. `curl -I https://noosa-site-v2.vercel.app` — confirm 200.
2. If 5xx, check Vercel status and recent deployments (`vercel ls --prod`).
3. If a deploy is the culprit, redeploy the prior commit: `git revert HEAD && git push && vercel deploy --prod --yes`.

### A source is stale

1. Check `/health.json` — which source is "unavailable"?
2. Manually fetch the source URL with a real browser UA. If it works, the refresh script may need a tweak (see `scripts/refresh-data.ts`).
3. If the source has moved, update `/data/sources.ts` with the new URL and `lastVerified` date.

### A page is broken

1. Check the page in a browser, get the console error.
2. The page-level JSON-LD and live-data are the most common breakage points. Check `src/app/{page}/page.tsx`.
3. Run `npm run build` locally to catch type errors.

### Lighthouse score drops

1. `npm run lighthouse` — see which audit regressed.
2. Common culprits: large new images (compress and resize), new client JS (move to server), new font requests (subset).
3. Don't ship the regression — fix or roll back.

## Cron / monitoring suggestions

If you want a paid monitoring tier later:
- Pingdom or Better Uptime on `/health.json` — alert on `sources[*].status != "ok"` for any source that's been unavailable > 24 hours.
- Vercel Analytics for Core Web Vitals in production.

For the chairman's monthly cadence, neither is necessary.

## Escalation

- DNS flip for `mynoosaheads.com`: requires GoDaddy DNS credentials — escalate to Tim.
- New paid affiliate programme: requires Tim's authorisation (MSN-2900 §3 lists the 12 default programmes).
- Major content change (editorial direction, new sections): ping Sally.
- Anything that would change the production URL: stop and ask Tim.
