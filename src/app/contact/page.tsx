import type { Metadata } from "next";
import Link from "next/link";
import { Hero, Card, CardBody, CardHeader, Button, JsonLd } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact MyNoosaHeads — error reports, broken links, editorial suggestions. The contact form opens your email client; we don't store any data.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · MyNoosaHeads",
    description:
      "Error reports, broken links, editorial suggestions. No data captured by this site.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact · MyNoosaHeads",
    description:
      "Error reports, broken links, editorial suggestions. No data captured.",
  },
};

export default function ContactPage() {
  const contactJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": `${SITE.productionUrl}/contact#page`,
      url: `${SITE.productionUrl}/contact`,
      name: `Contact · ${SITE.brand}`,
      inLanguage: SITE.locale,
      isPartOf: { "@id": `${SITE.productionUrl}#website` },
      about: { "@id": `${SITE.productionUrl}#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: SITE.brand,
          item: SITE.productionUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact",
          item: `${SITE.productionUrl}/contact`,
        },
      ],
    },
  ];
  return (
    <div className="bg-paper-50">
      <JsonLd data={contactJsonLd} />
      <Hero
        eyebrow="Contact · no email storage"
        title="Get in touch"
        subtitle="The form below opens your email client with a pre-filled message. Nothing is captured, stored, or sent to a third party — your message never touches our servers."
        flourish="We reply within a few days."
      />

      <section className="container-page py-14 md:py-20" aria-labelledby="contact-h">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="eyebrow">Send a message</p>
            <h2
              id="contact-h"
              className="mt-1 font-display text-display-md text-ink-900 text-balance"
            >
              Use the form, or email direct.
            </h2>
            <ContactForm />
            <div className="mt-4">
              <Button
                href="mailto:hello@mynoosaheads.com"
                variant="outline"
                size="md"
                trailingIcon={<span aria-hidden="true">→</span>}
                data-track="contact_mailto_click"
              >
                Email direct
              </Button>
            </div>
          </div>

          <aside className="space-y-6">
            <Card variant="surface">
              <CardHeader eyebrow="What we're good at" title="" />
              <CardBody>
                <ul className="space-y-2 text-body-sm text-ink-800 list-disc pl-5">
                  <li>Error reports on specific pages (include the URL)</li>
                  <li>Outbound links that are broken</li>
                  <li>Suggestions for additional Noosa coverage</li>
                  <li>Affiliation enquiries from local operators</li>
                </ul>
              </CardBody>
            </Card>
            <Card variant="surface">
              <CardHeader eyebrow="Response time" title="" />
              <CardBody>
                <p className="text-body-sm text-ink-800">
                  We aim to reply within 3 business days. The site is run
                  by a small editorial team; complex editorial questions
                  may take longer.
                </p>
              </CardBody>
            </Card>
            <Card variant="surface">
              <CardHeader eyebrow="For urgent safety issues" title="" />
              <CardBody>
                <p className="text-body-sm text-ink-800">
                  MyNoosaHeads is not an emergency service. For an
                  immediate coastal safety issue, contact the relevant
                  authority —{" "}
                  <Link
                    href="https://www.lifesaving.com.au/"
                    className="link text-ocean-700"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Surf Life Saving QLD
                  </Link>{" "}
                  for beach incidents, or{" "}
                  <a href="tel:000" className="link text-ocean-700">
                    000
                  </a>{" "}
                  for emergencies.
                </p>
              </CardBody>
            </Card>
          </aside>
        </div>
      </section>
    </div>
  );
}