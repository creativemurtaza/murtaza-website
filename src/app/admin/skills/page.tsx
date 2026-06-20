"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase";
import { PageHeader } from "@/components/admin/page-header";
import { Trash2 } from "lucide-react";

const CATEGORIES = ["business", "design", "technology", "tools"] as const;

interface Skill { id: number; name: string; category: string; sort_order: number }

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<string>("business");
  const [saving, setSaving] = useState(false);

  async function load() {
    const supabase = createBrowserSupabase();
    const { data } = await supabase.from("skills").select("*").order("category").order("sort_order");
    setSkills(data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    const supabase = createBrowserSupabase();
    await supabase.from("skills").insert({ name: name.trim(), category, sort_order: 0 });
    setName("");
    setSaving(false);
    load();
  }

  async function handleDelete(id: number) {
    const supabase = createBrowserSupabase();
    await supabase.from("skills").delete().eq("id", id);
    load();
  }

  if (loading) return <div style={{ padding: "40px" }}>Loading...</div>;

  return (
    <div style={{ padding: "32px", maxWidth: "600px" }}>
      <PageHeader title="Skills" description="Add or remove skills by category." />

      {/* Add form */}
      <form onSubmit={handleAdd} style={{ display: "flex", gap: "8px", marginBottom: "32px", flexWrap: "wrap" }}>
        <input
          value={name} onChange={(e) => setName(e.target.value)} placeholder="Skill name"
          style={{ flex: 1, minWidth: "160px", padding: "10px 12px", fontSize: "14px", border: "1px solid var(--line)", borderRadius: "9px", outline: "none" }}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "10px 12px", fontSize: "14px", border: "1px solid var(--line)", borderRadius: "9px", background: "#fff" }}>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
        </select>
        <button type="submit" disabled={saving} style={{
          padding: "10px 16px", fontSize: "13px", fontWeight: 500,
          background: "var(--ink)", color: "var(--bg)", border: "none", borderRadius: "9px", cursor: "pointer",
        }}>
          Add
        </button>
      </form>

      {/* Skills by category */}
      {CATEGORIES.map((cat) => {
        const catSkills = skills.filter((s) => s.category === cat);
        if (catSkills.length === 0) return null;
        return (
          <div key={cat} style={{ marginBottom: "28px" }}>
            <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--ink-4)", marginBottom: "10px", fontWeight: 600 }}>
              {cat}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {catSkills.map((skill) => (
                <span key={skill.id} style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  fontSize: "13px", padding: "6px 12px", borderRadius: "8px",
                  border: "1px solid var(--line)", background: "#fff", color: "var(--ink-2)",
                }}>
                  {skill.name}
                  <button onClick={() => handleDelete(skill.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", color: "var(--ink-4)" }}>
                    <Trash2 size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        );
      })}

      {skills.length === 0 && <p style={{ fontSize: "14px", color: "var(--ink-3)" }}>No skills yet. Add some above.</p>}
    </div>
  );
}
