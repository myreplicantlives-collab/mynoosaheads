/**
 * /shopping page data — MSN-2985 V2 release correction pass.
 *
 * Per chairman mandate 2026-08-29: collapse the 8-category × 5-place
 * grid (40 cards) to THREE featured retailers — Noosa Farmers Market,
 * The Original Eumundi Markets, and Noosa Regional Gallery. Each has
 * a verified Noosa photo, a direct operator URL, and a deep page at
 * /shop/[slug]. The other 37 cards are REMOVEd from the data.
 *
 * Per MSN-2964 directive B and MSN-2974 directive 4: every monetised
 * outbound link carries `data-track`. Until the verified-IDs feed
 * lands, every `badge` is `null` — the UI scaffolding is in place and
 * will render the badge automatically once `badge !== null` and the
 * entry passes the disclosure gate.
 *
 * Attribution: every photo is from Flickr Openverse under a Creative
 * Commons licence. Full attribution lives at /photo-credits. The
 * /shopping page itself hides attribution on the rendered HTML per
 * MSN-2973 directive (consistent with the rest of the main journey).
 *
 * @see /Volumes/OpenClawLive/state/control/evidence/MSN-2985/REMOVE_LIST.md
 */

export type ShoppingBadge = "Featured" | "Sponsored";

export type Place = {
  /** Place name — short, browsable. */
  name: string;
  /** Slugified identifier — used in `data-track="shopping_<category>_<name>"`. */
  slug: string;
  /** Area (suburb / town). */
  area: string;
  /** Place type — "Boutique row", "Markets", "Centre", etc. */
  type: string;
  /** 2-3 sentences — atmospheric, KUBE-style, specific. */
  whyWorthVisiting: string;
  /** 1-line "best for" tag. */
  bestFor: string;
  /** Where it is — short location line. */
  where: string;
  /** Outbound link target (tourism body, public listing, named public body). */
  linkToMore: string;
  /** Label of the outbound link button (typically "Find out more"). */
  linkLabel?: string;
  /**
   * Monetisation gate:
   *   - undefined | null → no badge, no affiliate claim
   *   - "Featured"      → verified-partner entry (AffiliateBadge-style)
   *   - "Sponsored"     → paid placement (different visual treatment)
   *
   * MSN-2964 directive B: do not claim either until verified. All
   * entries default to null until the verified-IDs feed lands.
   */
  badge?: ShoppingBadge | null;
  /** Photo (Wikimedia Commons, attribution in /photo-credits). */
  image?: {
    caption: string;
    url: string;
    author: string;
    licence: string;
    sourcePage: string;
  };
};

export type ShoppingCategory = {
  /** URL-safe category id — used in `data-track="shopping_<category>_<name>"`. */
  id: string;
  /** Display name (H2). */
  name: string;
  /** 1-sentence atmospheric hook (H2 sub-line). */
  hook: string;
  /** Anchor id for in-page jumps. */
  anchor: string;
  /** Eyebrow label (small caps above name). */
  eyebrow: string;
  /** Hero / card image — Wikimedia Commons, verified set. */
  image: {
    caption: string;
    url: string;
    author: string;
    licence: string;
    sourcePage: string;
  };
  /** Featured places (3–5 per category per Albert D1). */
  places: Place[];
};

/* ----------------------------------------------------------------------
 * Shared verified photo set (mirrored from src/data/photos.ts).
 * -------------------------------------------------------------------- */

/** Hastings Street — atmospheric long-shot (Flickr Openverse). */
const IMG_HASTINGS_STREET = {
  caption:
    "Hastings Street storefronts and palms — the dense retail pocket between the surf club and the headland.",
  url: "https://live.staticflickr.com/8514/8532929182_a1ea8ef7be.jpg",
  author: "Flickr (Openverse) — 'Noosa Main Beach / Hastings Street looking east'",
  licence: "CC BY-NC-SA",
  sourcePage: "https://live.staticflickr.com/8514/8532929182_a1ea8ef7be.jpg",
};

/** Noosa River bank at Noosaville (Flickr Openverse). */
const IMG_NOOSAVILLE = {
  caption:
    "Noosa River bank at Noosaville — the foreshore strip five minutes inland from Hastings.",
  url: "https://live.staticflickr.com/8330/8146977124_491b4d5696.jpg",
  author: "Flickr (Openverse) — 'Shiny afternoon'",
  licence: "CC BY-NC-SA",
  sourcePage: "https://live.staticflickr.com/8330/8146977124_491b4d5696.jpg",
};

