import type { Metadata } from "next";
import {
  CommercialPage,
  ActivityCard,
  HowWeChoose,
  WhyWeRecommend,
  ParentHubLink,
} from "@/components/commercial";
import { HINTERLAND_OPERATORS } from "@/data/commercial";
import { ACTIVITY_DEEP_RELATED } from "@/data/commercial-related";
import { VERIFIED } from "@/data/photos-msn2982";

export const metadata: Metadata = {
  title: "Noosa hinterland day trips",
  description:
    "Day trips into the Noosa hinterland — Eumundi Markets, the Blackall Range villages, and the gateway towns.",
  alternates: { canonical: "/things-to-do/hinterland-day-trips" },
  openGraph: {
    title: "Noosa hinterland day trips · MyNoosaHeads",
    description: "Eumundi Markets + the Blackall Range villages.",
    url: "/things-to-do/hinterland-day-trips",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noosa hinterland day trips",
    description: "Eumundi Markets + the Blackall Range villages.",
  },
};

export default function HinterlandDayTripsPage() {
  return (
    <CommercialPage
      slug="things-to-do/hinterland-day-trips"
      title="Noosa hinterland day trips"
      description="Day trips into the Noosa hinterland — Eumundi Markets, the Blackall Range villages, and the gateway towns."
      category="Things to do"
      intent="Hinterland · Eumundi Markets + Blackall Range villages"
      h1={<>Noosa hinterland day trips.</>}
      intro={
        <>
          The Noosa hinterland is the Blackall Range west of the coast —
          Eumundi, Cooroy, Pomona, Cooran, Kin Kin. A car is the practical
          way to see them. The Eumundi Markets (Wed + Sat) are the famous
          gateway; the smaller villages are the slow-traveller pick.
        </>
      }
      hero={{
        src: VERIFIED.cards.eumundiMarkets.path,
        alt: VERIFIED.cards.eumundiMarkets.caption,
      }}
      notReady={{
        reason:
          "We don't currently curate a comprehensive hinterland operator list — the verified shortlist is small. We surface the one operator (Eumundi Markets) we can verify and link to the regional tourism bodies for the villages.",
        targetDate: "2026-12-31",
      }}
      sections={[
        {
          heading: "Where to go.",
          body: (
            <>
              <p>
                <strong>Eumundi (15 min drive).</strong> The Original Eumundi
                Markets on Memorial Drive, Wed + Sat mornings. Stalls under
                the fig trees; the best regional maker market on the
                Sunshine Coast.
              </p>
              <p>
                <strong>Cooroy (15 min drive).</strong> Small town at the foot
                of the Blackall Range. The Butter Factory Arts Centre hosts
                a monthly artisan market; the town has a couple of cafés
                and a Woolworths.
              </p>
              <p>
                <strong>Pomona (30 min drive).</strong> The original
                Noosa-region town; a Saturday market; the walk up Mount
                Cooroora for the views.
              </p>
              <p>
                <strong>Kin Kin (40 min drive).</strong> The smallest of the
                four villages; the kind of place with one general store
                and a pottery gallery.
              </p>
            </>
          ),
        },
        {
          heading: "Picks.",
          body: (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {HINTERLAND_OPERATORS.map((op) => (
                <ActivityCard
                  key={op.name}
                  operator={op.name}
                  descriptor={op.descriptor}
                  bestFor={op.bestFor}
                  duration={op.duration}
                  priceBand={op.priceBand}
                  href={op.url}
                  placement={`hinterland-${op.name.toLowerCase().replace(/\s+/g, "-")}`}
                  image={op.photo}
                  useTourCTA
                  ctaLabel="See what's on"
                />
              ))}
            </div>
          ),
        },
        {
          heading: "How to get there.",
          body: (
            <>
              <p>
                The Eumundi–Noosa Road is the main route. By car, Eumundi is
                15 minutes, Cooroy is 15 minutes, Pomona is 30 minutes, Kin
                Kin is 40 minutes. There&apos;s no scheduled public transport
                to the smaller villages — a hire car is the practical
                option. See{" "}
                <a href="/travel-and-transport/car-hire" className="link text-ocean-800">
                  Noosa car hire
                </a>
                .
              </p>
              <p>
                The Noosa Transit bus runs to Eumundi (route 631) and
                Cooroy (route 632) but not to Pomona or Kin Kin.
              </p>
            </>
          ),
        },
      ]}
      locationContext={
        <>
          <p>
            From BNE: ~2 hours via the Bruce Highway (M1) and the
            Eumundi–Noosa Road. From MCY: ~30 minutes via the Sunshine
            Motorway and the Eumundi–Noosa Road.
          </p>
          <p>
            Most visitors without a car join a guided day tour from
            Noosa — the operator shortlist is small but the tours cover
            Eumundi Markets plus one or two of the smaller villages.
          </p>
        </>
      }
      methodology={
        <HowWeChoose
          criteria={[
            {
              criterion: "Verified operator",
              rationale:
                "We list operators with a working booking URL and a recent last-verified date.",
            },
            {
              criterion: "Honest about the gap",
              rationale:
                "The hinterland operator shortlist is small — we don&apos;t pad the list.",
            },
            {
              criterion: "Car-friendly defaults",
              rationale:
                "All the hinterland villages require a car or a guided tour.",
            },
          ]}
        />
      }
      programmes={["operator-direct"]}
      priceSource="the operator's site"
      lastReviewed="2026-08-31"
      related={ACTIVITY_DEEP_RELATED}
    />
  );
}
