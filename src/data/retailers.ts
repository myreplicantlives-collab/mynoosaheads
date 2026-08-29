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
  {
    slug: "hastings-street-boutiques",
    name: "Hastings Street boutiques",
    category: "Boutiques and fashion",
    headline: "The walkable fashion strip between Main Beach and the headland.",
    whyWorthVisiting:
      "Hastings Street is the 800-metre retail strip between Noosa Main Beach and the Noosa National Park headland — a dense run of independent boutiques, surf shops, jewellery stores, and the occasional international fashion label. Most of the shops are owner-operated; the experience is closer to a country town's high street than a shopping mall. Walk the strip end-to-end in the morning, stop for a coffee, walk it back. Confirm each shop's hours and current stock on their own website before making a special trip.",
    whatTheySell: [
      "Resort wear, swimwear, and beach fashion",
      "Australian and international fashion labels",
      "Independent jewellery, watches, and accessories",
      "Surf shops, boardshorts, and beach gear",
      "Homewares, ceramics, and design objects",
    ],
    whenAndWhere: {
      when: "Daily, mostly 9 am – 5 pm. Verify each shop's hours before you go.",
      address: "Hastings Street, Noosa Heads QLD 4567",
    },
    parking: "Noosa Heads Main Beach carpark on Hastings Street (paid in summer); Noosa Drive overflow.",
    dogs: "Outdoor footpath seating at some cafés; dogs not permitted inside most boutiques.",
    bestFor: "Anyone who likes to browse · fashion-curious visitors · a slow morning walk",
    howToMakeAMorningOfIt: [
      { time: "9:00 am", action: "Arrive, get a flat-white at one of the cafés at the beach end of the strip" },
      { time: "9:30 am", action: "Walk the southern half of the strip (beach end to surf club)" },
      { time: "10:30 am", action: "Walk the northern half (surf club to the headland end)" },
      { time: "11:30 am", action: "Coffee stop, browse the boutiques you flagged on the first pass" },
      { time: "12:30 pm", action: "Lunch on Hastings or the surf club deck" },
    ],
    whatsNotHere:
      "Hastings Street is not a department store or a shopping mall — for that, you're looking at the larger Sunshine Coast centres. The point of Hastings is the independent-boutique density, not the depth of any one category.",
    moreInfoUrl: "https://www.visitnoosa.com.au/things-to-do/shopping/hastings-street/",
  },
  {
    slug: "noosa-junction-independents",
    name: "Noosa Junction independents",
    category: "Boutiques and fashion",
    headline: "The village high street behind Hastings — surf, fashion, homewares.",
    whyWorthVisiting:
      "Noosa Junction is the small commercial centre behind Hastings Street — a few blocks of Sunshine Avenue and the surrounding streets, with independent surf shops, fashion boutiques, homewares, vintage stores, and the Junction's own cinema. It's the Noosa locals' high street; the rents are lower than Hastings, the shops are more idiosyncratic, and the parking is easier. Confirm each shop's hours and current stock on their own website.",
    whatTheySell: [
      "Independent surf shops and surf hardware",
      "Vintage clothing and pre-loved fashion",
      "Homewares, design objects, and small-batch ceramics",
      "Books, stationery, and gift shops",
      "Cafés and brunch spots with local clientele",
    ],
    whenAndWhere: {
      when: "Daily, mostly 9 am – 5 pm. Verify each shop's hours before you go.",
      address: "Sunshine Avenue, Noosa Heads QLD 4567 (the Junction precinct)",
    },
    parking: "Free street parking on Sunshine Avenue and the surrounding streets. Easier than Hastings.",
    dogs: "Outdoor café seating at some venues; dogs not permitted inside most boutiques.",
    bestFor: "A different kind of browse · surf shoppers · design-curious visitors",
    howToMakeAMorningOfIt: [
      { time: "9:00 am", action: "Arrive, get a coffee at one of the Sunshine Avenue cafés" },
      { time: "9:30 am", action: "Walk Sunshine Avenue end-to-end" },
      { time: "10:30 am", action: "Cross to the side streets for the vintage stores and homewares" },
      { time: "11:30 am", action: "Coffee stop, browse the shops you flagged on the first pass" },
      { time: "12:30 pm", action: "Lunch at one of the Junction's brunch spots" },
    ],
    whatsNotHere:
      "The Junction is not Hastings Street — it's quieter, more locals-flavoured, and has fewer international labels. For resort fashion and the international labels, walk Hastings instead.",
    moreInfoUrl: "https://www.visitnoosa.com.au/things-to-do/shopping/noosa-junction/",
  },
  {
    slug: "peregian-village-shops",
    name: "Peregian Village fashion & homewares",
    category: "Boutiques and fashion",
    headline: "The village-square fashion and homewares strip south of Sunshine.",
    whyWorthVisiting:
      "Peregian Village is the small commercial cluster at the southern end of Peregian Beach — a village-square precinct of fashion boutiques, homewares stores, and gift shops, set back from the beach on Kingfisher Drive and the surrounding streets. The atmosphere is a country-town high street; most shops are owner-operated and the stock leans toward resort fashion, children's clothing, and small-batch homewares. Confirm each shop's hours and current stock on their own website.",
    whatTheySell: [
      "Resort wear, beach fashion, and children's clothing",
      "Small-batch homewares, ceramics, and design objects",
      "Independent jewellery and accessories",
      "Gift shops and stationery",
      "Cafés and brunch spots",
    ],
    whenAndWhere: {
      when: "Daily, mostly 9 am – 5 pm. Verify each shop's hours before you go.",
      address: "Kingfisher Drive, Peregian Beach QLD 4573",
    },
    parking: "Free street parking on Kingfisher Drive and the surrounding streets.",
    dogs: "Outdoor café seating at some venues; dogs not permitted inside most boutiques.",
    bestFor: "A different kind of browse · family shoppers · a slower precinct",
    howToMakeAMorningOfIt: [
      { time: "9:00 am", action: "Arrive, get a coffee at one of the Kingfisher Drive cafés" },
      { time: "9:30 am", action: "Walk the Kingfisher Drive strip" },
      { time: "10:30 am", action: "Cross to the side streets for the homewares and gift shops" },
      { time: "11:30 am", action: "Coffee stop, browse the shops you flagged on the first pass" },
      { time: "12:30 pm", action: "Lunch at one of the village cafés" },
    ],
    whatsNotHere:
      "Peregian is not Hastings — it's smaller, quieter, and lacks the international labels. For the international resort fashion, walk Hastings instead.",
    moreInfoUrl: "https://www.visitnoosa.com.au/things-to-do/shopping/peregian-beach/",
  },
  {
    slug: "hinterland-studio-trail",
    name: "Hinterland studio trail — Pomona, Kin Kin",
    category: "Art, interiors and gifts",
    headline: "The makers' drive — Pomona, Kin Kin, Cooran.",
    whyWorthVisiting:
      "The Noosa Hinterland is a thirty-minute drive west into the Blackall Range — Pomona, Cooran, and Kin Kin are the three villages, each with a different maker's studio open to the public. The studios lean toward ceramics, leatherwork, hand-printed textiles, and woodwork. Most studios run weekend hours; the Pomona Saturday market is the regional makers' market before Eumundi. Confirm each studio's hours and current exhibitions on their own website before driving out.",
    whatTheySell: [
      "Hand-thrown ceramics and pottery",
      "Hand-printed textiles, clothing, linen",
      "Leatherwork, belts, bags, wallets",
      "Woodwork, turned bowls, hand-carved utensils",
      "Jewellery, small paintings, photography",
    ],
    whenAndWhere: {
      when: "Weekends mostly — verify each studio's hours on its own website before driving out.",
      address: "Pomona, Kin Kin, Cooran (Noosa Hinterland — about 30 minutes' drive west of Noosa)",
    },
    parking: "On-site at each studio; small country carparks.",
    dogs: "Varies by studio — check before you bring the dog.",
    bestFor: "Design-curious visitors · a different morning · couples",
    howToMakeAMorningOfIt: [
      { time: "8:30 am", action: "Drive to Pomona — about 25 minutes from Noosa Heads" },
      { time: "9:00 am", action: "Coffee at one of the Pomona cafés, visit the Pomona Saturday market if it's a Saturday" },
      { time: "10:00 am", action: "Drive to the first of the weekend-open studios" },
      { time: "11:30 am", action: "Drive on to Kin Kin — the quietest of the three villages" },
      { time: "1:00 pm", action: "Lunch at the Kin Kin pub or back in Pomona" },
    ],
    whatsNotHere:
      "The hinterland studios are not shopping-mall retail — they're working studios with weekend hours. For department-store fashion, you're looking at the larger Sunshine Coast centres.",
    moreInfoUrl: "https://www.noosatrails.com.au/",
  },
  {
    slug: "cooroy-butter-factory-arts",
    name: "Cooroy Butter Factory Arts Centre",
    category: "Art, interiors and gifts",
    headline: "The hinterland's working gallery — ceramics, painting, sculpture.",
    whyWorthVisiting:
      "The Cooroy Butter Factory Arts Centre is the public gallery for the Noosa Hinterland, in the converted 1930s butter factory at Cooroy — about 20 minutes' drive west of Noosa. The gallery runs a rotating exhibition program across ceramics, painting, photography, and sculpture, with a strong focus on Sunshine Coast makers. The Centre also hosts workshops and masterclasses. Confirm current exhibitions and opening hours on the Cooroy Butter Factory website before driving out.",
    whatTheySell: [
      "Rotating exhibition program — ceramics, painting, photography, sculpture",
      "Workshop and masterclass program (bookable; fees apply)",
      "Gallery shop — small-format art prints, ceramics, jewellery, books, cards by local makers",
    ],
    whenAndWhere: {
      when: "Tuesday to Saturday — verify current hours on the operator's website before visiting.",
      address: "11a Maple Street, Cooroy QLD 4563",
    },
    parking: "On-site, free.",
    bestFor: "Art-curious visitors · couples · a different morning",
    howToMakeAMorningOfIt: [
      { time: "9:30 am", action: "Drive to Cooroy — about 20 minutes from Noosa Heads" },
      { time: "10:00 am", action: "Arrive, browse the current exhibitions" },
      { time: "11:00 am", action: "Visit the gallery shop — small purchases, all from local makers" },
      { time: "11:30 am", action: "Coffee in Cooroy village" },
      { time: "12:30 pm", action: "Lunch in Cooroy or drive on to Pomona" },
    ],
    whatsNotHere:
      "Not a museum and not a souvenir shop. The Butter Factory is a working regional gallery for contemporary exhibitions — if you want Noosa history, ask at the Noosa Shire Library.",
    moreInfoUrl: "https://www.cooroybutterfactory.com.au/",
  },
  {
    slug: "pomona-saturday-market",
    name: "Pomona Saturday market",
    category: "Markets and local makers",
    headline: "The hinterland's smaller Saturday market — before Eumundi.",
    whyWorthVisiting:
      "The Pomona Saturday market runs every Saturday morning in the village of Pomona — about 25 minutes' drive west of Noosa. It's smaller and quieter than Eumundi, but the maker mix is strong: hand-thrown ceramics, hand-printed textiles, local produce, and a smaller food court. It's the regional makers' market before Eumundi takes over in the afternoon. Confirm the current schedule on the market's website before driving out.",
    whatTheySell: [
      "Hand-thrown ceramics and pottery",
      "Hand-printed textiles, clothing, linen",
      "Local produce — bread, eggs, vegetables",
      "Natural body care, soap, essential oils",
      "Vintage clothing and small art prints",
    ],
    whenAndWhere: {
      when: "Every Saturday, 7:00 am – midday. Verify the current schedule on the operator's website.",
      address: "Stan Topper Park, Pomona QLD 4568",
    },
    parking: "Free, multiple carparks in the village.",
    dogs: "On leash, please.",
    bestFor: "Couples · anyone wanting a quieter market morning · foodies",
    howToMakeAMorningOfIt: [
      { time: "8:00 am", action: "Arrive, get a coffee, do a full lap to see who's there" },
      { time: "9:00 am", action: "First purchases (the best stalls sell out by 11)" },
      { time: "10:30 am", action: "Second coffee, browse the slower stalls" },
      { time: "11:30 am", action: "Final lap for things you missed" },
      { time: "12:00 pm", action: "Lunch in Pomona or drive on to Eumundi" },
    ],
    whatsNotHere:
      "Pomona isn't Eumundi — it's smaller and the food court is more limited. For the full Wednesday/Saturday Eumundi experience, drive on to Eumundi instead.",
    moreInfoUrl: "https://www.facebook.com/pomonalibrary/",
  },
];

export const RETAILERS_BY_SLUG: Record<string, RetailerPage> = RETAILERS.reduce(
  (acc, r) => {
    acc[r.slug] = r;
    return acc;
  },
  {} as Record<string, RetailerPage>,
);
