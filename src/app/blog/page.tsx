import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Weekly learning journal on product, business, AI, and building things.",
};

export default function BlogPage() {
  const allTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags)));

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
      {/* Header */}
      <div className="mb-14">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-4">
          Blog
        </h1>
        <p className="text-base text-neutral-500 max-w-xl leading-relaxed">
          A weekly learning journal. Topics include product, business, AI, design, development, and career reflections.
        </p>
      </div>

      {/* Posts */}
      <div className="divide-y divide-neutral-100">
        {blogPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8 py-7 hover:bg-neutral-50 -mx-2 px-2 rounded-lg transition-colors"
          >
            <div className="sm:w-36 shrink-0">
              <p className="text-xs text-neutral-400">{formatDate(post.date)}</p>
              <p className="text-xs text-neutral-400 mt-0.5">{post.readTime}</p>
            </div>
            <div className="flex-1">
              <h2 className="text-base font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors mb-1.5 flex items-center gap-2">
                {post.title}
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h2>
              <p className="text-sm text-neutral-500 leading-relaxed mb-3">{post.excerpt}</p>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {blogPosts.length === 0 && (
        <div className="text-center py-20 text-neutral-400 text-sm">
          No posts yet. Check back soon.
        </div>
      )}
    </div>
  );
}
