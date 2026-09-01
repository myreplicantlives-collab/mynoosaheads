import type { Metadata } from "next";
import {
  CommercialPage,
  HowWeChoose,
  WhyWeRecommend,
  ParentHubLink,
} from "@/components/commercial";
import { ACCOMM_AREA_RELATED } from "@/data/commercial-related";
import { VERIFIED } from "@/data/photos-msn2982";

export const metadata: Metadata = {
  title: "Peregian Beach accommodation",
  description:
    "Where to stay at Peregian Beach — village-square holiday houses, dog-friendly, ten minutes south of Noosa Heads.",
  alternates: { canonical: "/accommodation/peregian-beach" },
  openGraph: {
    title: "Peregian Beach accommodation · MyNoosaHeads",
    description: "Village-square, holiday houses, dogs welcome.",
    url: "/accommodation/peregian-beach",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peregian Beach accommodation",
    description: "Village-square, holiday houses, dogs welcome.",
  },
};

export default function PeregianBeachPage() {
  return (
    <CommercialPage
      slug="accommodation/peregian-beach"
      title="Peregian Beach accommodation"
      description="Where to stay at Peregian Beach — village-square holiday houses, dog-friendly, ten minutes south of Noosa Heads."
      category="Where to stay"
      intent="Peregian Beach · village-square · ten minutes south of Noosa Heads"
      h1={<>Peregian Beach accommodation.</>}
      intro={
        <>
          Ten minutes south of Sunshine Beach, Peregian is the village-square
          precinct. Holiday houses rather than hotels; pet-friendly as a
          default rather than an exception; the patrolled beach at the end of
          Kingfisher Drive with a cluster of cafés and the Peregian Beach
          Hotel on the village green. Noosa Heads and Hastings Street are a
          15-minute drive north.
        </>
      }
      hero={{
        src: VERIFIED.cards.hastingsStreetEast.path,
        alt: VERIFIED.cards.hastingsStreetEast.caption,
      }}
      notReady={{
        reason:
          "We don't currently curate named properties at Peregian Beach — the verified-photo set is small and we don't want to list operators we can't photograph. The honest position is that Peregian is best booked on Stayz by house (4+ guests, pet-friendly).",
        detail: (
          <>
            <p>
              Most Peregian stays are holiday houses booked on Stayz with a
              pet-friendly filter. The houses are 3- and 4-bedroom; many have
              fenced yards and a 5-minute walk to the patrolled beach. Verify
              each operator&apos;s dog policy and check the photos carefully
              before booking — Stayz is an aggregate, not a curated pick.
            </p>
          </>
        ),
        targetDate: "2026-12-31",
      }}
      sections={[
        {
          heading: "Why Peregian.",
          body: (
            <>
              <p>
                The village-square precinct. Holiday houses with fenced yards
                and a five-minute walk to the patrolled beach. Two cafés at
                the village square (Peregian Beach Café, Hand of Fatima) plus
                the Peregian Beach Hotel. No high-rise; no Hastings Street
                traffic.
              </p>
              <p>
                Peregian is also a quieter place to base a surf trip — the
                south end of Peregian Beach is a working beach break, less
                crowded than Noosa Main Beach, with the same southeast swell
                window.
              </p>
            </>
          ),
        },
        {
          heading: "How to book.",
          body: (
            <>
              <p>
                Stayz (Vrbo) is the dominant booking engine for Peregian holiday
                houses. Filter by Noosa Heads, pet-friendly, four-plus guests,
                and check the photos carefully — the houses vary widely. Holiday
                houses are typically two-night minimum; some are weekly.
              </p>
              <p>
                <strong>Alternative:</strong> the Peregian Beach Hotel sits on
                the village square. It&apos;s a small motel-style property,
                not currently in our curated shortlist because we have no
                verified guest-room photo. Book direct with the operator if
                you want a hotel-room base rather than a holiday house.
              </p>
              <p>
                <a
                  href="https://www.stayz.com.au/holiday-rental-search?query=Peregian+Beach+pet+friendly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary btn-md mt-4"
                  data-track="peregian-book-stayz"
                >
                  Browse Peregian holiday houses on Stayz{" "}
                  <span aria-hidden="true">→</span>
                </a>
              </p>
            </>
          ),
        },
        {
          heading: "Pet-friendly specifics.",
          body: (
            <>
              <p>
                Most Peregian holiday houses accept dogs — verify each
                operator&apos;s policy before booking. The patrolled section
                of Peregian Beach is off-leash before 8 am and after 5 pm
                (Noosa Council dog-beach map). The north end of the beach
                (Sunshine side) is on-leash only.
              </p>
              <p>
                There is no off-leash dog park in the precinct itself; the
                beach hours are the closest option.
              </p>
            </>
          ),
        },
      ]}
      locationContext={
        <>
          <p>
            <strong>From Sunshine Coast Airport (MCY):</strong> ~25 minutes.
            See{" "}
            <a href="/travel-and-transport/sunshine-coast-airport-to-noosa" className="link text-ocean-800">
              MCY → Noosa transfers
            </a>
            .
          </p>
          <p>
            <strong>From Brisbane Airport (BNE):</strong> ~2 hours. See{" "}
            <a href="/travel-and-transport/brisbane-airport-to-noosa" className="link text-ocean-800">
              BNE → Noosa transfers
            </a>
            .
          </p>
          <p>
            <strong>Once in Peregian:</strong> park once. The beach is at the
            end of Kingfisher Drive; the village square is the cluster of
            shops. Noosa Heads is 15 minutes north by car.
          </p>
        </>
      }
      methodology={
        <HowWeChoose
          criteria={[
            {
              criterion: "Verify each operator's dog policy",
              rationale:
                "Peregian's value is the pet-friendly default — confirm before booking.",
            },
            {
              criterion: "Honest about the curated shortlist",
              rationale:
                "We do not list operators we cannot verify. The Stayz search is the honest fallback.",
            },
            {
              criterion: "Walking distance to the patrolled beach",
              rationale:
                "Peregian's village-square value is the walk to the surf club.",
            },
          ]}
        />
      }
      programmes={["operator-direct"]}
      priceSource="Stayz (Vrbo)"
      lastReviewed="2026-08-31"
      related={ACCOMM_AREA_RELATED}
    />
  );
}
