export const vehicleList = [
  // 정상 출차완료
  { date: "2026-06-01", car: "경남 12가 3456", driver: "김철수", vendor: "(주)동양건재", material: "레미콘",        spec: "25-270-18",     unit: "m3",  qty: "6.0",
    time_vms_in: "08:05", time_scale1: "08:12", time_scale2: "08:51", time_vms_out: "08:55",
    weight_in: 24.2, weight_out: 10.0, weight_net: 14.2 },
  { date: "2026-06-01", car: "경기 34나 5678", driver: "이영수", vendor: "(주)동양건재", material: "레미콘",        spec: "25-270-18",     unit: "m3",  qty: "6.0",
    time_vms_in: "09:10", time_scale1: "09:18", time_scale2: "10:01", time_vms_out: "10:05",
    weight_in: 24.0, weight_out: 10.0, weight_net: 14.0 },
  { date: "2026-06-02", car: "서울 56다 7890", driver: "박민수", vendor: "현대제철",     material: "철근",          spec: "D10 (SD500)",   unit: "ton", qty: "18.3",
    time_vms_in: "08:30", time_scale1: "08:38", time_scale2: "09:20", time_vms_out: "09:25",
    weight_in: 31.3, weight_out: 13.0, weight_net: 18.3 },
  { date: "2026-06-02", car: "부산 78라 1234", driver: "최지훈", vendor: "동국제강",     material: "철근",          spec: "D13 (SD500)",   unit: "ton", qty: "15.0",
    time_vms_in: "10:00", time_scale1: "10:08", time_scale2: "10:55", time_vms_out: "11:00",
    weight_in: 28.0, weight_out: 13.0, weight_net: 15.0 },
  { date: "2026-06-03", car: "인천 90마 2345", driver: "정수진", vendor: "(주)동천",     material: "경질우레탄보드", spec: "PUR II-A 130T", unit: "m2",  qty: "31",
    time_vms_in: "09:00", time_scale1: "09:08", time_scale2: "09:45", time_vms_out: "09:50",
    weight_in: 5.9, weight_out: 5.0, weight_net: 0.9 },
  { date: "2026-06-03", car: "경남 11바 3456", driver: "강동원", vendor: "한일시멘트",   material: "벌크시멘트",    spec: "포틀랜드 1종",  unit: "ton", qty: "20.0",
    time_vms_in: "10:30", time_scale1: "10:38", time_scale2: "11:20", time_vms_out: "11:25",
    weight_in: 40.0, weight_out: 20.0, weight_net: 20.0 },
  { date: "2026-06-04", car: "012가 3456",     driver: "윤재현", vendor: "(주)동양건재", material: "레미콘",        spec: "25-300-18",     unit: "m3",  qty: "6.0",
    time_vms_in: "08:15", time_scale1: "08:23", time_scale2: "09:05", time_vms_out: "09:10",
    weight_in: 24.1, weight_out: 10.0, weight_net: 14.1 },
  { date: "2026-06-05", car: "경기 67다 8901", driver: "오민준", vendor: "동국제강",     material: "철근",          spec: "D19 (SD600)",   unit: "ton", qty: "18.0",
    time_vms_in: "08:00", time_scale1: "08:08", time_scale2: "08:55", time_vms_out: "09:00",
    weight_in: 31.0, weight_out: 13.0, weight_net: 18.0 },
  { date: "2026-06-05", car: "서울 89라 2345", driver: "송태양", vendor: "(주)동천",     material: "경질우레탄보드", spec: "PUR II-A 200T", unit: "m2",  qty: "79",
    time_vms_in: "10:00", time_scale1: "10:08", time_scale2: "10:50", time_vms_out: "10:55",
    weight_in: 7.1, weight_out: 5.0, weight_net: 2.1 },
  { date: "2026-06-06", car: "678마 9012",     driver: "한지우", vendor: "(주)동양건재", material: "레미콘",        spec: "25-270-18",     unit: "m3",  qty: "6.0",
    time_vms_in: "08:40", time_scale1: "08:48", time_scale2: "09:30", time_vms_out: "09:35",
    weight_in: 24.3, weight_out: 10.0, weight_net: 14.3 },
  { date: "2026-06-06", car: "경남 23바 4567", driver: "류승현", vendor: "한일시멘트",   material: "벌크시멘트",    spec: "포틀랜드 1종",  unit: "ton", qty: "20.0",
    time_vms_in: "11:00", time_scale1: "11:08", time_scale2: "11:55", time_vms_out: "12:00",
    weight_in: 40.0, weight_out: 20.0, weight_net: 20.0 },
  { date: "2026-06-07", car: "부산 45사 6789", driver: "김민재", vendor: "(주)동양건재", material: "레미콘",        spec: "25-300-18",     unit: "m3",  qty: "6.0",
    time_vms_in: "08:20", time_scale1: "08:28", time_scale2: "09:10", time_vms_out: "09:15",
    weight_in: 24.0, weight_out: 10.0, weight_net: 14.0 },
  { date: "2026-06-08", car: "901자 2345",     driver: "박준서", vendor: "(주)동천",     material: "경질우레탄보드", spec: "PUR II-A 100T", unit: "m2",  qty: "50",
    time_vms_in: "08:50", time_scale1: "08:58", time_scale2: "09:40", time_vms_out: "09:45",
    weight_in: 6.2, weight_out: 5.0, weight_net: 1.2 },
  { date: "2026-06-08", car: "경기 12차 3456", driver: "최현우", vendor: "동국제강",     material: "철근",          spec: "D22 (SD600)",   unit: "ton", qty: "8.0",
    time_vms_in: "10:15", time_scale1: "10:23", time_scale2: "11:10", time_vms_out: "11:15",
    weight_in: 21.0, weight_out: 13.0, weight_net: 8.0 },
  { date: "2026-06-09", car: "경남 34카 5678", driver: "김철수", vendor: "(주)동양건재", material: "레미콘",        spec: "25-270-18",     unit: "m3",  qty: "6.0",
    time_vms_in: "08:05", time_scale1: "08:12", time_scale2: "08:51", time_vms_out: "08:55",
    weight_in: 24.2, weight_out: 10.0, weight_net: 14.2 },

  // ① VMS입차 없음 + 계근 있음 → 빨간불
  { date: "2026-06-09", car: "234파 5678",     driver: "홍길동", vendor: "대한토건",     material: "토사",          spec: "-",             unit: "ton", qty: "15.0",
    time_vms_in: null,    time_scale1: "11:15", time_scale2: "11:45", time_vms_out: null,
    weight_in: 28.0, weight_out: 13.0, weight_net: 15.0 },

  // ② VMS입차 O + 1차계근 없음 → 빨간불
  { date: "2026-06-09", car: "경기 78하 9012", driver: "강동원", vendor: "한일시멘트",   material: "벌크시멘트",    spec: "포틀랜드 1종",  unit: "ton", qty: "20.0",
    time_vms_in: "10:55", time_scale1: null,    time_scale2: null,    time_vms_out: null,
    weight_in: 40.0, weight_out: null, weight_net: null },

  // ③ 2차계근 없음 + VMS출차 없음 → 노란불 (하역중)
  { date: "2026-06-09", car: "서울 56타 7890", driver: "이영수", vendor: "현대제철",     material: "철근",          spec: "D13 (SD500)",   unit: "ton", qty: "2.0",
    time_vms_in: "09:22", time_scale1: "09:31", time_scale2: null,    time_vms_out: null,
    weight_in: 10.7, weight_out: null, weight_net: null },

  // ④ 2차계근 없음 + VMS출차 있음 → 빨간불
  { date: "2026-06-09", car: "345나 6789",     driver: "임성호", vendor: "현대제철",     material: "철근",          spec: "D16 (SD600)",   unit: "ton", qty: "25.0",
    time_vms_in: "09:30", time_scale1: "09:38", time_scale2: null,    time_vms_out: "10:30",
    weight_in: 38.0, weight_out: null, weight_net: null },

  // ⑤ 전날 2차계근 미완료 → 빨간불
  { date: "2026-06-08", car: "인천 67아 8901", driver: "이준호", vendor: "현대제철",     material: "철근",          spec: "D10 (SD500)",   unit: "ton", qty: "12.0",
    time_vms_in: "09:45", time_scale1: "09:53", time_scale2: null,    time_vms_out: null,
    weight_in: 25.0, weight_out: null, weight_net: null },

  // ⑥ VMS입출차 O + 1차계근 X + 2차계근 X → 두 개 빨간불
  { date: "2026-06-09", car: "경북 45마 6789", driver: "신동훈", vendor: "(주)동양건재", material: "레미콘",        spec: "25-300-21",     unit: "m3",  qty: "6.0",
    time_vms_in: "11:30", time_scale1: null,    time_scale2: null,    time_vms_out: "12:10",
    weight_in: 24.0, weight_out: null, weight_net: null },
];

export function getStatus(v) {
  const hasVmsIn  = !!v.time_vms_in;
  const hasScale1 = !!v.time_scale1;
  const hasScale2 = !!v.time_scale2;
  const hasVmsOut = !!v.time_vms_out;

  const today   = new Date().toISOString().slice(0,10);
  const isPastDay = v.date < today;

  if (!hasVmsIn && (hasScale1 || hasScale2)) return "이상징후";
  if (hasVmsIn && !hasScale1)                return "이상징후";
  if (hasScale1 && !hasScale2 && hasVmsOut)  return "이상징후";
  if (isPastDay && hasScale1 && !hasScale2)  return "이상징후";
  if (hasScale1 && !hasScale2)               return "하역중";
  if (hasVmsIn && hasScale1 && hasScale2)    return "출차완료";
  return "입차중";
}

export const vehicleWithStatus = vehicleList.map(v => ({ ...v, status: getStatus(v) }));

const today = new Date().toISOString().slice(0,10);
export const todayVehicles = vehicleWithStatus.filter(v => v.date === today);