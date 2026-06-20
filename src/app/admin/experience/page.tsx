"use client";

import { AdminList } from "@/components/admin/admin-list";

export default function ExperienceList() {
  return (
    <AdminList
      table="experience"
      title="Experience"
      description="Manage work experience entries."
      basePath="/admin/experience"
      nameKey="company"
      columns={[
        { key: "role", label: "Role", render: (v) => <strong>{String(v)}</strong> },
        { key: "company", label: "Company" },
        { key: "period", label: "Period" },
      ]}
    />
  );
}
