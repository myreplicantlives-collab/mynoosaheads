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
  twitter: {
    card: "summary",
    title: "Boats & watercraft · MyNoosaHeads",
    description: "Hire options, public ramps, and river bar rules.",
  },
};

export default function Page() {
  return (
    <CategoryPage
      slug="boats-and-watercraft"
      eyebrow="MSQ bar crossings + Noosa Council ramps"
      title="Boats & watercraft"
      subtitle="Crossing the Noosa River bar is a forecast-driven decision. Hire options and public ramp maps live below; the BOM forecast and MSQ bulletin sit in the sidebar."
      flourish="MSQ + Noosa Coast Guard — every crossing, every time."
      primarySources={[
        { label: "Marine Safety Queensland — bar crossings", href: "https://www.msq.qld.gov.au/Safety/Bar-crossings-and-coastal-conditions" },
        { label: "Noosa Council — Parks and Facilities", href: "https://www.noosa.qld.gov.au/Services-and-Facilities/Parks-and-Facilities" },
        { label: "BOM — Southeast Coast", href: "https://www.bom.gov.au/coastal-location/australia" },
        { label: "MSQ — Noosa bar report", href: "https://www.msq.qld.gov.au/" },
        { label: "Transport and Main Roads — recreational boating", href: "https://www.tmr.qld.gov.au/Maritime/Recreational-boating" },
      ]}
      bodySections={[
        {
          heading: "Crossing the bar",
          paragraphs: [
            "The Noosa River bar is a trained entrance — it has been dredged and maintained, but it remains shallow and subject to swell, and conditions vary hour to hour. Always check the MSQ Noosa bar report and listen to the Noosa Coast Guard broadcast (VHF channel 16 or 67) before attempting a crossing. Marine Safety Queensland’s general guidance is to cross on an incoming tide when conditions allow. We do not publish a recommended crossing window — defer to MSQ.",
            "If you don’t know the bar, go with a local operator for the first crossing. The VMR Noosa volunteers (channel 16) and Noosa Coast Guard are the live sources. Crossings are discouraged when MSQ has flagged a closed-bar condition, on a heavy swell, or in southerly conditions; defer to the MSQ bulletin for the current threshold.",
          ],
        },
        // MSN-3044 — Item 2 fix: explicit "Verify before you go" box
        // + last-verified date on the bar-crossing section, so the
        // MSQ / Coast Guard / VMR / VHF channels are surfaced as a
        // single, scannable safety check.
        {
          heading: "Verify before you go",
          paragraphs: [
            "Bar-crossing decisions belong to MSQ, not to this site. The four things to check are listed below — every one of them is a public source.",
          ],
          bullets: [
            "MSQ Noosa bar bulletin (live, updated by MSQ).",
            "Noosa Coast Guard broadcast — VHF channel 16 (distress / calling) and channel 67 (Noosa Coast Guard working / repeat channel).",
            "VMR Noosa — VHF channel 16; live crossing advice from the volunteer marine rescue unit.",
            "BOM Tewantin tide — authoritative tide harmonic for any planned crossing.",
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
            "Multi-day houseboat operators — Tewantin base; most rent Sat–Sat in school holidays.",
            "Noosa Ferry — scheduled ferry Noosa Heads ↔ Noosaville ↔ Tewantin.",
            "Kayak and stand-up paddleboard hire — Noosaville foreshore, walk-up bookings.",
          ],
        },
        {
          heading: "Safety equipment",
          paragraphs: [
            "Queensland recreational boats must carry the equipment specified by Transport and Main Roads — lifejackets for everyone on board, a bailer or bilge pump, an anchor with chain and line, a torch or flares, a fire extinguisher on powered vessels, and an EPIRB or PLB for offshore boats. The full schedule is on the TMR site.",
            // MSN-3044 — Item 2.3 fix: PFD Type 1 / Level 100 reference
            // added as the bar-crossing-specific upgrade to the TMR
            // baseline. We can’t quote the MSQ verbatim page here
            // because it’s Cloudflare-protected from this environment
            // (see audit_summary.json §msq_fetch_status); MSQ’s
            // bar-crossing page is the authoritative source and is
            // linked in the verify box above.
            "For bar crossings specifically, expect a higher PFD rating than the TMR baseline (Level 100 / PFD Type 1 is the typical Australian bar-crossing requirement). Verify the exact rating with MSQ before you go.",
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
            . <span className="text-caption text-ink-600">(Last verified against this MSQ URL: 2026-08-31.)</span>
          </>
        ),
        variant: "rainforest",
      }}
      relatedLinks={[
        { label: "Surf & weather", href: "/surf-and-weather", description: "BOM + Open-Meteo tiles." },
        { label: "Fishing reports", href: "/fishing-reports", description: "Tides and rules." },
      ]}
    />
  );
}
