"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createBrowserSupabase();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "var(--bg)" }}>
      <div style={{ width: "100%", maxWidth: "380px", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "10px",
            background: "var(--ink)", color: "var(--bg)",
            display: "inline-grid", placeItems: "center",
            fontSize: "14px", fontWeight: 600, marginBottom: "16px"
          }}>
            GM
          </div>
          <h1 style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 6px" }}>
            Admin Login
          </h1>
          <p style={{ fontSize: "14px", color: "var(--ink-3)", margin: 0 }}>
            Sign in to manage your website content.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--ink-2)", marginBottom: "6px" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%", padding: "10px 12px", fontSize: "14px",
                border: "1px solid var(--line)", borderRadius: "9px",
                background: "#fff", outline: "none",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--ink-2)", marginBottom: "6px" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%", padding: "10px 12px", fontSize: "14px",
                border: "1px solid var(--line)", borderRadius: "9px",
                background: "#fff", outline: "none",
              }}
            />
          </div>

          {error && (
            <div style={{
              fontSize: "13px", color: "#dc2626", padding: "10px 12px",
              borderRadius: "9px", background: "#fef2f2", marginBottom: "16px",
              border: "1px solid #fecaca"
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "10px", fontSize: "14px", fontWeight: 500,
              background: "var(--ink)", color: "var(--bg)",
              border: "none", borderRadius: "9px", cursor: loading ? "wait" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
