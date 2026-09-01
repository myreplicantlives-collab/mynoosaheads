import type { Metadata } from "next";
import {
  CommercialPage,
  ActivityCard,
  HowWeChoose,
  WhyWeRecommend,
  ParentHubLink,
} from "@/components/commercial";
import { HIRE_OPERATORS } from "@/data/commercial";
import { ACTIVITY_HUB_RELATED } from "@/data/commercial-related";
import { VERIFIED } from "@/data/photos-msn2982";

export const metadata: Metadata = {
  title: "Kayak and paddleboard hire in Noosa",
  description:
    "Walk-up kayak and stand-up paddleboard hire on the Noosaville foreshore — what to expect, how long, what to bring.",
  alternates: { canonical: "/things-to-do/kayak-and-paddleboard-hire" },
  openGraph: {
    title: "Kayak and paddleboard hire in Noosa · MyNoosaHeads",
    description: "Walk-up hire on the Noosaville foreshore.",
    url: "/things-to-do/kayak-and-paddleboard-hire",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kayak and paddleboard hire in Noosa",
    description: "Walk-up hire on the Noosaville foreshore.",
  },
};

export default function KayakAndPaddleboardHirePage() {
  return (
    <CommercialPage
      slug="things-to-do/kayak-and-paddleboard-hire"
      title="Kayak and paddleboard hire in Noosa"
      description="Walk-up kayak and stand-up paddleboard hire on the Noosaville foreshore — what to expect, how long, what to bring."
      category="Things to do"
      intent="Walk-up hire · Noosaville foreshore · hourly"
      h1={<>Kayak and paddleboard hire in Noosa.</>}
      intro={
        <>
          Walk-up kayak and stand-up paddleboard hire on the Noosaville
          foreshore — most operators are right on Gympie Terrace and you
          can turn up without a booking. The lower Noosa River is calm and
          tidal; perfect for first-timers and for kids on a tandem kayak.
        </>
      }
      hero={VERIFIED.cards.morningRiver}
      sections={[
        {
          heading: "What to expect.",
          body: (
            <>
              <p>
                Show up, hire the craft, get a 30-second safety briefing,
                and you&apos;re on the water. Most operators hire by the
                hour; the half-day price is the right value if you want
                to drift up-river for a picnic. Single and double kayaks
                are standard; SUPs are available at most operators. PFDs
                (life jackets) are supplied and required for under-12s in
                Queensland.
              </p>
              <p>
                The lower Noosa River is tidal and protected — no swell,
                no surf, no current to speak of. Wind is the variable:
                a southerly in the afternoon makes paddling back up-river
                work. Plan to be back on shore before the wind picks up.
              </p>
            </>
          ),
        },
        {
          heading: "Picks.",
          body: (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {HIRE_OPERATORS.map((op) => (
                <ActivityCard
                  key={op.name}
                  operator={op.name}
                  descriptor={op.descriptor}
                  bestFor={op.bestFor}
                  duration={op.duration}
                  priceBand={op.priceBand}
                  href={op.url}
                  placement={`kayak-hire-${op.name.toLowerCase().replace(/\s+/g, "-")}`}
                  image={op.photo}
                  useTourCTA={false}
                  ctaLabel="Check hire rates"
                />
              ))}
            </div>
          ),
        },
        {
          heading: "SUP vs kayak.",
          body: (
            <>
              <p>
                <strong>Kayak</strong> is the easier first craft — sit down,
                paddle forward, low centre of gravity. The default for
                families with kids and for visitors who want a relaxed hour
                on the water.
              </p>
              <p>
                <strong>Stand-up paddleboard (SUP)</strong> is the more
                active option — standing balance, paddle forward, much
                better core workout. SUPs are fine on a flat river; on
                swell they require some balance practice first.
              </p>
              <p>
                Most operators will let you switch craft on the day —
                ask before paying.
              </p>
            </>
          ),
        },
      ]}
      locationContext={
        <>
          <p>
            Both operators are on the Noosaville foreshore (Gympie Terrace).
            Walk from South Pacific Resort & Spa in five minutes; walk
            from Hastings Street apartments is 25 minutes via the Noosa
            Ferry.
          </p>
        </>
      }
      methodology={
        <HowWeChoose
          criteria={[
            {
              criterion: "Walk-up, no booking required",
              rationale:
                "Walk-up hire is the point — these operators serve the spontaneity case.",
            },
            {
              criterion: "Hourly pricing",
              rationale:
                "Operators that don&apos;t publish hourly rates are harder to compare; we only list those that do.",
            },
            {
              criterion: "PFDs + safety briefing",
              rationale:
                "PFDs are required by QLD law for under-12s; safety briefings are mandatory at every operator.",
            },
          ]}
        />
      }
      programmes={["operator-direct"]}
      priceSource="the operator's site"
      lastReviewed="2026-08-31"
      related={ACTIVITY_HUB_RELATED}
    />
  );
}
