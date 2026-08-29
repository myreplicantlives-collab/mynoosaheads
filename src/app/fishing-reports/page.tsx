import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Fishing reports",
  description:
    "Weekly Noosa-region fishing insight, current QLD recreational fishing rules, BOM tide tables, and primary sources.",
  alternates: { canonical: "/fishing-reports" },
  openGraph: {
    title: "Fishing reports · MyNoosaHeads",
    description: "Weekly Noosa-region fishing insight, current QLD recreational fishing rules, BOM tide tables, and primary sources.",
    url: "/fishing-reports",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Fishing reports · MyNoosaHeads",
    description: "Weekly Noosa-region fishing insight, current QLD recreational fishing rules, BOM tide tables, and primary sources.",
  },
};

export default function Page() {
  return (
    <CategoryPage
      slug="fishing-reports"
      eyebrow="Recreational fishing · QLD rules apply"
      title="Fishing in Noosa"
      subtitle="Recreational fishing in Queensland is governed by a size-and-possession-limit framework administered by the Department of Primary Industries. The BOM tide for Tewantin and the sun-moon data on this page help you pick a window. The rest is up to you — and the fish."
      flourish="A light spin at first light."
      primarySources={[
        { label: "QLD recreational fishing rules", href: "https://www.qld.gov.au/recreation/activities/boating-fishing" },
        { label: "QLD fishing — size and possession limits", href: "https://www.qld.gov.au/recreation/activities/boating-fishing" },
        { label: "BOM — Tewantin tide", href: "https://www.bom.gov.au/australia/tides/#!/qld-tewantin" },
        { label: "QLD freshwater fishing", href: "https://www.qld.gov.au/recreation/activities/boating-fishing" },
      ]}
      bodySections={[
        {
          heading: "What you can take",
          paragraphs: [
            "The QLD recreational fishing rules set out size limits, possession limits, and closed seasons for each species. Common Noosa targets — bream, flathead, whiting, dart, and tailor — are well covered in the tables. Marine crustaceans (mud crabs, sand crabs) have separate rules. The full table is on the QLD site; link in the sidebar.",
            "If you’re heading out for the first time, take a screenshot of the rules table for the species you’re targeting. Infringement notices are issued on the spot; the fine schedule is published by QPS.",
          ],
        },
        {
          heading: "Where to fish",
          paragraphs: [
            "The Noosa River is the easiest access: flathead and bream along the sand flats, whiting on the grass beds, and the occasional threadfin salmon in the deeper holes. The river mouth is closed to all net fishing; line fishing is fine.",
            "Off the surf beaches: tailor and dart on the gutters during a run-out tide; bream at first light around the rock walls. The rocks at the headland are technical — stay off the wet rocks and keep an eye on the swell.",
          ],
        },
        {
          heading: "When to fish — tides and moon",
          paragraphs: [
            "The old saw is that the change of the tide is the bite. In practice, on the Noosa River the last two hours of the outgoing tide and the first two hours of the incoming are the productive windows. The solunar table on this page (sun + moon) is the same data printed in the almanacs; treat it as a tiebreaker, not a guarantee.",
          ],
        },
        {
          heading: "Boat fishing",
          paragraphs: [
            "If you’re fishing outside the bar, check the BOM forecast and the MSQ bar crossing bulletin the morning of. The bar is shallow and shifts. If you don’t know the bar well, go with a local for the first crossing.",
          ],
        },
        {
          heading: "What this page doesn’t do",
          paragraphs: [
            "We don’t run a live fish-catch feed. Catch data is sometimes available via subscription services; we don’t participate. The point of this page is the rules and the tides — both are public, both are free, and both are easy to get wrong.",
          ],
        },
      ]}
      callout={{
        title: "Why we don’t run a live catch feed",
        body: (
          <>
            This page carries the rules, the tides, and the sources. A live
            weekly species-and-bite-rate feed would be useful; it is not free
            and it is not in our current scope. We will revisit when a
            public data source appears.
          </>
        ),
        variant: "ocean",
      }}
      relatedLinks={[
        { label: "Surf & weather", href: "/surf-and-weather", description: "BOM marine forecast." },
        { label: "Boats & watercraft", href: "/boats-and-watercraft", description: "Ramps and bar crossings." },
      ]}
    />
  );
}
