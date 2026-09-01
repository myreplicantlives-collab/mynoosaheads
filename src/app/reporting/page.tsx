import type { Metadata } from "next";
import Link from "next/link";
import {
  Hero,
  Card,
  CardBody,
  CardHeader,
} from "@/components/ui";
import {
  buildDisclosureTable,
  AFFILIATE_STACK_STATE,
  VERIFIED_PROGRAMME_IDS,
  ALL_PROGRAMME_IDS,
} from "@/lib/affiliates";
import { SITE } from "@/data/site";

/**
 * /reporting — internal monetisation reporting view.
 *
 * MSN-3057 (Workstream 1 — Measurement and Attribution):
 *   "Create a simple reporting view for: sessions, organic sessions,
 *    commercial clicks, outbound click-through rate, clicks by page
 *    and partner, confirmed bookings, commission revenue, revenue
 *    per 1,000 sessions."
 *
 * This page is the operator-side view: it surfaces the affiliate
 * stack state, the Plausible dashboard target, the event taxonomy
 * we ship, and the roll-up table to read each metric.
 *
 * It is intentionally visitor-readable (no secrets, no individual
 * visitor data) so it can be linked from the footer in production
 * and from the chairman delivery package as evidence. The actual
 * metrics live in the Plausible dashboard — this page tells you
 * which dashboard tab to open and which event name to filter by.
 *
 * To prevent accidental indexing, this page emits the same
 * noindex/nofollow protection as the rest of the dev site, gated
 * on `SITE.isProduction` via the root layout (per MSN-3044 Item 9).
 * In production this page stays out of the sitemap.
 */

export const metadata: Metadata = {
  title: "Reporting",
  description:
    "Internal monetisation reporting view — affiliate stack state, analytics event taxonomy, and the dashboards that hold each metric.",
  alternates: { canonical: "/reporting" },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Reporting · MyNoosaHeads",
    description: "Internal reporting view.",
    url: "/reporting",
    type: "website",
  },
};

/**
 * Event taxonomy — the single source of truth for what we track.
 * Every `data-track` attribute in the codebase corresponds to one
 * of the names below.
 */
const EVENT_TAXONOMY = [
  {
    name: "home_*",
    description:
      "Homepage interactions — tiles, stay/walk/live CTAs, live strip engagement.",
    placement: "/",
    firesOn: ["Link clicks", "Hover (Plausible default)"],
  },
  {
    name: "accomm_*",
    description:
      "Accommodation-page interactions — area cards, property cards, practical info CTAs.",
    placement: "/accommodation",
    firesOn: ["Link clicks"],
  },
  {
    name: "ttd_*",
    description:
      "Things-to-do interaction — itinerary card, deep-page operator CTAs.",
    placement: "/things-to-do, /things-to-do/[slug]",
    firesOn: ["Link clicks"],
  },
  {
    name: "ttd_<experience>_<option>",
    description:
      "Experience option click on a deep page. Captures operator + placement.",
    placement: "/things-to-do/[slug]",
    firesOn: ["Link clicks"],
  },
  {
    name: "surf_action_*",
    description:
      "Surf-and-weather page CTAs into the national park and things-to-do.",
    placement: "/surf-and-weather",
    firesOn: ["Link clicks"],
  },
  {
    name: "area_<id>_*",
    description:
      "Area-page interactions — stay/eat/property/venue cards.",
    placement: "/areas/[area]",
    firesOn: ["Link clicks"],
  },
  {
    name: "live_*",
    description:
      "Live/conditions page CTAs.",
    placement: "/live, /live-conditions",
    firesOn: ["Link clicks"],
  },
  {
    name: "fp_action_*",
    description: "Fairy Pools page CTAs.",
    placement: "/things-to-do/fairy-pools",
    firesOn: ["Link clicks"],
  },
  {
    name: "nwc_*",
    description: "Noosa-with-children page CTAs.",
    placement: "/things-to-do/noosa-with-children",
    firesOn: ["Link clicks"],
  },
  {
    name: "fdi_*",
    description: "First-day itinerary step interactions.",
    placement: "/things-to-do/first-day-itinerary",
    firesOn: ["Link clicks"],
  },
  {
    name: "np_*",
    description: "National Park page CTAs.",
    placement: "/noosa-national-park",
    firesOn: ["Link clicks"],
  },
  {
    name: "eat_*",
    description: "Eat-and-drink page CTAs.",
    placement: "/eat-and-drink, /eat-and-drink/[slug]",
    firesOn: ["Link clicks"],
  },
  {
    name: "shop_*",
    description: "Shopping-page CTAs.",
    placement: "/shopping, /shop/[slug]",
    firesOn: ["Link clicks"],
  },
  {
    name: "contact_*",
    description: "Contact form mailto: and form submission events.",
    placement: "/contact",
    firesOn: ["Link clicks", "Form submit (planned)"],
  },
  {
    name: "areas_card_*",
    description: "Areas index card clicks.",
    placement: "/areas",
    firesOn: ["Link clicks"],
  },
  {
    name: "bn_*",
    description: "Beaches-and-nature page CTAs.",
    placement: "/beaches-and-nature",
    firesOn: ["Link clicks"],
  },
] as const;

