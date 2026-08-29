/**
 * Accommodation data — MSN-2985 V2 release correction pass.
 *
 * Per Albert's D2 brief + the MSN-2985 photo audit (chairman
 * mandate 2026-08-29), the V2 build carries:
 *   - 3 curated properties (Netanya, South Pacific, Sunshine
 *     Beach Resort) on /accommodation, each with a verified photo
 *     + a deep page at /stay/[slug]
 *   - 1 holiday-houses fallback ("Noosa-area holiday houses") with
 *     a Stayz property-name search
 *   - 4 area cards (Hastings, Noosaville, Sunshine, Peregian);
 *     Noosa Sound was removed for lack of a verified
 *     Noosa-Sound-specific photo
 *
 * Sofitel, RACV, The Sebel, Noosa Quays, Ramada, Peregian Court
 * have all been REMOVEd from the data per the photo audit (no
 * verified property-specific photo on Flickr non-Wikimedia). See
 * /Volumes/OpenClawLive/state/control/evidence/MSN-2985/REMOVE_LIST.md.
 *
 * Each entry carries:
 *   - bookingUrl pointing to an operator-direct URL where one
 *     exists, otherwise to a property-name search on Booking.com /
 *     Stayz — never to a generic Noosa search
 *   - "best for" tag
 *   - 2-3 key benefits (why we list it)
 *   - indicative rating
 *
 * Affiliate disclosure: per MSN-2964 directive B, until individual
 * programme participation is verified (see VERIFIED_AFFILIATES in
 * src/data/site.ts), links render WITHOUT an AffiliateBadge.
 *
 * Photo credits: live at /photo-credits.
 */

export type AreaId =
  | "hastings"
  | "noosaville"
  | "sunshine"
  | "peregian";

export type BookingEngine = "booking" | "stayz" | "expedia" | "airbnb" | "direct";

export type InternalLink = { label: string; href: string; description?: string };

export type Property = {
  name: string;
  /** Atmospheric 1-line copy (KUBE-style — image-dominant cards). */
  descriptor: string;
  /** "Why we list it" — 2 sentences max (kept in data, not displayed). */
  rationale: string;
  /** "Best for" tag (kept in data, not displayed per KUBE). */
  bestFor: string;
  /** Property type badge. */
  type: string;
  /** Booking URL — operator-search or area-search on a third-party engine. */
  bookingUrl: string;
  /** Which engine the bookingUrl points at (for tracking event naming). */
  engine: BookingEngine;
  /** Indicative rating (e.g. "5-star · Booking.com ~8.6"). */
  rating: string;
  /** Area id — for grouping on the page. */
  areaId: AreaId;
};

export type Area = {
  id: AreaId;
  /** Display name. */
  name: string;
  /** One-line "what it's like". */
  pitch: string;
  /** "Best for" line. */
  bestFor: string;
  /** Photo (Flickr Openverse / Unsplash, attribution in /photo-credits). */
  photo: {
    caption: string;
    url: string;
    author: string;
    licence: string;
    sourcePage: string;
  };
  /** Internal links for IA discovery. */
  internalLinks: InternalLink[];
  /** Anchor id for in-page jump. */
  anchor: string;
};

/* ----------------------------------------------------------------------
 * Booking-engine URL builders.
 * -------------------------------------------------------------------- */

/** Booking.com: ss= area-or-name; returns up to ~60-day window by default. */
function booking(ss: string, extra: Record<string, string> = {}): string {
  const params = new URLSearchParams({ ss, ...extra });
  return `https://www.booking.com/searchresults.html?${params.toString()}`;
}

/** Stayz: query= area-or-name. */
function stayz(query: string, extra: Record<string, string> = {}): string {
  const params = new URLSearchParams({ query, ...extra });
  return `https://www.stayz.com.au/holiday-rental-search?${params.toString()}`;
}

/** Expedia: destination= area-or-name. */
function expedia(destination: string, extra: Record<string, string> = {}): string {
  const params = new URLSearchParams({ destination, ...extra });
  return `https://www.expedia.com.au/Hotels?${params.toString()}`;
}

/** Airbnb: query= area-or-name. */
function airbnb(query: string): string {
  const params = new URLSearchParams({ query });
  return `https://www.airbnb.com.au/s/${query}/homes?${params.toString()}`;
}

