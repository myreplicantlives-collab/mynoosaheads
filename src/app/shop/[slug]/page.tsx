import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { JsonLd, Card, CardBody, CardHeader, Button } from "@/components/ui";
import { SITE } from "@/data/site";
import { RETAILERS, RETAILERS_BY_SLUG } from "@/data/retailers";

/**
 * /shop/[slug] — MSN-2975 V2 individual retailer page.
 *
 * Atmospheric standalone page for one of the three anchor retailers.
 * Pulls content from /data/retailers.ts (Albert's D3 brief).
 *
 * Per V2 voice guide (D8):
 *   - Headline leads with the morning / the rhythm
 *   - "Why worth visiting" answers in two-to-three sentences
 *   - "What's NOT here" pre-empts the wrong visitor
 *
 * Critical V2 correction: Noosa Farmers Market day is SUNDAY
 * (verified at noosafarmersmarket.com.au). V1 said Saturday.
 */

export function generateStaticParams() {
  return RETAILERS.map((r) => ({ slug: r.slug }));
}

type PageProps = { params: { slug: string } };

export function generateMetadata({ params }: PageProps): Metadata {
  const r = RETAILERS_BY_SLUG[params.slug];
  if (!r) return { title: "Not found" };
  return {
    title: `${r.name} · Shop Noosa`,
    description: r.whyWorthVisiting,
    alternates: { canonical: `/shop/${r.slug}` },
    openGraph: {
      title: `${r.name} · MyNoosaHeads`,
      description: r.whyWorthVisiting,
      url: `/shop/${r.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${r.name} · MyNoosaHeads`,
      description: r.whyWorthVisiting,
    },
  };
}

export default function RetailerPage({ params }: PageProps) {
  const r = RETAILERS_BY_SLUG[params.slug];
  if (!r) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": r.slug === "noosa-regional-gallery" ? "TouristAttraction" : "LocalBusiness",
      "@id": `${SITE.productionUrl}/shop/${r.slug}#business`,
      name: r.name,
      description: r.whyWorthVisiting,
      url: r.moreInfoUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: r.whenAndWhere.address.split(",")[0],
        addressCountry: "AU",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE.brand, item: SITE.productionUrl },
        { "@type": "ListItem", position: 2, name: "Shop Noosa", item: `${SITE.productionUrl}/shopping` },
        { "@type": "ListItem", position: 3, name: r.name, item: `${SITE.productionUrl}/shop/${r.slug}` },
      ],
    },
  ];

  return (
    <div className="bg-paper-50">
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="border-b border-paper-200 bg-paper-50">
        <div className="container-page py-12 md:py-20">
          <p className="eyebrow">Shop Noosa · {r.category}</p>
          <h1 className="mt-3 font-display text-display-xl md:text-display-xl text-ink-900 text-balance max-w-4xl">
            {r.headline}
          </h1>
          <p className="mt-5 lead max-w-3xl text-pretty">{r.whyWorthVisiting}</p>
          <p className="mt-4 text-caption text-ink-700 italic font-display">
            {r.bestFor}
          </p>
        </div>
      </section>

      <section className="container-page py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <p className="eyebrow">What they sell / show</p>
              <ul className="mt-3 space-y-2 text-body-md text-ink-800">
                {r.whatTheySell.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-eucalyptus-700 mt-1.5 shrink-0" aria-hidden="true">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">Where</p>
              <p className="mt-3 text-body-md text-ink-800">
                <span className="font-semibold text-ink-900">Address: </span>
                {r.whenAndWhere.address}
              </p>
              <p className="mt-4 text-body-sm text-ink-600">
                For hours, parking and access, see the operator&rsquo;s page — the link in the sidebar goes directly to it.
              </p>
            </div>

            {r.howToMakeAMorningOfIt.length > 0 ? (
              <div>
                <p className="eyebrow">How to make a morning of it</p>
                <ol className="mt-3 space-y-3 text-body-md text-ink-800">
                  {r.howToMakeAMorningOfIt.map((step) => (
                    <li key={step.time} className="flex items-start gap-3">
                      <span className="font-display text-headline-sm text-ocean-800 min-w-[5rem]">
                        {step.time}
                      </span>
                      <span>{step.action}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            {r.whatsNotHere ? (
              <aside className="callout" role="note">
                <p className="eyebrow">What&rsquo;s NOT here</p>
                <p className="mt-2 text-body-sm text-ink-800">{r.whatsNotHere}</p>
              </aside>
            ) : null}

            {r.culturalNote ? (
              <aside className="callout-rainforest" role="note">
                <p className="eyebrow">Cultural note</p>
                <p className="mt-2 text-body-sm text-ink-800">{r.culturalNote}</p>
              </aside>
            ) : null}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Card variant="surface">
              <CardHeader eyebrow="More info" title="" />
              <CardBody>
                <p className="text-body-sm text-ink-800">
                  Hours, address and operator details live on the official site.
                </p>
                <div className="mt-4">
                  <Button
                    href={r.moreInfoUrl}
                    external
                    variant="primary"
                    size="md"
                    data-track={`shop_${r.slug}_official`}
                  >
                    Open the official site
                  </Button>
                </div>
              </CardBody>
            </Card>

            <Card variant="surface">
              <CardHeader eyebrow="Related" title="" />
              <CardBody>
                <ul className="space-y-2 text-body-sm">
                  <li>
                    <Link href="/shopping" className="link text-ocean-800">
                      All shopping categories
                    </Link>
                  </li>
                  <li>
                    <Link href="/things-to-do" className="link text-ocean-800">
                      Things to do
                    </Link>
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
