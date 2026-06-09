import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  // Simple markdown-to-html conversion (paragraphs, headers, bold)
  const renderContent = (content: string) => {
    const lines = content.split("\n").filter((l) => l.trim());
    return lines.map((line, i) => {
      if (line.startsWith("# ")) {
        return <h1 key={i}>{line.slice(2)}</h1>;
      }
      if (line.startsWith("## ")) {
        return <h2 key={i}>{line.slice(3)}</h2>;
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        return <p key={i}><strong>{line.slice(2, -2)}</strong></p>;
      }
      // Handle inline bold
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i}>
          {parts.map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={j}>{part.slice(2, -2)}</strong>
            ) : (
              part
            )
          )}
        </p>
      );
    });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16 sm:py-24">
      {/* Back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-700 transition-colors mb-10"
      >
        <ArrowLeft size={14} />
        All posts
      </Link>

      {/* Meta */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-500"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-3">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-xs text-neutral-400">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
      </div>

      <div className="border-t border-neutral-100 mb-10" />

      {/* Content */}
      <article className="prose">{renderContent(post.content)}</article>

      <div className="border-t border-neutral-100 mt-14 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-700 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to blog
        </Link>
      </div>
    </div>
  );
}
