import { useState, useRef, useEffect } from "react";
import { orderList, contractList } from "../data/preRegisterData";
import { usePreRegisterContext } from "../context/PreRegisterContext";

const DIRECT = "__direct__";

const d = (offsetDays) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0,10);
};

const siteList = [
  { code: "R1046C", name: "가거도항 보강공사" },
  { code: "C1096C", name: "강릉 견소동 아이파크" },
  { code: "D1066C", name: "강변역센트럴아이파크" },
  { code: "C1076C", name: "경산 아이파크 2차" },
  { code: "B1093C", name: "경산 아이파크 2차(자체)" },
  { code: "V0004C", name: "경원선 LTE-R 전원공급 전력설비" },
  { code: "D1126C", name: "고천나구역 주택재개발정비사업" },
  { code: "B1078C", name: "곤지암역 센트럴 아이파크" },
  { code: "B1036C", name: "공릉역세권 개발사업" },
  { code: "D1120C", name: "광명센트럴아이파크" },
  { code: "B1063C", name: "광운대역세권 개발사업 단지조성공사" },
  { code: "B1092C", name: "광운대역세권도시개발사업단지조성공사(공공기여)" },
  { code: "R1048C", name: "광주 도시철도 2호선 2단계 12공구" },
  { code: "R1050C", name: "광주 도시철도 2호선 2단계 9공구" },
  { code: "C038",   name: "광주 센테니얼 아이파크" },
  { code: "C1087C", name: "군산 레이크시티 아이파크" },
  { code: "T0030C", name: "김포 학운3-1 일반산업단지 조성사업" },
  { code: "B1041C", name: "김해 부원지구 도시개발사업" },
  { code: "R1042C", name: "김해 사이언스파크 일반산업단지조성사업" },
  { code: "C1102C", name: "김해 신문 센트럴 아이파크" },
  { code: "T0032C", name: "김해도시계획시설(골프장27홀)토목공사" },
  { code: "T0022C", name: "김해도시계획시설(대로3-6호선) 토목공사" },
  { code: "R1054C", name: "남부내륙철도 김천~거제 건설사업 제3공구" },
  { code: "I0017C", name: "남산스퀘어 밸류애드 프로젝트" },
  { code: "D1118C", name: "능곡5구역 주택재개발정비사업" },
  { code: "R1053C", name: "당진천안선 터널 소방시설(기계)공사" },
  { code: "D1088C", name: "대전탄방1구역(숭어리샘)주택재건축" },
  { code: "V0007C", name: "독배로 관로 이설공사" },
  { code: "V0008C", name: "동작구 수방사 아파트 소방시설공사" },
  { code: "Q268",   name: "마산해양신도시 건설공사" },
  { code: "D1058C", name: "미아4구역 재건축" },
  { code: "D1042C", name: "보문 제5구역주택재개발정비사업" },
  { code: "D1134C", name: "부산가야1구역 주택재개발정비사업" },
  { code: "D1132C", name: "부산대연3구역 재개발" },
  { code: "T0016C", name: "부산항신항2-4단계 컨테이너부두 추가장치장" },
  { code: "C1098C", name: "상봉 9-I구역 주상복합 신축공사" },
  { code: "B1057C", name: "서산 센트럴 아이파크" },
  { code: "C1058C", name: "서울숲 IPARK 리버포레 2차" },
  { code: "I0023C", name: "서울아산병원 중입자 치료센터 증축공사" },
  { code: "B1087C", name: "서울원 아이파크" },
  { code: "B1088C", name: "서울원 큐브" },
  { code: "D1128C", name: "성황원성구역 주택재개발정비사업" },
  { code: "T0001C", name: "송도역세권구역 도시개발사업 부지조성공사" },
  { code: "B1071C", name: "수원 IPC D1" },
  { code: "C1043C", name: "시티오씨엘 3단지(업무복합1블록)" },
  { code: "C1047C", name: "시티오씨엘 7단지(공동4블록)" },
  { code: "C1045C", name: "시티오씨엘 8단지(공동2블록)" },
  { code: "D1041C", name: "신월2 주택재건축정비사업조합" },
  { code: "R1043C", name: "아산~청주선 인주~염치간 건설공사(제1공구)" },
  { code: "D1124C", name: "안양역 센트럴 아이파크 수자인" },
  { code: "B1039C", name: "용산병원부지 개발사업(H)" },
  { code: "R1040C", name: "용현 학익 1블럭 부지조성공사" },
  { code: "D1131C", name: "우방범어타운2차아파트 주택재건축정비사업" },
  { code: "C1099C", name: "운정 아이파크 포레스트" },
  { code: "C1101C", name: "울산 반구동 공동주택" },
  { code: "C1094C", name: "음성 아이파크 1BL(2차)" },
  { code: "C1081C", name: "음성 아이파크 2BL(1차)" },
  { code: "B1081C", name: "의정부 센트럴 아이파크 2단지" },
  { code: "B1048C", name: "의정부 센트럴시티 아이파크" },
  { code: "D1117C", name: "이문3구역 주택재개발정비사업" },
  { code: "C1097C", name: "익산 부송 아이파크" },
  { code: "R1047C", name: "인덕원~동탄복선전철 제12공구" },
  { code: "D1173C", name: "인천갈산1구역 주택재개발" },
  { code: "D1046C", name: "제기1구역 주택재건축정비사업" },
  { code: "C1068C", name: "천안 아이파크시티 2단지" },
  { code: "C1090C", name: "천안 아이파크시티 5단지" },
  { code: "C1091C", name: "천안 아이파크시티 6단지" },
  { code: "B1095C", name: "천안부성 3 도시개발사업 부지조성공사" },
  { code: "B1054C", name: "천안부성 3지구도시개발사업" },
  { code: "T0036C", name: "천안부성 4 도시개발사업 부지조성공사" },
  { code: "C1089C", name: "천안부성 4지구도시개발사업" },
  { code: "C1067C", name: "천안아이파크시티" },
  { code: "B1038C", name: "청주 가경IPARK 6단지" },
  { code: "B1055C", name: "청주 가경IPARK 8단지" },
  { code: "C1100C", name: "춘천 레이크시티 2차 아이파크" },
  { code: "B1062C", name: "춘천 리버뷰 아이파크" },
  { code: "C1071C", name: "춘천 삼천동 IPARK" },
  { code: "R1051C", name: "충남지역 전기공급시설 전력구공사" },
  { code: "T0011C", name: "충주 드림파크 산업단지" },
  { code: "T0033C", name: "파주 메디컬클러스터 부지조성공사" },
  { code: "T0017C", name: "평택 서탄 일반산업단지 조성사업" },
  { code: "C1079C", name: "포항 2차 아이파크" },
  { code: "D1109C", name: "학동4구역 주택재개발" },
];

