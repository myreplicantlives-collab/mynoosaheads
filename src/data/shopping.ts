/**
 * /shopping page data — MSN-2974.
 *
 * Eight shopping categories × five featured places each = 40 cards,
 * per Albert's D1 brief (`shopping-page-content.md`). Visitor-facing
 * copy is Albert's curated long-form (KUBE benchmark — stylist local).
 *
 * Per MSN-2964 directive B and MSN-2974 directive 4: every monetised
 * outbound link carries `data-track` and may carry a `badge` (null =
 * no badge; "Featured" or "Sponsored" only when a verified commercial
 * relationship exists). Until the verified-IDs feed lands, every
 * `badge` is `null` — the UI scaffolding is in place and will render
 * the badge automatically once `badge !== null` and the entry passes
 * the disclosure gate.
 *
 * Attribution: every photo is from Wikimedia Commons under a Creative
 * Commons licence. Full attribution lives at /photo-credits. The
 * /shopping page itself hides attribution on the rendered HTML per
 * MSN-2973 directive (consistent with the rest of the main journey).
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
  image: {
    caption: string;
    url: string;
    author: string;
    licence: string;
    commonsPage: string;
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
    commonsPage: string;
  };
  /** Featured places (3–5 per category per Albert D1). */
  places: Place[];
};

/* ----------------------------------------------------------------------
 * Shared verified photo set (mirrored from src/data/photos.ts).
 * -------------------------------------------------------------------- */

/** Hastings Street storefronts (Kgbo, CC BY-SA 4.0). */
const IMG_HASTINGS_STREET = {
  caption:
    "Hastings Street storefronts and palms — the dense retail pocket between the surf club and the headland.",
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Hastings_Street_Noosa_Heads%2C_Queensland.jpg/1280px-Hastings_Street_Noosa_Heads%2C_Queensland.jpg",
  author: "Kgbo",
  licence: "CC BY-SA 4.0",
  commonsPage:
    "https://commons.wikimedia.org/wiki/File:Hastings_Street_Noosa_Heads,_Queensland.jpg",
};

/** Noosa River bank at Noosaville (Chris Olszewski, CC BY-SA 4.0). */
const IMG_NOOSAVILLE = {
  caption:
    "Noosa River bank at Noosaville — the foreshore strip five minutes inland from Hastings.",
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Noosa_River_bank_at_Noosaville%2C_Queensland%2C_2024.jpg/1280px-Noosa_River_bank_at_Noosaville%2C_Queensland%2C_2024.jpg",
  author: "Chris Olszewski",
  licence: "CC BY-SA 4.0",
  commonsPage:
    "https://commons.wikimedia.org/wiki/File:Noosa_River_bank_at_Noosaville,_Queensland,_2024.jpg",
};

/** Peregian-style beach (Kgbo, CC BY-SA 4.0). */
const IMG_PEREGIAN = {
  caption:
    "A south-coast Noosa beach — the village-square feel of Peregian.",
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Noosa_Heads_beach_in_January_2015.JPG/1280px-Noosa_Heads_beach_in_January_2015.JPG",
  author: "Kgbo",
  licence: "CC BY-SA 4.0",
  commonsPage:
    "https://commons.wikimedia.org/wiki/File:Noosa_Heads_beach_in_January_2015.JPG",
};

/** Noosa Farmers Market (Kgbo, CC BY-SA 4.0). */
const IMG_FARMERS_MARKET = {
  caption:
    "Noosa Farmers Market — Sunday morning at the Noosaville showgrounds.",
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Noosa_farmers_market.jpg/1280px-Noosa_farmers_market.jpg",
  author: "Kgbo",
  licence: "CC BY-SA 4.0",
  commonsPage:
    "https://commons.wikimedia.org/wiki/File:Noosa_farmers_market.jpg",
};

