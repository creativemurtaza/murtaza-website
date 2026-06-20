"use client";

import { useState, useRef } from "react";
import { createBrowserSupabase } from "@/lib/supabase";
import { Upload } from "lucide-react";

interface ImageUploadProps {
  label: string;
  value: string | null;
  onChange: (url: string) => void;
  bucket?: string;
}

export function ImageUpload({ label, value, onChange, bucket = "media" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const supabase = createBrowserSupabase();
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file, { cacheControl: "3600", upsert: true });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(path);
    onChange(publicUrl);
    setUploading(false);
  }

  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--ink-2)", marginBottom: "6px" }}>
        {label}
      </label>

      {value && (
        <div style={{ marginBottom: "10px" }}>
          <img
            src={value}
            alt="Preview"
            style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "12px", border: "1px solid var(--line)" }}
          />
        </div>
      )}

      <input ref={inputRef} type="file" accept="image/*" onChange={handleUpload} hidden />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          padding: "8px 14px", fontSize: "13px", fontWeight: 500,
          border: "1px solid var(--line)", borderRadius: "8px",
          background: "#fff", cursor: uploading ? "wait" : "pointer",
          color: "var(--ink-2)",
        }}
      >
        <Upload size={14} />
        {uploading ? "Uploading..." : "Choose Image"}
      </button>

      {error && (
        <p style={{ fontSize: "12px", color: "#dc2626", marginTop: "6px" }}>{error}</p>
      )}
    </div>
  );
}
