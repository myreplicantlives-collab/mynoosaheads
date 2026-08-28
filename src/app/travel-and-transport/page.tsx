import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Travel & transport",
  description:
    "Getting to and around Noosa — Bruce Highway conditions, Sunshine Coast Airport, Noosa Ferry, and the rail/bus alternatives.",
  alternates: { canonical: "/travel-and-transport" },
  openGraph: {
    title: "Travel & transport · MyNoosaHeads",
    description: "How to get to Noosa and how to get around once you’re there.",
    url: "/travel-and-transport",
    type: "article",
 ,
  twitter: {
    card: "summary",
    title: "Travel & transport · MyNoosaHeads",
    description: "How to get to Noosa and how to get around once you’re there.",
  },
 },
};

export default function Page() {
  return (
    <CategoryPage
      slug="travel-and-transport"
      eyebrow="QLD Traffic + Sunshine Coast Airport + Noosa Ferry"
      title="Travel & transport"
      subtitle="Driving is the easiest way to reach Noosa, but the Bruce Highway can shut in heavy rain and the airport at Maroochydore is the closest commercial option. The Noosa Ferry connects the river end of town to Tewantin."
      flourish="Leave at first light; arrive at low tide."
      primarySources={[
        { label: "QLD Traffic (Bruce Highway + state roads)", href: "https://qldtraffic.qld.gov.au/" },
        { label: "Sunshine Coast Airport", href: "https://www.sunshinecoastairport.com.au/" },
        { label: "Noosa Ferry", href: "https://www.noosaferry.com/" },
        { label: "Translink — public transport timetables", href: "https://translink.com.au/" },
        { label: "Transport and Main Roads — road conditions", href: "https://www.qld.gov.au/transport/conditions" },
      ]}
      bodySections={[
        {
          heading: "By car — the Bruce Highway",
          paragraphs: [
            "From Brisbane, Noosa is about 135 km north — roughly 1 hour 45 minutes on a clear M1 (Bruce Highway). From Sydney it’s a long day (about 16 hours) or a flight. From Melbourne, fly or take the Spirit of Queensland rail motor.",
            "The Eumundi–Noosa road network (Eumundi Range Road, the back way via Cooroy) is the alternative when the Bruce is closed for flooding. The closure happens a couple of times a year; check QLD Traffic before you set off.",
          ],
        },
        {
          heading: "By air — Sunshine Coast Airport",
          paragraphs: [
            "Sunshine Coast Airport (MCY) sits at Maroochydore, about 30 minutes’ drive south of Noosa Heads. Direct flights operate to and from Sydney, Melbourne, Adelaide, and Auckland (seasonal). The airport publishes live arrivals on its official site; we link out in the sidebar.",
          ],
        },
        {
          heading: "By train — limited but workable",
          paragraphs: [
            "The closest rail station is at Landsborough (on the Brisbane–Nambour line) and Nambour itself. From there, a bus to Noosa via the 622 Translink service takes about 1 hour 20 minutes. Most visitors either drive or fly.",
          ],
        },
        {
          heading: "Once you’re here — the Noosa Ferry",
          paragraphs: [
            "The Noosa Ferry runs scheduled services between Noosa Heads (the Halse Street landing), Noosaville, and Tewantin. Roughly hourly; full timetable on the Noosa Ferry site. The ferry is the easiest way to the river restaurants without driving.",
          ],
        },
        {
          heading: "Local buses",
          paragraphs: [
            "Translink routes 620 (Brisbane ↔ Noosa), 622 (Nambour ↔ Noosa), and 627 (Noosa Heads ↔ Noosa Junction ↔ Noosaville) cover most of what a visitor needs. Timetables on the Translink site.",
          ],
        },
        {
          heading: "Cycling",
          paragraphs: [
            "Noosa is cycle-friendly. The Noosa–Noosaville cycle path runs along the river (about 7 km one-way, flat). Hastings Street is one-way and signed at 30 km/h. The coastal path from Noosa Heads to Peregian is unsealed in places and is shared with walkers.",
          ],
        },
      ]}
      callout={{
        title: "Check QLD Traffic before you drive",
        body: (
          <>
            The Bruce Highway closes for flooding, accidents, and the odd
            planned works. The QLD Traffic site is updated in near real time
            and is the source of truth.{" "}
            <a
              href="https://qldtraffic.qld.gov.au/"
              className="link text-ocean-700"
              rel="noopener noreferrer"
              target="_blank"
            >
              QLD Traffic
            </a>
            .
          </>
        ),
        variant: "rainforest",
      }}
      relatedLinks={[
        { label: "Surf & weather", href: "/surf-and-weather", description: "Conditions for the drive." },
        { label: "Boats & watercraft", href: "/boats-and-watercraft", description: "Once you’re on the river." },
      ]}
    />
  );
}
