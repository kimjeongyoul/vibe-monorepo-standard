import { z } from "zod";
import { api } from "./client";

const UploadResponseSchema = z.object({
  success: z.boolean(),
  url: z.string().url(),
});

export const uploadService = {
  /**
   * 상품 이미지 또는 첨부 파일을 업로드합니다. (Multipart)
   * @param file 브라우저 File 객체
   */
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file); // 서버에서 기대하는 필드명

    return api.postMultipart(
      "/api/v1/upload",
      formData,
      UploadResponseSchema
    );
  },

  /**
   * 다중 파일 업로드 예시
   */
  uploadMultipleFiles: async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    return api.postMultipart(
      "/api/v1/upload/multiple",
      formData,
      UploadResponseSchema // 다중 업로드용 스키마는 상황에 맞게 정의
    );
  }
};
