/**
 * Venue data — MSN-2980 V2 build (KUBE Spec §B.4).
 *
 * Three anchor venues for the new `/eat-and-drink` route. One Hastings
 * Street café, one Noosaville riverfront restaurant, one Peregian Beach
 * hotel/restaurant — covers three of the four Noosa precincts that
 * visitors actually eat in.
 *
 * Per D8 voice guide + KUBE §A.3 restaurant pattern:
 *   - Headline leads with location / era / distinction
 *   - One CTA per page (operator's reservation link)
 *   - Practical details revealed after the atmospheric hook
 *
 * Photos are Noosa-specific where possible (Flickr CC); where the
 * Openverse search returned off-topic results (Hastings UK,
 * Vancouver Chinatown), generic CC0 Unsplash photos are used with
 * a clear "atmospheric" caption in the photo credit table at
 * /photo-credits.
 */

export type VenueCuisine =
  | "Modern Australian"
  | "Asian"
  | "Italian"
  | "Café & brunch"
  | "Pub & bistro"
  | "Seafood";

export type VenuePage = {
  slug: string;
  name: string;
  areaId: "hastings" | "noosaville" | "sunshine" | "peregian";
  cuisine: VenueCuisine;
  headline: string;
  /** 2-3 sentence atmospheric pitch. */
  whyWorthVisiting: string;
  /** One short "best for" tag, two-to-three words. */
  bestFor: string;
  signatureDishes: string[];
  /** Per-meal price guide in AUD per person (without drinks). */
  priceGuide: string;
  hours: string;
  address: string;
  reservationUrl: string;
  phone?: string;
  dogs?: string;
  whatsNotHere?: string;
};

