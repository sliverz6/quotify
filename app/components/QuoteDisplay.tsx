"use client";

import { useState } from "react";
import { type Quote } from "@/lib/quotes";

interface Props {
  initialQuote: Quote;
  initialIndex: number;
  quotes: Quote[];
  dateLabel: string;
}

export default function QuoteDisplay({ initialQuote, initialIndex, quotes, dateLabel }: Props) {
  const [quote, setQuote] = useState(initialQuote);
  const [index, setIndex] = useState(initialIndex);
  const [spinning, setSpinning] = useState(false);

  function regenerate() {
    if (spinning) return;
    setSpinning(true);
    let next: number;
    do {
      next = Math.floor(Math.random() * quotes.length);
    } while (next === index);
    setIndex(next);
    setQuote(quotes[next]);
    setTimeout(() => setSpinning(false), 500);
  }

  return (
    <main className="main-area">
      <div className="stage">
        {/* ── Hero header ── */}
        <div className="hero-header">
          <p className="hero-date">{dateLabel}</p>
          <h1 className="hero-title">오늘, 당신의 문장은.</h1>
          <p className="hero-sub">큐레이션된 한 문장으로 하루를 시작하세요.</p>
        </div>

        {/* ── Quote card ── */}
        <div key={index} className="quote-card">
          <span className="card-mark" aria-hidden="true">&ldquo;</span>
          <blockquote className="quote-text">{quote.text}</blockquote>
          <div className="gold-rule" aria-hidden="true" />
          <div className="byline">
            <div className="who">
              <span className="author">{quote.author}</span>
              <span className="role">{quote.role}</span>
            </div>
          </div>
        </div>

        {/* ── Regenerate button ── */}
        <button
          className={`btn regen-btn${spinning ? " regen-btn--spinning" : ""}`}
          onClick={regenerate}
          aria-label="다른 명언 보기"
        >
          <svg
            className="regen-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M13.5 8a5.5 5.5 0 1 1-1.03-3.2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M11 3.5 13.5 4.8 12.2 7.3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </main>
  );
}
