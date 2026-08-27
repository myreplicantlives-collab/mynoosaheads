// src/components/Photo.tsx — image with credit metadata + alt text
import Image from "next/image";
import { creditFor, srcFor, srcSet } from "@/data/images";

type Props = {
  filename: string;          // e.g. "noosa_main_beach.jpg"
  alt: string;
  variant?: "thumb" | "card" | "hero";
  className?: string;
  priority?: boolean;
  caption?: string;          // optional visible caption
  credit?: boolean;          // show credit line under image (default true when caption shown)
};

export function Photo({ filename, alt, variant = "card", className, priority = false, caption, credit = true }: Props) {
  const c = creditFor(filename);
  return (
    <figure className={className}>
      <Image
        src={srcFor(filename, variant)}
        alt={alt}
        width={1600}
        height={1100}
        priority={priority}
        className="w-full h-auto"
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
      {(caption || credit) && c && (
        <figcaption className="mt-2 text-xs text-parchment-500">
          {caption && <span>{caption} </span>}
          {credit && (
            <span>
              {c.credit}.
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}

// Standalone responsive image (no figure/credit)
export function PhotoPlain({ filename, alt, variant = "card", className, priority = false }: Omit<Props, "caption" | "credit">) {
  return (
    <Image
      src={srcFor(filename, variant)}
      alt={alt}
      width={1600}
      height={1100}
      priority={priority}
      className={className || "w-full h-auto"}
      sizes="(min-width: 1024px) 50vw, 100vw"
    />
  );
}