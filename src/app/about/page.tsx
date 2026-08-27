import { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ArticleLd, BreadcrumbLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "About this site",
  description: "Who writes mynoosaheads.com, what it does, and how to contact the editors.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <ArticleLd
        url={`${SITE.productionUrl}/about`}
        headline="About mynoosaheads.com"
        description={SITE.editorial}
        datePublished="2026-08-24"
      />
      <BreadcrumbLd
        items={[
          { name: "Home", url: SITE.productionUrl },
          { name: "About", url: `${SITE.productionUrl}/about` },
        ]}
      />

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      <header className="container-page pt-6 pb-10">
        <p className="eyebrow">About</p>
        <h1 className="font-serif text-4xl md:text-5xl mt-2">About mynoosaheads.com</h1>
        <p className="lead mt-3 max-w-3xl">
          A sourced, practical-information-first guide to Noosa. Tourism-positive, locally written,
          and built to keep working without daily attention from the owner.
        </p>
      </header>

      <article className="container-prose space-y-8 pb-12">
        <section>
          <h2 className="font-serif text-2xl">What this site is</h2>
          <p className="mt-3 text-parchment-800 leading-relaxed">
            mynoosaheads.com is a planning guide for Noosa Heads and surrounds — the beaches, the
            national park, the river, the hinterland, where to stay, where to eat, and what to do
            when you get there. The framing is <em>{SITE.tagline}</em> — warm, practical, useful.
          </p>
          <p className="mt-3 text-parchment-800 leading-relaxed">
            We lead with the welcome, then make the welcome useful with parking, prices, tide times,
            ferry timetables, hiking distances, and the small practical details most guides leave
            out.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl">Who writes this</h2>
          <p className="mt-3 text-parchment-800 leading-relaxed">
            {SITE.author.bio}
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl">What we will not do</h2>
          <ul className="mt-3 space-y-2 text-parchment-800">
            <li>· Invent businesses, webcams, fishing reports or surf forecasts.</li>
            <li>· Take kickbacks for placement in recommendations.</li>
            <li>· Hide affiliate disclosures.</li>
            <li>· Quote weather data at a finer resolution than the source provides.</li>
            <li>· Run advertising that compromises the credibility promise.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl">How to contact us</h2>
          <p className="mt-3 text-parchment-800 leading-relaxed">
            Editorial corrections and additions go to the <a href="/contact" className="link">contact page</a>.
            Substantive corrections are logged publicly on the <a href="/corrections" className="link">corrections page</a>.
          </p>
        </section>
      </article>
    </>
  );
}