import { Suspense } from "react";
import { fetchQuotes } from "@/lib/quotes";
import DiscoverGrid from "./DiscoverGrid";
import PublishedToast from "./PublishedToast";

export default async function DiscoverPage() {
  const quotes = await fetchQuotes();

  return (
    <main className="main-area">
      <div className="discover-wrap">
        <div className="discover-header">
          <h1 className="discover-title">탐색</h1>
          <p className="discover-count">발견한 {quotes.length}개의 문장</p>
        </div>
        <DiscoverGrid quotes={quotes} />
      </div>
      <Suspense fallback={null}>
        <PublishedToast />
      </Suspense>
    </main>
  );
}
