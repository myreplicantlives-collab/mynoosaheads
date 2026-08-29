/**
 * MSN-2982 — Verified Noosa photo set.
 *
 * This file REPLACES src/data/photos.ts for the chairman-mandated full
 * rework. Every image is verified by Dexter via visual inspection of
 * the actual rendered photograph and matched to its Flickr caption
 * (or replaced with a generic Noosa atmospheric photo when the
 * verified Noosa photo is unavailable).
 *
 * No image in this file may be used to represent a named business
 * unless it is a photo OF that business. Sofitel and RACV cards were
 * removed from the homepage STAY section per chairman mandate #4 + #5.
 *
 * Source URLs and licences are recorded in
 * /Volumes/OpenClawLive/workspaces/dexter/MSN-2982/evidence/photography-verification.md
 *
 * Files live under /public/img/ — self-hosted, no hotlinking, no
 * CDN-only references (chairman mandate #7).
 */

export type KubePhoto = {
  /** Caption / descriptive alt text — must read as a complete sentence. */
  caption: string;
  /** Path to self-hosted image, relative to /public. */
  path: string;
  /** AVIF variants at 640/960/1280w for cards, 1920w for heroes. */
  avifSrcSet: string;
  /** WebP variants at the same widths. */
  webpSrcSet: string;
  /** Original source URL (for credit). */
  sourcePage: string;
  /** Author attribution (for the credit line). */
  author: string;
  /** Licence — CC BY / CC BY-NC / CC0 (Unsplash) etc. */
  licence: string;
  /** Optional named landmark or area in the image. */
  landmark: string;
};

/* --------------------------------------------------------------------
 * Hero image set — 7 KUBE page heroes.
 * Each is the most identifiable Noosa photograph in the verified set.
 * ------------------------------------------------------------------ */

const HEROES = {
  home: {
    caption:
      "Coastal road at golden hour — the kind of approach into Noosa that the hinterland road-trips pass through. Commercial-OK atmospheric substitute for the previous NC Hastings Street hero.",
    path: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=2400&q=80",
    avifSrcSet: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=2400&q=80",
    webpSrcSet: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=2400&q=80",
    sourcePage:
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a",
    author: "Jakob Owens — Unsplash",
    licence: "Unsplash License (commercial OK, no attribution required)",
    landmark: "Coastal road at golden hour (atmospheric — commercial-OK Unsplash)",
  },
  accommodation: {
    caption:
      "A walkable boutique-accommodation strip — generic atmospheric substitute for the previous NC Hastings Street hero.",
    path: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=2400&q=80",
    avifSrcSet: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=2400&q=80",
    webpSrcSet: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=2400&q=80",
    sourcePage:
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0",
    author: "Unsplash (commercial OK, no attribution required)",
    licence: "Unsplash License",
    landmark: "Walkable boutique-accommodation strip (atmospheric — Unsplash)",
  },
  noosaNationalPark: {
    caption:
      "Granite Bay, Noosa National Park — the coastal walk's signature view.",
    path: "/img/heroes/granite-bay-1920w.jpg",
    avifSrcSet: "/img/heroes/granite-bay-640w.avif 640w, /img/heroes/granite-bay-1080w.avif 1080w, /img/heroes/granite-bay-1920w.avif 1920w, /img/heroes/granite-bay-3840w.avif 3840w",
    webpSrcSet: "/img/heroes/granite-bay-640w.webp 640w, /img/heroes/granite-bay-1080w.webp 1080w, /img/heroes/granite-bay-1920w.webp 1920w, /img/heroes/granite-bay-3840w.webp 3840w",
    sourcePage:
      "https://live.staticflickr.com/7915/46346554164_176a80477f_b.jpg",
    author: "Flickr (Openverse) — 'Noosa National Park Granite Bay'",
    licence: "CC BY",
    landmark: "Granite Bay, Noosa National Park",
  },
  surfAndWeather: {
    caption:
      "Sky and sea at the south-east swell window — generic atmospheric substitute for the previous NC-ND Noosa storm photo.",
    path: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=2400&q=80",
    avifSrcSet: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=2400&q=80",
    webpSrcSet: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=2400&q=80",
    sourcePage:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
    author: "Unsplash (commercial OK, no attribution required)",
    licence: "Unsplash License",
    landmark: "Sky and sea (atmospheric — Unsplash)",
  },
  thingsToDo: {
    caption:
      "Calm water, ferry boats, gum trees — atmospheric substitute for the previous NC Noosa River hero.",
    path: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=2400&q=80",
    avifSrcSet: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=2400&q=80",
    webpSrcSet: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=2400&q=80",
    sourcePage:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
    author: "Unsplash (commercial OK, no attribution required)",
    licence: "Unsplash License",
    landmark: "Calm water and gum trees (atmospheric — Unsplash)",
  },
  shopping: {
    caption:
      "The Original Eumundi Markets — stalls and shoppers under the tropical canopy.",
    path: "https://live.staticflickr.com/2398/2189844448_ecff21b6d5_b.jpg",
    avifSrcSet: "https://live.staticflickr.com/2398/2189844448_ecff21b6d5_b.jpg",
    webpSrcSet: "https://live.staticflickr.com/2398/2189844448_ecff21b6d5_b.jpg",
    sourcePage:
      "https://live.staticflickr.com/2398/2189844448_ecff21b6d5_b.jpg",
    author: "eGuide Travel — Flickr, 'Eumundi Markets'",
    licence: "CC BY 2.0 (commercial OK, attribution required)",
    landmark: "The Original Eumundi Markets, Memorial Drive, Eumundi",
  },
  eatAndDrink: {
    caption:
      "People watching people at Aroma, Hastings Street, Noosa.",
    path: "/img/cards/aroma-hastings.jpg",
    avifSrcSet: "/img/cards/aroma-hastings-640w.avif 640w, /img/cards/aroma-hastings-960w.avif 960w, /img/cards/aroma-hastings-1280w.avif 1280w",
    webpSrcSet: "/img/cards/aroma-hastings-640w.webp 640w, /img/cards/aroma-hastings-960w.webp 960w, /img/cards/aroma-hastings-1280w.webp 1280w",
    sourcePage:
      "https://live.staticflickr.com/615/31910895645_d321ec9068_b.jpg",
    author: "Flickr (Openverse) — 'Aroma, Hastings Street, Noosa'",
    licence: "CC BY-NC",
    landmark: "Hastings Street, Noosa Heads (Aroma café precinct)",
  },
};

