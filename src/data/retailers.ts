/**
 * Retailer data — MSN-2985 V2 release correction pass.
 *
 * Three anchor retailers from Albert's D3 brief + the MSN-2985
 * collapse strategy (chairman mandate 2026-08-29): keep the three
 * with verified Noosa photos and direct operator URLs (NFM,
 * Eumundi, NRG); remove the 5 deep-page entries whose pages were
 * category headings, not standalone listings.
 *
 * Each entry owns:
 *   - slug
 *   - name
 *   - category (one line)
 *   - headline (atmospheric — the morning / the rhythm)
 *   - whyWorthVisiting (2-3 sentences)
 *   - whatTheySell (bullets — specific items, not categories)
 *   - whenAndWhere (day, time, address)
 *   - parking
 *   - dogs (where applicable)
 *   - bestFor (one tag)
 *   - howToMakeAMorningOfIt (timeline of hours)
 *   - whatsNotHere (pre-empts the wrong visitor)
 *   - culturalNote (where applicable)
 *   - moreInfoUrl (operator-direct URL — NEVER visitnoosa.com.au)
 *
 * Removed in MSN-2985: noosa-junction, hastings-street-boutiques,
 * peregian-village-shops, sunshine-beach-village, tewantin-antiques.
 *
 * @see /Volumes/OpenClawLive/state/control/evidence/MSN-2985/REMOVE_LIST.md
 */

export type RetailerPage = {
  slug: string;
  name: string;
  category: string;
  headline: string;
  whyWorthVisiting: string;
  whatTheySell: string[];
  whenAndWhere: {
    when: string;
    address: string;
  };
  parking?: string;
  dogs?: string;
  bestFor: string;
  howToMakeAMorningOfIt: { time: string; action: string }[];
  whatsNotHere?: string;
  culturalNote?: string;
  moreInfoUrl: string;
};

