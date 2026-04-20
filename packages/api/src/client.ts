import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { z } from "zod";
import { MOCK_EXTERNAL_PRODUCTS } from "./mockData";

class ApiClient {
  private axiosInstance: AxiosInstance;
  private isMockMode: boolean = process.env.NEXT_PUBLIC_MOCK_MODE === "true";

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 30000, // 파일 업로드를 고려해 타임아웃을 넉넉하게 설정
    });
  }

  private async request<T>(config: AxiosRequestConfig, schema: z.ZodSchema<T>): Promise<T> {
    if (this.isMockMode) {
      console.log(`[Mock API] Intercepted: ${config.url}`);
      await new Promise(resolve => setTimeout(resolve, 800));
      if (config.url?.includes("/products")) return schema.parse(MOCK_EXTERNAL_PRODUCTS as any);
      // 업로드 모킹: 성공 응답 시뮬레이션
      if (config.method === "POST" && config.headers?.["Content-Type"]?.includes("multipart/form-data")) {
        return schema.parse({ success: true, url: "https://mock-storage.com/uploaded-file.png" } as any);
      }
      throw new Error("Mock data not found");
    }

    const response = await this.axiosInstance(config);
    return schema.parse(response.data);
  }

  async get<T>(url: string, schema: z.ZodSchema<T>, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, url, method: "GET" }, schema);
  }

  async post<T>(url: string, data: any, schema: z.ZodSchema<T>, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, url, method: "POST", data }, schema);
  }

  /**
   * 멀티파트(파일 업로드) 요청 처리
   * @param url API 주소
   * @param formData 파일이 포함된 FormData 객체
   * @param schema 결과 검증용 Zod 스키마
   */
  async postMultipart<T>(url: string, formData: FormData, schema: z.ZodSchema<T>, config?: AxiosRequestConfig): Promise<T> {
    return this.request({
      ...config,
      url,
      method: "POST",
      data: formData,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data", // 멀티파트 명시
      },
    }, schema);
  }
}

export const api = new ApiClient(process.env.NEXT_PUBLIC_API_URL || "");
