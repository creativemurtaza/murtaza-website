"use client";

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "textarea" | "email" | "password" | "url";
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

export function FormField({ label, value, onChange, type = "text", placeholder, required, rows = 3 }: FormFieldProps) {
  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 12px", fontSize: "14px",
    border: "1px solid var(--line)", borderRadius: "9px",
    background: "#fff", outline: "none", fontFamily: "inherit",
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--ink-2)", marginBottom: "6px" }}>
        {label} {required && <span style={{ color: "#dc2626" }}>*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={rows}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          style={inputStyle}
        />
      )}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}

export function SelectField({ label, value, onChange, options, required }: SelectFieldProps) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--ink-2)", marginBottom: "6px" }}>
        {label} {required && <span style={{ color: "#dc2626" }}>*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        style={{
          width: "100%", padding: "10px 12px", fontSize: "14px",
          border: "1px solid var(--line)", borderRadius: "9px",
          background: "#fff", outline: "none",
        }}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

interface TagFieldProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function TagField({ label, value, onChange, placeholder = "Add tags (comma separated)" }: TagFieldProps) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--ink-2)", marginBottom: "6px" }}>
        {label}
      </label>
      <input
        type="text"
        value={value.join(", ")}
        onChange={(e) => onChange(e.target.value.split(",").map((t) => t.trim()).filter(Boolean))}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "10px 12px", fontSize: "14px",
          border: "1px solid var(--line)", borderRadius: "9px",
          background: "#fff", outline: "none",
        }}
      />
      {value.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
          {value.map((tag) => (
            <span key={tag} style={{
              fontSize: "12px", padding: "4px 10px", borderRadius: "6px",
              background: "var(--surface)", border: "1px solid var(--line)", color: "var(--ink-2)",
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
