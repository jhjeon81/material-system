import { useState, useMemo } from "react";
import { todayList, budgetData } from "../data/materialData";
import FilterBar from "../components/FilterBar";
import { card, sectionTitle, th, td, today, pct, RateBar, OrderStatus } from "../styles/common.jsx";
import VehicleModal from "../components/VehicleModal";

const totalBudget = budgetData.reduce((s,c) => s + c.items.reduce((ss,i) => ss+i.budget, 0), 0);
const totalOrder  = budgetData.reduce((s,c) => s + c.items.reduce((ss,i) => ss+i.order,  0), 0);
const totalActual = budgetData.reduce((s,c) => s + c.items.reduce((ss,i) => ss+i.actual, 0), 0);

const allMaterials = [...new Set(todayList.map(d => d.material))];
const allVendors   = [...new Set(todayList.map(d => d.vendor))];

export default function Material() {
  const [expanded, setExpanded]               = useState({});
  const [selectedCar, setSelectedCar]         = useState(null);
  const [startDate, setStartDate]             = useState(today);
  const [endDate, setEndDate]                 = useState(today);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedVendors, setSelectedVendors]     = useState([]);
  const [appliedStart, setAppliedStart]           = useState(today);
  const [appliedEnd, setAppliedEnd]               = useState(today);
  const [appliedMaterials, setAppliedMaterials]   = useState([]);
  const [appliedVendors, setAppliedVendors]       = useState([]);

  const toggle = (cat) => setExpanded(p => ({ ...p, [cat]: !p[cat] }));

  const handleSearch = () => {
    setAppliedStart(startDate); setAppliedEnd(endDate);
    setAppliedMaterials(selectedMaterials); setAppliedVendors(selectedVendors);
  };

  const handleReset = () => {
    setStartDate(today); setEndDate(today);
    setSelectedMaterials([]); setSelectedVendors([]);
    setAppliedStart(today); setAppliedEnd(today);
    setAppliedMaterials([]); setAppliedVendors([]);
  };

  const filteredList = useMemo(() => todayList.filter(v => {
    if (v.date < appliedStart || v.date > appliedEnd) return false;
    if (appliedMaterials.length > 0 && !appliedMaterials.includes(v.material)) return false;
    if (appliedVendors.length > 0   && !appliedVendors.includes(v.vendor))     return false;
    return true;
  }), [appliedStart, appliedEnd, appliedMaterials, appliedVendors]);

  const periodLabel = appliedStart === appliedEnd ? appliedStart : `${appliedStart} ~ ${appliedEnd}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      <div style={{ borderBottom: "1px solid var(--line)", paddingBottom: "16px" }}>
        <div style={{ fontSize: "var(--fs-2xl)", fontWeight: "var(--fw-bold)", color: "var(--ink)", letterSpacing: "-0.03em" }}>자재 세부현황</div>
        <div style={{ fontSize: "var(--fs-sm)", color: "var(--ink-3)", marginTop: "4px", fontFamily: "var(--font-mono)" }}>
          {periodLabel} 기준
          {appliedMaterials.length > 0 && ` · ${appliedMaterials.join(", ")}`}
          {appliedVendors.length > 0   && ` · ${appliedVendors.join(", ")}`}
        </div>
      </div>

      <FilterBar
        startDate={startDate} setStartDate={setStartDate}
        endDate={endDate} setEndDate={setEndDate}
        filters={[
          { label: "품목", options: allMaterials, selected: selectedMaterials, onChange: setSelectedMaterials },
          { label: "업체", options: allVendors,   selected: selectedVendors,   onChange: setSelectedVendors },
        ]}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px" }}>
        {[
          { label: "조회 건수",        value: `${filteredList.length}`,                                    unit: "건", color: "var(--accent)" },
          { label: "자재 종류",        value: `${[...new Set(filteredList.map(d => d.material))].length}`, unit: "종", color: "var(--success)" },
          { label: "예산 대비 발주율", value: `${pct(totalOrder,totalBudget).toFixed(1)}`,                 unit: "%",  color: "var(--info)" },
          { label: "예산 대비 투입율", value: `${pct(totalActual,totalBudget).toFixed(1)}`,                unit: "%",  color: "var(--success)" },
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

      <div style={card}>
        <div style={{ ...sectionTitle, display: "flex", justifyContent: "space-between" }}>
          <span>입고 내역 <span style={{ fontSize: "var(--fs-xs)", fontWeight: "var(--fw-normal)", color: "var(--ink-3)", marginLeft: "8px" }}>{filteredList.length}건</span></span>
          <span style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)" }}>차량번호 클릭 시 상세 조회</span>
        </div>
        {filteredList.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "var(--ink-3)", fontSize: "var(--fs-sm)" }}>조회된 데이터가 없습니다</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>{["날짜","입고시각","업체","자재명","규격","수량","차량번호","계근중량"].map(h => <th key={h} style={th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {filteredList.map((v, i) => (
                <tr key={i}>
                  <td style={td({ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--ink-3)" })}>{v.date}</td>
                  <td style={td({ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--ink-3)" })}>{v.time}</td>
                  <td style={td({ fontSize: "var(--fs-xs)", color: "var(--ink-3)" })}>{v.vendor}</td>
                  <td style={td({ fontWeight: "var(--fw-medium)", color: "var(--ink)" })}>{v.material}</td>
                  <td style={td({ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)" })}>{v.spec}</td>
                  <td style={td({ fontFamily: "var(--font-mono)", color: "var(--accent)", fontWeight: "var(--fw-semibold)" })}>{v.qty} {v.unit}</td>
                  <td
                    onClick={() => setSelectedCar(v.car)}
                    style={td({ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--accent)", cursor: "pointer", textDecoration: "underline" })}
                  >{v.car}</td>
                  <td style={td({ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)" })}>{v.weight}t</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ flex: 1, height: "1px", background: "var(--line)" }} />
        <span style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", fontFamily: "var(--font-mono)", whiteSpace: "nowrap" }}>예산 · 발주 · 투입 현황</span>
        <div style={{ flex: 1, height: "1px", background: "var(--line)" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px" }}>
        {[
          { label: "관리 품목 수",     value: `${budgetData.length}`,                       unit: "종", sub: `규격 포함 ${budgetData.reduce((s,c)=>s+c.items.length,0)}개`, color: "var(--accent)" },
          { label: "예산 대비 발주율", value: `${pct(totalOrder,totalBudget).toFixed(1)}`,  unit: "%",  sub: `발주 ${totalOrder.toLocaleString()} / 예산 ${totalBudget.toLocaleString()}`, color: "var(--info)" },
          { label: "예산 대비 투입율", value: `${pct(totalActual,totalBudget).toFixed(1)}`, unit: "%",  sub: `실투입 ${totalActual.toLocaleString()} / 예산 ${totalBudget.toLocaleString()}`, color: "var(--success)" },
        ].map(c => (
          <div key={c.label} style={card}>
            <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginBottom: "10px", fontFamily: "var(--font-mono)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{c.label}</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "4px" }}>
              <span style={{ fontSize: "var(--fs-3xl)", fontWeight: "var(--fw-bold)", color: c.color, letterSpacing: "-0.03em", lineHeight: 1 }}>{c.value}</span>
              <span style={{ fontSize: "var(--fs-sm)", color: "var(--ink-3)", marginBottom: "3px" }}>{c.unit}</span>
            </div>
            <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginTop: "8px", fontFamily: "var(--font-mono)" }}>{c.sub}</div>
          </div>
        ))}
      </div>

      <div style={card}>
        <div style={sectionTitle}>
          품목별 규격 상세
          <span style={{ fontSize: "var(--fs-xs)", fontWeight: "var(--fw-normal)", color: "var(--ink-3)", marginLeft: "8px" }}>품목명 클릭 시 규격별 상세 보기</span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["품목 / 규격","단위","예산량","발주량","발주잔량","투입량","예산대비 투입율","주요업체"].map(h => <th key={h} style={th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {budgetData.map(cat => {
              const totB = cat.items.reduce((s,i) => s+i.budget, 0);
              const totO = cat.items.reduce((s,i) => s+i.order,  0);
              const totA = cat.items.reduce((s,i) => s+i.actual, 0);
              const isOpen = expanded[cat.category];
              return [
                <tr key={cat.category} onClick={() => toggle(cat.category)} style={{ background: "var(--bg-soft)", cursor: "pointer" }}>
                  <td style={td({ fontWeight: "var(--fw-semibold)", color: "var(--ink)" })}>
                    <span style={{ marginRight: "6px", fontSize: "var(--fs-xs)", color: "var(--ink-3)" }}>{isOpen ? "▾" : "▸"}</span>
                    {cat.category}
                  </td>
                  <td style={td({ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--ink-3)" })}>{cat.unit}</td>
                  <td style={td({ fontFamily: "var(--font-mono)" })}>{totB.toLocaleString()}</td>
                  <td style={td({ fontFamily: "var(--font-mono)" })}>{totO.toLocaleString()}</td>
                  <td style={td()}><OrderStatus budget={totB} order={totO} unit={cat.unit} /></td>
                  <td style={td({ fontFamily: "var(--font-mono)", fontWeight: "var(--fw-semibold)", color: totA > 0 ? "var(--accent)" : "var(--ink-3)" })}>{totA.toLocaleString()}</td>
                  <td style={td()}><RateBar value={pct(totA,totB)} /></td>
                  <td style={td({ fontSize: "var(--fs-xs)", color: "var(--ink-3)" })}>{cat.vendors.join(", ")}</td>
                </tr>,
                ...(isOpen ? cat.items.map(item => (
                  <tr key={`${cat.category}-${item.spec}`}>
                    <td style={td({ paddingLeft: "28px", fontSize: "var(--fs-xs)", color: "var(--ink-3)", fontFamily: "var(--font-mono)" })}>└ {item.spec}</td>
                    <td style={td({ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--ink-3)" })}>{cat.unit}</td>
                    <td style={td({ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)" })}>{item.budget.toLocaleString()}</td>
                    <td style={td({ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)" })}>{item.order.toLocaleString()}</td>
                    <td style={td()}><OrderStatus budget={item.budget} order={item.order} unit={cat.unit} /></td>
                    <td style={td({ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: item.actual > 0 ? "var(--accent)" : "var(--ink-3)" })}>{item.actual.toLocaleString()}</td>
                    <td style={td()}><RateBar value={pct(item.actual,item.budget)} /></td>
                    <td style={td({ fontSize: "var(--fs-xs)", color: "var(--ink-3)" })}>{item.vendor}</td>
                  </tr>
                )) : [])
              ];
            })}
          </tbody>
        </table>
        <div style={{ marginTop: "14px", fontSize: "var(--fs-xs)", color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>
          ※ 투입량은 계근대 실측 데이터 기준 · 발주량 및 예산량은 ERP 연동 후 자동 반영 예정
        </div>
      </div>

      {selectedCar && <VehicleModal car={selectedCar} onClose={() => setSelectedCar(null)} />}
    </div>
  );
}