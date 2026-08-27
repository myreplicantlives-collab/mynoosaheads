import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Boats & watercraft",
  description:
    "Boat hire, public ramps, and the Noosa River bar crossing rules. Marine Safety Queensland is the source of truth for bar conditions.",
  alternates: { canonical: "/boats-and-watercraft" },
  openGraph: {
    title: "Boats & watercraft · MyNoosaHeads",
    description: "Hire options, public ramps, and river bar rules.",
    url: "/boats-and-watercraft",
    type: "article",
  },
};

export default function Page() {
  return (
    <CategoryPage
      eyebrow="MSQ bar crossings + Noosa Council ramps"
      title="Boats & watercraft"
      subtitle="Crossing the Noosa River bar is a forecast-driven decision. Hire options and public ramp maps live below; the BOM forecast and MSQ bulletin sit in the sidebar."
      flourish="Slack water. Light wind. Outgoing tide."
      primarySources={[
        { label: "Marine Safety Queensland — bar crossings", href: "https://www.msq.qld.gov.au/Safety/Bar-crossings-and-coastal-conditions" },
        { label: "Noosa Council — boat ramps", href: "https://www.noosa.qld.gov.au/Community/Boating/Boat-ramps" },
        { label: "BOM — Capricornia–Hervey Bay", href: "https://www.bom.gov.au/qld/forecasts/coastal.shtml" },
        { label: "Transport and Main Roads — recreational boating", href: "https://www.tmr.qld.gov.au/Maritime/Recreational-boating" },
      ]}
      bodySections={[
        {
          heading: "Crossing the bar",
          paragraphs: [
            "The Noosa River bar is a trained entrance — it has been dredged and maintained, but it remains shallow and subject to swell. The general rule is to cross on the slack water or the outgoing tide with a south-east wind under 15 km/h. Crossings are discouraged in southerly conditions over 20 knots, on a heavy swell, or when MSQ has flagged a closed-bar condition.",
            "If you don’t know the bar, go with a local operator for the first crossing. The VMR Noosa volunteers (channel 16) are a good fallback for a live reading.",
          ],
        },
        {
          heading: "Public ramps",
          paragraphs: [
            "Noosa Council maintains public ramps at Tewantin (the main one), Noosaville, and a smaller one at Boreen Point. Tewantin is the deepest and the only one with a hardstand; the others are sand ramps that dry out at low tide. All three have trailer parking; the Tewantin car park fills on weekends during the holiday period.",
          ],
        },
        {
          heading: "Hire options",
          paragraphs: [
            "Houseboats hire from Tewantin and the Noosaville precinct. Self-skippered pontoons hire from Noosaville for the day. Kayaks and stand-up paddleboards hire from Noosaville, Main Beach, and a few of the quiet corners of the river.",
            "Hire prices are operator-set and change seasonally. We don’t run a comparison engine — link out to the operators below and book direct.",
          ],
          bullets: [
            "Noosa Houseboats — houseboats, multi-day, Tewantin base.",
            "Noosa Ferry — scheduled ferry Noosa Heads ↔ Noosaville ↔ Tewantin.",
            "Sunshine Coast Afloat — kayak and SUP hire, Noosaville.",
          ],
        },
        {
          heading: "Safety equipment",
          paragraphs: [
            "Queensland recreational boats must carry the equipment specified by Transport and Main Roads — lifejackets for everyone on board, a bailer or bilge pump, an anchor with chain and line, a torch or flares, a fire extinguisher on powered vessels, and an EPIRB or PLB for offshore boats. The full schedule is on the TMR site.",
          ],
        },
      ]}
      callout={{
        title: "If in doubt, don’t go out",
        body: (
          <>
            The bar is the highest-risk boating decision you’ll make around
            Noosa. If the BOM forecast is southerly over 20 knots or the swell
            is over 1.5 m, defer.{" "}
            <a
              href="https://www.msq.qld.gov.au/Safety/Bar-crossings-and-coastal-conditions"
              className="link text-ocean-700"
              rel="noopener noreferrer"
              target="_blank"
            >
              MSQ bar crossings bulletin
            </a>
            .
          </>
        ),
        variant: "coral",
      }}
      relatedLinks={[
        { label: "Surf & weather", href: "/surf-and-weather", description: "BOM + Open-Meteo tiles." },
        { label: "Fishing reports", href: "/fishing-reports", description: "Tides and rules." },
      ]}
    />
  );
}
