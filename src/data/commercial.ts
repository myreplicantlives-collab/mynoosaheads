/**
 * Commercial pages shared data.
 *
 * MSN-3057 (Workstream 2 — commercial page architecture). Drives the
 * 13 accommodation + 9 activity commercial-cluster pages built in M2.
 *
 * The strategy is "verified content only". Every operator URL either:
 *   - points to the operator's own site (operator-direct, no
 *     affiliate tracking); OR
 *   - points to a network search URL that is currently
 *     untracked (the AffiliateBadge will not render until a programme
 *     is verified, per the central config).
 *
 * We deliberately do NOT make up operators or properties we cannot
 * verify. Where the content of a page cannot meet the brief's
 * decision-making bar, the page is rendered with the
 * <NotReadyBanner> at the top.
 */

import { VERIFIED } from "@/data/photos-msn2982";
import type { ProgrammeId } from "@/lib/affiliates";

/* --------------------------------------------------------------------------
 * Property inventory (operator-direct or network search, untracked)
 * ------------------------------------------------------------------------ */

export type CommercialProperty = {
  name: string;
  descriptor: string;
  bestFor: string;
  programme: ProgrammeId | "operator-direct";
  /** Built URL — operator-direct for verified operators, network search
   *  for properties that don't have one. Empty = "see operator-direct
   *  link in property detail". */
  url: string;
  areaId: "hastings" | "noosaville" | "sunshine" | "peregian";
  /** Whether dogs are accepted (operator's policy, not a network claim). */
  petsOk?: boolean;
  /** Walking distance to the beach (rounded band, qualitative). */
  beachBand?: string;
  /** Walking distance to ferry / river (rounded band). */
  riverBand?: string;
  /** Pool facility summary. */
  poolNote?: string;
  /** Why we list it — short paragraph (2 sentences). */
  why: string;
  /** Honest trade-off — short paragraph. */
  tradeOff: string;
  /** Last verified date. */
  lastVerified: string;
  /** Photo reference from VERIFIED — image + alt text. */
  photo: { src: string; alt: string };
  /** True if the property has a verified operational pool. */
  hasPool?: boolean;
  /** True if the property has verified beach access (walkable). */
  walkableBeach?: boolean;
  /** True if the property has verified self-catering apartments. */
  hasApartments?: boolean;
  /** True if the property has family-friendly rooms / facilities. */
  familyFriendly?: boolean;
  /** Luxe / premium tag (qualitative). */
  premium?: boolean;
};

/**
 * The four curated anchor properties from the MSN-2985 / MSN-3044
 * baseline plus the holiday-houses fallback. Truthfully small at
 * three — we do not fabricate additional properties we cannot verify.
 */
export const COMMERCIAL_PROPERTIES: CommercialProperty[] = [
  {
    name: "Netanya Noosa",
    descriptor: "Family apartments where Main Beach meets Hastings.",
    bestFor: "Family · walk to beach",
    programme: "operator-direct",
    url: "https://www.netanyanoosa.com.au/",
    areaId: "hastings",
    petsOk: false,
    beachBand: "1 minute",
    riverBand: "—",
    poolNote: "Outdoor pool (small, not heated).",
    hasPool: true,
    walkableBeach: true,
    hasApartments: true,
    familyFriendly: true,
    why:
      "Operator-direct booking on Hastings Street, two minutes from Main Beach. Family-sized two- and three-bedroom apartments with full kitchens; the on-site manager runs a tight ship.",
    tradeOff:
      "Older-fit bathrooms than the new build across the road; Hastings Street paid parking fills by 11 am in summer (the operator sells a permit at reception).",
    lastVerified: "2026-08-31",
    photo: {
      src: VERIFIED.cards.netanyaApartments.path,
      alt: VERIFIED.cards.netanyaApartments.caption,
    },
  },
  {
    name: "South Pacific Resort & Spa Noosa",
    descriptor: "Gympie Terrace's biggest lagoon, and a five-minute walk to the ferry.",
    bestFor: "Family · long-stay · self-caterers",
    programme: "operator-direct",
    url: "https://www.southpacificresort.com.au/",
    areaId: "noosaville",
    petsOk: false,
    beachBand: "Ferry (15 min) or 20 min drive",
    riverBand: "5 minutes",
    poolNote: "Heated lagoon pool with swim-up bar; smaller heated spa pool.",
    hasPool: true,
    walkableBeach: false,
    hasApartments: true,
    familyFriendly: true,
    why:
      "The biggest heated pool on Gympie Terrace and a five-minute walk to the Noosaville ferry wharf — easy day trips to Hastings Street without a car.",
    tradeOff:
      "Across the river from Main Beach (15-minute ferry or 20-minute drive); on-site restaurant closed for redevelopment until 2026 Q4 per the operator.",
    lastVerified: "2026-08-31",
    photo: {
      src: VERIFIED.cards.southPacificResort.path,
      alt: VERIFIED.cards.southPacificResort.caption,
    },
  },
  {
    name: "Sunshine Beach Resort",
    descriptor: "Across the road from the patrolled sand.",
    bestFor: "Beachfront · dogs on request",
    programme: "booking",
    url: "https://www.booking.com/searchresults.html?ss=Sunshine+Beach+Resort+Noosa",
    areaId: "sunshine",
    petsOk: true,
    beachBand: "Across the road",
    riverBand: "—",
    poolNote: "Outdoor pool, small heated spa.",
    hasPool: true,
    walkableBeach: true,
    hasApartments: true,
    familyFriendly: true,
    why:
      "Directly across the road from the patrolled Sunshine Beach surf club. Bookable on Booking.com with a property-name search; dog-friendly units available on request.",
    tradeOff:
      "Not on Hastings Street — you'll drive or take the 30-minute coastal walk to reach the headland start. No on-site restaurant; village shops five minutes south.",
    lastVerified: "2026-08-31",
    photo: {
      src: VERIFIED.cards.sunshineBeach.path,
      alt: VERIFIED.cards.sunshineBeach.caption,
    },
  },
];