function SiteSelect({ value, onChange }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = siteList.find(s => s.code === value);
  const filtered = query
    ? siteList.filter(s =>
        s.name.includes(query) || s.code.toLowerCase().includes(query.toLowerCase())
      )
    : siteList;

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false); setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div
        onClick={() => setOpen(v => !v)}
        style={{
          height: 40, border: `1px solid ${open ? "var(--accent)" : "var(--line)"}`,
          borderRadius: open ? "8px 8px 0 0" : 8,
          padding: "0 12px", fontSize: 14,
          color: selected ? "var(--ink)" : "var(--ink-3)",
          background: "var(--bg)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
          {selected ? `${selected.code} · ${selected.name}` : "현장을 선택해 주세요"}
        </span>
        <span style={{ fontSize: 10, color: "var(--ink-3)", marginLeft: 6, flexShrink: 0 }}>
          {open ? "▲" : "▼"}
        </span>
      </div>
      {open && (
        <div style={{
          position: "absolute", top: 39, left: 0, right: 0, zIndex: 300,
          background: "var(--bg-elevated)",
          border: "1px solid var(--accent)", borderTop: "none",
          borderRadius: "0 0 8px 8px", overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}>
          <div style={{ padding: "8px", background: "var(--bg-soft)", borderBottom: "1px solid var(--line)" }}>
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="현장명 또는 현장코드 검색..."
              style={{
                width: "100%", height: 32,
                border: "1px solid var(--line)", borderRadius: 6,
                padding: "0 10px", fontSize: 13,
                color: "var(--ink)", background: "var(--bg)",
                boxSizing: "border-box", outline: "none",
              }}
              onClick={e => e.stopPropagation()}
            />
          </div>
          <div style={{ maxHeight: 240, overflowY: "auto" }}>
            {filtered.length === 0 ? (
              <div style={{ padding: "12px", fontSize: 13, color: "var(--ink-3)", textAlign: "center" }}>
                검색 결과 없음
              </div>
            ) : filtered.map(s => (
              <div
                key={s.code}
                onClick={() => { onChange(s.code); setQuery(""); setOpen(false); }}
                style={{
                  padding: "8px 12px", cursor: "pointer", fontSize: 13,
                  borderBottom: "0.5px solid var(--line)",
                  background: value === s.code ? "var(--accent-soft)" : "transparent",
                  display: "flex", gap: "10px", alignItems: "center",
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", flexShrink: 0, width: 64 }}>{s.code}</span>
                <span style={{ color: "var(--ink)", fontWeight: value === s.code ? 500 : 400 }}>{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SearchableSelect({ options, value, onChange, placeholder }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = options.find(o => o.id === value);
  const filtered = query
    ? options.filter(o =>
        o.company.toLowerCase().includes(query.toLowerCase()) ||
        (o.material || o.type || "").toLowerCase().includes(query.toLowerCase())
      )
    : options;

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false); setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div
        onClick={() => setOpen(v => !v)}
        style={{
          height: 36, border: `1px solid ${open ? "var(--accent)" : "var(--line)"}`,
          borderRadius: open ? "8px 8px 0 0" : 8,
          padding: "0 10px", fontSize: 14,
          color: selected ? "var(--ink)" : "var(--ink-3)",
          background: "var(--bg)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
          {selected ? selected.company : placeholder}
        </span>
        <span style={{ fontSize: 10, color: "var(--ink-3)", marginLeft: 6, flexShrink: 0 }}>
          {open ? "▲" : "▼"}
        </span>
      </div>
      {open && (
        <div style={{
          position: "absolute", top: 35, left: 0, right: 0, zIndex: 200,
          background: "var(--bg-elevated)",
          border: "1px solid var(--accent)", borderTop: "none",
          borderRadius: "0 0 8px 8px", overflow: "hidden",
        }}>
          <div style={{ padding: "8px", background: "var(--bg-soft)", borderBottom: "1px solid var(--line)" }}>
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="검색..."
              style={{
                width: "100%", height: 30, border: "1px solid var(--line)",
                borderRadius: 6, padding: "0 8px", fontSize: 13,
                color: "var(--ink)", background: "var(--bg)",
                boxSizing: "border-box", outline: "none",
              }}
              onClick={e => e.stopPropagation()}
            />
          </div>
          <div style={{ maxHeight: 200, overflowY: "auto" }}>
            {filtered.length === 0 && (
              <div style={{ padding: "12px", fontSize: 13, color: "var(--ink-3)", textAlign: "center" }}>검색 결과 없음</div>
            )}
            {filtered.map(o => (
              <div
                key={o.id}
                onClick={() => { onChange(o.id); setQuery(""); setOpen(false); }}
                style={{
                  padding: "8px 12px", cursor: "pointer", fontSize: 13,
                  borderBottom: "0.5px solid var(--line)",
                  background: value === o.id ? "var(--accent-soft)" : "transparent",
                }}
              >
                <div style={{ fontWeight: 500, color: "var(--ink)" }}>{o.company}</div>
                <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 1 }}>{o.material || o.type}</div>
              </div>
            ))}
            <div
              onClick={() => { onChange(DIRECT); setQuery(""); setOpen(false); }}
              style={{
                padding: "8px 12px", cursor: "pointer", fontSize: 13,
                color: "var(--accent)", fontWeight: 500,
                background: value === DIRECT ? "var(--accent-soft)" : "var(--bg-soft)",
                borderTop: "1px solid var(--line)",
              }}
            >
              ✏️ 직접 입력...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PreRegister() {
  const { addPreReg } = usePreRegisterContext();

  const [siteCode, setSiteCode]             = useState("");
  const [materialType, setMaterialType]     = useState("지급");
  const [supplierSelect, setSupplierSelect] = useState("");
  const [supplierDirect, setSupplierDirect] = useState("");
  const [receiverSelect, setReceiverSelect] = useState("");
  const [receiverDirect, setReceiverDirect] = useState("");
  const [jipipSupplier, setJipipSupplier]   = useState("");
  const [vehicleNo, setVehicleNo]           = useState("");
  const [planDate, setPlanDate]             = useState("");
  const [fileName, setFileName]             = useState("");
  const [dragOver, setDragOver]             = useState(false);
  const [submitted, setSubmitted]           = useState(false);

  const selectedSite     = siteList.find(s => s.code === siteCode);
  const selectedSupplier = orderList.find(o => o.id === supplierSelect);
  const autoMaterial     = selectedSupplier ? selectedSupplier.material : "";

  function handleFileChange(e) {
    if (e.target.files[0]) setFileName(e.target.files[0].name);
  }

  function handleDrop(e) {
    e.preventDefault(); setDragOver(false);
    if (e.dataTransfer.files[0]) setFileName(e.dataTransfer.files[0].name);
  }

  function handleSubmit() {
    if (!siteCode) { alert("현장을 선택해 주세요."); return; }
    if (!vehicleNo || !planDate) { alert("차량번호와 반입예정일은 필수입니다."); return; }
    if (materialType === "지급") {
      const supplier = supplierSelect === DIRECT ? supplierDirect : selectedSupplier?.company;
      if (!supplier) { alert("납품하는 회사를 선택하거나 입력해 주세요."); return; }
    }
    if (materialType === "지입") {
      const receiver = receiverSelect === DIRECT ? receiverDirect : contractList.find(c => c.id === receiverSelect)?.company;
      if (!receiver) { alert("납품받는 외주사를 선택해 주세요."); return; }
    }

    const receiver = receiverSelect === DIRECT
      ? receiverDirect
      : contractList.find(c => c.id === receiverSelect)?.company || "";
    const supplier = supplierSelect === DIRECT
      ? supplierDirect
      : selectedSupplier?.company || jipipSupplier || "";

    addPreReg({
      type:        materialType,
      siteCode,
      siteName:    selectedSite?.name || "",
      receiver:    materialType === "지입" ? receiver : "IPARK현대산업개발(주)",
      supplier:    materialType === "지급" ? supplier : jipipSupplier,
      material:    materialType === "지급" ? autoMaterial : "-",
      vehicleNo,
      planDate,
      invoiceFile: fileName || null,
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setSiteCode(""); setSupplierSelect(""); setSupplierDirect("");
    setReceiverSelect(""); setReceiverDirect("");
    setJipipSupplier(""); setVehicleNo(""); setPlanDate(""); setFileName("");
  }

  function resetType() {
    setSupplierSelect(""); setSupplierDirect("");
    setReceiverSelect(""); setReceiverDirect("");
    setJipipSupplier("");
  }

  const s = {
    wrap: { padding: "24px", maxWidth: 680, margin: "0 auto", fontFamily: "var(--font-sans, sans-serif)" },
    pageTitle: { fontSize: 20, fontWeight: 500, color: "var(--ink)", marginBottom: 4 },
    pageSub: { fontSize: 13, color: "var(--ink-3)", marginBottom: 28 },
    card: { background: "var(--bg-elevated)", border: "1px solid var(--line)", borderRadius: 12, padding: "20px", marginBottom: 16 },
    sectionLabel: { fontSize: 11, fontWeight: 500, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12, fontFamily: "var(--font-mono)" },
    toggleRow: { display: "flex", gap: 8 },
    toggleBtn: (active) => ({
      flex: 1, padding: "10px 8px", borderRadius: 8, textAlign: "center", cursor: "pointer", fontSize: 14,
      border: active ? "1.5px solid var(--accent)" : "1px solid var(--line)",
      background: active ? "var(--accent-soft)" : "var(--bg-soft)",
      color: active ? "var(--accent)" : "var(--ink-2)", fontWeight: active ? 500 : 400,
    }),
    fieldRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 },
    fieldFull: { marginBottom: 12 },
    label: { fontSize: 12, color: "var(--ink-2)", fontWeight: 500, marginBottom: 4, display: "block" },
    input: { width: "100%", height: 36, border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", fontSize: 14, color: "var(--ink)", background: "var(--bg)", boxSizing: "border-box" },
    inputMuted: { width: "100%", height: 36, border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", fontSize: 14, color: "var(--ink-3)", background: "var(--bg-soft)", boxSizing: "border-box", display: "flex", alignItems: "center" },
    inputAuto: { width: "100%", height: 36, border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", fontSize: 14, color: "var(--ink-2)", background: "var(--bg-soft)", boxSizing: "border-box", display: "flex", alignItems: "center" },
    directInput: { width: "100%", height: 36, border: "1px solid var(--accent)", borderRadius: 8, padding: "0 10px", fontSize: 14, color: "var(--ink)", background: "var(--bg)", boxSizing: "border-box", marginTop: 6 },
    submitBtn: { width: "100%", height: 46, background: "var(--accent)", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 500, cursor: "pointer", marginTop: 4 },
    successBtn: { width: "100%", height: 46, background: "var(--success)", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 500, cursor: "default", marginTop: 4 },
    required: { color: "#E24B4A", marginLeft: 2 },
    note: { fontSize: 11, color: "var(--ink-3)", marginTop: 4 },
    infoBox: { background: "var(--bg-soft)", border: "1px solid var(--line)", borderRadius: 8, padding: "10px 12px", fontSize: 12, color: "var(--ink-2)", marginBottom: 14 },
  };

  return (
    <div style={s.wrap}>
      <p style={s.pageTitle}>자재 반입 사전등록</p>
      <p style={s.pageSub}>사전등록 차량은 번호판 인식 시 차단기 자동 개방</p>

      {submitted && (
        <div style={{ padding: "12px 16px", borderRadius: 8, background: "var(--success-bg)", border: "1px solid var(--success)", marginBottom: 16, fontSize: 13, color: "var(--success)", fontWeight: 500 }}>
          ✅ 사전등록이 완료되었습니다! 차량 도착 시 차단기가 자동으로 개방됩니다.
        </div>
      )}

      {/* 현장 선택 */}
      <div style={s.card}>
        <p style={s.sectionLabel}>현장 선택</p>
        <SiteSelect value={siteCode} onChange={setSiteCode} />
        {selectedSite && (
          <div style={{ marginTop: 8, fontSize: 12, color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
            {selectedSite.code} · {selectedSite.name}
          </div>
        )}
      </div>

      {/* 자재 구분 */}
      <div style={s.card}>
        <p style={s.sectionLabel}>자재 구분</p>
        <div style={s.toggleRow}>
          <div style={s.toggleBtn(materialType === "지급")} onClick={() => { setMaterialType("지급"); resetType(); }}>
            지급자재<br /><span style={{ fontSize: 11, fontWeight: 400 }}>당사 발주 자재</span>
          </div>
          <div style={s.toggleBtn(materialType === "지입")} onClick={() => { setMaterialType("지입"); resetType(); }}>
            지입자재<br /><span style={{ fontSize: 11, fontWeight: 400 }}>외주사 수급 자재</span>
          </div>
        </div>
      </div>

      {/* 납품 정보 */}
      <div style={s.card}>
        <p style={s.sectionLabel}>납품 정보</p>
        {materialType === "지급" ? (
          <>
            <div style={s.fieldRow}>
              <div>
                <label style={s.label}>납품받는 업체</label>
                <div style={s.inputMuted}>IPARK현대산업개발(주) (고정)</div>
              </div>
              <div>
                <label style={s.label}>납품하는 회사 <span style={s.required}>*</span></label>
                <SearchableSelect
                  options={orderList} value={supplierSelect}
                  onChange={setSupplierSelect} placeholder="업체 검색 또는 선택..."
                />
                {supplierSelect === DIRECT && (
                  <input style={s.directInput} placeholder="업체명 직접 입력" value={supplierDirect} onChange={e => setSupplierDirect(e.target.value)} autoFocus />
                )}
              </div>
            </div>
            <div style={s.fieldFull}>
              <label style={s.label}>자재명</label>
              <div style={supplierSelect && supplierSelect !== DIRECT ? s.inputAuto : s.inputMuted}>
                {supplierSelect && supplierSelect !== DIRECT ? autoMaterial : "업체 선택 시 자동완성"}
              </div>
              <p style={s.note}>발주 계약 정보 기준 자동완성 · 변경 필요 시 담당자 문의</p>
            </div>
          </>
        ) : (
          <>
            <div style={s.infoBox}>
              지입자재는 외주 시공사가 직접 수급한 자재입니다. VMS 출입 기록만 관리하며 계근·송장은 집계에서 제외됩니다.
            </div>
            <div style={s.fieldFull}>
              <label style={s.label}>납품받는 외주사 <span style={s.required}>*</span></label>
              <SearchableSelect
                options={contractList} value={receiverSelect}
                onChange={setReceiverSelect} placeholder="외주사 검색 또는 선택..."
              />
              {receiverSelect === DIRECT && (
                <input style={s.directInput} placeholder="외주사명 직접 입력" value={receiverDirect} onChange={e => setReceiverDirect(e.target.value)} autoFocus />
              )}
            </div>
            <div style={s.fieldFull}>
              <label style={s.label}>납품하는 회사</label>
              <input style={s.input} placeholder="납품업체명 직접 입력 (선택사항)" value={jipipSupplier} onChange={e => setJipipSupplier(e.target.value)} />
              <p style={s.note}>당사 계약 대상이 아니므로 선택 입력</p>
            </div>
          </>
        )}
      </div>

      {/* 차량 및 반입 정보 */}
      <div style={s.card}>
        <p style={s.sectionLabel}>차량 및 반입 정보</p>
        <div style={s.fieldRow}>
          <div>
            <label style={s.label}>차량번호 <span style={s.required}>*</span></label>
            <input style={s.input} placeholder="예: 경기 12가 3456" value={vehicleNo} onChange={e => setVehicleNo(e.target.value)} />
          </div>
          <div>
            <label style={s.label}>반입 예정일 <span style={s.required}>*</span></label>
            <input type="date" style={s.input} value={planDate} onChange={e => setPlanDate(e.target.value)} />
          </div>
        </div>
      </div>

      {/* 송장 업로드 - 지급자재만 */}
      {materialType === "지급" && (
        <div style={s.card}>
          <p style={s.sectionLabel}>송장 업로드</p>
          <label
            style={{
              display: "block",
              border: `2px dashed ${dragOver ? "var(--accent)" : "var(--line)"}`,
              borderRadius: 8, padding: "24px", textAlign: "center",
              cursor: "pointer",
              background: dragOver ? "var(--accent-soft)" : "var(--bg-soft)",
              transition: "all 0.15s",
            }}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <input type="file" accept=".jpg,.jpeg,.png,.pdf" style={{ display: "none" }} onChange={handleFileChange} />
            <p style={{ fontSize: 22, margin: "0 0 6px" }}>📎</p>
            <p style={{ fontSize: 13, color: "var(--ink-2)", margin: 0 }}>
              {fileName || "파일을 드래그하거나 클릭하여 선택"}
            </p>
            <p style={{ fontSize: 11, color: "var(--ink-3)", margin: "4px 0 0" }}>JPG, PNG, PDF · 최대 10MB</p>
          </label>
          <p style={s.note}>실물 송장 사진 촬영 후 업로드 가능 · 사무실 스캔 후 업로드도 가능</p>
        </div>
      )}

      <button
        style={submitted ? s.successBtn : s.submitBtn}
        onClick={submitted ? undefined : handleSubmit}
      >
        {submitted ? "✅ 등록 완료!" : "사전등록 완료"}
      </button>
    </div>
  );
}