"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { type Quote } from "@/lib/quotes";

type SortOrder = "newest" | "oldest";

const CARD_CYCLE = ["cream", "amber", "navy", "amber"] as const;
type CardVariant = (typeof CARD_CYCLE)[number];

const AVATAR_COLORS = [
  { bg: "#6B5B9E", text: "#E8E0FF" },
  { bg: "#5B8A6E", text: "#D0F0E0" },
  { bg: "#9E5B5B", text: "#FFE0E0" },
  { bg: "#5B6E9E", text: "#D0DEFF" },
  { bg: "#7A6B4E", text: "#F0E8D0" },
];

export default function DiscoverGrid({ quotes }: { quotes: Quote[] }) {
  const [sort, setSort]     = useState<SortOrder>("newest");
  const [query, setQuery]   = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? quotes.filter(
          (quote) =>
            quote.text.toLowerCase().includes(q) ||
            quote.author.toLowerCase().includes(q) ||
            quote.role.toLowerCase().includes(q)
        )
      : quotes;

    const copy = [...filtered];
    return sort === "newest"
      ? copy.sort((a, b) => b.id - a.id)
      : copy.sort((a, b) => a.id - b.id);
  }, [quotes, sort, query]);

  return (
    <>
      {/* 검색창 */}
      <div className="search-bar">
        <span className="search-icon" aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="9" cy="9" r="5.5" />
            <path d="M13.5 13.5 17 17" />
          </svg>
        </span>
        <input
          className="search-input"
          type="search"
          placeholder="명언, 저자 검색…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="명언 검색"
        />
      </div>

      {/* 필터 + 결과 수 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div className="filter-bar" style={{ marginBottom: 0 }}>
          {(["newest", "oldest"] as const).map((order) => (
            <button
              key={order}
              className={`filter-btn${sort === order ? " filter-btn--active" : ""}`}
              onClick={() => setSort(order)}
            >
              {order === "newest" ? "최신" : "오래된 순"}
            </button>
          ))}
        </div>
        {query && (
          <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11, color: "var(--text-mute)", letterSpacing: "0.06em" }}>
            {results.length}개
          </span>
        )}
      </div>

      {/* 카드 그리드 */}
      {results.length === 0 ? (
        <div style={{ padding: "48px 0", textAlign: "center", fontFamily: "var(--ff-sans)", fontSize: 14, color: "var(--text-mute)" }}>
          검색 결과가 없습니다.
        </div>
      ) : (
        <div className="disc-grid">
          {results.map((q, i) => {
            const variant: CardVariant = CARD_CYCLE[i % CARD_CYCLE.length];
            const avatar = AVATAR_COLORS[q.id % AVATAR_COLORS.length];
            const initial = q.author.charAt(0);

            return (
              <Link
                key={q.id}
                href={`/quote/${q.id}`}
                className={`disc-card disc-card--${variant}`}
                style={{ textDecoration: "none" }}
              >
                <p className="disc-quote">"{q.text}</p>
                <div className="disc-rule" />
                <div className="disc-byline">
                  <div
                    className="disc-avatar"
                    style={{ background: avatar.bg, color: avatar.text }}
                    aria-hidden="true"
                  >
                    {initial}
                  </div>
                  <span className="disc-author">{q.author}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
