import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-parchment-50">
      <div className="container-narrow py-20 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-ocean-700">404</p>
        <h1 className="mt-2 font-serif text-5xl text-parchment-900">Page not found</h1>
        <p className="mt-4 text-lg leading-relaxed text-parchment-700">
          We couldn't find that page. It may have moved, or the link may be from an older version of this site.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">Back to home</Link>
          <Link href="/itineraries" className="btn btn-outline">Trip itineraries</Link>
          <Link href="/sources" className="btn btn-ghost">Our sources</Link>
        </div>
      </div>
    </main>
  );
}