/** Peregian-style beach (Flickr Openverse). */
const IMG_PEREGIAN = {
  caption:
    "A south-coast Noosa beach — the village-square feel of Peregian.",
  url: "https://live.staticflickr.com/8240/8531818425_4f7d65d9e6.jpg",
  author: "Flickr (Openverse) — 'Noosa Main Beach / Hastings Street looking west'",
  licence: "CC BY-NC-SA",
  sourcePage: "https://live.staticflickr.com/8240/8531818425_4f7d65d9e6.jpg",
};

/** Noosa Farmers Market (Flickr Openverse). */
const IMG_FARMERS_MARKET = {
  caption:
    "Noosa Farmers Market — Sunday morning at the Noosaville showgrounds.",
  url: "https://live.staticflickr.com/2301/2367573625_8f0fd5692b_b.jpg",
  author: "Flickr (Openverse) — 'Noosa Farmers Market'",
  licence: "CC BY-NC-SA",
  sourcePage: "https://live.staticflickr.com/2301/2367573625_8f0fd5692b_b.jpg",
};

/** Aromas / Hastings Street café scene (Flickr Openverse). */
const IMG_AROMAS = {
  caption:
    "A Hastings Street café table — the boutique-strip atmosphere that runs the length of the street.",
  url: "https://live.staticflickr.com/615/31910895645_d321ec9068_b.jpg",
  author: "Flickr (Openverse)",
  licence: "CC BY-NC",
  sourcePage: "https://live.staticflickr.com/615/31910895645_d321ec9068_b.jpg",
};

/** Main Beach boardwalk — beachwear / resort context (Unsplash CDN). */
const IMG_BOARDWALK = {
  caption:
    "The Boardwalk along Main Beach — the short walk between Hastings Street and the Surf Club.",
  url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
  author: "Unsplash CDN",
  licence: "CC0 (Unsplash)",
  sourcePage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
};

/** Hastings Street 2022 — premium long-shot (Flickr Openverse). */
const IMG_HASTINGS_2022 = {
  caption:
    "Hastings Street looking up to the headland — the walk from a Hastings Street shop to Main Beach.",
  url: "https://live.staticflickr.com/8240/8531818425_4f7d65d9e6.jpg",
  author: "Flickr (Openverse)",
  licence: "CC BY-NC-SA",
  sourcePage: "https://live.staticflickr.com/8240/8531818425_4f7d65d9e6.jpg",
};

/** Noosa Ferry at Hastings — everyday Noosa street scene (Flickr Openverse). */
const IMG_NOOSA_FERRY = {
  caption:
    "The Noosa ferry at Hastings — the everyday movement of the shire.",
  url: "https://live.staticflickr.com/7261/13940326252_74135d0576_b.jpg",
  author: "Flickr (Openverse) — 'River Crossing'",
  licence: "CC BY",
  sourcePage: "https://live.staticflickr.com/7261/13940326252_74135d0576_b.jpg",
};

/* ----------------------------------------------------------------------
 * Eight categories — Albert D1 §2.
 * -------------------------------------------------------------------- */

