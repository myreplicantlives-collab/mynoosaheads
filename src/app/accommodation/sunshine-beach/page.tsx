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
  title: "Sunshine Beach accommodation",
  description:
    "Where to stay at Sunshine Beach — the patrolled surf south of the Noosa headland.",
  alternates: { canonical: "/accommodation/sunshine-beach" },
  openGraph: {
    title: "Sunshine Beach accommodation · MyNoosaHeads",
    description: "Patrolled surf south of the headland.",
    url: "/accommodation/sunshine-beach",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunshine Beach accommodation",
    description: "Patrolled surf south of the headland.",
  },
};

const SUNSHINE = COMMERCIAL_PROPERTIES.filter((p) => p.areaId === "sunshine");

export default function SunshineBeachPage() {
  return (
    <CommercialPage
      slug="accommodation/sunshine-beach"
      title="Sunshine Beach accommodation"
      description="Where to stay at Sunshine Beach — the patrolled surf south of the Noosa headland."
      category="Where to stay"
      intent="Sunshine Beach · south of the headland · dog-friendly options"
      h1={<>Sunshine Beach accommodation.</>}
      intro={
        <>
          The patrolled surf beach south of the Noosa headland. Quieter than
          Hastings Street; a ten-minute drive back to the headland walk. The
          village at the south end of Duke Street has a couple of cafés, a
          surf shop, and the Sunshine Beach Hotel — enough for a five-night
          stay without leaving the precinct, especially if you bring the dog.
        </>
      }
      hero={{
        src: VERIFIED.cards.sunshineBeach.path,
        alt: VERIFIED.cards.sunshineBeach.caption,
      }}
      sections={[
        {
          heading: "Who it's for.",
          body: (
            <>
              <p>
                Returning surfers, dog owners (verify each operator&apos;s dog
                policy before booking), families who don&apos;t need the
                Hastings Street evening commute. Sunshine Beach has its own
                patrolled beach with surf club toilets and showers; the
                village has the basics (cafés, a small supermarket, a couple
                of takeaway shops); Hastings Street is a ten-minute drive north.
              </p>
              <p>
                Sunshine Beach is the precinct where you walk the dog at 6 am
                on the patrolled section of beach (off-leash before 8 am and
                after 5 pm only — check the Noosa Council dog beach map).
                Most apartments have on-site parking; the village does not
                have paid parking pressure like Hastings Street.
              </p>
            </>
          ),
        },
        {
          heading: "What to expect.",
          body: (
            <>
              <p>
                Apartment-style rooms with full kitchens. The single curated
                pick sits directly across the road from the patrolled beach;
                dog-friendly units are available on request — confirm with the
                operator before booking.
              </p>
              <p>
                Sunshine Beach does not have a river — the precinct is
                hill-and-beach, not river. If you want a flat riverside walk,
                this isn&apos;t the precinct. If you want surf, this is the
                one.
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
            <strong>From Sunshine Coast Airport (MCY):</strong> ~25 minutes
            via the Sunshine Motorway. See{" "}
            <a href="/travel-and-transport/sunshine-coast-airport-to-noosa" className="link text-ocean-700">
              MCY → Noosa transfers
            </a>
            .
          </p>
          <p>
            <strong>From Brisbane Airport (BNE):</strong> ~2 hours. Sunshine
            Beach is a reasonable base if you want surf + quiet over Hastings
            Street restaurants. See{" "}
            <a href="/travel-and-transport/brisbane-airport-to-noosa" className="link text-ocean-700">
              BNE → Noosa transfers
            </a>
            .
          </p>
          <p>
            <strong>Once in Sunshine Beach:</strong> park once. The beach is
            across the road; the headland walk is a 30-minute coastal walk or
            a ten-minute drive.
          </p>
        </>
      }
      methodology={
        <HowWeChoose
          criteria={[
            {
              criterion: "Verified dog policy",
              rationale:
                "Each pick discloses whether dogs are accepted; Sunshine Beach is the precinct where dogs matter most.",
            },
            {
              criterion: "Walking distance to the patrolled beach",
              rationale:
                "Surf club showers, toilets, and flags are the on-beach amenity that matters.",
            },
            {
              criterion: "Honest trade-off",
              rationale:
                "Sunshine Beach is not Hastings Street. We surface the evening commute and the lack of river-side walk.",
            },
          ]}
        />
      }
      programmes={SUNSHINE.map((p) => p.programme)}
      priceSource="Booking.com (property-name search)"
      lastReviewed="2026-08-31"
      related={ACCOMM_AREA_RELATED}
      stickyPrimary={
        SUNSHINE[0]
          ? {
              label: "Check availability",
              href: SUNSHINE[0].url,
              placement: "sunshine-beach",
              external: true,
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
        Sunshine Beach has a smaller accommodation stock than Hastings Street
        or Noosaville. The single curated pick below sits directly across
        from the patrolled beach; dog-friendly units are available on
        request.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SUNSHINE.map((p) => (
          <AccommodationCard
            key={p.name}
            name={p.name}
            descriptor={p.descriptor}
            bestFor={p.bestFor}
            programme={p.programme}
            href={buildPartnerLink(
              p.programme,
              p.url,
              `sunshine-beach-${p.name.toLowerCase().replace(/\s+/g, "-")}`,
            )}
            placement={`sunshine-beach-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
            image={p.photo}
            location={`${p.beachBand} to the beach`}
          />
        ))}
      </div>
      <div className="mt-8">
        <WhyWeRecommend
          for="Sunshine Beach Resort"
          body="Directly across the road from the patrolled Sunshine Beach surf club. The property accepts dogs in selected units — confirm with the operator before booking. The trade-off is that Hastings Street is a ten-minute drive (or a 30-minute coastal walk via the headland), and the on-site restaurant is closed."
          byline="Dexter · for MyNoosaHeads"
        />
      </div>
      <p className="mt-8 text-caption italic text-ink-600">
        <ParentHubLink href="/accommodation" label="all areas" />
      </p>
    </>
  );
}
