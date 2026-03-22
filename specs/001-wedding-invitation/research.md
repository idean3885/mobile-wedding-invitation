# Research: 모바일 청첩장

## 1. Static Map API (빌드 시점 지도 이미지 생성)

**Decision**: Kakao Static Map API를 1순위로 사용. 실패 시 Naver Static Map API 대체.

**Rationale**:
- 카카오맵이 한국 모바일 사용자 점유율 1위
- Static Map API로 좌표 기반 이미지를 URL 호출 한 번으로 생성 가능
- 빌드 스크립트에서 이미지를 다운로드하여 `static/map.webp`로 번들
- 런타임 API 호출 없음 — Constitution III(Static Delivery) 준수

**Alternatives considered**:
- Naver Static Map API: 동일 기능, 대체제로 보유
- 수동 스크린샷: 자동화 불가, 해상도/품질 일관성 없음 → 기각

## 2. 이미지 최적화 전략

**Decision**: Vite 빌드 파이프라인에서 `vite-imagetools` 또는 `@sveltejs/enhanced-img`로 WebP 변환 + 반응형 srcset 생성.

**Rationale**:
- Constitution II(Speed-First)에서 WebP/AVIF + lazy loading 필수
- SvelteKit은 Vite 기반이므로 이미지 플러그인으로 빌드 시 자동 변환
- `<img loading="lazy">`로 갤러리 이미지 점진적 로딩
- 대문 사진은 LCP 요소이므로 lazy loading 제외 (preload)

**Alternatives considered**:
- 수동 WebP 변환: 디자이너 작업 시마다 수동 처리 필요 → 기각
- CDN 이미지 변환: 런타임 외부 호출 발생, Static Delivery 위반 → 기각

## 3. 클립보드 복사 (계좌번호)

**Decision**: Clipboard API (`navigator.clipboard.writeText()`) 사용. 미지원 시 `document.execCommand('copy')` 폴백. 양쪽 모두 실패 시 텍스트 선택 상태로 전환.

**Rationale**:
- 타겟 브라우저(iOS Safari 15+, Chrome 90+, Samsung Internet 15+) 모두 Clipboard API 지원
- 폴백은 구형 브라우저 대응용, 스펙 Edge Case 충족
- 외부 라이브러리 불필요 — Constitution V(Simplicity) 준수

**Alternatives considered**:
- clipboard.js 라이브러리: 추가 의존성, 번들 증가 → 기각

## 4. 갤러리 확대 뷰 (Lightbox)

**Decision**: 직접 구현. `<dialog>` 요소 기반으로 전체 화면 오버레이 + 터치 제스처(스와이프) 구현.

**Rationale**:
- 외부 Lightbox 라이브러리(PhotoSwipe 등)는 15~30KB 추가 번들
- JS 50KB 제한 내에서 직접 구현이 더 경제적
- `<dialog>`는 접근성 내장 (ESC 닫기, focus trap)
- Constitution V(Simplicity): 최소 의존성

**Alternatives considered**:
- PhotoSwipe: 기능 풍부하나 번들 크기 초과 위험 → 기각
- GLightbox: 경량이나 여전히 외부 의존성 → 기각

## 5. OG 메타 태그 (썸네일)

**Decision**: `src/app.html`에 정적 OG 태그 삽입. `svelte:head`는 동적 변경 필요 시에만 사용.

**Rationale**:
- 단일 페이지이므로 OG 태그가 1세트만 필요
- 크롤러(카카오봇 등)는 JavaScript 실행 없이 HTML을 파싱하므로, `app.html`에 직접 삽입이 가장 안정적
- 대표 사진: `static/og-image.jpg` (1200x630px, JPG — 카카오톡 호환성 최적)

**Alternatives considered**:
- `svelte:head` 동적 삽입: SSR 없는 static adapter에서는 크롤러가 읽지 못할 수 있음 → 기각

## 6. SvelteKit Static Adapter 설정

**Decision**: `@sveltejs/adapter-static`으로 전체 사이트를 프리렌더링.

**Rationale**:
- `adapter-static`은 빌드 시 모든 라우트를 HTML로 생성
- 단일 라우트(`/`)만 있으므로 설정 최소화
- `prerender: { entries: ['/'] }` 설정으로 충분
- 출력물(`build/`)을 AppPaaS에 그대로 배포

**Alternatives considered**:
- adapter-node: 서버 런타임 필요, Static Delivery 위반 → 기각
- adapter-auto: 배포 플랫폼 자동 감지, AppPaaS 미지원 가능성 → 기각
