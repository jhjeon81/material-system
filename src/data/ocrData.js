const d = (offsetDays) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0,10);
};

const WEIGHT_BASED = ["레미콘", "철근", "벌크시멘트", "고로슬래그시멘트"];
export const isWeightBased = (material) => WEIGHT_BASED.includes(material);

export function getValidation(o) {
  const issues = [];
  if (o.conf < 70) issues.push({ type: "danger",  msg: `AI 인식률 낮음 (${o.conf}%)` });
  else if (o.conf < 90) issues.push({ type: "warning", msg: `AI 인식률 확인 필요 (${o.conf}%)` });
  if (!o.has_order) issues.push({ type: "danger", msg: "발주 내역 없음" });
  if (isWeightBased(o.material) && o.weight_invoice && o.weight_scale) {
    const diff = Math.abs(o.weight_scale - o.weight_invoice) / o.weight_invoice * 100;
    if (diff > 10) issues.push({ type: "danger",  msg: `계근 중량 차이 ${diff.toFixed(1)}% 초과` });
    else if (diff > 5) issues.push({ type: "warning", msg: `계근 중량 차이 ${diff.toFixed(1)}% (확인 필요)` });
  }
  const status = issues.some(i => i.type === "danger") ? "오류"
               : issues.some(i => i.type === "warning") ? "검증필요" : "정상";
  return { status, issues };
}

