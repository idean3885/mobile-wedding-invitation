# Tasks: 모바일 청첩장

**Input**: Design documents from `/specs/001-wedding-invitation/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: 테스트 태스크는 스펙에서 명시적으로 요청되지 않았으므로 포함하지 않음.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: SvelteKit 프로젝트 초기화 및 기본 구조 구축

- [ ] T001 SvelteKit 프로젝트 생성 (Skeleton, TypeScript, SCSS 선택) 및 의존성 설치
- [ ] T002 `@sveltejs/adapter-static` 설치 및 `svelte.config.js` 설정 (prerender: entries: ['/'], precompress: true)
- [ ] T003 [P] SCSS 환경 설정: `src/lib/styles/_variables.scss` (디자인 토큰) 및 `src/lib/styles/global.scss` (리셋, 공통 스타일) 생성
- [ ] T004 [P] 정적 데이터 타입 정의 및 샘플 데이터 작성: `src/lib/data/wedding.ts` (Wedding, Gallery, Venue, Account 타입 + 플레이스홀더 데이터)
- [ ] T005 [P] `src/app.html`에 OG 메타 태그 삽입 (og:title, og:description, og:image, og:url) 및 뷰포트 메타 태그 설정
- [ ] T006 [P] `static/` 디렉토리에 플레이스홀더 이미지 배치 (og-image.jpg 1200x630px, map.webp, 샘플 갤러리 이미지)

**Checkpoint**: 프로젝트가 `npm run dev`로 실행되고 빈 페이지가 표시됨

---

## Phase 2: Foundational

**Purpose**: 모든 섹션이 공유하는 단일 페이지 레이아웃

- [ ] T007 단일 페이지 레이아웃 구현: `src/routes/+page.svelte`에 섹션 컴포넌트 임포트 구조 및 전체 스크롤 레이아웃 설정
- [ ] T008 전역 SCSS 적용: `src/routes/+layout.svelte`에서 `global.scss` 임포트 및 모바일 뷰포트 기본 스타일 적용

**Checkpoint**: 단일 페이지에서 빈 섹션 영역이 스크롤로 이어지는 구조 확인

---

## Phase 3: User Story 1 - 청첩장 열람 (Priority: P1) 🎯 MVP

**Goal**: 하객이 링크를 열면 대문 사진, 양가 정보, 인사말이 표시되고 스크롤로 전체 섹션을 볼 수 있다.

**Independent Test**: 모바일 브라우저(375px)에서 링크를 열어 대문 섹션이 정상 표시되고 스크롤이 동작하는지 확인.

### Implementation for User Story 1

- [ ] T009 [US1] Hero 컴포넌트 구현: `src/lib/components/Hero.svelte` — 대문 사진, 양가 부모 이름, 신랑·신부 이름과 서열, 예식 일시·장소, 인사말 표시. `wedding.ts`에서 데이터 바인딩
- [ ] T010 [US1] Hero 컴포넌트 스코프 SCSS 작성: 모바일 퍼스트 레이아웃, 대문 사진 전체 너비, 텍스트 중앙 정렬, 터치 타겟 44x44px 준수
- [ ] T011 [US1] `src/routes/+page.svelte`에 Hero 컴포넌트 배치 및 섹션 순서 확인 (대문 → 갤러리 → 오시는 길 → 마음 전하실 곳)
- [ ] T012 [US1] 대문 사진 최적화: `<img>` 태그에 대체 텍스트 추가, 대문 사진은 preload 처리 (LCP 요소)

**Checkpoint**: 모바일 브라우저에서 대문 섹션이 완전히 표시되고 아래로 스크롤 가능

---

## Phase 4: User Story 2 - 링크 공유 시 썸네일 미리보기 (Priority: P1)

**Goal**: 카카오톡/메신저에서 링크 공유 시 대표 사진과 제목이 포함된 썸네일 카드가 표시된다.

**Independent Test**: 카카오톡 채팅에 링크를 붙여넣어 썸네일 카드(1200x630px 대표 사진 + 제목 + 설명)가 올바르게 표시되는지 확인.

### Implementation for User Story 2

- [ ] T013 [US2] `src/app.html`의 OG 메타 태그를 실제 콘텐츠로 업데이트: og:title ("OO & OO 결혼합니다"), og:description (예식 일시·장소), og:image (`/og-image.jpg` 절대 URL), og:url
- [ ] T014 [US2] `static/og-image.jpg` 준비: 대표 사진을 1200x630px 크기로 최적화 (JPG, 카카오톡 호환)
- [ ] T015 [US2] 카카오톡 OG 캐시 디버거로 메타 태그 파싱 결과 검증

**Checkpoint**: 카카오톡에 링크 붙여넣기 시 썸네일 카드가 정상 표시됨

---

## Phase 5: User Story 3 - 갤러리 열람 (Priority: P2)

**Goal**: 하객이 갤러리에서 사진 목록을 보고 탭하면 확대 뷰로 감상할 수 있다.

**Independent Test**: 갤러리 섹션에서 사진 목록이 표시되고, 탭 시 확대 뷰가 동작하며, 닫기가 정상 동작하는지 확인.

### Implementation for User Story 3

- [ ] T016 [US3] Gallery 컴포넌트 구현: `src/lib/components/Gallery.svelte` — `wedding.ts`의 photos 데이터를 순서대로 표시. 각 이미지에 대체 텍스트 적용, lazy loading 설정
- [ ] T017 [US3] Gallery 확대 뷰 구현: `src/lib/components/Gallery.svelte` 내부에 `<dialog>` 기반 전체 화면 오버레이, 사진 간 이동 기능, 닫기 기능
- [ ] T018 [US3] Gallery 컴포넌트 스코프 SCSS 작성: 모바일 퍼스트 사진 목록 레이아웃, 확대 뷰 오버레이 스타일, 터치 타겟 준수
- [ ] T019 [US3] 갤러리 이미지 최적화: `vite-imagetools` 또는 `@sveltejs/enhanced-img`로 WebP 변환 + 반응형 srcset 빌드 파이프라인 설정

**Checkpoint**: 갤러리에서 사진 목록 표시 → 탭 시 확대 → 이동 → 닫기 전체 흐름 동작

---

## Phase 6: User Story 4 - 오시는 길 확인 (Priority: P2)

**Goal**: 하객이 예식장 주소, 지도 이미지, 교통 안내를 확인하고 외부 지도 앱으로 이동할 수 있다.

**Independent Test**: 오시는 길 섹션에서 지도 이미지·주소·교통 안내가 표시되고, 지도 탭 시 외부 앱이 열리는지 확인.

### Implementation for User Story 4

- [ ] T020 [US4] 빌드 스크립트 작성: Kakao Static Map API로 지도 이미지를 생성하여 `static/map.webp`로 저장하는 스크립트 (`scripts/generate-map.ts`)
- [ ] T021 [US4] Venue 컴포넌트 구현: `src/lib/components/Venue.svelte` — 예식장 이름, 주소, 지도 이미지(탭 시 외부 지도 앱 연결), 교통 안내(지하철/버스/자가용) 표시. 이미지에 대체 텍스트 적용
- [ ] T022 [US4] Venue 컴포넌트 스코프 SCSS 작성: 지도 이미지 영역, 주소 텍스트, 교통 수단별 안내 레이아웃, 터치 타겟 준수
- [ ] T023 [US4] 지도 앱 미설치 시 웹 지도 페이지 폴백: 지도 링크를 범용 URL 스킴으로 설정하여 앱 미설치 시 웹 브라우저로 열리도록 처리

**Checkpoint**: 지도 이미지 표시 → 탭 시 외부 지도 앱 열림 → 교통 안내 확인

---

## Phase 7: User Story 5 - 마음 전하실 곳 (Priority: P3)

**Goal**: 하객이 신랑측·신부측 계좌 정보를 확인하고 계좌번호를 복사할 수 있다.

**Independent Test**: 계좌 정보(측별 최대 3개)가 표시되고, 복사 요청 시 클립보드에 복사되며 피드백이 표시되는지 확인.

### Implementation for User Story 5

- [ ] T024 [US5] Account 컴포넌트 구현: `src/lib/components/Account.svelte` — 신랑측/신부측 구분, 각 측별 본인·아버지·어머니 계좌 정보(은행명, 예금주, 계좌번호) 표시. `wedding.ts` 데이터 바인딩
- [ ] T025 [US5] 클립보드 복사 기능 구현: `src/lib/components/Account.svelte` 내부에 Clipboard API + execCommand 폴백 + 텍스트 선택 폴백. 복사 완료 피드백 표시 (0.5초 이내)
- [ ] T026 [US5] Account 컴포넌트 스코프 SCSS 작성: 측별 구분 레이아웃, 계좌 정보 카드, 복사 영역, 터치 타겟 준수

**Checkpoint**: 계좌 정보 표시 → 복사 요청 → 클립보드 복사 + 피드백 확인

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: 전체 품질 향상 및 엣지 케이스 처리

- [ ] T027 [P] 이미지 미로딩 대응: 모든 `<img>` 태그에 대체 텍스트 최종 검증 및 로딩 실패 시 대체 표시 확인
- [ ] T028 [P] 느린 네트워크 대응: 텍스트 콘텐츠 우선 표시 확인, 이미지 lazy loading 동작 검증
- [ ] T029 [P] 가로 모드 / 데스크톱 대응: landscape 및 데스크톱 뷰포트에서 레이아웃 깨짐 없이 중앙 정렬 표시 확인, 필요 시 max-width 적용
- [ ] T030 [P] 클립보드 미지원 브라우저 대응: Clipboard API 미지원 시 execCommand 폴백, 양쪽 실패 시 텍스트 선택 상태 전환 검증
- [ ] T031 성능 검증: Lighthouse 모바일 점수 90+ 달성, FCP 1.5초 이내, JS 번들 50KB(gzip) 이하, 갤러리 확대 뷰 0.3초 이내 확인
- [ ] T032 빌드 및 배포 검증: `npm run build` 후 `build/` 디렉토리 정적 파일 확인, AppPaaS 배포 테스트

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Foundational — MVP
- **US2 (Phase 4)**: Depends on Setup (app.html) — can run in parallel with US1
- **US3 (Phase 5)**: Depends on Foundational
- **US4 (Phase 6)**: Depends on Foundational
- **US5 (Phase 7)**: Depends on Foundational
- **Polish (Phase 8)**: Depends on all user stories complete

### User Story Dependencies

- **US1 (P1)**: Foundational 후 즉시 시작 가능. 다른 스토리와 독립.
- **US2 (P1)**: app.html + 정적 이미지만 필요. US1과 병렬 가능.
- **US3 (P2)**: Foundational 후 시작. US1/US2와 독립.
- **US4 (P2)**: Foundational 후 시작. 지도 빌드 스크립트는 독립.
- **US5 (P3)**: Foundational 후 시작. 다른 스토리와 독립.

### Within Each User Story

- 컴포넌트 구현 → SCSS 작성 → 최적화/연동
- 데이터 바인딩은 T004(wedding.ts)에 의존

### Parallel Opportunities

- Setup: T003, T004, T005, T006 모두 병렬
- US3~US5: Foundational 완료 후 동시 진행 가능
- US2: US1과 병렬 (서로 다른 파일)
- Polish: T027~T030 모두 병렬

---

## Implementation Strategy

### MVP First (User Story 1 + 2)

1. Phase 1: Setup 완료
2. Phase 2: Foundational 완료
3. Phase 3: US1 (대문 열람) + Phase 4: US2 (썸네일) 병렬
4. **STOP and VALIDATE**: 모바일에서 대문 표시 + 카카오톡 썸네일 확인
5. 배포 가능 상태

### Incremental Delivery

1. Setup + Foundational → 프로젝트 기반 완성
2. US1 + US2 → MVP 배포 (대문 + 썸네일)
3. US3 → 갤러리 추가 배포
4. US4 → 오시는 길 추가 배포
5. US5 → 계좌 정보 추가 배포
6. Polish → 최종 검수 후 배포

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
