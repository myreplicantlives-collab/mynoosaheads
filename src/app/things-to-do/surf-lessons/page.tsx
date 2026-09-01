import type { Metadata } from "next";
import {
  CommercialPage,
  ActivityCard,
  HowWeChoose,
  WhyWeRecommend,
  ParentHubLink,
} from "@/components/commercial";
import { SURF_LESSON_OPERATORS } from "@/data/commercial";
import { ACTIVITY_HUB_RELATED } from "@/data/commercial-related";
import { VERIFIED } from "@/data/photos-msn2982";

export const metadata: Metadata = {
  title: "Noosa surf lessons",
  description:
    "Where to take a surf lesson in Noosa — the four Main Beach surf schools, group vs private, and what to bring.",
  alternates: { canonical: "/things-to-do/surf-lessons" },
  openGraph: {
    title: "Noosa surf lessons · MyNoosaHeads",
    description: "Four Main Beach surf schools.",
    url: "/things-to-do/surf-lessons",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noosa surf lessons",
    description: "Four Main Beach surf schools.",
  },
};

export default function SurfLessonsPage() {
  return (
    <CommercialPage
      slug="things-to-do/surf-lessons"
      title="Noosa surf lessons"
      description="Where to take a surf lesson in Noosa — the four Main Beach surf schools, group vs private, and what to bring."
      category="Things to do"
      intent="Surf lessons · Main Beach · soft boards · group + private"
      h1={<>Noosa surf lessons.</>}
      intro={
        <>
          Four operators at Noosa Main Beach — soft-board group lessons for
          first-timers and small-group / private coaching for returning
          surfers. The beach is patrolled; the surf is gentle in summer;
          the lesson takes two hours including a beach briefing.
        </>
      }
      hero={{
        src: VERIFIED.cards.paddlingOut.path,
        alt: VERIFIED.cards.paddlingOut.caption,
      }}
      sections={[
        {
          heading: "What to expect.",
          body: (
            <>
              <p>
                Two hours from beach-briefing to back-on-the-sand. Most
                operators start on the grass with technique (paddling,
                popping up, ocean awareness) before heading into waist-deep
                water. Soft boards and rash vests are supplied; bring a
                towel, swimwear, sunscreen.
              </p>
              <p>
                Noosa Main Beach is a patrolled, gentle beach in summer
                (December–February) — perfect for a first lesson. In winter
                the surf picks up and conditions become more challenging;
                most schools set a minimum age of 8 and a swimming comfort
                bar.
              </p>
              <p>
                The four operators below differ on the <em>kind</em> of
                lesson (group vs small-group vs private) and on the
                <em> coaching approach</em> (technique-first vs coaching-first).
                Most are 2 hours; private lessons can be 1.5–3 hours.
              </p>
            </>
          ),
        },
        {
          heading: "Picks.",
          body: (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SURF_LESSON_OPERATORS.map((op) => (
                <ActivityCard
                  key={op.name}
                  operator={op.name}
                  descriptor={op.descriptor}
                  bestFor={op.bestFor}
                  duration={op.duration}
                  priceBand={op.priceBand}
                  href={op.url}
                  placement={`surf-lessons-${op.name.toLowerCase().replace(/\s+/g, "-")}`}
                  image={op.photo}
                  useTourCTA
                  ctaLabel="Book a lesson"
                />
              ))}
            </div>
          ),
        },
        {
          heading: "Group vs private.",
          body: (
            <>
              <p>
                <strong>Group lessons</strong> (Noosa Longboards, Noosa Beach
                Surf Lessons) are typically 6–10 students per instructor and
                the cheapest option. Best for first-time surfers and groups
                of friends.
              </p>
              <p>
                <strong>Small-group / coaching</strong> (Merrick&apos;s) is
                2–4 students per instructor — more individual feedback, a
                stronger technique focus, and a price band 30–50% higher
                than group lessons.
              </p>
              <p>
                <strong>Private coaching</strong> (Surfcoaching) is
                one-on-one or one-on-two — for returning surfers who want
                video review and personalised drills. The most expensive
                option; the strongest progression per hour.
              </p>
            </>
          ),
        },
        {
          heading: "Conditions check.",
          body: (
            <>
              <p>
                Before booking, check the live{" "}
                <a href="/surf-and-weather" className="link text-ocean-700">
                  surf and weather
                </a>{" "}
                tile. If the wind is onshore (east to south-east) and the
                swell is over 1.5 m, the surf school will often call to
                reschedule — the booking is usually flexible. Verify the
                operator&apos;s reschedule policy before booking.
              </p>
            </>
          ),
        },
      ]}
      locationContext={
        <>
          <p>
            All four operators run from Noosa Main Beach — the patrolled
            section between the Surf Club and the headland. Most start on
            the grass in front of the surf club before heading into the
            water.
          </p>
          <p>
            Walk to the beach from Hastings Street (1 minute) or the Noosa
            Heads end of Noosaville via the Noosa Ferry (15 minutes).
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
              criterion: "Patrolled beach + soft boards",
              rationale:
                "Family-friendly defaults: surf club on the beach, soft boards for first lessons.",
            },
            {
              criterion: "Honest about group vs private",
              rationale:
                "We don&apos;t pretend all lessons are the same — the four picks cover group, small-group, and private.",
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
