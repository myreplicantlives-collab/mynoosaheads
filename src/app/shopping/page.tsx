import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";
import { SHOPPING_CATEGORIES } from "@/data/shopping";
import { VERIFIED } from "@/data/photos-msn2982";

/**
 * /shopping — MSN-2982 chairman-mandated rework.
 *
 * Word budget: 600 words. KUBE pattern: hero → atmospheric intro →
 * image-led category cards (image + label only) → 5 featured places
 * per category (image + label only) → practical info.
 *
 * Per chairman mandate #9: card body copy is <18 words, one sentence.
 * Per chairman mandate #12: each card links to the operator/listing
 * URL directly (no generic Booking.com homepages).
 *
 * Photography: every category uses the MSN-2982 verified photo set.
 */

export const metadata: Metadata = {
  title: "Shop Noosa · Boutiques, markets and makers",
  description:
    "Boutiques on Hastings Street, the Junction, Peregian, Sunshine Beach, Eumundi and the hinterland markets.",
  alternates: { canonical: "/shopping" },
};

function photoFor(slug: string): { path: string; caption: string } {
  if (slug.includes("farmers") || slug.includes("market")) return { path: VERIFIED.cards.noosaFarmersMarket.path, caption: VERIFIED.cards.noosaFarmersMarket.caption };
  if (slug.includes("gallery")) return { path: VERIFIED.cards.noosaRegionalGallery.path, caption: VERIFIED.cards.noosaRegionalGallery.caption };
  if (slug.includes("hastings")) return { path: VERIFIED.cards.hastingsStreetEast.path, caption: VERIFIED.cards.hastingsStreetEast.caption };
  if (slug.includes("everglades")) return { path: VERIFIED.cards.noosaEverglades.path, caption: VERIFIED.cards.noosaEverglades.caption };
  if (slug.includes("peregian")) return { path: VERIFIED.cards.noosaRiver.path, caption: VERIFIED.cards.noosaRiver.caption };
  return { path: VERIFIED.cards.hastingsStreetEast.path, caption: VERIFIED.cards.hastingsStreetEast.caption };
}

export default function ShoppingPage() {
  return (
    <div className="bg-paper-50">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            "@id": `${SITE.productionUrl}/shopping#destination`,
            name: "Shop Noosa",
            description:
              "Boutiques on Hastings Street, the Junction, Peregian, Sunshine Beach, Eumundi and the hinterland markets.",
            url: `${SITE.productionUrl}/shopping`,
          },
        ]}
      />

      {/* ─── 1. Hero — Noosa Farmers Market (verified) ─── */}
      <section
        aria-label="Shop Noosa"
        className="relative w-full overflow-hidden bg-ink-900 h-[80vh] min-h-[560px] max-h-[1000px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/cards/noosa-farmers-market.jpg"
          alt="Noosa Farmers Market — Sunday morning on the Noosaville showgrounds."
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
            <p className="eyebrow text-paper-300">SHOP</p>
            <h1
              className="mt-3 font-display text-display-xl md:text-display-xl text-paper-50 text-balance max-w-4xl"
              style={{ textShadow: "0 2px 24px rgba(11,28,28,0.45)" }}
            >
              Shop Noosa.
            </h1>
            <p className="mt-4 lead text-paper-200 max-w-3xl text-pretty">
              Boutiques, markets, makers — across five precincts.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 2. Atmospheric intro ─── */}
      <section
        className="border-y border-paper-200 bg-paper-100"
        aria-labelledby="shop-intro-heading"
      >
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">Eight categories · forty places</p>
          <h2
            id="shop-intro-heading"
            className="mt-3 font-display text-display-md md:text-display-lg text-ink-900 text-balance max-w-3xl"
          >
            From the Hastings Street strip to the hinterland markets.
          </h2>
          <p className="mt-5 lead max-w-2xl text-pretty">
            Hastings Street for fashion. Junction for everyday. Peregian for the village. Eumundi on Wednesdays and Saturdays. Farmers every Sunday morning.
          </p>
        </div>
      </section>

      {/* ─── 3. Category cards (image-led, label-only bodies) ─── */}
      {SHOPPING_CATEGORIES.map((cat) => {
        const heroPhoto = photoFor(cat.id);
        return (
          <section
            key={cat.id}
            id={cat.anchor}
            className="border-b border-paper-200"
            aria-labelledby={`cat-${cat.id}-heading`}
          >
            <div className="container-page py-10 md:py-14">
              <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-5">
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-paper-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={heroPhoto.path}
                      alt={heroPhoto.caption}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <p className="eyebrow">{cat.eyebrow}</p>
                  <h2 id={`cat-${cat.id}-heading`} className="mt-3 font-display text-display-md md:text-display-lg text-ink-900 text-balance">
                    {cat.name}
                  </h2>
                  <p className="mt-4 text-body-md text-ink-800 max-w-2xl text-pretty">
                    {cat.hook.split(".").slice(0, 1).join(".") + "."}
                  </p>
                </div>
              </div>

              {/* Five featured places (image + label only) */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {cat.places.map((p) => {
                  const photo = photoFor(p.slug);
                  return (
                    <a
                      key={p.slug}
                      href={p.linkToMore}
                      target={p.linkToMore.startsWith("http") ? "_blank" : undefined}
                      rel={p.linkToMore.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group relative block overflow-hidden rounded-xl aspect-[4/5] bg-ink-700"
                      data-track={`shop_${cat.id}_${p.slug}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.path}
                        alt={photo.caption}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/30 to-transparent"
                        aria-hidden="true"
                      />
                      <div className="relative h-full w-full p-4 md:p-5 flex flex-col justify-end">
                        <p className="text-caption uppercase tracking-wider text-paper-300">
                          {p.type}
                        </p>
                        <h3 className="mt-1 font-display text-headline-sm text-paper-50 text-balance">
                          {p.name}
                        </h3>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* ─── 4. Practical info ─── */}
      <section
        className="bg-paper-100 border-y border-paper-200"
        aria-labelledby="shop-practical-heading"
      >
        <div className="container-page py-12 md:py-16">
          <h2 id="shop-practical-heading" className="font-display text-display-md text-ink-900 text-balance">
            Practical.
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 text-body-md text-ink-800">
            <li>
              <strong className="text-ink-900">Sunday:</strong> Noosa Farmers Market, Noosaville showgrounds, 7am–midday.
            </li>
            <li>
              <strong className="text-ink-900">Wednesday &amp; Saturday:</strong> Eumundi Markets, Memorial Drive, 7am–2pm.
            </li>
            <li>
              <strong className="text-ink-900">Parking:</strong> Hastings Street paid parking fills by 11am. Park at Lions Park and walk.
            </li>
            <li>
              <strong className="text-ink-900">Dogs:</strong> On-leash on Hastings Street. On-leash at the farmers market.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
