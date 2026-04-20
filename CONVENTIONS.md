# Web Development & AI-Native Conventions

> **본 프로젝트의 일관된 코드 품질과 고속 개발을 위한 시니어 가이드라인**

## 🎨 1. Styling Strategy (Fixed vs Variable)
*   **Fixed Tokens:** 간격(Spacing), 둥글기(Border Radius), 그림자 등 시스템의 근간이 되는 수치는 `tailwind.config.ts`에 정의된 토큰만 사용합니다.
*   **Variable Themes:** 색상은 직접적인 Hex 코드를 지양하고, `globals.css`의 CSS 변수를 참조하는 Semantic Color(`primary`, `success` 등)를 사용합니다.
*   **Utility First:** 인라인 스타일 대신 Tailwind Utility Class를 우선하며, 복잡한 조합은 반드시 `cva`를 통해 추상화합니다.

## 🧱 2. Component Hierarchy
1.  **Primitives (`packages/ui`):** 디자인 시스템의 최소 단위. 비즈니스 로직이 없으며 재사용성에만 집중합니다.
2.  **Shared Components (`packages/ui`):** 여러 도메인에서 공통으로 쓰는 UI 패턴 (예: `GlobalNavigation`).
3.  **Feature Components (`apps/*/features`):** 특정 비즈니스 로직과 강하게 결합된 컴포넌트. (예: `AddToCartButton`).

## 🤖 3. AI-Native (Vibe Coding) Rules
AI와 협업할 때 일관성을 유지하기 위해 다음 규칙을 준수합니다.

*   **Declarative Style:** `if/else` 분기 처리를 통한 클래스 조합 대신, `cva`를 이용한 선언적 스타일 맵핑을 권장합니다. (AI의 실수 방지)
*   **Single File Component:** 하나의 파일에는 하나의 컴포넌트와 그에 필요한 Props Interface만 정의합니다.
*   **Type First:** 컴포넌트 구현 전 반드시 `Interface`를 먼저 정의하여 AI에게 명확한 타입을 제공하십시오.

## 📡 4. Data Fetching
*   **Normalization:** 외부 API 데이터는 반드시 `transformers` 레이어를 거쳐 내부 모델로 정규화한 뒤 사용합니다.
*   **Validation:** `packages/api`에서 Zod를 통한 런타임 유효성 검사를 필수로 수행합니다.