export const RETAILERS: RetailerPage[] = [
  {
    slug: "noosa-farmers-market",
    name: "Noosa Farmers Market",
    category: "Markets and local makers",
    headline: "The Sunday-morning food event of the Sunshine Coast.",
    whyWorthVisiting:
      "The Noosa Farmers Market runs every Sunday morning at the Noosaville showgrounds, and it's the regional food event — over 100 stallholders, almost all of them primary producers within about an hour of Noosa. The bread is still warm, the coffee is from a Sunshine Coast roaster, the seafood was in the water on Friday. It's where the local restaurants' chefs shop on Sunday morning, and where you can taste the difference between a Noosa tomato and a Woolworths tomato in a single bite.",
    whatTheySell: [
      "Organic and spray-free fruit and vegetables",
      "Sourdough and wood-fired bread",
      "Fresh seafood — local prawns, oysters, fish",
      "Olive oil, marinades, sauces, dips",
      "Honey, nuts, seeds, dried fruit",
      "Pastries, croissants, doughnuts",
      "Pasture-raised eggs and dairy",
      "Cut flowers and seedlings",
    ],
    whenAndWhere: {
      when: "Every Sunday, 7:00 am – midday",
      address: "155 Weyba Road, Noosaville QLD 4566",
    },
    parking: "On-site, free. The carpark fills by 8:30 in winter and 9:00 in summer — get there before 8 if you want to park close.",
    dogs: "On leash, please. Some stallholders have food samples at low height.",
    bestFor: "Anyone who eats · couples · foodies · Noosaville guests",
    howToMakeAMorningOfIt: [
      { time: "7:30 am", action: "Arrive, get a flat-white, do a first lap to see what's on" },
      { time: "8:30 am", action: "Buy the bread (still warm), the tomatoes, the seafood" },
      { time: "9:30 am", action: "Breakfast on the lawn — bacon-and-egg rolls, dumplings, pancakes, smoothies" },
      { time: "10:30 am", action: "Second lap for things you missed" },
      { time: "11:30 am", action: "Coffee and a final pastry, then leave before the close" },
    ],
    whatsNotHere:
      "This is a food and produce market. It's not the place for souvenirs, beachwear, or craft shopping. For those, go to Eumundi (Wed/Sat) or the Hastings Street boutiques.",
    moreInfoUrl: "https://noosafarmersmarket.com.au/",
  },
  {
    slug: "the-original-eumundi-markets",
    name: "The Original Eumundi Markets",
    category: "Markets and local makers",
    headline: "Two days a week, the makers come out.",
    whyWorthVisiting:
      "The Original Eumundi Markets run every Wednesday and Saturday morning in the hinterland village of Eumundi — about 25 minutes' drive west of Noosa. This is the makers' market — over 240 stallholders, with a strong mix of hand-thrown ceramics, hand-printed textiles, leatherwork, jewellery, woodwork, and natural body care. The food court is large and varied; live music runs throughout the morning. It's where you go when you want a tote bag full of things you can't find anywhere else.",
    whatTheySell: [
      "Hand-thrown ceramics and pottery",
      "Hand-printed textiles, clothing, linen",
      "Leather belts, bags, wallets",
      "Sterling silver and hand-cut jewellery",
      "Natural body care, soap, essential oils",
      "Woodwork, turned bowls, hand-carved utensils",
      "Art prints, photography, small paintings",
      "Vintage clothing and records",
      "Food court with global cuisines — dumplings, paella, souvlaki, banh mi, gelato",
    ],
    whenAndWhere: {
      when: "Every Wednesday and Saturday, 7:30 am – 2:00 pm",
      address: "80 Memorial Drive, Eumundi QLD 4562",
    },
    parking: "Free, multiple carparks. Avoid the main street; signage points the way.",
    bestFor: "Couples · groups · anyone wanting a tote bag of original purchases",
    howToMakeAMorningOfIt: [
      { time: "8:00 am", action: "Arrive, get a coffee, do a full lap to see who's there" },
      { time: "9:00 am", action: "First purchases (the best stalls sell out by 11)" },
      { time: "10:30 am", action: "Second coffee, live music in the bandstand" },
      { time: "11:30 am", action: "Food court lunch (every cuisine you can think of)" },
      { time: "1:00 pm", action: "Final lap for things you missed" },
    ],
    whatsNotHere:
      "Eumundi isn't a food-only market — for that, go to the Noosa Farmers Market on a Sunday. Eumundi is a makers' market; if you want local produce with your morning coffee, Eumundi is not the day.",
    moreInfoUrl: "https://eumundimarkets.com.au/",
  },
  {
    slug: "noosa-regional-gallery",
    name: "Noosa Regional Gallery",
    category: "Art, interiors and gifts",
    headline: "The cultural anchor of the shire, and it's free.",
    whyWorthVisiting:
      "Noosa Regional Gallery is the public gallery for the Noosa Shire, run with the support of Noosa Council. It sits in a converted printing works on Riverside Drive in Tewantin — a ten-minute drive from Hastings Street, on the way to the river mouth. The gallery runs a changing exhibition program across six to eight shows a year, with a mix of touring shows from Australian ceramics and regional galleries, and curated Sunshine Coast artists. The exhibition openings are well-attended and the artist talks are open to the public.",
    whatTheySell: [
      "Rotating exhibition program — ceramics, painting, photography, sculpture",
      "Workshop and masterclass program (bookable; fees apply)",
      "School holiday and after-school children's programs",
      "The Gallery Shop — small-format art prints, ceramics, jewellery, books, cards by Sunshine Coast makers",
      "The Gallery Cafe — light meals and good coffee under the old trees",
    ],
    whenAndWhere: {
      when: "Tuesday to Friday 10:00 am – 4:00 pm; Saturday and Sunday 10:00 am – 3:00 pm; closed Mondays. Verify hours before visiting.",
      address: "167 Riverside Drive, Tewantin QLD 4565",
    },
    parking: "On-site, free",
    bestFor: "Anyone who's been on the beach for two days · couples · families · art-curious visitors",
    howToMakeAMorningOfIt: [
      { time: "10:00 am", action: "Arrive, browse the current exhibitions" },
      { time: "11:00 am", action: "Coffee and a pastry in the Gallery Cafe under the trees" },
      { time: "11:45 am", action: "Visit the Gallery Shop — small purchases, all from local makers" },
      { time: "12:30 pm", action: "Second look at the exhibitions" },
      { time: "1:00 pm", action: "Lunch in Tewantin village, or continue up the river to the Noosa Marina" },
    ],
    whatsNotHere:
      "Not a museum of Noosa history and not a souvenir shop. The Gallery is a working regional gallery for contemporary exhibitions — if you want Noosa history, ask at the Noosa Shire Library.",
    culturalNote:
      "Noosa Regional Gallery stands on Kabi Kabi / Gubbi Gubbi country and acknowledges the Traditional Owners in their published materials.",
    moreInfoUrl: "https://www.noosaregionalgallery.com.au/",
  },
];

export const RETAILERS_BY_SLUG: Record<string, RetailerPage> = RETAILERS.reduce(
  (acc, r) => {
    acc[r.slug] = r;
    return acc;
  },
  {} as Record<string, RetailerPage>,
);
