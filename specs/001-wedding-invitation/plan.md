# Implementation Plan: 모바일 청첩장

**Branch**: `001-wedding-invitation` | **Date**: 2026-03-22 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-wedding-invitation/spec.md`

## Summary

모바일 최적화 청첩장을 단일 페이지 스크롤 구조의 정적 사이트로 구현한다. SvelteKit static adapter로 빌드하여 AppPaaS에 배포한다. 대문, 갤러리, 오시는 길, 마음 전하실 곳 4개 섹션을 섹션별 Svelte 컴포넌트로 분리하여 디자이너 협업을 지원한다.

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: SvelteKit (static adapter), SCSS
**Storage**: N/A (정적 사이트, 모든 데이터는 빌드 시점에 포함)
**Testing**: Playwright (E2E), Vitest (unit)
**Target Platform**: 모바일 웹 (iOS Safari 15+, Android Chrome 90+, Samsung Internet 15+)
**Project Type**: static-web-app
**Performance Goals**: FCP 1.5초 이내 (4G), JS 번들 50KB(gzip) 이하
**Constraints**: 서버 라운드트립 없음, 정적 파일만, 이미지 WebP/AVIF + lazy loading
**Scale/Scope**: 단일 페이지, 4개 섹션, 갤러리 13장 (실제 웨딩 사진)
**Venue**: 남부터미널 더화이트베일 3층 V홀 | 2026-06-06(토) 15:00
**Hero Image**: IMG_4689.JPG | **Gallery**: IMG_4677~4690 중 대문 제외 13장

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 원칙 | 상태 | 근거 |
|------|------|------|
| I. Mobile-First | ✅ PASS | 375~430px 뷰포트 기준 설계, 터치 타겟 44x44px |
| II. Speed-First | ✅ PASS | FCP 1.5초 목표, WebP/AVIF, lazy loading, JS 50KB 이하 |
| III. Static Delivery | ✅ PASS | SvelteKit static adapter, 런타임 서버 로직 없음 |
| IV. Designer Handoff | ✅ PASS | 섹션별 컴포넌트 분리, 스코프 SCSS, 독립 교체 가능 |
| V. Simplicity | ✅ PASS | 단일 페이지, 상태 관리 없음, 라우터 없음, 최소 의존성 |

## Project Structure

### Documentation (this feature)

```text
specs/001-wedding-invitation/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── lib/
│   ├── components/
│   │   ├── Hero.svelte          # 대문 (사진, 인사말, 양가 정보)
│   │   ├── Gallery.svelte       # 갤러리 (사진 목록 + 확대 뷰)
│   │   ├── Venue.svelte         # 오시는 길 (주소, 지도, 교통)
│   │   └── Account.svelte       # 마음 전하실 곳 (계좌 정보)
│   ├── data/
│   │   └── wedding.ts           # 정적 콘텐츠 데이터 (예식 정보, 계좌 등)
│   └── styles/
│       ├── _variables.scss      # 디자인 토큰 (색상, 타이포, 간격)
│       └── global.scss          # 리셋, 공통 스타일
├── routes/
│   └── +page.svelte             # 단일 페이지 (섹션 조합)
├── app.html                     # HTML 셸 + OG 메타 태그
└── static/
    ├── images/                  # 대문 사진, 갤러리 원본
    ├── og-image.jpg             # 썸네일 대표 사진 (1200x630px)
    └── map.webp                 # 지도 정적 이미지
```

**Structure Decision**: SvelteKit 단일 프로젝트 구조. 백엔드 없음. `src/lib/components/`에 섹션별 컴포넌트를 배치하고, `src/lib/data/`에 정적 데이터를 분리하여 콘텐츠 교체 시 데이터 파일만 수정하면 된다.

## Complexity Tracking

> Constitution Check 전항목 통과 — 위반 사항 없음.
