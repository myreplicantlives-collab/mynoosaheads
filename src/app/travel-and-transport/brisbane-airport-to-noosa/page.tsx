import type { Metadata } from "next";
import {
  CommercialPage,
  ActivityCard,
  ComparisonTable,
  HowWeChoose,
  WhyWeRecommend,
  ParentHubLink,
} from "@/components/commercial";
import { BNE_TRANSFER_OPERATORS } from "@/data/commercial";
import { ACTIVITY_DEEP_RELATED } from "@/data/commercial-related";
import { VERIFIED } from "@/data/photos-msn2982";

export const metadata: Metadata = {
  title: "Brisbane Airport to Noosa",
  description:
    "How to get from Brisbane Airport (BNE) to Noosa — coach, private transfer, and self-drive options.",
  alternates: { canonical: "/travel-and-transport/brisbane-airport-to-noosa" },
  openGraph: {
    title: "Brisbane Airport to Noosa · MyNoosaHeads",
    description: "Coach + private transfer + self-drive.",
    url: "/travel-and-transport/brisbane-airport-to-noosa",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brisbane Airport to Noosa",
    description: "Coach + private transfer + self-drive.",
  },
};

export default function BrisbaneAirportToNoosaPage() {
  return (
    <CommercialPage
      slug="travel-and-transport/brisbane-airport-to-noosa"
      title="Brisbane Airport to Noosa"
      description="How to get from Brisbane Airport (BNE) to Noosa — coach, private transfer, and self-drive options."
      category="Travel & transport"
      intent="BNE → Noosa · ~2 hours · coach / private / self-drive"
      h1={<>Brisbane Airport to Noosa.</>}
      intro={
        <>
          Brisbane Airport (BNE) is the international gateway to the
          Sunshine Coast. The drive to Noosa is approximately two hours
          via the Bruce Highway (M1) and the Eumundi–Noosa Road. Three
          options: scheduled coach transfer (cheapest), private transfer
          (most convenient), self-drive hire car (most flexible).
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
              caption="Each row is one decision factor. Bands are typical mid-range, not exact."
              source="Verified via operator websites and the BNE ↔ Noosa driving distance (Google Maps)."
              columns={[
                { heading: "Coach (Con-x-ion)", bestFor: "Budget · solo travellers" },
                { heading: "Private transfer", bestFor: "Family · door-to-door" },
                { heading: "Self-drive hire car", bestFor: "Flexibility · hinterland trips" },
              ]}
              rows={[
                {
                  label: "Approx cost (per person)",
                  values: ["Mid-range", "Higher", "Mid-range + fuel"],
                },
                {
                  label: "Door-to-door",
                  values: ["No (terminal pickup)", "Yes", "Yes (with car)"],
                },
                {
                  label: "Travel time",
                  values: ["~2 hours", "~2 hours", "~2 hours"],
                },
                {
                  label: "Flexibility on arrival",
                  values: ["Limited", "Limited", "Full"],
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
              {BNE_TRANSFER_OPERATORS.map((op) => (
                <ActivityCard
                  key={op.name}
                  operator={op.name}
                  descriptor={op.descriptor}
                  bestFor={op.bestFor}
                  duration={op.duration}
                  priceBand={op.priceBand}
                  href={op.url}
                  placement={`bne-transfer-${op.name.toLowerCase().replace(/\s+/g, "-")}`}
                  image={op.photo}
                  useTourCTA={false}
                  ctaLabel="Book transfer"
                />
              ))}
            </div>
          ),
        },
        {
          heading: "Driving it yourself.",
          body: (
            <>
              <p>
                The Bruce Highway (M1) from BNE to the Eumundi–Noosa turnoff
                is mostly dual-carriageway. After the Eumundi turnoff it&apos;s
                a single-carriageway rural road for the last 30 minutes —
                one lane each way, frequent passing lanes, kangaroos at dusk.
                Budget 1h 50min–2h 20min depending on traffic.
              </p>
              <p>
                <strong>Hire car desks at BNE</strong> are in the terminal
                arrivals hall (domestic and international). All major
                networks are present; book ahead for the best rates.
                Most operators require a credit card for the deposit.
              </p>
              <p>
                <strong>Live road conditions:</strong>{" "}
                <a
                  href="https://qldtraffic.qld.gov.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link text-ocean-700"
                >
                  qldtraffic.qld.gov.au
                </a>
                . Check before you drive — accidents on the M1 will add an
                hour to a Friday afternoon.
              </p>
            </>
          ),
        },
      ]}
      locationContext={
        <>
          <p>
            BNE has two terminals: domestic (T1) and international (T2).
            Coach and private transfer operators pick up at both. Hire car
            desks are in the arrivals hall of each terminal.
          </p>
          <p>
            The drive to Noosa is approximately two hours via the M1 and
            the Eumundi–Noosa Road. Traffic peaks Friday afternoon (southbound
            to the Sunshine Coast) and Sunday afternoon (northbound to BNE).
          </p>
        </>
      }
      methodology={
        <HowWeChoose
          criteria={[
            {
              criterion: "Operator-direct + price band",
              rationale:
                "We surface the cost band on each card; the exact price is set by the operator.",
            },
            {
              criterion: "Honest about the trade-off",
              rationale:
                "Coach is cheapest, private is most convenient, hire car is most flexible. There is no single right answer.",
            },
            {
              criterion: "Live road conditions linked",
              rationale:
                "The M1 backs up on Friday afternoons — we surface the live traffic link.",
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