const REPORTING_METRICS = [
  {
    metric: "Sessions (total)",
    source: "Plausible — Top metrics",
    filter: "All visits",
    owner: "Dev",
  },
  {
    metric: "Organic sessions",
    source: "Plausible — Channels",
    filter: 'Channel = "Organic Search"',
    owner: "Dev",
  },
  {
    metric: "Commercial outbound clicks",
    source: "Plausible — Custom events",
    filter: "Event name starts with `accomm_property_`, `ttd_`, or `fp_action_` (operator CTAs only)",
    owner: "Dev",
  },
  {
    metric: "Outbound click-through rate",
    source: "Computed",
    filter: "(Commercial outbound clicks) ÷ (Sessions to commercial-intent pages)",
    owner: "Dev",
  },
  {
    metric: "Clicks by partner",
    source: "Network dashboards",
    filter: "Booking.com Partner Programme / Stayz Partner Console / GYG / Viator / Klook — group by label",
    owner: "Dev + sponsor lead",
  },
  {
    metric: "Confirmed bookings",
    source: "Network dashboards",
    filter: "Each network's Bookings tab — match label to placement",
    owner: "Dev + sponsor lead",
  },
  {
    metric: "Commission revenue",
    source: "Network payout statements",
    filter: "Sum of commission earned across all programmes — verified against the network invoice",
    owner: "Sponsor lead",
  },
  {
    metric: "Revenue per 1,000 sessions",
    source: "Computed",
    filter: "(Commission revenue / Total sessions) × 1,000",
    owner: "Dev",
  },
];

