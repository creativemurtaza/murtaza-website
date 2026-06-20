"use client";
import { AdminList } from "@/components/admin/admin-list";
export default function ProjectsList() {
  return (
    <AdminList table="projects" title="Projects" description="Manage portfolio projects." basePath="/admin/projects" nameKey="title"
      columns={[
        { key: "title", label: "Title", render: (v) => <strong>{String(v)}</strong> },
        { key: "category", label: "Category" },
        { key: "status", label: "Status" },
        { key: "year", label: "Year" },
      ]}
    />
  );
}
