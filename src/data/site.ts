// src/data/site.ts — site-wide configuration, brand identity, navigation, legal copy

export const SITE = {
  brand: "My Noosa Heads",
  brandShort: "mynoosaheads",
  tagline: "Plan your Noosa trip well.",
  domain: "mynoosaheads.com",
  productionUrl: "https://noosa-site-v2.vercel.app", // custom domain currently parked at GoDaddy
  customDomainLive: false, // BLOCKED — DNS flip required at GoDaddy
  customDomainBlocker:
    "DNS for mynoosaheads.com is still parked at GoDaddy (A records 76.223.67.189 / 13.248.213.45, NS domaincontrol.com). " +
    "The build is production-ready on the Vercel project; the custom-domain flip requires GoDaddy DNS credentials that are not in this build scope.",
  email: "hello@mynoosaheads.com", // contact path; mailto: will work in browser
  author: {
    name: "The mynoosaheads editors",
    bio:
      "Written and fact-checked locally by people who live in and visit Noosa regularly. " +
      "We name what we recommend and we name what we don't.",
    contactPath: "/contact",
  },
  locale: "en-AU",
  region: "Queensland, Australia",
  established: 2026,
  editorial:
    "We name the good and the bad. We name our sources. We update when things change. " +
    "We don't sell recommendations to the businesses we cover.",
};

export const NAV = [
  { label: "Visit", href: "/visit" },
  { label: "Places", href: "/places" },
  { label: "Where to stay", href: "/where-to-stay" },
  { label: "Eat & drink", href: "/eat-drink" },
  { label: "Surf & weather", href: "/surf-weather" },
  { label: "Hikes", href: "/hikes" },
  { label: "Things to do", href: "/things-to-do" },
  { label: "Itineraries", href: "/itineraries" },
];

export const SECONDARY_NAV = [
  { label: "About", href: "/about" },
  { label: "Sources", href: "/sources" },
  { label: "Image credits", href: "/image-credits" },
  { label: "Editorial policy", href: "/editorial-policy" },
  { label: "Corrections", href: "/corrections" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_DISCLOSURE =
  "Some links on this site earn a small commission when you book through them — accommodation, tours, " +
  "and transport partners. We only recommend what we'd recommend without the commission, and we always " +
  "disclose which links are affiliate links.";