import type { Metadata } from "next";
import Link from "next/link";
import {
  HeroPhoto,
  Card,
  CardBody,
  CardHeader,
  JsonLd,
} from "@/components/ui";
import { ABOUT_BRAND_IMAGE } from "@/data/photos";
import { SITE } from "@/data/site";

/**
 * /about — MSN-2987 V2 chunk 1 (chairman mandate 2026-08-29) +
 * MSN-3044 Item 5 cleanup.
 *
 * Visitor-facing page. Removed:
 *   - Hosting/architecture/stack language (Next.js, Cloudflare, Git).
 *   - Fictional coverage claims ("fishing, boats, travel, webcams"
 *     are not all full deep pages with verified content).
 *   - "Per chairman directive" newsletter line (MSN-3044 Item 5.1).
 *   - "Established 2026" from At a glance — replaced with "Editorial
 *     scope" to avoid the audit's "unfalsifiable founding date" flag.
 *   - "Bylines sit at the foot of every category page" — replaced
 *     with "We do not currently publish bylines" per audit 5.2.
 *   - "Every claim links to a public source" — replaced with a
 *     narrower verifiable statement until the citations audit ships.
 *
 * Kept:
 *   - Editorial voice (brand statement).
 *   - Mission (live data, primary sources).
 *   - Disclosure (affiliate + corrections).
 */

export const metadata: Metadata = {
  title: "About",
  description:
    "About MyNoosaHeads — an independent guide to Noosa Heads. Every page links to a public source.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · MyNoosaHeads",
    description:
      "What we cover, who writes it, and how the publication is set up.",
    url: "/about",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "About · MyNoosaHeads",
    description:
      "What we cover, who writes it, and how the publication is set up.",
  },
};

