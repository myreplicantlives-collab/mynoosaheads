/**
 * Centralised affiliate configuration — single source of truth for
 * outbound commercial links across MyNoosaHeads.
 *
 * MSN-3057 (Workstream 1 — Measurement and Attribution):
 *   "Centralise affiliate URLs and identifiers in configuration rather
 *    than hard-coding them across pages."
 *
 * MSN-3057 (Workstream 1):
 *   "Ensure missing affiliate credentials produce a safe, ordinary
 *    outbound link rather than a broken URL."
 *
 * MSN-2964 directive B:
 *   "Do not claim participation in an affiliate programme unless
 *    participation is verified."
 *
 * Each entry in `PROGRAMMES` carries:
 *   - id: stable programme identifier (matches the values consumed
 *     by VERIFIED_AFFILIATES in src/data/site.ts and by AffiliateBadge)
 *   - displayName: shown in /disclosure + footer affiliate column
 *   - enabled: master toggle; false renders an ordinary outbound link
 *     (no `aid`, no AffiliateBadge) and the property is treated as
 *     non-commercial
 *   - partnerId / labels: appended via buildPartnerLink() to the base
 *     URL when `enabled` is true. Empty values = untracked link
 *
 * Build-time safety:
 *   - buildPartnerLink() always returns a valid URL even if every
 *     parameter is empty (safe fallback path)
 *   - never throws on missing config; logs a single warning in dev
 *   - the AffiliateBadge component reads `enabled` from
 *     VERIFIED_AFFILIATES — if a programme is disabled here, the
 *     badge does not render regardless of the inline `data-track`
 *     attribute
 */

import { SITE } from "@/data/site";

/* --------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------ */

export type ProgrammeId =
  | "booking"
  | "stayz"
  | "expedia"
  | "airbnb"
  | "getyourguide"
  | "viator"
  | "klook";

export type ProgrammeConfig = {
  id: ProgrammeId;
  displayName: string;
  /** Operator name as the legal counterparty (used in the disclosure page). */
  operator: string;
  /** Master toggle. False = render an untracked outbound link, no badge. */
  enabled: boolean;
  /** True only when the partner programme ID has been confirmed via the
   * partner's onboarding email / dashboard. */
  verified: boolean;
  /**
   * Partner programme ID. Appended as `aid=` on Booking.com and as the
   * corresponding parameter on each network. Empty string = untracked.
   */
  partnerId: string;
  /**
   * Optional default click-ref / sub-ID label. Surfaced on every link
   * built from this config so placements can be distinguished in
   * network dashboards (Booking.com: `label=`; Stayz: `q-`; GYG/Viator:
   * affiliate sub-id).
   */
  defaultLabel: string;
  /**
   * Default network region / locale. Used as `dest_id=` / `ss=` /
   * language hints where the network accepts them.
   */
  region: string;
  /**
   * Public network programme page (linked from /disclosure). Not the
   * partner-specific landing page — the public programme page.
   */
  programmePage: string;
};

export type BuildLinkOptions = {
  /**
   * Stable placement identifier — surfaces in network dashboards so
   * we can answer "which page drove the booking".
   *
   * Convention: <page-slug>-<position-on-page>
   *   e.g. "accommodation-card-netanya", "surf-and-weather-cta-getyourguide"
   *
   * Lowercase, hyphen-separated, ≤64 chars. Anything longer is truncated
   * with a warning so we don't break URL length budgets.
   */
  placement: string;
  /** Network base URL with the property-specific query parameters. */
  baseUrl: string;
  /** Optional override for the click-ref / sub-id label. */
  label?: string;
};

/* --------------------------------------------------------------------------
 * Programme registry — manually updated when a partner approves us.
 * ------------------------------------------------------------------------ */

