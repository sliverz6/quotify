export default function ComposeLoading() {
  return (
    <main className="main-area">
      <div className="stage">
        {/* eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="skeleton" style={{ width: 36, height: 1 }} />
          <div className="skeleton" style={{ width: 140, height: 10 }} />
        </div>

        {/* form skeleton */}
        <div className="submit-form" style={{ pointerEvents: "none" }}>
          {/* textarea field */}
          <div className="field">
            <div className="skeleton" style={{ width: 80, height: 10 }} />
            <div className="skeleton" style={{ width: "100%", height: 120, borderRadius: 10 }} />
          </div>

          {/* author field */}
          <div className="field">
            <div className="skeleton" style={{ width: 60, height: 10 }} />
            <div className="skeleton" style={{ width: "100%", height: 46, borderRadius: 10 }} />
          </div>

          {/* role field */}
          <div className="field">
            <div className="skeleton" style={{ width: 100, height: 10 }} />
            <div className="skeleton" style={{ width: "100%", height: 46, borderRadius: 10 }} />
          </div>

          {/* submit button */}
          <div className="skeleton" style={{ width: 110, height: 44, borderRadius: 999 }} />
        </div>
      </div>
    </main>
  );
}
