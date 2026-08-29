import type { Metadata } from "next";
import Link from "next/link";

/**
 * /photo-credits — full attribution table for every image used on
 * MyNoosaHeads (MSN-2980).
 *
 * MSN-2980 chairman mandate 2026-08-29: Wikimedia Commons is forbidden.
 * Every image on the site now comes from Flickr (Openverse) under a
 * Creative Commons licence, or from Unsplash CDN under the Unsplash
 * licence (CC0). All hero images are self-hosted as WebP + AVIF
 * variants in /public/photos/. Inline / card images are hot-linked to
 * live.staticflickr.com or images.unsplash.com — both hosts are in
 * next.config.mjs `remotePatterns`.
 *
 * The table below mirrors the photo set in `src/data/photos.ts`. If
 * you add or change a photo there, mirror it here.
 */

export const metadata: Metadata = {
  title: "Photo credits",
  description:
    "Attribution for every photograph used on MyNoosaHeads. All images are from Flickr (Openverse) under Creative Commons licences, or from Unsplash CDN under the Unsplash licence.",
  alternates: { canonical: "/photo-credits" },
  openGraph: {
    title: "Photo credits · MyNoosaHeads",
    description:
      "Attribution for every photograph used on MyNoosaHeads.",
    url: "/photo-credits",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Photo credits · MyNoosaHeads",
    description:
      "Attribution for every photograph used on MyNoosaHeads.",
  },
};

type CreditRow = {
  caption: string;
  author: string;
  licence: string;
  sourcePage: string;
};

