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
  title: "Noosaville accommodation",
  description:
    "Where to stay in Noosaville — apartment-hotels along Gympie Terrace, walk to the ferry.",
  alternates: { canonical: "/accommodation/noosaville" },
  openGraph: {
    title: "Noosaville accommodation · MyNoosaHeads",
    description: "Gympie Terrace and the river. The ferry one.",
    url: "/accommodation/noosaville",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noosaville accommodation",
    description: "Gympie Terrace and the river. The ferry one.",
  },
};

const NOOSAVILLE = COMMERCIAL_PROPERTIES.filter((p) => p.areaId === "noosaville");

export default function NoosavillePage() {
  return (
    <CommercialPage
      slug="accommodation/noosaville"
      title="Noosaville accommodation"
      description="Where to stay in Noosaville — apartment-hotels along Gympie Terrace, walk to the ferry."
      category="Where to stay"
      intent="Gympie Terrace · across the river from Hastings Street"
      h1={<>Noosaville accommodation.</>}
      intro={
        <>
          Apartment-hotels along Gympie Terrace with the river at the front
          door and the ferry to Hastings Street at the end of the street.
          Better value per room than Hastings Street; better restaurants at
          the door than Sunshine Beach. The five-minute ferry ride is the
          commute — walk on with a coffee and step off at the Noosa Heads
          wharf ready for Main Beach.
        </>
      }
      hero={{
        src: VERIFIED.cards.morningRiver.path,
        alt: VERIFIED.cards.morningRiver.caption,
      }}
      sections={[
        {
          heading: "Who it's for.",
          body: (
            <>
              <p>
                Families, longer-stay visitors, anyone with a hire car who
                doesn&apos;t mind driving five-to-twenty minutes to the
                headland. Noosaville has the largest heated pool on the river,
                the most spacious rooms for the price, and the easiest parking
                of the four precincts. It&apos;s also the precinct most tourists
                skip on a first visit — which is why it&apos;s quieter.
              </p>
              <p>
                If you want to be in the centre of the action every evening
                (Hastings Street bars, the Surf Club), Noosaville is a
                fifteen-minute drive back across the river at night. The ferry
                stops at 9 pm in summer.
              </p>
            </>
          ),
        },
        {
          heading: "What to expect.",
          body: (
            <>
              <p>
                Apartment-style rooms with full kitchens and laundry — the
                default for stays longer than two nights. Most Noosaville
                properties sit back from Gympie Terrace one row, so the river
                view is partial rather than front-on; the best riverfront
                rooms are at the South Pacific Resort&apos;s spa apartments.
              </p>
              <p>
                The Gympie Terrace foreshore has six-to-eight cafés and
                restaurants within a five-minute walk — most are mid-range
                family-friendly venues. The Hastings Street restaurants are a
                ferry ride away.
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
            <strong>From Sunshine Coast Airport (MCY):</strong> ~30 minutes
            via the Sunshine Motorway; Noosaville is the closest precinct to
            the airport. See{" "}
            <a href="/travel-and-transport/sunshine-coast-airport-to-noosa" className="link text-ocean-800">
              MCY → Noosa transfers
            </a>
            .
          </p>
          <p>
            <strong>From Brisbane Airport (BNE):</strong> ~2 hours; Noosaville
            is the natural base for guests who want one big supermarket, easy
            parking, and a kitchen. See{" "}
            <a href="/travel-and-transport/brisbane-airport-to-noosa" className="link text-ocean-800">
              BNE → Noosa transfers
            </a>
            .
          </p>
          <p>
            <strong>Once in Noosaville:</strong> the Noosa Ferry runs every
            30 minutes in summer; the river foreshore is flat and
            pram-friendly; the supermarket is a five-minute drive.
          </p>
        </>
      }
      methodology={
        <HowWeChoose
          criteria={[
            {
              criterion: "Apartment-style rooms",
              rationale:
                "Noosaville stays are usually five nights or longer; full kitchens and laundry matter.",
            },
            {
              criterion: "Walking distance to the ferry wharf",
              rationale:
                "The ferry is the commute to Hastings Street; being within five minutes matters.",
            },
            {
              criterion: "Pool facility",
              rationale:
                "Noosa river in summer is warm but tidal — most families want a pool.",
            },
            {
              criterion: "Honest trade-off",
              rationale:
                "Noosaville is across the river from Main Beach. We surface the ferry ride and the evening commute.",
            },
          ]}
        />
      }
      programmes={NOOSAVILLE.map((p) => p.programme)}
      priceSource="the operator's site"
      lastReviewed="2026-08-31"
      related={ACCOMM_AREA_RELATED}
      stickyPrimary={
        NOOSAVILLE[0]
          ? {
              label: "Check availability",
              href: NOOSAVILLE[0].url,
              placement: "noosaville",
              external: NOOSAVILLE[0].programme !== "operator-direct",
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
        Noosaville has the largest concentration of apartment-hotels on the
        Sunshine Coast. Each link below goes to the operator.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {NOOSAVILLE.map((p) => (
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
                    `noosaville-${p.name.toLowerCase().replace(/\s+/g, "-")}`,
                  )
            }
            placement={`noosaville-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
            image={p.photo}
            location={`${p.riverBand} to the ferry`}
          />
        ))}
      </div>
      <div className="mt-8">
        <WhyWeRecommend
          for="South Pacific Resort & Spa Noosa"
          body="The South Pacific's heated lagoon pool with swim-up bar is the single best family pool in Noosaville — a five-minute walk from the Noosa Ferry wharf. The trade-off is being across the river from Main Beach (the ferry or a 20-minute drive) and the on-site restaurant being closed for redevelopment until 2026 Q4."
          byline="Dexter · for MyNoosaHeads"
        />
      </div>
      <p className="mt-8 text-caption italic text-ink-600">
        <ParentHubLink href="/accommodation" label="all areas" />
      </p>
    </>
  );
}
