const WEIGHT_BASED = ["레미콘", "철근", "벌크시멘트", "고로슬래그시멘트"];
export const isWeightBased = (material) => WEIGHT_BASED.some(m => material.includes(m));

export function getValidation(o) {
  const issues = [];
  if (o.conf < 70)      issues.push({ type: "danger",  msg: "OCR 인식 오류" });
  else if (o.conf < 90) issues.push({ type: "warning", msg: "인식률 낮음" });
  if (!o.ordered)       issues.push({ type: "danger",  msg: "무발주 반입" });
  if (isWeightBased(o.material) && o.weight_invoice && o.weight_scale) {
    const diff = Math.abs(o.weight_scale - o.weight_invoice) / o.weight_invoice * 100;
    if (diff > 10)     issues.push({ type: "danger",  msg: "중량 차이 " + diff.toFixed(1) + "%" });
    else if (diff > 5) issues.push({ type: "warning", msg: "중량 차이 " + diff.toFixed(1) + "%" });
  }
  if (issues.length === 0) return { status: "정상",    issues: [] };
  if (issues.some(i => i.type === "danger")) return { status: "오류", issues };
  return { status: "검증필요", issues };
}

export const ocrList = [
  { date: "2026-06-01", time: "08:12", car: "경남 12가 3456", vendor: "(주)동양건재", material: "레미콘",        spec: "25-270-18",     qty: "6.0",  unit: "m3",  weight_invoice: 14.5, weight_scale: 14.2, conf: 97, ordered: true,  invoice: "DY-2026-0101" },
  { date: "2026-06-01", time: "09:18", car: "경기 34나 5678", vendor: "(주)동양건재", material: "레미콘",        spec: "25-270-18",     qty: "6.0",  unit: "m3",  weight_invoice: 14.5, weight_scale: 14.0, conf: 95, ordered: true,  invoice: "DY-2026-0102" },
  { date: "2026-06-02", time: "08:38", car: "서울 56다 7890", vendor: "현대제철",     material: "철근",          spec: "D10 (SD500)",   qty: "18.3", unit: "ton", weight_invoice: 18.3, weight_scale: 18.3, conf: 92, ordered: true,  invoice: "HS-2026-0201" },
  { date: "2026-06-02", time: "10:08", car: "부산 78라 1234", vendor: "동국제강",     material: "철근",          spec: "D13 (SD500)",   qty: "15.0", unit: "ton", weight_invoice: 15.0, weight_scale: 15.3, conf: 91, ordered: true,  invoice: "DK-2026-0201" },
  { date: "2026-06-03", time: "09:08", car: "인천 90마 2345", vendor: "(주)동천",     material: "경질우레탄보드", spec: "PUR II-A 130T", qty: "31",   unit: "m2",  weight_invoice: null, weight_scale: null, conf: 94, ordered: true,  invoice: "DT-2026-0301" },
  { date: "2026-06-03", time: "10:38", car: "경남 11바 3456", vendor: "한일시멘트",   material: "벌크시멘트",    spec: "포틀랜드 1종",  qty: "20.0", unit: "ton", weight_invoice: 20.0, weight_scale: 20.0, conf: 96, ordered: true,  invoice: "HI-2026-0301" },
  { date: "2026-06-04", time: "08:23", car: "012가 3456",     vendor: "(주)동양건재", material: "레미콘",        spec: "25-300-18",     qty: "6.0",  unit: "m3",  weight_invoice: 14.5, weight_scale: 14.1, conf: 94, ordered: true,  invoice: "DY-2026-0401" },
  { date: "2026-06-04", time: "09:38", car: "345나 6789",     vendor: "현대제철",     material: "철근",          spec: "D16 (SD600)",   qty: "25.0", unit: "ton", weight_invoice: 25.0, weight_scale: 25.0, conf: 93, ordered: true,  invoice: "HS-2026-0401" },
  { date: "2026-06-05", time: "08:08", car: "경기 67다 8901", vendor: "동국제강",     material: "철근",          spec: "D19 (SD600)",   qty: "18.0", unit: "ton", weight_invoice: 18.0, weight_scale: 18.0, conf: 91, ordered: true,  invoice: "DK-2026-0501" },
  { date: "2026-06-05", time: "10:08", car: "서울 89라 2345", vendor: "(주)동천",     material: "경질우레탄보드", spec: "PUR II-A 200T", qty: "79",   unit: "m2",  weight_invoice: null, weight_scale: null, conf: 85, ordered: true,  invoice: "DT-2026-0501" },
  { date: "2026-06-06", time: "08:48", car: "678마 9012",     vendor: "(주)동양건재", material: "레미콘",        spec: "25-270-18",     qty: "6.0",  unit: "m3",  weight_invoice: 14.5, weight_scale: 14.3, conf: 93, ordered: true,  invoice: "DY-2026-0601" },
  { date: "2026-06-06", time: "11:08", car: "경남 23바 4567", vendor: "한일시멘트",   material: "벌크시멘트",    spec: "포틀랜드 1종",  qty: "20.0", unit: "ton", weight_invoice: 20.0, weight_scale: 20.0, conf: 97, ordered: true,  invoice: "HI-2026-0601" },
  { date: "2026-06-07", time: "08:28", car: "부산 45사 6789", vendor: "(주)동양건재", material: "레미콘",        spec: "25-300-18",     qty: "6.0",  unit: "m3",  weight_invoice: 14.5, weight_scale: 14.0, conf: 96, ordered: true,  invoice: "DY-2026-0701" },
  { date: "2026-06-07", time: "09:53", car: "인천 67아 8901", vendor: "현대제철",     material: "철근",          spec: "D10 (SD500)",   qty: "12.0", unit: "ton", weight_invoice: 12.0, weight_scale: 12.0, conf: 88, ordered: true,  invoice: "HS-2026-0701" },
  { date: "2026-06-08", time: "08:58", car: "901자 2345",     vendor: "(주)동천",     material: "경질우레탄보드", spec: "PUR II-A 100T", qty: "50",   unit: "m2",  weight_invoice: null, weight_scale: null, conf: 91, ordered: true,  invoice: "DT-2026-0801" },
  { date: "2026-06-08", time: "10:23", car: "경기 12차 3456", vendor: "동국제강",     material: "철근",          spec: "D22 (SD600)",   qty: "8.0",  unit: "ton", weight_invoice: 8.0,  weight_scale: 8.0,  conf: 94, ordered: true,  invoice: "DK-2026-0801" },
  { date: "2026-06-09", time: "08:12", car: "경남 34카 5678", vendor: "(주)동양건재", material: "레미콘",        spec: "25-270-18",     qty: "6.0",  unit: "m3",  weight_invoice: 14.5, weight_scale: 14.2, conf: 97, ordered: true,  invoice: "DY-2026-0901" },
  { date: "2026-06-09", time: "09:31", car: "서울 56타 7890", vendor: "현대제철",     material: "철근",          spec: "D13 (SD500)",   qty: "2.0",  unit: "ton", weight_invoice: 2.0,  weight_scale: 2.1,  conf: 87, ordered: true,  invoice: "HS-2026-0901" },
  { date: "2026-06-09", time: "11:15", car: "234파 5678",     vendor: "대한토건",     material: "토사",          spec: "-",             qty: "15.0", unit: "ton", weight_invoice: 15.0, weight_scale: 15.0, conf: 96, ordered: false, invoice: "DH-2026-0901" },
  { date: "2026-06-09", time: "11:02", car: "경기 78하 9012", vendor: "한일시멘트",   material: "벌크시멘트",    spec: "포틀랜드 1종",  qty: "20.0", unit: "ton", weight_invoice: 20.0, weight_scale: 20.0, conf: 95, ordered: true,  invoice: "HI-2026-0902" },
];

export const ocrWithValidation = ocrList.map(o => ({ ...o, validation: getValidation(o) }));

const today = new Date().toISOString().slice(0,10);
export const todayOcr = ocrWithValidation.filter(o => o.date === today);