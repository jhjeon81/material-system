import { useState, useMemo } from "react";
import { vehicleList, getStatus } from "../data/vehicleData";
import FilterBar from "../components/FilterBar";
import { card, sectionTitle, th, td, today } from "../styles/common.jsx";

const allMaterials = [...new Set(vehicleList.map(d => d.material))];
const allVendors   = [...new Set(vehicleList.map(d => d.vendor))];
const allStatuses  = ["출차완료", "하역중", "이상징후", "입차중"];

const statusConfig = {
  "출차완료": { bg: "var(--success-bg)", color: "var(--success)",  border: "var(--success)" },
  "하역중":   { bg: "var(--warning-bg)", color: "var(--warning)",  border: "var(--warning)" },
  "입차중":   { bg: "var(--info-bg)",    color: "var(--accent)",   border: "var(--accent)" },
  "이상징후": { bg: "var(--danger-bg)",  color: "var(--danger)",   border: "var(--danger)" },
};

const blinkStyle = `
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
  }
`;

function TimeFlow({ v }) {
  const status = getStatus(v);
  const isAnomaly = status === "이상징후";

  const getDotStyle = (stepKey) => {
    const hasVmsIn  = !!v.time_vms_in;
    const hasScale1 = !!v.time_scale1;
    const hasScale2 = !!v.time_scale2;
    const hasVmsOut = !!v.time_vms_out;

    const now      = new Date();
    const todayStr = now.toISOString().slice(0,10);
    const isPastDay = v.date < todayStr;

    let color = "var(--line-strong)";
    let blink = false;

    if (stepKey === "vms_in") {
      if (hasVmsIn) color = "var(--success)";
      else if (hasScale1 || hasScale2) { color = "var(--danger)"; blink = true; }
      else color = "var(--line-strong)";
    }
    else if (stepKey === "scale1") {
      if (hasScale1) color = "var(--success)";
      else if (hasVmsIn && !hasScale1) { color = "var(--danger)"; blink = true; }
      else color = "var(--line-strong)";
    }
    else if (stepKey === "scale2") {
      if (hasScale2) color = "var(--success)";
      else if (!hasScale2) {
        if (hasVmsOut || isPastDay) { color = "var(--danger)"; blink = true; }
        else color = "#f5c518";
      }
      else color = "var(--line-strong)";
    }
    else if (stepKey === "vms_out") {
      color = hasVmsOut ? "var(--success)" : "#c1cad4";
    }

    return { color, blink };
  };

  const steps = [
    { label: "VMS입차", time: v.time_vms_in,  key: "vms_in",  required: true },
    { label: "1차계근", time: v.time_scale1,  key: "scale1",  required: true },
    { label: "2차계근", time: v.time_scale2,  key: "scale2",  required: true },
    { label: "VMS출차", time: v.time_vms_out, key: "vms_out", required: false },
  ];

  return (
    <>
      <style>{blinkStyle}</style>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "2px" }}>
        {steps.map((s, i) => {
          const { color, blink } = getDotStyle(s.key);
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "2px" }}>
              <div style={{ textAlign: "center", minWidth: "40px" }}>
                <div style={{
                  width: "10px", height: "10px", borderRadius: "50%",
                  margin: "0 auto 2px", background: color,
                  animation: blink ? "blink 1s ease-in-out infinite" : "none",
                  boxShadow: blink ? `0 0 6px ${color}` : "none",
                }} />
                <div style={{ fontSize: "9px", color: "var(--ink-3)", whiteSpace: "nowrap" }}>
                  {s.label}
                  {!s.required && <span style={{ fontSize: "8px" }}> (선택)</span>}
                </div>
                {s.time && (
                  <div style={{ fontSize: "9px", color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>{s.time}</div>
                )}
              </div>
              {i < steps.length - 1 && (
                <div style={{
                  width: "14px", height: "1px", marginBottom: "12px",
                  background: getDotStyle(s.key).color === "var(--success)" && getDotStyle(steps[i+1].key).color === "var(--success)"
                    ? "var(--success)" : "var(--line)",
                }} />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function Vehicle() {
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate]     = useState(today);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedVendors, setSelectedVendors]     = useState([]);
  const [selectedStatuses, setSelectedStatuses]   = useState([]);
  const [appliedStart, setAppliedStart]           = useState(today);
  const [appliedEnd, setAppliedEnd]               = useState(today);
  const [appliedMaterials, setAppliedMaterials]   = useState([]);
  const [appliedVendors, setAppliedVendors]       = useState([]);
  const [appliedStatuses, setAppliedStatuses]     = useState([]);

  const handleSearch = () => {
    setAppliedStart(startDate); setAppliedEnd(endDate);
    setAppliedMaterials(selectedMaterials);
    setAppliedVendors(selectedVendors);
    setAppliedStatuses(selectedStatuses);
  };

  const handleReset = () => {
    setStartDate(today); setEndDate(today);
    setSelectedMaterials([]); setSelectedVendors([]); setSelectedStatuses([]);
    setAppliedStart(today); setAppliedEnd(today);
    setAppliedMaterials([]); setAppliedVendors([]); setAppliedStatuses([]);
  };

  const dataWithStatus = vehicleList.map(v => ({ ...v, status: getStatus(v) }));

  const filteredList = useMemo(() => dataWithStatus.filter(v => {
    if (v.date < appliedStart || v.date > appliedEnd) return false;
    if (appliedMaterials.length > 0 && !appliedMaterials.includes(v.material)) return false;
    if (appliedVendors.length > 0   && !appliedVendors.includes(v.vendor))     return false;
    if (appliedStatuses.length > 0  && !appliedStatuses.includes(v.status))    return false;
    return true;
  }), [appliedStart, appliedEnd, appliedMaterials, appliedVendors, appliedStatuses]);

  const counts = {
    전체:     filteredList.length,
    출차완료: filteredList.filter(v => v.status === "출차완료").length,
    하역중:   filteredList.filter(v => v.status === "하역중").length,
    이상징후: filteredList.filter(v => v.status === "이상징후").length,
  };

  const periodLabel = appliedStart === appliedEnd ? appliedStart : `${appliedStart} ~ ${appliedEnd}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      <div style={{ borderBottom: "1px solid var(--line)", paddingBottom: "16px" }}>
        <div style={{ fontSize: "var(--fs-2xl)", fontWeight: "var(--fw-bold)", color: "var(--ink)", letterSpacing: "-0.03em" }}>차량 / VMS</div>
        <div style={{ fontSize: "var(--fs-sm)", color: "var(--ink-3)", marginTop: "4px", fontFamily: "var(--font-mono)" }}>
          {periodLabel} 기준
          {appliedMaterials.length > 0 && ` · ${appliedMaterials.join(", ")}`}
          {appliedStatuses.length > 0  && ` · ${appliedStatuses.join(", ")}`}
        </div>
      </div>

      <FilterBar
        startDate={startDate} setStartDate={setStartDate}
        endDate={endDate} setEndDate={setEndDate}
        filters={[
          { label: "자재",  options: allMaterials, selected: selectedMaterials, onChange: setSelectedMaterials },
          { label: "업체",  options: allVendors,   selected: selectedVendors,   onChange: setSelectedVendors },
          { label: "상태",  options: allStatuses,  selected: selectedStatuses,  onChange: setSelectedStatuses },
        ]}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px" }}>
        {[
          { label: "조회 입차",  value: counts.전체,     unit: "대", color: "var(--accent)" },
          { label: "출차 완료",  value: counts.출차완료,  unit: "대", color: "var(--success)" },
          { label: "하역중",     value: counts.하역중,    unit: "대", color: "var(--warning)" },
          { label: "이상징후",   value: counts.이상징후,  unit: "건", color: "var(--danger)" },
        ].map(c => (
          <div key={c.label} style={card}>
            <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginBottom: "10px", fontFamily: "var(--font-mono)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{c.label}</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "4px" }}>
              <span style={{ fontSize: "var(--fs-3xl)", fontWeight: "var(--fw-bold)", color: c.color, letterSpacing: "-0.03em", lineHeight: 1 }}>{c.value}</span>
              <span style={{ fontSize: "var(--fs-sm)", color: "var(--ink-3)", marginBottom: "3px" }}>{c.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ ...card, padding: "14px 20px", background: "var(--danger-bg)", border: "1px solid var(--danger)" }}>
        <div style={{ fontSize: "var(--fs-xs)", fontWeight: "var(--fw-semibold)", color: "var(--danger)", marginBottom: "4px", fontFamily: "var(--font-mono)" }}>■ 이상징후 판단 기준</div>
        <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-2)", lineHeight: 1.8 }}>
          VMS입차 없음 · 1차계근 없음 · 2차계근 없는데 VMS출차 있음 · 전일 2차계근 미완료
        </div>
      </div>

      <div style={card}>
        <div style={{ ...sectionTitle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>입출차 현황 <span style={{ fontSize: "var(--fs-xs)", fontWeight: "var(--fw-normal)", color: "var(--ink-3)", marginLeft: "8px" }}>{filteredList.length}건</span></span>
        </div>
        {filteredList.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "var(--ink-3)", fontSize: "var(--fs-sm)" }}>조회된 데이터가 없습니다</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>{["날짜","차량번호","기사","업체","자재","규격","수량","입차중량","공차중량","실중량","프로세스","상태"].map(h => <th key={h} style={th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {filteredList.map((v, i) => {
                const sc = statusConfig[v.status];
                return (
                  <tr key={i} style={{ background: v.status === "이상징후" ? "var(--danger-bg)" : "" }}>
                    <td style={td({ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--ink-3)" })}>{v.date}</td>
                    <td style={td({ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", fontWeight: "var(--fw-semibold)", color: "var(--ink)" })}>
                      {v.status === "이상징후" && <span style={{ color: "var(--danger)", marginRight: "4px", animation: "blink 1s ease-in-out infinite" }}>⚠</span>}
                      {v.car}
                    </td>
                    <td style={td({ fontSize: "var(--fs-xs)", color: "var(--ink-3)" })}>{v.driver}</td>
                    <td style={td({ fontSize: "var(--fs-xs)", color: "var(--ink-3)" })}>{v.vendor}</td>
                    <td style={td({ fontWeight: "var(--fw-medium)", color: "var(--ink)" })}>{v.material}</td>
                    <td style={td({ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)" })}>{v.spec}</td>
                    <td style={td({ fontFamily: "var(--font-mono)", color: "var(--accent)", fontWeight: "var(--fw-semibold)" })}>{v.qty} {v.unit}</td>
                    <td style={td({ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)" })}>{v.weight_in}t</td>
                    <td style={td({ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--ink-3)" })}>{v.weight_out ? `${v.weight_out}t` : "-"}</td>
                    <td style={td({ fontFamily: "var(--font-mono)", fontWeight: "var(--fw-semibold)", color: v.weight_net ? "var(--success)" : "var(--ink-3)" })}>
                      {v.weight_net ? `${v.weight_net}t` : "-"}
                    </td>
                    <td style={td()}><TimeFlow v={v} /></td>
                    <td style={td()}>
                      <span style={{
                        fontSize: "var(--fs-xs)", padding: "3px 8px",
                        borderRadius: "var(--radius-sm)", fontWeight: "var(--fw-semibold)",
                        background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
                      }}>{v.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <div style={{ marginTop: "14px", fontSize: "var(--fs-xs)", color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>
          ※ 실중량 = 입차중량 - 공차중량 · 2차계근 완료 시 출차 인정 · VMS출차는 선택사항
        </div>
      </div>
    </div>
  );
}