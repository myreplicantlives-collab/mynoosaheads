// src/app/hello-noosa/page.tsx — example MDX route (Sprint 1.1 demo).
//
// Demonstrates the full MDX pipeline:
//   1. content/posts/hello-noosa.mdx is the canonical MDX file
//   2. lib/posts.ts loads it, parses frontmatter (gray-matter), computes
//      reading time (reading-time)
//   3. next-mdx-remote/rsc renders the MDX body server-side with our
//      custom mdxComponents map
//
// TSK-2957-03 will generalise this to a dynamic /posts/[slug] route and
// add a /posts index page. For Sprint 1.1 we ship a single static route
// so the MDX wiring is verifiable end-to-end.

import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug } from "@/lib/posts";
import { SPRINT } from "@/data/site";
import { mdxComponents } from "@/components/mdxComponents";

export const dynamic = "force-static";

export function generateMetadata() {
  const post = getPostBySlug("hello-noosa");
  if (!post) return { title: "Not found" };
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default function HelloNoosaPage() {
  const post = getPostBySlug("hello-noosa");
  if (!post) {
    return (
      <div className="container-prose py-20">
        <h1 className="font-serif text-3xl">Post not found</h1>
        <p className="mt-4 text-text-muted">
          The hello-noosa MDX file is missing from content/posts/.
        </p>
      </div>
    );
  }

  const { frontmatter, readingMinutes } = post;
  const tags = frontmatter.tags ?? [];

  return (
    <div className="bg-[color:var(--color-bg)]">
      <article className="container-prose py-16 md:py-24">
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.16em] font-semibold text-[color:var(--color-ocean)] hover:opacity-80"
        >
          ← Back to home
        </Link>

        <header className="mt-6 mb-8">
          <p className="eyebrow">
            {SPRINT.id} · {SPRINT.title}
          </p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl leading-tight text-[color:var(--color-text)]">
            {frontmatter.title}
          </h1>
          {frontmatter.description ? (
            <p className="mt-4 text-lg leading-relaxed text-[color:var(--color-text-muted)]">
              {frontmatter.description}
            </p>
          ) : null}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[color:var(--color-text-muted)]">
            {frontmatter.date ? <span>{frontmatter.date}</span> : null}
            <span aria-hidden="true">·</span>
            <span>{readingMinutes} min read</span>
            {tags.length > 0 ? (
              <>
                <span aria-hidden="true">·</span>
                <span className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[color:var(--color-surface)] px-2 py-0.5 text-[10px] uppercase tracking-[0.12em]"
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              </>
            ) : null}
          </div>
        </header>

        <hr className="border-[color:var(--color-surface)] my-8" />

        <MDXRemote source={post.body} components={mdxComponents} />
      </article>
    </div>
  );
}