"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase";
import { FormField, SelectField, TagField } from "@/components/admin/form-field";
import { ImageUpload } from "@/components/admin/image-upload";
import { PageHeader } from "@/components/admin/page-header";
export default function NewProject() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", category: "", description: "", tags: [] as string[], status: "", year: "", image_url: "" });
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    const supabase = createBrowserSupabase();
    await supabase.from("projects").insert({ id: crypto.randomUUID(), ...form, image_url: form.image_url || null, sort_order: 0 });
    router.push("/admin/projects");
  }
  return (
    <div style={{ padding: "32px", maxWidth: "600px" }}>
      <PageHeader title="Add Project" />
      <form onSubmit={handleSubmit}>
        <FormField label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
        <SelectField label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} required
          options={[{ value: "product", label: "Product" }, { value: "development", label: "Development" }, { value: "animation", label: "Animation" }, { value: "design", label: "Design" }]} />
        <FormField label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} type="textarea" rows={4} />
        <FormField label="Status" value={form.status} onChange={(v) => setForm({ ...form, status: v })} placeholder="e.g. Shipped, Delivered, Case Study" />
        <FormField label="Year" value={form.year} onChange={(v) => setForm({ ...form, year: v })} />
        <TagField label="Tags" value={form.tags} onChange={(v) => setForm({ ...form, tags: v })} />
        <ImageUpload label="Project Image" value={form.image_url || null} onChange={(url) => setForm({ ...form, image_url: url })} />
        <button type="submit" disabled={saving} style={{ padding: "10px 24px", fontSize: "14px", fontWeight: 500, background: "var(--ink)", color: "var(--bg)", border: "none", borderRadius: "9px", cursor: saving ? "wait" : "pointer", opacity: saving ? 0.7 : 1 }}>{saving ? "Saving..." : "Add Project"}</button>
      </form>
    </div>
  );
}