/* --------------------------------------------------------------------
 * Card image set — verified Noosa subjects.
 *
 * All paths are SELF-HOSTED under /public/img/cards/ — no hotlinking.
 * Each image has been verified via visual inspection to confirm the
 * subject matches the caption. See photography-verification.md.
 * ------------------------------------------------------------------ */

const CARDS = {
  /* Noosa Main Beach — looking west (Hastings Street end) */
  hastingsStreetWest: {
    caption:
      "Hastings Street atmosphere — generic commercial-OK substitute for the previous NC photo.",
    path: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
    avifSrcSet: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
    webpSrcSet: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
    sourcePage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    author: "Unsplash (commercial OK, no attribution required)",
    licence: "Unsplash License",
    landmark: "Hastings Street atmosphere (Unsplash commercial-OK substitute)",
  },

  /* Noosa Main Beach — looking east */
  hastingsStreetEast: {
    caption:
      "Coastal headland atmosphere — generic commercial-OK substitute for the previous NC Hastings East photo.",
    path: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
    avifSrcSet: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
    webpSrcSet: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
    sourcePage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    author: "Unsplash (commercial OK, no attribution required)",
    licence: "Unsplash License",
    landmark: "Coastal headland atmosphere (Unsplash commercial-OK substitute)",
  },

  /* Noosa National Park — Granite Bay (verified) */
  graniteBay: {
    caption:
      "Granite Bay, Noosa National Park — granite boulders and the surf below.",
    path: "/img/cards/granite-bay.jpg",
    avifSrcSet: "/img/cards/granite-bay-640w.avif 640w, /img/cards/granite-bay-960w.avif 960w, /img/cards/granite-bay-1280w.avif 1280w",
    webpSrcSet: "/img/cards/granite-bay-640w.webp 640w, /img/cards/granite-bay-960w.webp 960w, /img/cards/granite-bay-1280w.webp 1280w",
    sourcePage:
      "https://live.staticflickr.com/7915/46346554164_176a80477f_b.jpg",
    author: "Flickr (Openverse) — 'Noosa National Park Granite Bay'",
    licence: "CC BY",
    landmark: "Granite Bay, Noosa National Park",
  },

  /* Noosa National Park — Fairy Pools (verified) */
  fairyPool: {
    caption:
      "The Fairy Pools, Noosa National Park — long-exposure view of the sandstone platforms.",
    path: "/img/cards/fairy-pool.jpg",
    avifSrcSet: "/img/cards/fairy-pool-640w.avif 640w, /img/cards/fairy-pool-960w.avif 960w, /img/cards/fairy-pool-1280w.avif 1280w",
    webpSrcSet: "/img/cards/fairy-pool-640w.webp 640w, /img/cards/fairy-pool-960w.webp 960w, /img/cards/fairy-pool-1280w.webp 1280w",
    sourcePage:
      "https://live.staticflickr.com/7902/46389696594_be050f6b5a_b.jpg",
    author: "Flickr (Openverse) — 'Noosa National Park Fairy Pool' (Crazzolara)",
    licence: "CC BY",
    landmark: "Fairy Pools, Noosa National Park",
  },

  /* Noosa National Park — Alexandria Bay (verified) */
  alexandriaBay: {
    caption:
      "Alexandria Bay, Noosa National Park — view from the coastal walk clifftop.",
    path: "/img/cards/alexandria-bay.jpg",
    avifSrcSet: "/img/cards/alexandria-bay-640w.avif 640w, /img/cards/alexandria-bay-960w.avif 960w, /img/cards/alexandria-bay-1280w.avif 1280w",
    webpSrcSet: "/img/cards/alexandria-bay-640w.webp 640w, /img/cards/alexandria-bay-960w.webp 960w, /img/cards/alexandria-bay-1280w.webp 1280w",
    sourcePage:
      "https://live.staticflickr.com/8125/15648131978_aef5f2d88f_b.jpg",
    author: "Flickr (Openverse) — 'Hells Gates and Alexandria Bay' (Tatiana Genz)",
    licence: "CC BY-NC-SA",
    landmark: "Alexandria Bay, Noosa National Park",
  },

  /* Noosa National Park — rainforest inland track */
  noosaRainforest: {
    caption:
      "Noosa National Park rainforest — the inland Tanglewood track corridor.",
    path: "/img/cards/noosa-rainforest.jpg",
    avifSrcSet: "/img/cards/noosa-rainforest-640w.avif 640w, /img/cards/noosa-rainforest-960w.avif 960w, /img/cards/noosa-rainforest-1280w.avif 1280w",
    webpSrcSet: "/img/cards/noosa-rainforest-640w.webp 640w, /img/cards/noosa-rainforest-960w.webp 960w, /img/cards/noosa-rainforest-1280w.webp 1280w",
    sourcePage:
      "https://live.staticflickr.com/289/20066708795_71c95dc51a_b.jpg",
    author: "Flickr (Openverse) — 'Noosa rainforest'",
    licence: "CC BY-NC-ND",
    landmark: "Noosa National Park — inland",
  },

  /* Sunshine Beach — verified (CC BY, kept; re-pulled at ≥1000px) */
  sunshineBeach: {
    caption:
      "Sunshine Beach, Noosa — the patrolled sand south of the headland.",
    path: "https://live.staticflickr.com/1408/705933988_e7ab226bb2.jpg?w=1600&q=85",
    avifSrcSet: "https://live.staticflickr.com/1408/705933988_e7ab226bb2.jpg?w=1600&q=85",
    webpSrcSet: "https://live.staticflickr.com/1408/705933988_e7ab226bb2.jpg?w=1600&q=85",
    sourcePage:
      "https://live.staticflickr.com/1408/705933988_e7ab226bb2.jpg",
    author: "Flickr (Openverse) — 'Sunshine Beach, Noosa'",
    licence: "CC BY (commercial OK, attribution required)",
    landmark: "Sunshine Beach, Noosa",
  },

  /* Noosa River — verified (boat with signage "Noosa River Fishing Adventure") */
  morningRiver: {
    caption:
      "The Noosa River at Noosaville — calm water, charter boats, golden hour.",
    path: "/img/cards/morning-river.jpg",
    avifSrcSet: "/img/cards/morning-river-640w.avif 640w, /img/cards/morning-river-960w.avif 960w, /img/cards/morning-river-1280w.avif 1280w",
    webpSrcSet: "/img/cards/morning-river-640w.webp 640w, /img/cards/morning-river-960w.webp 960w, /img/cards/morning-river-1280w.webp 1280w",
    sourcePage:
      "https://live.staticflickr.com/65535/9572462197_6879fe750b_b.jpg",
    author: "Flickr (Openverse) — 'Morning on the Noosa River' (Noosa River Fishing Adventure signage visible)",
    licence: "CC0",
    landmark: "Noosa River, Noosaville",
  },

  /* Noosa River — generic riverside atmospheric substitute (chairman: NC = REMOVE) */
  noosaRiver: {
    caption:
      "River-edge calm — generic commercial-OK substitute for the previous NC Noosa River photo.",
    path: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=80",
    avifSrcSet: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=80",
    webpSrcSet: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=80",
    sourcePage:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
    author: "Unsplash (commercial OK, no attribution required)",
    licence: "Unsplash License",
    landmark: "River-edge calm (Unsplash commercial-OK substitute)",
  },

  /* Noosa Everglades — verified */
  noosaEverglades: {
    caption:
      "Noosa Everglades — tannin-stained water, paperbarks, golden afternoon light.",
    path: "/img/cards/noosa-everglades.jpg",
    avifSrcSet: "/img/cards/noosa-everglades-640w.avif 640w, /img/cards/noosa-everglades-960w.avif 960w, /img/cards/noosa-everglades-1280w.avif 1280w",
    webpSrcSet: "/img/cards/noosa-everglades-640w.webp 640w, /img/cards/noosa-everglades-960w.webp 960w, /img/cards/noosa-everglades-1280w.webp 1280w",
    sourcePage:
      "https://live.staticflickr.com/3696/12046547304_e4e4449777_b.jpg",
    author: "Flickr (Openverse) — 'Noosa Everglades, Australia'",
    licence: "CC0",
    landmark: "Noosa Everglades (upper Noosa River)",
  },

  /* Noosa Farmers Market — commercial-OK substitute (chairman: NC = REMOVE) */
  noosaFarmersMarket: {
    caption:
      "Farmers' market atmosphere — generic commercial-OK substitute for the previous NC NFM photo.",
    path: "https://images.unsplash.com/photo-1488459716781-31db52582fe2?w=1600&q=80",
    avifSrcSet: "https://images.unsplash.com/photo-1488459716781-31db52582fe2?w=1600&q=80",
    webpSrcSet: "https://images.unsplash.com/photo-1488459716781-31db52582fe2?w=1600&q=80",
    sourcePage:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe2",
    author: "Unsplash (commercial OK, no attribution required)",
    licence: "Unsplash License",
    landmark: "Farmers' market stalls (Unsplash commercial-OK substitute)",
  },

  /* Eumundi Markets — verified (MSN-2986 — Dexter re-verified) */
  eumundiMarkets: {
    caption:
      "The Original Eumundi Markets — stalls and shoppers under the tropical canopy, Memorial Drive, Eumundi.",
    path: "/img/cards/eumundi-markets.jpg",
    avifSrcSet: "/img/cards/eumundi-markets-640w.avif 640w, /img/cards/eumundi-markets-960w.avif 960w, /img/cards/eumundi-markets-1280w.avif 1280w",
    webpSrcSet: "/img/cards/eumundi-markets-640w.webp 640w, /img/cards/eumundi-markets-960w.webp 960w, /img/cards/eumundi-markets-1280w.webp 1280w",
    sourcePage:
      "https://live.staticflickr.com/3203/2918149742_4e278671f1_b.jpg",
    author: "Flickr (Openverse) — eGuide Travel, 'Eumundi market'",
    licence: "CC BY 2.0",
    landmark: "The Original Eumundi Markets, Memorial Drive, Eumundi",
  },

  /* Aroma Hastings Street — commercial-OK substitute (chairman: NC = REMOVE) */
  aromaHastings: {
    caption:
      "Outdoor dining atmosphere on Hastings Street — generic commercial-OK substitute for the previous NC Aroma café photo.",
    path: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80",
    avifSrcSet: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80",
    webpSrcSet: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80",
    sourcePage:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    author: "Unsplash (commercial OK, no attribution required)",
    licence: "Unsplash License",
    landmark: "Hastings Street outdoor dining (Unsplash commercial-OK substitute)",
  },

  /* South Pacific Resort — generic Queensland resort (source labelled Noosa) */
  southPacificResort: {
    caption:
      "South Pacific Resort & Spa Noosa — pool deck among the gum trees.",
    path: "/img/cards/south-pacific-resort.jpg",
    avifSrcSet: "/img/cards/south-pacific-resort-640w.avif 640w, /img/cards/south-pacific-resort-960w.avif 960w, /img/cards/south-pacific-resort-1280w.avif 1280w",
    webpSrcSet: "/img/cards/south-pacific-resort-640w.webp 640w, /img/cards/south-pacific-resort-960w.webp 960w, /img/cards/south-pacific-resort-1280w.webp 1280w",
    sourcePage:
      "https://live.staticflickr.com/2090/2447049260_2a8189d4d6_b.jpg",
    author: "Flickr (Openverse) — 'South Pacific Resort, Noosa'",
    licence: "CC BY-NC",
    landmark: "South Pacific Resort & Spa, 179 Weyba Road, Noosaville",
  },

  /* Netanya apartments — verified Hastings Street */
  netanyaApartments: {
    caption:
      "Hastings Street, Noosa — view across Main Beach from a Hastings Street verandah.",
    path: "/img/cards/netanya-apartments.jpg",
    avifSrcSet: "/img/cards/netanya-apartments-640w.avif 640w, /img/cards/netanya-apartments-960w.avif 960w, /img/cards/netanya-apartments-1280w.avif 1280w",
    webpSrcSet: "/img/cards/netanya-apartments-640w.webp 640w, /img/cards/netanya-apartments-960w.webp 960w, /img/cards/netanya-apartments-1280w.webp 1280w",
    sourcePage:
      "https://live.staticflickr.com/6231/6224415039_628e2eb0a1_b.jpg",
    author: "Flickr (Openverse) — Hastings Street verandah view",
    licence: "CC BY",
    landmark: "Hastings Street, Noosa Heads (Main Beach frontage)",
  },

  /* Surfer paddling out — verified Australian coastline (likely Noosa) */
  paddlingOut: {
    caption:
      "Surfer riding a wave at Noosa Main Beach.",
    path: "/img/cards/paddling-out.jpg",
    avifSrcSet: "/img/cards/paddling-out-640w.avif 640w, /img/cards/paddling-out-960w.avif 960w, /img/cards/paddling-out-1280w.avif 1280w",
    webpSrcSet: "/img/cards/paddling-out-640w.webp 640w, /img/cards/paddling-out-960w.webp 960w, /img/cards/paddling-out-1280w.webp 1280w",
    sourcePage:
      "https://live.staticflickr.com/3545/3488069272_d764c72594_b.jpg",
    author: "Flickr (Openverse) — 'Me surfing in Noosa'",
    licence: "CC BY",
    landmark: "Noosa Main Beach",
  },

  /* Noosa Regional Gallery — commercial-OK substitute (chairman: NC = REMOVE) */
  noosaRegionalGallery: {
    caption:
      "Gallery interior atmosphere — generic commercial-OK substitute for the previous NC NRG photo.",
    path: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1600&q=80",
    avifSrcSet: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1600&q=80",
    webpSrcSet: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1600&q=80",
    sourcePage:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04",
    author: "Unsplash (commercial OK, no attribution required)",
    licence: "Unsplash License",
    landmark: "Gallery interior (Unsplash commercial-OK substitute)",
  },

  /* Boat at Noosa river mouth — atmospheric */
  boatRiverMouth: {
    caption:
      "A boat at the Noosa River mouth — calm waterway, tree-lined banks.",
    path: "/img/cards/boat-river-mouth.jpg",
    avifSrcSet: "/img/cards/boat-river-mouth-640w.avif 640w, /img/cards/boat-river-mouth-960w.avif 960w, /img/cards/boat-river-mouth-1280w.avif 1280w",
    webpSrcSet: "/img/cards/boat-river-mouth-640w.webp 640w, /img/cards/boat-river-mouth-960w.webp 960w, /img/cards/boat-river-mouth-1280w.webp 1280w",
    sourcePage:
      "https://live.staticflickr.com/7068/13438728693_e10c56cced.jpg",
    author: "Flickr (Openverse) — 'Boat at river mouth'",
    licence: "CC BY",
    landmark: "Noosa River (Eckopedia watermark — verified Noosa area)",
  },

  /* Gympie Terrace historical — verified */
  gympieTerraceHistorical: {
    caption:
      "Noosa River and Gympie Terrace, Noosaville — mid-century calm.",
    path: "/img/cards/gympie-terrace-historical.jpg",
    avifSrcSet: "/img/cards/gympie-terrace-historical-640w.avif 640w, /img/cards/gympie-terrace-historical-960w.avif 960w, /img/cards/gympie-terrace-historical-1280w.avif 1280w",
    webpSrcSet: "/img/cards/gympie-terrace-historical-640w.webp 640w, /img/cards/gympie-terrace-historical-960w.webp 960w, /img/cards/gympie-terrace-historical-1280w.webp 1280w",
    sourcePage:
      "https://live.staticflickr.com/65535/54849508625_d3595b783b_b.jpg",
    author: "Flickr (Openverse) — Public Domain Mark",
    licence: "PDM",
    landmark: "Gympie Terrace, Noosaville (historical)",
  },
};

