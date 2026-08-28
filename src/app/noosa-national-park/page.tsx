import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Noosa National Park",
  description:
    "Noosa National Park covers ~4,000 hectares between Noosa Heads and Peregian Beach. Tracks, wildlife, QPWS alerts, and the coastal walk.",
  alternates: { canonical: "/noosa-national-park" },
  openGraph: {
    title: "Noosa National Park · MyNoosaHeads",
    description: "Tracks, wildlife, QPWS alerts, and the coastal walk.",
    url: "/noosa-national-park",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Noosa National Park · MyNoosaHeads",
    description: "Tracks, wildlife, QPWS alerts, and the coastal walk.",
  },
};

export default function Page() {
  return (
    <CategoryPage
      slug="noosa-national-park"
      eyebrow="Managed by QPWS · alerts checked before every visit"
      title="Noosa National Park"
      subtitle="About 4,000 hectares of wallum heath, eucalypt forest, and rocky headland between Noosa Heads and Peregian Beach. The coastal walk is the headline, but the inland tracks are quieter and just as good."
      flourish="Koalas sleep in the tallowwoods. Walk softly."
      primarySources={[
        { label: "QPWS — Noosa National Park", href: "https://parks.qld.gov.au/find-a-park/national-parks/noosa-national-park" },
        { label: "QPWS park alerts (statewide)", href: "https://parks.qld.gov.au/park-alerts" },
        { label: "QPWS Day-Use Areas — Noosa section", href: "https://parks.qld.gov.au/find-a-park/national-parks/noosa-national-park/day-use-areas" },
        { label: "QLD wildlife — koala conservation", href: "https://parks.qld.gov.au/koala" },
      ]}
      bodySections={[
        {
          heading: "The coastal walk",
          paragraphs: [
            "The Noosa Headland section of the coastal walk runs from the Noosa Heads Surf Life Saving Club to Alexandria Bay, about 5.3 km one-way, with a further stretch on to Sunshine Beach if you want the full 10.8 km return. It is a Class 2 track — formed but uneven, with steps and short climbs. The granite headlands, the surf below, and the regular koala sightings make it one of the most walked short tracks on the Sunshine Coast.",
            "Start early. By 9 am in summer the exposed sections are hot and the carpark at the end of Park Road is full. There are toilets at the Surf Club end only.",
          ],
        },
        {
          heading: "Tanglewood track",
          paragraphs: [
            "Tanglewood track is the quieter inland alternative. It enters the park from the west (the Cooran/Tewantin side, off Cooroy–Noosa Road) and winds through blackbutt and tallowwood forest to rejoin the coastal walk near the Hells Gates section. About 3 km each way; shaded; a good koala and glossy black-cockatoo track.",
            "Glossy black-cockatoos (Calyptorhynchus lathami) feed on casuarina seeds in this area. They’re similar in size to a sulphur-crested cockatoo but with darker plumage (~45–50 cm body length), and the males have a distinctive red tail panel [Source: Higgins, P. J. (ed.) 1999, Handbook of Australian, New Zealand & Antarctic Birds, Volume 4: Parrots to Dollarbird, Oxford University Press — species accounts for Calyptorhynchus lathami and Cacatua galerita].",
          ],
        },
        {
          heading: "Palm Grove circuit",
          paragraphs: [
            "A 1 km loop through a remnant piccabeen palm grove near the day-use area. The track is flat and wheelchair-accessible in dry weather. The palms can be 30 m tall and the understorey is dense — go early or late for the lyrebirds, which are common here.",
          ],
        },
        {
          heading: "Wildlife to look for",
          paragraphs: [
            "Koalas (Phascolarctos cinereus) are the headline species, particularly in the tallowwoods along the coastal walk between Noosa Head and Dolphin Point. The QPWS Noosa koala population is one of the better-studied on the coast. If you see a koala on the ground, leave it alone and report it to QPWS — a koala on the ground is usually in trouble.",
            "Other residents: eastern grey kangaroos, goannas (lace monitors, up to ~2 m — roughly the length of a small car, though most adults are noticeably smaller than that), land mullet, scrub turkeys, and the occasional echidna. The whales pass north from June to August and south from September to November — the headlands are an easy spot [Source: Atlas of Living Australia — open occurrence records for Varanus varius, https://biocache.ala.org.au/occurrences/search?q=Varanus%20varius; typical adult length ~1.2–1.5 m, with the ~2 m figure a record-size individual, not a typical adult].",
          ],
        },
        {
          heading: "QPWS alerts — check before you go",
          paragraphs: [
            "The park is closed from time to time: high fire danger, the odd track washout, wildlife management, cultural work. The QPWS alerts page lists every current closure in plain language. We link to it from the sources list; please check it on the morning of your visit.",
          ],
        },
      ]}
      callout={{
        title: "Cultural and conservation notice",
        body: (
          <>
            Noosa National Park sits on Jinibara and Kabi Kabi (Gubbi Gubbi)
            country. Leave the forest as you found it — no bins in the park,
            so pack out what you bring in. Dogs are not permitted anywhere in
            the park, on-lead or off. See the{" "}
            <a
              href="https://parks.qld.gov.au/find-a-park/national-parks/noosa-national-park"
              className="link text-ocean-700"
              rel="noopener noreferrer"
              target="_blank"
            >
              QPWS Noosa National Park page
            </a>{" "}
            for the full rules.
          </>
        ),
        variant: "rainforest",
      }}
      relatedLinks={[
        { label: "Surf & weather", href: "/surf-and-weather", description: "Live tiles for the headland walk." },
        { label: "Things to do", href: "/things-to-do", description: "Inland and coastal ideas." },
        { label: "Webcams", href: "/webcams", description: "Check the headland before you leave." },
        { label: "Accommodation", href: "/accommodation", description: "Stay near the park entrance." },
      ]}
    />
  );
}
