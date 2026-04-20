/**
 * 실무와 동일한 시뮬레이션을 위해 
 * 외부 API의 snake_case와 비표준 날짜 형식을 가진 가짜 데이터를 정의합니다.
 */
export const MOCK_EXTERNAL_PRODUCTS = [
  {
    product_id: 101,
    item_nm: "AI-Native 가이드북 (Mock)",
    regist_dt: "20240416",
    price_val: 45000,
    status_cd: "02", // PROCESSING
    desc: "바이브 코딩의 정수를 담은 실무 지침서입니다."
  },
  {
    product_id: 102,
    item_nm: "시니어 아키텍처 키트 (Mock)",
    regist_dt: "20240415",
    price_val: 120000,
    status_cd: "SH", // SHIPPING
  }
];
