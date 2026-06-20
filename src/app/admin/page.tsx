"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createBrowserSupabase } from "@/lib/supabase";
import { Briefcase, GraduationCap, Wrench, FolderOpen, FileText, Award, User } from "lucide-react";

const sections = [
  { label: "Profile", icon: User, href: "/admin/profile", table: "profile" },
  { label: "Experience", icon: Briefcase, href: "/admin/experience", table: "experience" },
  { label: "Education", icon: GraduationCap, href: "/admin/education", table: "education" },
  { label: "Skills", icon: Wrench, href: "/admin/skills", table: "skills" },
  { label: "Projects", icon: FolderOpen, href: "/admin/projects", table: "projects" },
  { label: "Blog Posts", icon: FileText, href: "/admin/blog", table: "blog_posts" },
  { label: "Certifications", icon: Award, href: "/admin/certifications", table: "certifications" },
];

export default function AdminPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const supabase = createBrowserSupabase();
    Promise.all(
      sections.map(async (s) => {
        const { count } = await supabase.from(s.table).select("*", { count: "exact", head: true });
        return [s.table, count || 0] as [string, number];
      })
    ).then((results) => setCounts(Object.fromEntries(results)));
  }, []);

  return (
    <div style={{ padding: "32px", maxWidth: "700px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 4px" }}>Dashboard</h1>
        <p style={{ fontSize: "14px", color: "var(--ink-3)", margin: 0 }}>Manage all website content from one place.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "12px" }}>
        {sections.map((s) => (
          <Link key={s.href} href={s.href} style={{
            display: "block", padding: "20px", borderRadius: "12px",
            border: "1px solid var(--line)", background: "#fff",
          }}>
            <s.icon size={18} style={{ color: "var(--ink-4)", marginBottom: "12px" }} />
            <p style={{ fontSize: "24px", fontWeight: 700, margin: "0 0 2px" }}>{counts[s.table] ?? "—"}</p>
            <p style={{ fontSize: "13px", color: "var(--ink-3)", margin: 0 }}>{s.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
