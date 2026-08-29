import type { Metadata } from "next";
import Link from "next/link";

/**
 * /photo-credits — full attribution table for every image used on
 * MyNoosaHeads.
 *
 * MSN-2987 chairman mandate 2026-08-29: NC photos = REMOVE.
 * This page only lists commercial-use images (CC BY, CC BY-SA, CC0,
 * PDM, Unsplash License). NC entries have been removed.
 *
 * Hero images are self-hosted as WebP + AVIF variants in
 * /public/photos/. Inline / card images are hot-linked to
 * live.staticflickr.com or images.unsplash.com — both hosts are in
 * next.config.mjs `remotePatterns`.
 *
 * The table below mirrors the photo set in `src/data/photos.ts`. If
 * you add or change a photo there, mirror it here.
 */

export const metadata: Metadata = {
  title: "Photo credits",
  description:
    "Attribution for every photograph used on MyNoosaHeads. All images are from Flickr (Openverse) under commercial-use Creative Commons licences, or from Unsplash CDN under the Unsplash licence.",
  alternates: { canonical: "/photo-credits" },
  openGraph: {
    title: "Photo credits · MyNoosaHeads",
    description: "Attribution for every photograph used on MyNoosaHeads.",
    url: "/photo-credits",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Photo credits · MyNoosaHeads",
    description: "Attribution for every photograph used on MyNoosaHeads.",
  },
};

type CreditRow = {
  caption: string;
  author: string;
  licence: string;
  sourcePage: string;
};

