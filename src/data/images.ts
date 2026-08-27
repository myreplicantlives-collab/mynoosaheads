// src/data/images.ts — image registry with credits (CC BY/SA, all Wikimedia Commons)
// Source: /Volumes/OpenClawLive/workspaces/sally/assets/noosa/IMAGE_MANIFEST.md
// All licenses permit commercial use with attribution.

export type ImageCredit = {
  filename: string;
  subject: string;
  sourceUrl: string;
  license: string;
  credit: string; // human-readable attribution
};

export const IMAGE_CREDITS: ImageCredit[] = [
  {
    filename: "noosa_main_beach.jpg",
    subject: "Main Beach, Noosa Heads",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Noosa_Heads_main_beach,_2025.jpg",
    license: "CC BY-SA 4.0",
    credit: "Main Beach, Noosa Heads — Wikimedia Commons, CC BY-SA 4.0",
  },
  {
    filename: "noosa_hastings_street.jpg",
    subject: "Hastings Street, Noosa",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Hastings_Street,_Noosa_Heads,_2023,_02.jpg",
    license: "CC BY-SA 4.0",
    credit: "Hastings Street, Noosa — Wikimedia Commons, CC BY-SA 4.0",
  },
  {
    filename: "noosa_national_park_coastal_walk.jpg",
    subject: "Noosa National Park coastal walk",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Noosa_National_Park,_QLD_1.jpg",
    license: "CC BY-SA 4.0",
    credit: "Noosa National Park coastal walk — Wikimedia Commons, CC BY-SA 4.0",
  },
  {
    filename: "noosa_little_cove.jpg",
    subject: "Little Cove, Noosa Heads",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Little_Cove,_Noosa_Heads,_Queensland,_2024,_03.jpg",
    license: "CC BY-SA 4.0",
    credit: "Little Cove — Wikimedia Commons, CC BY-SA 4.0",
  },
  {
    filename: "noosa_everglades.jpg",
    subject: "Noosa Everglades",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Noosa_Everglades_(41752256811).jpg",
    license: "CC BY 2.0",
    credit: "Noosa Everglades — Wikimedia Commons, CC BY 2.0",
  },
  {
    filename: "noosa_river_foreshore.jpg",
    subject: "Noosa River foreshore, Noosaville",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Noosa_River_bank_at_Noosaville,_Queensland,_2024.jpg",
    license: "CC BY-SA 4.0",
    credit: "Noosa River foreshore — Wikimedia Commons, CC BY-SA 4.0",
  },
  {
    filename: "noosa_ferry.jpg",
    subject: "Noosa Ferry on the Noosa River",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Ferry_in_the_middle_of_the_Noosa_River,_Noosa_North_Shore_Ferries,_2019.jpg",
    license: "CC BY-SA 4.0",
    credit: "Noosa Ferry — Wikimedia Commons, CC BY-SA 4.0",
  },
  {
    filename: "noosa_sunshine_beach_town.jpg",
    subject: "Sunshine Beach town",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sunshine_Beach.jpg",
    license: "CC BY-SA 4.0",
    credit: "Sunshine Beach — Wikimedia Commons, CC BY-SA 4.0",
  },
  {
    filename: "noosa_national_park_forest.jpg",
    subject: "Noosa National Park eucalypt forest",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Noosa_National_Park,_QLD_2.jpg",
    license: "CC BY-SA 4.0",
    credit: "Noosa National Park eucalypt forest — Wikimedia Commons, CC BY-SA 4.0",
  },
  {
    filename: "noosa_pomona.jpg",
    subject: "Pomona, Queensland (Imperial Hotel)",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Pomona_Hotel.JPG",
    license: "CC BY-SA 3.0",
    credit: "Pomona — Wikimedia Commons, CC BY-SA 3.0",
  },
  {
    filename: "noosa_peregian_beach.jpg",
    subject: "Peregian Beach",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Peregian_Beach,_2012.jpg",
    license: "CC BY 2.0",
    credit: "Peregian Beach — Wikimedia Commons, CC BY 2.0",
  },
  {
    filename: "noosa_tewantin.jpg",
    subject: "Tewantin main street",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Main_street,_Tewantin,_Queensland,_2022.jpg",
    license: "CC BY-SA 4.0",
    credit: "Tewantin — Wikimedia Commons, CC BY-SA 4.0",
  },
  {
    filename: "noosa_lake_weyba.jpg",
    subject: "Lake Weyba",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Lake_Weyba_(2099873732).jpg",
    license: "CC BY-SA 2.0",
    credit: "Lake Weyba — Wikimedia Commons, CC BY-SA 2.0",
  },
  {
    filename: "noosa_hells_gates.jpg",
    subject: "Hell's Gates, Noosa National Park",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Hell_gate_at_Noosa_National_park.jpg",
    license: "CC BY-SA 4.0",
    credit: "Hell's Gates, Noosa National Park — Wikimedia Commons, CC BY-SA 4.0",
  },
  {
    filename: "noosa_whale.jpg",
    subject: "Humpback whale (off the Queensland coast)",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Humpback_Whale_fg1.jpg",
    license: "CC BY-SA 2.5",
    credit: "Humpback whale off the QLD coast — Wikimedia Commons, CC BY-SA 2.5",
  },
];

export function creditFor(filename: string): ImageCredit | undefined {
  return IMAGE_CREDITS.find((c) => c.filename === filename);
}

export function srcSet(filename: string, sizes = "100vw"): string {
  // Use the resized variants under public/images/noosa/
  const base = filename.replace(/\.jpg$/, "");
  return [
    `/images/noosa/${base}_thumb.jpg 400w`,
    `/images/noosa/${base}_card.jpg 800w`,
    `/images/noosa/${base}_hero.jpg 1600w`,
  ].join(", ");
}

export function srcFor(filename: string, preferred: "thumb" | "card" | "hero" = "card"): string {
  const base = filename.replace(/\.jpg$/, "");
  return `/images/noosa/${base}_${preferred}.jpg`;
}