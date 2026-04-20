import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { z } from "zod";

/**
 * Zod Schema를 기반으로 하는 고신뢰성 Type-Safe API Client
 * 서버 응답 데이터의 런타임 검증 및 내부 도메인 모델로의 자동 변환(Normalization)을 지원합니다.
 */
class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    });

    this.axiosInstance.interceptors.request.use((config) => {
      const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  /**
   * 기본적인 GET 요청 (데이터 검증 포함)
   */
  async get<T>(url: string, schema: z.ZodSchema<T>, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get(url, config);
    return schema.parse(response.data);
  }

  /**
   * 외부 API의 지저분한 데이터를 우리 도메인 객체로 변환하여 가져오기
   * Anti-Corruption Layer(부패 방지 계층)의 핵심 기능을 수행합니다.
   * 
   * @param url API 주소
   * @param schema 외부 데이터 검증용 Zod 스키마
   * @param transformer 내부 모델로 변환할 함수
   */
  async getWithTransform<TExternal, TInternal>(
    url: string,
    schema: z.ZodSchema<TExternal>,
    transformer: (data: TExternal) => TInternal,
    config?: AxiosRequestConfig
  ): Promise<TInternal> {
    const response = await this.axiosInstance.get(url, config);
    const validatedData = schema.parse(response.data);
    return transformer(validatedData);
  }

  async post<T>(url: string, data: any, schema: z.ZodSchema<T>): Promise<T> {
    const response = await this.axiosInstance.post(url, data);
    return schema.parse(response.data);
  }
}

export const api = new ApiClient(process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000");
