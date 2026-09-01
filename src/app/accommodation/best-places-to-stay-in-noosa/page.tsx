import type { Metadata } from "next";
import {
  CommercialPage,
  AccommodationCard,
  HowWeChoose,
  WhyWeRecommend,
  ParentHubLink,
} from "@/components/commercial";
import { COMMERCIAL_PROPERTIES } from "@/data/commercial";
import { ACCOMM_HUB_RELATED } from "@/data/commercial-related";
import { VERIFIED } from "@/data/photos-msn2982";
import { buildPartnerLink } from "@/lib/affiliates";

export const metadata: Metadata = {
  title: "Best places to stay in Noosa",
  description:
    "The hub for every accommodation cluster guide — Hastings Street, Noosaville, Sunshine Beach, Peregian Beach, and the cross-cutting picks.",
  alternates: { canonical: "/accommodation/best-places-to-stay-in-noosa" },
  openGraph: {
    title: "Best places to stay in Noosa · MyNoosaHeads",
    description: "The hub for the 13-cluster Noosa accommodation guide.",
    url: "/accommodation/best-places-to-stay-in-noosa",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best places to stay in Noosa",
    description: "The hub for the 13-cluster Noosa accommodation guide.",
  },
};

export default function BestPlacesToStayInNoosaPage() {
  return (
    <CommercialPage
      slug="accommodation/best-places-to-stay-in-noosa"
      title="Best places to stay in Noosa"
      description="The hub for every accommodation cluster guide — Hastings Street, Noosaville, Sunshine Beach, Peregian Beach, and the cross-cutting picks."
      category="Where to stay"
      intent="Hub · synthesis of all 12 cluster guides"
      h1={<>Best places to stay in Noosa.</>}
      intro={
        <>
          Eight kilometres of coast, one river, one national park, four
          precincts. The Noosa accommodation shortlist is honest about
          what we can verify: three curated picks across the four precincts,
          a holiday-houses fallback for groups, and the area and decision
          guides to help you pick the right one for your trip.
        </>
      }
      hero={{
        src: VERIFIED.cards.hastingsStreetWest.path,
        alt: VERIFIED.cards.hastingsStreetWest.caption,
      }}
      sections={[
        {
          heading: "The shortlist.",
          body: (
            <>
              <p>
                Three properties across four precincts. The honest position
                is that this is a small shortlist because we will not list
                operators we cannot photograph — the five-star Noosa stock
                (Sofitel, RACV, The Sebel, Peppers) sits outside our curated
                shortlist until verified guest-room photography is in place.
                See <a href="/accommodation/luxury" className="link text-ocean-700">Luxury Noosa</a> for the honest position on the higher-end stock.
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {COMMERCIAL_PROPERTIES.map((p) => (
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
                            `best-places-${p.name.toLowerCase().replace(/\s+/g, "-")}`,
                          )
                    }
                    placement={`best-places-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
                    image={p.photo}
                    location={p.areaId}
                  />
                ))}
              </div>
            </>
          ),
        },
        {
          heading: "The cluster guides.",
          body: (
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <a href="/accommodation/hastings-street" className="link text-ocean-700" data-track="cluster_link_hastings">Hastings Street accommodation</a> — walk to Main Beach.
              </li>
              <li>
                <a href="/accommodation/noosaville" className="link text-ocean-700" data-track="cluster_link_noosaville">Noosaville accommodation</a> — Gympie Terrace and the ferry.
              </li>
              <li>
                <a href="/accommodation/sunshine-beach" className="link text-ocean-700" data-track="cluster_link_sunshine">Sunshine Beach accommodation</a> — patrolled surf south of the headland.
              </li>
              <li>
                <a href="/accommodation/peregian-beach" className="link text-ocean-700" data-track="cluster_link_peregian">Peregian Beach accommodation</a> — village-square, holiday houses.
              </li>
              <li>
                <a href="/accommodation/luxury" className="link text-ocean-700" data-track="cluster_link_luxury">Luxury Noosa</a> — the higher-end stock, honest gap.
              </li>
              <li>
                <a href="/accommodation/families" className="link text-ocean-700" data-track="cluster_link_families">Family-friendly</a> — apartments with kitchens, pools, walkable beaches.
              </li>
              <li>
                <a href="/accommodation/apartments" className="link text-ocean-700" data-track="cluster_link_apartments">Apartments</a> — self-catering across the four precincts.
              </li>
              <li>
                <a href="/accommodation/near-the-beach" className="link text-ocean-700" data-track="cluster_link_near-beach">Near the beach</a> — under-five-minute walks to the sand.
              </li>
              <li>
                <a href="/accommodation/with-pools" className="link text-ocean-700" data-track="cluster_link_pools">With pools</a> — heated + lagoon + outdoor pools.
              </li>
              <li>
                <a href="/accommodation/pet-friendly" className="link text-ocean-700" data-track="cluster_link_pet">Pet-friendly</a> — apartments that accept dogs.
              </li>
              <li>
                <a href="/accommodation/without-a-car" className="link text-ocean-700" data-track="cluster_link_carfree">Without a car</a> — walkable + ferry-served.
              </li>
              <li>
                <a href="/accommodation/hastings-vs-noosaville" className="link text-ocean-700" data-track="cluster_link_compare">Hastings vs Noosaville</a> — side-by-side decision aid.
              </li>
            </ul>
          ),
        },
        {
          heading: "How to choose.",
          body: (
            <>
              <p>
                <strong>First, pick the precinct.</strong> Hastings Street for
                the walkable experience, Noosaville for the river one,
                Sunshine Beach for the surf, Peregian for the village-square
                holiday houses. The cluster guides help you pick the
                property once the precinct is decided.
              </p>
              <p>
                <strong>Then, pick the property.</strong> Three curated picks
                across the four precincts — each verified, each with a
                honest trade-off. Where the curated shortlist is too small
                (Peregian, the five-star stock), the fallback is a
                network search with a property-name filter, not a generic
                homepage.
              </p>
              <p>
                <strong>Then, book direct where possible.</strong> Most
                Noosa operators run a best-rate guarantee against the public
                network listings. Verify the operator&apos;s policy before
                booking through a network.
              </p>
            </>
          ),
        },
      ]}
      methodology={
        <HowWeChoose
          criteria={[
            {
              criterion: "Verified, not aggregated",
              rationale:
                "We will not list a property we cannot photograph.",
            },
            {
              criterion: "Operator-direct preferred",
              rationale:
                "Best-rate guarantee beats public-network prices for most Noosa operators.",
            },
            {
              criterion: "Honest about the gaps",
              rationale:
                "Peregian holiday houses, luxury stock — we surface the gap rather than pad the list.",
            },
          ]}
        />
      }
      programmes={COMMERCIAL_PROPERTIES.map((p) => p.programme)}
      priceSource="the operator's site"
      lastReviewed="2026-08-31"
      related={ACCOMM_HUB_RELATED}
      stickyPrimary={{
        label: "Check availability",
        href: COMMERCIAL_PROPERTIES[0].url,
        placement: "best-places-to-stay",
        external: COMMERCIAL_PROPERTIES[0].programme !== "operator-direct",
      }}
    />
  );
}
