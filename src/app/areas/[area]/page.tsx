import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { JsonLd, Card, CardBody, CardHeader, Button } from "@/components/ui";
import { SITE } from "@/data/site";
import {
  placeJsonLd,
  sectionBreadcrumb,
  geoForSlugOrNoosa,
} from "@/lib/schema";
import { AREAS, CURATED_PROPERTIES } from "@/data/accommodation";
import { PROPERTIES_BY_SLUG } from "@/data/properties";
import { VENUES_BY_AREA } from "@/data/venues";

/**
 * /areas/[area] — MSN-2980 V2 build (KUBE Spec §B.1 / per-area deep).
 *
 * Per-area overview — chairman-mandated route added in Option B
 * "full spec retained" (2026-08-29 13:52 BST).
 *
 * KUBE pattern applied:
 *   1. Full-bleed photo hero — area's defining subject
 *   2. Eyebrow + h2 + atmospheric 1-paragraph hook
 *   3. Best for + distance to key landmarks
 *   4. Property cards in this area (image + label only)
 *   5. Where to eat in this area
 *   6. Cross-sell row (NP / surf-and-weather / things-to-do)
 *
 * Word count target: 200–300w body (per chairman budgets).
 */

export function generateStaticParams() {
  // Chairman mandate is 4 areas: Noosa Heads (hastings-street),
  // Noosaville, Sunshine Beach, Peregian Beach. We expose all 4
  // even though /accommodation has 5 (we exclude noosa-sound from
  // the public areas index — it's a quieter in-between precinct
  // without its own curated V2 coverage).
  return ["hastings-street", "noosaville", "sunshine-beach", "peregian-beach"].map((id) => ({
    area: id,
  }));
}

type PageProps = { params: { area: string } };

// Slug → AREAS.id mapping (chairman-mandated route names).
// Bidirectional lookup: a request can arrive at either the bare id
// (e.g. /areas/hastings via the /accommodation area links) or the
// full slug (e.g. /areas/hastings-street). Both must resolve.
const SLUG_TO_AREA_ID: Record<string, string> = {
  "hastings-street": "hastings",
  "hastings": "hastings",
  "noosaville": "noosaville",
  "sunshine-beach": "sunshine",
  "sunshine": "sunshine",
  "peregian-beach": "peregian",
  "peregian": "peregian",
};

const AREA_ID_TO_SLUG: Record<string, string> = {
  hastings: "hastings-street",
  noosaville: "noosaville",
  sunshine: "sunshine-beach",
  peregian: "peregian-beach",
};

const AREA_PHOTOS: Record<string, { url: string; caption: string; author: string; licence: string }> = {
  "hastings-street": {
    url: "/img/heroes/hastings-street-west-1920w.jpg",
    caption: "Hastings Street looking west from Main Beach — the boutique-accommodation precinct.",
    author: "Flickr (Openverse) — 'Hastings Street / Main Beach looking west (Noosa)'",
    licence: "CC BY (commercial OK with attribution)",
  },
  "noosaville": {
    url: "/img/heroes/noosa-river-1920w.jpg",
    caption: "Boat at the Noosa River mouth — Noosaville ferry and river-mouth country.",
    author: "Flickr (Openverse) — 'Boat at river mouth'",
    licence: "CC BY (commercial OK with attribution)",
  },
  "sunshine-beach": {
    url: "https://live.staticflickr.com/1408/705933988_e7ab226bb2.jpg?w=1920&q=85",
    caption: "Sunshine Beach, Noosa — the patrolled sand south of the headland.",
    author: "Flickr (Openverse) — 'Sunshine Beach, Noosa'",
    licence: "CC BY (commercial OK, attribution required)",
  },
  "peregian-beach": {
    url: "/img/heroes/hastings-street-east-1920w.jpg",
    caption: "Sunshine Beach, Noosa — wide-sand patrolled beach south of the headland.",
    author: "Flickr (Openverse) — 'Sunshine Beach, Noosa'",
    licence: "CC BY (commercial OK with attribution)",
  },
};

