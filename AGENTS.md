# 에이전트 개발 규칙

이 문서는 AI 에이전트가 `resume` 모노레포에서 코드를 작성하고 기여할 때 따라야 하는 규칙과 가이드라인을 정의합니다.

## 목차

- [프로젝트 개요](#프로젝트-개요)
- [코드 작성 규칙](#코드-작성-규칙)
- [커밋 규칙](#커밋-규칙)
- [보안 및 개인정보](#보안-및-개인정보)
- [파일 구조](#파일-구조)
- [코드 스타일](#코드-스타일)
- [문서화](#문서화)
- [테스트](#테스트)
- [배포](#배포)

---

## 프로젝트 개요

`resume` 는 hmart.app 으로 배포되는 hmmhmmhm 의 포트폴리오·이력서 사이트이자, 다른 사용자가 fork 해서 쓸 수 있는 공개 템플릿입니다. Astro + Preact + Turborepo 구조이며, 7개의 astro-* 모듈 패키지를 함께 관리합니다.

- `apps/resume` — 실제 사이트 진입점 (Astro 앱)
- `packages/astro-i18n` — 다국어 처리 모듈
- `packages/astro-icon` — 아이콘 컴포넌트
- `packages/astro-lint` — 공통 린트 설정
- `packages/astro-preact` — Preact 통합 어댑터
- `packages/astro-pwa` — PWA 헬퍼
- `packages/astro-tailwind` — Tailwind 통합
- `packages/sitemap-generator` — 사이트맵 생성기

---

## 코드 작성 규칙

### 파일 크기 제한

**모든 코드 파일은 450줄 이하로 작성되어야 합니다.**

- **최대 줄 수**: 450줄
- **권장 줄 수**: 300-400줄
- **초과 시 조치**: 파일이 450줄을 초과하면 기능별로 분리하여 모듈화
- **예외**: 자동 생성 파일(예: 빌드 산출물, lockfile) 은 예외로 둘 수 있음

### 코드 품질

- **명확성**: 코드는 명확하고 이해하기 쉽게 작성
- **재사용성**: 중복 코드를 최소화하고 공통 로직은 함수로 추출
- **타입 안정성**: TypeScript 의 타입 시스템을 적극 활용 (strict 모드 유지)
- **에러 핸들링**: 모든 비동기 작업과 외부 API 호출에 적절한 에러 처리 구현
- **fork 친화성**: 외부 사용자가 fork 후 자기 정보로 쉽게 교체할 수 있게, 개인 데이터(이름·경력·링크) 는 한 곳에 모아 둡니다.

---

## 커밋 규칙

### 커밋 빈도

- **주기적인 커밋**: 논리적인 작업 단위마다 커밋
- **작은 단위**: 한 번에 하나의 기능이나 수정사항만 포함
- **완성된 코드**: 빌드 실패나 런타임 에러가 없는 상태에서만 커밋

### 커밋 메시지 형식 (Conventional Commits)

```
<type>: <설명>
```

- `feat` — 신규 기능 / `fix` — 버그 수정 / `docs` — 문서 / `chore` — 빌드·의존성 / `refactor` — 구조 개선 / `style` — 스타일 / `test` — 테스트

#### 예시

```
feat(astro-i18n): add fallback locale resolution
fix(resume): correct OG image dimensions
chore: bump astro to 5.x
```

---

## 보안 및 개인정보

- 비밀키·토큰·자격증명을 코드·테스트·문서에 포함하지 않습니다.
- 이력서 본문(이름, 경력 일자, 연락처, 회사명) 은 자율 변경 금지 — 사람만 갱신합니다.
- fork 사용자가 식별 가능한 정보를 쉽게 교체할 수 있게, 데이터는 분리된 yaml/json 으로 두는 패턴을 유지합니다.

---

## 파일 구조

```
resume/
├── apps/
│   └── resume/            (Astro 앱)
│       ├── src/
│       ├── public/
│       └── astro.config.*
├── packages/
│   └── <astro-*>/
│       ├── src/
│       ├── package.json
│       └── README.md
├── package.json           (root, workspaces 정의)
├── pnpm-workspace.yaml
├── turbo.json
└── AGENTS.md / CLAUDE.md
```

---

## 코드 스타일

- **포매터**: prettier (`pnpm format`)
- **린터**: turbo 위임 (`pnpm lint`)
- **타입 체크**: `pnpm check-types`
- **빌드**: `pnpm build` — 의존 그래프에 따라 turbo 가 캐시·병렬 실행

PR 제출 전 위 4개를 모두 통과시킵니다.

---

## 문서화

- 영어 `README.md` 를 우선 유지, 한국어 `README_KR.md` 는 보조로 따라 갑니다.
- fork 사용자를 위한 셋업 가이드(개인 정보 교체 위치, 빌드·배포 절차) 를 README 에 명시합니다.
- 신규 패키지 추가 시 root `README.md` 의 패키지 목록도 갱신합니다.

---

## 테스트

- 각 astro-* 패키지는 단위 테스트가 가능한 부분(예: i18n 키 매핑, 사이트맵 생성기) 에 한해 테스트를 동봉합니다.
- Astro 앱 자체의 시각 회귀는 수동 확인을 우선합니다.

---

## 배포

- `apps/resume` 는 GitHub Actions (`deploy-resume.yml`) 로 hmart.app 에 자동 배포됩니다.
- 의존성 PR 머지 후 deploy preview 까지 확인하고서 main 머지를 진행합니다.
- 외부 사용자가 fork 해서 쓰는 템플릿이라 breaking change 는 minor 에서도 신중히 결정합니다.
