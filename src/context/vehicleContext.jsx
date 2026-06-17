import { createContext, useContext, useState } from "react";
import { vehicleWithStatus } from "../data/vehicleData";
import { preRegisterList } from "../data/preRegisterData";

const preRegNos = new Set(preRegisterList.map(r => r.vehicleNo.replace(/\s/g, "")));
const isPreReg  = (car) => preRegNos.has((car || "").replace(/\s/g, ""));

const unmatchedInit = vehicleWithStatus.filter(v =>
  v.status === "입고완료" && !isPreReg(v.car)
);

// 샘플 OCR 결과 - 차량번호별 매핑
const OCR_SAMPLE = {
  "경기33나1111": { vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘 25-270-18", weightNet: 14.2 },
  "인천44다2222": { vendor: "(주)한국특강",             material: "철근 D13 (SD500)", weightNet: 15.0 },
};

function getOcrSample(car) {
  const key = (car || "").replace(/\s/g, "");
  return OCR_SAMPLE[key] || {
    vendor: "납품업체",
    material: "자재명",
    weightNet: null,
  };
}

const VehicleContext = createContext(null);

export function VehicleProvider({ children }) {
  const [unmatchedRows, setUnmatchedRows] = useState(
    unmatchedInit.map(v => ({
      ...v,
      classified:       false,
      materialType:     null,
      receiver:         null,
      invoiceStatus:    "대기중",
      fileName:         null,
      resolvedVendor:   null,
      resolvedMaterial: null,
    }))
  );

  function classifyJipip(car, date, receiver) {
    setUnmatchedRows(prev => prev.map(r =>
      r.car === car && r.date === date
        ? {
            ...r,
            classified:       true,
            materialType:     "지입",
            receiver,
            invoiceStatus:    "사후확정",
            resolvedVendor:   null,
            resolvedMaterial: "-",  // 지입은 자재 관리 안 함
          }
        : r
    ));
  }

  function classifyJipup(car, date, fileName) {
    // OCR 처리중
    setUnmatchedRows(prev => prev.map(r =>
      r.car === car && r.date === date
        ? { ...r, invoiceStatus: "OCR처리중", fileName }
        : r
    ));
    // 1.5초 후 OCR 완료 → 샘플 데이터 반영
    setTimeout(() => {
      const sample = getOcrSample(car);
      setUnmatchedRows(prev => prev.map(r =>
        r.car === car && r.date === date
          ? {
              ...r,
              classified:       true,
              materialType:     "지급",
              invoiceStatus:    "사후확정",
              resolvedVendor:   sample.vendor,
              resolvedMaterial: sample.material,
              weight_net:       sample.weightNet || r.weight_net,
            }
          : r
      ));
    }, 1500);
  }

  return (
    <VehicleContext.Provider value={{ unmatchedRows, classifyJipip, classifyJipup }}>
      {children}
    </VehicleContext.Provider>
  );
}

export function useVehicleContext() {
  return useContext(VehicleContext);
}