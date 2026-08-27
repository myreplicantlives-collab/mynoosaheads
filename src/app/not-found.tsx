import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-parchment-50">
      <div className="container-narrow py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ocean-700">
          404
        </p>
        <h1 className="mt-2 font-serif text-5xl text-parchment-900">
          Page not found
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-parchment-700">
          That page isn&apos;t here. The site is under construction.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}