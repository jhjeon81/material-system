const d = (offsetDays) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0,10);
};

export const orderList = [
  { id: "O001", company: "한라엔컴ENCOM 천안사업소",    material: "레미콘" },
  { id: "O002", company: "이연산업공업(주)",             material: "철근" },
  { id: "O003", company: "(주)한국특강",                material: "철근" },
  { id: "O004", company: "(주)정우산업",                material: "경질우레탄보드" },
  { id: "O005", company: "한라시멘트(주) 인천",          material: "고로슬래그시멘트" },
  { id: "O006", company: "아이에스동서(주) 청양공장",    material: "PHC파일" },
  { id: "O007", company: "(주)리빙라인 인터내셔날",      material: "타일" },
  { id: "O008", company: "(주)케이씨씨 서울영업소",      material: "PF보드" },
  { id: "O009", company: "한일시멘트(주) 영월공장",      material: "벌크시멘트" },
  { id: "O010", company: "(주)한창테크",                material: "AL창호" },
];

export const contractList = [
  { id: "C001", company: "우설건설(주)",      type: "골조공사" },
  { id: "C002", company: "원일공영(주)",      type: "습식(조적·미장)" },
  { id: "C003", company: "청해진건설(주)",    type: "골조공사(2공구)" },
  { id: "C004", company: "시강건설(주)",      type: "타일공사" },
  { id: "C005", company: "화성방수(주)",      type: "방수공사" },
  { id: "C006", company: "화인마르미(주)",    type: "석공사" },
  { id: "C007", company: "대성설비(주)",      type: "기계설비" },
  { id: "C008", company: "한빛전기(주)",      type: "전기공사" },
  { id: "C009", company: "하나유리(주)",      type: "유리공사" },
  { id: "C010", company: "삼성창호(주)",      type: "창호공사" },
];

