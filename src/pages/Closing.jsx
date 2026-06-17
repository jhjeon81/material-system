import { useState } from "react";
import { orderList } from "../data/preRegisterData";
import { budgetData } from "../data/materialData";

const sampleContracts = [
  { id: "O017", company: "한라시멘트(주) 인천",      poNo: "4519010241", contractAmt: 45000000,  prevAmt: 12000000, currAmt: 8000000  },
  { id: "O020", company: "한라엔컴ENCOM 천안사업소",  poNo: "4519010520", contractAmt: 380000000, prevAmt: 42000000, currAmt: 28000000 },
  { id: "O039", company: "이연산업공업(주)",          poNo: "4519010408", contractAmt: 520000000, prevAmt: 68000000, currAmt: 35000000 },
  { id: "O040", company: "(주)한국특강",              poNo: "4519010520", contractAmt: 180000000, prevAmt: 22000000, currAmt: 18000000 },
  { id: "O016", company: "(주)정우산업",              poNo: "4519010173", contractAmt: 95000000,  prevAmt: 18000000, currAmt: 12000000 },
  { id: "O042", company: "한일시멘트(주) 영월공장",   poNo: "4519010241", contractAmt: 62000000,  prevAmt: 0,        currAmt: 0        },
  { id: "O045", company: "(주)한창테크",              poNo: "4519010350", contractAmt: 142000000, prevAmt: 0,        currAmt: 0        },
];

const sampleDetails = {
  "O017": {
    material: "고로슬래그시멘트",
    items: [
      { spec: "1종 (40kg)", unit: "ton", budget: 200, prev: 30, curr: 20 },
    ]
  },
  "O020": {
    material: "레미콘",
    items: [
      { spec: "25-270-18", unit: "m³", budget: 400, prev: 45, curr: 28 },
      { spec: "25-300-18", unit: "m³", budget: 250, prev: 15, curr: 8  },
      { spec: "25-300-21", unit: "m³", budget: 100, prev: 0,  curr: 0  },
    ]
  },
  "O039": {
    material: "철근",
    items: [
      { spec: "D10 (SD500)", unit: "ton", budget: 50,  prev: 18, curr: 12 },
      { spec: "D13 (SD500)", unit: "ton", budget: 80,  prev: 15, curr: 8  },
      { spec: "D16 (SD600)", unit: "ton", budget: 120, prev: 20, curr: 10 },
      { spec: "D19 (SD600)", unit: "ton", budget: 200, prev: 15, curr: 5  },
    ]
  },
  "O040": {
    material: "철근",
    items: [
      { spec: "D22 (SD600)",  unit: "ton", budget: 40, prev: 8, curr: 8 },
      { spec: "D22 (SD600S)", unit: "ton", budget: 10, prev: 0, curr: 0 },
    ]
  },
  "O016": {
    material: "경질우레탄보드",
    items: [
      { spec: "PUR II-A 100T", unit: "m²", budget: 200, prev: 50, curr: 30 },
      { spec: "PUR II-A 130T", unit: "m²", budget: 300, prev: 31, curr: 20 },
      { spec: "PUR II-A 200T", unit: "m²", budget: 400, prev: 79, curr: 40 },
    ]
  },
  "O042": { material: "BULK 시멘트", items: [{ spec: "포틀랜드 1종", unit: "ton", budget: 150, prev: 0, curr: 0 }] },
  "O045": { material: "AL창호",      items: [{ spec: "AL창호 일반",  unit: "식",  budget: 1,   prev: 0, curr: 0 }] },
};

const fmt = (n) => n?.toLocaleString() ?? "-";
const pct = (a, b) => b === 0 ? "0%" : `${((a/b)*100).toFixed(1)}%`;

