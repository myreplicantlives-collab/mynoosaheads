import type { Metadata } from "next";
import Link from "next/link";
import {
  Hero,
  HeroPhoto,
  Card,
  CardBody,
  CardHeader,
  JsonLd,
} from "@/components/ui";
import { ABOUT_BRAND_IMAGE } from "@/data/photos";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About MyNoosaHeads — an independent guide to Noosa Heads. Every page links to a public source.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · MyNoosaHeads",
    description: "What we cover, who writes it, and how the publication is set up.",
    url: "/about",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "About · MyNoosaHeads",
    description: "What we cover, who writes it, and how the publication is set up.",
  },
};

export default function AboutPage() {
  // MSN-2964 — About page schema: full Organization block + BreadcrumbList.
  // About pages earn rich snippets for the publisher name and logo; we
  // mirror the homepage Organization id so the two declarations merge in
  // Google's knowledge graph.
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
        creditText: `${ABOUT_BRAND_IMAGE.author} / Wikimedia Commons`,
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
      {/* Sprint 1.5 (MSN-2958): full-bleed masthead photo. Quiet headland
       * view rather than the swimming beach — this is the editorial
       * "figure" under which the brand statement sits. */}
      <HeroPhoto
        src={ABOUT_BRAND_IMAGE.url}
        alt={ABOUT_BRAND_IMAGE.caption}
        caption={ABOUT_BRAND_IMAGE.caption}
        credit=""
      />
      {/* Sprint 1.5 (MSN-2958) — brand-statement masthead.
       * Tim's north-star quote as a `<Section>` at the top of /about,
       * styled as Fraunces italic display with an ocean accent.
       */}
      <section
        className="border-b border-paper-200 bg-paper-100"
        aria-labelledby="brand-statement-h"
      >
        <div className="container-page py-14 md:py-20">
          <p
            id="brand-statement-h"
            // MSN-2959 / TSK-2959-POLISH-C: dropped explicit `text-ocean-700`
            // override so the bumped `.eyebrow` class (text-ocean-900) wins
            // and the eyebrow contrast on white is WCAG AA-compliant.
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
              Every claim links to a public source.
              {/*
                * MSN-2959 / TSK-2959-FIX-3: brand-statement full-stop
                * dot — the single place --accent-amber (#B8742A) appears
                * on the site. Per Albert's spec §3.3, amber is the ONE
                * warm hue; it punctuates the brand statement, not the
                * rest of the palette.
                */}
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
      <Hero
        eyebrow="About this guide"
        title="MyNoosaHeads"
        subtitle="An independent guide to Noosa Heads, Queensland. Every page links to a public source."
      />

      <section className="container-page py-14 md:py-20" aria-labelledby="what-h">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <h2 id="what-h" className="sr-only">What we cover</h2>
            <section>
              <h3 className="font-display text-display-sm text-ink-900">What we cover</h3>
              <div className="prose-mdx mt-4">
                <p>
                  MyNoosaHeads covers Noosa Heads, Noosaville, Tewantin,
                  Sunshine Beach, Peregian, and the western shire villages
                  (Pomona, Cooran, Kin Kin, Cooroy). Eight functional areas:
                  surf and weather, the national park, accommodation, things
                  to do, fishing, boats, travel, and webcams.
                </p>
                <p>
                  The site opens with the live surf and weather and closes
                  with the hinterland villages — the two functional ends of
                  the shire. Each page links to its primary sources in the
                  sidebar.
                </p>
              </div>
            </section>

            <section>
              <h3 className="font-display text-display-sm text-ink-900">How we work</h3>
              <div className="prose-mdx mt-4">
                <p>
                  Every claim on this site links to a public source —
                  usually a government page (BOM, QPWS, MSQ, QLD Traffic,
                  Noosa Council), an industry body (Tourism Noosa, Visit
                  Sunshine Coast), or a third-sector service (Beachsafe,
                  SLSQ). Affiliate links are marked{" "}
                  <span className="chip-ocean">Affiliate</span>{" "}
                  before you click, and the full statement lives at{" "}
                  the footer (full disclosure).
                </p>
                <p>
                  The live data tiles on the site refresh themselves every 30
                  minutes from BOM and Open-Meteo. We do not push them by
                  hand, and we do not edit the numbers. If a tile fails,
                  it falls back to a calm Unavailable badge rather than
                  guessing.
                </p>
                <p>
                  Copy on every page is reviewed against current QPWS
                  and council sources. All photography is sourced from
                  Wikimedia Commons contributors who shoot Noosa
                  specifically. Every claim links to a public source.
                </p>
              </div>
            </section>

            <section>
              <h3 className="font-display text-display-sm text-ink-900">Who writes it</h3>
              <div className="prose-mdx mt-4">
                <p>
                  MyNoosaHeads is published by a small Sunshine Coast
                  editorial team with day-to-day ties to the Noosa shire.
                  Bylines sit at the foot of every category page. Errors
                  are corrected promptly and the correction is noted in
                  place — please{" "}
                  <Link href="/contact" className="link text-ocean-700">
                    drop us a line
                  </Link>{" "}
                  if you spot one.
                </p>
              </div>
            </section>

            <section>
              <h3 className="font-display text-display-sm text-ink-900">Hosting and stack</h3>
              <div className="prose-mdx mt-4">
                <p>
                  The site is a Next.js 14 application, statically rendered
                  where possible and server-rendered for the live tiles.
                  It is hosted on Cloudflare Workers (free tier; we will
                  upgrade to a paid Workers plan only when traffic
                  warrants). All source code is held in a private Git
                  repository.
                </p>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <Card variant="surface">
              <CardHeader eyebrow="At a glance" title="" />
              <CardBody>
                <dl className="text-body-sm space-y-3 text-ink-800">
                  {/* MSN-2959 / TSK-2959-POLISH-C: explicit `text-ocean-700`
                   * dropped from each `<dt>` so the eyebrow register
                   * resolves to text-ocean-900 (#0E4A41, ~10:1 on white). */}
                  <div>
                    <dt className="text-eyebrow">Region</dt>
                    <dd>Noosa Shire, Queensland, Australia</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow">Locale</dt>
                    <dd>en-AU</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow">Established</dt>
                    <dd>2026</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow">Hosting</dt>
                    <dd>Cloudflare Workers (free tier)</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow">Newsletter</dt>
                    <dd>None. Per chairman directive.</dd>
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
