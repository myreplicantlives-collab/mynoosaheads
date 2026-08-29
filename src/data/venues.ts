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
      "Ricotta hot-cakes, honeycomb butter, fresh berries",
      "Turkish roll, bacon, egg, haloumi, chutney",
      "Acai bowl with house granola",
      "Single-origin flat-white from a Sunshine Coast roaster",
    ],
    priceGuide: "A$25–35 per person for breakfast; A$8–12 for coffee.",
    hours: "Daily, 6:30 am – 3:00 pm. No reservations for breakfast — walk in.",
    address: "32 Hastings Street, Noosa Heads QLD 4567",
    reservationUrl: "https://www.aromanoosa.com.au/",
    dogs: "Outdoor footpath seating welcomes dogs on leash.",
    whatsNotHere: "Not a dinner venue. Aroma closes at 3:00 pm.",
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
      "Hand-rolled gnocchi, peas, mint, burnt butter",
      "300g rib-eye, frites, café de Paris butter",
      "Roasted local carrots, whipped goat's curd, dukkah",
    ],
    priceGuide: "A$45–65 per person for lunch; A$75–95 for dinner mains.",
    hours: "Daily, 12:00 pm – late. Reservations recommended on weekends.",
    address: "248 Gympie Terrace, Noosaville QLD 4566",
    reservationUrl: "https://www.riverdeck.com.au/",
    dogs: "Garden tables welcome dogs on leash.",
  },
  {
    slug: "peregian-beach-hotel",
    name: "Peregian Beach Hotel",
    areaId: "peregian",
    cuisine: "Pub & bistro",
    headline: "Village square, beer garden, ten minutes south.",
    whyWorthVisiting:
      "The Peregian Beach Hotel sits on the village square with a beer garden that opens onto the street and a bistro that's a genuine local favourite. The kitchen is pub-modern Australian — burgers, steaks, parmas, the usual — but executed properly, with a strong seafood specials board on Friday nights. Family-friendly until 7 pm; over-25s after that.",
    bestFor: "Family · casual · groups · dog-friendly",
    signatureDishes: [
      "House beef burger, smoked cheddar, brioche bun",
      "Chicken parmigiana, ham, napoli, mozzarella",
      "Local prawn and chorizo pizza",
      "Friday seafood specials (verify on the day)",
    ],
    priceGuide: "A$25–35 per person for bistro mains; A$15–20 for kids.",
    hours: "Daily, 11:30 am – late. No reservations for the bistro — walk in.",
    address: "2 Kingfisher Drive, Peregian Beach QLD 4573",
    reservationUrl: "https://www.peregianbeachhotel.com.au/",
    dogs: "Beer garden welcomes dogs on leash; inside dining is dog-free.",
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
