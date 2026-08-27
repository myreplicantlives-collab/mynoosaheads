import { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ArticleLd, BreadcrumbLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Editorial policy — how this site works",
  description:
    "How mynoosaheads.com sources information, handles corrections, discloses affiliate links, " +
    "and labels opinions vs. facts.",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <>
      <ArticleLd
        url={`${SITE.productionUrl}/editorial-policy`}
        headline="Editorial policy"
        description="How mynoosaheads.com sources, labels, and updates information."
        datePublished="2026-08-24"
      />
      <BreadcrumbLd
        items={[
          { name: "Home", url: SITE.productionUrl },
          { name: "Editorial policy", url: `${SITE.productionUrl}/editorial-policy` },
        ]}
      />

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Editorial policy" }]} />

      <header className="container-page pt-6 pb-10">
        <p className="eyebrow">Editorial policy</p>
        <h1 className="font-serif text-4xl md:text-5xl mt-2">How this site works</h1>
        <p className="lead mt-3 max-w-3xl">
          This page explains how we source, label, and update everything you read here.
        </p>
      </header>

      <article className="container-prose space-y-8 pb-12">
        <Section title="Sourcing">
          <p>
            Every factual claim on this site is meant to be traceable back to a public source —
            Bureau of Meteorology, Queensland Parks & Wildlife Service, Queensland Government,
            regional tourism bodies, or the operator's own website. The full list lives on the{" "}
            <a href="/sources" className="link">sources page</a>.
          </p>
          <p>
            Where we can't cite a primary source, we either don't make the claim or we say "we don't
            know" or "check the source link for current details".
          </p>
        </Section>

        <Section title="No invented content">
          <p>
            We do not invent businesses, webcams, fishing reports, surf forecasts, weather data,
            citations, or affiliate IDs. If we can't verify something, we don't ship it.
          </p>
        </Section>

        <Section title="Affiliate disclosure">
          <p>
            Some links on this site earn a small commission when you book through them —
            accommodation on Booking.com or Agoda, tours on GetYourGuide / Viator / Klook. We only
            recommend what we'd recommend without the commission.
          </p>
          <p>
            Every affiliate link carries a visible disclosure badge ("Affiliate link" or
            "Partner · not yet monetised" until approved IDs are set in the build environment).
            The badge sits next to the link, not in a footer.
          </p>
          <p>
            Restaurant links go to the venue's official website. We do not have an ethical,
            AU-wide restaurant reservation affiliate, so we don't pretend one exists.
          </p>
        </Section>

        <Section title="Corrections">
          <p>
            If something on this site is wrong, out of date, or misleading,{" "}
            <a href="/corrections" className="link">tell us</a>. Substantive corrections are logged
            publicly on the corrections page with a date and the corrected version.
          </p>
        </Section>

        <Section title="Author bylines">
          <p>
            Pages on this site are authored by <em>{SITE.author.name}</em>. We use an
            editorial-team byline rather than a personal name because the editorial review process
            is local and shared. If a real byline is supplied for a specific piece, it is shown on
            that page.
          </p>
        </Section>

        <Section title="Maintenance">
          <p>
            The site is designed to be largely self-maintaining. A scheduled job refreshes live
            sources (BOM, Open-Meteo, QPWS) on a regular cadence. The machine-readable health
            endpoint at <a href="/health.json" className="link">/health.json</a> shows per-source
            status. Broken links and missing images are flagged by a periodic scan.
          </p>
          <p>
            You should not need to log in more than once a month to review the build.
          </p>
        </Section>

        <Section title="Privacy and data">
          <p>
            This site uses no third-party analytics that share data with advertising networks.
            Server logs may capture IP addresses for security and capacity planning; they are not
            used for advertising or shared.
          </p>
          <p>
            Affiliate link clicks are tracked by the affiliate networks (Booking.com, Viator, etc.)
            under their own privacy policies. We do not control what they collect.
          </p>
        </Section>

        <Section title="Out of scope">
          <p>
            We do not publish weather forecasts to a resolution finer than the official source
            provides. Where the BOM marine forecast publishes "below 1 metre" seas, we say "below 1
            metre" — we do not invent a precise value.
          </p>
          <p>
            We do not publish a "weekly fishing report". Conditions change by tide, day and moon
            phase; a static weekly report would be inaccurate and misleading.
          </p>
        </Section>
      </article>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-2xl">{title}</h2>
      <div className="mt-3 space-y-3 text-parchment-800 leading-relaxed">{children}</div>
    </section>
  );
}