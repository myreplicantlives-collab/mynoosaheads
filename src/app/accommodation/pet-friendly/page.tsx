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
  title: "Pet-friendly Noosa accommodation",
  description:
    "Where to stay in Noosa with dogs — apartments that accept pets on request.",
  alternates: { canonical: "/accommodation/pet-friendly" },
  openGraph: {
    title: "Pet-friendly Noosa accommodation · MyNoosaHeads",
    description: "Apartments that accept dogs on request.",
    url: "/accommodation/pet-friendly",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet-friendly Noosa accommodation",
    description: "Apartments that accept dogs on request.",
  },
};

const PET_PROPERTIES = COMMERCIAL_PROPERTIES.filter((p) => p.petsOk);

export default function PetFriendlyPage() {
  return (
    <CommercialPage
      slug="accommodation/pet-friendly"
      title="Pet-friendly Noosa accommodation"
      description="Where to stay in Noosa with dogs — apartments that accept pets on request."
      category="Where to stay"
      intent="Pet-friendly · dogs on request · verify each operator's policy"
      h1={<>Pet-friendly Noosa accommodation.</>}
      intro={
        <>
          Apartments that accept dogs on request. Most Noosa apartments do
          <em> not</em> accept pets — the ones below are the verified picks.
          Confirm the operator&apos;s policy (size limits, breed, fees) before
          booking.
        </>
      }
      hero={{
        src: VERIFIED.cards.sunshineBeach.path,
        alt: VERIFIED.cards.sunshineBeach.caption,
      }}
      sections={[
        {
          heading: "Where dogs are allowed.",
          body: (
            <>
              <p>
                <strong>Sunshine Beach Resort</strong> is the single
                operator-direct pick that accepts dogs in selected units.
                Confirm the policy (size, breed, fees, which units) with the
                operator before booking. The resort sits across the road from
                the patrolled section of Sunshine Beach — off-leash hours
                (before 8 am and after 5 pm per Noosa Council dog-beach
                regulations) are the closest on-beach option.
              </p>
              <p>
                <strong>Peregian Beach holiday houses</strong> are the
                second-best bet — Stayz aggregates the pet-friendly houses
                with a filter, but the curated pick list is small because we
                don&apos;t have verified house-by-house photography. See{" "}
                <a href="/accommodation/peregian-beach" className="link text-ocean-700">
                  Peregian Beach
                </a>{" "}
                for the honest position.
              </p>
              <p>
                <strong>Hastings Street apartments</strong> (Netanya) do not
                accept pets. <strong>Noosaville apartments</strong> (South
                Pacific) do not accept pets. These are the two largest
                curated picks on the main{" "}
                <a href="/accommodation" className="link text-ocean-700">
                  /accommodation
                </a>{" "}
                page, and neither accepts dogs.
              </p>
            </>
          ),
        },
        {
          heading: "Picks.",
          body: <PicksGrid />,
        },
        {
          heading: "Beyond Noosa proper.",
          body: (
            <>
              <p>
                If dog-friendly is the primary criterion and the curated
                shortlist is too small, the honest answer is to look beyond
                the four Noosa precincts:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <a
                    href="https://www.stayz.com.au/holiday-rental-search?query=Peregian+Beach+pet+friendly"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link text-ocean-700"
                    data-track="pet-friendly-stayz-peregian"
                  >
                    Peregian Beach holiday houses (Stayz, pet-friendly filter)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.stayz.com.au/holiday-rental-search?query=Noosa+Heads+pet+friendly+house"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link text-ocean-700"
                    data-track="pet-friendly-stayz-noosa"
                  >
                    Noosa-area holiday houses (Stayz, pet-friendly filter)
                  </a>
                </li>
              </ul>
              <p>
                These are Stayz aggregate searches — each house varies;
                verify photos and reviews carefully before booking.
              </p>
            </>
          ),
        },
      ]}
      locationContext={
        <>
          <p>
            Sunshine Beach Resort sits across the road from the patrolled
            beach (off-leash before 8 am and after 5 pm). Peregian Beach
            holiday houses are ten minutes south of Noosa Heads, with the
            village-square precinct and the patrolled section at the end of
            Kingfisher Drive.
          </p>
        </>
      }
      methodology={
        <HowWeChoose
          criteria={[
            {
              criterion: "Verified pet policy",
              rationale:
                "We surface each operator&apos;s size limits, breed restrictions, and fees on the card.",
            },
            {
              criterion: "Honest about the gap",
              rationale:
                "Most Noosa apartments don&apos;t accept pets. We don&apos;t pad the list.",
            },
            {
              criterion: "Stayz fallback",
              rationale:
                "Where the curated shortlist is too small, the Stayz aggregate search is the honest fallback.",
            },
          ]}
        />
      }
      programmes={["booking", "operator-direct"]}
      priceSource="the operator's site (Sunshine Beach Resort), Stayz (Peregian houses)"
      lastReviewed="2026-08-31"
      related={ACCOMM_AREA_RELATED}
    />
  );
}

function PicksGrid() {
  return (
    <>
      <p className="max-w-3xl">
        One operator-direct pick on the curated shortlist (Sunshine Beach
        Resort, dogs on request). Stayz pet-friendly filter is the fallback
        for Peregian and Noosa holiday houses.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PET_PROPERTIES.map((p) => (
          <AccommodationCard
            key={p.name}
            name={p.name}
            descriptor={p.descriptor}
            bestFor={p.bestFor}
            programme={p.programme}
            href={buildPartnerLink(
              p.programme,
              p.url,
              `pet-friendly-${p.name.toLowerCase().replace(/\s+/g, "-")}`,
            )}
            placement={`pet-friendly-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
            image={p.photo}
            location="Dogs on request"
          />
        ))}
      </div>
      <div className="mt-8">
        <WhyWeRecommend
          for="Sunshine Beach Resort"
          body="The single operator-direct pick that accepts dogs in selected units — across the road from the patrolled beach, with off-leash hours before 8 am and after 5 pm. Confirm the policy (size, breed, fees) with the operator before booking."
          byline="Dexter · for MyNoosaHeads"
        />
      </div>
      <p className="mt-8 text-caption italic text-ink-600">
        <ParentHubLink href="/accommodation" label="all areas" />
      </p>
    </>
  );
}