export const preRegisterList = [
  // ─── 오늘 지급 입고완료 6건 ───
  {
    id: "PR101", type: "지급",
    receiver: "IPARK현대산업개발(주)", supplier: "한라시멘트(주) 인천",
    material: "고로슬래그시멘트", vehicleNo: "경남 78라 1234",
    planDate: d(0), status: "입고완료", invoiceFile: "invoice_PR101.pdf",
  },
  {
    id: "PR102", type: "지급",
    receiver: "IPARK현대산업개발(주)", supplier: "이연산업공업(주)",
    material: "철근", vehicleNo: "서울 11가 1111",
    planDate: d(0), status: "입고완료", invoiceFile: "invoice_PR102.pdf",
  },
  {
    id: "PR103", type: "지급",
    receiver: "IPARK현대산업개발(주)", supplier: "(주)한국특강",
    material: "철근", vehicleNo: "경기 22나 2222",
    planDate: d(0), status: "입고완료", invoiceFile: "invoice_PR103.pdf",
  },
  {
    id: "PR104", type: "지급",
    receiver: "IPARK현대산업개발(주)", supplier: "한라엔컴ENCOM 천안사업소",
    material: "레미콘", vehicleNo: "부산 55마 5555",
    planDate: d(0), status: "입고완료", invoiceFile: "invoice_PR104.pdf",
  },
  {
    id: "PR105", type: "지급",
    receiver: "IPARK현대산업개발(주)", supplier: "(주)정우산업",
    material: "경질우레탄보드", vehicleNo: "인천 66다 6666",
    planDate: d(0), status: "입고완료", invoiceFile: "invoice_PR105.pdf",
  },
  {
    id: "PR106", type: "지급",
    receiver: "IPARK현대산업개발(주)", supplier: "한라엔컴ENCOM 천안사업소",
    material: "레미콘", vehicleNo: "경기 77나 7777",
    planDate: d(0), status: "입고완료", invoiceFile: "invoice_PR106.pdf",
  },

  // ─── 오늘 지급 반입예정 2건 ───
  {
    id: "PR107", type: "지급",
    receiver: "IPARK현대산업개발(주)", supplier: "이연산업공업(주)",
    material: "철근", vehicleNo: "서울 88가 8888",
    planDate: d(0), status: "반입예정", invoiceFile: null,
  },
  {
    id: "PR108", type: "지급",
    receiver: "IPARK현대산업개발(주)", supplier: "한라시멘트(주) 인천",
    material: "고로슬래그시멘트", vehicleNo: "경남 99라 9999",
    planDate: d(0), status: "반입예정", invoiceFile: null,
  },

  // ─── 오늘 지입 입고완료 3건 ───
  {
    id: "PR109", type: "지입",
    receiver: "원일공영(주)", supplier: "시멘트벽돌자재",
    material: "시멘트벽돌", vehicleNo: "부산 90마 5678",
    planDate: d(0), status: "입고완료", invoiceFile: null,
  },
  {
    id: "PR110", type: "지입",
    receiver: "우설건설(주)", supplier: "거푸집자재",
    material: "거푸집", vehicleNo: "인천 33다 3333",
    planDate: d(0), status: "입고완료", invoiceFile: null,
  },
  {
    id: "PR111", type: "지입",
    receiver: "청해진건설(주)", supplier: "결속선자재",
    material: "결속선", vehicleNo: "경기 44나 4444",
    planDate: d(0), status: "입고완료", invoiceFile: null,
  },

  // ─── 오늘 지입 반입예정 1건 ───
  {
    id: "PR112", type: "지입",
    receiver: "시강건설(주)", supplier: "타일접착제",
    material: "타일접착제", vehicleNo: "서울 55가 5555",
    planDate: d(0), status: "반입예정", invoiceFile: null,
  },

  // ─── 내일 지급 8건 ───
  {
    id: "PR201", type: "지급",
    receiver: "IPARK현대산업개발(주)", supplier: "한라엔컴ENCOM 천안사업소",
    material: "레미콘", vehicleNo: "서울 34나 5678",
    planDate: d(1), status: "반입예정", invoiceFile: null,
  },
  {
    id: "PR202", type: "지급",
    receiver: "IPARK현대산업개발(주)", supplier: "(주)한국특강",
    material: "철근", vehicleNo: "경기 11나 1111",
    planDate: d(1), status: "반입예정", invoiceFile: "invoice_PR202.pdf",
  },
  {
    id: "PR203", type: "지급",
    receiver: "IPARK현대산업개발(주)", supplier: "한라시멘트(주) 인천",
    material: "고로슬래그시멘트", vehicleNo: "경기 22가 2222",
    planDate: d(1), status: "반입예정", invoiceFile: null,
  },
  {
    id: "PR204", type: "지급",
    receiver: "IPARK현대산업개발(주)", supplier: "이연산업공업(주)",
    material: "철근", vehicleNo: "서울 33나 3333",
    planDate: d(1), status: "반입예정", invoiceFile: "invoice_PR204.pdf",
  },
  {
    id: "PR205", type: "지급",
    receiver: "IPARK현대산업개발(주)", supplier: "(주)정우산업",
    material: "경질우레탄보드", vehicleNo: "부산 44마 4444",
    planDate: d(1), status: "반입예정", invoiceFile: null,
  },
  {
    id: "PR206", type: "지급",
    receiver: "IPARK현대산업개발(주)", supplier: "한라엔컴ENCOM 천안사업소",
    material: "레미콘", vehicleNo: "인천 55다 5555",
    planDate: d(1), status: "반입예정", invoiceFile: null,
  },
  {
    id: "PR207", type: "지급",
    receiver: "IPARK현대산업개발(주)", supplier: "(주)한국특강",
    material: "철근", vehicleNo: "서울 66가 6666",
    planDate: d(1), status: "반입예정", invoiceFile: null,
  },
  {
    id: "PR208", type: "지급",
    receiver: "IPARK현대산업개발(주)", supplier: "한라시멘트(주) 인천",
    material: "고로슬래그시멘트", vehicleNo: "경남 77라 7777",
    planDate: d(1), status: "반입예정", invoiceFile: null,
  },

  // ─── 내일 지입 4건 ───
  {
    id: "PR209", type: "지입",
    receiver: "우설건설(주)", supplier: "거푸집자재",
    material: "거푸집", vehicleNo: "인천 88다 8888",
    planDate: d(1), status: "반입예정", invoiceFile: null,
  },
  {
    id: "PR210", type: "지입",
    receiver: "원일공영(주)", supplier: "시멘트벽돌자재",
    material: "시멘트벽돌", vehicleNo: "경기 99나 9999",
    planDate: d(1), status: "반입예정", invoiceFile: null,
  },
  {
    id: "PR211", type: "지입",
    receiver: "청해진건설(주)", supplier: "결속선자재",
    material: "결속선", vehicleNo: "부산 11마 1111",
    planDate: d(1), status: "반입예정", invoiceFile: null,
  },
  {
    id: "PR212", type: "지입",
    receiver: "화성방수(주)", supplier: "방수시트자재",
    material: "방수시트", vehicleNo: "서울 22가 2222",
    planDate: d(1), status: "반입예정", invoiceFile: null,
  },
];