/* --------------------------------------------------------------------------
 * Operator inventory — activity operators
 * ------------------------------------------------------------------------ */

export type CommercialOperator = {
  name: string;
  descriptor: string;
  programme: ProgrammeId | "operator-direct";
  url: string;
  bestFor: string;
  duration?: string;
  priceBand?: string;
  /** Photo. */
  photo: { src: string; alt: string };
};

/* --------------------------------------------------------------------------
 * Activity operators — surf lessons (Noosa)
 *
 * These are the four surf schools operating out of Noosa Main Beach
 * that we can reference by name with confidence. Per the brief we
 * do NOT claim affiliate participation until verified.
 * ------------------------------------------------------------------------ */

export const SURF_LESSON_OPERATORS: CommercialOperator[] = [
  {
    name: "Noosa Longboards",
    descriptor: "Family-friendly soft-board lessons at Noosa Main Beach.",
    programme: "operator-direct",
    url: "https://www.noosalongboards.com.au/",
    bestFor: "Family · first lesson",
    duration: "2 hours",
    priceBand: "Mid-range",
    photo: {
      src: VERIFIED.cards.paddlingOut.path,
      alt: VERIFIED.cards.paddlingOut.caption,
    },
  },
  {
    name: "Noosa Beach Surf Lessons",
    descriptor: "Beginner to intermediate group lessons on the patrolled beach.",
    programme: "operator-direct",
    url: "https://www.noosabeachsurflessons.com.au/",
    bestFor: "Beginner · group",
    duration: "2 hours",
    priceBand: "Mid-range",
    photo: {
      src: VERIFIED.cards.paddlingOut.path,
      alt: VERIFIED.cards.paddlingOut.caption,
    },
  },
  {
    name: "Merrick's Learn-to-Surf Noosa",
    descriptor: "Small-group lessons at Noosa Main Beach; coaching rather than crowd-control.",
    programme: "operator-direct",
    url: "https://www.learntosurfnoosa.com.au/",
    bestFor: "First lesson · small group",
    duration: "2 hours",
    priceBand: "Mid-range",
    photo: {
      src: VERIFIED.cards.paddlingOut.path,
      alt: VERIFIED.cards.paddlingOut.caption,
    },
  },
  {
    name: "Surfcoaching Noosa",
    descriptor: "Private and small-group surf coaching for returning surfers.",
    programme: "operator-direct",
    url: "https://www.surfcoachingnoosa.com.au/",
    bestFor: "Intermediate · private",
    duration: "1.5–3 hours",
    priceBand: "Higher",
    photo: {
      src: VERIFIED.cards.paddlingOut.path,
      alt: VERIFIED.cards.paddlingOut.caption,
    },
  },
];

/* --------------------------------------------------------------------------
 * River cruises — the Noosa Ferry is the public-service option; charter
 * boats add the private hire angle.
 * ------------------------------------------------------------------------ */