/** Aromas latte art — atmospheric interior (Kgbo, CC BY-SA 4.0). */
const IMG_AROMAS = {
  caption:
    "A Hastings Street café table — the boutique-strip atmosphere that runs the length of the street.",
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Aromas_Latte_art%2C_Noosa_Heads%2C_Queensland.jpg/1280px-Aromas_Latte_art%2C_Noosa_Heads%2C_Queensland.jpg",
  author: "Kgbo",
  licence: "CC BY-SA 4.0",
  commonsPage:
    "https://commons.wikimedia.org/wiki/File:Aromas_Latte_art,_Noosa_Heads,_Queensland.jpg",
};

/** Main Beach boardwalk — beachwear / resort context (Kgbo, CC BY-SA 4.0). */
const IMG_BOARDWALK = {
  caption:
    "The Boardwalk along Main Beach — the short walk between Hastings Street and the Surf Club.",
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Boardwalk_along_Noosa_Heads%E2%80%99_main_beach%2C_Queensland.jpg/1280px-Boardwalk_along_Noosa_Heads%E2%80%99_main_beach%2C_Queensland.jpg",
  author: "Kgbo",
  licence: "CC BY-SA 4.0",
  commonsPage:
    "https://commons.wikimedia.org/wiki/File:Boardwalk_along_Noosa_Heads%E2%80%99_main_beach,_Queensland.jpg",
};

/** Hastings Street 2022 — premium long-shot (Kgbo, CC BY-SA 4.0). */
const IMG_HASTINGS_2022 = {
  caption:
    "Hastings Street looking up to the headland — the walk from a Hastings Street shop to Main Beach.",
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Hastings_Street%2C_Noosa_Heads%2C_Queensland%2C_2022%2C_03.jpg/1280px-Hastings_Street%2C_Noosa_Heads%2C_Queensland%2C_2022%2C_03.jpg",
  author: "Kgbo",
  licence: "CC BY-SA 4.0",
  commonsPage:
    "https://commons.wikimedia.org/wiki/File:Hastings_Street,_Noosa_Heads,_Queensland,_2022,_03.jpg",
};

/** Noosa Ferry at Hastings — everyday Noosa street scene (Kgbo, CC BY-SA 4.0). */
const IMG_NOOSA_FERRY = {
  caption:
    "The Noosa ferry at Hastings — the everyday movement of the shire.",
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Noosa_Ferry_outside_Sofitel_Noosa_Pacific_Resort%2C_Noosa_Heads%2C_Queensland.jpg/1280px-Noosa_Ferry_outside_Sofitel_Noosa_Pacific_Resort%2C_Noosa_Heads%2C_Queensland.jpg",
  author: "Kgbo",
  licence: "CC BY-SA 4.0",
  commonsPage:
    "https://commons.wikimedia.org/wiki/File:Noosa_Ferry_outside_Sofitel_Noosa_Pacific_Resort,_Noosa_Heads,_Queensland.jpg",
};

/* ----------------------------------------------------------------------
 * Eight categories — Albert D1 §2.
 * -------------------------------------------------------------------- */

