/**
 * CategoryPage — shared layout for the 8 functional-area landing
 * pages (Sprint 1.3). Each route renders the same chrome — Hero,
 * LiveDataGrid, editorial body, sources footer — but injects unique
 * copy, sources, and disclosure pills.
 *
 * This component is server-rendered; the live-data fetch is invoked
 * once per page request.
 */

import type { ReactNode } from "react";
import Link from "next/link";
import {
  Hero,
  LiveDataWidget,
  LiveDataGrid,
  Card,
  CardBody,
  CardHeader,
  Button,
  Icons,
} from "@/components/ui";
import { fetchLiveBundle } from "@/lib/live-data";

export type CategoryPageProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle: ReactNode;
  flourish?: ReactNode;
  primarySources: { label: string; href: string }[];
  bodySections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  disclosure?: ReactNode;
  callout?: {
    title: string;
    body: ReactNode;
    variant?: "rainforest" | "coral" | "ocean";
  };
  relatedLinks?: { label: string; href: string; description: string }[];
};

const calloutClass: Record<NonNullable<CategoryPageProps["callout"]>["variant"] & string, string> = {
  rainforest: "callout-rainforest",
  coral: "callout-warn",
  ocean: "callout",
};

export async function CategoryPage({
  eyebrow,
  title,
  subtitle,
  flourish,
  primarySources,
  bodySections,
  disclosure,
  callout,
  relatedLinks,
}: CategoryPageProps) {
  const live = await fetchLiveBundle();

  return (
    <div className="bg-paper-50">
      <Hero
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        flourish={flourish}
      />

      {/* ─── Live data strip (shared across all categories) ─── */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="cat-live-data-heading"
      >
        <div className="container-page py-12 md:py-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
            <div>
              <p className="eyebrow">Today on the coast</p>
              <h2
                id="cat-live-data-heading"
                className="mt-1 font-display text-display-sm text-ink-900"
              >
                Live tiles for this page
              </h2>
            </div>
            <p className="text-caption text-ink-600">
              as of{" "}
              <time dateTime={live.asOf}>
                {new Date(live.asOf).toLocaleString("en-AU", {
                  timeZone: "Australia/Brisbane",
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "short",
                })}
              </time>{" "}
              AEST
            </p>
          </div>
          <LiveDataGrid>
            <LiveDataWidget
              kind="surf"
              title="Surf"
              value={live.surf.value}
              secondary={live.surf.secondary}
              source={live.surf.source}
              asOf={live.asOf}
              state={live.surf.state}
            />
            <LiveDataWidget
              kind="wind"
              title="Wind"
              value={live.wind.value}
              secondary={live.wind.secondary}
              source={live.wind.source}
              asOf={live.asOf}
              state={live.wind.state}
            />
            <LiveDataWidget
              kind="tide"
              title="Tide"
              value={live.tide.value}
              secondary={live.tide.secondary}
              source={live.tide.source}
              asOf={live.asOf}
              state={live.tide.state}
            />
            <LiveDataWidget
              kind="uv"
              title="UV"
              value={live.uv.value}
              secondary={live.uv.secondary}
              source={live.uv.source}
              asOf={live.asOf}
              state={live.uv.state}
            />
            <LiveDataWidget
              kind="sun-moon"
              title="Sun &amp; moon"
              value={live.sunMoon.value}
              secondary={live.sunMoon.secondary}
              source={live.sunMoon.source}
              asOf={live.asOf}
              state={live.sunMoon.state}
            />
            <LiveDataWidget
              kind="alerts"
              title="Alerts"
              value="See QPWS"
              secondary="Track closures and wildlife notices."
              source="QPWS · QLD Traffic"
              state="fresh"
            />
          </LiveDataGrid>
          <p className="mt-4 text-caption text-ink-600">
            {live.sourceNote} For authoritative conditions, cross-check the
            BOM Capricornia–Hervey Bay forecast before any bar crossing.
          </p>
        </div>
      </section>

      {/* ─── Editorial body ─── */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="cat-body-heading"
      >
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <h2 id="cat-body-heading" className="sr-only">
              Editorial body
            </h2>
            {bodySections.map((section, i) => (
              <section key={i} aria-labelledby={`section-${i}-h`}>
                <h3
                  id={`section-${i}-h`}
                  className="font-display text-display-sm text-ink-900 text-balance"
                >
                  {section.heading}
                </h3>
                <div className="prose-mdx mt-4">
                  {section.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                  {section.bullets && section.bullets.length > 0 ? (
                    <ul>
                      {section.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
            {callout ? (
              <aside
                className={calloutClass[callout.variant ?? "ocean"]}
                role="note"
              >
                <p className="eyebrow">{callout.title}</p>
                <div className="mt-2 text-body-sm text-ink-800">{callout.body}</div>
              </aside>
            ) : null}
            {disclosure ? (
              <aside className="callout" role="note">
                <p className="eyebrow">Disclosure</p>
                <div className="mt-2 text-body-sm text-ink-800">{disclosure}</div>
              </aside>
            ) : null}
          </div>

          {/* ─── Sidebar ─── */}
          <aside className="space-y-6">
            <Card variant="surface">
              <CardHeader eyebrow="Primary sources" title="" />
              <CardBody>
                <ul className="space-y-2 text-body-sm">
                  {primarySources.map((s) => (
                    <li key={s.href} className="flex items-start gap-2">
                      <span
                        className="text-eucalyptus-700 mt-1 shrink-0"
                        aria-hidden="true"
                      >
                        <Icons.Compass size={14} />
                      </span>
                      <Link
                        href={s.href}
                        className="link text-ocean-700"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-caption text-ink-600">
                  All sources are public. If a link breaks, please{" "}
                  <Link href="/contact" className="link text-ocean-700">
                    let us know
                  </Link>
                  .
                </p>
              </CardBody>
            </Card>
            {relatedLinks && relatedLinks.length > 0 ? (
              <Card variant="surface">
                <CardHeader eyebrow="Related" title="" />
                <CardBody>
                  <ul className="space-y-3 text-body-sm">
                    {relatedLinks.map((r) => (
                      <li key={r.href}>
                        <Link href={r.href} className="link text-ocean-700 font-medium">
                          {r.label}
                        </Link>
                        <p className="text-caption text-ink-700 mt-0.5">{r.description}</p>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            ) : null}
            <Card variant="surface">
              <CardHeader eyebrow="Editorial" title="" />
              <CardBody>
                <p className="text-body-sm text-ink-800">
                  Live tiles refresh every 30 minutes from BOM and Open-Meteo.
                  Editorial copy is reviewed monthly against current QPWS and
                  council sources.
                </p>
                <div className="mt-4">
                  <Button href="/contact" size="sm" variant="outline">
                    Report an error
                  </Button>
                </div>
              </CardBody>
            </Card>
          </aside>
        </div>
      </section>
    </div>
  );
}
