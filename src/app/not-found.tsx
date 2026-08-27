import Link from "next/link";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="bg-paper-50">
      <div className="container-narrow py-20 text-center">
        <p className="eyebrow text-coral-700">404</p>
        <h1 className="mt-2 font-display text-display-lg text-ink-900 text-balance">
          Page not found
        </h1>
        <p className="mt-4 lead text-pretty">
          This page doesn’t exist. Try the <Link href="/">home page</Link>, or
          check back soon — we’re adding new pages weekly.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/styleguide" variant="outline">
            Style guide
          </Button>
        </div>
      </div>
    </div>
  );
}
