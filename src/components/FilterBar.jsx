import MultiSelect from "./MultiSelect";

export default function FilterBar({
  startDate, setStartDate,
  endDate, setEndDate,
  filters = [],
  onSearch, onReset,
}) {
  const setToday = () => {
    const today = new Date().toISOString().slice(0,10);
    setStartDate(today);
    setEndDate(today);
  };

  return (
    <div style={{
      padding: "16px", borderRadius: "var(--radius-lg)",
      background: "var(--bg-soft)", border: "1px solid var(--line)",
      display: "flex", flexDirection: "column", gap: "12px",
    }}>
      {/* 기간 */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
        <span style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", fontWeight: "var(--fw-medium)", minWidth: "28px" }}>기간</span>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={{
          padding: "5px 10px", borderRadius: "var(--radius-sm)",
          border: "1px solid var(--line)", background: "var(--bg-elevated)",
          fontSize: "var(--fs-xs)", color: "var(--ink)",
          fontFamily: "var(--font-mono)", outline: "none", cursor: "pointer",
        }} />
        <span style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)" }}>~</span>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={{
          padding: "5px 10px", borderRadius: "var(--radius-sm)",
          border: "1px solid var(--line)", background: "var(--bg-elevated)",
          fontSize: "var(--fs-xs)", color: "var(--ink)",
          fontFamily: "var(--font-mono)", outline: "none", cursor: "pointer",
        }} />
        <button onClick={setToday} style={{
          padding: "5px 12px", borderRadius: "var(--radius-sm)",
          border: "1px solid var(--line)", background: "var(--bg-elevated)",
          fontSize: "var(--fs-xs)", color: "var(--ink-2)",
          fontFamily: "var(--font-sans)", cursor: "pointer",
        }}>오늘</button>
      </div>

      {/* 필터 + 버튼 */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
        <span style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", fontWeight: "var(--fw-medium)", minWidth: "28px" }}>필터</span>
        {filters.map(f => (
          <MultiSelect
            key={f.label}
            label={f.label}
            options={f.options}
            selected={f.selected}
            onChange={f.onChange}
          />
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
          <button onClick={onReset} style={{
            padding: "6px 14px", borderRadius: "var(--radius-sm)",
            border: "1px solid var(--line)", background: "var(--bg-elevated)",
            fontSize: "var(--fs-xs)", color: "var(--ink-3)",
            fontFamily: "var(--font-sans)", cursor: "pointer",
          }}>초기화</button>
          <button onClick={onSearch} style={{
            padding: "6px 20px", borderRadius: "var(--radius-sm)",
            border: "none", background: "var(--accent)",
            fontSize: "var(--fs-xs)", color: "#fff",
            fontFamily: "var(--font-sans)", cursor: "pointer",
            fontWeight: "var(--fw-semibold)",
          }}>조회</button>
        </div>
      </div>
    </div>
  );
}