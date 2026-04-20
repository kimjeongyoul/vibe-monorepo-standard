import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { z } from "zod";

/**
 * Zod Schema를 기반으로 하는 Type-Safe API Client
 * 서버 응답 데이터가 기대한 스키마와 일치하는지 런타임에 검증합니다.
 */
class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    });

    // 요청 인터셉터: 공통 인증 토큰 처리 등
    this.axiosInstance.interceptors.request.use((config) => {
      const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  /**
   * Zod 스키마를 이용한 GET 요청
   * @param url 요청 경로
   * @param schema 데이터 검증용 Zod 스키마
   */
  async get<T>(url: string, schema: z.ZodSchema<T>, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get(url, config);
    // 런타임 스키마 검증: 서버 데이터가 오염되었거나 타입이 다르면 여기서 에러 발생
    return schema.parse(response.data);
  }

  async post<T>(url: string, data: any, schema: z.ZodSchema<T>): Promise<T> {
    const response = await this.axiosInstance.post(url, data);
    return schema.parse(response.data);
  }
}

export const api = new ApiClient(process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000");
