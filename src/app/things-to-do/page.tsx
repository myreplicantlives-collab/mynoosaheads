import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Things to do",
  description:
    "Things to do in Noosa, organised by what locals actually do — Hastings Street, the river, the hinterland, the surf beaches.",
  alternates: { canonical: "/things-to-do" },
  openGraph: {
    title: "Things to do · MyNoosaHeads",
    description: "What locals do in Noosa, organised honestly.",
    url: "/things-to-do",
    type: "article",
  },
};

export default function Page() {
  return (
    <CategoryPage
      eyebrow="What locals actually do"
      title="Things to do in Noosa"
      subtitle="The brochure leads with whale-watching and jet-skis. We organise around what residents actually do on a Tuesday morning: the headland walk, a coffee on Hastings Street, the river bar at slack tide, and an unhurried dinner."
      flourish="Slow categories for a slow town."
      primarySources={[
        { label: "Tourism Noosa (industry body)", href: "https://www.visitnoosa.com.au/" },
        { label: "Noosa Council — Things to do", href: "https://www.noosa.qld.gov.au/Community/Things-to-do" },
        { label: "Visit Sunshine Coast", href: "https://www.visitsunshinecoast.com/" },
      ]}
      bodySections={[
        {
          heading: "Hastings Street",
          paragraphs: [
            "Hastings Street runs from Noosa Heads Surf Life Saving Club up to the headland. Cafés, restaurants, boutiques, and the National Park entrance at the top end. Walk it once slowly; you’ll come back for meals.",
            "The patrolled Main Beach sits at the bottom of the street. The flags move with the conditions; check Beachsafe.org.au for the current patrol hours before you set up.",
          ],
          bullets: [
            "Betty’s Burgers for an easy lunch (no booking).",
            "Bistro C on the river end for a sit-down dinner (book).",
            "Berkeley Apparel and Sudio Noosa for a browse.",
          ],
        },
        {
          heading: "The Noosa River",
          paragraphs: [
            "Gympie Terrace runs along the Noosaville foreshore. Restaurants, paddleboard hire, the Noosa Ferry stop, and a flat cycle path all the way to Tewantin. The river is the calmer alternative when the surf beaches are blown out.",
            "Houseboats hire from Noosaville and Tewantin. The river itself is a declared fish habitat area — small fish species protected, larger species linefishable. See the QLD recreational fishing rules before you cast.",
          ],
        },
        {
          heading: "Hinterland villages",
          paragraphs: [
            "Pomona, Cooran, and Kin Kin sit in the hinterland about 25–30 minutes west of Noosa Heads. Each has a pub, a café or two, and a quiet main street. Pomona hosts the Noosa Country Music Festival and the famous Mount Cooroora climb (call ahead; it’s seasonal).",
            "The hinterland is the place to go when the coast is under a southerly. Cooler, calmer, and the food scene is good (the Pomona Hotel kitchen is a regional destination).",
          ],
        },
        {
          heading: "Surf beaches",
          paragraphs: [
            "Main Beach is the patrolled beach at the bottom of Hastings Street. Sunshine Beach is the patrolled beach two minutes’ drive south. Peregian and Marcus continue the run to the south. Each has its own surf club — the flags are on Beachsafe.",
            "Beginner lessons: there are a handful of long-established surf schools operating out of Main Beach and Sunshine Beach. The Surf Life Saving clubs run Nippers programs during the summer for under-14s — sign-up is in early September.",
          ],
        },
        {
          heading: "A day on the river",
          paragraphs: [
            "Start at Tewantin, take the Noosa Ferry downstream to Noosa Heads, walk the headland, and ferry back. The ferry runs roughly hourly; check the current timetable at the Noosa Ferry site. Allow a full day if you’re stopping at Noosaville for lunch on the way back.",
          ],
        },
      ]}
      callout={{
        title: "Skip the brochure",
        body: (
          <>
            Noosa does not need a 12-activity itinerary to be enjoyed. Most
            locals’ favourite Noosa days involve one outdoor thing, one slow
            meal, and one walk. Skip the brochure waterfall; do less, more
            slowly.
          </>
        ),
        variant: "rainforest",
      }}
      relatedLinks={[
        { label: "Surf & weather", href: "/surf-and-weather", description: "Read the wind before the river." },
        { label: "Boats & watercraft", href: "/boats-and-watercraft", description: "River bar, hire, ramps." },
        { label: "Noosa National Park", href: "/noosa-national-park", description: "The headland walk." },
      ]}
    />
  );
}
