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
  title: "Noosa accommodation with pools",
  description:
    "Heated pools, lagoon pools, lap pools — the curated list of Noosa apartments with pools worth a swim.",
  alternates: { canonical: "/accommodation/with-pools" },
  openGraph: {
    title: "Noosa accommodation with pools · MyNoosaHeads",
    description: "Heated + lagoon + lap pools.",
    url: "/accommodation/with-pools",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noosa accommodation with pools",
    description: "Heated + lagoon + lap pools.",
  },
};

const POOL_PROPERTIES = COMMERCIAL_PROPERTIES.filter((p) => p.hasPool);

export default function WithPoolsPage() {
  return (
    <CommercialPage
      slug="accommodation/with-pools"
      title="Noosa accommodation with pools"
      description="Heated pools, lagoon pools, lap pools — the curated list of Noosa apartments with pools worth a swim."
      category="Where to stay"
      intent="On-site pool · heated preferred"
      h1={<>Noosa accommodation with pools.</>}
      intro={
        <>
          Noosa&apos;s river is tidal and warm but a five-minute drive. For
          most families, a two-step walk to a heated pool is the practical
          default. Below is the curated list of Noosa apartments with pools
          we can verify — all three curated picks qualify.
        </>
      }
      hero={{
        src: VERIFIED.cards.southPacificResort.path,
        alt: VERIFIED.cards.southPacificResort.caption,
      }}
      sections={[
        {
          heading: "Pool types.",
          body: (
            <>
              <p>
                <strong>Heated lagoon pool.</strong> The South Pacific
                Resort&apos;s lagoon pool is the best family pool in Noosaville
                — heated, swim-up bar, sun loungers, a separate heated spa
                pool. The pool deck is the centre of the property in summer.
              </p>
              <p>
                <strong>Outdoor pool (unheated).</strong> The Netanya outdoor
                pool is small and not heated; the Sunshine Beach Resort pool
                is similar. Both work for a morning swim; neither is the
                year-round pool the lagoon is.
              </p>
              <p>
                <strong>Heated lap pool.</strong> Not currently on the
                curated shortlist — most Noosa apartment-hotel pools are
                lagoon-style for families rather than 25-metre lap pools.
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
            The South Pacific (Noosaville) is the strongest pool pick. The
            Netanya outdoor pool (Hastings Street) and the Sunshine Beach
            Resort outdoor pool (Sunshine Beach) are smaller, unheated, but
            work for a morning swim.
          </p>
        </>
      }
      methodology={
        <HowWeChoose
          criteria={[
            {
              criterion: "Verified pool (heater, depth, deck size)",
              rationale:
                "Every pick carries a poolNote — we don&apos;t claim a pool we can&apos;t verify.",
            },
            {
              criterion: "On-site, not across the road",
              rationale:
                "A pool at a sister property across the road isn&apos;t the same.",
            },
            {
              criterion: "Honest about unheated pools",
              rationale:
                "Not every Noosa pool is heated. We surface that on each pick.",
            },
          ]}
        />
      }
      programmes={POOL_PROPERTIES.map((p) => p.programme)}
      priceSource="the operator's site"
      lastReviewed="2026-08-31"
      related={ACCOMM_FAMILY_RELATED}
      stickyPrimary={
        POOL_PROPERTIES[0]
          ? {
              label: "Check availability",
              href: POOL_PROPERTIES[0].url,
              placement: "with-pools",
              external: POOL_PROPERTIES[0].programme !== "operator-direct",
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
        All three curated picks have on-site pools. The South Pacific is the
        strongest pick for the heated-lagoon pool alone.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {POOL_PROPERTIES.map((p) => (
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
                    `with-pools-${p.name.toLowerCase().replace(/\s+/g, "-")}`,
                  )
            }
            placement={`with-pools-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
            image={p.photo}
            location={p.poolNote}
          />
        ))}
      </div>
      <div className="mt-8">
        <WhyWeRecommend
          for="South Pacific Resort & Spa Noosa"
          body="The South Pacific's heated lagoon pool is the single best family pool in Noosaville — heated, swim-up bar, sun loungers, separate heated spa. The trade-off is across the river from Main Beach (15-minute ferry or 20-minute drive)."
          byline="Dexter · for MyNoosaHeads"
        />
      </div>
      <p className="mt-8 text-caption italic text-ink-600">
        <ParentHubLink href="/accommodation" label="all areas" />
      </p>
    </>
  );
}