const AREA_BODY: Record<string, { tagline: string; bestFor: string; distance: string; description: string }> = {
  "hastings-street": {
    tagline: "The walkable one.",
    bestFor: "Visitors who would rather walk than drive once they arrive.",
    distance: "Eight hundred metres of Hastings Street between Main Beach and the headland. Walk to every restaurant, surf club, the national park entrance, and the ferry wharf.",
    description:
      "Hastings Street is the hotel-and-restaurant strip at the southern end of Noosa Heads. The beach is at the bottom of the street; the Noosa National Park coastal walk starts at the top. Most of the Noosa action — restaurants, the surf club, the ferry, the headland — is walkable. The downside: parking is tight and expensive. The upside: you don't need a car once you're here.",
  },
  "noosaville": {
    tagline: "Across the river.",
    bestFor: "Families, longer stays, anyone with a hire car.",
    distance: "About 4 km west of Hastings Street, across the Noosa River. Drive in 8 minutes, or take the Noosa Ferry from the Hastings wharf (30 minutes, scenic).",
    description:
      "Noosaville is the apartment-and-motel side of Noosa — quieter than Hastings Street, more space, easier parking, and the river as the front yard. Gympie Terrace runs along the foreshore with a row of cafés and restaurants. The Noosa Farmers Market sets up at the showgrounds on Sunday mornings. Most Noosaville guests have a hire car and use the ferry for dinner on Hastings Street.",
  },
  "sunshine-beach": {
    tagline: "South of the headland.",
    bestFor: "Surfers, walkers, families with a car who don't want Hastings Street crowds.",
    distance: "About 5 km south of Hastings Street, 8 minutes' drive. The southern entry to Noosa National Park is a ten-minute walk north along the beach.",
    description:
      "Sunshine Beach is the surf suburb south of Noosa Heads — a long, patrolled beach with a village cluster of cafés and a small surf club on Duke Street. The vibe is calmer than Hastings; the beach is the point, and the beachfront apartments line the esplanade. Less walking, more driving — you'll want a hire car if you stay here. The Peregian village is ten minutes south.",
  },
  "peregian-beach": {
    tagline: "Ten minutes south of Sunshine.",
    bestFor: "Extended stays, dog-friendly options (verify per operator), surfers.",
    distance: "About 14 km south of Hastings Street, 16 minutes' drive. The southern access to Noosa National Park is ten minutes north.",
    description:
      "Peregian Beach is the southernmost of the four precincts — a village-square feel, holiday houses rather than hotels, and a calmer pace than Sunshine or Hastings. The patrolled beach sits at the end of Kingfisher Drive with a cluster of cafés and the Peregian Beach Hotel on the village square. Many of the holiday houses are pet-friendly; verify each operator's dog policy before booking. Noosa Heads and Hastings Street are 15 minutes' drive north.",
  },
};

