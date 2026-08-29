/**
 * Venue data — MSN-2980 V2 build (KUBE Spec §B.4).
 *
 * Six anchor venues for the new `/eat-and-drink` route. Two Hastings
 * Street restaurants, two Noosaville riverfront venues, one Sunshine
 * Beach village venue, one Peregian Beach hotel/restaurant — covers
 * the four Noosa precincts that visitors actually eat in.
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
 *
 * Six venues was the chairman-mandated minimum for MSN-2980.
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
    slug: "season-restaurant",
    name: "Season Restaurant",
    areaId: "hastings",
    cuisine: "Modern Australian",
    headline: "Peter Kuruvita's flagship on Hastings Street.",
    whyWorthVisiting:
      "Season has held the same Hastings Street address for over a decade and remains the most consistent fine-dining room on the strip. Peter Kuruvita's menu tracks the South-East Queensland growing season — single-page, four courses, with one fish, one pork or lamb, one duck or chicken, and a vegetarian main that always works. The wine list is Australian-leaning with a serious pinot section. Book ahead for dinner in summer.",
    bestFor: "Special occasion · couples · foodies",
    signatureDishes: [
      "Sunshine Coast yellowfin tuna, palm heart, native lime",
      "Local pork belly, master stock, apple, fennel",
      "Citrus curd, brown butter, macadamia",
    ],
    priceGuide: "A$120–150 per person for the four-course menu; wine pairing A$85 extra.",
    hours: "Dinner Tuesday–Saturday, 6:00 pm – late. Closed Sunday and Monday. Verify hours before visiting.",
    address: "Hastings Street, Noosa Heads QLD 4567",
    reservationUrl: "https://www.seasonrestaurant.com.au/",
    dogs: "Inside dining only — well-behaved dogs on Hastings Street footpath outside is at the operator's discretion.",
    whatsNotHere: "Not a breakfast venue. Not casual — the dress code is smart-casual and the room is small.",
  },
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
    slug: "gympie-terrace-fish",
    name: "The Noosa Boathouse",
    areaId: "noosaville",
    cuisine: "Seafood",
    headline: "River-edge seafood on Gympie Terrace.",
    whyWorthVisiting:
      "The Boathouse sits at the south end of Gympie Terrace, with a deck that overhangs the river. Sunset is the table to book — the light on the water is the show, and the kitchen leans toward seafood: local prawns, oysters from the river mouth, line-caught fish. Casual enough for shorts and thongs; smart enough for a date night. Family-friendly before 7 pm.",
    bestFor: "Couples · families · sunset",
    signatureDishes: [
      "Local prawns, mango, chilli, lime",
      "River-mouth oysters, natural or kilpatrick",
      "Pan-fried Noosa whiting, fries, house tartare",
      "Char-grilled Sunshine Coast sirloin, frites",
    ],
    priceGuide: "A$45–75 per person for mains; seafood platters A$120 to share.",
    hours: "Daily, 11:30 am – late. Reservations recommended for sunset (book a week ahead in summer).",
    address: "194 Gympie Terrace, Noosaville QLD 4566",
    reservationUrl: "https://www.noosaboathouse.com.au/",
    dogs: "Outside deck welcomes dogs on leash; inside dining is dog-free.",
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
    slug: "sunshine-beach-bistro",
    name: "Sunshine Beach Surf Club Bistro",
    areaId: "sunshine",
    cuisine: "Pub & bistro",
    headline: "Counter meal over the patrolled sand.",
    whyWorthVisiting:
      "The bistro at the Sunshine Beach Surf Life Saving Club sits one floor up over the flagged sand — counter meals, kids' menu, an Australian-leaning wine list, and a balcony that catches the afternoon sea breeze. It's the easiest lunch within an hour's drive of Noosa: park, walk up, order, eat with the view. Open for lunch and dinner; family-friendly.",
    bestFor: "Family · lunch with a view · easy meal",
    signatureDishes: [
      "Beer-battered local flathead, chips, salad",
      "300g rump, pepper sauce, mash",
      "Caesar salad with grilled chicken",
      "Kids' chicken schnitzel and chips",
    ],
    priceGuide: "A$25–40 per person for counter meals; A$15–20 for kids.",
    hours: "Daily, 11:30 am – 9:00 pm. No reservations — walk in.",
    address: "Duke Street, Sunshine Beach QLD 4567 (above the surf club)",
    reservationUrl: "https://www.sunshinebeachslsc.com.au/",
    dogs: "Outside balcony welcomes dogs on leash; inside dining is dog-free.",
    whatsNotHere: "Not a fine-dining venue. The bistro is a counter-meal room — pour your own wine, no tablecloths.",
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
