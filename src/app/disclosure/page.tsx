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
} from "@/lib/affiliates";
import { SITE } from "@/data/site";

/**
 * /disclosure — MSN-3057 (Workstream 1) + ACCC Schedule 2 compliance.
 *
 * Visitor-facing page that lists every commercial partner programme
 * with its current participation status. Per ACCC Schedule 2
 * (Australian Consumer Law), material connections must be disclosed
 * clearly and prominently — the full canonical disclosure lives here
 * plus a footer link.
 *
 * The page also documents:
 *   - Analytics provider + the event taxonomy we use to track outbound
 *     commercial clicks
 *   - The data the operator-side dashboards receive (no personal data;
 *     only aggregated click counts and click-ref labels)
 *   - How to verify, opt out, or report a problem
 */

export const metadata: Metadata = {
  title: "Affiliate disclosure",
  description:
    "How MyNoosaHeads makes money — the affiliate programmes we participate in, the analytics we run, and your choices. Competition and Consumer Act 2010 (Cth) Schedule 2.",
  alternates: { canonical: "/disclosure" },
  openGraph: {
    title: "Affiliate disclosure · MyNoosaHeads",
    description: "How MyNoosaHeads makes money.",
    url: "/disclosure",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Affiliate disclosure · MyNoosaHeads",
    description: "How MyNoosaHeads makes money.",
  },
};

const STATUS_LABEL: Record<string, { label: string; tone: string }> = {
  live: {
    label: "Active programme",
    tone: "text-ocean-800",
  },
  pending: {
    label: "Application pending",
    tone: "text-ink-600",
  },
  inactive: {
    label: "Not currently participating",
    tone: "text-ink-500",
  },
};

