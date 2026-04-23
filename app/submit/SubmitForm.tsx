"use client";

import { useActionState } from "react";
import { submitQuote, type SubmitState } from "./actions";

export default function SubmitForm() {
  const [state, action, isPending] = useActionState<SubmitState, FormData>(submitQuote, null);

  if (state?.ok) {
    return (
      <div className="form-feedback form-feedback--ok">
        <p>명언이 등록됐습니다. 감사합니다!</p>
        <a href="/" className="back-link">← 메인으로 돌아가기</a>
      </div>
    );
  }

  return (
    <form className="submit-form" action={action}>
      {/* honeypot — bots fill this, humans don't */}
      <input type="text" name="website" className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      {state && !state.ok && (
        <p className="form-feedback form-feedback--err">{state.error}</p>
      )}

      <div className="field">
        <label className="field-label" htmlFor="f-text">명언 *</label>
        <textarea
          id="f-text"
          name="text"
          className="field-textarea"
          placeholder="명언을 입력해주세요 (10–500자)"
          required
          minLength={10}
          maxLength={500}
          rows={4}
        />
      </div>

      <div className="field">
        <label className="field-label" htmlFor="f-author">저자 *</label>
        <input
          id="f-author"
          name="author"
          type="text"
          className="field-input"
          placeholder="이름"
          required
          maxLength={100}
        />
      </div>

      <div className="field">
        <label className="field-label" htmlFor="f-role">
          직책 / 설명 <span className="field-optional">선택</span>
        </label>
        <input
          id="f-role"
          name="role"
          type="text"
          className="field-input"
          placeholder="예: 작가, 철학자, 기업인…"
          maxLength={100}
        />
      </div>

      <button type="submit" className="submit-btn" disabled={isPending}>
        {isPending ? "제출 중…" : "명언 제출"}
      </button>
    </form>
  );
}