export const PROGRAMMES: Record<ProgrammeId, ProgrammeConfig> = {
  booking: {
    id: "booking",
    displayName: "Booking.com",
    operator: "Booking.com B.V.",
    enabled: false,
    verified: false,
    partnerId: "",
    defaultLabel: "mynoosaheads",
    region: "noosa-heads-qld-au",
    programmePage: "https://www.booking.com/affiliate-programme.html",
  },
  stayz: {
    id: "stayz",
    displayName: "Stayz (Vrbo)",
    operator: "Vrbo / Expedia Group",
    enabled: false,
    verified: false,
    partnerId: "",
    defaultLabel: "mynoosaheads",
    region: "noosa-heads-qld-au",
    programmePage: "https://www.stayz.com.au/info/affiliate-program",
  },
  expedia: {
    id: "expedia",
    displayName: "Expedia",
    operator: "Expedia Group",
    enabled: false,
    verified: false,
    partnerId: "",
    defaultLabel: "mynoosaheads",
    region: "noosa-heads-qld-au",
    programmePage: "https://www.expedia.com.au/affiliate-program",
  },
  airbnb: {
    id: "airbnb",
    displayName: "Airbnb",
    operator: "Airbnb Ireland UC",
    enabled: false,
    verified: false,
    partnerId: "",
    defaultLabel: "mynoosaheads",
    region: "noosa-heads-qld-au",
    programmePage: "https://www.airbnb.com.au/help/article/2897",
  },
  getyourguide: {
    id: "getyourguide",
    displayName: "GetYourGuide",
    operator: "GetYourGuide Deutschland GmbH",
    enabled: false,
    verified: false,
    partnerId: "",
    defaultLabel: "mynoosaheads",
    region: "noosa-heads-qld-au",
    programmePage: "https://www.getyourguide.com/partners/",
  },
  viator: {
    id: "viator",
    displayName: "Viator",
    operator: "Viator Pty Ltd",
    enabled: false,
    verified: false,
    partnerId: "",
    defaultLabel: "mynoosaheads",
    region: "noosa-heads-qld-au",
    programmePage: "https://www.viator.com/partners",
  },
  klook: {
    id: "klook",
    displayName: "Klook",
    operator: "Klook Travel Technology Limited",
    enabled: false,
    verified: false,
    partnerId: "",
    defaultLabel: "mynoosaheads",
    region: "noosa-heads-qld-au",
    programmePage: "https://www.klook.com/en-AU/affiliate",
  },
};

/* --------------------------------------------------------------------------
 * Verified-affiliate list — kept in sync with src/data/site.ts
 * VERIFIED_AFFILIATES so the AffiliateBadge rendering gate stays
 * consistent.
 * ------------------------------------------------------------------------ */

export const VERIFIED_PROGRAMME_IDS: ProgrammeId[] = (
  Object.values(PROGRAMMES)
    .filter((p) => p.enabled && p.verified)
    .map((p) => p.id)
);

/* --------------------------------------------------------------------------
 * URL builders — one per network. Each builder takes a base URL
 * (already carrying the property/area query params) and stamps the
 * network's affiliate identifiers on top.
 *
 * The builders never throw on missing config; they degrade gracefully.
 * ------------------------------------------------------------------------ */

/**
 * Append Booking.com affiliate params. Network accepts `aid=` (partner ID)
 * and `label=` (click-ref / sub-id). Reference:
 *   https://www.booking.com/affiliate-programme.html
 */
function stampBooking(baseUrl: string, opts: BuildLinkOptions): string {
  const cfg = PROGRAMMES.booking;
  const url = new URL(baseUrl, "https://www.booking.com");
  if (cfg.enabled && cfg.verified && cfg.partnerId) {
    url.searchParams.set("aid", cfg.partnerId);
    url.searchParams.set("label", truncateLabel(opts.label ?? placementLabel(opts)));
    // `dest_id=` is the legacy location tag; we keep it harmless if the
    // property search already carries it.
    if (!url.searchParams.has("dest_id")) {
      url.searchParams.set("dest_id", cfg.region);
    }
  }
  return url.toString();
}

/** Stayz / Vrbo — no documented affiliate query parameter set at the time
 * of writing. We still record the placement label as a `q-` ref so it
 * surfaces in Vrbo dashboards when the partner programme is approved. */