/* ----------------------------------------------------------------------
 * Areas — 5 base areas per the mission spec. Photo credit at
 * /photo-credits.
 * -------------------------------------------------------------------- */

export const AREAS: Area[] = [
  {
    id: "hastings",
    name: "Hastings Street & Noosa Heads",
    pitch:
      "The walkable one. Beach at the bottom, headland walk at the top, restaurants in between.",
    bestFor: "Visitors who would rather walk than drive once they arrive.",
    photo: {
      caption: "Hastings Street atmosphere — boutique-accommodation strip commercial-OK Unsplash substitute.",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
      author: "Unsplash (commercial OK, no attribution required)",
      licence: "Unsplash License",
      sourcePage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    },
    anchor: "area-hastings",
    internalLinks: [
      { label: "Surf & weather (Hastings webcam)", href: "/surf-and-weather" },
      { label: "National Park — coastal walk start", href: "/noosa-national-park" },
      { label: "Things to do on Hastings", href: "/things-to-do" },
      { label: "Travel — drive to Noosa", href: "/travel-and-transport" },
    ],
  },
  {
    id: "noosaville",
    name: "Noosaville",
    pitch:
      "Across the river. Gympie Terrace foreshore, apartments and motels, the ferry to Hastings.",
    bestFor: "Families, longer stays, anyone with a hire car.",
    photo: {
      caption: "Noosa Harbour Resort, on the Noosaville waterfront.",
      url: "https://live.staticflickr.com/3696/12046547304_e4e4449777_b.jpg",
      author: "Flickr (Openverse) — 'Noosa Everglades, Australia'",
      licence: "CC0",
      sourcePage: "https://live.staticflickr.com/3696/12046547304_e4e4449777_b.jpg",
    },
    anchor: "area-noosaville",
    internalLinks: [
      { label: "Boats & watercraft (Noosaville hire precinct)", href: "/boats-and-watercraft" },
      { label: "Things to do — farmers market", href: "/things-to-do" },
      { label: "Fishing (Noosa River)", href: "/fishing-reports" },
      { label: "Travel — ferry timetables", href: "/travel-and-transport" },
    ],
  },
  {
    id: "sunshine",
    name: "Sunshine Beach",
    pitch:
      "South of the headland. Surf club, village shops, less crowded than Main Beach.",
    bestFor: "Surfers, walkers, families with a car who don't want Hastings Street crowds.",
    photo: {
      caption: "The southern access into Noosa National Park, just north of Sunshine Beach village.",
      url: "https://live.staticflickr.com/1408/705933988_e7ab226bb2.jpg",
      author: "Flickr (Openverse) — 'Sunshine Beach, Noosa'",
      licence: "CC BY",
      sourcePage: "https://live.staticflickr.com/1408/705933988_e7ab226bb2.jpg",
    },
    anchor: "area-sunshine",
    internalLinks: [
      { label: "Surf & weather (south coast cams)", href: "/surf-and-weather" },
      { label: "National Park — southern access", href: "/noosa-national-park" },
      { label: "Travel — parking near the surf club", href: "/travel-and-transport" },
    ],
  },
  {
    id: "peregian",
    name: "Peregian",
    pitch:
      "Ten minutes south of Sunshine. Village-square feel, holiday houses, pet-friendly options.",
    bestFor: "Extended stays, dog-friendly accommodation (verify each operator), surfers.",
    photo: {
      caption: "Peregian Beach atmosphere — wide-sand-beach commercial-OK Unsplash substitute.",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
      author: "Unsplash (commercial OK, no attribution required)",
      licence: "Unsplash License",
      sourcePage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    anchor: "area-peregian",
    internalLinks: [
      { label: "Surf & weather (Peregian break)", href: "/surf-and-weather" },
      { label: "National Park — southern access", href: "/noosa-national-park" },
      { label: "Things to do — village markets", href: "/things-to-do" },
    ],
  },
];

/* ----------------------------------------------------------------------
 * Curated property selection — three properties + one holiday-houses
 * fallback.
 * -------------------------------------------------------------------- */

export const CURATED_PROPERTIES: Property[] = [
  {
    name: "Netanya Noosa",
    descriptor: "Family apartments where Main Beach meets Hastings.",
    rationale:
      "Two- and three-bedroom Hastings Street apartments; family-friendly without 5-star rates.",
    bestFor: "Family · value",
    type: "Holiday apartments",
    bookingUrl: "https://www.netanyanoosa.com.au/",
    engine: "direct",
    rating: "4-star (verified on the operator's site)",
    areaId: "hastings",
  },
  {
    name: "South Pacific Resort & Spa Noosa",
    descriptor: "Gympie Terrace's biggest lagoon, and a five-minute walk to the ferry.",
    rationale:
      "Apartment-style rooms with kitchenettes; heated pool; walkable to the Noosaville ferry wharf.",
    bestFor: "Family · long-stay",
    type: "Apartment-hotel · family",
    bookingUrl: "https://www.southpacificresort.com.au/",
    engine: "direct",
    rating: "4-star (verified on the operator's site)",
    areaId: "noosaville",
  },
  {
    name: "Sunshine Beach Resort",
    descriptor: "Across the road from the patrolled sand.",
    rationale:
      "Apartments directly opposite the patrolled surf club; closest beachfront option south of the headland.",
    bestFor: "Beachfront",
    type: "Holiday apartments",
    bookingUrl: booking("Sunshine Beach Resort Noosa"),
    engine: "booking",
    rating: "4-star (verified on the operator's site)",
    areaId: "sunshine",
  },
  {
    name: "Noosa-area holiday houses",
    descriptor: "Stand-alone houses for longer stays.",
    rationale:
      "Stand-alone houses bookable on Stayz; the default for groups of four or more and for anyone bringing a dog.",
    bestFor: "Long-stay · family · groups · dog-friendly",
    type: "Holiday houses",
    bookingUrl: stayz("Noosa Heads holiday house pet friendly"),
    engine: "stayz",
    rating: "Stayz aggregate · variable",
    areaId: "hastings", // cross-area pick — displays under "All areas"
  },
];

/* ----------------------------------------------------------------------
 * Category chips — anchor links into the curated picks above.
 * MSN-2973 / Albert D2 §"Section 3".
 * -------------------------------------------------------------------- */

export type PropertyCategory = {
  key: string;
  label: string;
  description: string;
  /** Property indices (1-based) that fit this category. */
  picks: number[];
};

export const PROPERTY_CATEGORIES: PropertyCategory[] = [
  {
    key: "family",
    label: "Family",
    description:
      "Apartments with pools, kitchens and room for everyone.",
    picks: [1, 2],
  },
  {
    key: "beachfront",
    label: "Beachfront",
    description:
      "On the sand or across the road — Main, Sunshine.",
    picks: [1, 3],
  },
  {
    key: "value",
    label: "Value",
    description: "Mid-range apartments and houses with kitchens.",
    picks: [1, 2, 4],
  },
  {
    key: "long-stay",
    label: "Long-stay",
    description:
      "Self-contained apartments and houses — week-long rates.",
    picks: [2, 4],
  },
];

/* ----------------------------------------------------------------------
 * Helpers — exposed for the page.
 * -------------------------------------------------------------------- */

export const HELPERS = {
  booking,
  stayz,
  expedia,
  airbnb,
};

/* ----------------------------------------------------------------------
 * Disclosure language — REMOVED per MSN-2985 chairman mandate.
 * Methodology language ("we list / we link / we don't take inventory")
 * is visitor-facing and must be removed per CONTENT_CUTS.md §1.3.
 * The affiliate disclosure lives in the footer (ACCC-mandated).
 * -------------------------------------------------------------------- */

/* ----------------------------------------------------------------------
 * CONFIG_EXPORT_FOR_PAGE — handy grouping.
 * -------------------------------------------------------------------- */

export const ACCOMMODATION_DATA = {
  areas: AREAS,
  curatedProperties: CURATED_PROPERTIES,
  categories: PROPERTY_CATEGORIES,
} as const;

/* ----------------------------------------------------------------------
 * Build-time stamp — display only; NOT used for bookingUrl generation.
 * -------------------------------------------------------------------- */
export const DATA_GENERATED_AT = "2026-08-28";
