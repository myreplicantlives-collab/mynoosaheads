import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { JsonLd, Card, CardBody, CardHeader, Button } from "@/components/ui";
import { SITE } from "@/data/site";
import { VENUES, VENUES_BY_SLUG } from "@/data/venues";
import { AREAS } from "@/data/accommodation";

/**
 * /eat-and-drink/[slug] — MSN-2980 V2 individual venue page.
 *
 * Atmospheric standalone page for one of the six anchor venues.
 * Pulls content from /data/venues.ts.
 *
 * KUBE Spec §A.6 (restaurant page) pattern applied:
 *   - Hero: eyebrow / headline / hook
 *   - Signature dishes / price guide / hours
 *   - What's NOT here (pre-empts wrong visitor)
 *   - Reservation CTA + cross-sell
 *
 * Per D8 voice guide:
 *   - Headline leads with location / era / distinction
 *   - One CTA per page (operator reservation link)
 *   - Practical details revealed after the atmospheric hook
 */

export function generateStaticParams() {
  return VENUES.map((v) => ({ slug: v.slug }));
}

type PageProps = { params: { slug: string } };

export function generateMetadata({ params }: PageProps): Metadata {
  const v = VENUES_BY_SLUG[params.slug];
  if (!v) return { title: "Not found" };
  return {
    title: `${v.name} · Eat & drink Noosa`,
    description: v.whyWorthVisiting,
    alternates: { canonical: `/eat-and-drink/${v.slug}` },
    openGraph: {
      title: `${v.name} · MyNoosaHeads`,
      description: v.whyWorthVisiting,
      url: `/eat-and-drink/${v.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${v.name} · MyNoosaHeads`,
      description: v.whyWorthVisiting,
    },
  };
}

const HERO_PHOTOS: Record<string, { url: string; caption: string; author: string; licence: string }> = {
  "aroma-noosa": {
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=2400&q=80",
    caption: "A Hastings Street café atmosphere — commercial-OK Unsplash substitute for the previous NC Aroma café hero.",
    author: "Unsplash (commercial OK, no attribution required)",
    licence: "Unsplash License",
  },
  "riverdeck-noosa": {
    url: "https://live.staticflickr.com/65535/9572462197_6879fe750b_b.jpg?w=2400",
    caption: "Noosa River at Noosaville — commercial-OK CC0 substitute.",
    author: "Flickr (Openverse) — 'Morning on the Noosa River'",
    licence: "CC0 (commercial OK, no attribution required)",
  },
  "peregian-beach-hotel": {
    url: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=2400&q=80",
    caption: "A village-square beer garden at twilight — commercial-OK Unsplash substitute for the previous location-mismatched Sunshine Beach photo.",
    author: "Unsplash (commercial OK, no attribution required)",
    licence: "Unsplash License",
  },
  "season-noosa": {
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=2400&q=80",
    caption: "Fine-dining presentation, contemporary Australian — commercial-OK Unsplash atmospheric.",
    author: "Unsplash (commercial OK, no attribution required)",
    licence: "Unsplash License",
  },
  "noosa-boathouse": {
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=2400&q=80",
    caption: "River-edge dining — boats at the dock — commercial-OK Unsplash atmospheric.",
    author: "Unsplash (commercial OK, no attribution required)",
    licence: "Unsplash License",
  },
  "sante-noosa": {
    url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=2400&q=80",
    caption: "Counter-side brunch prep — commercial-OK Unsplash atmospheric.",
    author: "Unsplash (commercial OK, no attribution required)",
    licence: "Unsplash License",
  },
};

