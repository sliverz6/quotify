import { fetchQuotes, getTodaysQuote } from "@/lib/quotes";
import QuoteDisplay from "@/app/components/QuoteDisplay";

const WEEKDAY_KR = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

export default async function Home() {
  const quotes = await fetchQuotes();
  const { quote, index } = getTodaysQuote(quotes);
  const now = new Date();

  const year  = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day   = String(now.getDate()).padStart(2, "0");
  const weekday = WEEKDAY_KR[now.getDay()];
  const dateLabel = `${year} · ${month} · ${day} ${weekday}`;

  return (
    <QuoteDisplay
      initialQuote={quote}
      initialIndex={index}
      quotes={quotes}
      dateLabel={dateLabel}
    />
  );
}
