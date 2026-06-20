"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createBrowserSupabase } from "@/lib/supabase";
import { PageHeader } from "./page-header";
import { DeleteDialog } from "./delete-dialog";
import { Pencil, Trash2 } from "lucide-react";

interface Column {
  key: string;
  label: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface AdminListProps {
  table: string;
  title: string;
  description?: string;
  columns: Column[];
  basePath: string;
  orderBy?: string;
  nameKey?: string;
}

export function AdminList({ table, title, description, columns, basePath, orderBy = "sort_order", nameKey = "id" }: AdminListProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Record<string, unknown> | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    const supabase = createBrowserSupabase();
    const { data } = await supabase.from(table).select("*").order(orderBy, { ascending: true });
    setItems(data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    const supabase = createBrowserSupabase();
    await supabase.from(table).delete().eq("id", deleteTarget.id);
    setDeleteTarget(null);
    setDeleting(false);
    load();
  }

  if (loading) return <div style={{ padding: "40px" }}>Loading...</div>;

  return (
    <div style={{ padding: "32px", maxWidth: "800px" }}>
      <PageHeader title={title} description={description} addHref={`${basePath}/new`} />

      {items.length === 0 ? (
        <p style={{ fontSize: "14px", color: "var(--ink-3)", padding: "40px 0", textAlign: "center" }}>No entries yet.</p>
      ) : (
        <div style={{ border: "1px solid var(--line)", borderRadius: "12px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--line)", background: "var(--surface)" }}>
                {columns.map((col) => (
                  <th key={col.key} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 500, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink-3)" }}>
                    {col.label}
                  </th>
                ))}
                <th style={{ padding: "10px 14px", width: "80px" }} />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id as string} style={{ borderBottom: "1px solid var(--line-soft)" }}>
                  {columns.map((col) => (
                    <td key={col.key} style={{ padding: "12px 14px", color: "var(--ink-2)" }}>
                      {col.render ? col.render(item[col.key], item) : String(item[col.key] || "—")}
                    </td>
                  ))}
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <Link href={`${basePath}/${item.id}/edit`} style={{ padding: "6px", borderRadius: "6px", color: "var(--ink-3)" }}>
                        <Pencil size={14} />
                      </Link>
                      <button onClick={() => setDeleteTarget(item)} style={{ padding: "6px", borderRadius: "6px", color: "var(--ink-3)", background: "none", border: "none", cursor: "pointer" }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <DeleteDialog
        open={!!deleteTarget}
        title={String(deleteTarget?.[nameKey] || "")}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
