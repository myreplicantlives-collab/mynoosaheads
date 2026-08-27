import Link from "next/link";
import { Button, Card, CardBody, CardHeader, Hero, LiveDataWidget, LiveDataGrid, Icons } from "@/components/ui";
import { SPRINT } from "@/data/site";

// Sprint 1.2 — homepage restyled on the new design system.
// No content work in this sprint (that's TSK-2957-03). We showcase every
// major component here so the design system is visibly live end-to-end.
export default function HomePage() {
  return (
    <div className="bg-paper-50">
      <Hero
        eyebrow={`${SPRINT.id} · Sprint 1.3 coming`}
        title="My Noosa Heads — coming soon."
        subtitle="An honest, sourced, current guide to Noosa Heads. Built slowly on the Sunshine Coast, with the locals first."
        flourish="by the headland, by the bar"
        actions={
          <>
            <Button leadingIcon={<Icons.Wave size={16} />} size="lg">
              Today’s surf
            </Button>
            <Button variant="outline" size="lg" trailingIcon={<Icons.ChevronRight size={16} />}>
              Design system
            </Button>
          </>
        }
        trailingSlot={
          <LiveDataGrid>
            <LiveDataWidget
              kind="surf"
              title="Surf"
              value="1.4 m"
              secondary="SSE swell, period 9 s"
              source="BOM"
              asOf="06:40"
            />
            <LiveDataWidget
              kind="wind"
              title="Wind"
              value="14 km/h SE"
              secondary="Gusts 22 km/h"
              source="Open-Meteo"
              asOf="06:40"
            />
            <LiveDataWidget
              kind="tide"
              title="Tide"
              value="0.8 m ↓"
              secondary="High 11:42, low 18:09"
              source="BOM"
              asOf="06:40"
            />
          </LiveDataGrid>
        }
      />

      <section className="border-t border-paper-200 bg-paper-100">
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">Sprint status</p>
          <h2 className="mt-1 font-display text-display-md text-ink-900 text-balance">
            Where we are
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader eyebrow="Sprint 1.1" title="Foundation scaffold" />
              <CardBody>
                <p className="text-body-sm text-ink-700">
                  Next.js 14, TypeScript strict, Tailwind, MDX. Deployed to Vercel.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardHeader eyebrow="Sprint 1.2" title="Design system" disclosure="You are here" />
              <CardBody>
                <p className="text-body-sm text-ink-700">
                  Coastal palette, typography, component library, accessibility primitives,
                  and three logo mocks for Albert to review.
                </p>
                <div className="mt-4">
                  <Button
                    href="/styleguide"
                    variant="outline"
                    size="sm"
                    trailingIcon={<Icons.ChevronRight size={14} />}
                  >
                    See the style guide
                  </Button>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader eyebrow="Sprint 1.3" title="Content + go live" />
              <CardBody>
                <p className="text-body-sm text-ink-700">
                  Where to stay, eat &amp; drink, surf &amp; weather, hikes, things to do,
                  itineraries, sources, and the custom domain flip.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <section className="container-page py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 items-start">
          <div>
            <p className="eyebrow">What this site is</p>
            <h2 className="mt-1 font-display text-display-md text-ink-900 text-balance">
              A slow-guide field manual for Noosa.
            </h2>
            <p className="mt-4 lead text-pretty">
              MyNoosaHeads is a warm, practical guide — surf, weather, parks, places to stay,
              places to eat. Every claim has a source. We update the data ourselves so you
              don’t have to.
            </p>
            <p className="mt-4 text-body-sm text-ink-700">
              No newsletter. No pop-ups. No fabricated reviews. No AI photography. Just an
              honest guide you can check before you head to the bar.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="https://docs.google.com/document/d/1uhgrrsZjayHMPiJGB7_NHsq3N__SV-lD/edit"
                className="btn-primary btn-md"
                rel="noopener noreferrer"
                target="_blank"
              >
                Read the build plan
              </Link>
              <Link href="/hello-noosa" className="btn-outline btn-md">
                Sample MDX page
              </Link>
            </div>
          </div>
          <div>
            <Card variant="surface">
              <CardBody>
                <p className="eyebrow">Sample MDX route</p>
                <h3 className="mt-1 font-display text-headline-lg text-ink-900">
                  Hello, Noosa — quick tour
                </h3>
                <p className="mt-3 text-body-sm text-ink-700">
                  The hello-noosa page demonstrates the full MDX pipeline (gray-matter
                  frontmatter, reading time, custom components, server-rendered). It’s
                  still the v1 placeholder copy — Sprint 1.3 will replace it with real
                  editorial content.
                </p>
                <div className="mt-4 flex gap-2">
                  <Link href="/hello-noosa" className="btn-outline btn-sm">
                    Open sample
                  </Link>
                  <Link href="/styleguide" className="btn-ghost btn-sm">
                    Style guide
                  </Link>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
