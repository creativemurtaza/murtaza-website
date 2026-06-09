import Link from "next/link";
import { ArrowRight, Briefcase, Palette, FileText } from "lucide-react";
import { profile, experience, projects, blogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default function Home() {
  const recentProjects = projects.slice(0, 3);
  const recentPosts = blogPosts.slice(0, 2);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      {/* Hero */}
      <section className="pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-neutral-400 mb-4 tracking-wide uppercase">
            Lahore, Pakistan
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-5">
            {profile.name}
          </h1>
          <p className="text-lg text-neutral-500 font-medium mb-6">
            {profile.headline}
          </p>
          <p className="text-base text-neutral-600 leading-relaxed max-w-xl mb-10">
            {profile.tagline}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/professional"
              className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 transition-colors"
            >
              View Profile
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/creative"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Creative Work
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-neutral-100" />

      {/* Quick links */}
      <section className="py-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: Briefcase,
            title: "Professional",
            description: "Experience, education, skills, and certifications.",
            href: "/professional",
          },
          {
            icon: Palette,
            title: "Creative Work",
            description: "Design, animation, development, and product projects.",
            href: "/creative",
          },
          {
            icon: FileText,
            title: "Blog",
            description: "Weekly learnings on product, business, and building.",
            href: "/blog",
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-xl border border-neutral-200 p-5 hover:border-neutral-300 hover:shadow-sm transition-all"
          >
            <item.icon size={20} className="text-neutral-400 mb-3 group-hover:text-neutral-600 transition-colors" />
            <h3 className="text-sm font-semibold text-neutral-900 mb-1">{item.title}</h3>
            <p className="text-sm text-neutral-500">{item.description}</p>
          </Link>
        ))}
      </section>

      <div className="border-t border-neutral-100" />

      {/* Recent experience */}
      <section className="py-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wide">
            Recent Experience
          </h2>
          <Link href="/professional" className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors flex items-center gap-1">
            All experience <ArrowRight size={12} />
          </Link>
        </div>
        <div className="space-y-5">
          {experience.slice(0, 3).map((job) => (
            <div key={job.id} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6">
              <span className="text-xs text-neutral-400 sm:w-36 sm:shrink-0 pt-0.5">{job.period}</span>
              <div>
                <p className="text-sm font-medium text-neutral-900">{job.role}</p>
                <p className="text-sm text-neutral-500">{job.company}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-neutral-100" />

      {/* Recent projects */}
      <section className="py-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wide">
            Selected Projects
          </h2>
          <Link href="/creative" className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors flex items-center gap-1">
            All work <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recentProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl border border-neutral-200 p-5 hover:border-neutral-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="inline-block rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600 capitalize">
                  {project.category}
                </span>
                <span className="text-xs text-neutral-400">{project.year}</span>
              </div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-1">{project.title}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">{project.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-neutral-100" />

      {/* Recent blog posts */}
      <section className="py-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wide">
            From the Blog
          </h2>
          <Link href="/blog" className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors flex items-center gap-1">
            All posts <ArrowRight size={12} />
          </Link>
        </div>
        <div className="space-y-5">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 hover:bg-neutral-50 -mx-2 px-2 py-2 rounded-lg transition-colors"
            >
              <span className="text-xs text-neutral-400 sm:w-36 sm:shrink-0 pt-0.5">
                {formatDate(post.date)}
              </span>
              <div>
                <p className="text-sm font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors">
                  {post.title}
                </p>
                <p className="text-sm text-neutral-500 mt-0.5">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="pb-8" />
    </div>
  );
}