export default function DisclosurePage() {
  const programmes = buildDisclosureTable();
  const updated = new Date().toISOString().slice(0, 10);

  return (
    <div className="bg-paper-50">
      <Hero
        eyebrow="Competition and Consumer Act 2010 (Cth) Schedule 2"
        title="How this site makes money."
        subtitle="A complete list of the commercial partner programmes we participate in, the analytics we run, and the editorial firewall that keeps recommendations honest."
        flourish="Some links earn us a small commission."
      />

      <section
        className="container-narrow py-12 md:py-16"
        aria-labelledby="summary-heading"
      >
        <h2
          id="summary-heading"
          className="font-display text-display-md text-ink-900 text-balance"
        >
          The short version.
        </h2>
        <p className="mt-5 lead text-ink-800 text-pretty">
          Some links on MyNoosaHeads are affiliate links. If you book or
          purchase through them, we may earn a small commission at no
          extra cost to you. Affiliate relationships do not influence
          the editorial content we publish; the editorial firewall is
          absolute and is set out below.
        </p>

        <div className="mt-8 rounded-xl bg-paper-100 ring-1 ring-paper-200 p-6">
          <p className="text-body-sm text-ink-700">
            <strong className="text-ink-900">Last reviewed:</strong>{" "}
            <time dateTime={updated}>{updated}</time>. This page is the
            canonical disclosure for MyNoosaHeads and supersedes any
            earlier version of the disclosure footer language.
          </p>
        </div>
      </section>

      {/* Programme table */}
      <section
        className="container-narrow py-12 md:py-16 border-t border-paper-200"
        aria-labelledby="programmes-heading"
      >
        <h2
          id="programmes-heading"
          className="font-display text-display-md text-ink-900 text-balance"
        >
          Partner programmes.
        </h2>
        <p className="mt-5 text-body-md text-ink-700 max-w-3xl text-pretty">
          A partner programme is listed here only if MyNoosaHeads has
          either confirmed onboarding with the network (status:{" "}
          <span className={STATUS_LABEL.live.tone}>Active</span>) or
          has applied and is awaiting approval (status:{" "}
          <span className={STATUS_LABEL.pending.tone}>Pending</span>).
          Programmes we do not currently participate in are listed as{" "}
          <span className={STATUS_LABEL.inactive.tone}>Inactive</span>{" "}
          so the page reflects the full set of commercial touchpoints
          the site may add in the future.
        </p>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-body-sm">
            <thead>
              <tr className="border-b-2 border-paper-300">
                <th scope="col" className="py-3 pr-4 font-display text-headline-md text-ink-900">
                  Programme
                </th>
                <th scope="col" className="py-3 pr-4 font-display text-headline-md text-ink-900">
                  Operator
                </th>
                <th scope="col" className="py-3 pr-4 font-display text-headline-md text-ink-900">
                  Status
                </th>
                <th scope="col" className="py-3 font-display text-headline-md text-ink-900">
                  Programme terms
                </th>
              </tr>
            </thead>
            <tbody>
              {programmes.map((p) => {
                const tone = STATUS_LABEL[p.status];
                return (
                  <tr
                    key={p.id}
                    className="border-b border-paper-200 align-top"
                  >
                    <td className="py-4 pr-4 text-ink-900 font-medium">
                      {p.displayName}
                    </td>
                    <td className="py-4 pr-4 text-ink-700">
                      {p.operator}
                    </td>
                    <td className={`py-4 pr-4 ${tone?.tone ?? ""}`}>
                      {tone?.label ?? p.status}
                    </td>
                    <td className="py-4 text-ink-700">
                      <a
                        href={p.programmePage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link text-ocean-800"
                      >
                        Network terms ↗
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-body-sm text-ink-700 max-w-3xl">
          Verified programme count:{" "}
          <strong className="text-ink-900">{VERIFIED_PROGRAMME_IDS.length}</strong>{" "}
          of {AFFILIATE_STACK_STATE.totalProgrammes}. Until a programme
          is verified, the corresponding outbound link renders as an
          ordinary untracked link — no affiliate ID, no commercial
          disclosure badge.
        </p>
      </section>

      {/* Editorial firewall */}
      <section
        className="container-narrow py-12 md:py-16 border-t border-paper-200"
        aria-labelledby="firewall-heading"
      >
        <h2
          id="firewall-heading"
          className="font-display text-display-md text-ink-900 text-balance"
        >
          The editorial firewall.
        </h2>
        <div className="mt-6 prose-mdx max-w-3xl">
          <p>
            Every MyNoosaHeads editor works under the same rule:{" "}
            <strong>commercial relationships do not influence editorial
            recommendations</strong>. A partner that pays a commission
            is not prioritised in our guides; a partner that has not
            engaged with us is not demoted. The order in which
            properties, tours, and venues appear on this site reflects
            what we believe serves a visitor planning a Noosa trip.
          </p>
          <p>
            Each editorial page carries a <em>last-reviewed</em> date
            and the editor&apos;s notes are kept under version control.
            Corrections are published on the{" "}
            <Link href="/corrections" className="link text-ocean-800">
              corrections page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Analytics & tracking */}
      <section
        className="container-narrow py-12 md:py-16 border-t border-paper-200"
        aria-labelledby="analytics-heading"
      >
        <h2
          id="analytics-heading"
          className="font-display text-display-md text-ink-900 text-balance"
        >
          Analytics and click tracking.
        </h2>
        <div className="mt-6 prose-mdx max-w-3xl">
          <p>
            MyNoosaHeads uses <strong>Plausible Analytics</strong>{" "}
            (privacy-friendly, no cookies, no personal data) for page
            views and outbound click events. Plausible does not set any
            cookies and does not identify individual visitors. The
            analytics provider currently in use is{" "}
            <code className="font-mono text-caption">
              {AFFILIATE_STACK_STATE.analyticsProvider}
            </code>
            . If the provider is set to <code>host-only</code>, the
            site relies on Cloudflare Workers Analytics (which is also
            non-identifying and aggregated at the request level).
          </p>
          <p>
            Outbound click events are fired on any link or button
            carrying a <code>data-track</code> attribute. The event
            name mirrors the attribute value; the click&apos;s href
            and the visible text of the element are passed as Plausible
            custom-event properties. No data is sent to advertising
            networks.
          </p>
          <p>
            Where a partner programme is verified, the click event also
            carries a click-ref label (e.g.{" "}
            <code>mynoosaheads-accommodation-card-netanya</code>) so the
            network&apos;s partner dashboard can attribute the booking
            to a specific placement on this site. No personal data is
            included in the label.
          </p>
        </div>
      </section>

      {/* Visitor choices */}
      <section
        className="container-narrow py-12 md:py-16 border-t border-paper-200"
        aria-labelledby="choices-heading"
      >
        <h2
          id="choices-heading"
          className="font-display text-display-md text-ink-900 text-balance"
        >
          Your choices.
        </h2>
        <div className="mt-6 prose-mdx max-w-3xl">
          <p>
            You can browse this site with analytics blocked at the
            browser level (extensions like uBlock Origin, Brave shields,
            Firefox content blocking all stop the Plausible script from
            loading). The site renders correctly either way.
          </p>
          <p>
            Where an affiliate programme is listed as Active, you can
            always reach the same operator directly by visiting their
            own website. The MyNoosaHeads link is a convenience, not a
            gate.
          </p>
          <p>
            For the Australian Privacy Principles and the Spam Act 2003
            statements, see the{" "}
            <Link href="/privacy" className="link text-ocean-800">
              privacy policy
            </Link>
            . To report an error in this disclosure or to ask a
            question about a specific link, please{" "}
            <Link href="/contact" className="link text-ocean-800">
              get in touch
            </Link>
            .
          </p>
        </div>

        <div className="mt-8 text-caption text-ink-600">
          Disclosure page contactable at{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="link text-ocean-800"
          >
            {SITE.email}
          </a>
          .
        </div>
      </section>
    </div>
  );
}
