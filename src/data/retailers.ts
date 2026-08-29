/**
 * Retailer data — MSN-2975 V2 build.
 *
 * Three anchor retailers from Albert's D3 brief, given full
 * standalone atmospheric pages at /shop/[slug].
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
 *   - moreInfoUrl (official site — NOT tourismnoosa; use visitnoosa.com.au)
 *
 * Critical correction applied: Noosa Farmers Market day is
 * SUNDAY (verified at noosafarmersmarket.com.au). The V1 page
 * and /things-to-do copy said Saturday — V2 fixes both.
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
    slug: "noosa-junction",
    name: "Noosa Junction Plaza",
    category: "Hastings Street and the strip",
    headline: "The local centre, just up the hill from Hastings.",
    whyWorthVisiting:
      "Noosa Junction sits 800 metres back from Hastings Street — a real local centre, not a tourist strip. There's a Coles and a Woolworths for ice and sunscreen, a couple of decent bottle shops, a half-decent bookshop, and the cheapest coffee in the postcode. The Junction is where Noosa people actually shop. Visit for the practical — ice, milk, beach supplies — not for the postcard.",
    whatTheySell: [
      "Coles and Woolworths for groceries, ice, sunscreen, beach supplies",
      "Bottle shops with a serious Australian wine selection",
      "Noosa's best independent bookshop",
      "Chemist, post office, newsagent",
      "Casual lunch options — sushi, banh mi, pub counter meals",
    ],
    whenAndWhere: {
      when: "Daily, 7:00 am – 9:00 pm. Most shops open 9:00 am.",
      address: "Sunshine Beach Road & Noosa Drive, Noosa Heads QLD 4567",
    },
    parking: "Free three-hour parking in the Coles carpark, accessed off Sunshine Beach Road.",
    bestFor: "Practical errands · stocking up for self-caterers · the local Noosa",
    howToMakeAMorningOfIt: [
      { time: "8:30 am", action: "Coffee at the Junction — cheaper than Hastings, just as good" },
      { time: "9:30 am", action: "Coles run for ice, sunscreen, breakfast supplies" },
      { time: "10:30 am", action: "Bookshop browse" },
      { time: "11:30 am", action: "Lunch — banh mi, sushi, or pub counter meal" },
      { time: "12:30 pm", action: "Drive back to Hastings or the beach" },
    ],
    whatsNotHere:
      "Not a tourist strip — for that, stay on Hastings Street. The Junction is the practical centre, and the prices are honest.",
    moreInfoUrl: "https://www.noosajunction.com.au/",
  },
  {
    slug: "hastings-street-boutiques",
    name: "Hastings Street Boutiques",
    category: "Hastings Street and the strip",
    headline: "Eight hundred metres of designer beach-and-evening.",
    whyWorthVisiting:
      "Hastings Street runs 800 metres between Main Beach and the headland, and along the way you'll find the Noosa cluster of designer boutiques — beachwear, evening, homewares, jewellery, and a few Australian designers you won't see at the larger chains. The strip is small enough to walk end-to-end in 30 minutes; the prices are higher than the Junction, the curation is tighter, and the staff actually know the makers behind the labels.",
    whatTheySell: [
      "Australian designer beachwear — cover-ups, swim, linen",
      "Evening wear for the Hastings restaurants",
      "Hand-cut Australian jewellery",
      "Homewares and small-batch ceramics",
      "Sun hats, leather sandals, weekend bags",
      "Children's beachwear and toys",
    ],
    whenAndWhere: {
      when: "Daily, 9:00 am – 6:00 pm. Most shops open by 10:00 am. Verify hours before visiting.",
      address: "Hastings Street, Noosa Heads QLD 4567",
    },
    parking: "Paid parking at the Noosa Heads SLSC carpark (Park Road) and at metered street bays along Hastings. Tight in summer.",
    bestFor: "Slow shopping · couples · a present for the people back home",
    howToMakeAMorningOfIt: [
      { time: "10:00 am", action: "Walk-up from Main Beach, coffee first" },
      { time: "10:30 am", action: "Browse the southern boutiques — beachwear and accessories" },
      { time: "11:30 am", action: "Walk north — jewellery and homewares" },
      { time: "12:30 pm", action: "Lunch on the strip — pick a restaurant, walk in" },
      { time: "2:00 pm", action: "Coffee, then the few shops you missed" },
    ],
    whatsNotHere:
      "Not the place for groceries or souvenirs. For groceries, go to Noosa Junction. For souvenirs, go to Eumundi on a Wednesday or Saturday.",
    moreInfoUrl: "https://www.visitnoosa.com.au/",
  },
  {
    slug: "peregian-village-shops",
    name: "Peregian Village Shops",
    category: "Villages and beachside",
    headline: "A village-square cluster with a coffee-and-browse pace.",
    whyWorthVisiting:
      "The Peregian village cluster sits one block back from the beach — a quieter version of Hastings Street with a handful of boutiques, a couple of good cafés, the Peregian Beach Hotel, and the patrolled beach at the end of the street. The pace is what you're paying for: most of the Noosa action is fifteen minutes' drive north, and Peregian has stayed small.",
    whatTheySell: [
      "Boutique beachwear and accessories",
      "Hand-made candles, soaps, and small-batch body care",
      "Children's toys and books",
      "Peregian Beach Hotel bottle shop",
      "Cafés and casual lunch options on the village square",
    ],
    whenAndWhere: {
      when: "Daily, 7:30 am – 5:00 pm. Most shops open by 9:00 am.",
      address: "Kingfisher Drive, Peregian Beach QLD 4573",
    },
    parking: "Free street parking on Kingfisher Drive.",
    bestFor: "Slow shopping · dog-friendly morning · visitors staying in Peregian",
    howToMakeAMorningOfIt: [
      { time: "8:30 am", action: "Coffee at one of the village cafés" },
      { time: "9:30 am", action: "Browse the boutique cluster on the village square" },
      { time: "10:30 am", action: "Walk to the patrolled beach for a swim" },
      { time: "11:30 am", action: "Back to the village — counter meal at the Peregian Beach Hotel" },
      { time: "12:30 pm", action: "Last browse, drive back north or to the beach" },
    ],
    whatsNotHere:
      "Not Hastings Street. Peregian's retail cluster is small (less than twenty shops); if you want the volume of Hastings, drive fifteen minutes north.",
    moreInfoUrl: "https://www.peregianbeachhotel.com.au/",
  },
  {
    slug: "sunshine-beach-village",
    name: "Sunshine Beach Village",
    category: "Villages and beachside",
    headline: "Duke Street, the surf club, and one coffee shop that knows your order.",
    whyWorthVisiting:
      "Sunshine Beach's village cluster runs along Duke Street — a couple of cafés, a takeaway, a small bottle shop, and the surf club at the beach end. It's the smallest of the four precincts and the most local. The pace is slower than Hastings and the prices are a notch down. Worth a morning if you're staying in Sunshine, otherwise a stop on the way to or from Peregian.",
    whatTheySell: [
      "Duke Street cafés — coffee, breakfast, lunch counter",
      "Takeaway fish-and-chip shop",
      "Surf shop — boards, wax, rashies",
      "Bottle shop with a decent local-wine selection",
      "Yoga studio and a small wellness clinic",
    ],
    whenAndWhere: {
      when: "Daily, 7:00 am – 7:00 pm. Most shops open by 8:00 am.",
      address: "Duke Street, Sunshine Beach QLD 4567",
    },
    parking: "Free street parking on Duke Street.",
    bestFor: "Slow coffee · surf hire · visitors staying in Sunshine",
    howToMakeAMorningOfIt: [
      { time: "7:30 am", action: "Coffee at one of the Duke Street cafés" },
      { time: "8:30 am", action: "Walk the patrolled beach" },
      { time: "10:00 am", action: "Surf hire at the local shop if you want a board" },
      { time: "11:30 am", action: "Lunch at the surf club balcony or a Duke Street café" },
      { time: "12:30 pm", action: "Drive north to Hastings, or south to Peregian" },
    ],
    whatsNotHere:
      "Sunshine's cluster is intentionally small — three cafés and a takeaway. If you want the volume of Hastings, drive north.",
    moreInfoUrl: "https://www.sunshinebeachslsc.com.au/",
  },
  {
    slug: "tewantin-antiques",
    name: "Tewantin Antiques & Collectables Trail",
    category: "Art, interiors and gifts",
    headline: "Half a dozen antique shops, all within walking distance.",
    whyWorthVisiting:
      "Tewantin — the town on the Noosa River, ten minutes' drive west of Hastings Street — has a small antiques trail of half a dozen shops within walking distance of the main street. The pickings range from genuine 1920s Australian furniture to mid-century ceramics, vintage surfboards, and the occasional piece of Sunshine Coast memorabilia. It's not a treasure-hunt on every visit, but it's worth a morning if you're in Tewantin for the Noosa Marina or the Noosa Ferry.",
    whatTheySell: [
      "Australian 1920s–1950s furniture (mostly teak and blackwood)",
      "Mid-century ceramics — kitchenalia, vases, serving ware",
      "Vintage surfboards (1960s longboards occasionally)",
      "Sunshine Coast memorabilia — postcards, signage, photographs",
      "Books, maps, prints of the region from the last century",
    ],
    whenAndWhere: {
      when: "Friday to Sunday, 10:00 am – 4:00 pm. Verify individual shop hours before visiting.",
      address: "Poinciana Avenue & surrounds, Tewantin QLD 4565",
    },
    parking: "Free street parking on Poinciana Avenue.",
    bestFor: "Antiques hunters · interior designers · slow browsers",
    howToMakeAMorningOfIt: [
      { time: "10:00 am", action: "Coffee at one of the Tewantin cafés on Poinciana Avenue" },
      { time: "10:30 am", action: "First shop — start at the southern end of the trail" },
      { time: "12:30 pm", action: "Lunch at the Noosa Marina, a five-minute drive south" },
      { time: "2:00 pm", action: "Drive back to Hastings or the beach" },
    ],
    whatsNotHere:
      "Not a busy retail cluster. Tewantin's antiques trail is a small weekend scene — if you want volume, drive to Eumundi (Wednesday/Saturday) instead.",
    moreInfoUrl: "https://www.visitnoosa.com.au/",
  },
];

export const RETAILERS_BY_SLUG: Record<string, RetailerPage> = RETAILERS.reduce(
  (acc, r) => {
    acc[r.slug] = r;
    return acc;
  },
  {} as Record<string, RetailerPage>,
);