export const SHOPPING_CATEGORIES: ShoppingCategory[] = [
  /* ----- Featured retailers — MSN-2985 V2 correction (chairman mandate) ----- */
  {
    id: "noosa-farmers-market",
    name: "Noosa Farmers Market",
    hook:
      "Sunday morning at the Noosaville showgrounds. Over 100 stallholders, mostly primary producers from within an hour of Noosa — bread still warm, seafood from Friday's catch.",
    anchor: "shop-noosa-farmers-market",
    eyebrow: "Sunday morning · Noosaville",
    image: {
      caption:
        "Noosa Farmers Market, Sunday morning — the regional food event of the Sunshine Coast.",
      url: "https://live.staticflickr.com/2301/2367573625_8f0fd5692b_b.jpg",
      author: "Flickr (Openverse) — 'Noosa Farmers Market'",
      licence: "CC BY-NC-SA",
      sourcePage: "https://live.staticflickr.com/2301/2367573625_8f0fd5692b_b.jpg",
    },
    places: [
      {
        name: "Noosa Farmers Market",
        slug: "noosa-farmers-market",
        area: "Noosaville",
        type: "Sunday market",
        whyWorthVisiting:
          "The Sunday-morning food event of the Sunshine Coast. Over 100 stallholders — most of them primary producers from within an hour of Noosa. Bread still warm, coffee from a Sunshine Coast roaster, seafood that was in the water on Friday.",
        bestFor: "Anyone who eats · foodies · Noosaville guests",
        where: "Noosaville showgrounds · 155 Weyba Road",
        linkToMore: "/shop/noosa-farmers-market",
        linkLabel: "Plan your morning",
      },
    ],
  },
  {
    id: "the-original-eumundi-markets",
    name: "The Original Eumundi Markets",
    hook:
      "Wednesdays and Saturdays in the hinterland village of Eumundi. Over 240 stallholders — ceramics, textiles, leatherwork, jewellery, woodwork, body care, and a large food court.",
    anchor: "shop-the-original-eumundi-markets",
    eyebrow: "Wed & Sat · Eumundi hinterland",
    image: {
      caption:
        "The Original Eumundi Markets — the makers' market of the Sunshine Coast, every Wednesday and Saturday.",
      url: "https://live.staticflickr.com/2398/2189844448_ecff21b6d5_b.jpg",
      author: "Flickr (Openverse) — Eumundi Markets stallholders",
      licence: "CC BY",
      sourcePage: "https://live.staticflickr.com/2398/2189844448_ecff21b6d5_b.jpg",
    },
    places: [
      {
        name: "The Original Eumundi Markets",
        slug: "the-original-eumundi-markets",
        area: "Eumundi",
        type: "Wed & Sat market",
        whyWorthVisiting:
          "The makers' market — over 240 stallholders with a strong mix of hand-thrown ceramics, hand-printed textiles, leatherwork, jewellery, woodwork, and natural body care. Food court is large and varied; live music throughout the morning.",
        bestFor: "Couples · groups · original-purchase hunters",
        where: "80 Memorial Drive, Eumundi · 25 min west of Noosa",
        linkToMore: "/shop/the-original-eumundi-markets",
        linkLabel: "Plan your morning",
      },
    ],
  },
  {
    id: "noosa-regional-gallery",
    name: "Noosa Regional Gallery",
    hook:
      "The public gallery for the Noosa Shire, in a converted printing works on the river at Tewantin. Free entry; rotating exhibitions of Australian ceramics, regional shows, and curated Sunshine Coast artists.",
    anchor: "shop-noosa-regional-gallery",
    eyebrow: "Tue–Sun · Tewantin",
    image: {
      caption:
        "Noosa Regional Gallery — the public gallery for the Noosa Shire, in a converted printing works on Riverside Drive, Tewantin.",
      url: "https://live.staticflickr.com/3490/3983700808_814732b141_b.jpg",
      author: "Flickr (Openverse) — 'Noosa Regional Gallery flyer rack'",
      licence: "CC BY",
      sourcePage: "https://live.staticflickr.com/3490/3983700808_814732b141_b.jpg",
    },
    places: [
      {
        name: "Noosa Regional Gallery",
        slug: "noosa-regional-gallery",
        area: "Tewantin",
        type: "Public gallery",
        whyWorthVisiting:
          "The cultural anchor of the shire, and it's free. Rotating exhibition program of ceramics, painting, photography, sculpture; a Gallery Shop of small-format art prints, ceramics, jewellery, and books by Sunshine Coast makers; a Garden Cafe under the old trees.",
        bestFor: "Art-curious visitors · couples · families",
        where: "167 Riverside Drive, Tewantin · 10 min from Hastings",
        linkToMore: "/shop/noosa-regional-gallery",
        linkLabel: "Plan your morning",
      },
    ],
  },
];

/* ----------------------------------------------------------------------
 * Disclosure language — one short paragraph (Albert D1 §3).
 * -------------------------------------------------------------------- */

export const SHOPPING_DISCLOSURE =
  "We list shops that are currently trading, in the places visitors actually browse on a Noosa week. The markets, galleries, public centres and named boutiques below are the ones that have appeared across years of Tourism Noosa and Visit Sunshine Coast coverage. We don't run a directory — for the full list of every small shop, café and stall in a given area, Tourism Noosa's Hastings Street, Junction, Peregian, Eumundi and Hinterland directories are the live source. Where MyNoosaHeads carries an affiliate link, it is marked before you click; the full statement is in the footer.";

/* ----------------------------------------------------------------------
 * Helpers — exposed for the page.
 * -------------------------------------------------------------------- */

/** Total featured places (used by the page header). */
export const TOTAL_PLACES = SHOPPING_CATEGORIES.reduce(
  (sum, c) => sum + c.places.length,
  0,
);

/** Total Featured + Sponsored badges (used by reporting — currently 0). */
export function countBadges(): { featured: number; sponsored: number } {
  let featured = 0;
  let sponsored = 0;
  for (const c of SHOPPING_CATEGORIES) {
    for (const p of c.places) {
      if (p.badge === "Featured") featured++;
      else if (p.badge === "Sponsored") sponsored++;
    }
  }
  return { featured, sponsored };
}