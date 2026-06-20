"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase";
import { FormField } from "@/components/admin/form-field";
import { PageHeader } from "@/components/admin/page-header";
export default function EditCertification() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", issuer: "", year: "", sort_order: 0 });
  useEffect(() => {
    const supabase = createBrowserSupabase();
    supabase.from("certifications").select("*").eq("id", id).single().then(({ data }) => {
      if (data) setForm({ name: data.name, issuer: data.issuer, year: data.year || "", sort_order: data.sort_order || 0 });
      setLoading(false);
    });
  }, [id]);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    const supabase = createBrowserSupabase();
    await supabase.from("certifications").update(form).eq("id", id);
    router.push("/admin/certifications");
  }
  if (loading) return <div style={{ padding: "40px" }}>Loading...</div>;
  return (
    <div style={{ padding: "32px", maxWidth: "600px" }}>
      <PageHeader title="Edit Certification" />
      <form onSubmit={handleSubmit}>
        <FormField label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
        <FormField label="Issuer" value={form.issuer} onChange={(v) => setForm({ ...form, issuer: v })} required />
        <FormField label="Year" value={form.year} onChange={(v) => setForm({ ...form, year: v })} />
        <FormField label="Sort Order" value={String(form.sort_order)} onChange={(v) => setForm({ ...form, sort_order: Number(v) || 0 })} />
        <button type="submit" disabled={saving} style={{ padding: "10px 24px", fontSize: "14px", fontWeight: 500, background: "var(--ink)", color: "var(--bg)", border: "none", borderRadius: "9px", cursor: saving ? "wait" : "pointer", opacity: saving ? 0.7 : 1 }}>{saving ? "Saving..." : "Update"}</button>
      </form>
    </div>
  );
}