export function generateMetadata({ params }: PageProps): Metadata {
  const areaId = SLUG_TO_AREA_ID[params.area] ?? params.area;
  const a = AREAS.find((x) => x.id === areaId);
  if (!a) return { title: "Not found" };
  return {
    title: `${a.name} · Noosa area guide`,
    description: a.pitch,
    alternates: { canonical: `/areas/${params.area}` },
    openGraph: {
      title: `${a.name} · MyNoosaHeads`,
      description: a.pitch,
      url: `/areas/${params.area}`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${a.name} · MyNoosaHeads`,
      description: a.pitch,
    },
  };
}

export default function AreaPage({ params }: PageProps) {
  const areaId = SLUG_TO_AREA_ID[params.area] ?? params.area;
  const a = AREAS.find((x) => x.id === areaId);
  if (!a) notFound();

  const body = AREA_BODY[params.area] ?? AREA_BODY[AREA_ID_TO_SLUG[areaId]];
  const photo = AREA_PHOTOS[params.area] ?? AREA_PHOTOS[AREA_ID_TO_SLUG[areaId]];

  // Properties in this area
  const propertiesInArea = Object.values(PROPERTIES_BY_SLUG).filter(
    (p) => p.areaId === areaId,
  );

  // Venues in this area
  const venuesInArea = VENUES_BY_AREA[areaId] ?? [];

  // MSN-3057 M4 — Place schema now carries `geo` (Albert §4.2).
  // The geo is the area centroid from src/data/geo.ts; precise per-area
  // polygon centroids would require a GIS lookup, which is overkill for
  // SEO structured data. No review/rating fields are invented.
  const jsonLd = [
    placeJsonLd({
      name: a.name,
      description: a.pitch,
      url: `${SITE.productionUrl}/areas/${params.area}`,
      geo: geoForSlugOrNoosa(params.area),
      containedIn: "Noosa Shire",
    }),
    sectionBreadcrumb(
      "Areas",
      "/accommodation#areas",
      a.name,
      `/areas/${params.area}`,
    ),
  ];

  return (
    <div className="bg-paper-50">
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section
        aria-label={`${a.name} — atmospheric photo`}
        className="relative w-full overflow-hidden bg-ink-900 h-[80vh] min-h-[560px] max-h-[1000px]"
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
            <p className="eyebrow text-paper-300">Noosa Shire · Area guide</p>
            <h1
              className="mt-3 font-display text-display-xl md:text-display-xl text-paper-50 text-balance max-w-4xl"
              style={{ textShadow: "0 2px 24px rgba(11,28,28,0.45)" }}
            >
              {a.name}.
            </h1>
            <p
              className="mt-4 lead text-paper-100 max-w-3xl text-pretty"
              style={{ textShadow: "0 1px 12px rgba(11,28,28,0.55)" }}
            >
              {body.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/accommodation"
                className="btn-primary btn-lg"
                data-track={`area_${params.area}_to_stay`}
              >
                Where to stay
              </Link>
              <Link
                href="/eat-and-drink"
                className="btn-outline btn-lg border-paper-50 text-paper-50 hover:bg-paper-50 hover:text-ink-900"
                data-track={`area_${params.area}_to_eat`}
              >
                Where to eat
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Atmospheric intro */}
      <section className="border-y border-paper-200 bg-paper-100">
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">The pitch</p>
          <h2 className="mt-3 font-display text-display-md md:text-display-lg text-ink-900 text-balance max-w-3xl">
            {a.pitch}
          </h2>
          <p className="mt-5 lead max-w-2xl text-pretty">
            {body.description}
          </p>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2 max-w-3xl">
            <div>
              <dt className="eyebrow">Best for</dt>
              <dd className="mt-2 font-display text-headline-md text-ink-900 text-balance">
                {body.bestFor}
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Distance</dt>
              <dd className="mt-2 text-body-md text-ink-800 text-pretty">
                {body.distance}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Property cards — image + label only */}
      {propertiesInArea.length > 0 ? (
        <section
          className="container-page py-14 md:py-20"
          aria-labelledby="area-stay-h"
        >
          <p className="eyebrow">STAY</p>
          <h2
            id="area-stay-h"
            className="mt-3 font-display text-display-md md:text-display-lg text-ink-900 text-balance max-w-3xl"
          >
            Where to stay in this area.
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {propertiesInArea.map((p) => (
              <Link
                key={p.slug}
                href={`/stay/${p.slug}`}
                className="group block relative overflow-hidden rounded-xl aspect-[4/5] bg-ink-700"
                data-track={`area_${params.area}_property_${p.slug}`}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/30 to-transparent"
                  aria-hidden="true"
                />
                <div className="relative h-full w-full p-5 md:p-6 flex flex-col justify-end">
                  <p className="text-body-sm uppercase tracking-wider text-paper-300">
                    {p.type}
                  </p>
                  <h3 className="mt-1 font-display text-display-sm text-paper-50 text-balance">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-body-sm text-paper-200 text-pretty">
                    {p.bestFor}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Venues in this area */}
      {venuesInArea.length > 0 ? (
        <section
          className="bg-paper-100 border-y border-paper-200"
          aria-labelledby="area-eat-h"
        >
          <div className="container-page py-14 md:py-20">
            <p className="eyebrow">EAT &amp; DRINK</p>
            <h2
              id="area-eat-h"
              className="mt-3 font-display text-display-md md:text-display-lg text-ink-900 text-balance max-w-3xl"
            >
              Where to eat in this area.
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {venuesInArea.map((v) => (
                <Link
                  key={v.slug}
                  href={`/eat-and-drink/${v.slug}`}
                  className="group block rounded-xl bg-paper-50 p-5 ring-1 ring-paper-200 hover:ring-ocean-300 transition"
                  data-track={`area_${params.area}_venue_${v.slug}`}
                >
                  <p className="text-body-sm uppercase tracking-wider text-eucalyptus-700">
                    {v.cuisine}
                  </p>
                  <h3 className="mt-2 font-display text-display-sm text-ink-900 text-balance">
                    {v.name}
                  </h3>
                  <p className="mt-2 text-body-sm text-ink-700 text-pretty">
                    {v.bestFor}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Cross-sell row */}
      <section className="container-page py-14 md:py-20">
        <h2 className="font-display text-display-sm md:text-display-md text-ink-900 text-balance">
          Pair the area with the day.
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            { href: "/noosa-national-park", title: "The coastal walk", body: "Granite, tallowwoods, koalas." },
            { href: "/surf-and-weather", title: "Today in Noosa", body: "Live surf, weather, UV." },
            { href: "/things-to-do", title: "Things to do", body: "Surf, river, walk, eat." },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group block rounded-lg bg-paper-50 p-5 ring-1 ring-paper-200 hover:ring-ocean-300 transition"
              data-track={`area_${params.area}_xsell_${c.href.split("/").pop()}`}
            >
              <p className="eyebrow">Pair with</p>
              <h3 className="mt-2 font-display text-headline-md text-ink-900 text-balance">
                {c.title}
              </h3>
              <p className="mt-1 text-body-sm text-ink-700 text-pretty">{c.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
