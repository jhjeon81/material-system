import { useState, useEffect, useRef } from "react";

export default function MultiSelect({ label, options, selected, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggle = (val) => {
    if (selected.includes(val)) onChange(selected.filter(v => v !== val));
    else onChange([...selected, val]);
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center", gap: "6px",
        padding: "6px 12px", borderRadius: "var(--radius-sm)",
        border: `1px solid ${selected.length > 0 ? "var(--accent)" : "var(--line)"}`,
        background: selected.length > 0 ? "var(--info-bg)" : "var(--bg-elevated)",
        fontSize: "var(--fs-xs)", color: selected.length > 0 ? "var(--accent)" : "var(--ink)",
        fontFamily: "var(--font-sans)", cursor: "pointer", whiteSpace: "nowrap",
      }}>
        {label}
        {selected.length > 0 && (
          <span style={{
            background: "var(--accent)", color: "#fff",
            borderRadius: "99px", padding: "0px 6px",
            fontSize: "10px", fontWeight: "var(--fw-bold)",
          }}>{selected.length}</span>
        )}
        <span style={{ fontSize: "10px", color: "var(--ink-3)" }}>{open ? "▴" : "▾"}</span>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 100,
          background: "var(--bg-elevated)", border: "1px solid var(--line)",
          borderRadius: "var(--radius)", boxShadow: "var(--shadow-md)",
          minWidth: "180px", padding: "6px 0",
        }}>
          <div onClick={() => onChange([])} style={{
            padding: "7px 14px", fontSize: "var(--fs-xs)", cursor: "pointer",
            display: "flex", alignItems: "center", gap: "8px",
            color: selected.length === 0 ? "var(--accent)" : "var(--ink-2)",
            background: selected.length === 0 ? "var(--info-bg)" : "transparent",
          }}>
            <span style={{
              width: "14px", height: "14px", borderRadius: "3px", flexShrink: 0,
              border: `1.5px solid ${selected.length === 0 ? "var(--accent)" : "var(--line-strong)"}`,
              background: selected.length === 0 ? "var(--accent)" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {selected.length === 0 && <span style={{ color: "#fff", fontSize: "10px", lineHeight: 1 }}>✓</span>}
            </span>
            전체
          </div>
          <div style={{ height: "1px", background: "var(--line)", margin: "4px 0" }} />
          {options.map(opt => {
            const checked = selected.includes(opt);
            return (
              <div key={opt} onClick={() => toggle(opt)} style={{
                padding: "7px 14px", fontSize: "var(--fs-xs)", cursor: "pointer",
                display: "flex", alignItems: "center", gap: "8px",
                color: checked ? "var(--accent)" : "var(--ink-2)",
                background: checked ? "var(--info-bg)" : "transparent",
              }}>
                <span style={{
                  width: "14px", height: "14px", borderRadius: "3px", flexShrink: 0,
                  border: `1.5px solid ${checked ? "var(--accent)" : "var(--line-strong)"}`,
                  background: checked ? "var(--accent)" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {checked && <span style={{ color: "#fff", fontSize: "10px", lineHeight: 1 }}>✓</span>}
                </span>
                {opt}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}