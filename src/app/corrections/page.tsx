import { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ArticleLd, BreadcrumbLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Corrections log",
  description: "Public corrections log for mynoosaheads.com.",
  alternates: { canonical: "/corrections" },
};

// Public log of corrections. Each entry is dated, names what changed, and why.
// We log corrections publicly because that's the credible signal — the cost of being
// wrong on the record is what makes the rest of the site trustworthy.

const ENTRIES = [
  {
    date: "2026-08-24",
    summary: "Site launched.",
    detail:
      "Initial release. All 15 hero / card / page images sourced from Wikimedia Commons " +
      "(CC BY/SA). BOM marine forecast (Sunshine Coast Waters) wired into /surf-weather. " +
      "Open-Meteo wired into /surf-weather as supplementary current-conditions source. " +
      "QPWS alerts page linked (not embedded — QPWS blocks automated fetch). " +
      "Affiliate destinations go to official-fallback URLs with 'not yet monetised' badge " +
      "until approved IDs are set in the build environment.",
  },
];

export default function CorrectionsPage() {
  return (
    <>
      <ArticleLd
        url={`${SITE.productionUrl}/corrections`}
        headline="Corrections log"
        description="Public corrections log for mynoosaheads.com."
        datePublished="2026-08-24"
      />
      <BreadcrumbLd
        items={[
          { name: "Home", url: SITE.productionUrl },
          { name: "Corrections", url: `${SITE.productionUrl}/corrections` },
        ]}
      />

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Corrections" }]} />

      <header className="container-page pt-6 pb-10">
        <p className="eyebrow">Corrections</p>
        <h1 className="font-serif text-4xl md:text-5xl mt-2">Public corrections log</h1>
        <p className="lead mt-3 max-w-3xl">
          Every substantive correction is logged here with the date, what changed, and why.
          This page is a credible-signal surface — the cost of being wrong on the record is
          what makes the rest of the site trustworthy.
        </p>
        <p className="mt-4 text-sm">
          See something wrong?{" "}
          <a href="/contact" className="link">Tell us</a>.
        </p>
      </header>

      <section className="container-page pb-12 space-y-6">
        {ENTRIES.map((e, i) => (
          <article key={i} className="card">
            <div className="card-body">
              <p className="eyebrow">{e.date}</p>
              <h2 className="font-serif text-xl mt-1">{e.summary}</h2>
              <p className="mt-3 text-sm text-parchment-700 leading-relaxed">{e.detail}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}