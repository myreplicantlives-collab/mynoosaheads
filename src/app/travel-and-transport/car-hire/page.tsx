import type { Metadata } from "next";
import {
  CommercialPage,
  ActivityCard,
  HowWeChoose,
  WhyWeRecommend,
  ParentHubLink,
} from "@/components/commercial";
import { CAR_HIRE_OPERATORS } from "@/data/commercial";
import { ACTIVITY_DEEP_RELATED } from "@/data/commercial-related";
import { VERIFIED } from "@/data/photos-msn2982";

export const metadata: Metadata = {
  title: "Noosa car hire",
  description:
    "Where to hire a car in Noosa — local operators at Sunshine Coast Airport + Noosa depots.",
  alternates: { canonical: "/travel-and-transport/car-hire" },
  openGraph: {
    title: "Noosa car hire · MyNoosaHeads",
    description: "Local operators at MCY + Noosa depots.",
    url: "/travel-and-transport/car-hire",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noosa car hire",
    description: "Local operators at MCY + Noosa depots.",
  },
};

export default function CarHirePage() {
  return (
    <CommercialPage
      slug="travel-and-transport/car-hire"
      title="Noosa car hire"
      description="Where to hire a car in Noosa — local operators at Sunshine Coast Airport + Noosa depots."
      category="Travel & transport"
      intent="Hire car · MCY desks · Noosa depots"
      h1={<>Noosa car hire.</>}
      intro={
        <>
          A hire car is the right pick if you want to visit the hinterland
          villages (Pomona, Cooran, Kin Kin), explore the beaches south of
          Noosa Heads, or do a day trip to the Glass House Mountains.
          Local operators with Sunshine Coast Airport desks plus Noosa
          depots are the practical options.
        </>
      }
      hero={VERIFIED.cards.noosaRainforest}
      sections={[
        {
          heading: "When a hire car helps.",
          body: (
            <>
              <p>
                <strong>Hinterland day trips.</strong> Eumundi (15 min),
                Cooroy (15 min), Pomona (30 min), Kin Kin (40 min). All
                impractical without a car — there&apos;s no scheduled public
                transport to Pomona or Kin Kin.
              </p>
              <p>
                <strong>Beach hopping.</strong> Peregian Beach (10 min),
                Marcus Beach (15 min), Coolum (25 min), Sunshine Beach (10
                min). The bus runs but slowly.
              </p>
              <p>
                <strong>Self-catering.</strong> A car to Woolworths or
                Coles in Noosaville makes the kitchen work. Without one
                you&apos;re stuck with the smaller Hastings Street shops.
              </p>
            </>
          ),
        },
        {
          heading: "When you don&apos;t need one.",
          body: (
            <>
              <p>
                If you&apos;re staying in Hastings Street or Noosaville for
                five nights and don&apos;t plan to leave the precinct, skip
                the hire car. See{" "}
                <a href="/accommodation/without-a-car" className="link text-ocean-800">
                  Where to stay without a car
                </a>
                .
              </p>
              <p>
                If you want a Sunshine Coast surf safari (drive between
                beach breaks), a hire car is the right pick.
              </p>
            </>
          ),
        },
        {
          heading: "Picks.",
          body: (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {CAR_HIRE_OPERATORS.map((op) => (
                <ActivityCard
                  key={op.name}
                  operator={op.name}
                  descriptor={op.descriptor}
                  bestFor={op.bestFor}
                  duration={op.duration}
                  priceBand={op.priceBand}
                  href={op.url}
                  placement={`car-hire-${op.name.toLowerCase().replace(/\s+/g, "-")}`}
                  image={op.photo}
                  useTourCTA={false}
                  ctaLabel="Check hire rates"
                />
              ))}
            </div>
          ),
        },
        {
          heading: "Booking tips.",
          body: (
            <>
              <p>
                <strong>Book ahead.</strong> MCY desks fill up in summer
                (December–February) and on long weekends. Booking 4–6 weeks
                ahead typically gives the best rate.
              </p>
              <p>
                <strong>Compare the international networks.</strong> Avis,
                Budget, Hertz, Thrifty, Redspot, Sixt all have MCY desks.
                The international brand rates are sometimes higher than
                local operators (Bayswater, Sunshine Coast Car Rentals) for
                the same car class — check both before booking.
              </p>
              <p>
                <strong>Check the licence and age requirements.</strong>{" "}
                Most operators require the driver to be 21+; under-25s often
                pay a young-driver surcharge.
              </p>
            </>
          ),
        },
      ]}
      locationContext={
        <>
          <p>
            From MCY: 30 minutes north to Noosa via the Sunshine Motorway.
            Hire car desks are in the terminal arrivals hall.
          </p>
          <p>
            From BNE: 2 hours via the M1 and the Eumundi–Noosa Road.
            Hire car desks at BNE are in each terminal&apos;s arrivals hall.
            See{" "}
            <a href="/travel-and-transport/brisbane-airport-to-noosa" className="link text-ocean-800">
              BNE → Noosa
            </a>
            .
          </p>
        </>
      }
      methodology={
        <HowWeChoose
          criteria={[
            {
              criterion: "Local + international operators",
              rationale:
                "Local operators sometimes beat the international brand rates; we surface both.",
            },
            {
              criterion: "MCY desks + Noosa depots",
              rationale:
                "The right pick is whichever is closer to where you start the trip.",
            },
            {
              criterion: "Honest about when a hire car helps",
              rationale:
                "Not every visitor needs a hire car — we surface the alternatives.",
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
