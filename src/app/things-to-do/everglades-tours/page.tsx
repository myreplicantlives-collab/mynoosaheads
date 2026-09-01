import type { Metadata } from "next";
import {
  CommercialPage,
  ActivityCard,
  HowWeChoose,
  WhyWeRecommend,
  ParentHubLink,
} from "@/components/commercial";
import { EVERGLADES_OPERATORS } from "@/data/commercial";
import { ACTIVITY_HUB_RELATED } from "@/data/commercial-related";
import { VERIFIED } from "@/data/photos-msn2982";

export const metadata: Metadata = {
  title: "Noosa Everglades tours",
  description:
    "Cruise + kayak tours into the upper Noosa River (the river of mirrors) — operators and what to expect.",
  alternates: { canonical: "/things-to-do/everglades-tours" },
  openGraph: {
    title: "Noosa Everglades tours · MyNoosaHeads",
    description: "Cruise + kayak tours into the upper Noosa River.",
    url: "/things-to-do/everglades-tours",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noosa Everglades tours",
    description: "Cruise + kayak tours into the upper Noosa River.",
  },
};

export default function EvergladesToursPage() {
  return (
    <CommercialPage
      slug="things-to-do/everglades-tours"
      title="Noosa Everglades tours"
      description="Cruise + kayak tours into the upper Noosa River (the river of mirrors) — operators and what to expect."
      category="Things to do"
      intent="Upper Noosa River · cruise + kayak · half day"
      h1={<>Noosa Everglades tours.</>}
      intro={
        <>
          The Noosa Everglades is the tannin-stained upper Noosa River system
          between Lake Cootharaba and the coast — sometimes called the
          &quot;river of mirrors&quot; for the stillness of the water in
          the morning. Half-day cruise + kayak tours from the Noosaville
          wharf are the most common way to see it; Habitat Noosa at Lake
          Cootharaba is the gateway operator if you want to camp.
        </>
      }
      hero={{
        src: VERIFIED.cards.noosaEverglades.path,
        alt: VERIFIED.cards.noosaEverglades.caption,
      }}
      sections={[
        {
          heading: "What to expect.",
          body: (
            <>
              <p>
                A 30-minute coach transfer from Noosa Heads or Noosaville to
                the upper river boat ramp, then a slow cruise through the
                paperbark channels to a calm lunch spot, then either a
                kayak loop or a return cruise. Half-day tours run morning
                and afternoon; full-day tours combine cruise + kayak + a
                walk to Fig Tree Walk.
              </p>
              <p>
                Wildlife: the upper Noosa River has the second-highest density
                of raptors in Australia (white-bellied sea-eagle, osprey,
                whistling kite) plus the occasional platypus at dawn.
                Tannin-stained water means fewer swimming holes but the
                reflections are the point.
              </p>
            </>
          ),
        },
        {
          heading: "Picks.",
          body: (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {EVERGLADES_OPERATORS.map((op) => (
                <ActivityCard
                  key={op.name}
                  operator={op.name}
                  descriptor={op.descriptor}
                  bestFor={op.bestFor}
                  duration={op.duration}
                  priceBand={op.priceBand}
                  href={op.url}
                  placement={`everglades-tours-${op.name.toLowerCase().replace(/\s+/g, "-")}`}
                  image={op.photo}
                  useTourCTA
                  ctaLabel="View tour options"
                />
              ))}
            </div>
          ),
        },
        {
          heading: "Cruise vs kayak.",
          body: (
            <>
              <p>
                <strong>Cruise-only</strong> tours are the most popular for
                first-timers — sit on a flat-bottomed boat, glide through the
                paperbark channels, listen to the commentary. Best for
                families with younger kids and for visitors with limited
                mobility.
              </p>
              <p>
                <strong>Cruise + kayak</strong> tours give you the boat ride
                in and a kayak loop back at your own pace. Better for
                repeat-visitors and for visitors who want to actually paddle
                on the still water.
              </p>
              <p>
                <strong>Self-guided kayak</strong> is also possible — start
                from Habitat Noosa at Lake Cootharaba and paddle the lower
                stretches. The tannin water obscures depth so stay within
                the marked channels.
              </p>
            </>
          ),
        },
      ]}
      locationContext={
        <>
          <p>
            The Noosa Everglades are 30 minutes by coach from Noosa Heads.
            Most operators include the transfer. If driving, follow the
            Boreen Point turnoff from the Eumundi–Noosa Road; the road
            ends at the Lake Cootharaba boat ramp.
          </p>
          <p>
            <strong>From BNE:</strong> ~2 hours via the Bruce Highway and the
            Eumundi–Noosa Road. See{" "}
            <a href="/travel-and-transport/brisbane-airport-to-noosa" className="link text-ocean-700">
              BNE → Noosa transfers
            </a>
            .
          </p>
        </>
      }
      methodology={
        <HowWeChoose
          criteria={[
            {
              criterion: "Verified operator-direct listing",
              rationale:
                "Every operator links to their own site; no network redirect.",
            },
            {
              criterion: "Half-day or full-day options",
              rationale:
                "Different operators serve different time budgets — we surface the duration band on each card.",
            },
            {
              criterion: "Honest about the wildlife claim",
              rationale:
                "Raptors are reliable; platypus sightings are not.",
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
