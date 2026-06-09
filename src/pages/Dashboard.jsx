import { useNavigate } from "react-router-dom";
import { todayVehicles } from "../data/vehicleData";
import { budgetData, todayList } from "../data/materialData";
import { ocrList, getValidation } from "../data/ocrData";

const today = new Date().toISOString().slice(0,10);

const todayMaterials    = todayList.filter(v => v.date === today);
const todayMaterialTypes = [...new Set(todayMaterials.map(d => d.material))].length;
const todayCars         = todayVehicles.length;
const alertCount        = todayVehicles.filter(v => v.status === "이상징후").length;
const todayOcr          = ocrList.filter(o => o.date === today).map(o => ({ ...o, validation: getValidation(o) }));
const ocrErrorCount     = todayOcr.filter(o => o.validation.status === "오류").length;
const ocrWarnCount      = todayOcr.filter(o => o.validation.status === "검증필요").length;

const totalBudget  = budgetData.reduce((s,c) => s + c.items.reduce((ss,i) => ss+i.budget, 0), 0);
const totalActual  = budgetData.reduce((s,c) => s + c.items.reduce((ss,i) => ss+i.actual, 0), 0);
const totalRate    = ((totalActual / totalBudget) * 100).toFixed(1);
const notDelivered = budgetData.filter(c => c.items.every(i => i.actual === 0)).map(c => c.category);

const materialRates = budgetData.map(cat => {
  const totB = cat.items.reduce((s,i) => s+i.budget, 0);
  const totA = cat.items.reduce((s,i) => s+i.actual, 0);
  const rate = totB === 0 ? 0 : parseFloat(((totA/totB)*100).toFixed(1));
  return { name: cat.category.length > 6 ? cat.category.slice(0,6)+".." : cat.category, rate };
});

const steelData    = budgetData.find(c => c.category === "철근");
const concreteData = budgetData.find(c => c.category === "레미콘");

const card = {
  background: "var(--bg-elevated)", borderRadius: "var(--radius-lg)",
  border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)", overflow: "hidden",
};
const sectionHeader = {
  display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px",
};
const th = {
  textAlign: "left", padding: "0 0 10px 0",
  fontSize: "var(--fs-xs)", fontWeight: "var(--fw-medium)",
  color: "var(--ink-3)", borderBottom: "1px solid var(--line)",
  fontFamily: "var(--font-mono)", letterSpacing: "0.04em",
};
const td = {
  padding: "9px 0", fontSize: "var(--fs-base)",
  color: "var(--ink-2)", borderBottom: "1px solid var(--line-subtle)",
};

function SectionTitle({ title }) {
  return (
    <div style={sectionHeader}>
      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--ink)", flexShrink: 0 }} />
      <div style={{ fontSize: "var(--fs-md)", fontWeight: "var(--fw-bold)", color: "var(--ink)" }}>{title}</div>
      <div style={{ flex: 1, height: "0.5px", background: "var(--line)" }} />
    </div>
  );
}

function KpiCard({ label, value, unit, sub, subBg, subColor, bar, onClick }) {
  return (
    <div onClick={onClick} style={{ ...card, cursor: onClick ? "pointer" : "default" }}>
      <div style={{ height: "3px", background: bar }} />
      <div style={{ padding: "16px 18px" }}>
        <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginBottom: "10px", fontFamily: "var(--font-mono)", letterSpacing: "0.04em", textTransform: "uppercase", display: "flex", justifyContent: "space-between" }}>
          {label}
          {onClick && <span style={{ color: "var(--accent)" }}>→</span>}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "4px" }}>
          <span style={{ fontSize: "32px", fontWeight: "var(--fw-bold)", color: subColor, letterSpacing: "-0.04em", lineHeight: 1 }}>{value}</span>
          <span style={{ fontSize: "var(--fs-md)", color: "var(--ink-3)", marginBottom: "3px" }}>{unit}</span>
        </div>
        <div style={{ fontSize: "var(--fs-xs)", color: subColor, marginTop: "10px", padding: "5px 8px", borderRadius: "var(--radius-sm)", background: subBg }}>
          {sub}
        </div>
      </div>
    </div>
  );
}

