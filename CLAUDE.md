# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # 개발 서버 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 검사
```

배포는 `git push`로 자동 처리됨 (Vercel GitHub 연동). 수동 배포가 필요하면 `vercel --yes --scope sliverz6s-projects`.

## Architecture

**렌더링 전략:** 서버/클라이언트 컴포넌트 혼합

- `app/page.tsx` — 서버 컴포넌트. 날짜 계산 및 오늘의 명언 선택 후 `<QuoteDisplay>`에 초기값으로 전달.
- `app/components/QuoteDisplay.tsx` — 클라이언트 컴포넌트(`"use client"`). 재생성 버튼 상태 관리 및 main+footer 렌더링.
- `lib/quotes.ts` — 명언 데이터(`quotes[]`)와 유틸 함수. `getTodaysQuote()`는 날짜 기반 해시(`dayIndex`)로 결정론적 선택 (같은 날짜 = 항상 같은 명언).

**스타일링:** Tailwind v4 + 커스텀 CSS 클래스 혼용

- Tailwind는 `@import "tailwindcss"` 방식(v4). 리셋·유틸리티 제공.
- 레이아웃과 컴포넌트 스타일은 `app/globals.css`의 커스텀 CSS 클래스(`.chrome`, `.stage`, `.quote-text` 등)로 정의. Tailwind 유틸리티 클래스는 거의 사용하지 않음.
- **주의:** 기존 `.next` 캐시가 있으면 CSS 변경사항이 반영 안 될 수 있음. CSS 미적용 시 `.next` 삭제 후 서버 재시작.

## Design System

에디토리얼/매거진 스타일. 구성이 바뀌어도 이 시스템을 유지할 것.

**컬러** (`app/globals.css` `:root` 변수):
- `--bg` / `--bg-tint` — 따뜻한 크림 흰색 (oklch 기반)
- `--ink` / `--ink-soft` / `--ink-mute` — 텍스트 계층
- `--accent` — 테라코타 강조색 (`oklch(0.52 0.09 25)`)
- `--rule` — 구분선

**폰트** (`--ff-kr` / `--ff-en`):
- 한국어: Pretendard — `app/layout.tsx` `<head>`의 CDN `<link>`로 로드
- 영문: Inter — `next/font/google`

**금지:** 다크 배경, 화려한 그라디언트, 무거운 box-shadow, 둥근 카드 UI.
