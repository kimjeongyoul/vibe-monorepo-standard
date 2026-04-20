# Architecture & Security Guidelines

> **Vibe Monorepo Standard의 설계 원칙과 보안 규정**

본 문서는 프로젝트의 유지보수성, 확장성, 보안성을 확보하기 위한 핵심 아키텍처 결정을 기술합니다.

---

## 🛡 1. Environment Variable Management (보안)
본 프로젝트는 **Zod 기반의 환경 변수 검증 레이어**(`packages/config/src/env.ts`)를 도입하여 다음과 같은 이점을 확보합니다.

*   **Fail-fast 전략:** 필수 환경 변수가 누락되거나 타입이 다를 경우, 앱 실행 시점에 즉시 에러를 발생시켜 런타임 오류를 방지합니다.
*   **보안 계층 분리:** `NEXT_PUBLIC_` 접두사를 통해 클라이언트 노출 변수와 서버 전용 변수를 명격히 분리 관리합니다.
*   **환경 일관성:** 로컬, 개발, 상용 환경에 따른 변수 유효성 검사를 자동화합니다.

## 📡 2. Type-Safe API Communication (신뢰성)
단순 호출 방식의 한계를 극복하기 위해 **Axios + Zod 조합의 API Client**를 표준화하였습니다.

*   **Runtime Schema Validation:** 서버 응답 데이터가 기대한 타입과 다를 경우 런타임 에러를 발생시켜 오염된 데이터가 앱 전반에 확산되는 것을 방지합니다.
*   **Typesafe Request:** 모든 API 요청과 응답에 강력한 타입을 부여하여 컴파일 타임에 오류를 사전에 감지합니다.
*   **Intercepting Pattern:** 공통 헤더 주입, 토큰 관리, 에러 로깅을 중앙화하여 코드 중복을 최소화합니다.

## 📦 3. Monorepo Shared Strategy (유지보수)
... (기존 내용) ...

## 🔄 4. Data Normalization & Anti-Corruption Layer (데이터 정체성)
외부 시스템과의 연동 시 우리 도메인 모델이 오염되는 것을 방지하기 위해 **변환 레이어(Transformer)**를 필수적으로 거칩니다.

*   **외부 데이터 고립:** 외부 API의 필드명(snake_case)이나 날짜 형식(yyyyMMdd)이 내부 로직까지 침투하지 못하게 차단합니다.
*   **일관된 내부 모델:** DB와 비즈니스 로직은 항상 우리가 정의한 **Clean Domain Model**만 참조합니다.
*   **유연한 대응:** 외부 API의 응답 스펙이 바뀌더라도 `Transformer` 함수 하나만 수정하면 시스템 전체를 안전하게 보호할 수 있습니다.

---

### 💡 기여자 가이드 (How to contribute)
1. 새로운 API 추가 시 반드시 `packages/api/src/schemas`에 Zod 스키마를 먼저 정의하십시오.
2. 환경 변수 추가 시 `packages/config/src/env.ts` 스키마를 업데이트하여 유효성 검사를 거치도록 하십시오.
