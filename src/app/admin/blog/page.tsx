"use client";
import { AdminList } from "@/components/admin/admin-list";
export default function BlogList() {
  return (
    <AdminList table="blog_posts" title="Blog Posts" description="Manage blog posts." basePath="/admin/blog" nameKey="title" orderBy="published_at"
      columns={[
        { key: "title", label: "Title", render: (v) => <strong>{String(v)}</strong> },
        { key: "is_published", label: "Status", render: (v) => (
          <span style={{ fontSize: "12px", padding: "3px 8px", borderRadius: "6px", background: v ? "#dcfce7" : "#f3f4f6", color: v ? "#166534" : "#6b7280" }}>
            {v ? "Published" : "Draft"}
          </span>
        )},
        { key: "published_at", label: "Date", render: (v) => v ? new Date(String(v)).toLocaleDateString() : "—" },
      ]}
    />
  );
}
