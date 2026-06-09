import { experience, education, skills, projects, blogPosts, certifications } from "@/lib/data";
import { Briefcase, GraduationCap, Wrench, FolderOpen, FileText, Award } from "lucide-react";

const stats = [
  { label: "Experience", count: 5, icon: Briefcase, href: "/admin/experience" },
  { label: "Education", count: 2, icon: GraduationCap, href: "/admin/education" },
  { label: "Skills", count: Object.values(skills).flat().length, icon: Wrench, href: "/admin/skills" },
  { label: "Projects", count: projects.length, icon: FolderOpen, href: "/admin/projects" },
  { label: "Blog Posts", count: blogPosts.length, icon: FileText, href: "/admin/blog" },
  { label: "Certifications", count: certifications.length, icon: Award, href: "/admin/certifications" },
];

export default function AdminPage() {
  return (
    <div className="p-6 sm:p-10 max-w-4xl">
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 mb-1">Dashboard</h1>
        <p className="text-sm text-neutral-500">
          Manage all website content from one place. No coding required.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            className="rounded-xl border border-neutral-200 bg-white p-5 hover:border-neutral-300 hover:shadow-sm transition-all group"
          >
            <stat.icon size={18} className="text-neutral-400 mb-3 group-hover:text-neutral-600 transition-colors" />
            <p className="text-2xl font-bold text-neutral-900 mb-0.5">{stat.count}</p>
            <p className="text-xs text-neutral-500">{stat.label}</p>
          </a>
        ))}
      </div>

      {/* Quick actions */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-neutral-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="/admin/blog/new"
            className="flex items-center gap-3 rounded-lg border border-dashed border-neutral-300 px-4 py-3 text-sm text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <FileText size={15} />
            Write new blog post
          </a>
          <a
            href="/admin/projects/new"
            className="flex items-center gap-3 rounded-lg border border-dashed border-neutral-300 px-4 py-3 text-sm text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <FolderOpen size={15} />
            Add new project
          </a>
          <a
            href="/admin/experience/new"
            className="flex items-center gap-3 rounded-lg border border-dashed border-neutral-300 px-4 py-3 text-sm text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <Briefcase size={15} />
            Add experience entry
          </a>
          <a
            href="/resume"
            className="flex items-center gap-3 rounded-lg border border-dashed border-neutral-300 px-4 py-3 text-sm text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <Award size={15} />
            Preview resume
          </a>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-amber-100 bg-amber-50 p-5">
        <p className="text-sm font-medium text-amber-800 mb-1">Supabase Integration Pending</p>
        <p className="text-xs text-amber-700 leading-relaxed">
          Content is currently served from static data files. Once Supabase is connected via environment
          variables, all content will be editable from this dashboard without touching code.
          Add <code className="font-mono bg-amber-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="font-mono bg-amber-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to your{" "}
          <code className="font-mono bg-amber-100 px-1 rounded">.env.local</code> to enable live editing.
        </p>
      </div>
    </div>
  );
}
