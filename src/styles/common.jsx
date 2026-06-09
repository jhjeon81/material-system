export const card = {
  background: "var(--bg-elevated)", borderRadius: "var(--radius-lg)",
  border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)", padding: "20px",
};

export const sectionTitle = {
  fontSize: "var(--fs-md)", fontWeight: "var(--fw-semibold)",
  color: "var(--ink)", marginBottom: "16px",
};

export const th = {
  textAlign: "left", padding: "0 8px 10px 8px",
  fontSize: "var(--fs-xs)", fontWeight: "var(--fw-medium)",
  color: "var(--ink-3)", borderBottom: "1px solid var(--line)",
  fontFamily: "var(--font-mono)", letterSpacing: "0.04em", whiteSpace: "nowrap",
};

export const td = (extra={}) => ({
  padding: "9px 8px", fontSize: "var(--fs-base)",
  color: "var(--ink-2)", borderBottom: "1px solid var(--line-subtle)",
  ...extra
});

export const today = new Date().toISOString().slice(0,10);

export function pct(a, b) {
  if (!b) return 0;
  return Math.min((a / b) * 100, 100);
}

export function RateBar({ value }) {
  const color = value >= 80 ? "var(--success)" : value >= 50 ? "var(--accent)" : value === 0 ? "var(--line-strong)" : "var(--warning)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <div style={{ width: "60px", height: "4px", background: "var(--bg-tint)", borderRadius: "99px", overflow: "hidden" }}>
        <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: "99px" }} />
      </div>
      <span style={{ fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)", color: "var(--ink-3)", minWidth: "32px" }}>
        {value === 0 ? "미입고" : `${value.toFixed(1)}%`}
      </span>
    </div>
  );
}

export function OrderStatus({ budget, order, unit }) {
  const rate = pct(order, budget);
  if (rate >= 100) {
    return (
      <span style={{
        fontSize: "var(--fs-xs)", padding: "2px 8px",
        borderRadius: "var(--radius-sm)", fontWeight: "var(--fw-semibold)",
        background: "var(--success-bg)", color: "var(--success)",
        border: "1px solid var(--success)",
      }}>완료</span>
    );
  }
  return (
    <span style={{ fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)", color: "var(--warning)", fontWeight: "var(--fw-semibold)" }}>
      잔량 {(budget - order).toLocaleString()}{unit}
    </span>
  );
}