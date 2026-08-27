// src/components/mdxComponents.tsx — MDX components map used by
// next-mdx-remote/rsc on the server. Provides light typography styling so
// MDX renders with the coastal palette. TSK-2957-02 will replace these
// with the proper component library.

import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="font-serif text-4xl mt-8 mb-4 text-[color:var(--color-text)]"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="font-serif text-3xl mt-8 mb-3 text-[color:var(--color-text)]"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-serif text-2xl mt-6 mb-2 text-[color:var(--color-text)]"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="my-4 leading-relaxed text-[color:var(--color-text)]"
      {...props}
    />
  ),
  a: ({ href, ...rest }) => {
    const isInternal =
      typeof href === "string" &&
      (href.startsWith("/") || href.startsWith("#"));
    if (isInternal) {
      return (
        <Link
          href={href as string}
          className="underline decoration-[color:var(--color-ocean)] underline-offset-4 hover:opacity-80"
          {...rest}
        />
      );
    }
    return (
      <a
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        className="underline decoration-[color:var(--color-ocean)] underline-offset-4 hover:opacity-80"
        {...rest}
      />
    );
  },
  ul: (props) => <ul className="list-disc pl-6 my-4 space-y-2" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-[color:var(--color-ocean)] pl-4 italic text-[color:var(--color-text-muted)] my-4"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="font-mono text-sm bg-[color:var(--color-surface)] px-1.5 py-0.5 rounded"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="bg-[color:var(--color-surface)] rounded-lg p-4 overflow-x-auto my-4"
      {...props}
    />
  ),
  hr: (props) => (
    <hr className="border-[color:var(--color-surface)] my-8" {...props} />
  ),
};