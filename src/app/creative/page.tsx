"use client";

import { useState } from "react";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

const categories = ["all", "product", "development", "animation", "design"] as const;
type Category = (typeof categories)[number];

const categoryLabels: Record<Category, string> = {
  all: "All Work",
  product: "Product",
  development: "Development",
  animation: "Animation",
  design: "Design",
};

export default function CreativePage() {
  const [active, setActive] = useState<Category>("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-4">
          Creative Work
        </h1>
        <p className="text-base text-neutral-500 max-w-xl leading-relaxed">
          A selection of projects across product design, software development, animation, and branding.
          Each project represents a problem I found worth solving.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              active === cat
                ? "bg-neutral-900 text-white"
                : "border border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:text-neutral-900"
            )}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project) => (
          <div
            key={project.id}
            className="group rounded-xl border border-neutral-200 p-6 hover:border-neutral-300 hover:shadow-sm transition-all cursor-default"
          >
            {/* Top row */}
            <div className="flex items-start justify-between mb-4">
              <span className="inline-block rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600 capitalize">
                {project.category}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400">{project.year}</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium",
                    project.status === "Shipped"
                      ? "bg-green-50 text-green-700"
                      : project.status === "Delivered"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-neutral-100 text-neutral-600"
                  )}
                >
                  {project.status}
                </span>
              </div>
            </div>

            {/* Content */}
            <h3 className="text-base font-semibold text-neutral-900 mb-2 group-hover:text-neutral-600 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed mb-4">{project.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs text-neutral-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-neutral-400 text-sm">
          No projects in this category yet.
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 border-t border-neutral-100 pt-12 text-center">
        <p className="text-sm text-neutral-500 mb-4">
          Want to collaborate or commission a project?
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 transition-colors"
        >
          Get in touch
        </a>
      </div>
    </div>
  );
}
