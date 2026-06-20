"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  addHref?: string;
  addLabel?: string;
}

export function PageHeader({ title, description, addHref, addLabel = "Add New" }: PageHeaderProps) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "32px" }}>
      <div>
        <h1 style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 4px" }}>{title}</h1>
        {description && <p style={{ fontSize: "14px", color: "var(--ink-3)", margin: 0 }}>{description}</p>}
      </div>
      {addHref && (
        <Link
          href={addHref}
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "8px 16px", fontSize: "13px", fontWeight: 500,
            background: "var(--ink)", color: "var(--bg)",
            borderRadius: "8px", whiteSpace: "nowrap",
          }}
        >
          <Plus size={14} />
          {addLabel}
        </Link>
      )}
    </div>
  );
}
