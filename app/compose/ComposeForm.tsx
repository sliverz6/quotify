"use client";

import { useState, useActionState, useEffect } from "react";
import { submitQuote, type SubmitState } from "@/app/submit/actions";
import Toast from "@/app/components/Toast";

type CardStyle = "classic" | "dark" | "warm";

const MAX_CHARS = 200;
const CARD_STYLES: { id: CardStyle; label: string }[] = [
  { id: "classic", label: "Classic" },
  { id: "dark",    label: "Dark" },
  { id: "warm",    label: "Warm" },
];

export default function ComposeForm() {
  const [text,      setText]      = useState("");
  const [author,    setAuthor]    = useState("");
  const [role,      setRole]      = useState("");
  const [tags,      setTags]      = useState<string[]>([]);
  const [tagInput,  setTagInput]  = useState("");
  const [cardStyle, setCardStyle] = useState<CardStyle>("classic");
  const [toast,     setToast]     = useState<string | null>(null);
  const [state, action, pending]  = useActionState<SubmitState, FormData>(submitQuote, null);

  useEffect(() => {
    if (state && !state.ok) setToast(state.error);
  }, [state]);

  function addTag() {
    const t = tagInput.trim().replace(/^#/, "");
    if (t && !tags.includes(t) && tags.length < 5) {
      setTags((prev) => [...prev, t]);
      setTagInput("");
    }
  }

  return (
    <form action={action} className="compose-wrap">
      {/* honeypot */}
      <input type="text" name="website" className="sr-only" tabIndex={-1} aria-hidden="true" />

      {/* ── Header ── */}
      <div className="compose-header">
        <div>
          <h1 className="compose-title">명언 작성</h1>
          <p className="compose-sub">쓰고, 다듬고, 발행하세요.</p>
        </div>
        <button
          type="submit"
          className="publish-btn"
          disabled={pending || text.trim().length < 1}
        >
          {pending ? "발행 중…" : "발행하기"}
        </button>
      </div>

      {/* ── Two-column layout ── */}
      <div className="compose-layout">

        {/* LEFT */}
        <div className="compose-left">

          {/* 문장 */}
          <div className="compose-section">
            <div className="compose-field-header">
              <span className="field-label">문장</span>
              <span className="char-count">{text.length}/{MAX_CHARS}</span>
            </div>
            <textarea
              name="text"
              className="compose-textarea"
              placeholder="당신의 문장을 써보세요."
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
              rows={7}
              required
            />
          </div>

          {/* 쓴 사람 (선택) */}
          <div className="compose-section">
            <div className="compose-field-header">
              <span className="field-label">
                쓴 사람&nbsp;<span className="field-optional">선택</span>
              </span>
            </div>
            <input
              name="author"
              className="compose-input"
              placeholder="이름 또는 닉네임"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          {/* 직책 (선택) */}
          <div className="compose-section">
            <div className="compose-field-header">
              <span className="field-label">
                직책 / 설명&nbsp;<span className="field-optional">선택</span>
              </span>
            </div>
            <input
              name="role"
              className="compose-input"
              placeholder="예: 작가, 철학자"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          {/* 태그 */}
          <div className="compose-section">
            <span className="field-label">태그</span>
            <div className="tag-row">
              {tags.map((tag) => (
                <span key={tag} className="tag-chip">
                  #{tag}
                  <button
                    type="button"
                    className="tag-remove"
                    onClick={() => setTags((prev) => prev.filter((t) => t !== tag))}
                    aria-label={`${tag} 제거`}
                  >
                    ×
                  </button>
                </span>
              ))}
              {tags.length < 5 && (
                <input
                  className="tag-input"
                  placeholder="+ 태그 추가"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                  onBlur={addTag}
                  aria-label="태그 입력"
                />
              )}
            </div>
          </div>

          {/* 카드 스타일 */}
          <div className="compose-section">
            <span className="field-label">카드 스타일</span>
            <div className="style-grid">
              {CARD_STYLES.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  className={`style-option style-option--${id}${cardStyle === id ? " style-option--active" : ""}`}
                  onClick={() => setCardStyle(id)}
                >
                  <span className="style-mark">&ldquo;</span>
                  <span className="style-label">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 피드백 */}
          {toast && (
            <Toast message={toast} type="err" onClose={() => setToast(null)} />
          )}
        </div>

        {/* RIGHT: 미리보기 */}
        <div className="compose-right">
          <span className="preview-label">라이브 미리보기</span>

          <div className={`preview-card preview-card--${cardStyle}`}>
            <p className="preview-eyebrow">오늘의 명언 · QUOTE OF THE DAY</p>
            <span className="preview-mark" aria-hidden="true">&ldquo;</span>
            <p className="preview-text">
              {text.trim() || "여기에 당신의 문장이 놓입니다."}
            </p>

            {(author || role) && (
              <>
                <div className="preview-rule" />
                <div className="preview-byline">
                  <div className="preview-avatar" aria-hidden="true">
                    {(author || "익").charAt(0)}
                  </div>
                  <div>
                    {author && <span className="preview-author">{author}</span>}
                    {role  && <span className="preview-role-text">{role}</span>}
                  </div>
                </div>
              </>
            )}

            {tags.length > 0 && (
              <div className="preview-tags">
                {tags.map((tag) => (
                  <span key={tag} className="preview-tag">#{tag}</span>
                ))}
              </div>
            )}
          </div>

          <p className="preview-tip">
            팁 · 문장은 짧을수록 오래 기억됩니다. 평균 좋아요가 2배인 명언은 40자 이하입니다.
          </p>
        </div>
      </div>
    </form>
  );
}
