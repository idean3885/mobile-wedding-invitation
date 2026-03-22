<!--
Sync Impact Report
- Version change: 0.0.0 → 1.0.0 (initial ratification)
- Added principles: Mobile-First, Speed-First, Static Delivery, Designer Handoff, Simplicity
- Added sections: Tech Stack, Development Workflow, Governance
- Templates requiring updates:
  - spec-template.md: ✅ no update needed (generic)
  - plan-template.md: ✅ no update needed (generic)
  - tasks-template.md: ✅ no update needed (generic)
- Follow-up TODOs: none
-->

# Mobile Wedding Invitation Constitution

## Core Principles

### I. Mobile-First

모든 UI 결정은 모바일 뷰포트(375px~430px)를 기준으로 MUST 설계한다.
데스크톱 대응은 허용하되, 모바일 경험을 저해하는 데스크톱 전용 레이아웃은 금지한다.
터치 타겟은 최소 44x44px을 MUST 충족한다.

### II. Speed-First

초기 로딩(FCP) 1.5초 이내를 MUST 달성한다.
이미지는 WebP/AVIF 포맷 + lazy loading을 MUST 적용한다.
외부 스크립트(analytics 등) 추가 시 성능 영향을 측정하고 정당화해야 한다.
JavaScript 번들은 50KB(gzip) 이하를 목표로 한다.

### III. Static Delivery

서버 사이드 로직 없이 정적 파일(HTML/CSS/JS/이미지)만으로 MUST 구성한다.
폼 제출, 데이터베이스 연동 등 라운드트립이 필요한 기능은 금지한다.
SvelteKit static adapter를 통해 빌드 시 완전한 정적 사이트를 생성한다.

### IV. Designer Handoff

디자이너가 제공하는 CSS/SASS + HTML 또는 Svelte 컴포넌트를 최소 수정으로 적용할 수 있는 구조를 MUST 유지한다.
컴포넌트는 섹션 단위(대문, 갤러리, 오시는길 등)로 분리하여 독립적으로 교체 가능해야 한다.
스타일은 컴포넌트 스코프 CSS 또는 SCSS 파일로 관리한다.

### V. Simplicity

YAGNI 원칙을 엄격히 적용한다.
상태 관리 라이브러리, 라우터(다중 페이지), API 레이어 등 불필요한 추상화를 금지한다.
단일 페이지 스크롤 구조로 MUST 구현한다.
의존성 추가 시 반드시 정당화가 필요하다.

## Tech Stack

| 항목 | 선택 | 근거 |
|------|------|------|
| Framework | SvelteKit (static adapter) | 컴파일 시 런타임 제거, 최소 번들 |
| Language | TypeScript | 타입 안전성 |
| Styling | SCSS (컴포넌트 스코프) | 디자이너 협업 용이 |
| Build | Vite (SvelteKit 내장) | SCSS/이미지 최적화 내장 |
| Deploy | AppPaaS (정적 빌드 결과물) | 웹 애플리케이션 배포 |
| OG Tags | svelte:head | 링크 공유 시 썸네일 표시 |

## Development Workflow

1. **개발자 초안 단계**: 와이어프레임 + SvelteKit 프로젝트 초기화 + 섹션별 컴포넌트 구조 + CI/CD(AppPaaS) 구축
2. **디자이너 협업 단계**: 디자이너가 제공하는 SCSS/HTML/Svelte 컴포넌트를 섹션 단위로 교체 적용
3. **콘텐츠 반영**: 실제 사진, 텍스트, 지도 정보 등 콘텐츠 삽입
4. **최종 검수**: 모바일 기기 실물 테스트 + OG 태그 확인 + 성능 측정

## Governance

- Constitution은 모든 구현 결정에 우선한다.
- 원칙 변경 시 이 문서를 먼저 수정하고, 관련 spec/plan/tasks에 전파한다.
- 버전은 시맨틱 버저닝을 따른다 (MAJOR: 원칙 제거/재정의, MINOR: 원칙 추가, PATCH: 문구 수정).

**Version**: 1.0.0 | **Ratified**: 2026-03-22 | **Last Amended**: 2026-03-22
