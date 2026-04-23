"use client";

import { useState } from "react";
import { quotes, type Quote } from "@/lib/quotes";

interface Props {
  initialQuote: Quote;
  initialIndex: number;
}

export default function QuoteDisplay({ initialQuote, initialIndex }: Props) {
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

  const idxStr = String(index + 1).padStart(2, "0");

  return (
    <>
      <main className="main-area">
        <div className="stage">
          <div className="eyebrow">
            <span className="line" aria-hidden="true" />
            <span>Quote of the Day</span>
            <span className="kr">· 오늘의 명언</span>
          </div>

          <div className="quote-block">
            <blockquote className="quote-text">
              <span className="mark" aria-hidden="true">&ldquo;</span>
              {quote.text}
            </blockquote>

            <div className="byline">
              <span className="rule" aria-hidden="true" />
              <div className="who">
                <span className="author">{quote.author}</span>
                <span className="role">{quote.role}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer-area">
        <div className="count">
          <span className="idx">{idxStr}</span>
          <span className="of">of {quotes.length} · 오늘의 선택</span>
        </div>

        <div className="progress" aria-hidden="true">
          {quotes.map((_, k) => (
            <span
              key={k}
              className={`bar ${k === index ? "bar-now" : k < index ? "bar-on" : ""}`}
            />
          ))}
        </div>

        <div className="footer-right">
          <button
            className={`regen-btn${spinning ? " regen-btn--spinning" : ""}`}
            onClick={regenerate}
            aria-label="다른 명언 보기"
          >
            <svg
              className="regen-icon"
              width="14"
              height="14"
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
            다른 명언
          </button>

          <div className="colophon">
            Quotify v0.1
            <span className="kr">읽기 전용 · 정적 배포</span>
          </div>
        </div>
      </footer>
    </>
  );
}
