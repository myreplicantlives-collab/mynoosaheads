import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { JsonLd, Hero, Button, Card, CardBody, CardHeader } from "@/components/ui";
import { SITE, VERIFIED_AFFILIATES } from "@/data/site";
import { PROPERTIES, PROPERTIES_BY_SLUG } from "@/data/properties";
import { ACCOMMODATION_DATA } from "@/data/accommodation";

/**
 * /stay/[slug] — MSN-2975 V2 individual property page.
 *
 * Atmospheric standalone page for one of the five anchor properties.
 * Pulls content from /data/properties.ts (Albert's D1 brief).
 *
 * Per D6 monetisation scaffolding:
 *   - bookingUrl links to the operator-specific Booking.com search
 *   - The Affiliate pill is gated by VERIFIED_AFFILIATES and does
 *     not render until a programme ID is verified by Tim
 *
 * Per V2 voice guide (D8):
 *   - Headline leads with location / era / distinction
 *   - One CTA per page
 *   - Practical details revealed after the atmospheric hook
 */

export function generateStaticParams() {
  return PROPERTIES.map((p) => ({ slug: p.slug }));
}

type PageProps = { params: { slug: string } };

export function generateMetadata({ params }: PageProps): Metadata {
  const property = PROPERTIES_BY_SLUG[params.slug];
  if (!property) return { title: "Not found" };
  return {
    title: `${property.name} · ${property.headline}`,
    description: property.why,
    alternates: { canonical: `/stay/${property.slug}` },
    openGraph: {
      title: `${property.name} · MyNoosaHeads`,
      description: property.why,
      url: `/stay/${property.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${property.name} · MyNoosaHeads`,
      description: property.why,
    },
  };
}

export default function PropertyPage({ params }: PageProps) {
  const property = PROPERTIES_BY_SLUG[params.slug];
  if (!property) notFound();

  // Affiliate pill is gated — only renders if a programme ID is verified.
  const showAffiliate = VERIFIED_AFFILIATES.includes("booking");

  const area = ACCOMMODATION_DATA.areas.find((a) => a.id === property.areaId);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "@id": `${SITE.productionUrl}/stay/${property.slug}#lodging`,
      name: property.name,
      description: property.why,
      url: `${SITE.productionUrl}/stay/${property.slug}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: property.address.split(",")[0],
        addressLocality: "Noosa Heads",
        addressRegion: "QLD",
        addressCountry: "AU",
      },
      amenityFeature: property.amenities.map((a) => ({
        "@type": "LocationFeatureSpecification",
        name: a,
        value: true,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE.brand, item: SITE.productionUrl },
        { "@type": "ListItem", position: 2, name: "Stay", item: `${SITE.productionUrl}/accommodation` },
        { "@type": "ListItem", position: 3, name: property.name, item: `${SITE.productionUrl}/stay/${property.slug}` },
      ],
    },
  ];

  return (
    <div className="bg-paper-50">
      <JsonLd data={jsonLd} />

      {/* Hero — eyebrow / headline / hook / flourish */}
      <section className="border-b border-paper-200 bg-paper-50">
        <div className="container-page py-12 md:py-20">
          <p className="eyebrow">{property.type} · {area?.name ?? "Noosa Shire"}</p>
          <h1 className="mt-3 font-display text-display-xl md:text-display-xl text-ink-900 text-balance max-w-4xl">
            {property.headline}
          </h1>
          <p className="mt-5 lead max-w-3xl text-pretty">{property.why}</p>
        </div>
      </section>

      {/* Best for + rooms + amenities */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="details-h"
      >
        <h2 id="details-h" className="sr-only">Property details</h2>
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <p className="eyebrow">Best for</p>
              <p className="mt-2 font-display text-headline-md text-ink-900">
                {property.bestFor}
              </p>
            </div>

            <div>
              <p className="eyebrow">Rooms at a glance</p>
              <ul className="mt-3 space-y-2 text-body-md text-ink-800">
                {property.rooms.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <span className="text-eucalyptus-700 mt-1.5 shrink-0" aria-hidden="true">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">Key amenities</p>
              <ul className="mt-3 space-y-2 text-body-md text-ink-800">
                {property.amenities.map((a) => (
                  <li key={a} className="flex items-start gap-2">
                    <span className="text-eucalyptus-700 mt-1.5 shrink-0" aria-hidden="true">•</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">Location</p>
              <p className="mt-3 text-body-md text-ink-800">{property.location}</p>
              <p className="mt-2 text-body-sm text-ink-700">
                <span className="font-semibold text-ink-900">Address: </span>
                {property.address}
              </p>
            </div>
          </div>

          {/* Sidebar — CTA + sources */}
          <aside className="space-y-6">
            <Card variant="surface">
              <CardHeader eyebrow="Check availability" title="" />
              <CardBody>
                <p className="text-body-sm text-ink-800">
                  Live availability and pricing are handled by the booking engine.
                </p>
                <div className="mt-4">
                  <Button
                    href={property.bookingUrl}
                    external
                    variant="primary"
                    size="md"
                    data-track={`property_${property.slug}_cta`}
                  >
                    See live dates
                    {showAffiliate ? (
                      <span
                        className="ml-2 inline-flex items-baseline gap-1 align-middle text-caption italic"
                        title="We earn a small commission on this link at no extra cost to you."
                        aria-label="Affiliate link"
                      >
                        · Affiliate
                      </span>
                    ) : null}
                  </Button>
                </div>
                <p className="mt-3 text-caption text-ink-600">
                  Click-through may earn MyNoosaHeads a small commission at no extra cost to you.
                  Affiliate relationships do not influence editorial selection.
                </p>
              </CardBody>
            </Card>

            <Card variant="surface">
              <CardHeader eyebrow="Where to check" title="" />
              <CardBody>
                <ul className="space-y-2 text-body-sm">
                  <li>
                    <Link href="/accommodation" className="link text-ocean-700">
                      All accommodation
                    </Link>
                  </li>
                  <li>
                    <Link href="/surf-and-weather" className="link text-ocean-700">
                      Today&rsquo;s surf and weather
                    </Link>
                  </li>
                  <li>
                    <Link href="/noosa-national-park" className="link text-ocean-700">
                      Noosa National Park walks
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
