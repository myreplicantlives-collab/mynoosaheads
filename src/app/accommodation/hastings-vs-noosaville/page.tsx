import type { Metadata } from "next";
import {
  CommercialPage,
  ComparisonTable,
  HowWeChoose,
  WhyWeRecommend,
  ParentHubLink,
} from "@/components/commercial";
import { ACCOMM_AREA_RELATED } from "@/data/commercial-related";
import { VERIFIED } from "@/data/photos-msn2982";

export const metadata: Metadata = {
  title: "Hastings Street versus Noosaville",
  description:
    "Where should you stay in Noosa? Side-by-side comparison of Hastings Street and Noosaville.",
  alternates: { canonical: "/accommodation/hastings-vs-noosaville" },
  openGraph: {
    title: "Hastings Street versus Noosaville · MyNoosaHeads",
    description: "Side-by-side area decision aid.",
    url: "/accommodation/hastings-vs-noosaville",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hastings Street versus Noosaville",
    description: "Side-by-side area decision aid.",
  },
};

export default function HastingsVsNoosavillePage() {
  return (
    <CommercialPage
      slug="accommodation/hastings-vs-noosaville"
      title="Hastings Street versus Noosaville"
      description="Where should you stay in Noosa? Side-by-side comparison of Hastings Street and Noosaville."
      category="Where to stay"
      intent="Decision aid · side-by-side"
      h1={<>Hastings Street versus Noosaville.</>}
      intro={
        <>
          The most common Noosa question. The honest answer depends on what
          you want to walk to. Hastings Street is the walkable one (Main
          Beach at the bottom, headland at the top). Noosaville is the
          river one (Gympie Terrace foreshore, the ferry wharf, a
          supermarket within a five-minute drive). The Noosa Ferry connects
          the two every 30 minutes in summer.
        </>
      }
      hero={{
        src: VERIFIED.cards.morningRiver.path,
        alt: VERIFIED.cards.morningRiver.caption,
      }}
      sections={[
        {
          heading: "Quick verdict.",
          body: (
            <>
              <p>
                <strong>Pick Hastings Street</strong> if you want to be in the
                centre of the evening action — restaurants, bars, the
                surf club, the cinema, the headland walk at sunrise.
                Hastings Street paid parking fills by 11 am in summer; the
                apartment-hotel picks (Netanya is the curated example) sell
                parking permits.
              </p>
              <p>
                <strong>Pick Noosaville</strong> if you want a kitchen, a
                pool, a supermarket, and a quieter precinct that&apos;s a
                15-minute ferry ride back to Hastings Street. South Pacific
                Resort & Spa is the curated pick — heated lagoon pool, walk
                to the ferry wharf.
              </p>
              <p>
                <strong>If in doubt</strong>: stay in Hastings Street for two
                nights and Noosaville for three. Most Noosa stays are five
                nights; the split gives you the walkable experience and the
                river one. (You can do this with two bookings at the two
                operators below.)
              </p>
            </>
          ),
        },
        {
          heading: "Side by side.",
          body: (
            <ComparisonTable
              caption="Each row is one decision factor. The band on the right is what you actually get."
              source="Verified via Google Maps walking distances and the Noosa Ferry timetable."
              columns={[
                {
                  heading: "Hastings Street",
                  bestFor: "Walk to Main Beach · walk to dinner",
                },
                {
                  heading: "Noosaville",
                  bestFor: "River · pool · ferry-served",
                },
              ]}
              rows={[
                {
                  label: "Walk to Main Beach",
                  values: ["1–2 minutes", "Ferry (15 min) or drive (20 min)"],
                },
                {
                  label: "Walk to restaurants",
                  values: ["Yes — same street", "Yes — Gympie Terrace foreshore"],
                },
                {
                  label: "Heated pool at the apartment",
                  values: ["No (small outdoor pool)", "Yes — South Pacific lagoon"],
                },
                {
                  label: "Supermarket walk",
                  values: ["10-min walk to smaller shops", "5-min drive to Woolworths"],
                },
                {
                  label: "Evening commute to Hastings",
                  values: ["You&apos;re there", "15 min by ferry or 20 by car"],
                },
                {
                  label: "Parking",
                  values: ["Paid, fills by 11 am", "Free at most apartments"],
                },
                {
                  label: "Heads-up",
                  values: ["Crowds in school holidays", "Quiet precinct; evening commute"],
                },
              ]}
            />
          ),
        },
        {
          heading: "The honest trade-offs.",
          body: <Tradeoffs />,
        },
      ]}
      locationContext={
        <>
          <p>
            Hastings Street and Noosaville are connected by the Noosa Ferry
            (every 30 minutes in summer). The Bruce Highway (M1) runs between
            the two — driving is 15–20 minutes depending on traffic.
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
              criterion: "Verified walking distances",
              rationale:
                "Each row uses literal Google Maps walking distances — not estimates.",
            },
            {
              criterion: "Honest about the trade-offs",
              rationale:
                "Hastings fills by 11 am in summer. Noosaville has the ferry-ride commute.",
            },
            {
              criterion: "No invented advantages",
              rationale:
                "We don&apos;t add benefits the precinct doesn&apos;t have. The table is honest.",
            },
          ]}
        />
      }
      programmes={["operator-direct"]}
      priceSource="the operator's site"
      lastReviewed="2026-08-31"
      related={ACCOMM_AREA_RELATED}
    />
  );
}

function Tradeoffs() {
  return (
    <>
      <p>
        <strong>Hastings Street trade-offs.</strong> The biggest is the
        parking. Hastings Street paid parking fills by 11 am in summer and
        the overflow is Noosa Drive — a ten-minute walk back. The
        apartment-hotel picks (Netanya) sell parking permits at reception,
        but the supply is limited. The other trade-off is the noise:
        Hastings Street restaurants stay open until 11 pm in summer, and
        the front-of-house rooms hear the street.
      </p>
      <p>
        <strong>Noosaville trade-offs.</strong> The biggest is the
        evening commute. The Noosa Ferry stops around 9 pm in summer —
        dinner on Hastings Street means a taxi or a designated driver
        home. The other trade-off is the river-versus-ocean choice: the
        Noosa River is tidal and warm, but the surf at Main Beach is the
        reason most visitors come to Noosa. If the surf is the primary
        draw, Noosaville adds 20 minutes of driving per session.
      </p>
      <div className="mt-6">
        <WhyWeRecommend
          for="Hastings Street (Netanya Noosa)"
          body="Netanya is the walkable pick for visitors who want Main Beach at the bottom of the street and the headland walk at the top. Older bathrooms, paid parking fills by 11 am — but the evening action is on your doorstep."
          byline="Dexter · for MyNoosaHeads"
        />
      </div>
      <p className="mt-8 text-caption italic text-ink-600">
        <ParentHubLink href="/accommodation" label="all areas" />
      </p>
    </>
  );
}
