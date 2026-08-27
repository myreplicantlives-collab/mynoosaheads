// lib/posts.ts — MDX post loader and frontmatter parser.
// Uses gray-matter for frontmatter and reading-time for read estimates.
// Path alias: @/lib/posts → ./lib/posts

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostFrontmatter = {
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  body: string;
  readingMinutes: number;
};

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"))
    .map((name) => name.replace(/\.mdx?$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  for (const ext of ["mdx", "md"]) {
    const filePath = path.join(POSTS_DIR, `${slug}.${ext}`);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(raw);
      const rt = readingTime(content);
      return {
        slug,
        frontmatter: data as PostFrontmatter,
        body: content,
        readingMinutes: Math.max(1, Math.round(rt.minutes)),
      };
    }
  }
  return null;
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => {
      const ad = a.frontmatter.date ?? "";
      const bd = b.frontmatter.date ?? "";
      return bd.localeCompare(ad);
    });
}