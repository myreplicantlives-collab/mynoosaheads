// src/data/affiliate.ts — environment-driven affiliate destination builder.
// No invented IDs. When the env var is unset, the link falls back to the official
// search URL and the UI surfaces "Not yet monetised" disclosure.

type AffiliatePartner = {
  id: string;
  name: string;
  label: string; // shown in the UI ("Book on Booking.com")
  envKey: string; // env var name
  fallback: string; // official-fallback URL when env var unset
  disclosure: string; // shown next to the link
};

export const AFFILIATES: AffiliatePartner[] = [
  {
    id: "booking",
    name: "Booking.com",
    label: "Check availability on Booking.com",
    envKey: "NEXT_PUBLIC_BOOKING_AID",
    fallback: "https://www.booking.com/searchresults.html?ss=Noosa+Heads",
    disclosure: "Booking.com partner link — we may earn a commission on bookings.",
  },
  {
    id: "agoda",
    name: "Agoda",
    label: "Check availability on Agoda",
    envKey: "NEXT_PUBLIC_AGODA_AID",
    fallback: "https://www.agoda.com/search?city=17105",
    disclosure: "Agoda partner link — we may earn a commission on bookings.",
  },
  {
    id: "getyourguide",
    name: "GetYourGuide",
    label: "Browse tours on GetYourGuide",
    envKey: "NEXT_PUBLIC_GYG_AID",
    fallback: "https://www.getyourguide.com/noosa-l322/",
    disclosure: "GetYourGuide partner link — we may earn a commission on bookings.",
  },
  {
    id: "viator",
    name: "Viator",
    label: "Browse tours on Viator",
    envKey: "NEXT_PUBLIC_VIATOR_AID",
    fallback: "https://www.viator.com/Noosa/d6169-ttd",
    disclosure: "Viator partner link — we may earn a commission on bookings.",
  },
  {
    id: "klook",
    name: "Klook",
    label: "Browse experiences on Klook",
    envKey: "NEXT_PUBLIC_KLOOK_AID",
    fallback: "https://www.klook.com/en-AU/search/result/?keyword=Noosa",
    disclosure: "Klook partner link — we may earn a commission on bookings.",
  },
];

export function affiliateUrl(partnerId: string, base: string): { url: string; monetised: boolean; partner: string } {
  const partner = AFFILIATES.find((p) => p.id === partnerId);
  if (!partner) return { url: base, monetised: false, partner: "unknown" };
  // Server-side: env vars are not exposed to client unless prefixed with NEXT_PUBLIC_.
  // We try the env, fall back to the official destination.
  const aid = process.env[partner.envKey];
  if (!aid) {
    return { url: partner.fallback, monetised: false, partner: partner.name };
  }
  // Booking.com style: ?aid=XXXXXX
  const url = appendQuery(partner.fallback, `aid=${encodeURIComponent(aid)}`);
  return { url, monetised: true, partner: partner.name };
}

function appendQuery(url: string, q: string): string {
  if (url.includes("?")) return `${url}&${q}`;
  return `${url}?${q}`;
}