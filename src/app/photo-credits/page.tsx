import type { Metadata } from "next";
import Link from "next/link";

/**
 * /photo-credits — full attribution table for every image used on
 * MyNoosaHeads (MSN-2973).
 *
 * Per Tim's directive, all photographer / Wikimedia Commons / CC
 * licence attribution is moved off the main journey pages (homepage,
 * /accommodation, /things-to-do, /noosa-national-park,
 * /surf-and-weather) and consolidated here. Linked from the footer.
 *
 * Every image used on the site is from Wikimedia Commons under a
 * Creative Commons licence. We hot-link the 1280-px thumbnails
 * served from upload.wikimedia.org so the attribution chain stays
 * intact (no re-upload, no local copy).
 *
 * The table below mirrors the photo set in `src/data/photos.ts`. If
 * you add or change a photo there, mirror it here.
 */

export const metadata: Metadata = {
  title: "Photo credits",
  description:
    "Attribution for every photograph used on MyNoosaHeads. All images are from Wikimedia Commons under Creative Commons licences.",
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
  commonsPage: string;
};

const CREDITS: CreditRow[] = [
  {
    caption: "Sunset over Noosa Main Beach (April 2020) — homepage hero.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage:
      "https://commons.wikimedia.org/wiki/File:Sunset_over_Noosa_Beach,_Noosa_Heads,_Queensland_04.jpg",
  },
  {
    caption: "Sunrise over Laguna Bay from the Noosa headland coastal walk — homepage feature band.",
    author: "Renee Whelan",
    licence: "CC BY-SA 4.0",
    commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_beach.jpg",
  },
  {
    caption: "Hastings Street looking up to the headland (2022) — homepage Where-to-stay tile.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage:
      "https://commons.wikimedia.org/wiki/File:Hastings_Street,_Noosa_Heads,_Queensland,_2022,_03.jpg",
  },
  {
    caption: "The Noosa River at Noosaville — homepage Things-to-do tile and river category.",
    author: "Chris Olszewski",
    licence: "CC BY-SA 4.0",
    commonsPage:
      "https://commons.wikimedia.org/wiki/File:Noosa_River_bank_at_Noosaville,_Queensland,_2024.jpg",
  },
  {
    caption: "The Noosa headland and the river mouth — homepage Beaches-and-nature tile.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_and_Weyba_Creek.JPG",
  },
  {
    caption: "A Hastings Street café table — homepage Eat-and-drink tile and food category.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage:
      "https://commons.wikimedia.org/wiki/File:Aromas_Latte_art,_Noosa_Heads,_Queensland.jpg",
  },
  {
    caption: "The Noosa Ferry at the Sofitel wharf — homepage Plan-your-trip tile and boats category.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage:
      "https://commons.wikimedia.org/wiki/File:Noosa_Ferry_outside_Sofitel_Noosa_Pacific_Resort,_Noosa_Heads,_Queensland.jpg",
  },
  {
    caption: "Noosa Main Beach on a sunny day — homepage Today-in-Noosa tile.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage:
      "https://commons.wikimedia.org/wiki/File:Noosa_Heads_beach_on_Christmas_Day_2015_03.jpeg",
  },
  {
    caption: "Hastings Street storefronts and palms, looking toward Main Beach — accommodation category hero.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage: "https://commons.wikimedia.org/wiki/File:Hastings_Street_Noosa_Heads,_Queensland.jpg",
  },
  {
    caption: "Noosa Main Beach in late afternoon — surf category hero.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage:
      "https://commons.wikimedia.org/wiki/File:Noosa_Heads_beach_on_Christmas_Day_2015_03.jpeg",
  },
  {
    caption: "The Noosa Headlands coastal walk — National Park category hero.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_and_Weyba_Creek.JPG",
  },
  {
    caption: "Noosa Main Beach in December 2022 — Things-to-do category hero.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage:
      "https://commons.wikimedia.org/wiki/File:Noosa_Beach,_Noosa_Heads,_Queensland,_2022.jpg",
  },
  {
    caption: "The Noosa River mouth from the headland — fishing category hero.",
    author: "dronepicr",
    licence: "CC BY 2.0",
    commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_(23720155369).jpg",
  },
  {
    caption: "Boardwalk along Noosa Main Beach — travel category hero.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage:
      "https://commons.wikimedia.org/wiki/File:Boardwalk_along_Noosa_Heads%E2%80%99_main_beach,_Queensland.jpg",
  },
  {
    caption: "Noosa Heads township and the river mouth (drone view) — webcams category hero.",
    author: "dronepicr",
    licence: "CC BY 3.0",
    commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_(134205593).jpeg",
  },
  {
    caption: "Foot-access-only beach along the Noosa headlands coastal walk.",
    author: "Raffi Kojian",
    licence: "CC BY 2.5",
    commonsPage:
      "https://commons.wikimedia.org/wiki/File:Noosa_head-raffi_kojian-CIMG6549.JPG",
  },
  {
    caption: "Aerial view of the headland and the river mouth.",
    author: "dronepicr",
    licence: "CC BY 2.0",
    commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_(23720155369).jpg",
  },
  {
    caption: "A palm-silhouette evening view of Main Beach from the headland.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage:
      "https://commons.wikimedia.org/wiki/File:Noosa_Heads_beach_on_Christmas_Day_2015_01.jpeg",
  },
  {
    caption: "The Dog Beach at the Noosa Botanic Gardens on Lake Macdonald.",
    author: "Misaochan2",
    licence: "CC BY-SA 4.0",
    commonsPage: "https://commons.wikimedia.org/wiki/File:Dog_beach_at_Noosa_Botanic_Gardens.jpg",
  },
  {
    caption: "Children learning to surf in the shallows at First Bay.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage:
      "https://commons.wikimedia.org/wiki/File:Children_learning_surfing_at_Noosa_Heads_beach,_Queensland.jpg",
  },
  {
    caption: "Early-morning paddle-out at Noosa Main Beach.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage:
      "https://commons.wikimedia.org/wiki/File:Noosa_Heads_beach_on_Christmas_Day_2015_04.jpeg",
  },
  {
    caption: "Stand-up paddleboarder in the bay — calm-water alternative when the swell is up.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage:
      "https://commons.wikimedia.org/wiki/File:Man_with_stand_up_board_at_Noosa_Heads_beach,_Queensland.jpg",
  },
  {
    caption: "French Quarter resort courtyard and pool — Hastings-area apartment.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage: "https://commons.wikimedia.org/wiki/File:French_Quarter_resort,_Noosa_Heads.jpg",
  },
  {
    caption: "Maison Noosa Resort entrance — one of the Hastings Street properties.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage: "https://commons.wikimedia.org/wiki/File:Maison_Noosa_Resort.jpg",
  },
  {
    caption: "Holiday resort overlooking Noosa Main Beach.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage:
      "https://commons.wikimedia.org/wiki/File:Holiday_resort_on_Noosa_Heads%E2%80%99_main_beach,_Queensland.jpg",
  },
  {
    caption: "Noosa Harbour Resort on the Noosaville waterfront.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Harbour_Resort.jpg",
  },
  {
    caption: "Noosa Farmers Market — Sunday morning on the Noosaville showgrounds.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_farmers_market.jpg",
  },
  {
    caption: "Long beach panorama from the headland — the angle most public webcams capture.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage:
      "https://commons.wikimedia.org/wiki/File:Noosa_Heads_beach_on_Christmas_Day_2015_05.jpeg",
  },
  {
    caption: "Noosa Main Beach at midday, viewed from the headland.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_beach_in_January_2015.JPG",
  },
  {
    caption: "Mobile coffee van, Australian coast — frequent sight at the Noosa North Shore campgrounds.",
    author: "Kgbo",
    licence: "CC BY-SA 3.0",
    commonsPage: "https://commons.wikimedia.org/wiki/File:Mobile_coffee_van_in_Australia.jpg",
  },
  {
    caption: "Campervan on the Coast — the road-trip mode into Noosa and the Hinterland.",
    author: "Kgbo",
    licence: "CC BY 2.0",
    commonsPage:
      "https://commons.wikimedia.org/wiki/File:Camper_Wohnmobil_Australien_(23979876582).jpg",
  },
  {
    caption: "Child building a sandcastle at Noosa Main Beach — the weekday rhythm of the lagoon.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage:
      "https://commons.wikimedia.org/wiki/File:Artis_building_a_sand_castle_at_Noosa_Heads_beach,_Queensland_in_November_2016.jpg",
  },
  {
    caption: "Newlyweds on Noosa Main Beach, February 2017 — the bay at its calmest.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage:
      "https://commons.wikimedia.org/wiki/File:Newlyweds_at_Noosa_Heads_Main_Beach_02.2017,_01.jpg",
  },
  {
    caption: "Hastings Street in soft overcast light — the rainy-day walk.",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage: "https://commons.wikimedia.org/wiki/File:Hastings_Street_Noosa_Heads,_Queensland.jpg",
  },
  {
    caption: "The granite headland and the Weyba Creek confluence (about / brand masthead).",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    commonsPage: "https://commons.wikimedia.org/wiki/File:Noosa_Heads_and_Weyba_Creek.JPG",
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
            Every photograph on MyNoosaHeads is sourced from Wikimedia
            Commons under a Creative Commons licence. We hot-link the
            1280-px thumbnails served from{" "}
            <code className="font-mono text-body-sm text-ink-700">
              upload.wikimedia.org
            </code>{" "}
            so the attribution chain stays intact — no re-upload, no
            local copy. The list below mirrors{" "}
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
                  key={`${row.commonsPage}-${i}`}
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
                      href={row.commonsPage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link text-ocean-700 break-all"
                    >
                      Commons page ↗
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
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="link text-ocean-700"
          >
            CC BY-SA 4.0
          </a>
          {" · "}
          <a
            href="https://creativecommons.org/licenses/by/3.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="link text-ocean-700"
          >
            CC BY 3.0
          </a>
          {" · "}
          <a
            href="https://creativecommons.org/licenses/by/2.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="link text-ocean-700"
          >
            CC BY 2.0
          </a>
          {" · "}
          <a
            href="https://creativecommons.org/licenses/by/2.5/"
            target="_blank"
            rel="noopener noreferrer"
            className="link text-ocean-700"
          >
            CC BY 2.5
          </a>
          {" · "}
          <a
            href="https://creativecommons.org/licenses/by-sa/3.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="link text-ocean-700"
          >
            CC BY-SA 3.0
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
