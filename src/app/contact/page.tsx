import { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ArticleLd, BreadcrumbLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact — editorial corrections and additions",
  description: "How to send corrections, additions, or partnership enquiries to the mynoosaheads editors.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <ArticleLd
        url={`${SITE.productionUrl}/contact`}
        headline="Contact mynoosaheads editors"
        description="Editorial corrections, additions and partnership enquiries."
        datePublished="2026-08-24"
      />
      <BreadcrumbLd
        items={[
          { name: "Home", url: SITE.productionUrl },
          { name: "Contact", url: `${SITE.productionUrl}/contact` },
        ]}
      />

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <header className="container-page pt-6 pb-10">
        <p className="eyebrow">Contact</p>
        <h1 className="font-serif text-4xl md:text-5xl mt-2">Get in touch</h1>
        <p className="lead mt-3 max-w-3xl">
          The fastest path is email — we read every message and respond to editorial corrections
          and source-citation challenges within a few days.
        </p>
      </header>

      <article className="container-prose space-y-8 pb-12">
        <section className="card">
          <div className="card-body">
            <h2 className="font-serif text-2xl">Editorial corrections</h2>
            <p className="mt-3 text-parchment-800 leading-relaxed">
              If something on the site is wrong, out of date, or misleading, send the URL and what
              you believe is the truth. We will verify, update, and log the correction publicly on the
              <a href="/corrections" className="link"> corrections page</a>.
            </p>
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent("Correction: mynoosaheads.com")}`}
              className="btn btn-primary mt-5"
            >
              Email editorial →
            </a>
          </div>
        </section>

        <section className="card">
          <div className="card-body">
            <h2 className="font-serif text-2xl">Add a venue or operator</h2>
            <p className="mt-3 text-parchment-800 leading-relaxed">
              Run a real tourism business in the Noosa region and want to be considered? Send the
              business name, official website, location and what makes it stand out. We add real
              businesses only — we will not list ghost operators or invented venues.
            </p>
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent("Venue submission: mynoosaheads.com")}`}
              className="btn btn-outline mt-5"
            >
              Submit a venue →
            </a>
          </div>
        </section>

        <section className="card">
          <div className="card-body">
            <h2 className="font-serif text-2xl">Partnership enquiries</h2>
            <p className="mt-3 text-parchment-800 leading-relaxed">
              Affiliate networks, regional tourism boards, or large operators with a fit for the
              site's editorial voice: we are interested, but we will only run paid placements
              that we would recommend without payment. Send the basics and we will reply.
            </p>
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent("Partnership enquiry: mynoosaheads.com")}`}
              className="btn btn-outline mt-5"
            >
              Email partnership team →
            </a>
          </div>
        </section>

        <section className="callout-stale">
          <p className="font-semibold">On response time</p>
          <p className="mt-1 text-sm">
            This site is run as a side project. We read every message, but replies may take a few
            days. If your message is time-sensitive, please say so up front.
          </p>
        </section>
      </article>
    </>
  );
}