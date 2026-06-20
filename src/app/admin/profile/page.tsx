"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase";
import { FormField } from "@/components/admin/form-field";
import { ImageUpload } from "@/components/admin/image-upload";
import { PageHeader } from "@/components/admin/page-header";

export default function ProfileAdmin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    name: "", headline: "", tagline: "", email: "", location: "", phone: "",
    avatar_url: "", about_text: "", linkedin: "", instagram: "",
  });

  useEffect(() => {
    const supabase = createBrowserSupabase();
    supabase.from("profile").select("*").eq("id", "main").single().then(({ data }) => {
      if (data) {
        setForm({
          name: data.name || "",
          headline: data.headline || "",
          tagline: data.tagline || "",
          email: data.email || "",
          location: data.location || "",
          phone: data.phone || "",
          avatar_url: data.avatar_url || "",
          about_text: (data.about || []).join("\n\n"),
          linkedin: data.social?.linkedin || "",
          instagram: data.social?.instagram || "",
        });
      }
      setLoading(false);
    });
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg("");

    const supabase = createBrowserSupabase();
    const { error } = await supabase.from("profile").upsert({
      id: "main",
      name: form.name,
      headline: form.headline,
      tagline: form.tagline,
      email: form.email,
      location: form.location,
      phone: form.phone,
      avatar_url: form.avatar_url || null,
      about: form.about_text.split("\n\n").filter(Boolean),
      social: { linkedin: form.linkedin, instagram: form.instagram },
      updated_at: new Date().toISOString(),
    });

    setSaving(false);
    setMsg(error ? `Error: ${error.message}` : "Profile saved!");
    setTimeout(() => setMsg(""), 3000);
  }

  if (loading) return <div style={{ padding: "40px" }}>Loading...</div>;

  return (
    <div style={{ padding: "32px", maxWidth: "600px" }}>
      <PageHeader title="Profile" description="Edit your personal information, bio, and avatar." />

      <form onSubmit={handleSave}>
        <ImageUpload label="Avatar" value={form.avatar_url || null} onChange={(url) => setForm({ ...form, avatar_url: url })} />
        <FormField label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
        <FormField label="Headline" value={form.headline} onChange={(v) => setForm({ ...form, headline: v })} placeholder="e.g. Product Builder • Designer" />
        <FormField label="Tagline" value={form.tagline} onChange={(v) => setForm({ ...form, tagline: v })} placeholder="One-line summary" />
        <FormField label="About (separate paragraphs with blank lines)" value={form.about_text} onChange={(v) => setForm({ ...form, about_text: v })} type="textarea" rows={8} />
        <FormField label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} type="email" />
        <FormField label="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} />
        <FormField label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <FormField label="LinkedIn URL" value={form.linkedin} onChange={(v) => setForm({ ...form, linkedin: v })} type="url" />
        <FormField label="Instagram URL" value={form.instagram} onChange={(v) => setForm({ ...form, instagram: v })} type="url" />

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
          <button type="submit" disabled={saving} style={{
            padding: "10px 24px", fontSize: "14px", fontWeight: 500,
            background: "var(--ink)", color: "var(--bg)", border: "none",
            borderRadius: "9px", cursor: saving ? "wait" : "pointer",
            opacity: saving ? 0.7 : 1,
          }}>
            {saving ? "Saving..." : "Save Profile"}
          </button>
          {msg && <span style={{ fontSize: "13px", color: msg.startsWith("Error") ? "#dc2626" : "#16a34a" }}>{msg}</span>}
        </div>
      </form>
    </div>
  );
}