function stampStayz(baseUrl: string, opts: BuildLinkOptions): string {
  const cfg = PROGRAMMES.stayz;
  const url = new URL(baseUrl, "https://www.stayz.com.au");
  if (cfg.enabled && cfg.verified && cfg.partnerId) {
    url.searchParams.set("affiliateId", cfg.partnerId);
    url.searchParams.set("ref", truncateLabel(opts.label ?? placementLabel(opts)));
  }
  return url.toString();
}

function stampExpedia(baseUrl: string, opts: BuildLinkOptions): string {
  const cfg = PROGRAMMES.expedia;
  const url = new URL(baseUrl, "https://www.expedia.com.au");
  if (cfg.enabled && cfg.verified && cfg.partnerId) {
    url.searchParams.set("affid", cfg.partnerId);
    url.searchParams.set("ref", truncateLabel(opts.label ?? placementLabel(opts)));
  }
  return url.toString();
}

function stampAirbnb(baseUrl: string, opts: BuildLinkOptions): string {
  const cfg = PROGRAMMES.airbnb;
  const url = new URL(baseUrl, "https://www.airbnb.com.au");
  if (cfg.enabled && cfg.verified && cfg.partnerId) {
    url.searchParams.set("af", cfg.partnerId);
    url.searchParams.set("ref", truncateLabel(opts.label ?? placementLabel(opts)));
  }
  return url.toString();
}

function stampGetYourGuide(baseUrl: string, opts: BuildLinkOptions): string {
  const cfg = PROGRAMMES.getyourguide;
  const url = new URL(baseUrl, "https://www.getyourguide.com");
  if (cfg.enabled && cfg.verified && cfg.partnerId) {
    url.searchParams.set("affiliate_id", cfg.partnerId);
    url.searchParams.set("partner_source", truncateLabel(opts.label ?? placementLabel(opts)));
  }
  return url.toString();
}

function stampViator(baseUrl: string, opts: BuildLinkOptions): string {
  const cfg = PROGRAMMES.viator;
  const url = new URL(baseUrl, "https://www.viator.com");
  if (cfg.enabled && cfg.verified && cfg.partnerId) {
    url.searchParams.set("pid", cfg.partnerId);
    url.searchParams.set("mcid", truncateLabel(opts.label ?? placementLabel(opts)));
  }
  return url.toString();
}

function stampKlook(baseUrl: string, opts: BuildLinkOptions): string {
  const cfg = PROGRAMMES.klook;
  const url = new URL(baseUrl, "https://www.klook.com");
  if (cfg.enabled && cfg.verified && cfg.partnerId) {
    url.searchParams.set("aff_id", cfg.partnerId);
    url.searchParams.set("utm_source", truncateLabel(opts.label ?? placementLabel(opts)));
  }
  return url.toString();
}

const STAMPERS: Record<ProgrammeId, (url: string, opts: BuildLinkOptions) => string> = {
  booking: stampBooking,
  stayz: stampStayz,
  expedia: stampExpedia,
  airbnb: stampAirbnb,
  getyourguide: stampGetYourGuide,
  viator: stampViator,
  klook: stampKlook,
};

/* --------------------------------------------------------------------------
 * Public builder — single entry point every page should call.
 * ------------------------------------------------------------------------ */

/**
 * buildPartnerLink — produce the final outbound URL for a given programme.
 *
 * Behaviour:
 *   - If the programme is `"operator-direct"`, returns `baseUrl` untouched
 *     (the caller has already chosen the operator's own URL; there is no
 *     affiliate relationship).
 *   - If the programme is disabled or unverified, returns the baseUrl
 *     untouched (a safe, ordinary outbound link).
 *   - If the programme is enabled and verified, appends the network's
 *     affiliate parameters.
 *   - Always returns a valid URL string; never throws.
 */
