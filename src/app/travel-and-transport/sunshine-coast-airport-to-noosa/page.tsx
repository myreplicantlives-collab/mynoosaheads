import type { Metadata } from "next";
import {
  CommercialPage,
  ActivityCard,
  ComparisonTable,
  HowWeChoose,
  WhyWeRecommend,
  ParentHubLink,
} from "@/components/commercial";
import { MCY_TRANSFER_OPERATORS } from "@/data/commercial";
import { ACTIVITY_DEEP_RELATED } from "@/data/commercial-related";
import { VERIFIED } from "@/data/photos-msn2982";

export const metadata: Metadata = {
  title: "Sunshine Coast Airport to Noosa",
  description:
    "How to get from Sunshine Coast Airport (MCY) to Noosa — coach, taxi, and self-drive hire car options.",
  alternates: { canonical: "/travel-and-transport/sunshine-coast-airport-to-noosa" },
  openGraph: {
    title: "Sunshine Coast Airport to Noosa · MyNoosaHeads",
    description: "Coach + taxi + self-drive.",
    url: "/travel-and-transport/sunshine-coast-airport-to-noosa",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunshine Coast Airport to Noosa",
    description: "Coach + taxi + self-drive.",
  },
};

export default function SunshineCoastAirportToNoosaPage() {
  return (
    <CommercialPage
      slug="travel-and-transport/sunshine-coast-airport-to-noosa"
      title="Sunshine Coast Airport to Noosa"
      description="How to get from Sunshine Coast Airport (MCY) to Noosa — coach, taxi, and self-drive hire car options."
      category="Travel & transport"
      intent="MCY → Noosa · ~30 minutes · coach / taxi / self-drive"
      h1={<>Sunshine Coast Airport to Noosa.</>}
      intro={
        <>
          Sunshine Coast Airport (MCY) at Marcoola is the closer airport to
          Noosa — about 30 minutes via the Sunshine Motorway. Three options:
          scheduled coach (cheapest), taxi from the rank (most convenient),
          self-drive hire car (most flexible).
        </>
      }
      hero={{
        src: VERIFIED.cards.noosaRainforest.path,
        alt: VERIFIED.cards.noosaRainforest.caption,
      }}
      sections={[
        {
          heading: "The three options at a glance.",
          body: (
            <ComparisonTable
              caption="MCY ↔ Noosa is short enough that cost usually trumps time."
              source="Verified via operator websites and the MCY ↔ Noosa driving distance (Google Maps)."
              columns={[
                { heading: "Coach (Con-x-ion)", bestFor: "Budget · solo" },
                { heading: "Taxi (rank)", bestFor: "Walk-up · metered" },
                { heading: "Self-drive hire car", bestFor: "Flexibility · hinterland" },
              ]}
              rows={[
                {
                  label: "Approx cost",
                  values: ["Low", "Mid-range", "Mid-range + fuel"],
                },
                {
                  label: "Travel time",
                  values: ["~30 min", "~30 min", "~30 min"],
                },
                {
                  label: "Door-to-door",
                  values: ["No (terminal pickup)", "Yes", "Yes (with car)"],
                },
                {
                  label: "Hire car desks at MCY",
                  values: ["n/a", "n/a", "Yes (multiple)"],
                },
                {
                  label: "Hinterland day trips",
                  values: ["Not viable", "Not viable", "Viable"],
                },
              ]}
            />
          ),
        },
        {
          heading: "Picks.",
          body: (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {MCY_TRANSFER_OPERATORS.map((op) => (
                <ActivityCard
                  key={op.name}
                  operator={op.name}
                  descriptor={op.descriptor}
                  bestFor={op.bestFor}
                  duration={op.duration}
                  priceBand={op.priceBand}
                  href={op.url}
                  placement={`mcy-transfer-${op.name.toLowerCase().replace(/\s+/g, "-")}`}
                  image={op.photo}
                  useTourCTA={false}
                  ctaLabel="Book transfer"
                />
              ))}
            </div>
          ),
        },
        {
          heading: "Why most visitors pick MCY.",
          body: (
            <>
              <p>
                MCY is closer than BNE for most Australian visitors — direct
                flights from Sydney and Melbourne run year-round, with
                seasonal flights from Adelaide and Auckland. The
                terminal is small and the hire car desks are a 30-second
                walk from baggage claim.
              </p>
              <p>
                International visitors from Europe typically fly into BNE
                and connect to MCY via a domestic flight, or drive the M1.
                See{" "}
                <a href="/travel-and-transport/brisbane-airport-to-noosa" className="link text-ocean-700">
                  BNE → Noosa
                </a>
                .
              </p>
            </>
          ),
        },
      ]}
      locationContext={
        <>
          <p>
            MCY is at Marcoola, 30 minutes north of Noosa via the Sunshine
            Motorway. The hire car desks are in the terminal arrivals hall.
            The taxi rank is outside the terminal building.
          </p>
          <p>
            From MCY, the route to Noosa is via the Sunshine Motorway
            northbound. Light traffic at most hours; weekend peak is
            Sunday afternoon.
          </p>
        </>
      }
      methodology={
        <HowWeChoose
          criteria={[
            {
              criterion: "Operator-direct + price band",
              rationale:
                "Cost band surfaced on each card; exact fare set by the operator.",
            },
            {
              criterion: "Honest about the trade-off",
              rationale:
                "Coach vs taxi vs hire car is a budget-vs-flexibility decision. No single right answer.",
            },
            {
              criterion: "MCY-vs-BNE surfaced",
              rationale:
                "Most domestic visitors pick MCY. The BNE page handles the international and budget cases.",
            },
          ]}
        />
      }
      programmes={["operator-direct"]}
      priceSource="the operator's site"
      lastReviewed="2026-08-31"
      related={ACTIVITY_DEEP_RELATED}
    />
  );
}