export default function VenuePage({ params }: PageProps) {
  const v = VENUES_BY_SLUG[params.slug];
  if (!v) notFound();

  const area = AREAS.find((a) => a.id === v.areaId);
  const photo = HERO_PHOTOS[v.slug];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "@id": `${SITE.productionUrl}/eat-and-drink/${v.slug}#restaurant`,
      name: v.name,
      description: v.whyWorthVisiting,
      servesCuisine: v.cuisine,
      url: `${SITE.productionUrl}/eat-and-drink/${v.slug}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: v.address.split(",")[0],
        addressLocality: area?.name.split(",")[0] ?? "Noosa",
        addressRegion: "QLD",
        addressCountry: "AU",
      },
      acceptsReservations: "True",
      hasMenu: v.reservationUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE.brand, item: SITE.productionUrl },
        { "@type": "ListItem", position: 2, name: "Eat & drink", item: `${SITE.productionUrl}/eat-and-drink` },
        { "@type": "ListItem", position: 3, name: v.name, item: `${SITE.productionUrl}/eat-and-drink/${v.slug}` },
      ],
    },
  ];

  return (
    <div className="bg-paper-50">
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section
        aria-label={`${v.name} — ${area?.name ?? "Noosa"}`}
        className="relative w-full overflow-hidden bg-ink-900 h-[60vh] min-h-[480px] max-h-[800px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.url}
          alt={photo.caption}
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-ink-900/15 via-transparent to-ink-900/25"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-900/85 via-ink-900/40 to-transparent"
          aria-hidden="true"
        />
        <div className="relative h-full w-full">
          <div className="container-page h-full flex flex-col justify-end pb-16 md:pb-24">
            <p className="eyebrow text-paper-300">
              {v.cuisine} · {area?.name ?? "Noosa"}
            </p>
            <h1
              className="mt-3 font-display text-display-xl md:text-display-xl text-paper-50 text-balance max-w-4xl"
              style={{ textShadow: "0 2px 24px rgba(11,28,28,0.45)" }}
            >
              {v.headline}
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={v.reservationUrl}
                rel="noopener noreferrer"
                target="_blank"
                className="btn-primary btn-lg"
                data-track={`venue_${v.slug}_open`}
              >
                Open the operator&apos;s site
              </a>
              <Link
                href="/eat-and-drink"
                className="btn-outline btn-lg border-paper-50 text-paper-50 hover:bg-paper-50 hover:text-ink-900"
                data-track={`venue_${v.slug}_back`}
              >
                All venues
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Atmospheric intro + signature dishes */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="venue-body-h"
      >
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <p className="eyebrow">Why this one</p>
              <p className="mt-3 lead text-pretty">{v.whyWorthVisiting}</p>
              <p className="mt-4 text-caption text-ink-700 italic font-display">
                Best for · {v.bestFor}
              </p>
            </div>

            <div>
              <p className="eyebrow">Signature</p>
              <ul className="mt-3 space-y-2 text-body-md text-ink-800">
                {v.signatureDishes.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span className="text-eucalyptus-700 mt-1.5 shrink-0" aria-hidden="true">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">Where</p>
              <p className="mt-3 text-body-md text-ink-800">
                <span className="font-semibold text-ink-900">Address: </span>
                {v.address}
              </p>
              <p className="mt-4 text-body-sm text-ink-600">
                For hours and pricing, see the operator&rsquo;s page — the link in the sidebar goes directly to it.
              </p>
            </div>

            {v.whatsNotHere ? (
              <aside className="callout" role="note">
                <p className="eyebrow">What&rsquo;s NOT here</p>
                <p className="mt-2 text-body-sm text-ink-800">{v.whatsNotHere}</p>
              </aside>
            ) : null}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Card variant="surface">
              <CardHeader eyebrow="Reserve" title="" />
              <CardBody>
                <p className="text-body-sm text-ink-800">
                  Reservations go directly to the operator. We do not take bookings
                  or earn commission on restaurant reservations.
                </p>
                <div className="mt-4">
                  <Button
                    href={v.reservationUrl}
                    external
                    variant="primary"
                    size="md"
                    data-track={`venue_${v.slug}_sidebar_open`}
                  >
                    Open the operator&apos;s site
                  </Button>
                </div>
              </CardBody>
            </Card>

            <Card variant="surface">
              <CardHeader eyebrow="Where to check" title="" />
              <CardBody>
                <ul className="space-y-2 text-body-sm">
                  <li>
                    <Link href="/eat-and-drink" className="link text-ocean-700">
                      All venues
                    </Link>
                  </li>
                  <li>
                    <Link href="/things-to-do" className="link text-ocean-700">
                      Things to do
                    </Link>
                  </li>
                  <li>
                    <Link href="/accommodation" className="link text-ocean-700">
                      Where to stay nearby
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
