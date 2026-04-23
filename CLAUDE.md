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

**전역 레이아웃:** `app/layout.tsx`가 `<Sidebar />`와 `<div className="page-wrap">{children}</div>`를 렌더링. 사이드바가 항상 표시되며 `page-wrap`은 `margin-left: 240px`으로 콘텐츠를 밀어냄. 반응형에서 640px 이하는 사이드바가 상단 바로 전환.

**렌더링 전략:** 서버/클라이언트 컴포넌트 혼합

- `app/page.tsx` — 서버 컴포넌트. `fetchQuotes()`로 DB 조회 후 날짜 기반 명언 선택, `<QuoteDisplay>`에 전달.
- `app/components/QuoteDisplay.tsx` — 클라이언트 컴포넌트. 다른 명언 재생성 버튼 상태 관리. `key={index}`로 교체 시 `quote-in` 애니메이션 트리거.
- `app/components/Sidebar.tsx` — 클라이언트 컴포넌트. `usePathname()`으로 활성 링크 표시. NAV: `/`(홈), `/discover`(탐색), `/compose`(작성).
- `app/discover/page.tsx` — 서버 컴포넌트. `fetchQuotes()` 후 `<DiscoverGrid>` + `<Suspense><PublishedToast /></Suspense>` 렌더링.
- `app/discover/DiscoverGrid.tsx` — 클라이언트 컴포넌트. 검색(`query`), 정렬(`newest`/`oldest`) 상태 관리.
- `app/discover/PublishedToast.tsx` — `useSearchParams()`로 `?published=1` 감지 후 성공 토스트 표시. Suspense 필수 (`useSearchParams` 제약).
- `app/compose/page.tsx` + `ComposeForm.tsx` — 명언 작성 폼. 2열 레이아웃(좌: 입력, 우: 라이브 미리보기). `useActionState`(React 19)로 `submitQuote` Server Action 연결. 성공 시 `/discover?published=1`로 `redirect()`.
- `app/submit/actions.ts` — `submitQuote` Server Action. 허니팟 필드 검사, Supabase anon 클라이언트로 INSERT, 성공 시 `redirect("/discover?published=1")`.
- `app/quote/[id]/page.tsx` — 서버 컴포넌트. `fetchQuoteById(id)`로 단일 명언 조회. `params`가 `Promise<{ id: string }>`임에 주의 (Next.js 15+).
- `app/admin/page.tsx` + `actions.ts` — 관리자 패널. `searchParams.key`를 `ADMIN_SECRET`과 비교해 인증. 명언 목록 + 삭제 버튼(Server Action).
- `app/components/Toast.tsx` — 자동 소멸 토스트. 3.2s 후 페이드 아웃, 3.4s 후 언마운트. Props: `message`, `type ("ok"|"err")`, `onClose`.
- `lib/quotes.ts` — `fetchQuotes()`, `fetchQuoteById(id)`, `getTodaysQuote(quotes)` (날짜 기반 해시로 결정론적 선택), `weekOfYear()` 유틸.
- `lib/supabase.ts` — anon 클라이언트 싱글톤. 읽기 및 INSERT용.
- `lib/supabase-admin.ts` — service role 클라이언트. RLS 우회 가능. **Server Action 내에서만 import**.

**환경변수** (`.env.local`, Vercel 프로젝트 설정에도 동일하게):
- `SUPABASE_URL` — Supabase 프로젝트 URL
- `SUPABASE_ANON_KEY` — Supabase anon/public JWT 키
- `SUPABASE_SERVICE_ROLE_KEY` — 서비스 롤 키 (DELETE용)
- `ADMIN_SECRET` — 관리자 페이지 비밀값 (`/admin?key=값`으로 접근)

**Supabase RLS 설정** (한 번만 실행):
```sql
ALTER TABLE quotes ADD COLUMN submitted_at TIMESTAMPTZ DEFAULT NOW();
CREATE POLICY "allow anon insert" ON quotes FOR INSERT TO anon WITH CHECK (true);
```

**스타일링:** Tailwind v4 + 커스텀 CSS 클래스 혼용

- Tailwind는 `@import "tailwindcss"` 방식(v4). 리셋·유틸리티 제공.
- 레이아웃과 컴포넌트 스타일은 `app/globals.css`의 커스텀 클래스로 정의. Tailwind 유틸리티 클래스는 거의 사용하지 않음.
- **주의:** `.next` 캐시가 있으면 CSS 변경사항이 반영 안 될 수 있음. CSS 미적용 시 `.next` 삭제 후 서버 재시작.

## Design System

에디토리얼/매거진 스타일. 구성이 바뀌어도 이 시스템을 유지할 것.

**컬러** (`app/globals.css` `:root` 변수):
- `--bg` / `--bg-tint` — 따뜻한 크림 흰색 (oklch 기반)
- `--ink` / `--ink-soft` / `--ink-mute` — 텍스트 계층
- `--accent` — 테라코타 강조색 (`oklch(0.52 0.09 25)`)
- `--rule` — 구분선

**폰트** (세 가지 CDN):
- 한국어 본문: Pretendard (`--ff-kr`) — jsDelivr CDN
- 한국어 제목/강조: Noto Serif KR (`--ff-serif`) — Google Fonts
- 모노스페이스: JetBrains Mono (`--ff-mono`) — Google Fonts

**금지:** 다크 배경, 화려한 그라디언트, 무거운 box-shadow, 둥근 카드 UI.
