import type { Metadata } from "next";
import {
  CommercialPage,
  AccommodationCard,
  HowWeChoose,
  WhyWeRecommend,
  ParentHubLink,
} from "@/components/commercial";
import { COMMERCIAL_PROPERTIES } from "@/data/commercial";
import { ACCOMM_AREA_RELATED } from "@/data/commercial-related";
import { VERIFIED } from "@/data/photos-msn2982";
import { buildPartnerLink } from "@/lib/affiliates";

export const metadata: Metadata = {
  title: "Hastings Street accommodation",
  description:
    "Where to stay on Hastings Street — the walkable strip from Main Beach to the headland.",
  alternates: { canonical: "/accommodation/hastings-street" },
  openGraph: {
    title: "Hastings Street accommodation · MyNoosaHeads",
    description: "Walk to Main Beach from Hastings Street.",
    url: "/accommodation/hastings-street",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hastings Street accommodation",
    description: "Walk to Main Beach from Hastings Street.",
  },
};

const HASTINGS = COMMERCIAL_PROPERTIES.filter((p) => p.areaId === "hastings");

export default function HastingsStreetPage() {
  return (
    <CommercialPage
      slug="accommodation/hastings-street"
      title="Hastings Street accommodation"
      description="Where to stay on Hastings Street — the walkable strip from Main Beach to the headland."
      category="Where to stay"
      intent="Hastings Street · 800 metres from Main Beach to the headland"
      h1={<>Hastings Street accommodation.</>}
      intro={
        <>
          Eight hundred metres of restaurants, boutiques, and apartment-hotels
          with Main Beach at one end and the Noosa National Park headland at the
          other. If you want to park the car once and walk to dinner, this is
          the precinct. Book early for September, Easter, and the Noosa Festival
          of Surfing (March) — Hastings Street fills two-to-three months out.
        </>
      }
      hero={{
        src: VERIFIED.cards.hastingsStreetWest.path,
        alt: VERIFIED.cards.hastingsStreetWest.caption,
      }}
      sections={[
        {
          heading: "Who it's for.",
          body: (
            <>
              <p>
                Visitors who would rather walk than drive once they arrive.
                Hastings Street runs from the Surf Club car park at the beach to
                the entrance of Noosa National Park at the headland — every
                restaurant, café, and boutique is on this one street. The ferry
                to Noosaville and the Gympie Terrace foreshore is a 15-minute
                walk back across the river via the Noosa Ferry.
              </p>
              <p>
                If you have young children, Hastings Street is the easiest
                precinct — the patrolled Main Beach is at the bottom of every
                cross-street, the surf club has showers and toilets, and the
                headland walk starts where the street ends. The downside is
                Hastings Street paid parking fills by 11 am in summer; the
                apartments below all sell parking permits.
              </p>
            </>
          ),
        },
        {
          heading: "What to expect.",
          body: (
            <>
              <p>
                Two-to-three-bedroom apartment-style rooms with full kitchens and
                laundry. Most have small balconies over Hastings Street — the
                rooms at the back are quieter. The older apartments (built in
                the 1980s and 90s) have older-fit bathrooms; the newer ones
                (built in the 2010s) trade off some kitchen size for bigger
                bathrooms and better storage.
              </p>
              <p>
                None of the Hastings Street apartments have a heated pool
                (outdoor only); the apartment at the bottom of the list is the
                closest to the patrolled beach and has the strongest family set.
              </p>
            </>
          ),
        },
        {
          heading: "Picks.",
          body: <PicksGrid />,
        },
      ]}
      locationContext={
        <>
          <p>
            <strong>From Brisbane Airport (BNE):</strong> ~2 hours via the
            Bruce Highway (M1) and the Eumundi–Noosa Road. See{" "}
            <a href="/travel-and-transport/brisbane-airport-to-noosa" className="link text-ocean-800">
              BNE → Noosa transfers
            </a>
            .
          </p>
          <p>
            <strong>From Sunshine Coast Airport (MCY):</strong> ~30 minutes via
            the Sunshine Motorway. See{" "}
            <a href="/travel-and-transport/sunshine-coast-airport-to-noosa" className="link text-ocean-800">
              MCY → Noosa transfers
            </a>
            .
          </p>
          <p>
            <strong>Once on Hastings Street:</strong> park once. Walk to the
            beach, walk to dinner, walk to the headland. The Noosa Ferry
            connects Hastings to Noosaville if you want a change of scene.
          </p>
        </>
      }
      methodology={
        <HowWeChoose
          criteria={[
            {
              criterion: "Operator-direct or verifiable network listing",
              rationale:
                "We list operators with a working booking URL and a recent last-verified date.",
            },
            {
              criterion: "Walking distance to Main Beach",
              rationale:
                "Hastings Street's value is the walkable access to Main Beach and the headland.",
            },
            {
              criterion: "Family-friendly room configuration",
              rationale:
                "Two- and three-bedroom apartments with full kitchens are the sweet spot for family stays.",
            },
            {
              criterion: "Honest trade-off",
              rationale:
                "We surface the parking, the older bathrooms, and the noise — not just the photo.",
            },
          ]}
        />
      }
      programmes={HASTINGS.map((p) => p.programme)}
      priceSource="the operator's site"
      lastReviewed="2026-08-31"
      related={ACCOMM_AREA_RELATED}
      stickyPrimary={
        HASTINGS[0]
          ? {
              label: "Check availability",
              href: HASTINGS[0].url,
              placement: "hastings-street",
              external: HASTINGS[0].programme !== "operator-direct",
            }
          : undefined
      }
    />
  );
}

function PicksGrid() {
  if (HASTINGS.length === 0) {
    return (
      <p>
        No Hastings Street properties currently meet the editorial bar. See{" "}
        <a href="/accommodation" className="link text-ocean-800">
          all areas
        </a>{" "}
        for the full shortlist.
      </p>
    );
  }
  return (
    <>
      <p className="max-w-3xl">
        Hastings Street has a small number of apartment properties. Each link
        below goes to the operator or to a Booking.com property-name search.
        Verify availability directly — we don&apos;t surface live pricing.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {HASTINGS.map((p) => (
          <AccommodationCard
            key={p.name}
            name={p.name}
            descriptor={p.descriptor}
            bestFor={p.bestFor}
            programme={p.programme}
            href={
              p.programme === "operator-direct"
                ? p.url
                : buildPartnerLink(
                    p.programme,
                    p.url,
                    `hastings-street-${p.name.toLowerCase().replace(/\s+/g, "-")}`,
                  )
            }
            placement={`hastings-street-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
            image={p.photo}
            location={`${p.beachBand} to the beach`}
          />
        ))}
      </div>
      <div className="mt-8">
        <WhyWeRecommend
          for="Netanya Noosa"
          body="Netanya is the apartment-hotel that closes the loop on Hastings Street — two- and three-bedroom apartments, full kitchens, on-site parking (Hastings Street parking sells out by 11 am in summer). The trade-off is older bathrooms and a tighter pool deck than the newer build across the road."
          byline="Dexter · for MyNoosaHeads"
        />
      </div>
      <p className="mt-8 text-caption italic text-ink-600">
        <ParentHubLink href="/accommodation" label="all areas" />
      </p>
    </>
  );
}
