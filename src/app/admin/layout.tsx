import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, Briefcase, GraduationCap, Wrench, FolderOpen, FileText, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin",
  description: "Content management dashboard",
};

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
  { href: "/admin/skills", label: "Skills", icon: Wrench },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/certifications", label: "Certifications", icon: Award },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-white border-r border-neutral-200 shrink-0">
        <div className="p-4 border-b border-neutral-200">
          <Link href="/" className="text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition-colors">
            ← Back to Site
          </Link>
          <p className="text-xs text-neutral-400 mt-1">Admin Dashboard</p>
        </div>
        <nav className="p-3 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors mb-0.5"
            >
              <item.icon size={15} />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
