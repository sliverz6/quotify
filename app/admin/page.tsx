import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { deleteQuote } from "./actions";

interface Props {
  searchParams: Promise<{ key?: string }>;
}

export default async function AdminPage({ searchParams }: Props) {
  const { key } = await searchParams;
  if (!key || key !== process.env.ADMIN_SECRET) notFound();

  const { data: quotes } = await supabaseAdmin
    .from("quotes")
    .select("id, text, author, role, submitted_at")
    .order("id", { ascending: false });

  return (
    <>
      <header className="chrome">
        <a className="wordmark" href="/">
          Quotify
          <span className="tag">· 관리자</span>
        </a>
        <div className="header-meta">
          <span>총 {quotes?.length ?? 0}개</span>
        </div>
      </header>
      <main className="admin-main">
        {quotes?.map((q) => (
          <div key={q.id} className="admin-row">
            <div className="admin-quote">
              <p className="admin-text">{q.text}</p>
              <p className="admin-meta">— {q.author}{q.role ? `, ${q.role}` : ""}</p>
              {q.submitted_at && (
                <p className="admin-date">
                  {new Date(q.submitted_at).toLocaleString("ko-KR")}
                </p>
              )}
            </div>
            <form action={deleteQuote}>
              <input type="hidden" name="id" value={q.id} />
              <input type="hidden" name="key" value={key} />
              <button type="submit" className="del-btn">삭제</button>
            </form>
          </div>
        ))}
      </main>
    </>
  );
}
