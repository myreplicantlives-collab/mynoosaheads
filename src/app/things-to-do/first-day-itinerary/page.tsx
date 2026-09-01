import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";
import { VERIFIED } from "@/data/photos-msn2982";
import { EmailCaptureInline } from "@/components/email/EmailCaptureInline";

/**
 * /things-to-do/first-day-itinerary — MSN-2987 V2 chunk 1 structural stub.
 *
 * KUBE progression: full-bleed photo hero → emotional headline → atmospheric
 * intro → visual choices → concise detail → practical info → clear action.
 *
 * Chunk-1 mandate (chairman 2026-08-29): create the route with complete
 * KUBE structure so it returns HTTP 200 on every entry point. Copy and
 * imagery to be replaced in chunk 2 after Albert's photo/factual audit.
 */

export const metadata: Metadata = {
  title: "Your first day in Noosa",
  description:
    "A first-day itinerary for Noosa: headland walk at sunrise, river at sunset.",
  alternates: { canonical: "/things-to-do/first-day-itinerary" },
  openGraph: {
    title: "Your first day in Noosa · MyNoosaHeads",
    description:
      "A first-day itinerary for Noosa: headland walk at sunrise, river at sunset.",
    url: "/things-to-do/first-day-itinerary",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Your first day in Noosa · MyNoosaHeads",
    description:
      "A first-day itinerary for Noosa: headland walk at sunrise, river at sunset.",
  },
};

