import { z } from "zod";

/**
 * 1. 외부 API 응답 스키마 (External DTO)
 * 외부 시스템의 날짜 형식(string)과 필드명(snake_case)을 그대로 정의합니다.
 */
export const ExternalProductSchema = z.object({
  product_id: z.number(),
  item_nm: z.string(),
  regist_dt: z.string(), // "20240416" 형태의 문자열
  price_val: z.number(),
});

/**
 * 2. 우리 시스템 내부 도메인 모델 (Internal Domain Model)
 */
export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPING",
  CANCELLED = "CANCELLED",
}

export interface InternalProduct {
  id: string;
  name: string;
  createdAt: Date;
  price: number;
  formattedPrice: string; // ₩1,200,000 형태
  status: OrderStatus;    // 표준화된 Enum
  description: string;    // Null Safety 보장
}

/**
 * 3. 트랜스포머 (Transformer / Mapper)
 */
const STATUS_MAP: Record<string, OrderStatus> = {
  "01": OrderStatus.PENDING,
  "02": OrderStatus.PROCESSING,
  "SH": OrderStatus.SHIPPED,
  "XX": OrderStatus.CANCELLED,
};

export const transformProduct = (external: any): InternalProduct => {
  return {
    id: String(external.product_id),
    name: external.item_nm,
    // 1. 날짜 정규화
    createdAt: new Date(
      parseInt(external.regist_dt.substring(0, 4)),
      parseInt(external.regist_dt.substring(4, 6)) - 1,
      parseInt(external.regist_dt.substring(6, 8))
    ),
    // 2. 금액 및 통화 정규화 (Formatting)
    price: external.price_val,
    formattedPrice: new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(external.price_val),
    // 3. 상태 코드 매핑 (Normalization)
    status: STATUS_MAP[external.status_cd] || OrderStatus.PENDING,
    // 4. Null Safety 및 기본값 처리
    description: external.desc || "상세 설명이 준비 중입니다.",
  };
};
