import Link from "next/link";
import { SITE, SPRINT } from "@/data/site";

// Sprint 1.1 — minimal "Hello, Noosa" landing page.
// TSK-2957-02 (design system) will restyle this; TSK-2957-03 (content) will
// replace it with the full tourism-positive homepage.
export default function HomePage() {
  return (
    <div className="bg-parchment-50">
      <section className="container-page py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ocean-700">
            {SPRINT.id} · {SPRINT.title}
          </p>
          <h1 className="mt-3 font-serif text-5xl leading-tight text-parchment-900 sm:text-6xl">
            Hello, Noosa — coming soon.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-parchment-700">
            My Noosa Heads is a warm, practical guide to Noosa Heads —
            beaches, hikes, where to stay, where to eat, the surf and the
            weather. Honest, sourced, and current. We are rebuilding it
            from the ground up on a modern stack.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={SPRINT.buildPlanUrl}
              className="btn btn-primary"
              rel="noopener noreferrer"
              target="_blank"
            >
              Read the build plan
            </Link>
            <Link href="/hello-noosa" className="btn btn-outline">
              Sample MDX page
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-parchment-200 bg-parchment-100">
        <div className="container-page py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <p className="eyebrow">Sprint 1.1</p>
              <h2 className="mt-2 font-serif text-2xl text-parchment-900">
                Foundation scaffold
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-parchment-700">
                Next.js 14, TypeScript strict, Tailwind CSS, and MDX. Deployed
                to Vercel. Production URL serves 200 OK.
              </p>
            </div>
            <div>
              <p className="eyebrow">Sprint 1.2</p>
              <h2 className="mt-2 font-serif text-2xl text-parchment-900">
                Design system
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-parchment-700">
                Coastal palette, typography, component library, accessibility
                primitives. Comes next.
              </p>
            </div>
            <div>
              <p className="eyebrow">Sprint 1.3</p>
              <h2 className="mt-2 font-serif text-2xl text-parchment-900">
                Content + go live
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-parchment-700">
                Where to stay, eat & drink, surf & weather, hikes, things to
                do, itineraries, sources, and the custom domain flip.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}