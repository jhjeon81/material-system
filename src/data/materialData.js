const d = (offsetDays) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0,10);
};

export const todayList = [
  // ─── 과거 데이터 ───
  { date: d(-9), time: "08:12", car: "경기 12가 3456", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-270-18",     qty: "6.0",  unit: "m3",  weight: "14.2" },
  { date: d(-9), time: "09:18", car: "서울 34나 5678", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-270-18",     qty: "6.0",  unit: "m3",  weight: "14.0" },
  { date: d(-8), time: "08:38", car: "인천 56다 7890", vendor: "(주)한국특강",             material: "철근",            spec: "D10 (SD500)",   qty: "18.3", unit: "ton", weight: "18.3" },
  { date: d(-8), time: "10:08", car: "경남 78라 1234", vendor: "이연산업공업(주)",          material: "철근",            spec: "D13 (SD500)",   qty: "15.0", unit: "ton", weight: "15.0" },
  { date: d(-7), time: "09:08", car: "부산 90마 2345", vendor: "(주)정우산업",             material: "경질우레탄보드",   spec: "PUR II-A 130T", qty: "31",   unit: "m2",  weight: "0.9"  },
  { date: d(-7), time: "10:38", car: "경기 11나 3456", vendor: "한라시멘트(주) 인천",       material: "고로슬래그시멘트", spec: "1종",           qty: "20.0", unit: "ton", weight: "20.0" },
  { date: d(-6), time: "08:23", car: "경기 12가 3456", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-300-18",     qty: "6.0",  unit: "m3",  weight: "14.1" },
  { date: d(-6), time: "09:38", car: "경남 45라 6789", vendor: "(주)한국특강",             material: "철근",            spec: "D16 (SD600)",   qty: "25.0", unit: "ton", weight: "25.0" },
  { date: d(-5), time: "08:08", car: "서울 67나 8901", vendor: "이연산업공업(주)",          material: "철근",            spec: "D19 (SD600)",   qty: "18.0", unit: "ton", weight: "18.0" },
  { date: d(-5), time: "10:08", car: "인천 89다 2345", vendor: "(주)정우산업",             material: "경질우레탄보드",   spec: "PUR II-A 200T", qty: "79",   unit: "m2",  weight: "2.1"  },
  { date: d(-4), time: "08:48", car: "경남 78라 9012", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-270-18",     qty: "6.0",  unit: "m3",  weight: "14.3" },
  { date: d(-4), time: "11:08", car: "경기 23나 4567", vendor: "한라시멘트(주) 인천",       material: "고로슬래그시멘트", spec: "1종",           qty: "20.0", unit: "ton", weight: "20.0" },
  { date: d(-3), time: "08:28", car: "경남 45라 6789", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-300-18",     qty: "6.0",  unit: "m3",  weight: "14.0" },
  { date: d(-3), time: "09:53", car: "부산 67마 8901", vendor: "(주)한국특강",             material: "철근",            spec: "D10 (SD500)",   qty: "12.0", unit: "ton", weight: "12.0" },
  { date: d(-2), time: "08:58", car: "부산 90마 2345", vendor: "(주)정우산업",             material: "경질우레탄보드",   spec: "PUR II-A 100T", qty: "50",   unit: "m2",  weight: "1.2"  },
  { date: d(-2), time: "10:23", car: "서울 12나 3456", vendor: "이연산업공업(주)",          material: "철근",            spec: "D22 (SD600)",   qty: "8.0",  unit: "ton", weight: "8.0"  },
  { date: d(-1), time: "08:12", car: "경기 34가 5678", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-270-18",     qty: "6.0",  unit: "m3",  weight: "14.2" },
  { date: d(-1), time: "09:31", car: "인천 56다 7890", vendor: "(주)한국특강",             material: "철근",            spec: "D13 (SD500)",   qty: "2.0",  unit: "ton", weight: "2.0"  },
  { date: d(-1), time: "11:02", car: "서울 78나 9012", vendor: "한라시멘트(주) 인천",       material: "고로슬래그시멘트", spec: "1종",           qty: "20.0", unit: "ton", weight: "20.0" },

  // ─── 오늘 지급 입고완료 6건 ───
  { date: d(0), time: "08:18", car: "경남 78라 1234", vendor: "한라시멘트(주) 인천",       material: "고로슬래그시멘트", spec: "1종",           qty: "20.0", unit: "ton", weight: "20.0" },
  { date: d(0), time: "08:38", car: "서울 11가 1111", vendor: "이연산업공업(주)",          material: "철근",            spec: "D13 (SD500)",   qty: "15.0", unit: "ton", weight: "15.0" },
  { date: d(0), time: "09:08", car: "경기 22나 2222", vendor: "(주)한국특강",             material: "철근",            spec: "D16 (SD600)",   qty: "18.0", unit: "ton", weight: "18.0" },
  { date: d(0), time: "09:38", car: "부산 55마 5555", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-270-18",     qty: "6.0",  unit: "m3",  weight: "14.2" },
  { date: d(0), time: "10:08", car: "인천 66다 6666", vendor: "(주)정우산업",             material: "경질우레탄보드",   spec: "PUR II-A 130T", qty: "50",   unit: "m2",  weight: "1.2"  },
  { date: d(0), time: "10:38", car: "경기 77나 7777", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-300-18",     qty: "6.0",  unit: "m3",  weight: "14.1" },

  // ─── 오늘 미등록 지급 2건 (사후관리 시연용 - 지급으로 확정 시 표시) ───
  { date: d(0), time: "10:21", car: "경기 33나 1111", vendor: "한라엔컴ENCOM 천안사업소", material: "레미콘",          spec: "25-270-18",     qty: "6.0",  unit: "m3",  weight: "14.2" },
  { date: d(0), time: "11:08", car: "인천 44다 2222", vendor: "(주)한국특강",             material: "철근",            spec: "D13 (SD500)",   qty: "15.0", unit: "ton", weight: "15.0" },
];

export const budgetData = [
  {
    category: "철근", unit: "ton",
    vendors: ["(주)한국특강", "이연산업공업(주)"],
    items: [
      { spec: "D10 (SD500)",  budget: 50,  order: 45,  actual: 30.3, vendor: "(주)한국특강" },
      { spec: "D13 (SD500)",  budget: 80,  order: 75,  actual: 17.0, vendor: "(주)한국특강" },
      { spec: "D16 (SD600)",  budget: 120, order: 110, actual: 25.0, vendor: "이연산업공업(주)" },
      { spec: "D19 (SD600)",  budget: 200, order: 180, actual: 18.0, vendor: "이연산업공업(주)" },
      { spec: "D22 (SD600)",  budget: 40,  order: 35,  actual: 8.0,  vendor: "이연산업공업(주)" },
      { spec: "D22 (SD600S)", budget: 10,  order: 5,   actual: 0,    vendor: "(주)한국특강" },
    ]
  },
  {
    category: "레미콘", unit: "m3",
    vendors: ["한라엔컴ENCOM 천안사업소"],
    items: [
      { spec: "25-50-18",  budget: 100, order: 90,  actual: 0,    vendor: "한라엔컴ENCOM 천안사업소" },
      { spec: "25-240-15", budget: 150, order: 130, actual: 0,    vendor: "한라엔컴ENCOM 천안사업소" },
      { spec: "25-270-18", budget: 400, order: 380, actual: 40.5, vendor: "한라엔컴ENCOM 천안사업소" },
      { spec: "25-300-18", budget: 250, order: 220, actual: 26.1, vendor: "한라엔컴ENCOM 천안사업소" },
      { spec: "25-300-21", budget: 100, order: 80,  actual: 0,    vendor: "한라엔컴ENCOM 천안사업소" },
    ]
  },
  {
    category: "경질우레탄보드", unit: "m2",
    vendors: ["(주)정우산업"],
    items: [
      { spec: "PUR II-A 100T", budget: 200, order: 180, actual: 50, vendor: "(주)정우산업" },
      { spec: "PUR II-A 130T", budget: 300, order: 280, actual: 31, vendor: "(주)정우산업" },
      { spec: "PUR II-A 200T", budget: 400, order: 380, actual: 79, vendor: "(주)정우산업" },
    ]
  },
  {
    category: "고로슬래그시멘트", unit: "ton",
    vendors: ["한라시멘트(주) 인천"],
    items: [
      { spec: "1종", budget: 200, order: 180, actual: 60, vendor: "한라시멘트(주) 인천" },
    ]
  },
  {
    category: "PHC파일", unit: "본",
    vendors: ["아이에스동서(주) 청양공장"],
    items: [
      { spec: "PHC-A 400", budget: 60, order: 60, actual: 0, vendor: "아이에스동서(주) 청양공장" },
      { spec: "PHC-B 400", budget: 60, order: 60, actual: 0, vendor: "아이에스동서(주) 청양공장" },
    ]
  },
  {
    category: "타일", unit: "m2",
    vendors: ["(주)리빙라인 인터내셔날"],
    items: [
      { spec: "타일 일반", budget: 300, order: 0, actual: 0, vendor: "(주)리빙라인 인터내셔날" },
    ]
  },
  {
    category: "PF보드", unit: "m2",
    vendors: ["(주)케이씨씨 서울영업소"],
    items: [
      { spec: "PF보드 50T", budget: 200, order: 0, actual: 0, vendor: "(주)케이씨씨 서울영업소" },
    ]
  },
];

export const accumulated = budgetData.map(cat => ({
  material: cat.category,
  unit: cat.unit,
  ordered:   cat.items.reduce((s,i) => s + i.order,  0),
  delivered: cat.items.reduce((s,i) => s + i.actual, 0),
  vendors: cat.vendors,
}));