export const VENUES: VenuePage[] = [
  {
    slug: "aroma-noosa",
    name: "Aroma Noosa",
    areaId: "hastings",
    cuisine: "Café & brunch",
    headline: "The flat-white that built Hastings Street.",
    whyWorthVisiting:
      "Aroma has been the morning ritual at the southern end of Hastings for years — long coffee, slow brunch, and the kind of people-watching that's better than TV. Order the ricotta hot-cakes or the standard bacon-and-egg roll on Turkish bread; either will set you up for the headland walk. Walk-in only for breakfast, but the line moves fast.",
    bestFor: "Breakfast · coffee · people-watching",
    signatureDishes: [
      "The ricotta hot-cakes — the long-time signature",
      "The breakfast staples on Turkish bread — bacon, egg, haloumi, chutney",
    ],
    priceGuide: "Mains A$20–35 (verify on the day at aromanoosa.com.au).",
    hours: "Daily from breakfast — verify hours on the day at aromanoosa.com.au.",
    address: "32 Hastings Street, Noosa Heads QLD 4567",
    reservationUrl: "https://www.aromanoosa.com.au/",
    dogs: "Outdoor footpath seating — confirm dog policy with the venue on the day.",
    whatsNotHere: "Not a dinner venue — Aroma is breakfast and lunch only. Verify hours at the operator's site.",
  },
  {
    slug: "riverdeck-noosa",
    name: "Riverdeck Restaurant",
    areaId: "noosaville",
    cuisine: "Modern Australian",
    headline: "Mature gardens, river views, long lunch.",
    whyWorthVisiting:
      "Riverdeck has been trading on Gympie Terrace since the late 1990s and still feels like a Noosa institution. The garden setting is the point — tables on the lawn, fig trees, the river beyond. The kitchen runs a single menu for lunch and dinner, leaning modern Australian with strong pasta and steak. Long lunches are the sweet spot.",
    bestFor: "Long lunch · groups · special occasions",
    signatureDishes: [
      "Hand-rolled gnocchi with peas, mint and burnt butter",
      "300g rib-eye with frites and café de Paris butter",
    ],
    priceGuide: "Mains A$30–60 (verify on the day at riverdeck.com.au).",
    hours: "Lunch and dinner from midday — verify hours on the day at riverdeck.com.au.",
    address: "248 Gympie Terrace, Noosaville QLD 4566",
    reservationUrl: "https://www.riverdeck.com.au/",
    dogs: "Garden tables — confirm dog policy with the venue on the day.",
  },
  {
    slug: "peregian-beach-hotel",
    name: "Peregian Beach Hotel",
    areaId: "peregian",
    cuisine: "Pub & bistro",
    headline: "Village square, beer garden, ten minutes south.",
    whyWorthVisiting:
      "The Peregian Beach Hotel sits on the village square with a beer garden that opens onto the street and a bistro that's a genuine local favourite. The kitchen is pub-modern Australian — burgers, steaks, parmas, the usual — but executed properly. Confirm the day's specials and any age-related entry rules directly with the venue when you visit.",
    bestFor: "Family · casual · groups · dog-friendly",
    signatureDishes: [
      "House beef burger with smoked cheddar on a brioche bun",
      "Chicken parmigiana with ham, napoli and mozzarella",
    ],
    priceGuide: "Mains A$20–40 (verify on the day at peregianbeachhotel.com.au).",
    hours: "Daily from late morning — verify hours on the day at peregianbeachhotel.com.au.",
    address: "2 Kingfisher Drive, Peregian Beach QLD 4573",
    reservationUrl: "https://www.peregianbeachhotel.com.au/",
    dogs: "Beer garden welcomes dogs on leash — confirm dog policy with the venue on the day.",
  },
  {
    slug: "season-noosa",
    name: "Season Restaurant",
    areaId: "hastings",
    cuisine: "Modern Australian",
    headline: "Hastings fine-dining — the long, considered meal.",
    whyWorthVisiting:
      "Season has been one of the Hastings Street fine-dining rooms for years — a small dining room, a short menu that changes with what's growing locally, and the kind of service that doesn't rush you. Book ahead; the room is small and it fills. Confirm any dietary requirements when you book — the kitchen accommodates but doesn't guarantee last-minute changes.",
    bestFor: "Anniversaries · a long lunch · a different evening",
    signatureDishes: [
      "The seasonally-changing tasting menu (verify the current menu at the operator's site)",
      "The matching wine list, which leans toward smaller Australian producers",
    ],
    priceGuide: "Tasting menus (verify on the day at seasonrestaurant.com.au).",
    hours: "Dinner — verify hours on the day at seasonrestaurant.com.au.",
    address: "Hastings Street, Noosa Heads QLD 4567",
    reservationUrl: "https://www.seasonrestaurant.com.au/",
    dogs: "Not applicable — fine-dining room.",
    whatsNotHere:
      "Not a walk-in venue, and not a child-friendly venue for a quick bite. Book ahead and plan the evening around the meal.",
  },
  {
    slug: "noosa-boathouse",
    name: "The Noosa Boathouse",
    areaId: "noosaville",
    cuisine: "Seafood",
    headline: "Riverfront lunch — boats at the dock.",
    whyWorthVisiting:
      "The Noosa Boathouse sits on the Noosaville riverfront with the boats at the dock and Gympie Terrace behind you. The kitchen is seafood-leaning modern Australian — the kind of place for a long lunch with friends, a seafood platter to share, and a glass of something cold while the ferries go past. Confirm any group bookings or special-occasion requests directly with the venue.",
    bestFor: "Long lunch · groups · a different Noosaville afternoon",
    signatureDishes: [
      "The seafood platter — verify the day's catch at the operator's site",
      "The river-edge table — book ahead to be on the deck",
    ],
    priceGuide: "Mains A$30–50 (verify on the day at noosaboathouse.com.au).",
    hours: "Lunch and dinner — verify hours on the day at noosaboathouse.com.au.",
    address: "Gympie Terrace, Noosaville QLD 4566",
    reservationUrl: "https://www.noosaboathouse.com.au/",
    dogs: "Outdoor deck — confirm dog policy with the venue on the day.",
  },
  {
    slug: "sante-noosa",
    name: "Sante of Noosa",
    areaId: "hastings",
    cuisine: "Café & brunch",
    headline: "Counter-side brunch prep — Hastings morning ritual.",
    whyWorthVisiting:
      "Sante is one of the Hastings Street counter-side brunch spots — the kind of place where you order at the counter, watch the kitchen work, and sit with a flat-white while the line moves. The menu is short, the coffee is from a Sunshine Coast roaster, and the tables on the footpath are the prize in good weather. Confirm any group bookings directly with the venue.",
    bestFor: "Breakfast · coffee · a quick bite",
    signatureDishes: [
      "The breakfast staples — eggs in their various forms",
      "The single-origin flat-white — confirm the current roaster at the venue",
    ],
    priceGuide: "Mains A$15–30 (verify on the day at the venue).",
    hours: "Daily from breakfast — verify hours on the day at the venue.",
    address: "Hastings Street, Noosa Heads QLD 4567",
    reservationUrl: "https://www.santenoosa.com.au/",
    dogs: "Outdoor footpath seating — confirm dog policy with the venue on the day.",
    whatsNotHere: "Not a dinner venue. Sante is breakfast and lunch only.",
  },
];

export const VENUES_BY_SLUG: Record<string, VenuePage> = VENUES.reduce(
  (acc, v) => {
    acc[v.slug] = v;
    return acc;
  },
  {} as Record<string, VenuePage>,
);

export const VENUES_BY_AREA: Record<string, VenuePage[]> = {
  hastings: VENUES.filter((v) => v.areaId === "hastings"),
  noosaville: VENUES.filter((v) => v.areaId === "noosaville"),
  sunshine: VENUES.filter((v) => v.areaId === "sunshine"),
  peregian: VENUES.filter((v) => v.areaId === "peregian"),
};
