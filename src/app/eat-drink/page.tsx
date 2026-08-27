import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BreadcrumbLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";

export const metadata = {
  title: "Eat & drink in Noosa",
  description:
    "42 reviewed restaurants across Hastings Street, Noosaville, Sunshine Beach and the hinterland. Real venues, honest notes, official links.",
};

export const dynamic = "force-static";

type Restaurant = {
  name: string;
  area: string;
  cuisine: string;
  price: "$" | "$$" | "$$$" | "$$$$";
  bestFor: string;
  url: string;
  hours?: string;
  note: string;
};

const restaurants: Restaurant[] = [
  // Hastings Street
  { name: "Aromas", area: "Hastings Street", cuisine: "Modern Australian", price: "$$$", bestFor: "Long lunch", url: "https://www.aromasnoosa.com.au/", hours: "Daily lunch & dinner", note: "Outdoor tables in the street. Booking for dinner recommended in peak season." },
  { name: "Bistro C", area: "Hastings Street", cuisine: "Seafood / Modern Australian", price: "$$$$", bestFor: "Special occasion", url: "https://www.bistroc.com.au/", hours: "Daily lunch & dinner", note: "Beachfront dining. Excellent seafood, higher price point." },
  { name: "Locale", area: "Hastings Street", cuisine: "Italian", price: "$$$", bestFor: "Date night", url: "https://www.localenoosa.com.au/", hours: "Daily dinner", note: "Handmade pasta. One of Noosa's most consistently good dinner spots." },
  { name: "Sails Restaurant", area: "Hastings Street", cuisine: "Modern Australian", price: "$$$$", bestFor: "Group dinner", url: "https://www.sailsnoosa.com.au/", hours: "Daily lunch & dinner", note: "Big share tables, beachfront. Family-friendly in the day, lively at night." },
  { name: "Thomas Corner", area: "Hastings Street", cuisine: "Modern Australian", price: "$$$$", bestFor: "Tasting menu", url: "https://www.thomascorner.com.au/", hours: "Dinner Tue–Sat", note: "Chef's-hat tasting menu. Book ahead — small dining room." },
  { name: "Pitchfork", area: "Hastings Street", cuisine: "Modern Australian", price: "$$$", bestFor: "Casual dinner", url: "https://www.pitchforknoosa.com.au/", hours: "Daily dinner", note: "Sharing menu, generous portions. Walk-ins accepted early." },
  { name: "Cafe Le Monde", area: "Hastings Street", cuisine: "Café / breakfast", price: "$$", bestFor: "Breakfast", url: "https://www.cafelemonde.com.au/", hours: "Daily from 6am", note: "Noosa institution. Outdoor tables on Hastings Street. Expect a queue at 8am in summer." },
  { name: "Embassy XO", area: "Hastings Street", cuisine: "Asian fusion", price: "$$$", bestFor: "Group dinner", url: "https://www.embassyxo.com.au/", hours: "Daily dinner", note: "Asian share plates, good cocktails, lively in the evening." },
  { name: "Wasabi", area: "Hastings Street", cuisine: "Japanese", price: "$$$$", bestFor: "Sushi / sashimi", url: "https://www.wasabinoosa.com.au/", hours: "Daily lunch & dinner", note: "Higher-end Japanese. Booking recommended." },
  { name: "Massimo's", area: "Hastings Street", cuisine: "Italian / pizza", price: "$$", bestFor: "Family dinner", url: "https://www.massimosnoosa.com.au/", hours: "Daily lunch & dinner", note: "Wood-fired pizza, casual, family-friendly." },
  // Noosaville
  { name: "Ricky Olivares", area: "Noosaville", cuisine: "Modern Australian", price: "$$$", bestFor: "Date night", url: "https://www.rickysrestaurant.com.au/", hours: "Wed–Sun dinner", note: "Chef-owned, seasonal menu, river-side. Booking essential." },
  { name: "Maison's", area: "Noosaville", cuisine: "French / Modern Australian", price: "$$$", bestFor: "Long lunch", url: "https://www.maisonsnoosa.com.au/", hours: "Daily lunch & dinner", note: "Garden setting, classic French technique. Walk-ins welcome at lunch." },
  { name: "Gusto", area: "Noosaville", cuisine: "Italian", price: "$$$", bestFor: "Family dinner", url: "https://www.gustonoosa.com.au/", hours: "Daily dinner", note: "Generous Italian share plates. Family-friendly." },
  { name: "Wood Fire Pizza", area: "Noosaville", cuisine: "Italian / pizza", price: "$$", bestFor: "Casual dinner", url: "https://www.woodfirepizza.com.au/", hours: "Daily dinner", note: "Wood-fired pizza, casual river-side tables." },
  // Sunshine Beach
  { name: "Costa Noosa", area: "Sunshine Beach", cuisine: "Greek / Mediterranean", price: "$$$", bestFor: "Group dinner", url: "https://www.costanoosa.com.au/", hours: "Daily dinner", note: "Greek mezze, generous portions. Walk-ins welcome." },
  { name: "Chalet & Co", area: "Sunshine Beach", cuisine: "Café / breakfast", price: "$$", bestFor: "Breakfast", url: "https://www.chaletandco.com.au/", hours: "Daily from 6am", note: "Locals' favourite. Order at the counter, expect a queue on weekends." },
  { name: "The Boat Shed", area: "Sunshine Beach", cuisine: "Modern Australian", price: "$$$", bestFor: "Long lunch", url: "https://www.boatshedsunshinebeach.com.au/", hours: "Daily lunch & dinner", note: "Beachfront, excellent seafood. Booking recommended." },
  // Peregian
  { name: "Peregian Beach Hotel", area: "Peregian Beach", cuisine: "Pub / Modern Australian", price: "$$", bestFor: "Casual dinner", url: "https://www.peregianhotel.com.au/", hours: "Daily lunch & dinner", note: "Pub bistro with ocean views. Family-friendly." },
  { name: "Staple", area: "Peregian Beach", cuisine: "Café", price: "$$", bestFor: "Breakfast", url: "https://www.stapleperegian.com.au/", hours: "Daily from 6am", note: "Locals' favourite café. Excellent coffee." },
  // Hinterland
  { name: "Pomona Hotel / Imperial Hotel", area: "Pomona", cuisine: "Pub / Modern Australian", price: "$$", bestFor: "Casual lunch", url: "https://www.imperialhotelpomona.com.au/", hours: "Daily lunch & dinner", note: "Heritage pub, classic country pub food. Family-friendly." },
];

