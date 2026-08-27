// src/data/sources.ts — the citation ledger.
// Every factual claim across the site must be traceable back to a Source here.
// Each Source has a URL, an authority level (official / open-data / partner / editorial), and a date.

export type Authority = "official" | "open-data" | "partner" | "editorial";
export type SourceGroup =
  | "weather"
  | "marine"
  | "park"
  | "tide"
  | "transport"
  | "restaurants"
  | "accommodation"
  | "tours"
  | "fishing"
  | "events"
  | "visinfo"
  | "media";

export type Source = {
  id: string;
  title: string;
  url: string;
  group: SourceGroup;
  authority: Authority;
  publisher: string;
  note?: string;
  lastVerified?: string; // ISO date — when Dexter last checked the link
};

export const SOURCES: Source[] = [
  // ── Weather (Bureau of Meteorology, official) ─────────────────────────────────
  {
    id: "bom-noosa-forecast",
    title: "BOM — Noosa Heads forecast",
    url: "http://www.bom.gov.au/qld/forecasts/noosa-heads.shtml",
    group: "weather",
    authority: "official",
    publisher: "Bureau of Meteorology (Australian Government)",
    note: "Authoritative 7-day forecast, current conditions and warnings for Noosa Heads.",
    lastVerified: "2026-08-24",
  },
  {
    id: "bom-marine",
    title: "BOM — Coastal waters forecast (Point Danger to Double Island Point)",
    url: "http://www.bom.gov.au/marine/qld/forecast-pointdanger.shtml",
    group: "marine",
    authority: "official",
    publisher: "Bureau of Meteorology",
    note: "Marine wind, sea and swell forecast for the Sunshine Coast waters.",
    lastVerified: "2026-08-24",
  },
  {
    id: "bom-tide-noosa",
    title: "BOM — Noosa Heads tide predictions",
    url: "http://www.bom.gov.au/australia/tides/#!/qld-noosa-heads",
    group: "tide",
    authority: "official",
    publisher: "Bureau of Meteorology",
    lastVerified: "2026-08-24",
  },
  {
    id: "bom-noosa-station",
    title: "BOM — Tewantin (closest inland station) observations",
    url: "http://www.bom.gov.au/products/IDQ60901/IDQ60901.94585.shtml",
    group: "weather",
    authority: "official",
    publisher: "Bureau of Meteorology",
    note: "Tewantin is the BOM station closest to Noosa Heads.",
    lastVerified: "2026-08-24",
  },

  // ── Parks & wildlife (Queensland Government) ─────────────────────────────────
  {
    id: "qpws-noosa",
    title: "Queensland Parks & Wildlife — Noosa National Park",
    url: "https://parks.des.qld.gov.au/parks/noosa/",
    group: "park",
    authority: "official",
    publisher: "Department of Environment, Science and Innovation (QPS)",
    lastVerified: "2026-08-24",
  },
  {
    id: "qpws-alerts",
    title: "QPWS — Park alerts and closures",
    url: "https://parks.des.qld.gov.au/alerts/?p=NOOSA",
    group: "park",
    authority: "official",
    publisher: "Queensland Parks & Wildlife Service",
    note: "Current closures, track warnings and conditions for Noosa National Park.",
    lastVerified: "2026-08-24",
  },
  {
    id: "qld-fraser",
    title: "K'gari (Fraser Island) World Heritage Area",
    url: "https://parks.des.qld.gov.au/parks/kgari/",
    group: "park",
    authority: "official",
    publisher: "Department of Environment, Science and Innovation (QPS)",
    note: "Permits, conditions and track information for K'gari (Fraser Island) day and overnight trips.",
    lastVerified: "2026-08-24",
  },
  {
    id: "qld-fishing",
    title: "Queensland recreational fishing rules",
    url: "https://www.qld.gov.au/recreation/things-to-do/activities/fishing",
    group: "fishing",
    authority: "official",
    publisher: "Queensland Government — Department of Primary Industries",
    lastVerified: "2026-08-24",
  },

  // ── Transport & council ──────────────────────────────────────────────────────
  {
    id: "translink",
    title: "Translink — Sunshine Coast bus & ferry",
    url: "https://translink.com.au/",
    group: "transport",
    authority: "official",
    publisher: "Translink (Queensland Government)",
    lastVerified: "2026-08-24",
  },
  {
    id: "noosa-council",
    title: "Noosa Council — parking and beaches",
    url: "https://www.noosa.qld.gov.au/Community/Beaches-and-parks",
    group: "transport",
    authority: "official",
    publisher: "Noosa Shire Council",
    lastVerified: "2026-08-24",
  },
  {
    id: "noosa-ferry",
    title: "Noosa North Shore Ferries",
    url: "https://www.noosanorthshoreferries.com.au/",
    group: "transport",
    authority: "partner",
    publisher: "Noosa North Shore Ferries (operator)",
    lastVerified: "2026-08-24",
  },

  // ── Visitor info / official regional tourism ────────────────────────────────
  {
    id: "visit-noosa",
    title: "Visit Noosa — official regional tourism site",
    url: "https://www.visitnoosa.com.au/",
    group: "visinfo",
    authority: "official",
    publisher: "Tourism Noosa",
    note: "Official destination site for the Noosa region.",
    lastVerified: "2026-08-24",
  },
  {
    id: "tn-events",
    title: "Visit Noosa — events calendar",
    url: "https://www.visitnoosa.com.au/whats-on",
    group: "events",
    authority: "official",
    publisher: "Tourism Noosa",
    lastVerified: "2026-08-24",
  },

  // ── Partner / operator sites (use with disclosure) ───────────────────────────
  {
    id: "sundive",
    title: "Sundive Noosa — dive & snorkel operator",
    url: "https://www.sundive.com.au/",
    group: "tours",
    authority: "partner",
    publisher: "Sundive (operator)",
    lastVerified: "2026-08-24",
  },
  {
    id: "noosa-adventure",
    title: "Noosa Ocean Adventures — fishing & surfing tours",
    url: "https://www.noosaoceanadventures.com/",
    group: "tours",
    authority: "partner",
    publisher: "Noosa Ocean Adventures (operator)",
    lastVerified: "2026-08-24",
  },
  {
    id: "everglades-ecocruises",
    title: "Everglades EcoCruises — Noosa Everglades",
    url: "https://www.evergladesecocruises.com.au/",
    group: "tours",
    authority: "partner",
    publisher: "Everglades EcoCruises (operator)",
    lastVerified: "2026-08-24",
  },
  {
    id: "noosa-blue-dolphin",
    title: "Noosa Blue Dolphin — boat hire",
    url: "https://www.noosabluedolphin.com.au/",
    group: "tours",
    authority: "partner",
    publisher: "Noosa Blue Dolphin (operator)",
    lastVerified: "2026-08-24",
  },

  // ── Open data / academic ─────────────────────────────────────────────────────
  {
    id: "wikipedia-noosa",
    title: "Wikipedia — Noosa Heads",
    url: "https://en.wikipedia.org/wiki/Noosa_Heads",
    group: "visinfo",
    authority: "open-data",
    publisher: "Wikipedia (CC BY-SA)",
    note: "Cross-reference for geography, history, demographics.",
    lastVerified: "2026-08-24",
  },
  {
    id: "wikipedia-noosa-np",
    title: "Wikipedia — Noosa National Park",
    url: "https://en.wikipedia.org/wiki/Noosa_National_Park",
    group: "park",
    authority: "open-data",
    publisher: "Wikipedia (CC BY-SA)",
    lastVerified: "2026-08-24",
  },

  // ── Affiliate destinations (official-fallback when env var unset) ────────────
  {
    id: "booking-noosa-search",
    title: "Booking.com — Noosa Heads search",
    url: "https://www.booking.com/searchresults.html?ss=Noosa+Heads",
    group: "accommodation",
    authority: "partner",
    publisher: "Booking.com (partner programme)",
    note: "Official fallback destination for accommodation links until affiliate ID env var is approved.",
    lastVerified: "2026-08-24",
  },
  {
    id: "agoda-noosa-search",
    title: "Agoda — Noosa Heads search",
    url: "https://www.agoda.com/search?city=17105&areaId=0&checkIn=2026-10-01",
    group: "accommodation",
    authority: "partner",
    publisher: "Agoda (partner programme)",
    lastVerified: "2026-08-24",
  },
  {
    id: "getyourguide-noosa",
    title: "GetYourGuide — Noosa",
    url: "https://www.getyourguide.com/noosa-l322/",
    group: "tours",
    authority: "partner",
    publisher: "GetYourGuide (partner programme)",
    lastVerified: "2026-08-24",
  },
  {
    id: "viator-noosa",
    title: "Viator — Noosa",
    url: "https://www.viator.com/Noosa/d6169-ttd",
    group: "tours",
    authority: "partner",
    publisher: "Viator (partner programme)",
    lastVerified: "2026-08-24",
  },
  {
    id: "klook-noosa",
    title: "Klook — Noosa",
    url: "https://www.klook.com/en-AU/search/result/?keyword=Noosa",
    group: "tours",
    authority: "partner",
    publisher: "Klook (partner programme)",
    lastVerified: "2026-08-24",
  },
];

