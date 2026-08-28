import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Surf & weather",
  description:
    "Live surf, wind, tide, and UV tiles for Noosa Heads from BOM Southeast Coast and Open-Meteo. Bar crossings defer to MSQ and the Noosa Coast Guard.",
  alternates: { canonical: "/surf-and-weather" },
  openGraph: {
    title: "Surf & weather · MyNoosaHeads",
    description:
      "Live surf, wind, tide, and UV tiles for Noosa Heads, refreshed every 30 minutes.",
    url: "/surf-and-weather",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Surf & weather · MyNoosaHeads",
    description: "Live surf, wind, tide, and UV tiles for Noosa Heads, refreshed every 30 minutes.",
  },
};

export default function Page() {
  return (
    <CategoryPage
      slug="surf-and-weather"
      showCredits={false}
      eyebrow="Live · BOM Southeast Coast + Open-Meteo Marine"
      title="Surf & weather"
      subtitle="The BOM Southeast Coast marine forecast covers Noosa Heads, Sunshine Beach, and the river bar. The tiles on this page refresh themselves every 30 minutes — we don’t push them by hand. Bar crossings always defer to MSQ and the Noosa Coast Guard."
      flourish="When the wind turns south-east, the points light up."
      primarySources={[
        { label: "BOM — Southeast Coast coastal forecast", href: "https://www.bom.gov.au/marine/forecast/QLD/QLD-Southeast-Coast.shtml" },
        { label: "MSQ — Noosa bar report (bar crossings)", href: "https://www.msq.qld.gov.au/" },
        { label: "BOM — Tewantin tide", href: "https://www.bom.gov.au/australia/tides/#!/qld-tewantin" },
        { label: "Open-Meteo Marine Weather API (free, no key)", href: "https://open-meteo.com/en/docs/marine-weather-api" },
        { label: "Cancer Council SunSmart (UV thresholds)", href: "https://www.sunsmart.com.au/" },
        { label: "Marine Safety Queensland — bar crossings", href: "https://www.msq.qld.gov.au/Safety/Bar-crossings-and-coastal-conditions" },
      ]}
      bodySections={[
        {
          heading: "How to read the live tiles",
          paragraphs: [
            "The five tiles at the top of the page are pulled directly from BOM and Open-Meteo. They are not forecasts of what is coming — they are the most recent observation or nowcast. The heading on each tile is the kind; the value is the headline number; the secondary line is the supporting detail (swell period, gust, tide direction); the footer is the source and the timestamp.",
            "If a tile shows Unavailable, the upstream API didn’t respond in time. Open the BOM forecast (linked in the sidebar) to see the current conditions directly.",
          ],
        },
        {
          heading: "Surf — what the points need",
          paragraphs: [
            "Noosa’s points — First Bay, National Park, and Granite Bay — like a south-east groundswell with a period over 9 seconds and a wind from the same direction. When the wind goes north or north-west, the surface glass goes off and the points are at their best.",
            "Beginners and longboarders typically work the open beach at Main Beach or the south end of Sunshine Beach, where the swell has sorted itself out. The lifesavers patrol Main Beach during patrol season (typically September–April, daily in school holidays); see Beachsafe for the current flag position and patrol hours.",
          ],
          bullets: [
            "First Bay: works on south-east swell, period 9–12 s.",
            "National Park (Lifeguard Beach): south-east swell; respects the QPWS swimming enclosure boundary.",
            "Granite Bay: walk-in access only via the coastal track; check QPWS alerts before you walk.",
            "Main Beach: patrolled, the right place on a building south-easter.",
          ],
        },
        {
          heading: "Wind — the south-east is your friend",
          paragraphs: [
            "A typical winter morning runs 10–20 km/h south-east, which holds the surface together and lines the swell up against the points. The wind tends to clock around to the north-east by mid-afternoon; that’s when the south coast beaches come into their own. A westerly is rare and usually means a frontal system; expect gusts and a bumpy surface.",
          ],
        },
        {
          heading: "Tide — and the bar",
          paragraphs: [
            "Noosa River bar crossing conditions vary hour to hour with swell, wind, and tide. The Noosa River bar is shallow and shifts. Always check the MSQ Noosa bar report and listen to the Noosa Coast Guard broadcast (VHF channel 16 or 67) before attempting a crossing. If you are not confident in the conditions, do not cross — contact VMR Noosa or Noosa Coast Guard for a live reading. Do not rely on this website for navigation — we are a planning tool, not a navigational authority.",
            "Incoming tides with southerly winds are widely regarded as the most challenging combination for the Noosa River bar. Check the MSQ bulletin and defer if in doubt. The \"Sea level\" tile on this page is an Open-Meteo sea-level figure, not an authoritative tide reading — defer to the BOM Tewantin tide harmonic for any planned crossing.",
          ],
        },
        {
          heading: "UV — slip on a shirt before 9",
          paragraphs: [
            "The UV index on the Sunshine Coast reaches Extreme (>11) on clear summer days and rarely falls below Moderate (3–5) even in winter. Cancer Council SunSmart recommends protection from any UV ≥ 3, which in practice means a shirt, hat, sunscreen, and shade between 10 am and 3 pm year-round.",
          ],
        },
      ]}
      callout={{
        title: "Bar crossing safety",
        body: (
          <>
            The Noosa River bar is a bar — not a harbour entrance. Always defer
            to the MSQ Noosa bar report and the Noosa Coast Guard
            broadcast before crossing — conditions, swell direction, and
            tide turn change by the hour.{" "}
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
        variant: "rainforest",
      }}
      relatedLinks={[
        { label: "Noosa National Park", href: "/noosa-national-park", description: "Coastal walk and wildlife." },
        { label: "Boats & watercraft", href: "/boats-and-watercraft", description: "River bar, ramps, hire." },
        { label: "Webcams", href: "/webcams", description: "Council + SLSQ cams." },
        { label: "Accommodation", href: "/accommodation", description: "Where to stay for early surfs." },
      ]}
    />
  );
}
