"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase";
import { FormField, SelectField, TagField } from "@/components/admin/form-field";
import { ImageUpload } from "@/components/admin/image-upload";
import { PageHeader } from "@/components/admin/page-header";
export default function EditProject() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", category: "", description: "", tags: [] as string[], status: "", year: "", image_url: "", sort_order: 0 });
  useEffect(() => {
    const supabase = createBrowserSupabase();
    supabase.from("projects").select("*").eq("id", id).single().then(({ data }) => {
      if (data) setForm({ title: data.title, category: data.category, description: data.description || "", tags: data.tags || [], status: data.status || "", year: data.year || "", image_url: data.image_url || "", sort_order: data.sort_order || 0 });
      setLoading(false);
    });
  }, [id]);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    const supabase = createBrowserSupabase();
    await supabase.from("projects").update({ ...form, image_url: form.image_url || null }).eq("id", id);
    router.push("/admin/projects");
  }
  if (loading) return <div style={{ padding: "40px" }}>Loading...</div>;
  return (
    <div style={{ padding: "32px", maxWidth: "600px" }}>
      <PageHeader title="Edit Project" />
      <form onSubmit={handleSubmit}>
        <FormField label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
        <SelectField label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} required
          options={[{ value: "product", label: "Product" }, { value: "development", label: "Development" }, { value: "animation", label: "Animation" }, { value: "design", label: "Design" }]} />
        <FormField label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} type="textarea" rows={4} />
        <FormField label="Status" value={form.status} onChange={(v) => setForm({ ...form, status: v })} />
        <FormField label="Year" value={form.year} onChange={(v) => setForm({ ...form, year: v })} />
        <TagField label="Tags" value={form.tags} onChange={(v) => setForm({ ...form, tags: v })} />
        <ImageUpload label="Project Image" value={form.image_url || null} onChange={(url) => setForm({ ...form, image_url: url })} />
        <FormField label="Sort Order" value={String(form.sort_order)} onChange={(v) => setForm({ ...form, sort_order: Number(v) || 0 })} />
        <button type="submit" disabled={saving} style={{ padding: "10px 24px", fontSize: "14px", fontWeight: 500, background: "var(--ink)", color: "var(--bg)", border: "none", borderRadius: "9px", cursor: saving ? "wait" : "pointer", opacity: saving ? 0.7 : 1 }}>{saving ? "Saving..." : "Update"}</button>
      </form>
    </div>
  );
}