export default function ReportingPage() {
  const programmes = buildDisclosureTable();
  const enabledProgrammes = programmes.filter((p) => p.status !== "inactive");
  const verifiedCount = VERIFIED_PROGRAMME_IDS.length;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const plausibleBase =
    plausibleDomain
      ? `https://plausible.io/${encodeURIComponent(plausibleDomain)}`
      : null;

  return (
    <div className="bg-paper-50">
      <Hero
        eyebrow="Internal · reporting"
        title="Monetisation reporting view."
        subtitle="The affiliate stack, the analytics event taxonomy, and the dashboards that hold each metric. Visitor-readable; not for external sharing until an explicit publication check has run."
        flourish="If a metric is missing here, it is missing from the site."
      />

      {/* Stack state */}
      <section
        className="container-page py-12 md:py-16"
        aria-labelledby="stack-heading"
      >
        <h2
          id="stack-heading"
          className="font-display text-display-md text-ink-900 text-balance"
        >
          Affiliate stack state.
        </h2>
        <p className="mt-4 lead text-ink-800 max-w-3xl text-pretty">
          Live values from{" "}
          <code className="font-mono text-caption">
            src/lib/affiliates.ts
          </code>
          . Until a programme is <em>enabled</em> and <em>verified</em>
          {" "}here, no outbound link from this site carries an
          affiliate identifier and the AffiliateBadge does not render.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardBody>
              <p className="eyebrow text-ink-600">Programmes tracked</p>
              <p className="mt-2 font-display text-display-md text-ink-900">
                {AFFILIATE_STACK_STATE.totalProgrammes}
              </p>
              <p className="mt-1 text-caption text-ink-600">
                {ALL_PROGRAMME_IDS.join(", ")}
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="eyebrow text-ink-600">Enabled</p>
              <p className="mt-2 font-display text-display-md text-ink-900">
                {AFFILIATE_STACK_STATE.enabledProgrammes}
              </p>
              <p className="mt-1 text-caption text-ink-600">
                Onboarding initiated
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="eyebrow text-ink-600">Verified</p>
              <p className="mt-2 font-display text-display-md text-ink-900">
                {verifiedCount}
              </p>
              <p className="mt-1 text-caption text-ink-600">
                Live affiliate links
              </p>
            </CardBody>
          </Card>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-body-sm">
            <thead>
              <tr className="border-b-2 border-paper-300">
                <th scope="col" className="py-3 pr-4 font-display text-headline-md text-ink-900">
                  Programme
                </th>
                <th scope="col" className="py-3 pr-4 font-display text-headline-md text-ink-900">
                  Status
                </th>
                <th scope="col" className="py-3 pr-4 font-display text-headline-md text-ink-900">
                  Partner ID
                </th>
                <th scope="col" className="py-3 font-display text-headline-md text-ink-900">
                  Default label
                </th>
              </tr>
            </thead>
            <tbody>
              {programmes.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-paper-200 align-top"
                >
                  <td className="py-4 pr-4 text-ink-900 font-medium">
                    {p.displayName}
                  </td>
                  <td className="py-4 pr-4 text-ink-700">
                    {p.status === "live"
                      ? "Active"
                      : p.status === "pending"
                        ? "Application pending"
                        : "Inactive"}
                  </td>
                  <td className="py-4 pr-4 font-mono text-caption text-ink-700">
                    {/* The partner ID is intentionally not surfaced here —
                       this page is visitor-readable. The canonical source
                       is src/lib/affiliates.ts. */}
                    {"••• not set •••"}
                  </td>
                  <td className="py-4 font-mono text-caption text-ink-700">
                    mynoosaheads
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Plausible dashboard */}
      <section
        className="container-page py-12 md:py-16 border-t border-paper-200 bg-paper-100"
        aria-labelledby="plausible-heading"
      >
        <h2
          id="plausible-heading"
          className="font-display text-display-md text-ink-900 text-balance"
        >
          Plausible Analytics.
        </h2>
        <p className="mt-4 lead text-ink-800 max-w-3xl text-pretty">
          Plausible is privacy-friendly by design — no cookies, no
          personal data, no cross-site tracking. Every visitor event is
          aggregated into a single dashboard accessible only to the
          operator team. The current analytics provider is{" "}
          <code className="font-mono text-caption">
            {AFFILIATE_STACK_STATE.analyticsProvider}
          </code>
          .
        </p>

        {plausibleBase ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <h3 className="font-display text-headline-md text-ink-900">
                  Top metrics
                </h3>
              </CardHeader>
              <CardBody>
                <p className="text-body-sm text-ink-700">
                  Total sessions, bounce rate, visit duration, sources.
                </p>
                <a
                  href={plausibleBase}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline btn-sm mt-4"
                >
                  Open dashboard ↗
                </a>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="font-display text-headline-md text-ink-900">
                  Custom events
                </h3>
              </CardHeader>
              <CardBody>
                <p className="text-body-sm text-ink-700">
                  Every <code>data-track</code> event on the site. Filter
                  by event name to find outbound commercial clicks.
                </p>
                <a
                  href={`${plausibleBase}/custom-events`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline btn-sm mt-4"
                >
                  Open custom events ↗
                </a>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="font-display text-headline-md text-ink-900">
                  Channels
                </h3>
              </CardHeader>
              <CardBody>
                <p className="text-body-sm text-ink-700">
                  Direct, organic, social, referral breakdown — use the
                  Organic Search slice for the SEO gating metric.
                </p>
                <a
                  href={`${plausibleBase}/channels`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline btn-sm mt-4"
                >
                  Open channels ↗
                </a>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="font-display text-headline-md text-ink-900">
                  Pages
                </h3>
              </CardHeader>
              <CardBody>
                <p className="text-body-sm text-ink-700">
                  Per-page views, scroll depth, time on page. Use the
                  filter to isolate commercial-intent pages
                  (<code>/accommodation</code>, <code>/things-to-do/*</code>
                  ).
                </p>
                <a
                  href={`${plausibleBase}/pages`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline btn-sm mt-4"
                >
                  Open pages ↗
                </a>
              </CardBody>
            </Card>
          </div>
        ) : (
          <div className="mt-6 rounded-xl bg-paper-50 ring-1 ring-paper-200 p-6">
            <p className="text-body-md text-ink-800">
              <strong>Plausible domain is not configured in this build.</strong>{" "}
              To enable it, set{" "}
              <code className="font-mono text-caption">
                NEXT_PUBLIC_PLAUSIBLE_DOMAIN
              </code>{" "}
              in the build environment (e.g.{" "}
              <code className="font-mono text-caption">mynoosaheads.com</code>
              ). Until then, traffic is captured by{" "}
              <strong>Cloudflare Workers Analytics</strong> — which is
              non-identifying and aggregated at the edge but does not
              fire the custom outbound-click events Plausible carries.
              Set the domain to enable the full outbound-click
              attribution set out below.
            </p>
          </div>
        )}
      </section>

      {/* Event taxonomy */}
      <section
        className="container-page py-12 md:py-16"
        aria-labelledby="taxonomy-heading"
      >
        <h2
          id="taxonomy-heading"
          className="font-display text-display-md text-ink-900 text-balance"
        >
          Event taxonomy.
        </h2>
        <p className="mt-4 lead text-ink-800 max-w-3xl text-pretty">
          Every outbound commercial click carries a{" "}
          <code>data-track</code> attribute. Plausible captures the
          event name plus the link&apos;s <code>href</code> and visible
          text. Adding a new outbound commercial touchpoint means
          adding a new entry here and a corresponding attribute on the
          consuming component.
        </p>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-body-sm">
            <thead>
              <tr className="border-b-2 border-paper-300">
                <th scope="col" className="py-3 pr-4 font-display text-headline-md text-ink-900">
                  Event prefix
                </th>
                <th scope="col" className="py-3 pr-4 font-display text-headline-md text-ink-900">
                  Description
                </th>
                <th scope="col" className="py-3 pr-4 font-display text-headline-md text-ink-900">
                  Pages
                </th>
                <th scope="col" className="py-3 font-display text-headline-md text-ink-900">
                  Triggers
                </th>
              </tr>
            </thead>
            <tbody>
              {EVENT_TAXONOMY.map((e) => (
                <tr key={e.name} className="border-b border-paper-200 align-top">
                  <td className="py-4 pr-4 font-mono text-caption text-ink-900">
                    {e.name}
                  </td>
                  <td className="py-4 pr-4 text-ink-700">
                    {e.description}
                  </td>
                  <td className="py-4 pr-4 text-ink-700 whitespace-nowrap">
                    {e.placement}
                  </td>
                  <td className="py-4 text-ink-700">
                    {e.firesOn.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reporting metrics */}
      <section
        className="container-page py-12 md:py-16 border-t border-paper-200"
        aria-labelledby="metrics-heading"
      >
        <h2
          id="metrics-heading"
          className="font-display text-display-md text-ink-900 text-balance"
        >
          Reporting metrics.
        </h2>
        <p className="mt-4 lead text-ink-800 max-w-3xl text-pretty">
          The eight metrics required by the mission spec, with the
          source and the filter expression needed to compute them.
          Revenue per 1,000 sessions is the single ratio Albert&apos;s
          monetisation tie-back depends on.
        </p>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-body-sm">
            <thead>
              <tr className="border-b-2 border-paper-300">
                <th scope="col" className="py-3 pr-4 font-display text-headline-md text-ink-900">
                  Metric
                </th>
                <th scope="col" className="py-3 pr-4 font-display text-headline-md text-ink-900">
                  Source
                </th>
                <th scope="col" className="py-3 pr-4 font-display text-headline-md text-ink-900">
                  Filter
                </th>
                <th scope="col" className="py-3 font-display text-headline-md text-ink-900">
                  Owner
                </th>
              </tr>
            </thead>
            <tbody>
              {REPORTING_METRICS.map((m) => (
                <tr key={m.metric} className="border-b border-paper-200 align-top">
                  <td className="py-4 pr-4 text-ink-900 font-medium">
                    {m.metric}
                  </td>
                  <td className="py-4 pr-4 text-ink-700">
                    {m.source}
                  </td>
                  <td className="py-4 pr-4 font-mono text-caption text-ink-700 whitespace-pre-line">
                    {m.filter}
                  </td>
                  <td className="py-4 text-ink-700 whitespace-nowrap">
                    {m.owner}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="container-narrow py-10">
        <div className="rounded-xl bg-paper-100 ring-1 ring-paper-200 p-6">
          <p className="text-body-sm text-ink-700">
            Cross-references:{" "}
            <Link href="/disclosure" className="link text-ocean-700">
              full affiliate disclosure
            </Link>
            ,{" "}
            <Link href="/privacy" className="link text-ocean-700">
              privacy policy
            </Link>
            , and the Plausible event taxonomy above. To report a
            missing event or a tracking bug, please{" "}
            <Link href="/contact" className="link text-ocean-700">
              contact the editorial team
            </Link>
            . Page contact:{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="link text-ocean-700"
            >
              {SITE.email}
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
