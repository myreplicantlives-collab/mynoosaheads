import type { Metadata } from "next";
import { Hero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "Terms of use for MyNoosaHeads. ACCC-compliant disclaimers, no warranty on live data, and how to report errors.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of use · MyNoosaHeads",
    description: "ACCC-compliant terms of use.",
    url: "/terms",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Terms of use · MyNoosaHeads",
    description: "ACCC-compliant terms of use.",
  },
};

export default function TermsPage() {
  return (
    <div className="bg-paper-50">
      <Hero
        eyebrow="Terms of use"
        title="Use this guide carefully."
        subtitle="MyNoosaHeads is an editorial publication, not a substitute for official safety advice. The terms below are written to be plain-English and Australian Consumer Law compliant."
        flourish="Information is free; safety is your call."
      />

      <section className="container-page py-14 md:py-20" aria-labelledby="terms-h">
        <div className="prose-mdx max-w-3xl">
          <h2 id="terms-h">1. What this site is</h2>
          <p>
            MyNoosaHeads is an independent online publication. It provides
            editorial information about the Noosa shire and links out to
            public data sources and accommodation operators. It is not a
            booking engine, travel agent, or tour operator.
          </p>

          <h2>2. No warranty on live data</h2>
          <p>
            The live data tiles on this site (surf, wind, tide, UV, sun
            and moon) are pulled from the Bureau of Meteorology and
            Open-Meteo at build and request time. We do our best to keep
            them accurate. We do not warrant that the data is current,
            complete, or fit for any particular purpose. <strong>Do not
            rely on this site for safety-critical decisions.</strong>
          </p>
          <p>
            For bar crossings, defer to the{" "}
            <a
              href="https://www.msq.qld.gov.au/Safety/Bar-crossings-and-coastal-conditions"
              className="link text-ocean-800"
              rel="noopener noreferrer"
              target="_blank"
            >
              MSQ bar crossings bulletin
            </a>
            . For coastal conditions, defer to the{" "}
            <a
              href="https://www.bom.gov.au/coastal-location/australia"
              className="link text-ocean-800"
              rel="noopener noreferrer"
              target="_blank"
            >
              BOM Southeast Coast forecast
            </a>
            . For park closures, defer to{" "}
            <a
              href="https://parks.qld.gov.au/park-alerts"
              className="link text-ocean-800"
              rel="noopener noreferrer"
              target="_blank"
            >
              QPWS park alerts
            </a>
            .
          </p>

          <h2>3. No warranty on third-party content</h2>
          <p>
            When you click an outbound link, you leave our site. The
            destination operator is responsible for the accuracy of their
            own content. MyNoosaHeads does not warrant the accuracy,
            availability, or fitness for purpose of any third-party site
            or service linked from this publication.
          </p>

          <h2>4. Affiliate disclosure</h2>
          <p>
            Some links on this site are affiliate links. We earn a
            commission if you complete a qualifying action after clicking.
            See the footer for the full statement on the programmes we
            participate in and the editorial
            firewall that protects the integrity of the publication.
          </p>

          <h2>5. Australian Consumer Law</h2>
          <p>
            The Competition and Consumer Act 2010 (Cth) Schedule 2 (the
            Australian Consumer Law) provides statutory guarantees that
            cannot be excluded. Nothing in these terms is intended to
            exclude, restrict, or modify any such guarantee, or any
            liability for failure to comply with one. Where our
            publication is of a kind ordinarily acquired for personal,
            domestic, or household use, you may be entitled to a
            replacement or refund for a major failure.
          </p>

          <h2>6. Intellectual property</h2>
          <p>
            The editorial copy on this site is published by MyNoosaHeads
            and is licensed under Creative Commons Attribution 4.0
            International (CC BY 4.0). You may reuse the copy with
            attribution. Brand marks, logos, and photography from third
            parties are the property of their respective owners; see{" "}
            <a href="/contact" className="link text-ocean-800">
              the contact page
            </a>{" "}
            for image-credit corrections.
          </p>

          <h2>7. Reporting errors</h2>
          <p>
            We correct errors promptly when they’re reported. Please
            email{" "}
            <a href="mailto:hello@mynoosaheads.com" className="link text-ocean-800">
              hello@mynoosaheads.com
            </a>{" "}
            with the page URL, the issue, and (ideally) a citation to a
            public source that supports the correction.
          </p>

          <h2>8. Changes to these terms</h2>
          <p>
            We may update these terms from time to time. The current
            version is dated{" "}
            <time dateTime="2026-08-27">27 August 2026</time>.
          </p>

          <h2>9. Contact</h2>
          <p>
            Questions about these terms:{" "}
            <a href="mailto:hello@mynoosaheads.com" className="link text-ocean-800">
              hello@mynoosaheads.com
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
