"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase";
import { FormField } from "@/components/admin/form-field";
import { PageHeader } from "@/components/admin/page-header";
export default function NewEducation() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ institution: "", degree: "", period: "", description: "" });
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    const supabase = createBrowserSupabase();
    await supabase.from("education").insert({ id: crypto.randomUUID(), ...form, sort_order: 0 });
    router.push("/admin/education");
  }
  return (
    <div style={{ padding: "32px", maxWidth: "600px" }}>
      <PageHeader title="Add Education" />
      <form onSubmit={handleSubmit}>
        <FormField label="Institution" value={form.institution} onChange={(v) => setForm({ ...form, institution: v })} required />
        <FormField label="Degree" value={form.degree} onChange={(v) => setForm({ ...form, degree: v })} required />
        <FormField label="Period" value={form.period} onChange={(v) => setForm({ ...form, period: v })} required />
        <FormField label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} type="textarea" rows={3} />
        <button type="submit" disabled={saving} style={{ padding: "10px 24px", fontSize: "14px", fontWeight: 500, background: "var(--ink)", color: "var(--bg)", border: "none", borderRadius: "9px", cursor: saving ? "wait" : "pointer", opacity: saving ? 0.7 : 1 }}>{saving ? "Saving..." : "Add Education"}</button>
      </form>
    </div>
  );
}
