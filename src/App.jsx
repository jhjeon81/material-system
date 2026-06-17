import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Material from "./pages/Material";
import Vehicle from "./pages/Vehicle";
import OCR from "./pages/OCR";
import PreRegister from "./pages/PreRegister";
import PostRegister from "./pages/PostRegister";
import Closing from "./pages/Closing";

const navItems = [
  { to: "/",            label: "Overview",        desc: "종합 현황" },
  { to: "/vehicle",     label: "차량입출 PROCESS", desc: "VMS / 계근" },
  { to: "/material",    label: "자재 세부현황",    desc: "입고 · 예산 · 투입" },
  { to: "/ocr",         label: "송장데이터",        desc: "AI 송장인식" },
  { to: "/postregister",label: "미등록 사후관리",   desc: "차량 분류 · 송장등록" },
  { to: "/closing",     label: "기성 관리",         desc: "업체별 투입 · 기성 확정" },
];

const SITE = {
  code: "C1090C", name: "천안 아이파크시티 5단지",
  type: "민수주택 · 건축", amount: "2.821억", period: "2026.04 ~ 2029.01",
};

function Sidebar() {
  const location = useLocation();
  const isPreRegActive = location.pathname === "/preregister";
  return (
    <aside style={{
      width: "var(--sidebar-w)", minHeight: "100vh", flexShrink: 0,
      background: "var(--bg-soft)", borderRight: "1px solid var(--line)",
      padding: "22px 14px", display: "flex", flexDirection: "column",
      position: "sticky", top: 0, height: "100vh", overflowY: "auto",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 8px", marginBottom: "16px" }}>
        <div style={{
          width: "24px", height: "24px", background: "var(--ink)",
          borderRadius: "var(--radius-sm)", display: "grid", placeItems: "center",
          color: "#fff", fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)", fontWeight: "var(--fw-bold)"
        }}>DX</div>
        <div>
          <div style={{ fontWeight: "var(--fw-semibold)", fontSize: "var(--fs-sm)", letterSpacing: "-0.02em", color: "var(--ink)" }}>통합자재관리</div>
          <div style={{ fontSize: "10px", color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>MATERIAL MGMT</div>
        </div>
      </div>

      <div style={{
        padding: "12px", borderRadius: "var(--radius)", marginBottom: "20px",
        background: "var(--accent-soft)", border: "1px solid var(--accent)",
      }}>
        <div style={{ fontSize: "10px", color: "var(--accent)", fontFamily: "var(--font-mono)", letterSpacing: "0.04em", marginBottom: "6px", fontWeight: "var(--fw-semibold)" }}>CURRENT SITE</div>
        <div style={{ fontSize: "var(--fs-sm)", fontWeight: "var(--fw-bold)", color: "var(--ink)", marginBottom: "6px", letterSpacing: "-0.02em" }}>{SITE.name}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          {[["현장코드",SITE.code],["공사구분",SITE.type],["공사금액",SITE.amount],["공사기간",SITE.period]].map(([k,v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "10px" }}>
              <span style={{ color: "var(--ink-3)" }}>{k}</span>
              <span style={{ color: "var(--ink-2)", fontFamily: "var(--font-mono)", fontWeight: "var(--fw-medium)" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: "10px", fontFamily: "var(--font-mono)", letterSpacing: "0.06em", color: "var(--ink-3)", padding: "0 8px 8px", textTransform: "uppercase" }}>Navigation</div>
      <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {navItems.map(item => {
          const active = location.pathname === item.to;
          return (
            <Link key={item.to} to={item.to}>
              <div style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "7px 10px", borderRadius: "var(--radius-sm)",
                background: active ? "var(--bg-tint)" : "transparent",
                color: active ? "var(--ink)" : "var(--ink-2)",
                fontWeight: active ? "var(--fw-medium)" : "var(--fw-normal)",
                fontSize: "var(--fs-base)", transition: "all var(--transition-fast)",
              }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: active ? "var(--accent)" : "var(--ink-3)", flexShrink: 0 }} />
                <div>
                  <div>{item.label}</div>
                  <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginTop: "1px" }}>{item.desc}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* 차량 사전등록 CTA */}
      <div style={{ marginTop: "auto", borderTop: "1px solid var(--line)", paddingTop: "16px" }}>
        <Link to="/preregister">
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "12px 14px", borderRadius: "var(--radius)",
            background: isPreRegActive ? "#FFF3E0" : "var(--bg-elevated)",
            border: isPreRegActive ? "2px solid #E65100" : "2px solid #E65100",
            transition: "all var(--transition-fast)",
          }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "var(--radius-sm)",
              background: "#E65100", flexShrink: 0,
              display: "grid", placeItems: "center",
              fontSize: "18px", color: "#fff",
            }}>＋</div>
            <div>
              <div style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-semibold)", color: "#E65100", letterSpacing: "-0.01em" }}>차량 사전등록</div>
              <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginTop: "2px" }}>차단기 자동 개방 연동</div>
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "32px", overflowY: "auto", background: "var(--bg)" }}>
          <Routes>
            <Route path="/"             element={<Dashboard />} />
            <Route path="/material"     element={<Material />} />
            <Route path="/vehicle"      element={<Vehicle />} />
            <Route path="/ocr"          element={<OCR />} />
            <Route path="/preregister"  element={<PreRegister />} />
            <Route path="/postregister" element={<PostRegister />} />
            <Route path="/closing"      element={<Closing />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}