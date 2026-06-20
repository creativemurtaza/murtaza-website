"use client";
import { AdminList } from "@/components/admin/admin-list";
export default function EducationList() {
  return (
    <AdminList table="education" title="Education" description="Manage education entries." basePath="/admin/education" nameKey="institution"
      columns={[
        { key: "degree", label: "Degree", render: (v) => <strong>{String(v)}</strong> },
        { key: "institution", label: "Institution" },
        { key: "period", label: "Period" },
      ]}
    />
  );
}
