import SubmitForm from "./SubmitForm";

export default function SubmitPage() {
  return (
    <>
      <header className="chrome">
        <a className="wordmark" href="/">
          Quotify
          <span className="tag">· 오늘의 명언</span>
        </a>
      </header>
      <main className="main-area">
        <div className="stage">
          <div className="eyebrow">
            <span className="line" aria-hidden="true" />
            <span>Submit a Quote</span>
            <span>· 명언 제출</span>
          </div>
          <SubmitForm />
        </div>
      </main>
    </>
  );
}
