import type { Metadata } from "next";
import {
  CommercialPage,
  HowWeChoose,
  ParentHubLink,
  NotReadyBanner,
} from "@/components/commercial";
import { ACCOMM_HUB_RELATED } from "@/data/commercial-related";
import { VERIFIED } from "@/data/photos-msn2982";

export const metadata: Metadata = {
  title: "Luxury Noosa accommodation",
  description:
    "Where to stay in Noosa when you want a higher-end base — apartment-hotels and small luxury properties.",
  alternates: { canonical: "/accommodation/luxury" },
  openGraph: {
    title: "Luxury Noosa accommodation · MyNoosaHeads",
    description: "Apartment-hotels and small luxury properties.",
    url: "/accommodation/luxury",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Noosa accommodation",
    description: "Apartment-hotels and small luxury properties.",
  },
};

export default function LuxuryPage() {
  return (
    <CommercialPage
      slug="accommodation/luxury"
      title="Luxury Noosa accommodation"
      description="Where to stay in Noosa when you want a higher-end base — apartment-hotels and small luxury properties."
      category="Where to stay"
      intent="Luxury · apartment-hotels and small luxury properties"
      h1={<>Luxury Noosa accommodation.</>}
      intro={
        <>
          Noosa&apos;s luxury stock is small. Most of the five-star properties
          (Sofitel, RACV, The Sebel, Peppers) sit just outside our editorial
          scope because we do not have verified guest-room photography for
          them — and we do not want to list properties we cannot verify.
          Below is what we can say honestly about the higher-end of the
          Noosa shortlist.
        </>
      }
      hero={VERIFIED.cards.hastingsStreetWest}
      notReady={{
        reason:
          "We do not currently list named luxury properties — verified guest-room photography is required and we do not yet have it for the local five-star stock.",
        detail: (
          <>
            <p>
              The fix is straightforward: a one-time photo-verification
              exercise (one Flickr / Openverse search per property; one
              re-render of each /stay/[slug] page). We can ship that as soon
              as the photography is in place.
            </p>
          </>
        ),
        targetDate: "2026-12-31",
      }}
      sections={[
        {
          heading: "What's here now.",
          body: (
            <>
              <p>
                <strong>South Pacific Resort & Spa Noosa</strong> (Noosaville) —
                our highest-end curated pick. Apartment-style rooms with full
                kitchens; the heated lagoon pool with swim-up bar is the
                single best family pool in Noosaville. Not a true five-star
                property, but a strong four-star with luxury positioning.
              </p>
              <p>
                <strong>For the higher-end stock (Sofitel Noosa Pacific,
                RACV Noosa Resort, The Sebel Noosa, Peppers Noosa):</strong>{" "}
                these are real properties with five-star rooms. They are
                outside our curated shortlist today because we do not have
                verified guest-room photography. Until we add that, the
                operator-direct booking URLs are the right place to look:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <a
                    href="https://sofitel-noosa-pacific.all.accor.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link text-ocean-800"
                    data-track="luxury-sofitel-direct"
                  >
                    Sofitel Noosa Pacific (operator-direct)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.racv.com.au/club-resorts/noosa-resort.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link text-ocean-800"
                    data-track="luxury-racv-direct"
                  >
                    RACV Noosa Resort (operator-direct)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.theSebelNoosa.com.au/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link text-ocean-800"
                    data-track="luxury-sebel-direct"
                  >
                    The Sebel Noosa (operator-direct)
                  </a>
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "How to book luxury in Noosa.",
          body: (
            <>
              <p>
                For properties outside our curated shortlist, go operator-direct
                first. Most of the five-star properties run a member-only rate
                that beats the public Booking.com price by 5–10%. Booking.com
                is the second-best fallback; we link to a property-name search
                (not a generic homepage) per the chair-side booking convention.
              </p>
              <p>
                <strong>How to verify:</strong> cross-check the operator&apos;s
                best-rate guarantee against Booking.com and the property&apos;s
                own member programme before booking. The five-star Noosa
                properties all run published rate calendars.
              </p>
            </>
          ),
        },
        {
          heading: "Why the luxury gap exists.",
          body: (
            <>
              <p>
                We will not list a property we cannot photograph. The five-star
                Noosa stock is well-known and well-reviewed elsewhere; our
                editorial role is to verify, not aggregate. The fix is
                straightforward (see the not-ready banner), and the fix has a
                realistic target date of 2026 Q4.
              </p>
              <p>
                In the meantime, the three curated picks on the main{" "}
                <a href="/accommodation" className="link text-ocean-800">
                  /accommodation
                </a>{" "}
                page are the strongest properties we can verify.
              </p>
            </>
          ),
        },
      ]}
      locationContext={
        <>
          <p>
            Noosa&apos;s luxury stock is concentrated on Hastings Street
            (Sofitel, The Sebel) and in Noosaville (RACV, South Pacific).
            Hastings Street is the walkable one; Noosaville is the river one.
          </p>
          <p>
            From the airports,{" "}
            <a href="/travel-and-transport/sunshine-coast-airport-to-noosa" className="link text-ocean-800">
              MCY → Noosa
            </a>{" "}
            is 30 minutes;{" "}
            <a href="/travel-and-transport/brisbane-airport-to-noosa" className="link text-ocean-800">
              BNE → Noosa
            </a>{" "}
            is 2 hours.
          </p>
        </>
      }
      methodology={
        <HowWeChoose
          criteria={[
            {
              criterion: "Verified guest-room photography",
              rationale:
                "We will not list a property we cannot photograph — see the not-ready banner above.",
            },
            {
              criterion: "Operator-direct booking available",
              rationale:
                "Every luxury property in Noosa runs an operator-direct booking channel with a best-rate guarantee.",
            },
            {
              criterion: "Honest about the gap",
              rationale:
                "Where the verified shortlist is small, we surface the gap rather than pad the list.",
            },
          ]}
        />
      }
      programmes={["operator-direct", "booking"]}
      priceSource="the operator's site"
      lastReviewed="2026-08-31"
      related={ACCOMM_HUB_RELATED}
    />
  );
}
