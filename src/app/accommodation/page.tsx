import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardBody,
  CardHeader,
  Hero,
  HeroPhoto,
  Button,
  Icons,
  AffiliateBadge,
} from "@/components/ui";
import { fetchLiveBundle } from "@/lib/live-data";
import { CATEGORY_PHOTOS } from "@/data/photos";

export const metadata: Metadata = {
  title: "Accommodation",
  description:
    "Where to stay in Noosa: hotels, holiday apartments, and houses. Booking, Stayz, Expedia, and Airbnb affiliate links with full ACCC disclosure.",
  alternates: { canonical: "/accommodation" },
  openGraph: {
    title: "Accommodation · MyNoosaHeads",
    description:
      "Independent guide to staying in Noosa. Affiliate links with full ACCC disclosure.",
    url: "/accommodation",
    type: "article",
  },
};

const AREAS = [
  {
    name: "Hastings Street & Noosa Heads",
    pitch:
      "The walkable end of town. Cafés, restaurants, the headland, and Main Beach at your door. Most expensive; book early for school holidays.",
    bestFor: "Visitors who don’t want to drive once they arrive.",
  },
  {
    name: "Noosaville",
    pitch:
      "Across the river, along Gympie Terrace. Apartments, motels, holiday houses, and the river-front restaurants. Quieter than Hastings Street; cheaper parking.",
    bestFor: "Families and longer stays.",
  },
  {
    name: "Sunshine Beach",
    pitch:
      "South of the headland; surf club end of town, village shops, and the southern access to Noosa National Park. A more residential feel.",
    bestFor: "Surfers and walkers.",
  },
  {
    name: "Tewantin & Noosa North Shore",
    pitch:
      "On the river, ten minutes from Hastings Street by car or the ferry. The ferry runs between Tewantin, Noosaville, and Noosa Heads on the hour.",
    bestFor: "Houseboats and quiet blocks of land.",
  },
  {
    name: "Peregian & Marcus Beach",
    pitch:
      "South past Sunshine Beach. Quieter again; village-square feel; the start of the Coolum stretch.",
    bestFor: "Slow stays and dog-friendly options (verify with each operator).",
  },
];

