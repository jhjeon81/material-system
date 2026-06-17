const d = (offsetDays) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0,10);
};

// 지입 차량번호 Set
import { preRegisterList } from "./preRegisterData";
const jipipCarNos = new Set(
  preRegisterList
    .filter(r => r.type === "지입")
    .map(r => r.vehicleNo.replace(/\s/g, ""))
);

export function getStatus(v) {
  // 지입 차량은 이상징후 로직 제외
  if (jipipCarNos.has((v.car || "").replace(/\s/g, ""))) return "지입";

  const todayStr = new Date().toISOString().slice(0,10);
  const isPastDay = v.date < todayStr;
  const hasVmsIn  = !!v.time_vms_in;
  const hasScale1 = !!v.time_scale1;
  const hasScale2 = !!v.time_scale2;
  const hasVmsOut = !!v.time_vms_out;

  if (!hasVmsIn && (hasScale1 || hasScale2)) return "이상징후";
  if (hasVmsIn && !hasScale1) return "이상징후";
  if (hasScale1 && !hasScale2 && (hasVmsOut || isPastDay)) return "이상징후";
  if (hasScale2) return "입고완료";
  if (hasScale1) return "진행중";
  if (hasVmsIn)  return "입차중";
  return "입차중";
}

export const vehicleList = [
  // ─── 과거 데이터 ───
  { date: d(-9), car: "경기 12가 3456", driver: "김철수", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-270-18",     unit: "m3",  qty: "6.0",
    time_vms_in: "08:05", time_scale1: "08:12", time_scale2: "08:51", time_vms_out: "08:55", weight_in: 24.2, weight_out: 10.0, weight_net: 14.2 },
  { date: d(-9), car: "서울 34나 5678", driver: "박영수", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-270-18",     unit: "m3",  qty: "6.0",
    time_vms_in: "09:10", time_scale1: "09:18", time_scale2: "10:01", time_vms_out: "10:05", weight_in: 24.0, weight_out: 10.0, weight_net: 14.0 },
  { date: d(-8), car: "인천 56다 7890", driver: "이상훈", vendor: "(주)한국특강",             material: "철근",            spec: "D10 (SD500)",   unit: "ton", qty: "18.3",
    time_vms_in: "08:30", time_scale1: "08:38", time_scale2: "09:20", time_vms_out: "09:25", weight_in: 31.3, weight_out: 13.0, weight_net: 18.3 },
  { date: d(-8), car: "경남 78라 1234", driver: "최민호", vendor: "이연산업공업(주)",          material: "철근",            spec: "D13 (SD500)",   unit: "ton", qty: "15.0",
    time_vms_in: "10:00", time_scale1: "10:08", time_scale2: "10:55", time_vms_out: "11:00", weight_in: 28.0, weight_out: 13.0, weight_net: 15.0 },
  { date: d(-7), car: "부산 90마 2345", driver: "정수철", vendor: "(주)정우산업",             material: "경질우레탄보드",   spec: "PUR II-A 130T", unit: "m2",  qty: "31",
    time_vms_in: "09:00", time_scale1: "09:08", time_scale2: "09:45", time_vms_out: "09:50", weight_in: 5.9, weight_out: 5.0, weight_net: 0.9 },
  { date: d(-7), car: "경기 11나 3456", driver: "강동원", vendor: "한라시멘트(주) 인천",       material: "고로슬래그시멘트", spec: "1종",           unit: "ton", qty: "20.0",
    time_vms_in: "10:20", time_scale1: "10:28", time_scale2: "11:10", time_vms_out: "11:15", weight_in: 33.0, weight_out: 13.0, weight_net: 20.0 },
  { date: d(-6), car: "경기 12가 3456", driver: "김철수", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-300-18",     unit: "m3",  qty: "6.0",
    time_vms_in: "08:15", time_scale1: "08:23", time_scale2: "09:05", time_vms_out: "09:10", weight_in: 24.1, weight_out: 10.0, weight_net: 14.1 },
  { date: d(-6), car: "경남 45라 6789", driver: "윤성훈", vendor: "(주)한국특강",             material: "철근",            spec: "D16 (SD600)",   unit: "ton", qty: "25.0",
    time_vms_in: "09:30", time_scale1: "09:38", time_scale2: "10:25", time_vms_out: "10:30", weight_in: 38.0, weight_out: 13.0, weight_net: 25.0 },
  { date: d(-5), car: "서울 67나 8901", driver: "임재원", vendor: "이연산업공업(주)",          material: "철근",            spec: "D19 (SD600)",   unit: "ton", qty: "18.0",
    time_vms_in: "08:00", time_scale1: "08:08", time_scale2: "08:55", time_vms_out: "09:00", weight_in: 31.0, weight_out: 13.0, weight_net: 18.0 },
  { date: d(-5), car: "인천 89다 2345", driver: "한지수", vendor: "(주)정우산업",             material: "경질우레탄보드",   spec: "PUR II-A 200T", unit: "m2",  qty: "79",
    time_vms_in: "10:00", time_scale1: "10:08", time_scale2: "10:50", time_vms_out: "10:55", weight_in: 15.1, weight_out: 13.0, weight_net: 2.1 },
  { date: d(-4), car: "경남 78라 9012", driver: "오민준", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-270-18",     unit: "m3",  qty: "6.0",
    time_vms_in: "08:40", time_scale1: "08:48", time_scale2: "09:30", time_vms_out: "09:35", weight_in: 24.3, weight_out: 10.0, weight_net: 14.3 },
  { date: d(-4), car: "경기 23나 4567", driver: "서태양", vendor: "한라시멘트(주) 인천",       material: "고로슬래그시멘트", spec: "1종",           unit: "ton", qty: "20.0",
    time_vms_in: "11:00", time_scale1: "11:08", time_scale2: "11:55", time_vms_out: "12:00", weight_in: 33.0, weight_out: 13.0, weight_net: 20.0 },
  { date: d(-3), car: "경남 45라 6789", driver: "윤성훈", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-300-18",     unit: "m3",  qty: "6.0",
    time_vms_in: "08:20", time_scale1: "08:28", time_scale2: "09:10", time_vms_out: "09:15", weight_in: 24.0, weight_out: 10.0, weight_net: 14.0 },
  { date: d(-3), car: "부산 67마 8901", driver: "조현우", vendor: "(주)한국특강",             material: "철근",            spec: "D10 (SD500)",   unit: "ton", qty: "12.0",
    time_vms_in: "09:45", time_scale1: "09:53", time_scale2: "10:40", time_vms_out: "10:45", weight_in: 25.0, weight_out: 13.0, weight_net: 12.0 },
  { date: d(-2), car: "부산 90마 2345", driver: "정수철", vendor: "(주)정우산업",             material: "경질우레탄보드",   spec: "PUR II-A 100T", unit: "m2",  qty: "50",
    time_vms_in: "08:50", time_scale1: "08:58", time_scale2: "09:40", time_vms_out: "09:45", weight_in: 14.2, weight_out: 13.0, weight_net: 1.2 },
  { date: d(-2), car: "서울 12나 3456", driver: "권민재", vendor: "이연산업공업(주)",          material: "철근",            spec: "D22 (SD600)",   unit: "ton", qty: "8.0",
    time_vms_in: "10:15", time_scale1: "10:23", time_scale2: "11:10", time_vms_out: "11:15", weight_in: 21.0, weight_out: 13.0, weight_net: 8.0 },
  { date: d(-1), car: "경기 34가 5678", driver: "남도현", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-270-18",     unit: "m3",  qty: "6.0",
    time_vms_in: "08:05", time_scale1: "08:12", time_scale2: "08:55", time_vms_out: "09:00", weight_in: 24.2, weight_out: 10.0, weight_net: 14.2 },
  { date: d(-1), car: "인천 56다 7890", driver: "이상훈", vendor: "(주)한국특강",             material: "철근",            spec: "D13 (SD500)",   unit: "ton", qty: "2.0",
    time_vms_in: "09:25", time_scale1: "09:31", time_scale2: "10:15", time_vms_out: "10:20", weight_in: 15.0, weight_out: 13.0, weight_net: 2.0 },
  { date: d(-1), car: "서울 78나 9012", driver: "홍길동", vendor: "한라시멘트(주) 인천",       material: "고로슬래그시멘트", spec: "1종",           unit: "ton", qty: "20.0",
    time_vms_in: "11:00", time_scale1: "11:08", time_scale2: "11:55", time_vms_out: "12:00", weight_in: 33.0, weight_out: 13.0, weight_net: 20.0 },

  // ─── 오늘 지급 사전등록 입고완료 6건 ───
  { date: d(0), car: "경남 78라 1234", driver: "최민호", vendor: "한라시멘트(주) 인천",       material: "고로슬래그시멘트", spec: "1종",           unit: "ton", qty: "20.0",
    time_vms_in: "08:10", time_scale1: "08:18", time_scale2: "09:00", time_vms_out: "09:05", weight_in: 33.0, weight_out: 13.0, weight_net: 20.0 },
  { date: d(0), car: "서울 11가 1111", driver: "임재원", vendor: "이연산업공업(주)",          material: "철근",            spec: "D13 (SD500)",   unit: "ton", qty: "15.0",
    time_vms_in: "08:30", time_scale1: "08:38", time_scale2: "09:20", time_vms_out: "09:25", weight_in: 28.0, weight_out: 13.0, weight_net: 15.0 },
  { date: d(0), car: "경기 22나 2222", driver: "윤성훈", vendor: "(주)한국특강",             material: "철근",            spec: "D16 (SD600)",   unit: "ton", qty: "18.0",
    time_vms_in: "09:00", time_scale1: "09:08", time_scale2: "09:50", time_vms_out: "09:55", weight_in: 31.0, weight_out: 13.0, weight_net: 18.0 },
  { date: d(0), car: "부산 55마 5555", driver: "김철수", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-270-18",     unit: "m3",  qty: "6.0",
    time_vms_in: "09:30", time_scale1: "09:38", time_scale2: "10:20", time_vms_out: "10:25", weight_in: 24.2, weight_out: 10.0, weight_net: 14.2 },
  { date: d(0), car: "인천 66다 6666", driver: "정수철", vendor: "(주)정우산업",             material: "경질우레탄보드",   spec: "PUR II-A 130T", unit: "m2",  qty: "50",
    time_vms_in: "10:00", time_scale1: "10:08", time_scale2: "10:50", time_vms_out: "10:55", weight_in: 14.2, weight_out: 13.0, weight_net: 1.2 },
  { date: d(0), car: "경기 77나 7777", driver: "박영수", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-300-18",     unit: "m3",  qty: "6.0",
    time_vms_in: "10:30", time_scale1: "10:38", time_scale2: "11:20", time_vms_out: "11:25", weight_in: 24.1, weight_out: 10.0, weight_net: 14.1 },

  // ─── 오늘 지입 입고완료 3건 ───
  { date: d(0), car: "부산 90마 5678", driver: "-", vendor: "원일공영(주)",    material: "시멘트벽돌", spec: "-", unit: "식", qty: "-",
    time_vms_in: "08:50", time_scale1: null, time_scale2: null, time_vms_out: "09:10", weight_in: null, weight_out: null, weight_net: null },
  { date: d(0), car: "인천 33다 3333", driver: "-", vendor: "우설건설(주)",    material: "거푸집",     spec: "-", unit: "식", qty: "-",
    time_vms_in: "09:20", time_scale1: null, time_scale2: null, time_vms_out: "09:40", weight_in: null, weight_out: null, weight_net: null },
  { date: d(0), car: "경기 44나 4444", driver: "-", vendor: "청해진건설(주)",  material: "결속선",     spec: "-", unit: "식", qty: "-",
    time_vms_in: "10:10", time_scale1: null, time_scale2: null, time_vms_out: "10:30", weight_in: null, weight_out: null, weight_net: null },

  // ─── 오늘 미등록 2건 (사후관리 시연용) ───
  { date: d(0), car: "경기 33나 1111", driver: "홍길동", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",  spec: "25-270-18",   unit: "m3",  qty: "6.0",
    time_vms_in: "10:13", time_scale1: "10:21", time_scale2: "11:05", time_vms_out: "11:10", weight_in: 24.2, weight_out: 10.0, weight_net: 14.2 },
  { date: d(0), car: "인천 44다 2222", driver: "이순신", vendor: "(주)한국특강",             material: "철근",    spec: "D13 (SD500)", unit: "ton", qty: "15.0",
    time_vms_in: "11:00", time_scale1: "11:08", time_scale2: "11:55", time_vms_out: "12:00", weight_in: 28.0, weight_out: 13.0, weight_net: 15.0 },

  // ─── 오늘 이상징후 1건 ───
  { date: d(0), car: "서울 99가 9999", driver: "장보고", vendor: "이연산업공업(주)",          material: "철근",    spec: "D19 (SD600)", unit: "ton", qty: "20.0",
    time_vms_in: null, time_scale1: "11:30", time_scale2: null, time_vms_out: null, weight_in: 33.0, weight_out: null, weight_net: null },
];

export const vehicleWithStatus = vehicleList.map(v => ({ ...v, status: getStatus(v) }));
export const todayVehicles     = vehicleWithStatus.filter(v => v.date === new Date().toISOString().slice(0,10));