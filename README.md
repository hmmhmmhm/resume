[![Resume Preview](https://hmart.app/ko/og.png)](https://hmart.app)

## 프로젝트 소개

이 프로젝트는 Astro 기반의 개인 이력서 및 포트폴리오 웹사이트입니다. 모던한 웹 기술 스택을 활용하여 빠르고 효율적인 정적 사이트를 구축하며, Cloudflare Pages를 통해 배포됩니다.

**🌐 배포된 사이트**: [https://hmart.app](https://hmart.app)

## 주요 기술 스택

- **프레임워크**: Astro 5.x
- **UI 라이브러리**: Preact (React 호환)
- **스타일링**: Tailwind CSS
- **애니메이션**: Framer Motion
- **아이콘**: Lucide Preact
- **배포**: Cloudflare Pages
- **빌드 도구**: Turborepo (모노레포 관리), pnpm
- **언어**: TypeScript

## 프로젝트 구조

이 프로젝트는 Turborepo를 사용한 모노레포 구조로 구성되어 있습니다:

- `apps/resume`: 메인 이력서 애플리케이션
- `packages/`: 공유 패키지들
  - `astro-i18n`: 다국어 지원
  - `astro-icon`: 아이콘 통합
  - `astro-lint`: 린팅 설정
  - `astro-preact`: Preact 통합
  - `astro-pwa`: PWA 기능
  - `astro-tailwind`: Tailwind CSS 통합
  - `sitemap-generator`: 사이트맵 생성

## 시작하기

### 필수 요구사항

- Node.js >= 18
- pnpm 9.0.0

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

개발 서버가 실행되면 브라우저에서 확인할 수 있습니다.

### 빌드

```bash
pnpm build
```

### 배포

```bash
cd apps/resume
pnpm deploy
```

## 주요 기능

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기에서 최적화된 경험
- **빠른 성능**: Astro의 정적 사이트 생성으로 초고속 로딩
- **모던한 UI**: Tailwind CSS와 Framer Motion을 활용한 세련된 디자인
- **PWA 지원**: 오프라인 접근 및 앱과 같은 경험 제공
- **다국어 지원**: i18n 통합 (현재 한국어 지원)
- **엣지 배포**: Cloudflare Pages를 통한 글로벌 CDN 배포

## 개발 스크립트

- `pnpm dev`: 개발 서버 실행
- `pnpm build`: 프로덕션 빌드
- `pnpm lint`: 코드 린팅 및 포맷팅
- `pnpm format`: Prettier를 사용한 코드 포맷팅
- `pnpm check-types`: TypeScript 타입 체크

## 라이선스

개인 프로젝트입니다.