const CREDITS: CreditRow[] = [
  // ─── Heroes (MSN-2987 — NC photos REPLACED with Unsplash commercial-OK) ──
  {
    caption: "Coastal road at golden hour — replacement homepage hero (replaced NC).",
    author: "Unsplash — Jakob Owens",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a",
  },
  {
    caption: "Granite Bay, Noosa National Park — /noosa-national-park hero.",
    author: "Flickr (Openverse) — 'Noosa National Park Granite Bay' (Crazzolara)",
    licence: "CC BY",
    sourcePage: "https://live.staticflickr.com/7915/46346554164_176a80477f_b.jpg",
  },
  {
    caption: "Boutique-accommodation strip — replacement /accommodation hero (replaced NC).",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1505142468610-359e7d316be0",
  },
  {
    caption: "Calm water, ferry boats, gum trees — replacement /things-to-do hero (replaced NC).",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
  },
  {
    caption: "Sky and sea at golden hour — replacement /surf-and-weather hero (replaced NC-ND).",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
  },
  {
    caption: "Eumundi Markets — replacement /shopping hero (replaced NC).",
    author: "eGuide Travel — Flickr",
    licence: "CC BY 2.0",
    sourcePage: "https://live.staticflickr.com/2398/2189844448_ecff21b6d5_b.jpg",
  },
  {
    caption: "Outdoor dining — replacement /eat-and-drink hero (replaced NC).",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
  },
  {
    caption: "Morning on the Noosa River — /fishing-reports hero.",
    author: "Flickr (Openverse) — 'Morning on the Noosa River'",
    licence: "CC0",
    sourcePage: "https://live.staticflickr.com/65535/9572462197_6879fe750b_b.jpg",
  },
  {
    caption: "Kayaks on a calm river reach — replacement /boats-and-watercraft hero (replaced Brisbane River NC).",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1463693396721-8ca0cff5b9ec",
  },
  {
    caption: "A quiet coastal road — /travel-and-transport hero.",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a",
  },
  {
    caption: "A long coastal view — /webcams hero.",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
  },
  {
    caption: "Wide sand beach at golden hour — /beaches-and-nature hero.",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },

  // ─── Area heroes (4 distinct, commercial-OK) ────────────────────
  {
    caption: "Hastings Street atmosphere — /areas/hastings-street hero.",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
  },
  {
    caption: "Noosa River at Noosaville — /areas/noosaville hero.",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
  },
  {
    caption: "Sunshine Beach — /areas/sunshine-beach hero.",
    author: "Flickr (Openverse) — 'Sunshine Beach, Noosa'",
    licence: "CC BY",
    sourcePage: "https://live.staticflickr.com/1408/705933988_e7ab226bb2.jpg",
  },
  {
    caption: "Peregian Beach atmosphere — /areas/peregian-beach hero.",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },

  // ─── Things-to-do cards (10 cards; NC replacements) ─────────────
  {
    caption: "Granite Bay, Noosa National Park — Walk the headland card.",
    author: "Flickr (Openverse) — 'Noosa National Park Granite Bay'",
    licence: "CC BY",
    sourcePage: "https://live.staticflickr.com/7915/46346554164_176a80477f_b.jpg",
  },
  {
    caption: "Morning on the Noosa River — River day card.",
    author: "Flickr (Openverse) — 'Morning on the Noosa River'",
    licence: "CC0",
    sourcePage: "https://live.staticflickr.com/65535/9572462197_6879fe750b_b.jpg",
  },
  {
    caption: "Surfer paddling out at Noosa Main Beach at dawn — Learn to surf card.",
    author: "Flickr (Openverse) — 'Me surfing in Noosa'",
    licence: "CC BY",
    sourcePage: "https://live.staticflickr.com/3545/3488069272_d764c72594_b.jpg",
  },
  {
    caption: "Wide sand beach at golden hour — Find the perfect beach card (replaced NC).",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    caption: "Outdoor dining atmosphere — Eat along Hastings card (replaced NC).",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
  },
  {
    caption: "Wide, family-friendly sand beach — Noosa with children card (replaced NC).",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    caption: "Noosa Everglades — upper-river fishing water — Hinterland card.",
    author: "Flickr (Openverse)",
    licence: "CC0",
    sourcePage: "https://live.staticflickr.com/3696/12046547304_e4e4449777_b.jpg",
  },
  {
    caption: "Fairy Pool — coastal rock pools on the Noosa shoreline — Fairy Pools card.",
    author: "Flickr (Openverse) — 'Noosa National Park Fairy Pool'",
    licence: "CC BY",
    sourcePage: "https://live.staticflickr.com/7902/46389696594_be050f6b5a_b.jpg",
  },
  {
    caption: "Farmers' market stalls — Wander the farmers market card (replaced NC).",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1488459716781-31db52582fe2",
  },
  {
    caption: "Long coastal view at midday — Plan your first day card.",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  },

  // ─── Eat & Drink — 6 venues (3 NEW) ─────────────────────────────
  {
    caption: "Aroma Hastings atmosphere — /eat-and-drink/aroma-noosa card (replaced NC).",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
  },
  {
    caption: "Fine-dining presentation — /eat-and-drink/season-noosa card.",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  },
  {
    caption: "River-edge dining — /eat-and-drink/noosa-boathouse card.",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
  },
  {
    caption: "Counter-side brunch prep — /eat-and-drink/sante-noosa card.",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24",
  },
  {
    caption: "Village-square beer garden — /eat-and-drink/peregian-beach-hotel card (replaced Sunshine mismatch).",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1543007630-9710e4a00a20",
  },

  // ─── Shopping — 9 retailers (3 existing + 6 NEW) ────────────────
  {
    caption: "Farmers' market stalls — Noosa Farmers Market card (replaced NC).",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1488459716781-31db52582fe2",
  },
  {
    caption: "Eumundi Markets — The Original Eumundi Markets card.",
    author: "eGuide Travel — Flickr",
    licence: "CC BY 2.0",
    sourcePage: "https://live.staticflickr.com/2398/2189844448_ecff21b6d5_b.jpg",
  },
  {
    caption: "Noosa Regional Gallery interior (replaced NC).",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1518998053901-5348d3961a04",
  },
  {
    caption: "Boutique shop window display — Hastings Street boutiques card.",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
  },
  {
    caption: "Suburban shopping strip — Noosa Junction independents card.",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1481437156560-3205f6a55735",
  },
  {
    caption: "Fashion retail — Peregian Village fashion + homewares card.",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
  },
  {
    caption: "Pottery / studio workshop — Hinterland studio trail card.",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
  },
  {
    caption: "Gallery interior — Cooroy Butter Factory Arts Centre card.",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1518998053901-5348d3961a04",
  },
  {
    caption: "Farmers' market stall — Local makers Pomona Saturday market card.",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1488459716781-31db52582fe2",
  },

  // ─── Inline photos (Flickr Openverse + Unsplash CDN) ──────────────
  {
    caption: "Generic ocean wave — surf tile on /surf-and-weather.",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    caption: "Generic sky / wind scene — wind tile on /surf-and-weather.",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
  },
  {
    caption: "Tea Tree Cove — first sheltered beach south of the headland.",
    author: "Flickr (Openverse) — 'Tea Tree Cove, Noosa National Park'",
    licence: "CC BY-SA",
    sourcePage: "https://live.staticflickr.com/2420/2153303691_b1d994393b_b.jpg",
  },
  {
    caption: "Sunshine Beach, Noosa.",
    author: "Flickr (Openverse) — 'Sunshine Beach, Noosa'",
    licence: "CC BY",
    sourcePage: "https://live.staticflickr.com/1408/705933988_e7ab226bb2.jpg",
  },
  {
    caption: "Netanya — Hastings Street apartments.",
    author: "Flickr (Openverse)",
    licence: "CC BY",
    sourcePage: "https://live.staticflickr.com/6231/6224415039_628e2eb0a1_b.jpg",
  },
  {
    caption: "Noosa River and Gympie Terrace, Noosaville (c. 1940) — historical context.",
    author: "Flickr (Openverse) — Public Domain Mark",
    licence: "PDM",
    sourcePage: "https://live.staticflickr.com/65535/54849508625_d3595b783b_b.jpg",
  },
  {
    caption: "Stand-up paddleboard — hire-craft on the river.",
    author: "Flickr (Openverse)",
    licence: "CC BY",
    sourcePage: "https://live.staticflickr.com/7101/13941478461_d01edfaa11_b.jpg",
  },
  {
    caption: "Noosa River and Gympie Terrace, Noosaville (c. 1940) — historical context card.",
    author: "Flickr (Openverse) — Public Domain Mark",
    licence: "PDM",
    sourcePage: "https://live.staticflickr.com/65535/54849508625_d3595b783b_b.jpg",
  },
  {
    caption: "Coastal road approach — homepage tile reference.",
    author: "Unsplash CDN",
    licence: "Unsplash License",
    sourcePage: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a",
  },
  {
    caption: "Noosa NP Granite Bay — homepage tile reference.",
    author: "Flickr (Openverse) — 'Noosa National Park Granite Bay'",
    licence: "CC BY",
    sourcePage: "https://live.staticflickr.com/7915/46346554164_176a80477f_b.jpg",
  },
];

