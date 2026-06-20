"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase";
import { FormField } from "@/components/admin/form-field";
import { PageHeader } from "@/components/admin/page-header";
export default function EditEducation() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ institution: "", degree: "", period: "", description: "", sort_order: 0 });
  useEffect(() => {
    const supabase = createBrowserSupabase();
    supabase.from("education").select("*").eq("id", id).single().then(({ data }) => {
      if (data) setForm({ institution: data.institution, degree: data.degree, period: data.period, description: data.description || "", sort_order: data.sort_order || 0 });
      setLoading(false);
    });
  }, [id]);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    const supabase = createBrowserSupabase();
    await supabase.from("education").update(form).eq("id", id);
    router.push("/admin/education");
  }
  if (loading) return <div style={{ padding: "40px" }}>Loading...</div>;
  return (
    <div style={{ padding: "32px", maxWidth: "600px" }}>
      <PageHeader title="Edit Education" />
      <form onSubmit={handleSubmit}>
        <FormField label="Institution" value={form.institution} onChange={(v) => setForm({ ...form, institution: v })} required />
        <FormField label="Degree" value={form.degree} onChange={(v) => setForm({ ...form, degree: v })} required />
        <FormField label="Period" value={form.period} onChange={(v) => setForm({ ...form, period: v })} required />
        <FormField label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} type="textarea" rows={3} />
        <FormField label="Sort Order" value={String(form.sort_order)} onChange={(v) => setForm({ ...form, sort_order: Number(v) || 0 })} />
        <button type="submit" disabled={saving} style={{ padding: "10px 24px", fontSize: "14px", fontWeight: 500, background: "var(--ink)", color: "var(--bg)", border: "none", borderRadius: "9px", cursor: saving ? "wait" : "pointer", opacity: saving ? 0.7 : 1 }}>{saving ? "Saving..." : "Update"}</button>
      </form>
    </div>
  );
}