const CREDITS: CreditRow[] = [
  // ─── Heroes (self-hosted) ─────────────────────────────────────────
  {
    caption: "Noosa Main Beach silhouette — homepage hero.",
    author: "Flickr (Openverse) — 'Noosa Main Beach Silhouette'",
    licence: "CC BY",
    sourcePage: "https://live.staticflickr.com/3664/3487547682_52b62b9b03_b.jpg",
  },
  {
    caption: "Surfer riding a Noosa wave — /surf-and-weather hero.",
    author: "Flickr (Openverse) — 'I roar for my supper'",
    licence: "CC BY-NC",
    sourcePage: "https://live.staticflickr.com/8029/8052945119_e3f2edce31_b.jpg",
  },
  {
    caption: "Noosa National Park Granite Bay — /noosa-national-park hero (no dogs, no buildings).",
    author: "Flickr (Openverse) — 'Noosa National Park Granite Bay'",
    licence: "CC BY",
    sourcePage: "https://live.staticflickr.com/7915/46346554164_176a80477f_b.jpg",
  },
  {
    caption: "South Pacific Resort, Noosa — /accommodation hero.",
    author: "Flickr (Openverse) — 'South Pacific Resort, Noosa'",
    licence: "CC BY-NC",
    sourcePage: "https://live.staticflickr.com/2090/2447049260_2a8189d4d6_b.jpg",
  },
  {
    caption: "The Noosa River at Noosaville — /things-to-do hero.",
    author: "Flickr (Openverse) — 'Shiny afternoon'",
    licence: "CC BY-NC-SA",
    sourcePage: "https://live.staticflickr.com/8330/8146977124_491b4d5696.jpg",
  },
  {
    caption: "Morning on the Noosa River — /fishing-reports hero.",
    author: "Flickr (Openverse) — 'Morning on the Noosa River'",
    licence: "CC0",
    sourcePage: "https://live.staticflickr.com/65535/9572462197_6879fe750b_b.jpg",
  },
  {
    caption: "Kayaks on a calm river reach — /boats-and-watercraft hero.",
    author: "Flickr (Openverse) — 'Brisbane River kayaks'",
    licence: "CC BY-NC-SA",
    sourcePage: "https://live.staticflickr.com/2114/2203239982_0f8f4f3d74_b.jpg",
  },
  {
    caption: "A quiet coastal road — /travel-and-transport hero.",
    author: "Unsplash CDN",
    licence: "CC0 (Unsplash)",
    sourcePage: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a",
  },
  {
    caption: "A long coastal view — /webcams hero.",
    author: "Unsplash CDN",
    licence: "CC0 (Unsplash)",
    sourcePage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
  },

  // ─── Homepage tiles ───────────────────────────────────────────────
  {
    caption: "Noosa Main Beach / Hastings Street looking west — homepage Where-to-stay tile.",
    author: "Flickr (Openverse) — 'Noosa Main Beach / Hastings Street looking west'",
    licence: "CC BY-NC-SA",
    sourcePage: "https://live.staticflickr.com/8240/8531818425_4f7d65d9e6.jpg",
  },
  {
    caption: "The Noosa River at Noosaville — homepage Things-to-do tile.",
    author: "Flickr (Openverse) — 'Shiny afternoon'",
    licence: "CC BY-NC-SA",
    sourcePage: "https://live.staticflickr.com/8330/8146977124_491b4d5696.jpg",
  },
  {
    caption: "Noosa headland — homepage Beaches-and-nature tile.",
    author: "Flickr (Openverse) — 'Noosa National Park Granite Bay'",
    licence: "CC BY",
    sourcePage: "https://live.staticflickr.com/7915/46346554164_176a80477f_b.jpg",
  },
  {
    caption: "People watching at Aroma, Hastings Street — homepage Eat-and-drink tile.",
    author: "Flickr (Openverse) — 'People watching at Aroma'",
    licence: "CC BY-NC",
    sourcePage: "https://live.staticflickr.com/615/31910895645_d321ec9068_b.jpg",
  },
  {
    caption: "A river crossing — homepage Plan-your-trip tile.",
    author: "Flickr (Openverse) — 'River Crossing'",
    licence: "CC BY",
    sourcePage: "https://live.staticflickr.com/7261/13940326252_74135d0576_b.jpg",
  },
  {
    caption: "Noosa Main Beach — homepage Today-in-Noosa tile.",
    author: "Flickr (Openverse)",
    licence: "CC BY-NC",
    sourcePage: "https://live.staticflickr.com/8029/8052945119_e3f2edce31_b.jpg",
  },

  // ─── Inline photos (Flickr Openverse + Unsplash CDN) ──────────────
  {
    caption: "Surfer paddling out at Noosa Main Beach at dawn.",
    author: "Flickr (Openverse) — 'Me surfing in Noosa'",
    licence: "CC BY",
    sourcePage: "https://live.staticflickr.com/3545/3488069272_d764c72594_b.jpg",
  },
  {
    caption: "Generic ocean wave — surf tile on /surf-and-weather.",
    author: "Unsplash CDN",
    licence: "CC0 (Unsplash)",
    sourcePage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    caption: "Generic sky / wind scene — wind tile on /surf-and-weather.",
    author: "Unsplash CDN",
    licence: "CC0 (Unsplash)",
    sourcePage: "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
  },
  {
    caption: "Noosa Main Beach in storm light — the swell window.",
    author: "Flickr (Openverse) — 'Noosa Main Beach, storm out to sea'",
    licence: "CC BY-NC-ND",
    sourcePage: "https://live.staticflickr.com/3757/11681350584_c78a09d814_b.jpg",
  },
  {
    caption: "Fairy Pool — coastal rock pools on the Noosa shoreline.",
    author: "Flickr (Openverse) — 'Noosa National Park Fairy Pool'",
    licence: "CC BY",
    sourcePage: "https://live.staticflickr.com/7902/46389696594_be050f6b5a_b.jpg",
  },
  {
    caption: "Tea Tree Cove — first sheltered beach south of the headland.",
    author: "Flickr (Openverse) — 'Tea Tree Cove, Noosa National Park'",
    licence: "CC BY-SA",
    sourcePage: "https://live.staticflickr.com/2420/2153303691_b1d994393b_b.jpg",
  },
  {
    caption: "Hell's Gates and Alexandria Bay.",
    author: "Flickr (Openverse)",
    licence: "CC BY-NC-SA",
    sourcePage: "https://live.staticflickr.com/8125/15648131978_aef5f2d88f_b.jpg",
  },
  {
    caption: "Noosa rainforest — Tanglewood walk deep page.",
    author: "Flickr (Openverse) — 'Noosa rainforest'",
    licence: "CC BY-NC-ND",
    sourcePage: "https://live.staticflickr.com/289/20066708795_71c95dc51a_b.jpg",
  },
{
    caption: "Sunshine Beach, Noosa.",
    author: "Flickr (Openverse) — 'Sunshine Beach, Noosa'",
    licence: "CC BY",
    sourcePage: "https://live.staticflickr.com/1408/705933988_e7ab226bb2.jpg",
  },
  {
    caption: "Netanya — generic Hastings Street apartments fallback.",
    author: "Flickr (Openverse)",
    licence: "CC BY",
    sourcePage: "https://live.staticflickr.com/6231/6224415039_628e2eb0a1_b.jpg",
  },
  {
    caption: "Generic restaurant dining — eat-experience card.",
    author: "Unsplash CDN",
    licence: "CC0 (Unsplash)",
    sourcePage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
  },
  {
    caption: "P1017550 — generic boat scene, cruise/tour card.",
    author: "Flickr (Openverse)",
    licence: "CC BY",
    sourcePage: "https://live.staticflickr.com/7068/13438728693_e10c56cced.jpg",
  },
  {
    caption: "Noosa River and Gympie Terrace, Noosaville (c. 1940) — historical context.",
    author: "Flickr (Openverse) — Public Domain Mark",
    licence: "PDM",
    sourcePage: "https://live.staticflickr.com/65535/54849508625_d3595b783b_b.jpg",
  },
  {
    caption: "Noosa Everglades — upper-river fishing water.",
    author: "Flickr (Openverse)",
    licence: "CC0",
    sourcePage: "https://live.staticflickr.com/3696/12046547304_e4e4449777_b.jpg",
  },
  {
    caption: "Stand-up paddleboard — hire-craft on the river.",
    author: "Flickr (Openverse)",
    licence: "CC BY",
    sourcePage: "https://live.staticflickr.com/7101/13941478461_d01edfaa11_b.jpg",
  },

  // ─── /shopping + /eat-drink (chairman: no new top-level pages, dining stays on /shopping) ───
  {
    caption: "Noosa Farmers Market stalls — Sunday morning on the Noosaville showgrounds.",
    author: "Flickr (Openverse) — 'Noosa Farmers Market'",
    licence: "CC BY-NC-SA",
    sourcePage: "https://live.staticflickr.com/2301/2367573625_8f0fd5692b_b.jpg",
  },
  {
    caption: "Eumundi Markets — Wednesday/Saturday hinterland market.",
    author: "Flickr (Openverse)",
    licence: "CC BY-SA",
    sourcePage: "https://live.staticflickr.com/2398/2189844448_ecff21b6d5_b.jpg",
  },
  {
    caption: "Noosa Regional Gallery flyer rack.",
    author: "Flickr (Openverse)",
    licence: "CC BY-NC-SA",
    sourcePage: "https://live.staticflickr.com/3490/3983700808_814732b141_b.jpg",
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
            (via the Openverse aggregator) under a Creative Commons
            licence, or from the Unsplash CDN under the Unsplash
            licence (free for commercial use, attribution appreciated
            but not required). Hero images are self-hosted as WebP +
            AVIF variants in <code className="font-mono text-body-sm text-ink-700">/public/photos/</code>.
            Inline and card images are hot-linked to{" "}
            <code className="font-mono text-body-sm text-ink-700">
              live.staticflickr.com
            </code>{" "}
            or{" "}
            <code className="font-mono text-body-sm text-ink-700">
              images.unsplash.com
            </code>
            . The list below mirrors{" "}
            <code className="font-mono text-body-sm text-ink-700">
              src/data/photos.ts
            </code>
            ; if you change a photo there, change it here too.
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
          Licence links:{" "}
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
          <a
            href="https://creativecommons.org/licenses/by-nc/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="link text-ocean-700"
          >
            CC BY-NC 4.0
          </a>
          {" · "}
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="link text-ocean-700"
          >
            CC BY-NC-SA 4.0
          </a>
          {" · "}
          <a
            href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="link text-ocean-700"
          >
            CC BY-NC-ND 4.0
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
