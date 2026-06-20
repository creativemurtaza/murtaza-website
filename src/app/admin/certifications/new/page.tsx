"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase";
import { FormField } from "@/components/admin/form-field";
import { PageHeader } from "@/components/admin/page-header";
export default function NewCertification() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", issuer: "", year: "" });
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    const supabase = createBrowserSupabase();
    await supabase.from("certifications").insert({ id: crypto.randomUUID(), ...form, sort_order: 0 });
    router.push("/admin/certifications");
  }
  return (
    <div style={{ padding: "32px", maxWidth: "600px" }}>
      <PageHeader title="Add Certification" />
      <form onSubmit={handleSubmit}>
        <FormField label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
        <FormField label="Issuer" value={form.issuer} onChange={(v) => setForm({ ...form, issuer: v })} required />
        <FormField label="Year" value={form.year} onChange={(v) => setForm({ ...form, year: v })} />
        <button type="submit" disabled={saving} style={{ padding: "10px 24px", fontSize: "14px", fontWeight: 500, background: "var(--ink)", color: "var(--bg)", border: "none", borderRadius: "9px", cursor: saving ? "wait" : "pointer", opacity: saving ? 0.7 : 1 }}>{saving ? "Saving..." : "Add Certification"}</button>
      </form>
    </div>
  );
}