export default function PhotoCreditsPage() {
  return (
    <div className="bg-paper-50">
      <section
        className="border-b border-paper-200 bg-paper-50"
        aria-labelledby="credits-title"
      >
        <div className="container-narrow py-12 md:py-16">
          <p className="eyebrow">Attribution</p>
          <h1
            id="credits-title"
            className="mt-3 font-display text-display-xl md:text-display-xl text-ink-900 text-balance"
          >
            Photo credits
          </h1>
          <p className="mt-5 lead max-w-3xl text-pretty">
            Every photograph on MyNoosaHeads is sourced from Flickr
            (via the Openverse aggregator) under a commercial-use
            Creative Commons licence (CC BY, CC BY-SA, CC0, Public
            Domain Mark), or from the Unsplash CDN under the Unsplash
            licence (free for commercial use, attribution appreciated
            but not required). Per chairman mandate 2026-08-29, every
            NonCommercial (NC) variant has been removed from the
            site and is not listed here.
          </p>
        </div>
      </section>

      {/* Attribution table. */}
      <section className="container-narrow py-12 md:py-16">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-body-sm">
            <thead>
              <tr className="border-b-2 border-paper-300">
                <th scope="col" className="py-3 pr-4 font-display text-headline-md text-ink-900">
                  Image
                </th>
                <th scope="col" className="py-3 pr-4 font-display text-headline-md text-ink-900">
                  Author
                </th>
                <th scope="col" className="py-3 pr-4 font-display text-headline-md text-ink-900">
                  Licence
                </th>
                <th scope="col" className="py-3 font-display text-headline-md text-ink-900">
                  Source
                </th>
              </tr>
            </thead>
            <tbody>
              {CREDITS.map((row, i) => (
                <tr
                  key={`${row.sourcePage}-${i}`}
                  className="border-b border-paper-200 align-top"
                >
                  <td className="py-4 pr-4 text-ink-800 text-pretty max-w-md">
                    {row.caption}
                  </td>
                  <td className="py-4 pr-4 text-ink-700 whitespace-nowrap">
                    {row.author}
                  </td>
                  <td className="py-4 pr-4 text-ink-700 whitespace-nowrap">
                    {row.licence}
                  </td>
                  <td className="py-4 text-ink-700">
                    <a
                      href={row.sourcePage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link text-ocean-700 break-all"
                    >
                      Source ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-10 text-caption text-ink-600 max-w-3xl">
          Commercial-use licence links:{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="link text-ocean-700"
          >
            CC BY 4.0
          </a>
          {" · "}
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="link text-ocean-700"
          >
            CC BY-SA 4.0
          </a>
          {" · "}
          Unsplash CDN images are under the{" "}
          <a
            href="https://unsplash.com/license"
            target="_blank"
            rel="noopener noreferrer"
            className="link text-ocean-700"
          >
            Unsplash Licence
          </a>
          .
        </p>

        <p className="mt-6 text-body-sm text-ink-700 max-w-3xl">
          See also the{" "}
          <Link href="/terms" className="link text-ocean-700">
            terms of use
          </Link>{" "}
          for reuse guidance, or{" "}
          <Link href="/contact" className="link text-ocean-700">
            report an attribution error
          </Link>
          .
        </p>
      </section>
    </div>
  );
}