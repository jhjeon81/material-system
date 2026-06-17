import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { todayVehicles } from "../data/vehicleData";
import { budgetData } from "../data/materialData";
import { ocrList, getValidation } from "../data/ocrData";
import { usePreRegisterContext } from "../context/PreRegisterContext";
import { useVehicleContext } from "../context/VehicleContext";

const today    = new Date().toISOString().slice(0,10);
const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0,10);

const todayCompleted    = todayVehicles.filter(v => v.status === "입고완료");
const alertVehicles     = todayVehicles.filter(v => v.status === "이상징후");

const todayOcr      = ocrList.filter(o => o.date === today).map(o => ({ ...o, validation: getValidation(o) }));
const ocrErrorCount = todayOcr.filter(o => o.validation.status === "오류").length;
const ocrWarnCount  = todayOcr.filter(o => o.validation.status === "검증필요").length;

const materialRates = budgetData.map(cat => {
  const totB = cat.items.reduce((s,i) => s+i.budget, 0);
  const totA = cat.items.reduce((s,i) => s+i.actual, 0);
  const rate = totB === 0 ? 0 : parseFloat(((totA/totB)*100).toFixed(1));
  return { name: cat.category, rate };
});

const PREVIEW = 5;
const BAR_COLOR = "#378ADD";

const s = {
  card: { background: "var(--bg-elevated)", border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", overflow: "visible" },
  secHeader: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" },
  th: { textAlign: "left", padding: "0 0 8px 0", fontSize: "var(--fs-xs)", fontWeight: "var(--fw-medium)", color: "var(--ink-3)", borderBottom: "1px solid var(--line)", fontFamily: "var(--font-mono)", letterSpacing: "0.04em" },
  td: { padding: "8px 0", fontSize: "var(--fs-base)", color: "var(--ink-2)", borderBottom: "1px solid var(--line-subtle)" },
};

function SectionTitle({ title }) {
  return (
    <div style={s.secHeader}>
      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--ink)", flexShrink: 0 }} />
      <div style={{ fontSize: "var(--fs-md)", fontWeight: "var(--fw-bold)", color: "var(--ink)" }}>{title}</div>
      <div style={{ flex: 1, height: "0.5px", background: "var(--line)" }} />
    </div>
  );
}

function TypeBadge({ type }) {
  const cfg = {
    지급:   { bg: "#E6F1FB", color: "#0C447C" },
    지입:   { bg: "#FAEEDA", color: "#633806" },
    미등록: { bg: "var(--bg-soft)", color: "var(--ink-3)" },
    이상:   { bg: "#FCEBEB", color: "#791F1F" },
  };
  const c = cfg[type] || cfg["미등록"];
  return <span style={{ padding: "2px 6px", borderRadius: 99, fontSize: "11px", fontWeight: 500, background: c.bg, color: c.color }}>{type}</span>;
}

function StatusBadge({ tag, tagBg, tagColor }) {
  return <span style={{ padding: "2px 6px", borderRadius: 99, fontSize: "11px", fontWeight: 500, background: tagBg, color: tagColor }}>{tag}</span>;
}

const UNKNOWN = <span style={{ color: "var(--ink-3)", fontStyle: "italic", fontSize: "11px" }}>미확인</span>;