export const RIVER_CRUISE_OPERATORS: CommercialOperator[] = [
  {
    name: "Noosa Ferry",
    descriptor: "Public ferry connecting Noosa Heads ↔ Noosaville along Gympie Terrace; hop-on, hop-off all day.",
    programme: "operator-direct",
    url: "https://www.noosaferry.com/",
    bestFor: "Hop-on-hop-off · car-free",
    duration: "All-day pass",
    priceBand: "Low",
    photo: {
      src: VERIFIED.cards.morningRiver.path,
      alt: VERIFIED.cards.morningRiver.caption,
    },
  },
  {
    name: "Noosa River Cruises",
    descriptor: "Scheduled lunch and sunset cruises from the Noosaville wharf.",
    programme: "operator-direct",
    url: "https://www.noosarivercruises.com/",
    bestFor: "Sunset · lunch",
    duration: "2–3 hours",
    priceBand: "Mid-range",
    photo: {
      src: VERIFIED.cards.morningRiver.path,
      alt: VERIFIED.cards.morningRiver.caption,
    },
  },
  {
    name: "Noosa Ocean Kayak Tours",
    descriptor: "Guided kayak tours of the Noosa River and the upper estuaries.",
    programme: "operator-direct",
    url: "https://www.noosaoceankayaktours.com.au/",
    bestFor: "Guided · wildlife",
    duration: "2 hours",
    priceBand: "Mid-range",
    photo: {
      src: VERIFIED.cards.boatRiverMouth.path,
      alt: VERIFIED.cards.boatRiverMouth.caption,
    },
  },
];

/* --------------------------------------------------------------------------
 * Everglades tours — upper Noosa River
 * ------------------------------------------------------------------------ */

export const EVERGLADES_OPERATORS: CommercialOperator[] = [
  {
    name: "Noosa Everglades Tours",
    descriptor: "Cruise + kayak tours into the upper Noosa River (the 'river of mirrors').",
    programme: "operator-direct",
    url: "https://www.noosaeverglades.com.au/",
    bestFor: "Half-day · wildlife",
    duration: "Half day",
    priceBand: "Mid-range",
    photo: {
      src: VERIFIED.cards.noosaEverglades.path,
      alt: VERIFIED.cards.noosaEverglades.caption,
    },
  },
  {
    name: "Habitat Noosa",
    descriptor: "Eco-camp + canoe tours at Lake Cootharaba (gateway to the upper Noosa).",
    programme: "operator-direct",
    url: "https://www.habitatnoosa.com.au/",
    bestFor: "Family · camping",
    duration: "Half or full day",
    priceBand: "Mid-range",
    photo: {
      src: VERIFIED.cards.noosaEverglades.path,
      alt: VERIFIED.cards.noosaEverglades.caption,
    },
  },
];

/* --------------------------------------------------------------------------
 * Kayak + paddleboard hire — Noosaville foreshore walk-up
 * ------------------------------------------------------------------------ */

export const HIRE_OPERATORS: CommercialOperator[] = [
  {
    name: "Noosa Stand Up Paddle",
    descriptor: "Walk-up SUP and kayak hire on the Noosaville foreshore.",
    programme: "operator-direct",
    url: "https://www.noosastanduppaddle.com.au/",
    bestFor: "Walk-up · SUP",
    duration: "Hourly",
    priceBand: "Low",
    photo: {
      src: VERIFIED.cards.morningRiver.path,
      alt: VERIFIED.cards.morningRiver.caption,
    },
  },
  {
    name: "Noosa Ocean Kayak Tours (hire)",
    descriptor: "Self-guided kayak hire from the Noosaville wharf.",
    programme: "operator-direct",
    url: "https://www.noosaoceankayaktours.com.au/",
    bestFor: "Self-guided · kayak",
    duration: "Hourly",
    priceBand: "Low",
    photo: {
      src: VERIFIED.cards.boatRiverMouth.path,
      alt: VERIFIED.cards.boatRiverMouth.caption,
    },
  },
];

/* --------------------------------------------------------------------------
 * Hinterland day trips — Eumundi + the Blackall Range villages
 * ------------------------------------------------------------------------ */

export const HINTERLAND_OPERATORS: CommercialOperator[] = [
  {
    name: "The Original Eumundi Markets",
    descriptor: "Wed + Sat markets under the fig trees on Memorial Drive, Eumundi (15 min drive from Noosa).",
    programme: "operator-direct",
    url: "https://www.eumundimarkets.com.au/",
    bestFor: "Markets · maker stalls",
    duration: "Half day",
    priceBand: "Free entry",
    photo: {
      src: VERIFIED.cards.eumundiMarkets.path,
      alt: VERIFIED.cards.eumundiMarkets.caption,
    },
  },
];

/* --------------------------------------------------------------------------
 * Family activities — bookable, age-banded
 * ------------------------------------------------------------------------ */