export function sourceById(id: string): Source | undefined {
  return SOURCES.find((s) => s.id === id);
}

export const SOURCE_GROUPS: { id: SourceGroup; label: string; description: string }[] = [
  {
    id: "weather",
    label: "Weather & climate",
    description: "Bureau of Meteorology is the only authoritative source for Australian forecasts.",
  },
  {
    id: "marine",
    label: "Marine & surf",
    description: "BOM coastal waters forecast provides official wind, sea and swell resolution.",
  },
  {
    id: "tide",
    label: "Tides",
    description: "Tidal predictions come from BOM; live tide gauges are exposed by state ports.",
  },
  {
    id: "park",
    label: "Parks & wildlife",
    description: "Queensland Parks & Wildlife Service publishes authoritative park conditions and alerts.",
  },
  {
    id: "fishing",
    label: "Fishing",
    description: "Queensland Government fishing rules; current bulletins from local tackle shops.",
  },
  {
    id: "transport",
    label: "Transport",
    description: "Translink for buses and ferries; Noosa Council for local parking and beach access.",
  },
  {
    id: "restaurants",
    label: "Restaurants",
    description: "Real venues with verified official websites; no fabricated businesses.",
  },
  {
    id: "accommodation",
    label: "Accommodation",
    description: "Affiliate link network with official-fallback when no partner ID is approved.",
  },
  {
    id: "tours",
    label: "Tours & boat hire",
    description: "Real operators with current websites; affiliate links where partner IDs exist.",
  },
  {
    id: "events",
    label: "Events",
    description: "Tourism Noosa event calendar and partner venues for seasonal events.",
  },
  {
    id: "visinfo",
    label: "Visitor information",
    description: "Regional tourism body and open-data references (Wikipedia, ABS).",
  },
  {
    id: "media",
    label: "Media & images",
    description: "All Wikimedia Commons imagery is CC BY/SA with attribution.",
  },
];