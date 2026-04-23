import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchQuoteById } from "@/lib/quotes";

export default async function QuotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (isNaN(id)) notFound();

  const quote = await fetchQuoteById(id);
  if (!quote) notFound();

  return (
    <main className="main-area">
      <div className="stage">
        <Link href="/discover" className="btn" style={{ alignSelf: "flex-start" }}>
          ← 탐색
        </Link>

        <div className="quote-card">
          <span className="card-mark" aria-hidden="true">&ldquo;</span>
          <blockquote className="quote-text">{quote.text}</blockquote>
          <div className="gold-rule" aria-hidden="true" />
          <div className="byline">
            <div className="who">
              <span className="author">{quote.author}</span>
              {quote.role && <span className="role">{quote.role}</span>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