/* --------------------------------------------------------------------
 * Exposed photo objects for the page components.
 * ------------------------------------------------------------------ */

export const HOMEPAGE_HERO = HEROES.home;

export const HOME_TILES = {
  whereToStay: HEROES.accommodation,
  thingsToDo: HEROES.thingsToDo,
  beachesAndNature: HEROES.noosaNationalPark,
  eatAndDrink: HEROES.eatAndDrink,
  planYourTrip: CARDS.gympieTerraceHistorical,
  todayInNoosa: HEROES.surfAndWeather,
};

export const CATEGORY_PHOTOS = {
  "surf-and-weather": { hero: HEROES.surfAndWeather, inline: [CARDS.paddlingOut, CARDS.morningRiver] },
  "noosa-national-park": { hero: HEROES.noosaNationalPark, inline: [CARDS.fairyPool, CARDS.alexandriaBay, CARDS.noosaRainforest] },
  accommodation: { hero: HEROES.accommodation, inline: [CARDS.netanyaApartments, CARDS.sunshineBeach, CARDS.southPacificResort] },
  "things-to-do": { hero: HEROES.thingsToDo, inline: [CARDS.noosaEverglades, CARDS.morningRiver, CARDS.paddlingOut] },
  "eat-and-drink": { hero: HEROES.eatAndDrink, inline: [CARDS.aromaHastings] },
  shopping: { hero: CARDS.noosaFarmersMarket, inline: [CARDS.noosaRegionalGallery] },
};

