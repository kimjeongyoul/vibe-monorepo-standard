import { z } from "zod";

/**
 * 전역 환경 변수 스키마 정의 (Zod)
 * 앱 실행 시점에 필수 변수 누락이나 타입 오류를 즉시 감지하여 안정성을 확보합니다.
 */
const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:4000"),
  NEXT_PUBLIC_APP_ENV: z.enum(["local", "development", "production"]).default("local"),
  // 보안상 서버 사이드 전용 변수 (클라이언트 노출 방지)
  API_SECRET_KEY: z.string().min(10).optional(),
});

export const validateEnv = () => {
  const result = envSchema.safeParse({
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
    API_SECRET_KEY: process.env.API_SECRET_KEY,
  });

  if (!result.success) {
    console.error("❌ Invalid environment variables:", result.error.format());
    throw new Error("Invalid environment variables");
  }

  return result.data;
};

export const env = validateEnv();