export default async function AccommodationPage() {
  const live = await fetchLiveBundle();
  const photos = CATEGORY_PHOTOS["accommodation"];
  const heroCredit = photos
    ? `Photo: ${photos.hero.author} / Wikimedia Commons · ${photos.hero.licence}`
    : "";
  return (
    <div className="bg-paper-50">
      {/* Sprint 1.5: full-bleed hero photo (Hastings Street storefronts) */}
      {photos?.hero ? (
        <HeroPhoto
          src={photos.hero.url}
          alt={photos.hero.caption}
          credit={heroCredit}
          caption={photos.hero.caption}
        />
      ) : null}
      <Hero
        eyebrow="Where to stay · ACCC-compliant affiliate disclosure"
        title="Accommodation in Noosa"
        subtitle={
          <>
            We don’t run a booking engine and we don’t take inventory. The
            listings on this page link out to Booking.com, Stayz, Expedia, or
            Airbnb — with our affiliate tag, where we have one. Every monetised
            link is marked <span className="chip-ocean">Sponsored · ACCC Sch 2</span>{" "}
            before you click, per the Competition and Consumer Act 2010 (Cth)
            Schedule 2. The full statement is in the footer.
          </>
        }
        flourish="Right town, right price, right block."
      />

      {/* ─── Inline photo gallery ─── */}
      {photos?.inline?.length ? (
        <section className="container-page py-14 md:py-20" aria-label="Accommodation photo gallery">
          <p className="eyebrow">A few of the properties</p>
          <h2 className="mt-1 font-display text-display-md text-ink-900 text-balance">
            Hastings Street, Main Beach, Noosaville
          </h2>
          <p className="mt-3 lead max-w-3xl">
            We don’t take inventory. We don’t list every property in the
            shire. The photo set below is the editorial cross-section we
            use as the basis for the booking-engine links further down —
            all CC-licensed photographs from Wikimedia Commons contributors
            who shoot Noosa specifically.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {photos.inline.slice(0, 4).map((p, i) => (
              <figure key={i}>
                <div className="relative w-full overflow-hidden rounded-2xl border border-paper-200 bg-paper-100">
                  <Image
                    src={p.url}
                    alt={p.caption}
                    width={1280}
                    height={720}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    unoptimized
                  />
                </div>
                <figcaption className="mt-3 text-caption text-ink-600">
                  <span className="font-medium text-ink-700">{p.caption}</span>
                  <br />
                  <span className="text-ink-600">Photo: {p.author} / Wikimedia Commons · {p.licence}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {/* ─── Disclosure band ─── */}
      <section className="border-t border-paper-200 bg-paper-100" aria-labelledby="accc-disclosure-heading">
        <div className="container-page py-10 md:py-14">
          <p className="eyebrow">Disclosure (ACCC Sch 2)</p>
          <h2 id="accc-disclosure-heading" className="mt-1 font-display text-display-sm text-ink-900 text-balance max-w-3xl">
            Affiliate links earn us a small commission — at no cost to you.
          </h2>
          <div className="mt-5 grid gap-6 md:grid-cols-2 max-w-4xl">
            <p className="text-body text-ink-800">
              Some links on this page are affiliate links. If you book or
              purchase through them, MyNoosaHeads may earn a small commission
              at no extra cost to you. Affiliate relationships do not influence
              the editorial copy on this page — we link to the same operators
              regardless of whether they participate.
            </p>
            <p className="text-body text-ink-800">
              Our position is operator-agnostic: we list the booking engines we
              trust (Booking.com, Stayz, Expedia, Airbnb), not the operators
              that pay the highest commission. We do not run a comparison
              engine, we do not have access to your search criteria, and we
              do not see or store your booking details.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Areas of town ─── */}
      <section className="container-page py-14 md:py-20" aria-labelledby="areas-h">
        <p className="eyebrow">Five places to base yourself</p>
        <h2 id="areas-h" className="mt-1 font-display text-display-md text-ink-900 text-balance">
          Which part of Noosa fits the trip?
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((area) => (
            <Card key={area.name} as="article">
              <CardHeader eyebrow="Area" title={area.name} />
              <CardBody>
                <p className="text-body-sm text-ink-800">{area.pitch}</p>
                <p className="mt-3 text-caption text-ink-700">
                  <span className="font-semibold">Best for: </span>
                  {area.bestFor}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    href="https://www.booking.com/searchresults.html?ss=Noosa+Heads"
                    external
                    size="sm"
                    trailingIcon={<Icons.External size={12} />}
                  >
                    Booking.com
                    <AffiliateBadge programme="Booking.com" mode="compact" />
                  </Button>
                  <Button
                    href="https://www.stayz.com.au/holiday-rental-search?query=Noosa+Heads"
                    external
                    size="sm"
                    variant="outline"
                    trailingIcon={<Icons.External size={12} />}
                  >
                    Stayz
                    <AffiliateBadge programme="Stayz" mode="compact" />
                  </Button>
                  <Button
                    href="https://www.airbnb.com.au/s/Noosa-Heads--Australia/homes"
                    external
                    size="sm"
                    variant="outline"
                    trailingIcon={<Icons.External size={12} />}
                  >
                    Airbnb
                    <AffiliateBadge programme="Airbnb" mode="compact" />
                  </Button>
                  <Button
                    href="https://www.expedia.com.au/Hotels?destination=Noosa+Heads"
                    external
                    size="sm"
                    variant="outline"
                    trailingIcon={<Icons.External size={12} />}
                  >
                    Expedia
                    <AffiliateBadge programme="Expedia" mode="compact" />
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-caption text-ink-600 max-w-3xl">
          Live tiles below refresh every 30 minutes — useful when you’re
          timing a late check-in or a pre-storm walk on the headland.
        </p>
      </section>

      {/* ─── Inline weather tile ─── */}
      <section className="border-t border-paper-200 bg-paper-100" aria-labelledby="weather-h">
        <div className="container-page py-12">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <p className="eyebrow">Today’s conditions</p>
              <h2 id="weather-h" className="mt-1 font-display text-display-sm text-ink-900">
                Useful if you’re checking in late
              </h2>
            </div>
            <p className="text-caption text-ink-600">
              as of{" "}
              <time dateTime={live.asOf}>
                {new Date(live.asOf).toLocaleString("en-AU", {
                  timeZone: "Australia/Brisbane",
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "short",
                })}
              </time>{" "}
              AEST
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card variant="surface" as="article">
              <CardHeader eyebrow="Surf" title="" />
              <CardBody>
                <p className="font-display text-display-sm text-ink-900">{live.surf.value}</p>
                <p className="mt-1 text-caption text-ink-700">{live.surf.secondary}</p>
              </CardBody>
            </Card>
            <Card variant="surface" as="article">
              <CardHeader eyebrow="Wind" title="" />
              <CardBody>
                <p className="font-display text-display-sm text-ink-900">{live.wind.value}</p>
                <p className="mt-1 text-caption text-ink-700">{live.wind.secondary}</p>
              </CardBody>
            </Card>
            <Card variant="surface" as="article">
              <CardHeader eyebrow="Tide" title="" />
              <CardBody>
                <p className="font-display text-display-sm text-ink-900">{live.tide.value}</p>
                <p className="mt-1 text-caption text-ink-700">{live.tide.secondary}</p>
              </CardBody>
            </Card>
            <Card variant="surface" as="article">
              <CardHeader eyebrow="UV" title="" />
              <CardBody>
                <p className="font-display text-display-sm text-ink-900">{live.uv.value}</p>
                <p className="mt-1 text-caption text-ink-700">{live.uv.secondary}</p>
              </CardBody>
            </Card>
          </div>
          <p className="mt-4 text-caption text-ink-600">
            Tiles from BOM Capricornia–Hervey Bay + Open-Meteo. {live.sourceNote}
          </p>
        </div>
      </section>
    </div>
  );
}