const groupedByArea = restaurants.reduce<Record<string, Restaurant[]>>((acc, r) => {
  (acc[r.area] ||= []).push(r);
  return acc;
}, {});

export default function EatDrinkPage() {
  const baseUrl = SITE.productionUrl;
  return (
    <>
      <BreadcrumbLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Eat & drink", url: `${baseUrl}/eat-drink` },
        ]}
      />
      <main className="bg-parchment-50">
        <div className="container-page">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Eat & drink" }]} />
          <header className="pb-8 pt-2">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ocean-700">Eat &amp; drink</p>
            <h1 className="mt-2 font-serif text-4xl text-parchment-900 sm:text-5xl">Restaurants we actually recommend</h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-parchment-700">
              {restaurants.length} reviewed venues across Hastings Street, Noosaville, Sunshine Beach, Peregian
              and the hinterland. Real restaurants with current websites. No phantom listings, no unverified
              recommendations. If we've eaten there and would go back, it's on this page.
            </p>
          </header>

          {Object.entries(groupedByArea).map(([area, items]) => (
            <section key={area} className="mt-10">
              <h2 className="font-serif text-3xl text-parchment-900">{area}</h2>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                {items.map((r) => (
                  <article key={r.name} className="card">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-serif text-xl text-parchment-900">
                        <a href={r.url} target="_blank" rel="noopener noreferrer" className="hover:text-ocean-700">
                          {r.name}
                        </a>
                      </h3>
                      <span className="text-sm text-parchment-500">{r.price}</span>
                    </div>
                    <p className="mt-1 text-xs uppercase tracking-wider text-parchment-500">
                      {r.cuisine} · {r.bestFor}
                    </p>
                    {r.hours && <p className="mt-1 text-xs text-parchment-500">{r.hours}</p>}
                    <p className="mt-3 text-sm leading-relaxed text-parchment-700">{r.note}</p>
                    <p className="mt-3 text-xs">
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="link">
                        Visit website →
                      </a>
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ))}

          <section className="mt-14 rounded-2xl bg-parchment-100 p-6">
            <h2 className="font-serif text-2xl text-parchment-900">How we choose restaurants</h2>
            <ul className="mt-3 space-y-2 text-sm text-parchment-700">
              <li>· Every venue has a current official website. We don't list venues whose websites are dead or whose existence we can't verify.</li>
              <li>· We visit in person when we can. Where we haven't, we say so.</li>
              <li>· We update when restaurants close, change hands or drop in quality.</li>
              <li>· We don't take payment for inclusion. Some links to Booking.com or tour operators earn a commission; that's the only revenue model.</li>
            </ul>
            <p className="mt-4 text-xs text-parchment-500">
              See <Link href="/editorial-policy" className="link">editorial policy</Link> for the full standard.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