export default function FirstDayItineraryPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${SITE.productionUrl}/things-to-do/first-day-itinerary#article`,
      url: `${SITE.productionUrl}/things-to-do/first-day-itinerary`,
      headline: "Your first day in Noosa",
      description:
        "A first-day itinerary for Noosa: headland walk at sunrise, river at sunset.",
      inLanguage: SITE.locale,
      isPartOf: { "@id": `${SITE.productionUrl}#website` },
      publisher: { "@id": `${SITE.productionUrl}#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE.brand, item: SITE.productionUrl },
        { "@type": "ListItem", position: 2, name: "Things to do", item: `${SITE.productionUrl}/things-to-do` },
        { "@type": "ListItem", position: 3, name: "First-day itinerary", item: `${SITE.productionUrl}/things-to-do/first-day-itinerary` },
      ],
    },
  ];

  return (
    <div className="bg-paper-50">
      <JsonLd data={jsonLd} />

      {/* Hero — Hastings Street looking east (verified) */}
      <section
        aria-label="Your first day in Noosa"
        className="relative w-full overflow-hidden bg-ink-900 h-[80vh] min-h-[560px] max-h-[1000px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={VERIFIED.cards.hastingsStreetEast.path}
          alt={VERIFIED.cards.hastingsStreetEast.caption}
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-ink-900/15 via-transparent to-ink-900/25"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-900/85 via-ink-900/40 to-transparent"
          aria-hidden="true"
        />
        <div className="relative h-full w-full">
          <div className="container-page h-full flex flex-col justify-end pb-16 md:pb-24">
            <p className="eyebrow text-paper-300">Things to do · Noosa</p>
            <h1
              className="mt-3 font-display text-display-xl md:text-display-xl text-paper-50 text-balance max-w-4xl"
              style={{ textShadow: "0 2px 24px rgba(11,28,28,0.45)" }}
            >
              Your first day in Noosa.
            </h1>
            <p className="mt-4 lead text-paper-200 max-w-3xl text-pretty">
              Headland at sunrise. River at sunset.
            </p>
          </div>
        </div>
      </section>

      {/* Atmospheric intro */}
      <section
        className="border-y border-paper-200 bg-paper-100"
        aria-labelledby="fdi-intro-heading"
      >
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">One day, three Noosas</p>
          <h2
            id="fdi-intro-heading"
            className="mt-3 font-display text-display-md md:text-display-lg text-ink-900 text-balance max-w-3xl"
          >
            The coast in the morning, the river in the evening.
          </h2>
          <p className="mt-5 lead max-w-2xl text-pretty">
            Most first-time visitors fall into the same pattern. Sunrise
            on the headland. A swim and a slow breakfast on Hastings
            Street. Afternoon on the river, with a ferry ride or a
            kayak. Dinner back on the strip.
          </p>
        </div>
      </section>

      {/* Itinerary */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="fdi-itinerary-heading"
      >
        <h2
          id="fdi-itinerary-heading"
          className="font-display text-display-md md:text-display-lg text-ink-900 text-balance mb-10"
        >
          The day in three movements.
        </h2>
        <ol className="space-y-8">
          {[
            {
              title: "Sunrise on the coastal walk",
              body:
                "Start at the Noosa Heads Surf Life Saving Club before 6 am in summer, 6:30 am in winter. Walk the coastal walk to Alexandria Bay and back — about 7 km return — or take a shorter out-and-back to Dolphin Point. Koalas sleep in the tallowwoods; you'll see them if you look up. Granite Bay at first light is the photograph.",
              href: "/noosa-national-park/walks/coastal-walk",
            },
            {
              title: "Mid-morning swim and breakfast",
              body:
                "Back at Main Beach, swim between the flags. The surf club kiosk opens early; the cafés on Hastings Street open a little later. Order the long breakfast — you'll have earned it.",
              href: "/surf-and-weather",
            },
            {
              title: "Afternoon on the Noosa River",
              body:
                "Drive (or take the ferry) across to Noosaville. Hire a kayak, a SUP, or a small pontoon from the foreshore and putter upriver for an hour or two. Lunch on Gympie Terrace. The river is calm, shallow, and the sun is gentler than the beach.",
              href: "/things-to-do/spend-a-day-on-the-river",
            },
            {
              title: "Sunset on the river, dinner on Hastings",
              body:
                "If you have a hire boat or you're on the ferry, watch the sun go down over the water. Otherwise, walk back to Hastings Street for dinner — book ahead in summer and school holidays.",
              href: "/eat-and-drink",
            },
          ].map((step, i) => (
            <li
              key={step.title}
              className="grid gap-6 sm:grid-cols-12 border-b border-paper-200 pb-8 last:border-b-0 last:pb-0"
            >
              <div className="sm:col-span-2">
                <p className="font-display text-display-lg text-ink-900 text-balance">
                  {String(i + 1).padStart(2, "0")}
                </p>
              </div>
              <div className="sm:col-span-10">
                <h3 className="font-display text-display-sm text-ink-900 text-balance">
                  {step.title}
                </h3>
                <p className="mt-3 text-body-md text-ink-800 text-pretty max-w-3xl">
                  {step.body}
                </p>
                <Link
                  href={step.href}
                  className="mt-4 inline-block link text-ocean-800 text-body-sm font-semibold"
                  data-track={`fdi_step_${i + 1}`}
                >
                  More on this <span aria-hidden="true">→</span>
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Practical info */}
      <section
        className="bg-paper-100 border-y border-paper-200"
        aria-labelledby="fdi-practical-heading"
      >
        <div className="container-page py-12 md:py-16">
          <h2
            id="fdi-practical-heading"
            className="font-display text-display-md text-ink-900 text-balance"
          >
            A few things worth knowing.
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 text-body-md text-ink-800">
            <li>
              <strong className="text-ink-900">Sunrise changes with the season:</strong> In December the sun is up by 5 am; in June by 6:30 am. Set the alarm accordingly.
            </li>
            <li>
              <strong className="text-ink-900">Parking:</strong> The Noosa Heads Main Beach carpark on Hastings Street fills by 9 am in summer. Noosa Drive is the overflow. Walk from where you can.
            </li>
            <li>
              <strong className="text-ink-900">Coastal walk length:</strong> The full coastal walk is 10.8 km return to Sunshine Beach. Most first-time visitors turn around at Alexandria Bay.
            </li>
            <li>
              <strong className="text-ink-900">River conditions:</strong> The river is tidal up to Tewantin. Check the BOM Tewantin tide before you hire a kayak.
            </li>
          </ul>
        </div>
      </section>

      {/* Clear action */}
      <section
        className="border-t border-paper-200 bg-paper-50"
        aria-labelledby="fdi-action-heading"
      >
        <div className="container-page py-12 md:py-16 text-center">
          <h2
            id="fdi-action-heading"
            className="font-display text-display-md text-ink-900 text-balance"
          >
            Take it with you.
          </h2>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <Link
              href="/surf-and-weather"
              className="btn-primary btn-md"
              data-track="fdi_action_surf"
            >
              Today&rsquo;s surf and weather
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/noosa-national-park"
              className="btn-outline btn-md"
              data-track="fdi_action_np"
            >
              The headland walks
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 7. Email capture (Workstream 5) — first-day readers convert ─── */}
      <section className="container-narrow py-12 md:py-16 border-t border-paper-200">
        <EmailCaptureInline
          source="first-day-itinerary"
          leadMagnet="first-day-noosa"
          title="Take the first-day plan offline."
        />
      </section>
    </div>
  );
}