"use client";

import { usePathname } from "next/navigation";
import { NavBar } from "@/components/ui";
import { NAV } from "@/data/site";

/**
 * SiteHeader — sticky top nav wired to the canonical NAV list in
 * src/data/site.ts. The component is a client component so it can read
 * the current pathname for active-state highlighting; the nav itself
 * remains a server-rendered list.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const items = NAV.map((n) => ({
    label: n.label,
    href: n.href,
    active:
      pathname === n.href ||
      (pathname?.startsWith(n.href + "/") ?? false),
  }));
  return <NavBar items={items} />;
}
