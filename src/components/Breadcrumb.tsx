import Link from "next/link";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb py-3">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden className="text-parchment-400">›</span>}
          {it.href ? (
            <Link href={it.href}>{it.label}</Link>
          ) : (
            <span aria-current={i === items.length - 1 ? "page" : undefined} className="text-parchment-700">
              {it.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}