export const SHOPPING_CATEGORIES: ShoppingCategory[] = [
  /* ----- Category 1 — Hastings Street boutiques ----- */
  {
    id: "hastings",
    name: "Hastings Street boutiques",
    hook:
      "The strip between the surf club and the headland has been the dense retail pocket of Noosa since the 1970s — fashion, swim, jewellery, design, the kind of small shops that stay open when the chain stores go home.",
    eyebrow: "Where to start",
    anchor: "cat-hastings",
    image: IMG_HASTINGS_STREET,
    places: [
      {
        slug: "noosa-village-shopping-centre",
        name: "Noosa Village Shopping Centre",
        area: "Hastings Street",
        type: "Open-air centre / boutique precinct",
        whyWorthVisiting:
          "A walkable row of independent fashion, swim, jewellery and homewares at the inland end of Hastings Street. Anchored by a few well-known Australian labels, but mostly the small independents that define the strip.",
        bestFor: "A slow browse under the tallowwoods before lunch.",
        where: "Hastings Street, Noosa Heads (opposite the surf club entrance).",
        linkToMore:
          "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_HASTINGS_STREET,
      },
      {
        slug: "barefruit-lane",
        name: "Barefruit Lane",
        area: "Hastings Street",
        type: "Boutique row",
        whyWorthVisiting:
          "A short row of fashion and gift shops just up from the beach. Smaller than the centre but the density of good things per square metre is high.",
        bestFor: "A 20-minute browse when you have half an hour before the lunch booking.",
        where: "Hastings Street, Noosa Heads.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_HASTINGS_STREET,
      },
      {
        slug: "aromas-noosa-precinct",
        name: "Aromas Noosa boutique precinct",
        area: "Hastings Street",
        type: "Independent fashion + accessories",
        whyWorthVisiting:
          "The cluster of small fashion shops around the Aromas café end of Hastings Street — Australian labels, swim, beachwear, the kind of places with a sale rack you can actually browse.",
        bestFor: "Replacing the dress you forgot to pack.",
        where: "Hastings Street near Noosa Heads SLSC.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_AROMAS,
      },
      {
        slug: "hastings-jewellery-cluster",
        name: "The Hastings Street jewellery cluster",
        area: "Hastings Street",
        type: "Independent jewellers",
        whyWorthVisiting:
          "Three or four working jewellers and pearl specialists within a hundred metres of each other. Worth a window-shop even if you're not buying.",
        bestFor: "The gift you couldn't find anywhere else.",
        where: "Hastings Street, Noosa Heads.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_HASTINGS_STREET,
      },
      {
        slug: "noosa-beach-bookshop",
        name: "Noosa Beach Bookshop",
        area: "Hastings Street",
        type: "Independent bookshop",
        whyWorthVisiting:
          "Long-established independent bookshop on the strip. Australian fiction, Noosa-specific titles, kids' section.",
        bestFor: "The holiday afternoon when the surf's flat and the café is full.",
        where: "Hastings Street, Noosa Heads.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_HASTINGS_STREET,
      },
    ],
  },

  /* ----- Category 2 — Noosa Junction ----- */
  {
    id: "junction",
    name: "Noosa Junction",
    hook:
      "Five minutes' drive inland from Hastings Street, the Junction is where the locals actually shop — bookshops, fashion, gifts, food, a cinema. Quieter than the strip, easier parking, the place to come back to twice.",
    eyebrow: "Where the locals shop",
    anchor: "cat-junction",
    image: IMG_NOOSAVILLE,
    places: [
      {
        slug: "sunshine-beach-road-strip",
        name: "Sunshine Beach Road shopping strip",
        area: "Noosa Junction",
        type: "Strip-shop precinct",
        whyWorthVisiting:
          "A walkable row of fashion, gifts, homewares, bookshops and cafés running along Sunshine Beach Road through the Junction. The locals' answer to Hastings Street — same density of independents, none of the tourists.",
        bestFor: "The day you want to feel like you live here.",
        where: "Sunshine Beach Road, Noosa Junction (between Sunrise Avenue and Lanyana Way).",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_NOOSAVILLE,
      },
      {
        slug: "noosa-junction-plaza",
        name: "Noosa Junction Plaza",
        area: "Noosa Junction",
        type: "Neighbourhood centre",
        whyWorthVisiting:
          "A small covered centre with a supermarket, chemist, fashion and food — the everyday backbone of the Junction. Carries the basics you'd walk down the road for.",
        bestFor: "Sunscreen, milk, the umbrella you forgot.",
        where: "Sunshine Beach Road, Noosa Junction.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_NOOSAVILLE,
      },
      {
        slug: "junction-independent-bookshop",
        name: "The Junction's independent bookshop",
        area: "Noosa Junction",
        type: "Bookshop",
        whyWorthVisiting:
          "Independent bookshop on Sunshine Beach Road. Long-running; carries Australian fiction, Noosa regional titles, a kids' section. The Junction's reading corner.",
        bestFor: "Rainy-day browse; holiday reading you can't find at the airport.",
        where: "Sunshine Beach Road, Noosa Junction.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_NOOSAVILLE,
      },
      {
        slug: "junction-homewares-gifts",
        name: "The Junction's homewares + gift cluster",
        area: "Noosa Junction",
        type: "Homewares / gifts",
        whyWorthVisiting:
          "A handful of small homewares, ceramics and gift shops within walking distance of each other. Australian makers, the kind of thing you wish you had room for in the suitcase.",
        bestFor: "A small gift with provenance.",
        where: "Sunshine Beach Road, Noosa Junction.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_NOOSAVILLE,
      },
      {
        slug: "noosa-fair-shopping-centre",
        name: "Noosa Fair Shopping Centre",
        area: "Noosa Junction (Lanyana Way end)",
        type: "Neighbourhood centre",
        whyWorthVisiting:
          "The supermarket, chemist and big-strip essentials of the area, plus a handful of fashion and lifestyle stores. Practical shopping for a longer stay.",
        bestFor: "The big weekly shop when you're renting a house.",
        where: "Lanyana Way / Sunshine Beach Road intersection, Noosa Junction.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_NOOSAVILLE,
      },
    ],
  },

  /* ----- Category 3 — Peregian Beach ----- */
  {
    id: "peregian",
    name: "Peregian Beach",
    hook:
      "Ten minutes south of Noosa Heads, Peregian Beach is the village-square shopping you actually want on holiday. Patrolled beach, the open-air village square, a slow afternoon and a small batch of makers worth the drive.",
    eyebrow: "Ten minutes south",
    anchor: "cat-peregian",
    image: IMG_PEREGIAN,
    places: [
      {
        slug: "peregian-village-square",
        name: "Peregian Village Square",
        area: "Peregian Beach",
        type: "Village-square precinct",
        whyWorthVisiting:
          "The small village square at the heart of Peregian — fashion, homewares, gifts, cafés around a central lawn. Walkable, dog-friendly, the most village feel in the shire.",
        bestFor: "A late-morning coffee followed by an unhurried browse.",
        where: "Kingfisher Drive / David Low Way, Peregian Beach.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_PEREGIAN,
      },
      {
        slug: "mr-drifter",
        name: "Mr Drifter",
        area: "Peregian Beach",
        type: "Men's boutique (clothing / accessories)",
        whyWorthVisiting:
          "Long-running men's fashion boutique on the Peregian village square — Australian and international labels, the kind of edit that doesn't appear at the chain stores.",
        bestFor: "Replacing the shirt you didn't bring.",
        where: "Peregian Village Square, Kingfisher Drive, Peregian Beach.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_PEREGIAN,
      },
      {
        slug: "peregian-fashion-gifts",
        name: "The Peregian fashion + gifts cluster",
        area: "Peregian Beach",
        type: "Boutique row",
        whyWorthVisiting:
          "A small row of women's fashion, gift and homewares shops around the square — small batches, makers, the kind of thing you can't find at Westfield.",
        bestFor: "A present for someone back home.",
        where: "Peregian Village Square and surrounds, Peregian Beach.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_PEREGIAN,
      },
      {
        slug: "peregian-homewares-studios",
        name: "The Peregian homewares studios",
        area: "Peregian Beach",
        type: "Homewares / ceramics / makers",
        whyWorthVisiting:
          "A couple of small homewares and ceramics studios within the village — small-batch, often one of the maker's own designs.",
        bestFor: "A piece of the holiday for the kitchen when you get home.",
        where: "Peregian Village Square and surrounding streets.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_PEREGIAN,
      },
      {
        slug: "peregian-markets",
        name: "The Peregian markets (1st & 3rd Sunday)",
        area: "Peregian Beach",
        type: "Community market",
        whyWorthVisiting:
          "First and third Sunday of the month, the village square fills with makers, growers, designers and food stalls. Smaller than Eumundi, friendlier, the Sunday locals come down for it.",
        bestFor: "Sunday morning under the fig trees.",
        where: "Peregian Village Square, Peregian Beach.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_PEREGIAN,
      },
    ],
  },

  /* ----- Category 4 — Markets and local makers ----- */
  {
    id: "markets",
    name: "Markets and local makers",
    hook:
      "Sunday is the regional food event — the Noosa Farmers Market. Wednesday and Saturday are the crafts-and-makers pilgrimage to Eumundi. Smaller community markets run most Sundays.",
    eyebrow: "The market days",
    anchor: "cat-markets",
    image: IMG_FARMERS_MARKET,
    places: [
      {
        slug: "noosa-farmers-market",
        name: "Noosa Farmers Market",
        area: "Noosaville",
        type: "Farmers / producers market",
        whyWorthVisiting:
          "The Sunshine Coast's flagship food-and-produce market. Sunday morning at the Noosaville showgrounds — coffee, bread, fruit, vegetables, cheeses, ready-to-eat breakfast. The regional food event.",
        bestFor: "Stocking the holiday house with what the supermarkets don't have.",
        where: "Noosa AFL Grounds, Noosaville (7 am – noon, every Saturday).",
        linkToMore: "https://www.noosafarmersmarket.com.au/",
        linkLabel: "Visit the market",
        badge: null,
        image: IMG_FARMERS_MARKET,
      },
      {
        slug: "eumundi-markets",
        name: "Eumundi Markets",
        area: "Eumundi (hinterland)",
        type: "Makers / crafts / food market",
        whyWorthVisiting:
          "One of Australia's largest and longest-running makers' markets. Wednesday and Saturday, the Eumundi main street fills with 500+ stalls — fashion, ceramics, wood, jewellery, food. Half the people you see are from Brisbane; the other half are the makers.",
        bestFor: "A half-day out — drive 25 minutes up the range, browse, lunch in Eumundi.",
        where: "Memorial Drive / Main Street, Eumundi (Wed 8 am – 2 pm, Sat 7 am – 2 pm).",
        linkToMore: "https://www.eumundimarkets.com.au/",
        linkLabel: "Visit the market",
        badge: null,
        image: IMG_FARMERS_MARKET,
      },
      {
        slug: "peregian-beach-markets",
        name: "Peregian Beach Markets",
        area: "Peregian Beach",
        type: "Community / makers market",
        whyWorthVisiting:
          "First and third Sunday of the month at Peregian Village Square — growers, makers, food stalls, buskers. Smaller and more local than Eumundi; the Sunday-morning ritual for Peregian residents.",
        bestFor: "A Sunday-morning browse under the figs.",
        where: "Peregian Village Square, Peregian Beach.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_FARMERS_MARKET,
      },
      {
        slug: "noosa-marina-sunday-markets",
        name: "Noosa Marina Sunday Markets",
        area: "Noosa Marina / Tewantin",
        type: "Community markets",
        whyWorthVisiting:
          "Sunday morning markets at the Noosa Marina — produce, gifts, food stalls, the boat-watching crowd. Smaller and quieter than the Noosa Farmers Market; a Sunday that suits a river-side lunch.",
        bestFor: "Sunday breakfast by the boats.",
        where: "Noosa Marina, Tewantin (Sundays).",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_FARMERS_MARKET,
      },
      {
        slug: "cooroy-farmers-market",
        name: "Cooroy Farmers Market",
        area: "Cooroy (hinterland)",
        type: "Farmers / community market",
        whyWorthVisiting:
          "Saturday morning in Cooroy — the smaller, hinterland version of the Noosa Farmers Market. Local growers, bakers and makers in the main street of the closest inland town.",
        bestFor: "A quieter, smaller Saturday market on the way up to Eumundi.",
        where: "Maple Street, Cooroy (Saturdays).",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_FARMERS_MARKET,
      },
    ],
  },

  /* ----- Category 5 — Art, interiors and gifts ----- */
  {
    id: "art",
    name: "Art, interiors and gifts",
    hook:
      "The Noosa Shire is a working community of artists, designers and makers. The public gallery in Tewantin, a working studio or two in the hinterland villages, a few small galleries on Hastings Street — the gallery trail is the day you don't want to spend on the beach.",
    eyebrow: "The gallery trail",
    anchor: "cat-art",
    image: IMG_AROMAS,
    places: [
      {
        slug: "noosa-regional-gallery",
        name: "Noosa Regional Gallery",
        area: "Tewantin",
        type: "Public gallery",
        whyWorthVisiting:
          "The Noosa Shire's public gallery — free entry, a strong program of touring and local exhibitions, the catalogue of Noosa-region artists in the gift shop. The starting point for the Noosa art trail.",
        bestFor: "An hour in the air conditioning on a hot afternoon.",
        where: "Riverside Centre, Pelican Street, Tewantin.",
        linkToMore: "https://www.noosaregionalgallery.com.au/",
        linkLabel: "Visit the gallery",
        badge: null,
        image: IMG_AROMAS,
      },
      {
        slug: "hastings-street-galleries",
        name: "The Hastings Street galleries",
        area: "Hastings Street",
        type: "Commercial galleries",
        whyWorthVisiting:
          "A small cluster of commercial galleries on and around Hastings Street — local artists, mid-career Australian painters, the occasional sculpture show. Worth an unhurried walk-through even if you're not buying.",
        bestFor: "A slow browse between lunch and sunset.",
        where: "Hastings Street, Noosa Heads.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_HASTINGS_STREET,
      },
      {
        slug: "cooroy-butter-factory-arts-centre",
        name: "Cooroy Butter Factory Arts Centre",
        area: "Cooroy (hinterland)",
        type: "Arts centre / studios",
        whyWorthVisiting:
          "The restored 1930s butter factory in Cooroy — gallery spaces, working artists' studios, a coffee stop in the same complex. Half-day trip up the range.",
        bestFor: "A hinterland drive that ends in coffee and a print for the wall.",
        where: "Maple Street, Cooroy.",
        linkToMore: "https://www.butterfactoryartscentre.com.au/",
        linkLabel: "Visit the centre",
        badge: null,
        image: IMG_AROMAS,
      },
      {
        slug: "hinterland-studio-trail",
        name: "The hinterland studio trail",
        area: "Hinterland (Cooroy / Pomona / Kin Kin)",
        type: "Open studios / makers",
        whyWorthVisiting:
          "A handful of ceramics, painting and textiles studios open by appointment in the small towns up the range. The place to find a piece you can name the maker of.",
        bestFor: "A piece with provenance for the kitchen, the wall, the gift.",
        where: "Cooroy, Pomona, Kin Kin (studio map on the Noosa Open Studios trail).",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_AROMAS,
      },
      {
        slug: "peregian-coolum-gallery-cluster",
        name: "The Peregian / Coolum gallery cluster",
        area: "Peregian Beach / Coolum",
        type: "Small galleries",
        whyWorthVisiting:
          "A small set of working galleries on and around the Peregian village square and north toward Coolum — beach-region artists, smaller shows, the occasional Sunday opening.",
        bestFor: "The afternoon drive between Noosa and the Coolum cafés.",
        where: "Peregian Beach and Coolum.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_AROMAS,
      },
    ],
  },

  /* ----- Category 6 — Resort and beachwear ----- */
  {
    id: "beachwear",
    name: "Resort and beachwear",
    hook:
      "You forgot the hat, the sunscreen is finished, the linen shirt has sunscreen on it now. The beachwear strip on Hastings Street is the answer — Australian swim, linen, hats, sunglasses, the labels Noosa actually wears.",
    eyebrow: "The beach kit",
    anchor: "cat-beachwear",
    image: IMG_BOARDWALK,
    places: [
      {
        slug: "hastings-swim-beachwear-strip",
        name: "The Hastings Street swim + beachwear strip",
        area: "Hastings Street",
        type: "Beachwear boutiques",
        whyWorthVisiting:
          "The densest cluster of swim, linen, hat and sunglass shops in the region — Australian labels, the kind of shops with a working fit room. Where Noosa actually buys its beach kit.",
        bestFor: "The forgot-the-hat rescue.",
        where: "Hastings Street, Noosa Heads.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_HASTINGS_2022,
      },
      {
        slug: "junction-beachwear-linen",
        name: "The Junction's beachwear + linen cluster",
        area: "Noosa Junction",
        type: "Beachwear / casual clothing",
        whyWorthVisiting:
          "A small set of linen, casual clothing and accessory shops on the Sunshine Beach Road strip — slightly less tourist-priced than Hastings Street, the locals' answer to the beach-shop problem.",
        bestFor: "Replacing the shirt you left on the deck chair.",
        where: "Sunshine Beach Road, Noosa Junction.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_BOARDWALK,
      },
      {
        slug: "peregian-beachwear-shops",
        name: "Peregian village beachwear shops",
        area: "Peregian Beach",
        type: "Beachwear boutiques",
        whyWorthVisiting:
          "A couple of small beachwear and linen shops inside the Peregian village square — small-batch labels, the kind of thing you couldn't find at Westfield.",
        bestFor: "A gift for the friend who has everything.",
        where: "Peregian Village Square, Peregian Beach.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_PEREGIAN,
      },
      {
        slug: "noosa-hat-specialists",
        name: "The Noosa hat specialists",
        area: "Hastings Street",
        type: "Hat boutique",
        whyWorthVisiting:
          "At least one specialist hat shop on Hastings Street — Australian-made, the kind of hat you'd keep on the wall at home. Replace the one the wind took on the beach.",
        bestFor: "The hat you didn't pack.",
        where: "Hastings Street, Noosa Heads.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_HASTINGS_STREET,
      },
      {
        slug: "noosa-sunglasses-cluster",
        name: "The Noosa sunglasses cluster",
        area: "Hastings Street / Noosa Junction",
        type: "Sunglasses boutiques",
        whyWorthVisiting:
          "Three or four sunglass independents on Hastings and in the Junction — Australian and international independent labels, the place for the pair that won't break when you sit on them.",
        bestFor: "Replacing the pair that just broke.",
        where: "Hastings Street and Sunshine Beach Road, Noosa.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_HASTINGS_2022,
      },
    ],
  },

  /* ----- Category 7 — Rainy-day shopping ----- */
  {
    id: "rainyday",
    name: "Rainy-day shopping",
    hook:
      "The day the southerly comes in is the day to head inside. The Hastings Street strip has its covered walkways; Noosa Village, Noosa Fair and Noosa Civic are the three centres that take the weather out of shopping.",
    eyebrow: "The grey-day list",
    anchor: "cat-rainyday",
    image: IMG_HASTINGS_2022,
    places: [
      {
        slug: "noosa-village-covered",
        name: "Noosa Village Shopping Centre (covered walkways)",
        area: "Hastings Street, Noosa Heads",
        type: "Open-air centre with covered sections",
        whyWorthVisiting:
          "Walkable from anywhere on Hastings Street; the densest single-precinct shopping in Noosa. The covered sections mean a shower is a five-minute delay, not a day lost.",
        bestFor: "The grey-day browse that turns into a long lunch.",
        where: "Hastings Street, Noosa Heads.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_HASTINGS_2022,
      },
      {
        slug: "noosa-fair-indoor",
        name: "Noosa Fair Shopping Centre",
        area: "Noosa Junction (Lanyana Way)",
        type: "Neighbourhood centre",
        whyWorthVisiting:
          "The Junction's indoor centre — fashion, food, the bigger-name essentials, all under one roof. The locals' rainy-day stop.",
        bestFor: "The wet-weekday shop.",
        where: "Lanyana Way, Noosa Junction.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_NOOSAVILLE,
      },
      {
        slug: "noosa-civic",
        name: "Noosa Civic Shopping Centre",
        area: "Noosaville",
        type: "Large-format centre (Woolworths, Big W, fashion)",
        whyWorthVisiting:
          "The shire's largest shopping centre — Woolworths, Big W, fashion, food court, the place to replace anything you forgot to pack. Five minutes' drive from Hastings Street.",
        bestFor: "The thing you really should have packed.",
        where: "Eenie Creek Road, Noosaville.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_NOOSA_FERRY,
      },
      {
        slug: "noosa-library-cafe",
        name: "Noosa Library + café",
        area: "Noosaville",
        type: "Library + café",
        whyWorthVisiting:
          "The Noosa Shire public library has free wifi, newspapers, the children's corner and a small café on the same site. The rainy-day option that doesn't cost anything.",
        bestFor: "A few hours when the beach isn't an option.",
        where: "Wallace Park, Noosaville.",
        linkToMore: "https://www.noosa.qld.gov.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_NOOSAVILLE,
      },
      {
        slug: "noosa-cinemas",
        name: "Noosa cinemas (Junction + Cooroy)",
        area: "Noosa Junction / Cooroy",
        type: "Cinema",
        whyWorthVisiting:
          "Two small independent-feeling cinemas — the Noosa Junction cinema on Sunshine Beach Road, the smaller one in Cooroy. A film is a rainy-day plan, and the Junction cinema's café is open all day.",
        bestFor: "The wet-evening plan.",
        where: "Sunshine Beach Road, Noosa Junction + Maple Street, Cooroy.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_NOOSAVILLE,
      },
    ],
  },

  /* ----- Category 8 — Everyday essentials ----- */
  {
    id: "everyday",
    name: "Everyday essentials",
    hook:
      "The pharmacies, supermarkets and small shops that keep a Noosa week running. The big names are at Noosa Civic; the small independents are on Hastings Street, in the Junction and in Peregian.",
    eyebrow: "The weekly round",
    anchor: "cat-everyday",
    image: IMG_NOOSA_FERRY,
    places: [
      {
        slug: "noosa-civic-essentials",
        name: "Noosa Civic (Woolworths, Big W, chemist)",
        area: "Noosaville",
        type: "Large-format centre",
        whyWorthVisiting:
          "The shire's main weekly-shop centre — Woolworths, Big W, chemist, fashion, food court, the place to do the big weekly shop in one go.",
        bestFor: "The full weekly shop for a longer stay.",
        where: "Eenie Creek Road, Noosaville.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_NOOSA_FERRY,
      },
      {
        slug: "hastings-chemist",
        name: "The Hastings Street chemist + pharmacy",
        area: "Hastings Street, Noosa Heads",
        type: "Pharmacy / chemist",
        whyWorthVisiting:
          "Late-opening pharmacy on Hastings Street — the forgot-the-sunscreen, forgot-the-painkiller rescue. Open weekends and most evenings through summer.",
        bestFor: "The 9 pm forgot-the-something rescue.",
        where: "Hastings Street, Noosa Heads.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_HASTINGS_STREET,
      },
      {
        slug: "junction-plaza-supermarket",
        name: "Noosa Junction Plaza supermarket + chemist",
        area: "Noosa Junction",
        type: "Neighbourhood centre",
        whyWorthVisiting:
          "The supermarket, chemist and everyday shops of the Junction — the smaller, walkable version of Civic. The closer, quicker shop if you're staying between Hastings and Sunshine.",
        bestFor: "The milk-and-bread-and-sunscreen shop.",
        where: "Sunshine Beach Road, Noosa Junction.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_NOOSAVILLE,
      },
      {
        slug: "peregian-village-grocer",
        name: "The Peregian village grocer + pharmacy",
        area: "Peregian Beach",
        type: "Local grocer / pharmacy",
        whyWorthVisiting:
          "Small independent grocer, the village pharmacy, a bottle shop. The Peregian version of the milk-and-bread-and-wine shop.",
        bestFor: "The small shop when you're not driving anywhere.",
        where: "Peregian Village Square and surrounds.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_PEREGIAN,
      },
      {
        slug: "beach-kit-shops",
        name: "The beach kit shops (board hire + surf accessories)",
        area: "Hastings Street / Main Beach",
        type: "Surf accessories / beach kit",
        whyWorthVisiting:
          "The surf shops at Main Beach carry wax, zinc, rashies, leashes, sun-shirts — the things you actually need on the beach, not just the souvenir.",
        bestFor: "Replacing the wax you forgot to bring.",
        where: "Hastings Street and around Main Beach, Noosa Heads.",
        linkToMore: "https://www.visitnoosa.com.au/",
        linkLabel: "Find out more",
        badge: null,
        image: IMG_BOARDWALK,
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