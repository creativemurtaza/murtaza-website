"use client";
import { AdminList } from "@/components/admin/admin-list";
export default function CertificationsList() {
  return (
    <AdminList table="certifications" title="Certifications" description="Manage certifications." basePath="/admin/certifications" nameKey="name"
      columns={[
        { key: "name", label: "Name", render: (v) => <strong>{String(v)}</strong> },
        { key: "issuer", label: "Issuer" },
        { key: "year", label: "Year" },
      ]}
    />
  );
}