export const ocrList = [
  // ─── 과거 데이터 ───
  { date: d(-9), time: "08:12", car: "경기 12가 3456", invoice: "INV-20240101-001", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-270-18",     qty: "6.0",  unit: "m3",  conf: 97, has_order: true,  weight_invoice: 14.2, weight_scale: 14.2 },
  { date: d(-9), time: "09:18", car: "서울 34나 5678", invoice: "INV-20240101-002", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-270-18",     qty: "6.0",  unit: "m3",  conf: 95, has_order: true,  weight_invoice: 14.0, weight_scale: 14.0 },
  { date: d(-8), time: "08:38", car: "인천 56다 7890", invoice: "INV-20240102-001", vendor: "(주)한국특강",             material: "철근",            spec: "D10 (SD500)",   qty: "18.3", unit: "ton", conf: 98, has_order: true,  weight_invoice: 18.3, weight_scale: 18.3 },
  { date: d(-8), time: "10:08", car: "경남 78라 1234", invoice: "INV-20240102-002", vendor: "이연산업공업(주)",          material: "철근",            spec: "D13 (SD500)",   qty: "15.0", unit: "ton", conf: 92, has_order: true,  weight_invoice: 15.0, weight_scale: 15.0 },
  { date: d(-7), time: "09:08", car: "부산 90마 2345", invoice: "INV-20240103-001", vendor: "(주)정우산업",             material: "경질우레탄보드",   spec: "PUR II-A 130T", qty: "31",   unit: "m2",  conf: 88, has_order: true,  weight_invoice: null, weight_scale: null },
  { date: d(-7), time: "10:38", car: "경기 11나 3456", invoice: "INV-20240103-002", vendor: "한라시멘트(주) 인천",       material: "고로슬래그시멘트", spec: "1종",           qty: "20.0", unit: "ton", conf: 96, has_order: true,  weight_invoice: 20.0, weight_scale: 20.0 },
  { date: d(-6), time: "08:23", car: "경기 12가 3456", invoice: "INV-20240104-001", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-300-18",     qty: "6.0",  unit: "m3",  conf: 94, has_order: true,  weight_invoice: 14.1, weight_scale: 14.1 },
  { date: d(-6), time: "09:38", car: "경남 45라 6789", invoice: "INV-20240104-002", vendor: "(주)한국특강",             material: "철근",            spec: "D16 (SD600)",   qty: "25.0", unit: "ton", conf: 65, has_order: true,  weight_invoice: 25.0, weight_scale: 25.0 },
  { date: d(-5), time: "08:08", car: "서울 67나 8901", invoice: "INV-20240105-001", vendor: "이연산업공업(주)",          material: "철근",            spec: "D19 (SD600)",   qty: "18.0", unit: "ton", conf: 97, has_order: true,  weight_invoice: 18.0, weight_scale: 18.0 },
  { date: d(-5), time: "10:08", car: "인천 89다 2345", invoice: "INV-20240105-002", vendor: "(주)정우산업",             material: "경질우레탄보드",   spec: "PUR II-A 200T", qty: "79",   unit: "m2",  conf: 91, has_order: true,  weight_invoice: null, weight_scale: null },
  { date: d(-4), time: "08:48", car: "경남 78라 9012", invoice: "INV-20240106-001", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-270-18",     qty: "6.0",  unit: "m3",  conf: 93, has_order: true,  weight_invoice: 14.3, weight_scale: 14.3 },
  { date: d(-4), time: "11:08", car: "경기 23나 4567", invoice: "INV-20240106-002", vendor: "한라시멘트(주) 인천",       material: "고로슬래그시멘트", spec: "1종",           qty: "20.0", unit: "ton", conf: 96, has_order: true,  weight_invoice: 20.0, weight_scale: 20.0 },
  { date: d(-3), time: "08:28", car: "경남 45라 6789", invoice: "INV-20240107-001", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-300-18",     qty: "6.0",  unit: "m3",  conf: 95, has_order: true,  weight_invoice: 14.0, weight_scale: 14.0 },
  { date: d(-3), time: "09:53", car: "부산 67마 8901", invoice: "INV-20240107-002", vendor: "(주)한국특강",             material: "철근",            spec: "D10 (SD500)",   qty: "12.0", unit: "ton", conf: 89, has_order: true,  weight_invoice: 12.0, weight_scale: 12.0 },
  { date: d(-2), time: "08:58", car: "부산 90마 2345", invoice: "INV-20240108-001", vendor: "(주)정우산업",             material: "경질우레탄보드",   spec: "PUR II-A 100T", qty: "50",   unit: "m2",  conf: 96, has_order: true,  weight_invoice: null, weight_scale: null },
  { date: d(-2), time: "10:23", car: "서울 12나 3456", invoice: "INV-20240108-002", vendor: "이연산업공업(주)",          material: "철근",            spec: "D22 (SD600)",   qty: "8.0",  unit: "ton", conf: 72, has_order: false, weight_invoice: 8.0,  weight_scale: 8.0  },
  { date: d(-1), time: "08:12", car: "경기 34가 5678", invoice: "INV-20240109-001", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-270-18",     qty: "6.0",  unit: "m3",  conf: 97, has_order: true,  weight_invoice: 14.2, weight_scale: 14.2 },
  { date: d(-1), time: "09:31", car: "인천 56다 7890", invoice: "INV-20240109-002", vendor: "(주)한국특강",             material: "철근",            spec: "D13 (SD500)",   qty: "2.0",  unit: "ton", conf: 94, has_order: true,  weight_invoice: 2.0,  weight_scale: 2.0  },
  { date: d(-1), time: "11:02", car: "서울 78나 9012", invoice: "INV-20240109-003", vendor: "한라시멘트(주) 인천",       material: "고로슬래그시멘트", spec: "1종",           qty: "20.0", unit: "ton", conf: 95, has_order: true,  weight_invoice: 20.0, weight_scale: 20.0 },

  // ─── 오늘 지급 입고완료 6건 ───
  { date: d(0), time: "08:18", car: "경남 78라 1234", invoice: "INV-TODAY-001", vendor: "한라시멘트(주) 인천",       material: "고로슬래그시멘트", spec: "1종",           qty: "20.0", unit: "ton", conf: 96, has_order: true,  weight_invoice: 20.0, weight_scale: 20.0 },
  { date: d(0), time: "08:38", car: "서울 11가 1111", invoice: "INV-TODAY-002", vendor: "이연산업공업(주)",          material: "철근",            spec: "D13 (SD500)",   qty: "15.0", unit: "ton", conf: 94, has_order: true,  weight_invoice: 15.0, weight_scale: 15.0 },
  { date: d(0), time: "09:08", car: "경기 22나 2222", invoice: "INV-TODAY-003", vendor: "(주)한국특강",             material: "철근",            spec: "D16 (SD600)",   qty: "18.0", unit: "ton", conf: 98, has_order: true,  weight_invoice: 18.0, weight_scale: 18.0 },
  { date: d(0), time: "09:38", car: "부산 55마 5555", invoice: "INV-TODAY-004", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-270-18",     qty: "6.0",  unit: "m3",  conf: 97, has_order: true,  weight_invoice: 14.2, weight_scale: 14.2 },
  { date: d(0), time: "10:08", car: "인천 66다 6666", invoice: "INV-TODAY-005", vendor: "(주)정우산업",             material: "경질우레탄보드",   spec: "PUR II-A 130T", qty: "50",   unit: "m2",  conf: 85, has_order: true,  weight_invoice: null, weight_scale: null },
  { date: d(0), time: "10:38", car: "경기 77나 7777", invoice: "INV-TODAY-006", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-300-18",     qty: "6.0",  unit: "m3",  conf: 62, has_order: true,  weight_invoice: 14.1, weight_scale: 15.8 },
];