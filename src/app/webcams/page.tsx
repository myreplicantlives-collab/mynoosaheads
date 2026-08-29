import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Hero,
  HeroPhoto,
  Card,
  CardBody,
  CardHeader,
  Button,
  Icons,
} from "@/components/ui";
import { CATEGORY_PHOTOS } from "@/data/photos";

export const metadata: Metadata = {
  title: "Webcams",
  description:
    "Live coastal webcams around Noosa — Council, SLSQ, and other public feeds. We don’t scrape; we link.",
  alternates: { canonical: "/webcams" },
  openGraph: {
    title: "Webcams · MyNoosaHeads",
    description: "Coastal webcams we link to, with attribution.",
    url: "/webcams",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Webcams · MyNoosaHeads",
    description: "Coastal webcams we link to, with attribution.",
  },
};

const CAMS = [
  {
    name: "Noosa Main Beach",
    operator: "Sunshine Coast Council",
    description:
      "The flagship Noosa Heads beach cam. Look north-west to see the surf club and the flags. Useful for the morning check before the walk down Hastings Street.",
    href: "https://www.sunshinecoast.qld.gov.au/Environment/Rivers-and-coast",
    embed: false,
  },
  {
    name: "Coolum Beach",
    operator: "Sunshine Coast Council",
    description:
      "About 25 minutes south of Noosa Heads. Useful when the south-east is running and you want a longer-period look at the swell.",
    href: "https://www.sunshinecoast.qld.gov.au/Environment/Rivers-and-coast",
    embed: false,
  },
  {
    name: "Mooloolaba Beach",
    operator: "Sunshine Coast Council",
    description:
      "Mooloolaba is 40 minutes north. A different angle on the same marine district — useful if you’re deciding between the two ends of the coast.",
    href: "https://www.sunshinecoast.qld.gov.au/Environment/Rivers-and-coast",
    embed: false,
  },
  {
    name: "SLSQ patrol flags",
    operator: "Surf Life Saving Queensland",
    description:
      "SLSQ publishes patrol flags and webcam stills for the patrolled beaches. Use this to confirm which flags are up before you set up at the beach.",
    href: "https://www.lifesaving.com.au/",
    embed: false,
  },
  {
    name: "Beachsafe beach pages",
    operator: "Beachsafe.org.au",
    description:
      "Beachsafe lists every patrolled beach in Australia with hazards, facilities, and the current patrol status. Noosa Main Beach and Sunshine Beach are both covered.",
    href: "https://beachsafe.org.au/",
    embed: false,
  },
  {
    name: "QLD rainfall + river heights",
    operator: "Bureau of Meteorology",
    description:
      "The BOM rainfall and river-height pages are the quickest way to see whether the Noosa River is up after a heavy shower. Useful before any river crossing.",
    href: "https://www.bom.gov.au/qld/flood/",
    embed: false,
  },
];

export default function WebcamsPage() {
  const photos = CATEGORY_PHOTOS["webcams"];
  // MSN-2975 — strip photographer attribution from rendered HTML
  // on main-journey pages. Full attribution lives at /photo-credits.
  const heroCredit = "";

  return (
    <div className="bg-paper-50">
      {photos?.hero ? (
        <HeroPhoto
          src={photos.hero.url}
          srcSet={photos.hero.srcSet}
          alt={photos.hero.caption}
          credit={heroCredit}
          caption={photos.hero.caption}
        />
      ) : null}
      <Hero
        eyebrow="Public feeds · we link, we don’t scrape"
        title="Webcams"
        subtitle="A practical list of public coastal webcams around Noosa. Where the operator allows embedding with attribution, we embed; where a link-out is required, we link."
        flourish="Check the cam before you check the car keys."
      />

      {/* Sprint 1.5: inline images after the gallery.
       * MSN-2975 perf chunk 2: inline photos still resolve to Wikimedia
       * thumbnails (chunk 5 will convert /things-to-do cards and other
       * inline grids to self-hosted WebPs). Explicit width/height +
       * sizes + loading="lazy" keep CLS = 0 here. */}
      {photos?.inline?.length ? (
        <section className="container-page pb-14 md:pb-20" aria-label="Webcam subject photos">
          <div className="grid gap-8 md:grid-cols-2">
            {photos.inline.slice(0, 4).map((p, i) => (
              <figure key={i} className="relative w-full overflow-hidden rounded-2xl border border-paper-200 bg-paper-100">
                <Image
                  src={p.url}
                  alt={p.caption}
                  width={1280}
                  height={720}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  // MSN-2959 / TSK-2959-POLISH-B: Vercel image opt (AVIF/WebP).
                />
                <figcaption className="px-4 py-3 text-caption text-ink-700 bg-paper-100 border-t border-paper-200">
                  <span className="font-medium text-ink-800">{p.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="cams-h"
      >
        <p className="eyebrow">Six public feeds</p>
        <h2 id="cams-h" className="mt-1 font-display text-display-md text-ink-900 text-balance">
          Live webcam gallery
        </h2>
        <p className="mt-3 lead max-w-3xl">
          Public coastal webcams around Noosa, operated by Sunshine Coast
          Council, Surf Life Saving Queensland, and Beachsafe. All linked,
          all free, all refreshed by their operators.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CAMS.map((cam) => (
            <Card key={cam.name} as="article">
              <CardHeader eyebrow={cam.operator} title={cam.name} />
              <CardBody>
                {/* Empty-state tile — live embed arrives when the operator
                    permits it. Uses paper-100 to make the empty state honest. */}
                <div
                  className="aspect-video w-full rounded-lg bg-paper-200 border border-paper-300 flex items-center justify-center text-ink-500"
                  role="img"
                  aria-label={`${cam.name} — live embed coming soon`}
                >
                  <Icons.Camera size={32} />
                </div>
                <p className="mt-4 text-body-sm text-ink-800">{cam.description}</p>
                <div className="mt-4">
                  <Button
                    href={cam.href}
                    external
                    size="sm"
                    trailingIcon={<Icons.External size={12} />}
                  >
                    Open {cam.operator}
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <aside className="callout mt-10">
          <p className="eyebrow">Attribution</p>
          <p className="mt-2 text-body-sm text-ink-800">
            All webcams listed on this page are public feeds operated by
            Sunshine Coast Council, Surf Life Saving Queensland, Beachsafe,
            or the Bureau of Meteorology. We don’t scrape or re-host. If
            you operate a public coastal webcam that should be listed here,{" "}
            <Link href="/contact" className="link text-ocean-700">
              drop us a line
            </Link>
            .
          </p>
        </aside>
      </section>
    </div>
  );
}
