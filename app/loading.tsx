export default function HomeLoading() {
  return (
    <>
      <main className="main-area">
        <div className="stage">
          {/* hero header skeleton */}
          <div className="hero-header">
            <div className="skeleton" style={{ width: 160, height: 10 }} />
            <div className="skeleton" style={{ width: "70%", height: 52, borderRadius: 8 }} />
            <div className="skeleton" style={{ width: 240, height: 13 }} />
          </div>

          {/* eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="skeleton" style={{ width: 36, height: 1 }} />
            <div className="skeleton" style={{ width: 160, height: 10 }} />
          </div>

          {/* quote card */}
          <div className="quote-card" style={{ display: "flex", flexDirection: "column" }}>
            <div className="skeleton-dark" style={{ width: 44, height: 40, borderRadius: 4, marginBottom: 16 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: "clamp(22px, 3vw, 32px)" }}>
              <div className="skeleton-dark" style={{ width: "100%", height: 30 }} />
              <div className="skeleton-dark" style={{ width: "88%",  height: 30 }} />
              <div className="skeleton-dark" style={{ width: "65%",  height: 30 }} />
            </div>
            <div style={{ height: 1, background: "rgba(169,136,52,0.18)", marginBottom: "clamp(18px,2.5vw,26px)" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div className="skeleton-dark" style={{ width: 130, height: 14 }} />
              <div className="skeleton-dark" style={{ width: 90,  height: 11 }} />
            </div>
          </div>
        </div>
      </main>

    </>
  );
}
