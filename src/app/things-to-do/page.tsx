import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Things to do",
  description:
    "Things to do in Noosa — Hastings Street, the Noosa River, the hinterland villages, and the surf beaches. Live conditions and primary sources linked on every page.",
  alternates: { canonical: "/things-to-do" },
  openGraph: {
    title: "Things to do · MyNoosaHeads",
    description: "Things to do in Noosa — coast, river, hinterland. Live conditions and primary sources on every page.",
    url: "/things-to-do",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Things to do · MyNoosaHeads",
    description: "Things to do in Noosa — coast, river, hinterland. Live conditions and primary sources on every page.",
  },
};

export default function Page() {
  return (
    <CategoryPage
      slug="things-to-do"
      eyebrow="Coast · river · hinterland"
      title="Things to do in Noosa"
      subtitle="Pick the day — coast, river, hinterland, or hinterland-walk — and the live conditions, alerts, and operator links are one tap away. Hastings Street reads better after a check of the BOM wind and the patrol flags."
      flourish="Eight areas, one honest guide."
      primarySources={[
        { label: "Tourism Noosa (industry body)", href: "https://www.visitnoosa.com.au/" },
        { label: "Noosa Council — About Noosa", href: "https://www.noosa.qld.gov.au/Community/About-Noosa" },
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
            "Hastings Street cafés and takeaways for an easy lunch (most are walk-in).",
            "Sit-down restaurants on the river end of Gympie Terrace for dinner (most take bookings).",
            "Boutiques and homewares shops along Hastings Street for a browse.",
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
            "The hinterland is the place to go when the coast is under a southerly. Cooler, calmer, and the food scene is good (Pomona pub kitchens are a regional dining destination).",
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
        title: "A day that works",
        body: (
          <>
            Most visitors’ favourite Noosa days involve one outdoor thing, one
            sit-down meal, and one walk. Hastings Street breakfast, the
            headland walk, a swim at Main Beach, dinner on Gympie Terrace —
            pick three of the four and you’ve had a day.
          </>
        ),
        variant: "rainforest",
      }}
      relatedLinks={[
        { label: "Surf & weather", href: "/surf-and-weather", description: "Read the wind before the river." },
        { label: "Boats & watercraft", href: "/boats-and-watercraft", description: "River bar, hire, ramps." },
        { label: "Noosa National Park", href: "/noosa-national-park", description: "The headland walk." },
        { label: "Accommodation", href: "/accommodation", description: "Base yourself for the day-by-day." },
      ]}
    />
  );
}
