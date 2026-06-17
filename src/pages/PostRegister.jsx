import { useState } from "react";
import { useVehicleContext } from "../context/VehicleContext";
import { contractList } from "../data/preRegisterData";

export default function PostRegister() {
  const { unmatchedRows, classifyJipip, classifyJipup } = useVehicleContext();

  const [modalVehicle, setModalVehicle] = useState(null);
  const [dragOver, setDragOver]         = useState(false);
  const [uploading, setUploading]       = useState(false);
  const [tempType, setTempType]         = useState(null);
  const [tempReceiver, setTempReceiver] = useState("");

  const today     = new Date().toISOString().slice(0,10);
  const todayRows = unmatchedRows.filter(r => r.date === today);
  const pastRows  = unmatchedRows.filter(r => r.date < today);

  const totalPending  = unmatchedRows.filter(r => !r.classified).length;
  const todayPending  = todayRows.filter(r => !r.classified).length;
  const ocrProcessing = unmatchedRows.filter(r => r.invoiceStatus === "OCR처리중").length;
  const completed     = unmatchedRows.filter(r => r.classified).length;

  function openModal(r) {
    setModalVehicle(r);
    setTempType(r.materialType);
    setTempReceiver(r.receiver || "");
  }

  function handleConfirmJipip() {
    if (!tempReceiver) {
      alert("납품받는 외주사를 선택해 주세요.");
      return;
    }
    classifyJipip(modalVehicle.car, modalVehicle.date, tempReceiver);
    setModalVehicle(null);
  }

  function handleUpload(file) {
    if (!file || !modalVehicle) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      classifyJipup(modalVehicle.car, modalVehicle.date, file.name);
      setTimeout(() => setModalVehicle(null), 1600);
    }, 800);
  }

  const STATUS_STYLE = {
    "대기중":       { bg: "#F1EFE8", color: "#5F5E5A" },
    "사후확정": { bg: "#EAF3DE", color: "#3B6D11" },
    "OCR처리중":    { bg: "#E6F1FB", color: "#185FA5" },
  };

  const UNKNOWN = <span style={{ color: "var(--ink-3)", fontStyle: "italic" }}>미확인</span>;

  const s = {
    card: { background: "var(--bg-elevated)", border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", padding: "18px", overflow: "visible" },
    th: { textAlign: "left", padding: "0 0 10px 0", fontSize: "var(--fs-xs)", fontWeight: "var(--fw-medium)", color: "var(--ink-3)", borderBottom: "1px solid var(--line)", fontFamily: "var(--font-mono)", letterSpacing: "0.04em" },
    td: { padding: "10px 0", fontSize: "var(--fs-base)", color: "var(--ink-2)", borderBottom: "1px solid var(--line-subtle)" },
  };

  function VehicleRow({ r }) {
    const sc          = STATUS_STYLE[r.invoiceStatus] || STATUS_STYLE["대기중"];
    const isJipipDone = r.classified && r.materialType === "지입";
    const isJipupDone = r.classified && r.materialType === "지급";

    return (
      <tr>
        <td style={{ ...s.td, fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--ink-3)" }}>{r.date}</td>
        <td style={{ ...s.td, fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", fontWeight: "var(--fw-semibold)", color: "var(--ink)" }}>{r.car}</td>

        {/* 업체 */}
        <td style={{ ...s.td, fontSize: "var(--fs-xs)", color: "var(--ink-3)" }}>
          {isJipupDone ? r.resolvedVendor
           : isJipipDone ? <span style={{ fontSize: "11px", color: "#854F0B" }}>{r.receiver}</span>
           : UNKNOWN}
        </td>

        {/* 자재 */}
        <td style={{ ...s.td, fontWeight: "var(--fw-medium)", color: "var(--ink)" }}>
          {isJipipDone ? "-"
           : isJipupDone ? r.resolvedMaterial
           : UNKNOWN}
        </td>

        {/* 실중량 */}
        <td style={{ ...s.td, fontFamily: "var(--font-mono)", color: "var(--accent)", fontWeight: "var(--fw-semibold)" }}>
          {r.weight_net ? `${r.weight_net}t` : "-"}
        </td>

        {/* 구분 */}
        <td style={s.td}>
          {r.materialType ? (
            <span style={{
              padding: "2px 7px", borderRadius: 99, fontSize: "11px", fontWeight: 500,
              background: r.materialType === "지급" ? "#E6F1FB" : "#FAEEDA",
              color: r.materialType === "지급" ? "#185FA5" : "#854F0B",
            }}>{r.materialType}</span>
          ) : (
            <span style={{ padding: "2px 7px", borderRadius: 99, fontSize: "11px", background: "#f5f5f5", color: "var(--ink-3)" }}>미분류</span>
          )}
        </td>

        {/* 상태 */}
        <td style={s.td}>
          <span style={{ padding: "2px 8px", borderRadius: 99, fontSize: "11px", fontWeight: 500, background: sc.bg, color: sc.color }}>
            {r.invoiceStatus}
          </span>
        </td>

        {/* 액션 */}
        <td style={s.td}>
          {!r.classified ? (
            <button
              onClick={() => openModal(r)}
              style={{
                padding: "4px 12px", borderRadius: 6, fontSize: "var(--fs-xs)",
                border: "1px solid var(--accent)", color: "var(--accent)",
                background: "none", cursor: "pointer", fontFamily: "var(--font-sans)",
              }}
            >
              확인 · 등록
            </button>
          ) : isJipipDone ? (
            <span style={{ fontSize: "var(--fs-xs)", color: "#854F0B" }}>VMS 기록 확정</span>
          ) : r.invoiceStatus === "OCR처리중" ? (
            <span style={{ fontSize: "var(--fs-xs)", color: "#185FA5" }}>처리중...</span>
          ) : (
            <span style={{ fontSize: "var(--fs-xs)", color: "#3B6D11" }}>{r.fileName}</span>
          )}
        </td>
      </tr>
    );
  }

  function TableSection({ rows, title, pendingCount, warningColor }) {
    return (
      <div style={s.card}>
        <div style={{ fontSize: "var(--fs-md)", fontWeight: "var(--fw-semibold)", color: "var(--ink)", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
          {title}
          <span style={{ fontSize: "var(--fs-xs)", fontWeight: "var(--fw-normal)", color: warningColor, background: warningColor === "var(--warning)" ? "var(--warning-bg)" : "var(--bg-soft)", padding: "2px 8px", borderRadius: 99 }}>
            {pendingCount}건 미처리
          </span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["날짜","차량번호","업체","자재","실중량","구분","상태",""].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r, i) => <VehicleRow key={i} r={r} />)}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* 헤더 */}
      <div style={{ borderBottom: "1px solid var(--line)", paddingBottom: "16px" }}>
        <div style={{ fontSize: "var(--fs-2xl)", fontWeight: "var(--fw-bold)", color: "var(--ink)", letterSpacing: "-0.03em" }}>미등록 사후관리</div>
        <div style={{ fontSize: "var(--fs-sm)", color: "var(--ink-3)", marginTop: "4px", fontFamily: "var(--font-mono)" }}>
          미등록 입고 차량 분류 · 지급자재 송장등록 · 지입자재 외주사 확정
        </div>
      </div>

      {/* KPI */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px" }}>
        {[
          { label: "미분류 전체",  value: totalPending,  unit: "건", color: "var(--ink)",    subBg: "#f5f5f5",           sub: `오늘 ${todayPending}건 포함` },
          { label: "오늘 미분류",  value: todayPending,  unit: "건", color: "var(--warning)", subBg: "var(--warning-bg)", sub: "지급/지입 구분 필요" },
          { label: "OCR 처리중",  value: ocrProcessing,  unit: "건", color: "var(--accent)",  subBg: "var(--info-bg)",    sub: "자동 처리 중" },
          { label: "처리 완료",   value: completed,       unit: "건", color: "var(--success)", subBg: "var(--success-bg)", sub: "분류 · 등록 완료" },
        ].map(c => (
          <div key={c.label} style={{ ...s.card, padding: "14px 16px" }}>
            <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginBottom: "8px", fontFamily: "var(--font-mono)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{c.label}</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", marginBottom: "8px" }}>
              <span style={{ fontSize: "28px", fontWeight: "var(--fw-bold)", color: c.color, letterSpacing: "-0.04em", lineHeight: 1 }}>{c.value}</span>
              <span style={{ fontSize: "var(--fs-md)", color: "var(--ink-3)", marginBottom: "2px" }}>{c.unit}</span>
            </div>
            <div style={{ fontSize: "var(--fs-xs)", padding: "3px 8px", borderRadius: "var(--radius-sm)", background: c.subBg, color: c.color, display: "inline-block" }}>
              {c.sub}
            </div>
          </div>
        ))}
      </div>

      {/* 처리 흐름 */}
      <div style={{ ...s.card, background: "var(--info-bg)", border: "1px solid var(--accent)", padding: "14px 18px" }}>
        <div style={{ fontSize: "var(--fs-xs)", fontWeight: "var(--fw-semibold)", color: "var(--accent)", marginBottom: "6px", fontFamily: "var(--font-mono)" }}>■ 처리 흐름</div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "var(--fs-xs)", color: "var(--ink-2)", flexWrap: "wrap" }}>
          <span>미등록 차량 확인</span>
          <span style={{ color: "var(--ink-3)" }}>→</span>
          <span style={{ color: "#185FA5", fontWeight: 500 }}>지급</span>
          <span style={{ color: "var(--ink-3)" }}>: 송장 업로드 → S3 → Upstage OCR + Claude → 계근 매칭 → 투입 집계</span>
          <span style={{ color: "var(--ink-3)" }}>|</span>
          <span style={{ color: "#854F0B", fontWeight: 500 }}>지입</span>
          <span style={{ color: "var(--ink-3)" }}>: 외주사 선택 → VMS 기록 확정 → 집계 제외</span>
        </div>
      </div>

      {todayRows.length > 0 && (
        <TableSection
          rows={todayRows}
          title="오늘 미등록 차량"
          pendingCount={todayRows.filter(r => !r.classified).length}
          warningColor="var(--warning)"
        />
      )}

      {pastRows.length > 0 && (
        <TableSection
          rows={pastRows}
          title="이전일 미등록 차량"
          pendingCount={pastRows.filter(r => !r.classified).length}
          warningColor="var(--ink-3)"
        />
      )}

      {/* 모달 */}
      {modalVehicle && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}
          onClick={() => !uploading && setModalVehicle(null)}
        >
          <div
            style={{ background: "var(--bg-elevated)", borderRadius: "var(--radius-lg)", padding: "28px", width: 500, border: "1px solid var(--line)" }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ fontSize: "var(--fs-md)", fontWeight: "var(--fw-bold)", color: "var(--ink)", marginBottom: "16px" }}>차량 확인 · 등록</div>

            {/* 차량 정보 */}
            <div style={{ background: "var(--bg-soft)", borderRadius: "var(--radius)", padding: "12px 14px", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "var(--fs-xs)" }}>
                {[
                  ["차량번호", modalVehicle.car],
                  ["입고일자", modalVehicle.date],
                  ["VMS 입차", modalVehicle.time_vms_in || "-"],
                  ["VMS 출차", modalVehicle.time_vms_out || "-"],
                  ["1차계근",  modalVehicle.time_scale1 || "-"],
                  ["실중량",   modalVehicle.weight_net ? `${modalVehicle.weight_net}t` : "-"],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--ink-3)" }}>{k}</span>
                    <span style={{ color: "var(--ink)", fontWeight: "var(--fw-medium)", fontFamily: "var(--font-mono)", fontSize: "11px" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 지급/지입 선택 */}
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-2)", fontWeight: "var(--fw-medium)", marginBottom: "8px" }}>자재 구분 선택 *</div>
              <div style={{ display: "flex", gap: "8px" }}>
                {["지급", "지입"].map(type => (
                  <div
                    key={type}
                    onClick={() => setTempType(type)}
                    style={{
                      flex: 1, padding: "10px", borderRadius: 8, textAlign: "center", cursor: "pointer", fontSize: 14,
                      border: tempType === type ? `1.5px solid ${type === "지급" ? "var(--accent)" : "#E65100"}` : "1px solid var(--line)",
                      background: tempType === type ? (type === "지급" ? "var(--accent-soft)" : "#FFF3E0") : "var(--bg-soft)",
                      color: tempType === type ? (type === "지급" ? "var(--accent)" : "#E65100") : "var(--ink-2)",
                      fontWeight: tempType === type ? 500 : 400,
                    }}
                  >
                    {type}자재<br />
                    <span style={{ fontSize: 11, fontWeight: 400 }}>
                      {type === "지급" ? "당사 발주 자재" : "외주사 수급 자재"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 지입 — 외주사 선택 */}
            {tempType === "지입" && (
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-2)", fontWeight: "var(--fw-medium)", marginBottom: "6px" }}>납품받는 외주사 *</div>
                <select
                  style={{ width: "100%", height: 36, border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", fontSize: 14, color: "var(--ink)", background: "var(--bg)", boxSizing: "border-box" }}
                  value={tempReceiver}
                  onChange={e => setTempReceiver(e.target.value)}
                >
                  <option value="">선택해 주세요</option>
                  {contractList.map(c => (
                    <option key={c.id} value={c.company}>{c.company} ({c.type})</option>
                  ))}
                </select>
                <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginTop: "6px", padding: "6px 10px", background: "var(--bg-soft)", borderRadius: "var(--radius-sm)" }}>
                  ※ 지입자재는 VMS 출입 기록만 확정됩니다. 계근 · 송장 · 투입 집계 제외
                </div>
              </div>
            )}

            {/* 지급 — 송장 업로드 */}
            {tempType === "지급" && (
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-2)", fontWeight: "var(--fw-medium)", marginBottom: "6px" }}>송장 업로드 *</div>
                <label
                  style={{
                    display: "block",
                    border: `2px dashed ${dragOver ? "var(--accent)" : "var(--line)"}`,
                    borderRadius: "var(--radius)",
                    padding: "24px",
                    textAlign: "center",
                    cursor: uploading ? "default" : "pointer",
                    background: dragOver ? "var(--accent-soft)" : "var(--bg-soft)",
                    transition: "all 0.15s",
                  }}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={e => { e.preventDefault(); setDragOver(false); handleUpload(e.dataTransfer.files[0]); }}
                >
                  <input type="file" accept=".jpg,.jpeg,.png,.pdf" style={{ display: "none" }} onChange={e => handleUpload(e.target.files[0])} />
                  <div style={{ fontSize: "22px", marginBottom: "6px" }}>📎</div>
                  <div style={{ fontSize: "var(--fs-sm)", color: "var(--ink-2)", marginBottom: "4px" }}>
                    {uploading ? "업로드 중..." : "파일을 드래그하거나 클릭하여 선택"}
                  </div>
                  <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)" }}>JPG, PNG, PDF · 최대 10MB</div>
                </label>
                <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginTop: "6px", padding: "6px 10px", background: "var(--bg-soft)", borderRadius: "var(--radius-sm)" }}>
                  업로드 즉시 S3 → Upstage OCR + Claude 분석 → 차량번호 기준 계근 자동 매칭
                </div>
              </div>
            )}

            {/* 버튼 */}
            <div style={{ display: "flex", gap: "8px" }}>
              {tempType === "지입" && (
                <button
                  onClick={handleConfirmJipip}
                  style={{ flex: 1, padding: "10px", borderRadius: "var(--radius-sm)", border: "none", background: "#E65100", color: "#fff", cursor: "pointer", fontSize: "var(--fs-base)", fontWeight: "var(--fw-medium)", fontFamily: "var(--font-sans)" }}
                >
                  지입 확정
                </button>
              )}
              <button
                onClick={() => !uploading && setModalVehicle(null)}
                style={{ flex: tempType === "지입" ? 0.5 : 1, padding: "10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--line)", background: "var(--bg-soft)", color: "var(--ink-2)", cursor: "pointer", fontSize: "var(--fs-base)", fontFamily: "var(--font-sans)" }}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}