import type { Metadata } from "next";
import {
  CommercialPage,
  AccommodationCard,
  HowWeChoose,
  WhyWeRecommend,
  ParentHubLink,
} from "@/components/commercial";
import { COMMERCIAL_PROPERTIES } from "@/data/commercial";
import { ACCOMM_FAMILY_RELATED } from "@/data/commercial-related";
import { VERIFIED } from "@/data/photos-msn2982";
import { buildPartnerLink } from "@/lib/affiliates";

export const metadata: Metadata = {
  title: "Noosa accommodation for families",
  description:
    "Where to stay in Noosa with kids — apartment-hotels with full kitchens, on-site pools, and walkable beaches.",
  alternates: { canonical: "/accommodation/families" },
  openGraph: {
    title: "Noosa accommodation for families · MyNoosaHeads",
    description: "Apartments with kitchens, pools, walkable beaches.",
    url: "/accommodation/families",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noosa accommodation for families",
    description: "Apartments with kitchens, pools, walkable beaches.",
  },
};

const FAMILY_PROPERTIES = COMMERCIAL_PROPERTIES.filter(
  (p) => p.familyFriendly && p.hasApartments,
);

export default function FamiliesPage() {
  return (
    <CommercialPage
      slug="accommodation/families"
      title="Noosa accommodation for families"
      description="Where to stay in Noosa with kids — apartment-hotels with full kitchens, on-site pools, and walkable beaches."
      category="Where to stay"
      intent="Family-friendly · apartment-hotels · pools · walkable beaches"
      h1={<>Noosa accommodation for families.</>}
      intro={
        <>
          Apartment-style rooms with full kitchens, laundry, and an on-site
          pool. Noosa is a five-night-stay minimum for most families — the
          kitchen matters, the pool matters, and the walk to the patrolled
          beach matters more than any single amenity.
        </>
      }
      hero={VERIFIED.cards.sunshineBeach}
      sections={[
        {
          heading: "What to look for.",
          body: (
            <>
              <p>
                <strong>Two- or three-bedroom apartments.</strong> Hotel-style
                rooms with one bed and a sofa bed work for a short stay; for
                five nights with kids, two separate bedrooms are the
                difference between a holiday and an endurance test.
              </p>
              <p>
                <strong>A full kitchen and laundry.</strong> Cereal, milk,
                yoghurt, sandwiches, washing swimsuits — these matter more
                than they read. Hastings Street and Noosaville both have
                Woolworths within driving distance; the apartment kitchen is
                the workhorse.
              </p>
              <p>
                <strong>On-site pool.</strong> The river is tidal and warm
                but it&apos;s a five-minute drive, not a one-minute walk. Most
                families want a pool two steps from the room.
              </p>
              <p>
                <strong>Walking distance to a patrolled beach.</strong>{" "}
                Sunshine Beach is across-the-road patrolled. Hastings Street
                is one minute. Noosaville is a ferry ride.
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
            Hastings Street is the walkable pick for families who want Main
            Beach at the bottom of the street. Noosaville is the river pick
            for families who want a kitchen, a pool, and a ferry ride to
            Hastings. Sunshine Beach is the surf pick for families who want
            the patrolled beach across the road and are happy to drive ten
            minutes back to the headland walk.
          </p>
        </>
      }
      methodology={
        <HowWeChoose
          criteria={[
            {
              criterion: "Two- or three-bedroom apartment configuration",
              rationale:
                "Family stays are five nights or longer; separate bedrooms matter.",
            },
            {
              criterion: "Full kitchen + laundry",
              rationale:
                "Self-catering and a place to wash swimsuits are the practical floor.",
            },
            {
              criterion: "On-site pool (heated if possible)",
              rationale:
                "The river is five minutes by car. A two-step pool is the family default.",
            },
            {
              criterion: "Honest trade-off",
              rationale:
                "Noosa fills in school holidays. We surface the booking lead time.",
            },
          ]}
        />
      }
      programmes={FAMILY_PROPERTIES.map((p) => p.programme)}
      priceSource="the operator's site"
      lastReviewed="2026-08-31"
      related={ACCOMM_FAMILY_RELATED}
      stickyPrimary={
        FAMILY_PROPERTIES[0]
          ? {
              label: "Check availability",
              href: FAMILY_PROPERTIES[0].url,
              placement: "families",
              external: FAMILY_PROPERTIES[0].programme !== "operator-direct",
            }
          : undefined
      }
    />
  );
}

function PicksGrid() {
  return (
    <>
      <p className="max-w-3xl">
        Three curated picks, each with a full kitchen, an on-site pool, and
        a walkable patrolled beach or ferry ride to one.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FAMILY_PROPERTIES.map((p) => (
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
                    `families-${p.name.toLowerCase().replace(/\s+/g, "-")}`,
                  )
            }
            placement={`families-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
            image={p.photo}
            location={p.hasApartments ? "Apartments · full kitchen" : undefined}
          />
        ))}
      </div>
      <div className="mt-8">
        <WhyWeRecommend
          for="South Pacific Resort & Spa Noosa"
          body="The South Pacific's heated lagoon pool is the single best family pool in Noosaville. Apartment-style rooms with full kitchens; five-minute walk to the Noosa Ferry wharf. Book two-to-three months ahead for school holidays."
          byline="Dexter · for MyNoosaHeads"
        />
      </div>
      <p className="mt-8 text-caption italic text-ink-600">
        <ParentHubLink href="/accommodation" label="all areas" />
      </p>
    </>
  );
}
