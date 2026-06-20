"use client";

interface DeleteDialogProps {
  open: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function DeleteDialog({ open, title, onConfirm, onCancel, loading }: DeleteDialogProps) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        display: "grid", placeItems: "center",
        background: "oklch(0 0 0 / 0.3)", backdropFilter: "blur(2px)",
      }}
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: "14px",
          padding: "24px", maxWidth: "380px", width: "90%",
          boxShadow: "0 16px 48px -12px oklch(0 0 0 / 0.2)",
        }}
      >
        <h3 style={{ margin: "0 0 8px", fontSize: "16px", fontWeight: 600 }}>Delete Entry</h3>
        <p style={{ margin: "0 0 20px", fontSize: "14px", color: "var(--ink-2)" }}>
          Are you sure you want to delete <strong>{title}</strong>? This cannot be undone.
        </p>
        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
          <button
            onClick={onCancel}
            style={{
              padding: "8px 16px", fontSize: "13px", fontWeight: 500,
              border: "1px solid var(--line)", borderRadius: "8px",
              background: "#fff", cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            style={{
              padding: "8px 16px", fontSize: "13px", fontWeight: 500,
              border: "none", borderRadius: "8px",
              background: "#dc2626", color: "#fff",
              cursor: loading ? "wait" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