const s = {
  card: { background: "var(--bg-elevated)", border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", overflow: "visible" },
  th: { textAlign: "left", padding: "0 0 8px 0", fontSize: "var(--fs-xs)", fontWeight: "var(--fw-medium)", color: "var(--ink-3)", borderBottom: "1px solid var(--line)", fontFamily: "var(--font-mono)", letterSpacing: "0.04em" },
  td: { padding: "9px 0", fontSize: "var(--fs-base)", color: "var(--ink-2)", borderBottom: "1px solid var(--line-subtle)" },
  tdR: { padding: "9px 0", fontSize: "var(--fs-base)", color: "var(--ink-2)", borderBottom: "1px solid var(--line-subtle)", textAlign: "right", fontFamily: "var(--font-mono)" },
};

export default function Closing() {
  const [selected, setSelected] = useState(sampleContracts[0]);

  const detail = sampleDetails[selected.id];
  const cumAmt = selected.prevAmt + selected.currAmt;
  const remainAmt = selected.contractAmt - cumAmt;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* 헤더 */}
      <div style={{ borderBottom: "1px solid var(--line)", paddingBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "var(--fs-2xl)", fontWeight: "var(--fw-bold)", color: "var(--ink)", letterSpacing: "-0.03em" }}>기성 관리</div>
            <div style={{ fontSize: "var(--fs-sm)", color: "var(--ink-3)", marginTop: "4px", fontFamily: "var(--font-mono)" }}>
              2026년 6월 기준 · 지급자재 업체별 기성 현황
            </div>
          </div>
          <div style={{ padding: "6px 14px", borderRadius: "var(--radius-sm)", background: "var(--warning-bg)", border: "1px solid var(--warning)", fontSize: "var(--fs-xs)", color: "var(--warning)", fontWeight: "var(--fw-medium)" }}>
            🚧 개발 예정 — 화면 구성 목업
          </div>
        </div>
      </div>

      {/* 향후 개발 방향 안내 */}
      <div style={{ ...s.card, padding: "14px 18px", background: "var(--info-bg)", border: "1px solid var(--accent)" }}>
        <div style={{ fontSize: "var(--fs-xs)", fontWeight: "var(--fw-semibold)", color: "var(--accent)", marginBottom: "6px", fontFamily: "var(--font-mono)" }}>■ 향후 개발 방향</div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "var(--fs-xs)", color: "var(--ink-2)", flexWrap: "wrap" }}>
          <span>AI OCR 송장 데이터</span>
          <span style={{ color: "var(--ink-3)" }}>→</span>
          <span>규격별 투입수량 자동 집계</span>
          <span style={{ color: "var(--ink-3)" }}>→</span>
          <span>업체별 금월 기성 산출</span>
          <span style={{ color: "var(--ink-3)" }}>→</span>
          <span>담당자 검토 · 확정</span>
          <span style={{ color: "var(--ink-3)" }}>→</span>
          <span style={{ color: "var(--success)", fontWeight: 500 }}>ERP / I-QMS 자동 전송</span>
        </div>
      </div>

      {/* 메인 레이아웃 */}
      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "16px", alignItems: "start" }}>

        {/* 좌측 - 업체 목록 */}
        <div style={{ ...s.card, padding: "16px 18px" }}>
          <div style={{ fontSize: "var(--fs-md)", fontWeight: "var(--fw-semibold)", color: "var(--ink)", marginBottom: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            업체별 기성 현황
            <span style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", fontWeight: "var(--fw-normal)" }}>{sampleContracts.length}개 업체</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {sampleContracts.map(c => {
              const cum  = c.prevAmt + c.currAmt;
              const rate = c.contractAmt === 0 ? 0 : (cum / c.contractAmt) * 100;
              const isSelected = selected.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelected(c)}
                  style={{
                    padding: "10px 12px", borderRadius: "var(--radius-sm)", cursor: "pointer",
                    background: isSelected ? "var(--accent-soft)" : "var(--bg-soft)",
                    border: isSelected ? "1px solid var(--accent)" : "1px solid transparent",
                    transition: "all 0.15s",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontSize: "var(--fs-sm)", fontWeight: isSelected ? "var(--fw-semibold)" : "var(--fw-medium)", color: isSelected ? "var(--accent)" : "var(--ink)" }}>
                      {c.company}
                    </span>
                    <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: isSelected ? "var(--accent)" : "var(--ink-3)" }}>
                      {rate.toFixed(1)}%
                    </span>
                  </div>
                  <div style={{ height: "3px", background: "var(--bg-elevated)", borderRadius: "99px", overflow: "hidden", marginBottom: "5px" }}>
                    <div style={{ width: `${Math.min(rate, 100)}%`, height: "100%", background: isSelected ? "var(--accent)" : "var(--line-strong)", borderRadius: "99px" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>
                    <span>PO {c.poNo}</span>
                    <span>금월 {fmt(c.currAmt)}원</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 우측 - 상세 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

          {/* 업체 기성 요약 */}
          <div style={{ ...s.card, padding: "16px 18px" }}>
            <div style={{ fontSize: "var(--fs-md)", fontWeight: "var(--fw-semibold)", color: "var(--ink)", marginBottom: "14px" }}>
              {selected.company}
              <span style={{ fontSize: "var(--fs-xs)", fontWeight: "var(--fw-normal)", color: "var(--ink-3)", marginLeft: "8px", fontFamily: "var(--font-mono)" }}>
                PO {selected.poNo}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "14px" }}>
              {[
                { label: "계약금액",  value: fmt(selected.contractAmt), unit: "원", color: "var(--ink)" },
                { label: "전월 기성", value: fmt(selected.prevAmt),     unit: "원", color: "var(--ink-2)" },
                { label: "금월 기성", value: fmt(selected.currAmt),     unit: "원", color: "var(--accent)" },
                { label: "누계 기성", value: fmt(cumAmt),               unit: "원", color: "var(--success)" },
              ].map(item => (
                <div key={item.label} style={{ padding: "10px 12px", borderRadius: "var(--radius-sm)", background: "var(--bg-soft)" }}>
                  <div style={{ fontSize: "11px", color: "var(--ink-3)", marginBottom: "6px", fontFamily: "var(--font-mono)" }}>{item.label}</div>
                  <div style={{ fontSize: "15px", fontWeight: "var(--fw-bold)", color: item.color, fontFamily: "var(--font-mono)" }}>{item.value}</div>
                  <div style={{ fontSize: "10px", color: "var(--ink-3)", marginTop: "2px" }}>{item.unit}</div>
                </div>
              ))}
            </div>

            {/* 누계 진행률 */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginBottom: "6px" }}>
                <span>누계 기성율</span>
                <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)", fontWeight: "var(--fw-semibold)" }}>{pct(cumAmt, selected.contractAmt)}</span>
              </div>
              <div style={{ height: "8px", background: "var(--bg-tint)", borderRadius: "99px", overflow: "hidden", marginBottom: "6px" }}>
                <div style={{ width: pct(cumAmt, selected.contractAmt), height: "100%", background: "var(--accent)", borderRadius: "99px" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>
                <span>잔여 {fmt(remainAmt)}원</span>
                <span>계약 {fmt(selected.contractAmt)}원</span>
              </div>
            </div>
          </div>

          {/* 규격별 투입 현황 */}
          <div style={{ ...s.card, padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <div style={{ fontSize: "var(--fs-md)", fontWeight: "var(--fw-semibold)", color: "var(--ink)" }}>
                규격별 투입 현황
                <span style={{ fontSize: "var(--fs-xs)", fontWeight: "var(--fw-normal)", color: "var(--ink-3)", marginLeft: "6px" }}>{detail?.material}</span>
              </div>
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <span style={{ fontSize: "11px", color: "var(--ink-3)", padding: "3px 8px", borderRadius: 4, background: "var(--info-bg)", border: "0.5px solid var(--accent)" }}>
                  AI OCR 송장 기반 자동 집계 (개발 예정)
                </span>
              </div>
            </div>

            {detail ? (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["규격", "단위", "계약수량", "전월투입", "금월투입", "누계투입", "잔여"].map(h => (
                      <th key={h} style={{ ...s.th, textAlign: h === "규격" ? "left" : "right" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {detail.items.map((item, i) => {
                    const cum     = item.prev + item.curr;
                    const remain  = item.budget - cum;
                    const cumRate = item.budget === 0 ? 0 : (cum / item.budget) * 100;
                    return (
                      <tr key={i}>
                        <td style={{ ...s.td, fontWeight: "var(--fw-medium)", color: "var(--ink)" }}>{item.spec}</td>
                        <td style={s.tdR}>{item.unit}</td>
                        <td style={s.tdR}>{item.budget}</td>
                        <td style={s.tdR}>{item.prev || "-"}</td>
                        <td style={{ ...s.tdR, color: item.curr > 0 ? "var(--accent)" : "var(--ink-3)", fontWeight: item.curr > 0 ? "var(--fw-semibold)" : "var(--fw-normal)" }}>
                          {item.curr || "-"}
                        </td>
                        <td style={s.tdR}>
                          <span style={{ color: cumRate >= 80 ? "var(--danger)" : cumRate >= 50 ? "var(--warning)" : "var(--success)" }}>
                            {cum} ({cumRate.toFixed(0)}%)
                          </span>
                        </td>
                        <td style={{ ...s.tdR, color: remain <= 0 ? "var(--danger)" : "var(--ink-3)" }}>{remain}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div style={{ padding: "20px 0", textAlign: "center", fontSize: "var(--fs-sm)", color: "var(--ink-3)" }}>
                규격 데이터 없음
              </div>
            )}
          </div>

          {/* 확정 버튼 */}
          <div style={{ ...s.card, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)" }}>
              담당자 검토 후 확정 시 ERP / I-QMS로 자동 전송됩니다
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button style={{ padding: "8px 16px", borderRadius: "var(--radius-sm)", border: "1px solid var(--line)", background: "var(--bg-soft)", color: "var(--ink-2)", cursor: "pointer", fontSize: "var(--fs-xs)", fontFamily: "var(--font-sans)" }}>
                임시저장
              </button>
              <button
                onClick={() => alert("기성 확정 및 ERP 전송은 개발 예정 기능입니다.")}
                style={{ padding: "8px 16px", borderRadius: "var(--radius-sm)", border: "none", background: "var(--accent)", color: "#fff", cursor: "pointer", fontSize: "var(--fs-xs)", fontWeight: "var(--fw-medium)", fontFamily: "var(--font-sans)" }}
              >
                기성 확정 · ERP 전송
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}