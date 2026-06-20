"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase";
import { FormField, TagField } from "@/components/admin/form-field";
import { PageHeader } from "@/components/admin/page-header";

export default function EditExperience() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ company: "", role: "", period: "", description: "", tags: [] as string[], sort_order: 0 });

  useEffect(() => {
    const supabase = createBrowserSupabase();
    supabase.from("experience").select("*").eq("id", id).single().then(({ data }) => {
      if (data) setForm({ company: data.company, role: data.role, period: data.period, description: data.description || "", tags: data.tags || [], sort_order: data.sort_order || 0 });
      setLoading(false);
    });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createBrowserSupabase();
    await supabase.from("experience").update(form).eq("id", id);
    router.push("/admin/experience");
  }

  if (loading) return <div style={{ padding: "40px" }}>Loading...</div>;

  return (
    <div style={{ padding: "32px", maxWidth: "600px" }}>
      <PageHeader title="Edit Experience" />
      <form onSubmit={handleSubmit}>
        <FormField label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} required />
        <FormField label="Role / Title" value={form.role} onChange={(v) => setForm({ ...form, role: v })} required />
        <FormField label="Period" value={form.period} onChange={(v) => setForm({ ...form, period: v })} required />
        <FormField label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} type="textarea" rows={4} />
        <TagField label="Tags" value={form.tags} onChange={(v) => setForm({ ...form, tags: v })} />
        <FormField label="Sort Order" value={String(form.sort_order)} onChange={(v) => setForm({ ...form, sort_order: Number(v) || 0 })} placeholder="0 = first" />
        <button type="submit" disabled={saving} style={{
          padding: "10px 24px", fontSize: "14px", fontWeight: 500,
          background: "var(--ink)", color: "var(--bg)", border: "none",
          borderRadius: "9px", cursor: saving ? "wait" : "pointer", opacity: saving ? 0.7 : 1,
        }}>
          {saving ? "Saving..." : "Update Experience"}
        </button>
      </form>
    </div>
  );
}
