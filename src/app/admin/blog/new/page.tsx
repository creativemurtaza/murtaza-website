"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase";
import { FormField, TagField } from "@/components/admin/form-field";
import { PageHeader } from "@/components/admin/page-header";
export default function NewBlogPost() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", tags: [] as string[], read_time: "", is_published: false });
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    const supabase = createBrowserSupabase();
    await supabase.from("blog_posts").insert({
      id: crypto.randomUUID(),
      ...form,
      published_at: form.is_published ? new Date().toISOString().split("T")[0] : null,
    });
    router.push("/admin/blog");
  }
  return (
    <div style={{ padding: "32px", maxWidth: "700px" }}>
      <PageHeader title="New Blog Post" />
      <form onSubmit={handleSubmit}>
        <FormField label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v, slug: v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") })} required />
        <FormField label="Slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} placeholder="url-friendly-title" required />
        <FormField label="Excerpt" value={form.excerpt} onChange={(v) => setForm({ ...form, excerpt: v })} type="textarea" rows={2} />
        <FormField label="Content (Markdown)" value={form.content} onChange={(v) => setForm({ ...form, content: v })} type="textarea" rows={16} />
        <TagField label="Tags" value={form.tags} onChange={(v) => setForm({ ...form, tags: v })} />
        <FormField label="Read Time" value={form.read_time} onChange={(v) => setForm({ ...form, read_time: v })} placeholder="e.g. 5 min read" />
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", cursor: "pointer" }}>
            <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
            Publish immediately
          </label>
        </div>
        <button type="submit" disabled={saving} style={{ padding: "10px 24px", fontSize: "14px", fontWeight: 500, background: "var(--ink)", color: "var(--bg)", border: "none", borderRadius: "9px", cursor: saving ? "wait" : "pointer", opacity: saving ? 0.7 : 1 }}>{saving ? "Saving..." : "Create Post"}</button>
      </form>
    </div>
  );
}