function BarGroup({ items, unit, maxVal }) {
  const colors = { budget: "#d1d9e0", order: "#2563a8", actual: "#3d7d5e" };
  return (
    <div style={{ display: "flex", gap: "6px", alignItems: "flex-end", height: "160px" }}>
      {items.map((item, i) => {
        const bH = maxVal ? (item.budget / maxVal) * 140 : 0;
        const oH = maxVal ? (item.order  / maxVal) * 140 : 0;
        const aH = maxVal ? (item.actual / maxVal) * 140 : 0;
        return (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
            <div style={{ display: "flex", gap: "2px", alignItems: "flex-end", height: "140px" }}>
              <div title={`예산: ${item.budget}${unit}`} style={{ width: "10px", height: `${bH}px`, background: colors.budget, borderRadius: "2px 2px 0 0" }} />
              <div title={`발주: ${item.order}${unit}`}  style={{ width: "10px", height: `${oH}px`, background: colors.order,  borderRadius: "2px 2px 0 0" }} />
              <div title={`투입: ${item.actual}${unit}`} style={{ width: "10px", height: `${aH}px`, background: colors.actual, borderRadius: "2px 2px 0 0" }} />
            </div>
            <div style={{ fontSize: "9px", color: "var(--ink-3)", textAlign: "center", lineHeight: 1.2, marginTop: "4px" }}>
              {item.spec.replace(" (SD500)","").replace(" (SD600)","").replace(" (SD600S)","")}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const steelMax    = Math.max(...(steelData?.items.map(i => i.budget) || [0]));
  const concreteMax = Math.max(...(concreteData?.items.map(i => i.budget) || [0]));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

      {/* 헤더 */}
      <div style={{ borderBottom: "1px solid var(--line)", paddingBottom: "16px" }}>
        <div style={{ fontSize: "var(--fs-2xl)", fontWeight: "var(--fw-bold)", color: "var(--ink)", letterSpacing: "-0.03em" }}>자재 통합관제</div>
        <div style={{ fontSize: "var(--fs-sm)", color: "var(--ink-3)", marginTop: "4px", fontFamily: "var(--font-mono)" }}>
          {new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric", weekday: "long" })} 기준
        </div>
      </div>

      {/* ① 자재 입고 현황 */}
      <div>
        <SectionTitle title="자재 입고 현황" />
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "14px" }}>
          <div style={{ ...card, overflow: "visible", padding: "18px" }}>
            <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginBottom: "8px", fontFamily: "var(--font-mono)", letterSpacing: "0.04em", textTransform: "uppercase" }}>오늘 입고 자재</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", marginBottom: "14px" }}>
              <span style={{ fontSize: "32px", fontWeight: "var(--fw-bold)", color: "var(--accent)", letterSpacing: "-0.04em", lineHeight: 1 }}>{todayMaterialTypes}</span>
              <span style={{ fontSize: "var(--fs-md)", color: "var(--ink-3)", marginBottom: "3px" }}>종</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {[...new Set(todayMaterials.map(d => d.material))].map(m => (
                <div key={m} style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--fs-xs)" }}>
                  <span style={{ color: "var(--ink-2)", fontWeight: "var(--fw-medium)" }}>{m}</span>
                  <span style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>
                    {todayMaterials.filter(d => d.material === m).length}건
                  </span>
                </div>
              ))}
            </div>
            <button onClick={() => navigate("/material")} style={{
              marginTop: "14px", width: "100%", padding: "6px",
              borderRadius: "var(--radius-sm)", border: "1px solid var(--line)",
              background: "var(--bg-soft)", color: "var(--ink-3)",
              fontSize: "var(--fs-xs)", cursor: "pointer", fontFamily: "var(--font-sans)",
            }}>세부현황 →</button>
          </div>

          <div style={{ ...card, overflow: "visible", padding: "18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <div style={{ fontSize: "var(--fs-md)", fontWeight: "var(--fw-semibold)", color: "var(--ink)" }}>최근 입고 내역</div>
              <button onClick={() => navigate("/material")} style={{
                fontSize: "var(--fs-xs)", color: "var(--accent)", background: "none",
                border: "none", cursor: "pointer", fontFamily: "var(--font-sans)",
              }}>전체 보기 →</button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>{["시각","업체","자재명","규격","수량","계근중량"].map(h => <th key={h} style={th}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {todayMaterials.slice().reverse().slice(0,5).map((r, i) => (
                  <tr key={i}>
                    <td style={{ ...td, fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--ink-3)" }}>{r.time}</td>
                    <td style={{ ...td, fontSize: "var(--fs-xs)", color: "var(--ink-3)" }}>{r.vendor}</td>
                    <td style={{ ...td, fontWeight: "var(--fw-medium)", color: "var(--ink)" }}>{r.material}</td>
                    <td style={{ ...td, fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)" }}>{r.spec}</td>
                    <td style={{ ...td, fontFamily: "var(--font-mono)", color: "var(--accent)", fontWeight: "var(--fw-semibold)" }}>{r.qty} {r.unit}</td>
                    <td style={{ ...td, fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)" }}>{r.weight}t</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ② 차량 입출 PROCESS */}
      <div>
        <SectionTitle title="차량 입출 PROCESS" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px" }}>
          <KpiCard
            label="오늘 입차 차량"
            value={todayCars} unit="대"
            sub="VMS 입차 기준"
            subBg="var(--info-bg)" subColor="var(--accent)"
            bar="#2563a8"
            onClick={() => navigate("/vehicle")}
          />
          <KpiCard
            label="VMS / 계근대 이상징후"
            value={alertCount} unit="건"
            sub={alertCount > 0 ? "즉시 확인 필요" : "이상 없음"}
            subBg={alertCount > 0 ? "var(--danger-bg)" : "var(--success-bg)"}
            subColor={alertCount > 0 ? "var(--danger)" : "var(--success)"}
            bar={alertCount > 0 ? "#b94a4a" : "#3d7d5e"}
            onClick={() => navigate("/vehicle")}
          />
          <KpiCard
            label="AI 송장 이상징후"
            value={ocrErrorCount} unit="건"
            sub={`검증필요 ${ocrWarnCount}건 포함`}
            subBg={ocrErrorCount > 0 ? "var(--danger-bg)" : ocrWarnCount > 0 ? "var(--warning-bg)" : "var(--success-bg)"}
            subColor={ocrErrorCount > 0 ? "var(--danger)" : ocrWarnCount > 0 ? "var(--warning)" : "var(--success)"}
            bar={ocrErrorCount > 0 ? "#b94a4a" : ocrWarnCount > 0 ? "#c08a3a" : "#3d7d5e"}
            onClick={() => navigate("/ocr")}
          />
        </div>
      </div>

      {/* ③ 예산 / 투입 현황 */}
      <div>
        <SectionTitle title="예산 / 투입 현황" />

        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr 1fr", gap: "12px", marginBottom: "12px" }}>
          <KpiCard
            label="예산 대비 투입율"
            value={totalRate} unit="%"
            sub={`${totalActual.toLocaleString()} / ${totalBudget.toLocaleString()}`}
            subBg={Number(totalRate) >= 50 ? "var(--success-bg)" : "var(--warning-bg)"}
            subColor={Number(totalRate) >= 50 ? "var(--success)" : "var(--warning)"}
            bar={Number(totalRate) >= 50 ? "#3d7d5e" : "#c08a3a"}
            onClick={() => navigate("/material")}
          />

          <div style={{ ...card, overflow: "visible", padding: "18px" }}>
            <div style={{ marginBottom: "10px" }}>
              <div style={{ fontSize: "var(--fs-md)", fontWeight: "var(--fw-semibold)", color: "var(--ink)" }}>철근 예산 · 발주 · 투입</div>
              <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginTop: "2px", fontFamily: "var(--font-mono)" }}>규격별 · ton</div>
            </div>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              {[["예산","#d1d9e0"],["발주","#2563a8"],["투입","#3d7d5e"]].map(([label,color]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "var(--fs-xs)", color: "var(--ink-3)" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: color }} />{label}
                </div>
              ))}
            </div>
            {steelData && <BarGroup items={steelData.items} unit="ton" maxVal={steelMax} />}
          </div>

          <div style={{ ...card, overflow: "visible", padding: "18px" }}>
            <div style={{ marginBottom: "10px" }}>
              <div style={{ fontSize: "var(--fs-md)", fontWeight: "var(--fw-semibold)", color: "var(--ink)" }}>레미콘 예산 · 발주 · 투입</div>
              <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginTop: "2px", fontFamily: "var(--font-mono)" }}>규격별 · ㎥</div>
            </div>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              {[["예산","#d1d9e0"],["발주","#2563a8"],["투입","#3d7d5e"]].map(([label,color]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "var(--fs-xs)", color: "var(--ink-3)" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: color }} />{label}
                </div>
              ))}
            </div>
            {concreteData && <BarGroup items={concreteData.items} unit="m3" maxVal={concreteMax} />}
          </div>
        </div>

        {/* 자재별 투입율 */}
        <div style={{ ...card, overflow: "visible", padding: "18px" }}>
          <div style={{ fontSize: "var(--fs-md)", fontWeight: "var(--fw-semibold)", color: "var(--ink)", marginBottom: "14px" }}>
            자재별 투입율
            <span style={{ fontSize: "var(--fs-xs)", fontWeight: "var(--fw-normal)", color: "var(--ink-3)", marginLeft: "6px" }}>예산 대비</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "8px" }}>
            {materialRates.map(d => {
              const color = d.rate === 0 ? "var(--line-strong)" : d.rate >= 80 ? "var(--success)" : d.rate >= 50 ? "var(--accent)" : "var(--warning)";
              return (
                <div key={d.name} style={{ padding: "10px 12px", borderRadius: "var(--radius-sm)", background: d.rate === 0 ? "var(--bg-soft)" : "var(--bg-elevated)", border: "1px solid var(--line-subtle)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: d.rate > 0 ? "8px" : "0" }}>
                    <span style={{ fontSize: "var(--fs-sm)", fontWeight: "var(--fw-medium)", color: d.rate === 0 ? "var(--ink-3)" : "var(--ink)" }}>{d.name}</span>
                    <span style={{ fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)", color, fontWeight: "var(--fw-bold)" }}>
                      {d.rate === 0 ? "미입고" : `${d.rate}%`}
                    </span>
                  </div>
                  {d.rate > 0 && (
                    <div style={{ height: "4px", background: "var(--bg-tint)", borderRadius: "99px", overflow: "hidden" }}>
                      <div style={{ width: `${d.rate}%`, height: "100%", background: color, borderRadius: "99px" }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {notDelivered.length > 0 && (
            <div style={{ marginTop: "12px", padding: "6px 10px", borderRadius: "var(--radius-sm)", background: "var(--danger-bg)", border: "1px solid var(--danger)", display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "var(--fs-xs)", color: "var(--danger)", fontWeight: "var(--fw-semibold)" }}>미입고</span>
              <span style={{ fontSize: "var(--fs-xs)", color: "var(--danger)", fontFamily: "var(--font-mono)" }}>{notDelivered.join(" · ")}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}