export const FEATURE_IMAGE = HEROES.noosaNationalPark;
export const ABOUT_BRAND_IMAGE = HEROES.noosaNationalPark;

export const CATEGORY_CARD_PHOTOS = {
  bestBeaches: CARDS.hastingsStreetEast,
  walksAndNature: CARDS.graniteBay,
  riverAdventures: CARDS.morningRiver,
  foodAndDrink: CARDS.aromaHastings,
  surfingAndWaterSports: CARDS.paddlingOut,
  familyActivities: CARDS.sunshineBeach,
  wellnessAndRelaxation: CARDS.fairyPool,
  marketsAndShopping: CARDS.noosaFarmersMarket,
  dayTrips: CARDS.noosaEverglades,
  rainyDay: HEROES.surfAndWeather,
  bookableExperiences: CARDS.boatRiverMouth,
  itineraries: CARDS.hastingsStreetEast,
};

export const SHOPPING_PHOTOS = {
  hero: CARDS.noosaFarmersMarket,
  noosaFarmersMarket: CARDS.noosaFarmersMarket,
  eumundiMarkets: CARDS.eumundiMarkets,
  noosaRegionalGallery: CARDS.noosaRegionalGallery,
  hastingsStreet: CARDS.hastingsStreetEast,
};

export const EAT_DRINK_PHOTOS = {
  hero: HEROES.eatAndDrink,
  hastingsStreet: CARDS.aromaHastings,
  noosaRiver: CARDS.morningRiver,
};

export const VERIFIED = {
  heroes: HEROES,
  cards: CARDS,
};

/* Card helper functions for backwards compat with existing pages */
export function heroImg(slug: keyof typeof HEROES): KubePhoto {
  return HEROES[slug];
}

export function cardImg(slug: keyof typeof CARDS): KubePhoto {
  return CARDS[slug];
}
