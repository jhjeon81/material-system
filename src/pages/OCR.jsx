import { useState, useMemo } from "react";
import { ocrList, isWeightBased, getValidation } from "../data/ocrData";
import { preRegisterList } from "../data/preRegisterData";
import { useVehicleContext } from "../context/VehicleContext";
import FilterBar from "../components/FilterBar";
import { card, sectionTitle, th, td, today } from "../styles/common.jsx";

// 지입 차량번호 Set (사전등록 기준)
const jipipNos = new Set(
  preRegisterList
    .filter(r => r.type === "지입")
    .map(r => r.vehicleNo.replace(/\s/g, ""))
);

const allStatuses = ["정상", "검증필요", "오류"];

const statusConfig = {
  "정상":    { bg: "var(--success-bg)", color: "var(--success)", border: "var(--success)" },
  "검증필요": { bg: "var(--warning-bg)", color: "var(--warning)", border: "var(--warning)" },
  "오류":    { bg: "var(--danger-bg)",  color: "var(--danger)",  border: "var(--danger)" },
};

function ConfBar({ value }) {
  const color = value >= 90 ? "var(--success)" : value >= 70 ? "var(--warning)" : "var(--danger)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <div style={{ width: "60px", height: "4px", background: "var(--bg-tint)", borderRadius: "99px", overflow: "hidden" }}>
        <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: "99px" }} />
      </div>
      <span style={{ fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}>{value}%</span>
    </div>
  );
}

