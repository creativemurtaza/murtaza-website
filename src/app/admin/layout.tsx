"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase";
import { LayoutDashboard, User, Briefcase, GraduationCap, Wrench, FolderOpen, FileText, Award, LogOut } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/profile", label: "Profile", icon: User },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
  { href: "/admin/skills", label: "Skills", icon: Wrench },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/certifications", label: "Certifications", icon: Award },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  async function handleSignOut() {
    const supabase = createBrowserSupabase();
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  }

  const isActive = (item: typeof navItems[0]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--surface)" }}>
      {/* Sidebar */}
      <aside style={{
        width: "220px", background: "#fff", borderRight: "1px solid var(--line)",
        display: "flex", flexDirection: "column", flexShrink: 0,
      }}>
        <div style={{ padding: "16px", borderBottom: "1px solid var(--line)" }}>
          <Link href="/" style={{ fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>
            ← Back to Site
          </Link>
          <p style={{ fontSize: "12px", color: "var(--ink-4)", marginTop: "4px" }}>Admin Dashboard</p>
        </div>
        <nav style={{ padding: "12px", flex: 1 }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                borderRadius: "8px", padding: "8px 12px", marginBottom: "2px",
                fontSize: "13px", fontWeight: isActive(item) ? 500 : 400,
                color: isActive(item) ? "var(--ink)" : "var(--ink-3)",
                background: isActive(item) ? "var(--surface)" : "transparent",
              }}
            >
              <item.icon size={15} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: "12px", borderTop: "1px solid var(--line)" }}>
          <button
            onClick={handleSignOut}
            style={{
              display: "flex", alignItems: "center", gap: "10px", width: "100%",
              borderRadius: "8px", padding: "8px 12px",
              fontSize: "13px", color: "var(--ink-4)",
              background: "none", border: "none", cursor: "pointer",
            }}
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {children}
      </div>
    </div>
  );
}
