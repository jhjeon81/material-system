export const todayList = [
  { date: "2026-06-01", time: "08:12", car: "경남 12가 3456", vendor: "(주)동양건재", material: "레미콘",        spec: "25-270-18",     qty: "6.0",  unit: "㎥",  weight: "14.2" },
  { date: "2026-06-01", time: "09:18", car: "경기 34나 5678", vendor: "(주)동양건재", material: "레미콘",        spec: "25-270-18",     qty: "6.0",  unit: "㎥",  weight: "14.0" },
  { date: "2026-06-02", time: "08:38", car: "서울 56다 7890", vendor: "현대제철",     material: "철근",          spec: "D10 (SD500)",   qty: "18.3", unit: "ton", weight: "18.3" },
  { date: "2026-06-02", time: "10:08", car: "부산 78라 1234", vendor: "동국제강",     material: "철근",          spec: "D13 (SD500)",   qty: "15.0", unit: "ton", weight: "15.0" },
  { date: "2026-06-03", time: "09:08", car: "인천 90마 2345", vendor: "(주)동천",     material: "경질우레탄보드", spec: "PUR II-A 130T", qty: "31",   unit: "㎡",  weight: "0.9"  },
  { date: "2026-06-03", time: "10:38", car: "경남 11바 3456", vendor: "한일시멘트",   material: "벌크시멘트",    spec: "포틀랜드 1종",  qty: "20.0", unit: "ton", weight: "20.0" },
  { date: "2026-06-04", time: "08:23", car: "012가 3456",     vendor: "(주)동양건재", material: "레미콘",        spec: "25-300-18",     qty: "6.0",  unit: "㎥",  weight: "14.1" },
  { date: "2026-06-04", time: "09:38", car: "345나 6789",     vendor: "현대제철",     material: "철근",          spec: "D16 (SD600)",   qty: "25.0", unit: "ton", weight: "25.0" },
  { date: "2026-06-05", time: "08:08", car: "경기 67다 8901", vendor: "동국제강",     material: "철근",          spec: "D19 (SD600)",   qty: "18.0", unit: "ton", weight: "18.0" },
  { date: "2026-06-05", time: "10:08", car: "서울 89라 2345", vendor: "(주)동천",     material: "경질우레탄보드", spec: "PUR II-A 200T", qty: "79",   unit: "㎡",  weight: "2.1"  },
  { date: "2026-06-06", time: "08:48", car: "678마 9012",     vendor: "(주)동양건재", material: "레미콘",        spec: "25-270-18",     qty: "6.0",  unit: "㎥",  weight: "14.3" },
  { date: "2026-06-06", time: "11:08", car: "경남 23바 4567", vendor: "한일시멘트",   material: "벌크시멘트",    spec: "포틀랜드 1종",  qty: "20.0", unit: "ton", weight: "20.0" },
  { date: "2026-06-07", time: "08:28", car: "부산 45사 6789", vendor: "(주)동양건재", material: "레미콘",        spec: "25-300-18",     qty: "6.0",  unit: "㎥",  weight: "14.0" },
  { date: "2026-06-07", time: "09:53", car: "인천 67아 8901", vendor: "현대제철",     material: "철근",          spec: "D10 (SD500)",   qty: "12.0", unit: "ton", weight: "12.0" },
  { date: "2026-06-08", time: "08:58", car: "901자 2345",     vendor: "(주)동천",     material: "경질우레탄보드", spec: "PUR II-A 100T", qty: "50",   unit: "㎡",  weight: "1.2"  },
  { date: "2026-06-08", time: "10:23", car: "경기 12차 3456", vendor: "동국제강",     material: "철근",          spec: "D22 (SD600)",   qty: "8.0",  unit: "ton", weight: "8.0"  },
  { date: "2026-06-09", time: "08:12", car: "경남 34카 5678", vendor: "(주)동양건재", material: "레미콘",        spec: "25-270-18",     qty: "6.0",  unit: "㎥",  weight: "14.2" },
  { date: "2026-06-09", time: "09:31", car: "서울 56타 7890", vendor: "현대제철",     material: "철근",          spec: "D13 (SD500)",   qty: "2.0",  unit: "ton", weight: "2.0"  },
  { date: "2026-06-09", time: "11:15", car: "234파 5678",     vendor: "대한토건",     material: "토사",          spec: "-",             qty: "15.0", unit: "ton", weight: "15.0" },
  { date: "2026-06-09", time: "11:02", car: "경기 78하 9012", vendor: "한일시멘트",   material: "벌크시멘트",    spec: "포틀랜드 1종",  qty: "20.0", unit: "ton", weight: "20.0" },
];