export default function AboutPage() {
  const aboutJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${SITE.productionUrl}/about#page`,
      url: `${SITE.productionUrl}/about`,
      name: `About · ${SITE.brand}`,
      inLanguage: SITE.locale,
      isPartOf: { "@id": `${SITE.productionUrl}#website` },
      about: { "@id": `${SITE.productionUrl}#organization` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: ABOUT_BRAND_IMAGE.url,
        caption: ABOUT_BRAND_IMAGE.caption,
        creditText: `${ABOUT_BRAND_IMAGE.author}`,
        license: `https://creativecommons.org/licenses/${ABOUT_BRAND_IMAGE.licence
          .replace("CC ", "")
          .replace(" ", "-")
          .toLowerCase()}/`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: SITE.brand,
          item: SITE.productionUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: `${SITE.productionUrl}/about`,
        },
      ],
    },
  ];
  return (
    <div className="bg-paper-50">
      <JsonLd data={aboutJsonLd} />
      <HeroPhoto
        src={ABOUT_BRAND_IMAGE.url}
        alt={ABOUT_BRAND_IMAGE.caption}
        caption={ABOUT_BRAND_IMAGE.caption}
        credit=""
      />
      <section
        className="border-b border-paper-200 bg-paper-100"
        aria-labelledby="brand-statement-h"
      >
        <div className="container-page py-14 md:py-20">
          <p
            id="brand-statement-h"
            className="eyebrow"
          >
            Brand statement
          </p>
          <blockquote className="mt-4 max-w-4xl text-balance text-eucalyptus-700 leading-tight">
            <p className="font-display italic text-display-lg md:text-display-xl">
              Discover Noosa.
            </p>
            <p className="mt-5 font-display not-italic text-display-sm md:text-display-md text-ink-800 leading-snug">
              MyNoosaHeads is an independent guide to Noosa Heads — surf
              and weather, the national park, accommodation, and the local
              rules that keep everyone on the right side of a south-east
              swell.
            </p>
            <p className="mt-3 font-display not-italic text-display-sm md:text-display-md text-ink-800 leading-snug">
              Safety-critical claims link to the relevant government
              or industry body — BOM, QPWS, MSQ, QLD Traffic, Noosa
              Council, Beachsafe.
              <span
                className="ml-2 inline-block h-2.5 w-2.5 rounded-full bg-amber-500 align-middle"
                aria-hidden="true"
              />
            </p>
          </blockquote>
          <p className="mt-4 text-caption text-ink-600">
            Full attribution for every image on the site lives at{" "}
            <Link href="/photo-credits" className="link text-ocean-700">
              /photo-credits
            </Link>
            .
          </p>
        </div>
      </section>
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="about-body-h"
      >
        <h1 id="about-body-h" className="sr-only">About this guide</h1>
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="font-display text-display-sm text-ink-900">What we cover</h2>
              <div className="prose-mdx mt-4">
                <p>
                  MyNoosaHeads covers Noosa Heads, Noosaville, Tewantin,
                  Sunshine Beach, Peregian, and the western shire villages
                  (Pomona, Cooran, Kin Kin, Cooroy). The editorial scope
                  is the coast, the river, the national park, and the
                  things visitors actually book — accommodation, the
                  market mornings, the headland walks.
                </p>
                <p>
                  The site opens with the live surf and weather and runs
                  through the things to do. Each page links to its
                  primary sources in the sidebar.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-ink-900">How we work</h2>
              <div className="prose-mdx mt-4">
                <p>
                  Safety-critical claims on this site link to the
                  relevant government or industry body — BOM, QPWS,
                  MSQ, QLD Traffic, Noosa Council, Beachsafe, SLSQ.
                  Editorial copy is reviewed against current QPWS and
                  council sources. Affiliate links are marked{" "}
                  <span className="chip-ocean">Affiliate</span>{" "}
                  before you click, and the full statement lives at
                  the footer.
                </p>
                <p>
                  The live data tiles on the site refresh themselves every 30
                  minutes from BOM and Open-Meteo. We do not push them by
                  hand, and we do not edit the numbers. If a tile fails,
                  it falls back to a calm Unavailable badge rather than
                  guessing.
                </p>
                <p>
                  All photography is sourced from Flickr (via Openverse)
                  and the Unsplash CDN — the full attribution table lives at{" "}
                  <Link href="/photo-credits" className="link text-ocean-700">
                    /photo-credits
                  </Link>
                  .
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-display-sm text-ink-900">Who writes it</h2>
              <div className="prose-mdx mt-4">
                <p>
                  MyNoosaHeads is published by a small Sunshine Coast
                  editorial team with day-to-day ties to the Noosa
                  shire. We do not currently publish bylines on
                  category pages — a corrections log is on the
                  roadmap. If you spot an error, please{" "}
                  <Link href="/contact" className="link text-ocean-700">
                    drop us a line
                  </Link>
                  .
                </p>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <Card variant="surface">
              <CardHeader eyebrow="At a glance" title="" />
              <CardBody>
                <dl className="text-body-sm space-y-3 text-ink-800">
                  <div>
                    <dt className="text-eyebrow">Region</dt>
                    <dd>Noosa Shire, Queensland, Australia</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow">Locale</dt>
                    <dd>en-AU</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow">Editorial scope</dt>
                    <dd>Coast, river, national park, accommodation, market mornings.</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow">Newsletter</dt>
                    <dd>Not currently published.</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow">Contact</dt>
                    <dd>
                      <a
                        href={`mailto:${"hello@mynoosaheads.com"}`}
                        className="link text-ocean-700"
                      >
                        hello@mynoosaheads.com
                      </a>{" "}
                      <span className="text-caption text-ink-600">
                        (see{" "}
                        <Link href="/contact" className="link text-ocean-700">
                          /contact
                        </Link>{" "}
                        for current delivery status)
                      </span>
                    </dd>
                  </div>
                </dl>
              </CardBody>
            </Card>
            <Card variant="surface">
              <CardHeader eyebrow="Legal" title="" />
              <CardBody>
                <ul className="text-body-sm space-y-2">
                  <li>
                    <Link href="/privacy" className="link text-ocean-700">Privacy policy</Link>
                  </li>
                  <li>
                    <Link href="/terms" className="link text-ocean-700">Terms of use</Link>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </aside>
        </div>
      </section>
    </div>
  );
}