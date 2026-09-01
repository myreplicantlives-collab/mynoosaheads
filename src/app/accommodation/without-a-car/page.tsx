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
  title: "Where to stay in Noosa without a car",
  description:
    "Walkable + ferry-served options for visitors who don't want to drive — Hastings Street, Noosaville, and the Noosa Ferry.",
  alternates: { canonical: "/accommodation/without-a-car" },
  openGraph: {
    title: "Where to stay in Noosa without a car · MyNoosaHeads",
    description: "Walkable + ferry-served options.",
    url: "/accommodation/without-a-car",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Where to stay in Noosa without a car",
    description: "Walkable + ferry-served options.",
  },
};

const WALKABLE_PROPERTIES = COMMERCIAL_PROPERTIES.filter(
  (p) => p.areaId === "hastings" || p.areaId === "noosaville",
);

export default function WithoutACarPage() {
  return (
    <CommercialPage
      slug="accommodation/without-a-car"
      title="Where to stay in Noosa without a car"
      description="Walkable + ferry-served options for visitors who don't want to drive — Hastings Street, Noosaville, and the Noosa Ferry."
      category="Where to stay"
      intent="Walkable · ferry-served · no car needed"
      h1={<>Where to stay in Noosa without a car.</>}
      intro={
        <>
          Noosa works well without a car if you pick the right precinct.
          Hastings Street is walkable from end to end — Main Beach at one
          end, the headland at the other. Noosaville is the river pick with
          a supermarket, the Noosa Ferry wharf, and a Woolworths within a
          five-minute drive (or a 20-minute walk). The Noosa Ferry connects
          the two every 30 minutes in summer.
        </>
      }
      hero={{
        src: VERIFIED.cards.hastingsStreetWest.path,
        alt: VERIFIED.cards.hastingsStreetWest.caption,
      }}
      sections={[
        {
          heading: "What you give up.",
          body: (
            <>
              <p>
                Sunshine Beach is off the list without a car — there&apos;s no
                ferry, the bus is hourly, and the walk from Hastings Street
                is 30 minutes along the headland. Peregian Beach is similar:
                doable by bus but not by walk.
              </p>
              <p>
                Hinterland day trips (Pomona, Cooran, Kin Kin, Eumundi) are
                off the list without a car. The Eumundi Markets on Wednesday
                and Saturday are reachable by the Noosa Transit bus, but the
                hinterland villages are not.
              </p>
              <p>
                Airport transfers are the principal external journey. See{" "}
                <a href="/travel-and-transport/sunshine-coast-airport-to-noosa" className="link text-ocean-700">
                  MCY → Noosa
                </a>{" "}
                and{" "}
                <a href="/travel-and-transport/brisbane-airport-to-noosa" className="link text-ocean-700">
                  BNE → Noosa
                </a>{" "}
                for the options.
              </p>
            </>
          ),
        },
        {
          heading: "Picks.",
          body: <PicksGrid />,
        },
        {
          heading: "The ferry timetable.",
          body: (
            <>
              <p>
                The{" "}
                <a
                  href="https://www.noosaferry.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link text-ocean-700"
                  data-track="noosa-ferry-direct"
                >
                  Noosa Ferry
                </a>{" "}
                runs every 30 minutes in summer between Noosa Heads (Hastings
                Street end) and Noosaville (Gympie Terrace end), with stops
                at the Noosa Heads wharf, the Noosaville ferry wharf, and a
                handful of mid-river stops. The all-day pass is the right
                ticket for the day-hopping visitor.
              </p>
              <p>
                In winter the frequency drops to hourly; check the timetable
                before planning a sunset dinner on Hastings Street. Last
                ferry from Noosa Heads is around 9 pm in summer; earlier in
                winter.
              </p>
            </>
          ),
        },
      ]}
      locationContext={
        <>
          <p>
            From Sunshine Coast Airport (MCY), Con-x-ion runs a scheduled
            coach to Noosaville and Hastings Street. From Brisbane Airport
            (BNE), the Con-x-ion coach is the cheapest option (~2 hours).
            See{" "}
            <a href="/travel-and-transport/brisbane-airport-to-noosa" className="link text-ocean-700">
              BNE → Noosa transfers
            </a>
            .
          </p>
          <p>
            Once at the precinct, the Noosa Ferry is the commute; everything
            else is walkable.
          </p>
        </>
      }
      methodology={
        <HowWeChoose
          criteria={[
            {
              criterion: "Walkable to beach or ferry",
              rationale:
                "A car-free stay needs walking to be the default mode of transport.",
            },
            {
              criterion: "On-site parking not required",
              rationale:
                "Many Hastings Street apartments sell Hastings Street parking permits, but a car-free visitor doesn&apos;t need them.",
            },
            {
              criterion: "Ferry-served",
              rationale:
                "The Noosa Ferry is the commute between precincts. Verify the timetable for winter.",
            },
          ]}
        />
      }
      programmes={WALKABLE_PROPERTIES.map((p) => p.programme)}
      priceSource="the operator's site"
      lastReviewed="2026-08-31"
      related={ACCOMM_AREA_RELATED}
      stickyPrimary={
        WALKABLE_PROPERTIES[0]
          ? {
              label: "Check availability",
              href: WALKABLE_PROPERTIES[0].url,
              placement: "without-a-car",
              external: WALKABLE_PROPERTIES[0].programme !== "operator-direct",
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
        The two walkable picks — Hastings Street and Noosaville — work
        without a car. The Noosa Ferry is the commute.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {WALKABLE_PROPERTIES.map((p) => (
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
                    `without-a-car-${p.name.toLowerCase().replace(/\s+/g, "-")}`,
                  )
            }
            placement={`without-a-car-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
            image={p.photo}
            location={p.areaId === "hastings" ? "Walkable Main Beach" : `${p.riverBand} to ferry`}
          />
        ))}
      </div>
      <div className="mt-8">
        <WhyWeRecommend
          for="Netanya Noosa"
          body="Netanya is the Hastings Street pick for visitors without a car — Main Beach at the bottom of the street, headland walk at the top, the Noosa Ferry wharf a 15-minute walk. Hastings Street paid parking sells out by 11 am in summer, which is irrelevant if you don&apos;t have a car."
          byline="Dexter · for MyNoosaHeads"
        />
      </div>
      <p className="mt-8 text-caption italic text-ink-600">
        <ParentHubLink href="/accommodation" label="all areas" />
      </p>
    </>
  );
}
