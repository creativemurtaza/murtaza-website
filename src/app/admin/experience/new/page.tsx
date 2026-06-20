"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase";
import { FormField, TagField } from "@/components/admin/form-field";
import { PageHeader } from "@/components/admin/page-header";

export default function NewExperience() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ company: "", role: "", period: "", description: "", tags: [] as string[] });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createBrowserSupabase();
    const { error } = await supabase.from("experience").insert({
      id: crypto.randomUUID(),
      ...form,
      sort_order: 0,
    });
    if (!error) router.push("/admin/experience");
    setSaving(false);
  }

  return (
    <div style={{ padding: "32px", maxWidth: "600px" }}>
      <PageHeader title="Add Experience" />
      <form onSubmit={handleSubmit}>
        <FormField label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} required />
        <FormField label="Role / Title" value={form.role} onChange={(v) => setForm({ ...form, role: v })} required />
        <FormField label="Period" value={form.period} onChange={(v) => setForm({ ...form, period: v })} placeholder="e.g. Sep 2025 – Present" required />
        <FormField label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} type="textarea" rows={4} />
        <TagField label="Tags" value={form.tags} onChange={(v) => setForm({ ...form, tags: v })} />
        <button type="submit" disabled={saving} style={{
          padding: "10px 24px", fontSize: "14px", fontWeight: 500,
          background: "var(--ink)", color: "var(--bg)", border: "none",
          borderRadius: "9px", cursor: saving ? "wait" : "pointer", opacity: saving ? 0.7 : 1,
        }}>
          {saving ? "Saving..." : "Add Experience"}
        </button>
      </form>
    </div>
  );
}