export default function OCR() {
  const { unmatchedRows } = useVehicleContext();
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

  // 사후관리에서 지입으로 확정된 차량번호 추가
  const jipipFromPost = new Set(
    unmatchedRows
      .filter(r => r.classified && r.materialType === "지입")
      .map(r => r.car.replace(/\s/g, ""))
  );

  // 지급자재만 필터링
  const jipupOnlyList = ocrList.filter(o => {
    const carNo = o.car.replace(/\s/g, "");
    return !jipipNos.has(carNo) && !jipipFromPost.has(carNo);
  });

  const allMaterials = [...new Set(jipupOnlyList.map(d => d.material))];
  const allVendors   = [...new Set(jipupOnlyList.map(d => d.vendor))];

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

  const dataWithValidation = jipupOnlyList.map(o => ({ ...o, validation: getValidation(o) }));

  const filteredList = useMemo(() => dataWithValidation.filter(o => {
    if (o.date < appliedStart || o.date > appliedEnd) return false;
    if (appliedMaterials.length > 0 && !appliedMaterials.includes(o.material))         return false;
    if (appliedVendors.length > 0   && !appliedVendors.includes(o.vendor))             return false;
    if (appliedStatuses.length > 0  && !appliedStatuses.includes(o.validation.status)) return false;
    return true;
  }), [appliedStart, appliedEnd, appliedMaterials, appliedVendors, appliedStatuses, dataWithValidation]);

  const counts = {
    전체:     filteredList.length,
    정상:     filteredList.filter(o => o.validation.status === "정상").length,
    검증필요: filteredList.filter(o => o.validation.status === "검증필요").length,
    오류:     filteredList.filter(o => o.validation.status === "오류").length,
  };

  const periodLabel = appliedStart === appliedEnd ? appliedStart : `${appliedStart} ~ ${appliedEnd}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      <div style={{ borderBottom: "1px solid var(--line)", paddingBottom: "16px" }}>
        <div style={{ fontSize: "var(--fs-2xl)", fontWeight: "var(--fw-bold)", color: "var(--ink)", letterSpacing: "-0.03em" }}>송장데이터</div>
        <div style={{ fontSize: "var(--fs-sm)", color: "var(--ink-3)", marginTop: "4px", fontFamily: "var(--font-mono)" }}>
          {periodLabel} 기준 · 지급자재만 표시
          {appliedMaterials.length > 0 && ` · ${appliedMaterials.join(", ")}`}
          {appliedStatuses.length > 0  && ` · ${appliedStatuses.join(", ")}`}
        </div>
      </div>

      {/* 지입 제외 안내 */}
      <div style={{ padding: "10px 14px", borderRadius: "var(--radius)", background: "var(--info-bg)", border: "1px solid var(--accent)", fontSize: "var(--fs-xs)", color: "var(--ink-2)" }}>
        <span style={{ color: "var(--accent)", fontWeight: "var(--fw-semibold)", marginRight: "6px" }}>■ 지급자재 전용</span>
        사전등록 또는 사후관리에서 <strong>지입</strong>으로 분류된 차량은 자동 제외됩니다 · 지입자재는 송장 관리 대상 아님
      </div>

      <FilterBar
        startDate={startDate} setStartDate={setStartDate}
        endDate={endDate} setEndDate={setEndDate}
        filters={[
          { label: "자재", options: allMaterials, selected: selectedMaterials, onChange: setSelectedMaterials },
          { label: "업체", options: allVendors,   selected: selectedVendors,   onChange: setSelectedVendors },
          { label: "상태", options: allStatuses,  selected: selectedStatuses,  onChange: setSelectedStatuses },
        ]}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px" }}>
        {[
          { label: "조회 건수",  value: counts.전체,     unit: "건", color: "var(--accent)" },
          { label: "정상 인식",  value: counts.정상,     unit: "건", color: "var(--success)" },
          { label: "검증 필요",  value: counts.검증필요, unit: "건", color: "var(--warning)" },
          { label: "오류",       value: counts.오류,     unit: "건", color: "var(--danger)" },
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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div style={{ ...card, padding: "14px 20px", background: "var(--info-bg)", border: "1px solid var(--accent-soft)" }}>
          <div style={{ fontSize: "var(--fs-xs)", fontWeight: "var(--fw-semibold)", color: "var(--accent)", marginBottom: "6px", fontFamily: "var(--font-mono)" }}>■ 중량 기반 자재 검증 항목</div>
          <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", lineHeight: 1.8 }}>
            레미콘 · 철근 · 벌크시멘트 · 고로슬래그시멘트<br />
            ① AI 인식률 &nbsp;② 무발주 여부 &nbsp;③ 계근중량 대조
          </div>
        </div>
        <div style={{ ...card, padding: "14px 20px", background: "var(--bg-soft)", border: "1px solid var(--line)" }}>
          <div style={{ fontSize: "var(--fs-xs)", fontWeight: "var(--fw-semibold)", color: "var(--ink-3)", marginBottom: "6px", fontFamily: "var(--font-mono)" }}>■ 수량 기반 자재 검증 항목</div>
          <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", lineHeight: 1.8 }}>
            경질우레탄 · 알폼 · PHC파일 · PF보드 외<br />
            ① AI 인식률 &nbsp;② 무발주 여부 &nbsp;(계근 대조 미적용)
          </div>
        </div>
      </div>

      <div style={card}>
        <div style={{ ...sectionTitle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>송장 인식 결과 <span style={{ fontSize: "var(--fs-xs)", fontWeight: "var(--fw-normal)", color: "var(--ink-3)", marginLeft: "8px" }}>{filteredList.length}건</span></span>
        </div>
        {filteredList.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "var(--ink-3)", fontSize: "var(--fs-sm)" }}>조회된 데이터가 없습니다</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>{["날짜","시각","차량번호","송장번호","업체","자재명","규격","수량","인식률","계근대조","검증결과"].map(h => <th key={h} style={th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {filteredList.map((o, i) => {
                const sc = statusConfig[o.validation.status];
                const wb = isWeightBased(o.material);
                const diff = wb && o.weight_invoice && o.weight_scale
                  ? Math.abs(o.weight_scale - o.weight_invoice) / o.weight_invoice * 100
                  : null;
                return (
                  <tr key={i} style={{ background: o.validation.status !== "정상" ? `var(--${o.validation.status === "오류" ? "danger" : "warning"}-bg)` : "" }}>
                    <td style={td({ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--ink-3)" })}>{o.date}</td>
                    <td style={td({ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--ink-3)" })}>{o.time}</td>
                    <td style={td({ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)" })}>{o.car}</td>
                    <td style={td({ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--ink-3)" })}>{o.invoice}</td>
                    <td style={td({ fontSize: "var(--fs-xs)", color: "var(--ink-3)" })}>{o.vendor}</td>
                    <td style={td({ fontWeight: "var(--fw-medium)", color: "var(--ink)" })}>
                      {o.material}
                      <span style={{ fontSize: "var(--fs-xs)", color: wb ? "var(--accent)" : "var(--ink-3)", marginLeft: "4px" }}>{wb ? "⚖" : "📦"}</span>
                    </td>
                    <td style={td({ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)" })}>{o.spec}</td>
                    <td style={td({ fontFamily: "var(--font-mono)", color: "var(--accent)", fontWeight: "var(--fw-semibold)" })}>{o.qty} {o.unit}</td>
                    <td style={td()}><ConfBar value={o.conf} /></td>
                    <td style={td({ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)" })}>
                      {wb && diff !== null ? (
                        <span style={{ color: diff > 10 ? "var(--danger)" : diff > 5 ? "var(--warning)" : "var(--success)", fontWeight: "var(--fw-semibold)" }}>
                          {diff < 0.1 ? "일치" : `±${diff.toFixed(1)}%`}
                        </span>
                      ) : <span style={{ color: "var(--ink-3)" }}>-</span>}
                    </td>
                    <td style={td()}>
                      <div>
                        <span style={{
                          fontSize: "var(--fs-xs)", padding: "3px 8px",
                          borderRadius: "var(--radius-sm)", fontWeight: "var(--fw-semibold)",
                          background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
                        }}>{o.validation.status}</span>
                        {o.validation.issues.map((issue, j) => (
                          <div key={j} style={{ fontSize: "10px", color: `var(--${issue.type})`, marginTop: "3px" }}>· {issue.msg}</div>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <div style={{ marginTop: "14px", fontSize: "var(--fs-xs)", color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>
          ⚖ 중량기반 자재 &nbsp;·&nbsp; 📦 수량기반 자재 &nbsp;·&nbsp; 계근 중량 차이 5% 초과 시 검증필요 / 10% 초과 시 오류
        </div>
      </div>
    </div>
  );
}