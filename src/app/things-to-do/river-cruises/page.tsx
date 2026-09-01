import type { Metadata } from "next";
import {
  CommercialPage,
  ActivityCard,
  HowWeChoose,
  WhyWeRecommend,
  ParentHubLink,
} from "@/components/commercial";
import { RIVER_CRUISE_OPERATORS } from "@/data/commercial";
import { ACTIVITY_HUB_RELATED } from "@/data/commercial-related";
import { VERIFIED } from "@/data/photos-msn2982";

export const metadata: Metadata = {
  title: "Noosa River cruises",
  description:
    "Public ferry, lunch cruise, and sunset charters — how to get on the Noosa River without a car.",
  alternates: { canonical: "/things-to-do/river-cruises" },
  openGraph: {
    title: "Noosa River cruises · MyNoosaHeads",
    description: "Public ferry, lunch cruise, sunset charters.",
    url: "/things-to-do/river-cruises",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noosa River cruises",
    description: "Public ferry, lunch cruise, sunset charters.",
  },
};

export default function RiverCruisesPage() {
  return (
    <CommercialPage
      slug="things-to-do/river-cruises"
      title="Noosa River cruises"
      description="Public ferry, lunch cruise, and sunset charters — how to get on the Noosa River without a car."
      category="Things to do"
      intent="Public ferry + lunch cruise + sunset charter"
      h1={<>Noosa River cruises.</>}
      intro={
        <>
          The Noosa River is eight kilometres of calm tidal water with
          paperbark-lined banks. Three ways to get on it: the Noosa Ferry
          (hop-on-hop-off public service), a scheduled lunch or sunset
          cruise, or a private charter. The ferry is the right pick for
          car-free visitors; the cruises are the right pick for a special
          evening.
        </>
      }
      hero={{
        src: VERIFIED.cards.morningRiver.path,
        alt: VERIFIED.cards.morningRiver.caption,
      }}
      sections={[
        {
          heading: "Three ways on the river.",
          body: (
            <>
              <p>
                <strong>Noosa Ferry</strong> runs every 30 minutes in summer
                between Noosa Heads (Hastings Street end) and Noosaville
                (Gympie Terrace end), with stops at the Noosa Heads wharf,
                the Noosaville ferry wharf, and a handful of mid-river
                stops. The all-day pass is the right ticket for
                day-hopping visitors.
              </p>
              <p>
                <strong>Noosa River Cruises</strong> runs scheduled lunch
                and sunset cruises from the Noosaville wharf. The lunch
                cruise is a relaxed two-hour option with a sit-down meal;
                the sunset cruise is the most popular evening option.
              </p>
              <p>
                <strong>Noosa Ocean Kayak Tours</strong> runs guided kayak
                tours of the lower Noosa River. The kayak tours are the
                closest to a hands-on option; the ferry and the lunch
                cruise are the sit-back options.
              </p>
            </>
          ),
        },
        {
          heading: "Picks.",
          body: (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {RIVER_CRUISE_OPERATORS.map((op) => (
                <ActivityCard
                  key={op.name}
                  operator={op.name}
                  descriptor={op.descriptor}
                  bestFor={op.bestFor}
                  duration={op.duration}
                  priceBand={op.priceBand}
                  href={op.url}
                  placement={`river-cruises-${op.name.toLowerCase().replace(/\s+/g, "-")}`}
                  image={op.photo}
                  useTourCTA
                  ctaLabel={
                    op.name === "Noosa Ferry"
                      ? "Check ferry timetable"
                      : "View tour options"
                  }
                />
              ))}
            </div>
          ),
        },
        {
          heading: "Timetable + booking tips.",
          body: (
            <>
              <p>
                The Noosa Ferry runs every 30 minutes in summer between
                Noosa Heads and Noosaville. Last ferry from Noosa Heads
                is around 9 pm in summer; earlier in winter. The all-day
                pass is the cheapest option for visitors who want to hop
                on and off — most families use it twice in one day.
              </p>
              <p>
                The lunch and sunset cruises are scheduled and seat-limited;
                book ahead in school holidays and over December–February.
                The sunset cruise is the most popular evening option —
                bring a light jacket in winter.
              </p>
            </>
          ),
        },
      ]}
      locationContext={
        <>
          <p>
            The Noosa Heads wharf is at the bottom of Hastings Street — walk
            down from any Hastings Street apartment. The Noosaville wharf
            is on Gympie Terrace — a five-minute walk from South Pacific
            Resort & Spa.
          </p>
          <p>
            The ferry connects the two; you don&apos;t need a car to use
            either end. See{" "}
            <a href="/accommodation/without-a-car" className="link text-ocean-700">
              Where to stay without a car
            </a>
            .
          </p>
        </>
      }
      methodology={
        <HowWeChoose
          criteria={[
            {
              criterion: "Operator-direct",
              rationale:
                "Every operator links to their own site; the ferry timetable is live on the Noosa Ferry site.",
            },
            {
              criterion: "Honest about the three categories",
              rationale:
                "Public service, scheduled cruise, and guided kayak are three different products.",
            },
            {
              criterion: "Surface the timetable",
              rationale:
                "The ferry is half the value of being without a car. We link to the live timetable.",
            },
          ]}
        />
      }
      programmes={["operator-direct"]}
      priceSource="the operator's site"
      lastReviewed="2026-08-31"
      related={ACTIVITY_HUB_RELATED}
    />
  );
}