export const FAMILY_ACTIVITY_OPERATORS: CommercialOperator[] = [
  {
    name: "Noosa Ocean Kayak Tours — Family tours",
    descriptor: "Guided family-friendly kayak tours on the calm lower Noosa River.",
    programme: "operator-direct",
    url: "https://www.noosaoceankayaktours.com.au/",
    bestFor: "Family · calm water",
    duration: "1.5–2 hours",
    priceBand: "Mid-range",
    photo: {
      src: VERIFIED.cards.morningRiver.path,
      alt: VERIFIED.cards.morningRiver.caption,
    },
  },
  {
    name: "Noosa Ferry (Family Day Pass)",
    descriptor: "Hop-on-hop-off ferry day pass — convenient way to keep the family moving between precincts.",
    programme: "operator-direct",
    url: "https://www.noosaferry.com/",
    bestFor: "Family · car-free",
    duration: "All day",
    priceBand: "Low",
    photo: {
      src: VERIFIED.cards.morningRiver.path,
      alt: VERIFIED.cards.morningRiver.caption,
    },
  },
];

/* --------------------------------------------------------------------------
 * Airport transfers — BNE (Brisbane) + MCY (Sunshine Coast)
 *
 * BNE is ~2h drive. Con-x-ion is the dominant shared shuttle
 * operator; private transfer operators (Noosa Transfers) exist.
 *
 * MCY (Sunshine Coast Airport at Marcoola) is ~30 min from Noosa
 * and is the closer option for most visitors.
 * ------------------------------------------------------------------------ */

export const BNE_TRANSFER_OPERATORS: CommercialOperator[] = [
  {
    name: "Con-x-ion Airport Transfers",
    descriptor: "Scheduled coach transfer BNE ↔ Noosa; runs throughout the day.",
    programme: "operator-direct",
    url: "https://www.con-x-ion.com/destinations/noosa/",
    bestFor: "Scheduled · shared",
    duration: "~2 hours",
    priceBand: "Mid-range",
    photo: {
      src: "/img/cards/noosa-rainforest.jpg",
      alt: VERIFIED.cards.noosaRainforest.caption,
    },
  },
  {
    name: "Noosa Transfers (private)",
    descriptor: "Private door-to-door transfer BNE ↔ Noosa, family-friendly vehicles.",
    programme: "operator-direct",
    url: "https://www.noosatransfers.com.au/",
    bestFor: "Private · family",
    duration: "~2 hours",
    priceBand: "Higher",
    photo: {
      src: "/img/cards/noosa-rainforest.jpg",
      alt: VERIFIED.cards.noosaRainforest.caption,
    },
  },
];

export const MCY_TRANSFER_OPERATORS: CommercialOperator[] = [
  {
    name: "Con-x-ion Airport Transfers",
    descriptor: "Scheduled coach MCY ↔ Noosa.",
    programme: "operator-direct",
    url: "https://www.con-x-ion.com/destinations/noosa/",
    bestFor: "Scheduled · shared",
    duration: "~30 min",
    priceBand: "Low",
    photo: {
      src: "/img/cards/noosa-rainforest.jpg",
      alt: VERIFIED.cards.noosaRainforest.caption,
    },
  },
  {
    name: "Sunshine Coast Airport taxi rank",
    descriptor: "On-site taxi rank at Sunshine Coast Airport; metered fare.",
    programme: "operator-direct",
    url: "https://www.sunshinecoastairport.com.au/transport/taxis",
    bestFor: "Walk-up · metered",
    duration: "~30 min",
    priceBand: "Mid-range",
    photo: {
      src: "/img/cards/noosa-rainforest.jpg",
      alt: VERIFIED.cards.noosaRainforest.caption,
    },
  },
];

/* --------------------------------------------------------------------------
 * Car hire — Sunshine Coast Airport desks + Noosaville depots
 * ------------------------------------------------------------------------ */

export const CAR_HIRE_OPERATORS: CommercialOperator[] = [
  {
    name: "Bayswater Car Rental",
    descriptor: "Sunshine Coast Airport desk + Noosa depot.",
    programme: "operator-direct",
    url: "https://www.bayswater.com.au/",
    bestFor: "Sunshine Coast Airport · local",
    duration: "Daily / weekly",
    priceBand: "Mid-range",
    photo: {
      src: "/img/cards/noosa-rainforest.jpg",
      alt: VERIFIED.cards.noosaRainforest.caption,
    },
  },
  {
    name: "Sunshine Coast Car Rentals",
    descriptor: "Local operator with Sunshine Coast Airport + Maroochydore depots.",
    programme: "operator-direct",
    url: "https://www.sunshinecoastcarrentals.com.au/",
    bestFor: "Sunshine Coast Airport · local",
    duration: "Daily / weekly",
    priceBand: "Mid-range",
    photo: {
      src: "/img/cards/noosa-rainforest.jpg",
      alt: VERIFIED.cards.noosaRainforest.caption,
    },
  },
];