export default function Dashboard() {
  const navigate = useNavigate();
  const [todayExp, setTodayExp] = useState(false);
  const [tmrExp, setTmrExp]     = useState(false);

  const { unmatchedRows } = useVehicleContext();
  const { preRegList }    = usePreRegisterContext();

  const todayPreReg     = preRegList.filter(r => r.planDate === today);
  const tomorrowPreReg  = preRegList.filter(r => r.planDate === tomorrow);
  const preRegCompleted = todayPreReg.filter(r => r.status === "입고완료");
  const preRegPending   = todayPreReg.filter(r => r.status === "반입예정");

  const dynamicPreRegNos  = new Set(preRegList.map(r => r.vehicleNo.replace(/\s/g, "")));
  const dynamicIsPreReg   = (car) => dynamicPreRegNos.has((car || "").replace(/\s/g, ""));
  const todayUnregistered = todayCompleted.filter(v => !dynamicIsPreReg(v.car));

  const todayUnmatched    = unmatchedRows.filter(r => r.date === today);
  const unclassifiedCount = todayUnmatched.filter(r => !r.classified).length;

  const jipupCompleted = preRegCompleted.filter(r => r.type === "지급").length
    + todayUnmatched.filter(r => r.classified && r.materialType === "지급").length;
  const jipupPending   = preRegPending.filter(r => r.type === "지급").length;

  const jipipCompleted = preRegCompleted.filter(r => r.type === "지입").length
    + todayUnmatched.filter(r => r.classified && r.materialType === "지입").length;
  const jipipPending   = preRegPending.filter(r => r.type === "지입").length;

  const totalInbound = jipupCompleted + jipipCompleted + unclassifiedCount;

  const jipupTmr = tomorrowPreReg.filter(r => r.type === "지급").length;
  const jipipTmr = tomorrowPreReg.filter(r => r.type === "지입").length;

  const todayList = [
    ...preRegCompleted.map(r => ({
      type: r.type, vehicleNo: r.vehicleNo,
      displayName: r.type === "지입" ? r.receiver : r.supplier,
      material: r.material,
      tag: "사전등록", tagBg: "#EAF3DE", tagColor: "#3B6D11",
    })),
    ...preRegPending.map(r => ({
      type: r.type, vehicleNo: r.vehicleNo,
      displayName: r.type === "지입" ? r.receiver : r.supplier,
      material: r.material,
      tag: "반입예정", tagBg: "#E6F1FB", tagColor: "#185FA5",
    })),
    ...todayUnmatched.map(r => ({
      type: r.classified ? r.materialType : "미등록",
      vehicleNo: r.car,
      displayName: r.classified && r.materialType === "지급" && r.resolvedVendor ? r.resolvedVendor
               : r.classified && r.materialType === "지입" ? r.receiver : null,
      material: r.classified && r.materialType === "지급" && r.resolvedMaterial ? r.resolvedMaterial : null,
      tag: r.classified ? "사후확정" : "미확인",
      tagBg: r.classified ? "#EAF3DE" : "var(--bg-soft)",
      tagColor: r.classified ? "#3B6D11" : "var(--ink-3)",
    })),
    ...alertVehicles.map(v => ({
      type: "이상", vehicleNo: v.car,
      displayName: v.vendor,
      material: v.material,
      tag: "이상징후", tagBg: "#FCEBEB", tagColor: "#A32D2D",
    })),
  ];

  const todayDisplay = todayExp ? todayList : todayList.slice(0, PREVIEW);
  const tmrDisplay   = tmrExp ? tomorrowPreReg : tomorrowPreReg.slice(0, PREVIEW);

  const miniBox = (num, label, bg, color) => (
    <div style={{ flex: 1, padding: "4px 3px", borderRadius: 5, background: bg, textAlign: "center" }}>
      <div style={{ fontSize: "12px", fontWeight: 500, color }}>{num}</div>
      <div style={{ fontSize: "9px", color, marginTop: "1px", opacity: 0.8 }}>{label}</div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

      {/* 헤더 */}
      <div style={{ borderBottom: "1px solid var(--line)", paddingBottom: "16px" }}>
        <div style={{ fontSize: "var(--fs-2xl)", fontWeight: "var(--fw-bold)", color: "var(--ink)", letterSpacing: "-0.03em" }}>현황</div>
        <div style={{ fontSize: "var(--fs-sm)", color: "var(--ink-3)", marginTop: "4px", fontFamily: "var(--font-mono)" }}>
          {new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric", weekday: "long" })} 기준
        </div>
      </div>

      {/* 반입 현황 */}
      <div>
        <SectionTitle title="반입 현황" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>

          {/* 오늘 */}
          <div style={{ ...s.card, padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "var(--fs-md)", fontWeight: "var(--fw-semibold)", color: "var(--ink)" }}>오늘</span>
              <span style={{ fontSize: "11px", color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>{today} · 총 {totalInbound}대</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "12px" }}>
              {/* 지급 */}
              <div style={{ background: "var(--bg-soft)", borderRadius: "var(--radius)", padding: "10px 10px" }}>
                <span style={{ padding: "2px 6px", borderRadius: 99, fontSize: "10px", fontWeight: 500, background: "#E6F1FB", color: "#0C447C", display: "inline-block", marginBottom: "6px" }}>지급</span>
                <div style={{ fontSize: "20px", fontWeight: "var(--fw-bold)", color: "#185FA5", lineHeight: 1, marginBottom: "6px" }}>
                  {jipupCompleted}<span style={{ fontSize: "11px", color: "var(--ink-3)", marginLeft: "2px" }}>대</span>
                </div>
                <div style={{ display: "flex", gap: "3px" }}>
                  {miniBox(preRegCompleted.filter(r => r.type === "지급").length, "사전등록", "#EAF3DE", "#3B6D11")}
                  {miniBox(todayUnmatched.filter(r => r.classified && r.materialType === "지급").length, "사후확정", "#E6F1FB", "#185FA5")}
                </div>
                {jipupPending > 0 && (
                  <div style={{ marginTop: "5px", fontSize: "10px", color: "#185FA5", background: "#E6F1FB", padding: "3px 6px", borderRadius: 4, textAlign: "center" }}>
                    미입고 {jipupPending}건
                  </div>
                )}
              </div>

              {/* 지입 */}
              <div style={{ background: "var(--bg-soft)", borderRadius: "var(--radius)", padding: "10px 10px" }}>
                <span style={{ padding: "2px 6px", borderRadius: 99, fontSize: "10px", fontWeight: 500, background: "#FAEEDA", color: "#633806", display: "inline-block", marginBottom: "6px" }}>지입</span>
                <div style={{ fontSize: "20px", fontWeight: "var(--fw-bold)", color: "#854F0B", lineHeight: 1, marginBottom: "6px" }}>
                  {jipipCompleted}<span style={{ fontSize: "11px", color: "var(--ink-3)", marginLeft: "2px" }}>대</span>
                </div>
                <div style={{ display: "flex", gap: "3px" }}>
                  {miniBox(preRegCompleted.filter(r => r.type === "지입").length, "사전등록", "#EAF3DE", "#3B6D11")}
                  {miniBox(todayUnmatched.filter(r => r.classified && r.materialType === "지입").length, "사후확정", "#FAEEDA", "#854F0B")}
                </div>
                {jipipPending > 0 && (
                  <div style={{ marginTop: "5px", fontSize: "10px", color: "#185FA5", background: "#E6F1FB", padding: "3px 6px", borderRadius: 4, textAlign: "center" }}>
                    미입고 {jipipPending}건
                  </div>
                )}
              </div>

              {/* 미등록 */}
              <div style={{ background: "var(--bg-soft)", borderRadius: "var(--radius)", padding: "10px 10px" }}>
                <span style={{ padding: "2px 6px", borderRadius: 99, fontSize: "10px", fontWeight: 500, background: "var(--bg-elevated)", color: "var(--ink-3)", display: "inline-block", marginBottom: "6px" }}>미등록</span>
                <div style={{ fontSize: "20px", fontWeight: "var(--fw-bold)", color: "var(--ink-2)", lineHeight: 1, marginBottom: "6px" }}>
                  {unclassifiedCount}<span style={{ fontSize: "11px", color: "var(--ink-3)", marginLeft: "2px" }}>대</span>
                </div>
                {unclassifiedCount > 0 ? (
                  <div
                    onClick={() => navigate("/postregister")}
                    style={{ marginTop: "5px", fontSize: "10px", color: "var(--warning)", background: "var(--warning-bg)", padding: "3px 6px", borderRadius: 4, textAlign: "center", cursor: "pointer", border: "0.5px solid var(--warning)" }}
                  >
                    ⚠ 사후처리 필요 →
                  </div>
                ) : (
                  <div style={{ marginTop: "5px", fontSize: "10px", color: "var(--ink-3)", background: "var(--bg-elevated)", padding: "3px 6px", borderRadius: 4, textAlign: "center" }}>
                    처리 완료
                  </div>
                )}
              </div>
            </div>

            {/* 이상징후 */}
            <div style={{ borderTop: "1px solid var(--line)", paddingTop: "10px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
              <div onClick={() => navigate("/vehicle")} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 8px", borderRadius: "var(--radius-sm)", background: alertVehicles.length > 0 ? "var(--danger-bg)" : "var(--bg-soft)", cursor: "pointer" }}>
                <span style={{ fontSize: "11px", color: alertVehicles.length > 0 ? "var(--danger)" : "var(--ink-3)" }}>VMS 이상징후</span>
                <span style={{ fontSize: "13px", fontWeight: "var(--fw-bold)", color: alertVehicles.length > 0 ? "var(--danger)" : "var(--ink-3)" }}>{alertVehicles.length}건</span>
              </div>
              <div onClick={() => navigate("/ocr")} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 8px", borderRadius: "var(--radius-sm)", background: ocrErrorCount > 0 ? "var(--danger-bg)" : ocrWarnCount > 0 ? "var(--warning-bg)" : "var(--bg-soft)", cursor: "pointer" }}>
                <span style={{ fontSize: "11px", color: ocrErrorCount > 0 ? "var(--danger)" : ocrWarnCount > 0 ? "var(--warning)" : "var(--ink-3)" }}>AI 송장 이상</span>
                <span style={{ fontSize: "13px", fontWeight: "var(--fw-bold)", color: ocrErrorCount > 0 ? "var(--danger)" : ocrWarnCount > 0 ? "var(--warning)" : "var(--ink-3)" }}>{ocrErrorCount + ocrWarnCount}건</span>
              </div>
            </div>
          </div>

          {/* 내일 */}
          <div style={{ ...s.card, padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "var(--fs-md)", fontWeight: "var(--fw-semibold)", color: "var(--ink)" }}>내일</span>
              <span style={{ fontSize: "11px", color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>{tomorrow} · 총 {tomorrowPreReg.length}건</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
              <div style={{ background: "var(--bg-soft)", borderRadius: "var(--radius)", padding: "10px 12px" }}>
                <span style={{ padding: "2px 6px", borderRadius: 99, fontSize: "10px", fontWeight: 500, background: "#E6F1FB", color: "#0C447C", display: "inline-block", marginBottom: "6px" }}>지급</span>
                <div style={{ fontSize: "20px", fontWeight: "var(--fw-bold)", color: "#185FA5", lineHeight: 1, marginBottom: "4px" }}>
                  {jipupTmr}<span style={{ fontSize: "11px", color: "var(--ink-3)", marginLeft: "2px" }}>건</span>
                </div>
                <div style={{ fontSize: "10px", color: "var(--ink-3)" }}>사전등록 기준</div>
              </div>
              <div style={{ background: "var(--bg-soft)", borderRadius: "var(--radius)", padding: "10px 12px" }}>
                <span style={{ padding: "2px 6px", borderRadius: 99, fontSize: "10px", fontWeight: 500, background: "#FAEEDA", color: "#633806", display: "inline-block", marginBottom: "6px" }}>지입</span>
                <div style={{ fontSize: "20px", fontWeight: "var(--fw-bold)", color: "#854F0B", lineHeight: 1, marginBottom: "4px" }}>
                  {jipipTmr}<span style={{ fontSize: "11px", color: "var(--ink-3)", marginLeft: "2px" }}>건</span>
                </div>
                <div style={{ fontSize: "10px", color: "var(--ink-3)" }}>사전등록 기준</div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--line)", paddingTop: "10px", fontSize: "11px", color: "var(--ink-3)", lineHeight: 1.8 }}>
              사전등록 차량 → 번호판 인식 시 차단기 자동 개방<br />
              미등록 차량 → 기존 절차대로 진행
            </div>
          </div>
        </div>

        {/* 세부현황 테이블 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div style={{ ...s.card, padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-semibold)", color: "var(--ink)" }}>
                세부현황
                <span style={{ fontSize: "var(--fs-xs)", fontWeight: "var(--fw-normal)", color: "var(--ink-3)", marginLeft: "6px" }}>{todayList.length}건</span>
              </div>
              <button onClick={() => navigate("/vehicle")} style={{ fontSize: "var(--fs-xs)", color: "var(--accent)", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)" }}>VMS 전체 →</button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <thead>
                <tr>{["구분","차량번호","업체","자재","상태"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {todayDisplay.map((r, i) => (
                  <tr key={i}>
                    <td style={{ ...s.td, width: 44 }}><TypeBadge type={r.type} /></td>
                    <td style={{ ...s.td, fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--ink-2)" }}>{r.vehicleNo}</td>
                    <td style={{ ...s.td, fontSize: "var(--fs-xs)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.displayName || UNKNOWN}</td>
                    <td style={{ ...s.td, fontWeight: "var(--fw-medium)", color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.material || UNKNOWN}</td>
                    <td style={{ ...s.td, width: 72 }}><StatusBadge tag={r.tag} tagBg={r.tagBg} tagColor={r.tagColor} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {todayList.length > PREVIEW && (
              <button onClick={() => setTodayExp(v => !v)} style={{ marginTop: "8px", width: "100%", padding: "6px", borderRadius: "var(--radius-sm)", border: "1px solid var(--line)", background: "var(--bg-soft)", color: "var(--ink-3)", fontSize: "var(--fs-xs)", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
                {todayExp ? "접기 ▲" : `더보기 (+${todayList.length - PREVIEW}건) ▼`}
              </button>
            )}
          </div>

          <div style={{ ...s.card, padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-semibold)", color: "var(--ink)" }}>
                세부현황
                <span style={{ fontSize: "var(--fs-xs)", fontWeight: "var(--fw-normal)", color: "var(--ink-3)", marginLeft: "6px" }}>{tomorrowPreReg.length}건</span>
              </div>
            </div>
            {tomorrowPreReg.length === 0 ? (
              <div style={{ padding: "20px 0", textAlign: "center", fontSize: "var(--fs-sm)", color: "var(--ink-3)" }}>내일 사전등록된 반입 차량이 없어요</div>
            ) : (
              <>
                <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                  <thead>
                    <tr>{["구분","차량번호","업체","자재"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {tmrDisplay.map((r, i) => (
                      <tr key={i}>
                        <td style={{ ...s.td, width: 44 }}><TypeBadge type={r.type} /></td>
                        <td style={{ ...s.td, fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)" }}>{r.vehicleNo}</td>
                        <td style={{ ...s.td, fontSize: "var(--fs-xs)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {r.type === "지입" ? r.receiver : r.supplier}
                        </td>
                        <td style={{ ...s.td, fontWeight: "var(--fw-medium)", color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.material}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {tomorrowPreReg.length > PREVIEW && (
                  <button onClick={() => setTmrExp(v => !v)} style={{ marginTop: "8px", width: "100%", padding: "6px", borderRadius: "var(--radius-sm)", border: "1px solid var(--line)", background: "var(--bg-soft)", color: "var(--ink-3)", fontSize: "var(--fs-xs)", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
                    {tmrExp ? "접기 ▲" : `더보기 (+${tomorrowPreReg.length - PREVIEW}건) ▼`}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* 예산/투입 현황 */}
      <div>
        <SectionTitle title="예산 / 투입 현황" />
        <div style={{ ...s.card, padding: "16px 18px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "4px" }}>
            {materialRates.map(d => (
              <div key={d.name} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 8px" }}>
                <span style={{ fontSize: "11px", color: d.rate === 0 ? "var(--ink-3)" : "var(--ink-2)", width: 72, flexShrink: 0 }}>{d.name}</span>
                <div style={{ flex: 1, height: "4px", background: "var(--bg-tint)", borderRadius: "99px", overflow: "hidden" }}>
                  <div style={{ width: `${Math.min(d.rate, 100)}%`, height: "100%", background: d.rate === 0 ? "var(--line)" : BAR_COLOR, borderRadius: "99px" }} />
                </div>
                <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: d.rate === 0 ? "var(--ink-3)" : BAR_COLOR, width: 36, textAlign: "right", flexShrink: 0 }}>
                  {d.rate === 0 ? "미입고" : `${d.rate}%`}
                </span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "8px", textAlign: "right", borderTop: "0.5px solid var(--line)", paddingTop: "8px" }}>
            <button onClick={() => navigate("/material")} style={{ fontSize: "var(--fs-xs)", color: "var(--accent)", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
              세부현황 →
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}