export const budgetData = [
  {
    category: "철근", unit: "ton",
    vendors: ["현대제철", "동국제강"],
    items: [
      { spec: "D10 (SD500)",  budget: 50,  order: 45,  actual: 30.3, vendor: "현대제철" },
      { spec: "D13 (SD500)",  budget: 80,  order: 75,  actual: 17.0, vendor: "현대제철" },
      { spec: "D16 (SD600)",  budget: 120, order: 110, actual: 25.0, vendor: "동국제강" },
      { spec: "D19 (SD600)",  budget: 200, order: 180, actual: 18.0, vendor: "동국제강" },
      { spec: "D22 (SD600)",  budget: 40,  order: 35,  actual: 8.0,  vendor: "동국제강" },
      { spec: "D22 (SD600S)", budget: 10,  order: 5,   actual: 0,    vendor: "현대제철" },
    ]
  },
  {
    category: "레미콘", unit: "㎥",
    vendors: ["(주)동양건재", "(주)유진기업"],
    items: [
      { spec: "25-50-18",  budget: 100, order: 90,  actual: 0,    vendor: "(주)유진기업" },
      { spec: "25-240-15", budget: 150, order: 130, actual: 0,    vendor: "(주)동양건재" },
      { spec: "25-270-18", budget: 400, order: 380, actual: 40.5, vendor: "(주)동양건재" },
      { spec: "25-300-18", budget: 250, order: 220, actual: 26.1, vendor: "(주)동양건재" },
      { spec: "25-300-21", budget: 100, order: 80,  actual: 0,    vendor: "(주)유진기업" },
    ]
  },
  {
    category: "경질우레탄보드", unit: "㎡",
    vendors: ["(주)동천"],
    items: [
      { spec: "PUR II-A 100T", budget: 200, order: 180, actual: 50,  vendor: "(주)동천" },
      { spec: "PUR II-A 130T", budget: 300, order: 280, actual: 31,  vendor: "(주)동천" },
      { spec: "PUR II-A 200T", budget: 400, order: 380, actual: 79,  vendor: "(주)동천" },
    ]
  },
  {
    category: "벌크시멘트", unit: "ton",
    vendors: ["한일시멘트"],
    items: [
      { spec: "포틀랜드 1종", budget: 200, order: 180, actual: 60, vendor: "한일시멘트" },
    ]
  },
  {
    category: "PHC파일", unit: "본",
    vendors: ["삼일PHC"],
    items: [
      { spec: "PHC-A 400", budget: 60, order: 60, actual: 0, vendor: "삼일PHC" },
      { spec: "PHC-B 400", budget: 60, order: 60, actual: 0, vendor: "삼일PHC" },
    ]
  },
  {
    category: "알폼", unit: "㎡",
    vendors: ["알폼코리아"],
    items: [
      { spec: "알폼 표준", budget: 300, order: 0, actual: 0, vendor: "알폼코리아" },
    ]
  },
  {
    category: "PF보드", unit: "㎡",
    vendors: ["KCC"],
    items: [
      { spec: "PF보드 50T", budget: 200, order: 0, actual: 0, vendor: "KCC" },
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