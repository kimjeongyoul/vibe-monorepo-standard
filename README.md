# Vibe Monorepo Standard 🚀

> **Next.js 14 + TurboRepo 기반의 AI-Native  풀스택 아키텍처 표준**

본 리포지토리는 **'Vibe Coding(AI 협업 개발)'** 환경에서 어떻게 하면 시니어급 코드 품질과 일관된 아키텍처를 유지할 수 있는지에 대한 정답을 제시합니다. 단순한 보일러플레이트를 넘어, 실제 대규모 커머스 및 솔루션 개발 경험을 바탕으로 한 **데이터 정규화, 보안, 확장성 전략**을 포함하고 있습니다.

---

## 🏗 핵심 아키텍처 (Key Highlights)

### 1. AI-Native Workflow (Vibe Coding)
AI 에이전트(Cursor, Gemini 등)와의 협업 시 발생할 수 있는 코드 파편화를 방지하기 위해 **선언적 컴포넌트 설계(CVA)**와 **명확한 타입 정의(Type-First)** 규칙을 강제합니다.

### 2. Robust Data Integrity
*   **Runtime Validation:** Zod를 활용하여 서버 응답 데이터의 무결성을 런타임에 검증합니다.
*   **Anti-Corruption Layer:** 외부 API의 지저분한 데이터를 내부 도메인 모델로 세탁하는 `Transformer` 레이어를 구축하여 시스템 정체성을 보호합니다.

### 3. Scalable Monorepo Strategy
*   **TurboRepo:** 빌드 캐싱 및 병렬 태스크 실행으로 개발 생산성을 극대화했습니다.
*   **Modular Design:** UI 디자인 시스템(`packages/ui`), 전역 상태 관리(`packages/store`), 공통 API 클라이언트(`packages/api`)를 독립 패키지화하여 멀티 앱 환경에 최적화했습니다.

---

## 📂 Project Structure
```text
.
├── apps/
│   └── web/                # Next.js 14 App Router 기반 커머스 메인 앱
├── packages/
│   ├── ui/                 # Tailwind CSS + CVA 기반 디자인 시스템
│   ├── store/              # Redux Toolkit 기반 공통 상태 관리 (Typesafe)
│   ├── api/                # Axios + Zod 기반의 고신뢰성 API 클라이언트
│   ├── config/             # ESLint, Prettier, Tailwind 공통 설정
│   └── utils/              # 공통 유틸리티 (cn, formatter 등)
├── turbo.json              # TurboRepo 작업 최적화 설정
└── package.json            # Workspace 및 루트 스크립트 관리
```

---

## 🛠 Tech Stack
*   **Framework:** Next.js 14 (App Router)
*   **Build Tool:** TurboRepo
*   **Language:** TypeScript (Strict Mode)
*   **State:** Redux Toolkit
*   **Styling:** Tailwind CSS, Class Variance Authority (CVA)
*   **Validation:** Zod
*   **Communication:** Axios (with Interceptors)

---

## 📖 Documentation
더 자세한 설계 철학과 컨벤션은 아래 문서를 참조하십시오.
*   [Architecture & Security Guide](./ARCHITECTURE.md)
*   [Development Conventions](./CONVENTIONS.md)

---

## 🚀 Getting Started
```bash
# 의존성 설치 및 전체 빌드
npm run setup

# 로컬 개발 서버 실행
npm run dev
```

---

**Author:** [김정열 (kimjeongyoul)](https://github.com/kimjeongyoul)  
*Senior Backend / Full-stack Architect*
