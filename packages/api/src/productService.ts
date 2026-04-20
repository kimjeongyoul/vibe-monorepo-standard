import { api } from "./client";
import { 
  ExternalProductSchema, 
  transformProduct, 
  InternalProduct 
} from "./transformers";

/**
 * 상품 서비스 (Product Service)
 * 외부 API와의 통신을 담당하며, 데이터를 내부 도메인 모델로 정규화합니다.
 */
export const productService = {
  /**
   * 상품 상세 정보를 가져와서 내부 모델(InternalProduct)로 반환합니다.
   * 
   * 이 로직의 흐름:
   * 1. GET 요청으로 데이터를 가져옴
   * 2. ExternalProductSchema로 외부 데이터의 유효성을 검증 (Zod)
   * 3. 검증이 통과되면 transformProduct 함수를 실행하여 우리 모델로 변환
   * 4. 최종적으로 깨끗한 InternalProduct 객체를 반환
   */
  getProductDetail: async (productId: string): Promise<InternalProduct> => {
    return api.getWithTransform(
      `/api/v1/external/products/${productId}`,
      ExternalProductSchema, // (1) 검증 스키마
      transformProduct       // (2) 변환 함수
    );
  },

  /**
   * [비교] 만약 일반 get을 쓴다면?
   * 데이터가 외부 스펙 그대로 들어오기 때문에, 사용하는 곳마다 .regist_dt 등을 
   * 일일이 변환해야 하는 번거로움과 위험이 있습니다.
   */
  getRawProductDetail: async (productId: string) => {
    return api.get(`/api/v1/external/products/${productId}`, ExternalProductSchema);
  }
};
