"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase";
import { FormField, TagField } from "@/components/admin/form-field";
import { PageHeader } from "@/components/admin/page-header";
export default function EditBlogPost() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", tags: [] as string[], read_time: "", is_published: false });
  useEffect(() => {
    const supabase = createBrowserSupabase();
    supabase.from("blog_posts").select("*").eq("id", id).single().then(({ data }) => {
      if (data) setForm({ title: data.title, slug: data.slug, excerpt: data.excerpt || "", content: data.content || "", tags: data.tags || [], read_time: data.read_time || "", is_published: data.is_published || false });
      setLoading(false);
    });
  }, [id]);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    const supabase = createBrowserSupabase();
    await supabase.from("blog_posts").update({
      ...form,
      published_at: form.is_published ? new Date().toISOString().split("T")[0] : null,
      updated_at: new Date().toISOString(),
    }).eq("id", id);
    router.push("/admin/blog");
  }
  if (loading) return <div style={{ padding: "40px" }}>Loading...</div>;
  return (
    <div style={{ padding: "32px", maxWidth: "700px" }}>
      <PageHeader title="Edit Blog Post" />
      <form onSubmit={handleSubmit}>
        <FormField label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
        <FormField label="Slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} required />
        <FormField label="Excerpt" value={form.excerpt} onChange={(v) => setForm({ ...form, excerpt: v })} type="textarea" rows={2} />
        <FormField label="Content (Markdown)" value={form.content} onChange={(v) => setForm({ ...form, content: v })} type="textarea" rows={16} />
        <TagField label="Tags" value={form.tags} onChange={(v) => setForm({ ...form, tags: v })} />
        <FormField label="Read Time" value={form.read_time} onChange={(v) => setForm({ ...form, read_time: v })} />
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", cursor: "pointer" }}>
            <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
            Published
          </label>
        </div>
        <button type="submit" disabled={saving} style={{ padding: "10px 24px", fontSize: "14px", fontWeight: 500, background: "var(--ink)", color: "var(--bg)", border: "none", borderRadius: "9px", cursor: saving ? "wait" : "pointer", opacity: saving ? 0.7 : 1 }}>{saving ? "Saving..." : "Update Post"}</button>
      </form>
    </div>
  );
}
