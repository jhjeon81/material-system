import { ocrList, getValidation, isWeightBased } from "../data/ocrData";
import { vehicleList, getStatus } from "../data/vehicleData";

export default function VehicleModal({ car, onClose }) {
  const vehicle = vehicleList.find(v => v.car === car);
  const ocr     = ocrList.find(o => o.car === car);
  const status  = vehicle ? getStatus(vehicle) : null;
  const validation = ocr ? getValidation(ocr) : null;

  const statusConfig = {
    "출차완료": { bg: "var(--success-bg)", color: "var(--success)" },
    "하역중":   { bg: "var(--warning-bg)", color: "var(--warning)" },
    "입차중":   { bg: "var(--info-bg)",    color: "var(--accent)"  },
    "이상징후": { bg: "var(--danger-bg)",  color: "var(--danger)"  },
  };

  const ocrStatusConfig = {
    "정상":    { bg: "var(--success-bg)", color: "var(--success)" },
    "검증필요": { bg: "var(--warning-bg)", color: "var(--warning)" },
    "오류":    { bg: "var(--danger-bg)",  color: "var(--danger)"  },
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.4)", zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--bg-elevated)", borderRadius: "var(--radius-lg)",
          border: "1px solid var(--line)", boxShadow: "var(--shadow-lg)",
          padding: "24px", width: "560px", maxHeight: "80vh", overflowY: "auto",
        }}
      >
        {/* 헤더 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid var(--line)", paddingBottom: "14px" }}>
          <div>
            <div style={{ fontSize: "var(--fs-lg)", fontWeight: "var(--fw-bold)", color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{car}</div>
            <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginTop: "2px" }}>
              {vehicle?.date} · {vehicle?.driver} · {vehicle?.vendor}
            </div>
          </div>
          <button onClick={onClose} style={{
            padding: "4px 10px", borderRadius: "var(--radius-sm)",
            border: "1px solid var(--line)", background: "var(--bg-soft)",
            fontSize: "var(--fs-xs)", color: "var(--ink-3)", cursor: "pointer",
            fontFamily: "var(--font-sans)",
          }}>닫기</button>
        </div>

        {/* 자재 정보 */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "var(--fs-xs)", fontWeight: "var(--fw-semibold)", color: "var(--ink-3)", fontFamily: "var(--font-mono)", letterSpacing: "0.04em", marginBottom: "8px" }}>■ 자재 정보</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
            {[
              { label: "자재명", value: vehicle?.material },
              { label: "규격",   value: vehicle?.spec },
              { label: "수량",   value: `${vehicle?.qty} ${vehicle?.unit}` },
            ].map(r => (
              <div key={r.label} style={{ padding: "10px 12px", borderRadius: "var(--radius-sm)", background: "var(--bg-soft)", border: "1px solid var(--line-subtle)" }}>
                <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginBottom: "4px" }}>{r.label}</div>
                <div style={{ fontSize: "var(--fs-sm)", fontWeight: "var(--fw-semibold)", color: "var(--ink)" }}>{r.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* VMS / 계근 정보 */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <div style={{ fontSize: "var(--fs-xs)", fontWeight: "var(--fw-semibold)", color: "var(--ink-3)", fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>■ VMS / 계근 현황</div>
            {status && (
              <span style={{
                fontSize: "var(--fs-xs)", padding: "2px 8px", borderRadius: "var(--radius-sm)",
                fontWeight: "var(--fw-semibold)",
                background: statusConfig[status]?.bg, color: statusConfig[status]?.color,
              }}>{status}</span>
            )}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "8px" }}>
            {[
              { label: "VMS 입차",  value: vehicle?.time_vms_in  || "-", done: !!vehicle?.time_vms_in },
              { label: "1차 계근",  value: vehicle?.time_scale1  || "-", done: !!vehicle?.time_scale1 },
              { label: "2차 계근",  value: vehicle?.time_scale2  || "-", done: !!vehicle?.time_scale2 },
              { label: "VMS 출차",  value: vehicle?.time_vms_out || "-", done: !!vehicle?.time_vms_out },
            ].map(r => (
              <div key={r.label} style={{ padding: "10px 12px", borderRadius: "var(--radius-sm)", background: r.done ? "var(--success-bg)" : "var(--bg-soft)", border: `1px solid ${r.done ? "var(--success)" : "var(--line-subtle)"}` }}>
                <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginBottom: "4px" }}>{r.label}</div>
                <div style={{ fontSize: "var(--fs-sm)", fontWeight: "var(--fw-semibold)", color: r.done ? "var(--success)" : "var(--ink-3)", fontFamily: "var(--font-mono)" }}>{r.value}</div>
              </div>
            ))}
          </div>
          {vehicle && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginTop: "8px" }}>
              {[
                { label: "입차 중량", value: vehicle.weight_in ? `${vehicle.weight_in}t` : "-" },
                { label: "공차 중량", value: vehicle.weight_out ? `${vehicle.weight_out}t` : "-" },
                { label: "실 중량",   value: vehicle.weight_net ? `${vehicle.weight_net}t` : "-" },
              ].map(r => (
                <div key={r.label} style={{ padding: "10px 12px", borderRadius: "var(--radius-sm)", background: "var(--bg-soft)", border: "1px solid var(--line-subtle)" }}>
                  <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginBottom: "4px" }}>{r.label}</div>
                  <div style={{ fontSize: "var(--fs-sm)", fontWeight: "var(--fw-semibold)", color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{r.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* OCR 정보 */}
        {ocr && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <div style={{ fontSize: "var(--fs-xs)", fontWeight: "var(--fw-semibold)", color: "var(--ink-3)", fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>■ OCR 송장 인식</div>
              {validation && (
                <span style={{
                  fontSize: "var(--fs-xs)", padding: "2px 8px", borderRadius: "var(--radius-sm)",
                  fontWeight: "var(--fw-semibold)",
                  background: ocrStatusConfig[validation.status]?.bg,
                  color: ocrStatusConfig[validation.status]?.color,
                }}>{validation.status}</span>
              )}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px" }}>
              {[
                { label: "송장번호", value: ocr.invoice },
                { label: "인식률",   value: `${ocr.conf}%` },
                { label: "무발주",   value: ocr.ordered ? "정상" : "무발주" },
              ].map(r => (
                <div key={r.label} style={{ padding: "10px 12px", borderRadius: "var(--radius-sm)", background: "var(--bg-soft)", border: "1px solid var(--line-subtle)" }}>
                  <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginBottom: "4px" }}>{r.label}</div>
                  <div style={{ fontSize: "var(--fs-sm)", fontWeight: "var(--fw-semibold)", color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{r.value}</div>
                </div>
              ))}
            </div>
            {isWeightBased(ocr.material) && ocr.weight_invoice && ocr.weight_scale && (
              <div style={{ marginTop: "8px", padding: "10px 14px", borderRadius: "var(--radius-sm)", background: "var(--bg-soft)", border: "1px solid var(--line-subtle)" }}>
                <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginBottom: "6px" }}>계근 중량 대조</div>
                <div style={{ display: "flex", gap: "16px", fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)" }}>
                  <span>송장: <strong>{ocr.weight_invoice}t</strong></span>
                  <span>계근: <strong>{ocr.weight_scale}t</strong></span>
                  <span style={{ color: Math.abs(ocr.weight_scale - ocr.weight_invoice) / ocr.weight_invoice * 100 > 5 ? "var(--danger)" : "var(--success)" }}>
                    차이: {(Math.abs(ocr.weight_scale - ocr.weight_invoice) / ocr.weight_invoice * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            )}
            {validation && validation.issues.length > 0 && (
              <div style={{ marginTop: "8px" }}>
                {validation.issues.map((issue, i) => (
                  <div key={i} style={{
                    padding: "8px 12px", borderRadius: "var(--radius-sm)", marginBottom: "4px",
                    background: `var(--${issue.type}-bg)`, border: `1px solid var(--${issue.type})`,
                    fontSize: "var(--fs-xs)", color: `var(--${issue.type})`, fontWeight: "var(--fw-semibold)",
                  }}>· {issue.msg}</div>
                ))}
              </div>
            )}
          </div>
        )}

        {!vehicle && !ocr && (
          <div style={{ textAlign: "center", padding: "20px 0", color: "var(--ink-3)", fontSize: "var(--fs-sm)" }}>
            연결된 데이터가 없습니다
          </div>
        )}
      </div>
    </div>
  );
}