// ... (기존 ApiClient 클래스 내부)

  /**
   * 외부 데이터를 가져와서 우리 도메인 모델로 즉시 변환하여 반환합니다.
   * @param url API 주소
   * @param schema 외부 데이터 검증용 Zod 스키마
   * @param transformer 우리 객체로 변환해줄 함수
   */
  async getWithTransform<TExternal, TInternal>(
    url: string,
    schema: z.ZodSchema<TExternal>,
    transformer: (data: TExternal) => TInternal
  ): Promise<TInternal> {
    const response = await this.axiosInstance.get(url);
    // 1. 데이터 검증
    const validatedData = schema.parse(response.data);
    // 2. 우리 데이터로 변환 (Data Normalization)
    return transformer(validatedData);
  }
