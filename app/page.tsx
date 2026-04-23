import { getTodaysQuote, weekOfYear } from "@/lib/quotes";
import QuoteDisplay from "@/app/components/QuoteDisplay";

const WEEKDAY_KR = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
const MONTH_EN = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export default function Home() {
  const { quote, index } = getTodaysQuote();
  const now = new Date();

  const weekday = WEEKDAY_KR[now.getDay()];
  const dateStr = `${MONTH_EN[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  const weekStr = `WEEK ${String(weekOfYear(now)).padStart(2, "0")}`;

  return (
    <>
      <header className="chrome">
        <a className="wordmark" href="#">
          Quotify
          <span className="tag">· 오늘의 명언</span>
        </a>
        <div className="header-meta">
          <span className="kr">{weekday}</span>
          <span className="dot" aria-hidden="true" />
          <span>{dateStr}</span>
          <span className="dot hide-sm" aria-hidden="true" />
          <span className="hide-sm">{weekStr}</span>
        </div>
      </header>

      <QuoteDisplay initialQuote={quote} initialIndex={index} />
    </>
  );
}
