import { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ArticleLd, BreadcrumbLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";
import { SOURCES, SOURCE_GROUPS, sourceById } from "@/data/sources";

export const metadata: Metadata = {
  title: "Sources — every claim cited",
  description:
    "Every public source used across mynoosaheads.com — Bureau of Meteorology, QPWS, " +
    "Queensland Government, Tourism Noosa, partner operator sites, and Wikimedia Commons imagery.",
  alternates: { canonical: "/sources" },
};

export default function SourcesPage() {
  const grouped = SOURCE_GROUPS.map((g) => ({
    ...g,
    sources: SOURCES.filter((s) => s.group === g.id),
  })).filter((g) => g.sources.length > 0);

  return (
    <>
      <ArticleLd
        url={`${SITE.productionUrl}/sources`}
        headline="Sources cited across mynoosaheads.com"
        description="Every public source used on this site, grouped by domain, with the publisher and authority level."
        datePublished="2026-08-24"
      />
      <BreadcrumbLd
        items={[
          { name: "Home", url: SITE.productionUrl },
          { name: "Sources", url: `${SITE.productionUrl}/sources` },
        ]}
      />

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Sources" }]} />

      <header className="container-page pt-6 pb-10">
        <p className="eyebrow">Sources</p>
        <h1 className="font-serif text-4xl md:text-5xl mt-2">Every claim, every source</h1>
        <p className="lead mt-3 max-w-3xl">
          This page is the citation ledger. Every factual claim across the site should be traceable
          back to a source below. Where we cannot cite a primary source, we say so.
        </p>
        <p className="mt-4 text-sm text-parchment-700">
          Total sources: <span className="font-semibold">{SOURCES.length}</span> · Last verified
          batch: 2026-08-24.
        </p>
      </header>

      <section className="container-page space-y-12 pb-12">
        {grouped.map((g) => (
          <div key={g.id}>
            <h2 className="font-serif text-2xl">{g.label}</h2>
            <p className="mt-2 max-w-3xl text-sm text-parchment-700">{g.description}</p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-parchment-200 bg-white">
              <table className="table-clean">
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Publisher</th>
                    <th>Authority</th>
                    <th>URL</th>
                  </tr>
                </thead>
                <tbody>
                  {g.sources.map((s) => (
                    <tr key={s.id}>
                      <td>
                        <p className="font-medium text-parchment-900">{s.title}</p>
                        {s.note && <p className="text-xs text-parchment-500 mt-0.5">{s.note}</p>}
                      </td>
                      <td className="text-sm">{s.publisher}</td>
                      <td>
                        <span
                          className={`chip ${
                            s.authority === "official"
                              ? "border-ocean-400 text-ocean-700"
                              : s.authority === "open-data"
                              ? "border-rainforest-400 text-rainforest-700"
                              : s.authority === "partner"
                              ? "border-coral-400 text-coral-600"
                              : "border-parchment-300 text-parchment-700"
                          }`}
                        >
                          {s.authority}
                        </span>
                      </td>
                      <td>
                        <a href={s.url} className="link text-xs break-all" target="_blank" rel="noopener noreferrer">
                          {s.url}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>

      <section className="container-page pb-12">
        <div className="callout">
          <p className="font-semibold text-ocean-800">Missing source? Wrong link?</p>
          <p className="mt-1 text-sm">
            Tell us via the <a href="/contact" className="link">contact page</a> or read the{" "}
            <a href="/corrections" className="link">corrections policy</a>.
          </p>
        </div>
      </section>
    </>
  );
}