import type { Metadata } from "next";
import {
  CommercialPage,
  ActivityCard,
  HowWeChoose,
  WhyWeRecommend,
  ParentHubLink,
} from "@/components/commercial";
import { FAMILY_ACTIVITY_OPERATORS } from "@/data/commercial";
import { ACTIVITY_DEEP_RELATED } from "@/data/commercial-related";
import { VERIFIED } from "@/data/photos-msn2982";

export const metadata: Metadata = {
  title: "Noosa activities for families",
  description:
    "Bookable family experiences in Noosa — kayak tours, ferry day passes, and the patrolled beach routine.",
  alternates: { canonical: "/things-to-do/families" },
  openGraph: {
    title: "Noosa activities for families · MyNoosaHeads",
    description: "Bookable family experiences.",
    url: "/things-to-do/families",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noosa activities for families",
    description: "Bookable family experiences.",
  },
};

export default function FamiliesActivityPage() {
  return (
    <CommercialPage
      slug="things-to-do/families"
      title="Noosa activities for families"
      description="Bookable family experiences in Noosa — kayak tours, ferry day passes, and the patrolled beach routine."
      category="Things to do"
      intent="Family bookable experiences · age-banded"
      h1={<>Noosa activities for families.</>}
      intro={
        <>
          This page covers the <em>bookable</em> family experiences — guided
          kayak tours, ferry day passes, and the operators that publish
          family-friendly rates. For the editorial hub on Noosa with kids
          (patrolled swimming, ferry rides, slow river days) see{" "}
          <a href="/things-to-do/noosa-with-children" className="link text-ocean-800">
            Noosa with children
          </a>
          .
        </>
      }
      hero={{
        src: VERIFIED.cards.sunshineBeach.path,
        alt: VERIFIED.cards.sunshineBeach.caption,
      }}
      sections={[
        {
          heading: "What to book.",
          body: (
            <>
              <p>
                <strong>Guided family kayak tour.</strong> The lower Noosa
                River is calm and protected — perfect for a first family
                kayak outing. Most operators have a minimum age (typically
                6) and a tandem kayak for parent + small child. The tour
                lasts 1.5–2 hours.
              </p>
              <p>
                <strong>Ferry day pass.</strong> The Noosa Ferry all-day
                pass is the cheapest family-friendly activity on the river
                — hop on and off at the Noosa Heads and Noosaville
                wharves. Younger kids love it; older kids like the
                freedom.
              </p>
              <p>
                <strong>Patrolled beach routine.</strong> The Main Beach
                patrolled section (Surf Club to the headland steps) is the
                default for families. Sunshine Beach patrolled section is
                across the road from Sunshine Beach Resort. Both have
                toilets, showers, and the surf club is a place to ask
                questions about conditions.
              </p>
            </>
          ),
        },
        {
          heading: "Picks.",
          body: (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FAMILY_ACTIVITY_OPERATORS.map((op) => (
                <ActivityCard
                  key={op.name}
                  operator={op.name}
                  descriptor={op.descriptor}
                  bestFor={op.bestFor}
                  duration={op.duration}
                  priceBand={op.priceBand}
                  href={op.url}
                  placement={`families-${op.name.toLowerCase().replace(/\s+/g, "-")}`}
                  image={op.photo}
                  useTourCTA
                  ctaLabel="Book family experience"
                />
              ))}
            </div>
          ),
        },
        {
          heading: "What to skip.",
          body: (
            <>
              <p>
                <strong>Everglades full-day tours with young kids.</strong>{" "}
                The coach ride to the upper river is 30 minutes each way
                and the tannin-stained water isn&apos;t great for swimming.
                For under-8s, stick to the lower river kayak or the ferry.
              </p>
              <p>
                <strong>Long-distance surf lessons for under-10s.</strong>{" "}
                The 2-hour group lesson is fine for kids who can swim
                confidently. For younger kids, a 1-hour beach-briefing-only
                option is sometimes offered — check with the operator
                before booking.
              </p>
            </>
          ),
        },
      ]}
      locationContext={
        <>
          <p>
            From Hastings Street, the ferry wharf is at the bottom of the
            street and the Main Beach patrolled section is across the
            road. From Noosaville, the kayak and paddleboard hire operators
            are five minutes south on Gympie Terrace.
          </p>
        </>
      }
      methodology={
        <HowWeChoose
          criteria={[
            {
              criterion: "Operator-direct with family-friendly rates",
              rationale:
                "Family-friendly should mean family rates — not just family-friendly copy.",
            },
            {
              criterion: "Minimum age + safety briefing",
              rationale:
                "Each operator publishes a minimum age; confirm before booking.",
            },
            {
              criterion: "Honest about what to skip",
              rationale:
                "Not every family-friendly activity suits every age band.",
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