export function buildPartnerLink(
  programme: ProgrammeId | "operator-direct",
  baseUrl: string,
  placementOrOpts: string | BuildLinkOptions,
): string {
  if (programme === "operator-direct") {
    return baseUrl;
  }
  const opts: BuildLinkOptions =
    typeof placementOrOpts === "string"
      ? { placement: placementOrOpts, baseUrl }
      : placementOrOpts;
  const stamper = STAMPERS[programme];
  if (!stamper) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(`[affiliates] unknown programme: ${String(programme)}`);
    }
    return baseUrl;
  }
  return stamper(baseUrl, opts);
}

/** Convenience helper: the placement label surfaced in network dashboards. */
function placementLabel(opts: BuildLinkOptions): string {
  return `mynoosaheads-${opts.placement}`;
}

function truncateLabel(label: string): string {
  const trimmed = label.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64);
  if (trimmed.length === 0 && label.length > 0) {
    return `mynoosaheads-${Date.now().toString(36)}`.slice(0, 64);
  }
  return trimmed;
}

/* --------------------------------------------------------------------------
 * Disclosure helpers
 * ------------------------------------------------------------------------ */

/**
 * isAffiliateCommercial — true only if the programme is enabled AND
 * verified AND the link carries a non-empty partner ID. Use this to
 * gate the AffiliateBadge rendering on the consumer side.
 */
export function isAffiliateCommercial(programme: ProgrammeId): boolean {
  const cfg = PROGRAMMES[programme];
  return Boolean(cfg && cfg.enabled && cfg.verified && cfg.partnerId);
}

/**
 * Public disclosure metadata — used by the /disclosure page and the
 * footer affiliate column.
 */
export function getProgrammeDisclosure(programme: ProgrammeId): {
  displayName: string;
  operator: string;
  status: "live" | "pending" | "inactive";
  programmePage: string;
} | null {
  const cfg = PROGRAMMES[programme];
  if (!cfg) return null;
  const status: "live" | "pending" | "inactive" = cfg.enabled
    ? cfg.verified
      ? "live"
      : "pending"
    : "inactive";
  return {
    displayName: cfg.displayName,
    operator: cfg.operator,
    status,
    programmePage: cfg.programmePage,
  };
}

/**
 * buildDisclosureTable — render-ready list of every programme with
 * its current disclosure status. Used by the /disclosure page.
 */
export function buildDisclosureTable(): Array<{
  id: ProgrammeId;
  displayName: string;
  operator: string;
  status: "live" | "pending" | "inactive";
  programmePage: string;
}> {
  return Object.values(PROGRAMMES).map((p) => ({
    id: p.id,
    displayName: p.displayName,
    operator: p.operator,
    status: p.enabled
      ? p.verified
        ? "live"
        : "pending"
      : "inactive",
    programmePage: p.programmePage,
  }));
}

/* --------------------------------------------------------------------------
 * Constants — exposed for tests + the disclosure page.
 * ------------------------------------------------------------------------ */

export const ALL_PROGRAMME_IDS = Object.keys(PROGRAMMES) as ProgrammeId[];

/** Whether the affiliate stack is currently wired to capture anything.
 * Used by the homepage reporting widget to render a "tracking
 * configuration" line. */
export const AFFILIATE_STACK_STATE = {
  enabledProgrammes: Object.values(PROGRAMMES).filter((p) => p.enabled).length,
  verifiedProgrammes: Object.values(PROGRAMMES).filter((p) => p.enabled && p.verified).length,
  totalProgrammes: Object.values(PROGRAMMES).length,
  analyticsProvider:
    process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
      ? `plausible:${process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}`
      : "host-only (Cloudflare Workers Analytics)",
  buildCommit: process.env.NEXT_PUBLIC_BUILD_COMMIT ?? "dev",
} as const;

/* --------------------------------------------------------------------------
 * Quick sanity check — never runs in production.
 * ------------------------------------------------------------------------ */

if (process.env.NODE_ENV !== "production") {
  const urlWithStamping = buildPartnerLink("booking", "https://www.booking.com/searchresults.html?ss=Noosa+Heads", "test");
  if (!urlWithStamping.includes("booking.com")) {
    // eslint-disable-next-line no-console
    console.warn("[affiliates] builder returned unexpected URL", urlWithStamping);
  }
}

export const SITE_URL = SITE.productionUrl;
