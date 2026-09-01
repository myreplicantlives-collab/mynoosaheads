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
  title: "Noosa accommodation near the beach",
  description:
    "Where to stay in Noosa when you want to be able to walk to the sand in under five minutes.",
  alternates: { canonical: "/accommodation/near-the-beach" },
  openGraph: {
    title: "Noosa accommodation near the beach · MyNoosaHeads",
    description: "Under-five-minute walks to the sand.",
    url: "/accommodation/near-the-beach",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noosa accommodation near the beach",
    description: "Under-five-minute walks to the sand.",
  },
};

const BEACH_PROPERTIES = COMMERCIAL_PROPERTIES.filter(
  (p) => p.walkableBeach || (p.beachBand && p.beachBand.includes("Ferry")),
);

export default function NearTheBeachPage() {
  return (
    <CommercialPage
      slug="accommodation/near-the-beach"
      title="Noosa accommodation near the beach"
      description="Where to stay in Noosa when you want to be able to walk to the sand in under five minutes."
      category="Where to stay"
      intent="Walk to the sand · under-five-minute"
      h1={<>Noosa accommodation near the beach.</>}
      intro={
        <>
          Walk-to-the-sand stays across the four precincts. Hastings Street
          (one minute to Main Beach) and Sunshine Beach (across the road from
          the patrolled section) are the literal walk-to-beach picks.
          Noosaville reaches the sand via a 15-minute ferry ride; Peregian
          is a five-minute walk to the patrolled section.
        </>
      }
      hero={{
        src: VERIFIED.cards.hastingsStreetWest.path,
        alt: VERIFIED.cards.hastingsStreetWest.caption,
      }}
      sections={[
        {
          heading: "What 'near the beach' means here.",
          body: (
            <>
              <p>
                We rank each pick by literal walking distance to the patrolled
                section of beach — the section with surf club toilets, showers,
                and flags. Hastings Street apartments are one-to-two minutes
                from the Main Beach patrolled section. Sunshine Beach
                Resort is across the road from the patrolled section. The
                Noosaville apartments are a 15-minute ferry ride from the
                Main Beach wharf.
              </p>
              <p>
                Unpatrolled sections of beach (Tea Tree Bay, Granite Bay,
                Alexandria Bay, Peregian&apos;s north end) are not within
                walking distance of any apartment on our shortlist. The
                headland walk is the way to reach them.
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
            Hastings Street apartments put you at the bottom of the Main
            Beach steps. Sunshine Beach Resort puts you across the road from
            the Sunshine Beach Surf Club. The South Pacific (Noosaville) is
            the river pick — a 15-minute ferry ride to the Main Beach wharf
            and a five-minute walk to the Gympie Terrace foreshore.
          </p>
        </>
      }
      methodology={
        <HowWeChoose
          criteria={[
            {
              criterion: "Walking distance to the patrolled section",
              rationale:
                "Surf club toilets, showers, and flags are the on-beach amenity that matters.",
            },
            {
              criterion: "Verified, not estimated",
              rationale:
                "Each pick carries an explicit beachBand — we don&apos;t estimate.",
            },
            {
              criterion: "Honest about the trade-off",
              rationale:
                "Hastings Street fills by 11 am in summer. Sunshine Beach is a ten-minute drive back to the headland.",
            },
          ]}
        />
      }
      programmes={BEACH_PROPERTIES.map((p) => p.programme)}
      priceSource="the operator's site"
      lastReviewed="2026-08-31"
      related={ACCOMM_AREA_RELATED}
    />
  );
}

function PicksGrid() {
  return (
    <>
      <p className="max-w-3xl">
        Three curated picks — each with an explicit walking distance to the
        patrolled section of beach.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {BEACH_PROPERTIES.map((p) => (
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
                    `near-the-beach-${p.name.toLowerCase().replace(/\s+/g, "-")}`,
                  )
            }
            placement={`near-the-beach-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
            image={p.photo}
            location={`${p.beachBand} to the beach`}
          />
        ))}
      </div>
      <div className="mt-8">
        <WhyWeRecommend
          for="Netanya Noosa"
          body="Netanya is the one-minute walk-to-the-sand pick — Hastings Street apartments at the southern end of the strip, two minutes from the Main Beach patrolled section. The trade-off is older bathrooms and Hastings Street paid parking fills by 11 am in summer."
          byline="Dexter · for MyNoosaHeads"
        />
      </div>
      <p className="mt-8 text-caption italic text-ink-600">
        <ParentHubLink href="/accommodation" label="all areas" />
      </p>
    </>
  );
}
