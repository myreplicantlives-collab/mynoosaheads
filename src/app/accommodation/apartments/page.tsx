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
  title: "Noosa apartments",
  description:
    "Self-catering apartments across the four precincts — full kitchens, laundry, and a place to spread out.",
  alternates: { canonical: "/accommodation/apartments" },
  openGraph: {
    title: "Noosa apartments · MyNoosaHeads",
    description: "Self-catering apartments across the four precincts.",
    url: "/accommodation/apartments",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noosa apartments",
    description: "Self-catering apartments across the four precincts.",
  },
};

const APARTMENT_PROPERTIES = COMMERCIAL_PROPERTIES.filter((p) => p.hasApartments);

export default function ApartmentsPage() {
  return (
    <CommercialPage
      slug="accommodation/apartments"
      title="Noosa apartments"
      description="Self-catering apartments across the four precincts — full kitchens, laundry, and a place to spread out."
      category="Where to stay"
      intent="Apartments · full kitchens · self-catering"
      h1={<>Noosa apartments.</>}
      intro={
        <>
          Apartment-style rooms with full kitchens, laundry, and a separate
          bedroom — the default for stays longer than two nights. All three
          curated picks across the four precincts are apartments; the
          holiday-houses fallback is for groups of four-plus.
        </>
      }
      hero={{
        src: VERIFIED.cards.southPacificResort.path,
        alt: VERIFIED.cards.southPacificResort.caption,
      }}
      sections={[
        {
          heading: "What an apartment gives you.",
          body: (
            <>
              <p>
                A full kitchen (stove, oven, fridge, microwave, dishwasher,
                full set of crockery), a laundry (washer + dryer), and a
                separate living area from the bedroom. Most Noosa apartments
                have a balcony or a courtyard; the river-facing rooms have
                full-width balconies.
              </p>
              <p>
                For a five-night stay with kids, an apartment beats a hotel
                room on every dimension except in-room dining. The trade-off
                is the daily housekeeping and the front-desk concierge — most
                Noosa apartments are self-managed with a reception desk
                open 8 am to 6 pm.
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
            Netanya (Hastings Street) is the walkable apartment pick.
            South Pacific (Noosaville) is the river-facing apartment pick
            with the heated lagoon pool. Sunshine Beach Resort is the
            patrolled-beach apartment pick south of the headland. Peregian is
            holiday houses (see <a href="/accommodation/peregian-beach" className="link text-ocean-800">Peregian Beach</a>).
          </p>
        </>
      }
      methodology={
        <HowWeChoose
          criteria={[
            {
              criterion: "Full kitchen",
              rationale:
                "A studio apartment without a full stove is a hotel room; we list apartments only.",
            },
            {
              criterion: "Laundry",
              rationale:
                "Five-night stays need a place to wash swimsuits.",
            },
            {
              criterion: "Separate living area",
              rationale:
                "Apartments give the family somewhere to spread out that isn&apos;t the bedroom.",
            },
          ]}
        />
      }
      programmes={APARTMENT_PROPERTIES.map((p) => p.programme)}
      priceSource="the operator's site"
      lastReviewed="2026-08-31"
      related={ACCOMM_AREA_RELATED}
      stickyPrimary={
        APARTMENT_PROPERTIES[0]
          ? {
              label: "Check availability",
              href: APARTMENT_PROPERTIES[0].url,
              placement: "apartments",
              external: APARTMENT_PROPERTIES[0].programme !== "operator-direct",
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
        Three curated picks — one per precinct. Each is an apartment with a
        full kitchen and laundry.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {APARTMENT_PROPERTIES.map((p) => (
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
                    `apartments-${p.name.toLowerCase().replace(/\s+/g, "-")}`,
                  )
            }
            placement={`apartments-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
            image={p.photo}
            location={`Apartments · ${p.areaId}`}
          />
        ))}
      </div>
      <div className="mt-8">
        <WhyWeRecommend
          for="South Pacific Resort & Spa Noosa"
          body="The apartment-style rooms at the South Pacific have the best kitchen-and-pool combination in Noosaville — full kitchens, separate bedrooms, and the heated lagoon pool with swim-up bar. The trade-off is the cross-river commute to Main Beach."
          byline="Dexter · for MyNoosaHeads"
        />
      </div>
      <p className="mt-8 text-caption italic text-ink-600">
        <ParentHubLink href="/accommodation" label="all areas" />
      </p>
    </>
  );
}
