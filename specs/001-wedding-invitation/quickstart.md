# Quickstart: 모바일 청첩장

## 사전 요구사항

- Node.js 20+ (LTS)
- npm 또는 pnpm

## 프로젝트 초기화

```bash
# 1. SvelteKit 프로젝트 생성
npx sv create mobile-wedding-invitation
# 선택: Skeleton project, TypeScript, SCSS

# 2. 의존성 설치
cd mobile-wedding-invitation
npm install

# 3. Static adapter 설치
npm install -D @sveltejs/adapter-static

# 4. SCSS 지원
npm install -D sass
```

## 설정

### svelte.config.js

```javascript
import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: true
    }),
    prerender: {
      entries: ['/']
    }
  }
};
```

## 개발 서버

```bash
npm run dev
# http://localhost:5173 에서 확인
```

## 빌드 & 미리보기

```bash
npm run build
npm run preview
# build/ 디렉토리에 정적 파일 생성
```

## 콘텐츠 수정

`src/lib/data/wedding.ts`에서 예식 정보, 계좌 정보, 갤러리 사진 등을 수정한다.
`static/images/`에 사진 파일을 배치한다.

## 배포

`build/` 디렉토리를 AppPaaS에 업로드한다.

## 검증 체크리스트

- [ ] 모바일 브라우저(375px)에서 대문 섹션 정상 표시
- [ ] 카카오톡 링크 공유 시 썸네일 카드 표시
- [ ] 갤러리 사진 탭 → 확대 뷰 동작
- [ ] 지도 이미지 탭 → 외부 지도 앱 열림
- [ ] 계좌번호 복사 → 클립보드 복사 + 피드백 표시
- [ ] Lighthouse 성능 점수 90+ (모바일)
