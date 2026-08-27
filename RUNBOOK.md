# MyNoosaHeads Operations Runbook

> Sprint 1.4 (TSK-2957-04) — owner-checks-infrequently operational baseline.
>
> Site: https://noosa-site-v2.vercel.app/
> Production Vercel project: `noosa-site-v2` (auto-deploys from `main`)
> Cron host: macOS launchd via OpenClaw gateway
> Alert channel: Telegram (Tim, chat ID 7620112671)

This runbook covers the operational baseline established in Sprint 1.4.
It is the single source of truth for daily checks, incident response,
and routine maintenance. **Read §10 (Escalation) before paging anyone.**

---

## Table of Contents

1. [Health at a glance](#1-health-at-a-glance)
2. [Roll back a deploy](#2-roll-back-a-deploy)
3. [View Sentry errors](#3-view-sentry-errors)
4. [View Better Stack uptime](#4-view-better-stack-uptime)
5. [Read cron logs](#5-read-cron-logs)
6. [Manually trigger cron jobs](#6-manually-trigger-cron-jobs)
7. [Add or change a cron job](#7-add-or-change-a-cron-job)
8. [Add a new environment variable (Vercel)](#8-add-a-new-environment-variable-vercel)
9. [Promote a preview deploy to production](#9-promote-a-preview-deploy-to-production)
10. [Escalation: when to ping Sally vs. Tim](#10-escalation-when-to-ping-sally-vs-tim)
11. [Cron job reference](#11-cron-job-reference)
12. [Affiliates — known 429/503 noise](#12-affiliates--known-429503-noise)

---

## 1. Health at a glance

Daily check (60 seconds, run every morning by Sally's continuity check):

```bash
# Production up?
curl -sI https://noosa-site-v2.vercel.app/ | head -1
# Expected: HTTP/2 200

# Sitemap reachable?
curl -sI https://noosa-site-v2.vercel.app/sitemap.xml | head -1
# Expected: HTTP/2 200

# Last 5 cron runs?
for f in /Volumes/OpenClawLive/state/control/cron_run_logs/*.log; do
  echo "=== $(basename "$f") ==="
  tail -1 "$f"
done
```

If anything is red, jump to the relevant section below.

---

## 2. Roll back a deploy

Vercel keeps every deploy. To roll back production to a prior known-good:

```bash
cd /Volumes/OpenClawLive/workspaces/dexter/workspace-dexter/mynoosaheads

# 1. List recent production deploys (top = newest)
vercel ls | grep -E "Production.*noosa-site-v2" | head -5

# 2. Find a "Ready" Production deploy from before the regression.
#    Copy its deployment URL — looks like:
#      https://noosa-site-v2-nb7uk93b9-myreplicantlives-5263s-projects.vercel.app

# 3. Promote it to production (instant):
vercel promote <deployment-url>
# e.g. vercel promote https://noosa-site-v2-nb7uk93b9-myreplicantlives-5263s-projects.vercel.app

# 4. Confirm production is on the old build:
curl -sI https://noosa-site-v2.vercel.app/ | head -1
# Expect HTTP/2 200

# 5. Then fix the regression on a new branch — never re-deploy the bad commit.
git checkout main
git pull
git checkout -b fix/<short-description>
# …make fix…
git push -u origin fix/<short-description>
# Open PR; merge only after Victor's QA gate passes.
```

**Time-to-rollback:** ~30 seconds (Vercel CDN already has all builds cached).
**No DB migration** in Sprint 1.4 (content is filesystem + MDX), so rollback is non-destructive.

---

## 3. View Sentry errors

Sentry dashboard (when configured): https://sentry.io/organizations/myreplicantlives/projects/mynoosaheads/

If Sentry is **not yet configured** (i.e. SENTRY_DSN env var is empty):
- The app builds and runs without Sentry — zero overhead (the SDK is gated
  on `process.env.SENTRY_DSN` in `sentry.{client,server,edge}.config.ts`).
- To verify Sentry wiring in production, trigger the test endpoint:
  ```bash
  curl -i https://noosa-site-v2.vercel.app/api/sentry-example-error
  # Expected: HTTP/2 500 (intentional)
  ```
  When SENTRY_DSN is set, this 500 appears in the Sentry dashboard as
  "Sentry test error (TSK-2957-04)".

To enable Sentry:
1. Create a Sentry account at https://sentry.io (free tier: 5k errors/mo).
2. Create a project for Next.js (name: `mynoosaheads`, org: `myreplicantlives`).
3. Copy the DSN from Project Settings → Client Keys (DSN).
4. Add `SENTRY_DSN` to Vercel environment variables for **Production**
   (and optionally Preview). See §8 for how to add env vars.
5. Redeploy (`vercel deploy --prod`) — DSN is read at build/init time.
6. Trigger test: `curl -i https://noosa-site-v2.vercel.app/api/sentry-example-error`.
7. Verify event appears in Sentry Issues within ~30 seconds.

> Telegram alerts for Sentry: enable in Sentry Project Settings → Alerts →
> "New Issues" rule → add Telegram integration. Sentry's native Telegram
> integration posts directly without needing the OpenClaw bot.

---

## 4. View Better Stack uptime

Better Stack dashboard (when configured): https://uptime.betterstack.com/

To enable Better Stack:
1. Create a Better Stack account at https://betterstack.com (free tier:
   1 monitor, 3-min interval; paid plans allow 30s).
2. Add a Monitor:
   - URL: `https://noosa-site-v2.vercel.app/`
   - Check interval: 5 minutes (within free tier)
   - Request method: GET
   - Expected status: 200
   - **Incident trigger: after 2 consecutive failures** (de-dupes single
     blips; if the site is genuinely down for 10+ min, you'll be paged).
3. Add an On-call schedule with Telegram integration (or email).
4. Better Stack will alert via Telegram directly when incident opens.

> The Better Stack monitor is a **separate** check from our internal
> `health_check.sh` cron (§11a). Both are belt-and-braces: Better Stack
> alerts if *their* probe fails; our internal cron alerts if *our* probe
> fails (different network paths catch different failure modes).

---

## 5. Read cron logs

Every cron run appends to a run log:

```bash
ls /Volumes/OpenClawLive/state/control/cron_run_logs/
# health_check.log
# broken_link_check.log
# sitemap_regen.log
# affiliate_check.log
# db_backup.log

# Tail the most recent entries:
tail -20 /Volumes/OpenClawLive/state/control/cron_run_logs/health_check.log

# Watch live (next run):
tail -f /Volumes/OpenClawLive/state/control/cron_run_logs/health_check.log
```

Each log line is `[ISO-8601 UTC] message`. Alert lines start with `ALERT:`.
To see the last 50 lines of every log at once:

```bash
for f in /Volumes/OpenClawLive/state/control/cron_run_logs/*.log; do
  echo "=== $(basename "$f") ==="
  tail -50 "$f"
done
```

---

## 6. Manually trigger cron jobs

Useful for verifying a fix, after a config change, or during incident response.

```bash
# List all mynoosaheads cron jobs:
openclaw cron list | grep noosa-site-v2

# Trigger one immediately (uses the cron job's command + cwd + env):
openclaw cron run <job-id>
# Example: openclaw cron run a8d7896d-0527-4984-a90d-a82cc60ccf6b
# (the a8d… id is health_check)

# Or, run the script directly (skips the cron gateway):
/Volumes/OpenClawLive/state/control/cron/mynoosaheads/health_check.sh
# Exit code 0 = OK; non-zero = error (but most scripts exit 0 with
# Telegram alert — they're fail-soft by design).
```

---

## 7. Add or change a cron job

All cron jobs live in:

- **Script:** `/Volumes/OpenClawLive/state/control/cron/mynoosaheads/<name>.sh`
- **Schedule:** registered via `openclaw cron add …`

Pattern (use the existing scripts as templates — they all share the same
Telegram alert helper, log format, and fail-soft exit):

```bash
# 1. Create script — copy from an existing one and modify.
cp /Volumes/OpenClawLive/state/control/cron/mynoosaheads/health_check.sh \
   /Volumes/OpenClawLive/state/control/cron/mynoosaheads/<new-job>.sh
chmod 755 /Volumes/OpenClawLive/state/control/cron/mynoosaheads/<new-job>.sh
# Edit the script with your real logic.

# 2. Register with OpenClaw cron:
openclaw cron add \
    --name "noosa-site-v2 <descriptive name> (MSN-2957)" \
    --display-name "noosa-site-v2 <descriptive name>" \
    --cron "<cron-expression>" \
    --exact \
    --tz "Europe/London" \
    --description "TSK-XXXX-XX / Cron X — <one-line summary>" \
    --command "/Volumes/OpenClawLive/state/control/cron/mynoosaheads/<new-job>.sh" \
    --command-cwd "/Volumes/OpenClawLive/state/control/cron/mynoosaheads" \
    --timeout-seconds 30 \
    --no-output-timeout-seconds 25 \
    --output-max-bytes 8192 \
    --no-deliver

# 3. Test:
openclaw cron run <new-job-id>

# 4. Confirm log writes:
tail -5 /Volumes/OpenClawLive/state/control/cron_run_logs/<new-job>.log
```

---

## 8. Add a new environment variable (Vercel)

```bash
cd /Volumes/OpenClawLive/workspaces/dexter/workspace-dexter/mynoosaheads

# Add for Production only:
vercel env add <NAME> production
# (you'll be prompted for the value)

# Add for Preview + Production:
vercel env add <NAME> preview production

# List current env:
vercel env ls

# Pull to .env.local for local dev:
vercel env pull .env.local
```

**Important:** After adding an env var, redeploy for it to take effect:

```bash
vercel deploy --prod
```

For **secret** env vars (Sentry auth tokens, IndexNow key), use Vercel's
encrypted storage (the `vercel env add` flow) — never commit secrets to git.

---

## 9. Promote a preview deploy to production

Every PR preview deploys to a unique URL. To promote one to production
(skipping the merge-to-main flow, useful for hot-fixes):

```bash
# 1. Get the preview URL from PR:
gh pr view <PR-number> --json deploymentUrl
# Or check the PR comments — Vercel bot posts a preview URL.

# 2. Promote:
vercel promote <deployment-url>

# 3. Verify production:
curl -sI https://noosa-site-v2.vercel.app/ | head -1
```

**Use sparingly.** Hot-fixes bypass Victor's QA gate — only do this for
P0 outages (production 500s, security breach) where the cost of the
fix is greater than the risk of skipping QA.

---

## 10. Escalation: when to ping Sally vs. Tim

| Situation | Ping | Why |
|---|---|---|
| Production returns 5xx for >10 min | **Tim** | Site down = lost trust. Sally routes. |
| Sentry error rate spikes (same error ≥10× in 1h) | **Tim** | Real user impact. |
| Cron job fails 3+ consecutive runs | **Sally** | Likely script/infra bug — Sally dispatches. |
| Vercel project budget alert | **Tim** | Money decision. |
| Sentry or Better Stack account question | **Tim** | Account ownership. |
| Adding a new cron job (routine) | **Sally** | Operational, no user impact. |
| Updating design / content / copy | **Albert** | Editorial work. |
| Question about the spec ("does cron X check Y?") | **Sally** | Spec interpretation. |
| anything involving money / legal / external commitments | **Tim** | Sally doctrine: never spend, never commit without Tim. |

**To reach Sally:** message via OpenClaw agent routing (sally session).
**To reach Tim:** message via Telegram (`openclaw message send --channel telegram --target 7620112671`).
Always go through **Sally first** unless it's a P0 — Sally decides whether
Tim is needed and routes accordingly. (Sally doctrine per ROLE_CHARTER.)

---

## 11. Cron job reference

| ID (current) | Job | Schedule (BST) | Alert on | Log |
|---|---|---|---|---|
| `a8d7896d…ccf6b` | `health_check` | every 15 min | HTTP ≠ 200 | `health_check.log` |
| `4c2b5390…ea0ff` | `broken_link_check` | daily 09:30 | any 404 | `broken_link_check.log` |
| `719fd5eb…99f073b` | `sitemap_regen` | Mon 03:00 | sitemap 5xx / IndexNow failure | `sitemap_regen.log` |
| `2bc5c50d…9cea3` | `affiliate_check` | 1st of month 04:00 | any partner 4xx (except 429/503) | `affiliate_check.log` |
| `d00c015f…7426` | `db_backup` | daily 02:00 | tar/git failure | `db_backup.log` |

To get current IDs after any cron re-register:

```bash
openclaw cron list | grep noosa-site-v2
```

---

## 12. Affiliates — known 429/503 noise

Booking.com, Expedia, Stayz, and Airbnb rate-limit HEAD requests
aggressively (HTTP 429 / 503). The affiliate-check cron treats these as
**transient** and does **not** alert on them — only on hard 4xx
(e.g. 404, 410).

If you see the cron alert "4 of 8 affiliate link(s) failing" with all 429s,
that's expected behaviour — not a real outage. Wait for the next monthly
run (1st of the month at 04:00 BST).

If you see hard 4xx (not 429/503), one of:
- A partner deprecated a search URL format (e.g. /search?query=… → /results/…).
- A partner folded their affiliate program.
- Affiliate ID changed and the redirect is broken.

**Fix:** update the URL in `src/app/accommodation/page.tsx`, file a PR.

---

## Appendix: command reference

```bash
# View a cron job:
openclaw cron get <id>
openclaw cron show <id>

# Disable a cron job (without deleting):
openclaw cron disable <id>

# Re-enable:
openclaw cron enable <id>

# Remove a cron job:
openclaw cron rm <id>

# Run a cron job now (debug):
openclaw cron run <id>

# Recent runs:
openclaw cron runs <id>

# Status of the cron scheduler:
openclaw cron status
```

---

**Last updated:** Sprint 1.4 (TSK-2957-04) — 2026-08-27.
**Owner:** Dexter (technical) / Sally (operations).
**Next review:** When Sprint 2 begins or when first P0 incident closes.
