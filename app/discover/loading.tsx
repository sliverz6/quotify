const VARIANTS = ["cream", "amber", "navy", "amber"] as const;

export default function DiscoverLoading() {
  return (
    <main className="main-area" aria-hidden="true">
      <div className="discover-wrap">
        {/* header skeleton */}
        <div className="discover-header">
          <div className="skeleton" style={{ width: 120, height: 48, borderRadius: 8 }} />
          <div className="skeleton" style={{ width: 160, height: 14 }} />
        </div>

        {/* filter bar skeleton */}
        <div className="filter-bar">
          <div className="skeleton" style={{ width: 56,  height: 34, borderRadius: 999 }} />
          <div className="skeleton" style={{ width: 88,  height: 34, borderRadius: 999 }} />
        </div>

        {/* grid skeleton */}
        <div className="disc-grid">
          {Array.from({ length: 8 }).map((_, i) => {
            const variant = VARIANTS[i % VARIANTS.length];
            const isDark = variant !== "cream";
            const Sk = isDark ? "skeleton" : "skeleton-dark";
            return (
              <div key={i} className={`disc-card disc-card--${variant}`} style={{ cursor: "default" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                  <div className={Sk} style={{ width: "100%", height: 14 }} />
                  <div className={Sk} style={{ width: "88%",  height: 14 }} />
                  <div className={Sk} style={{ width: "65%",  height: 14 }} />
                </div>
                <div className="disc-rule" />
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div className={Sk} style={{ width: 26, height: 26, borderRadius: 999 }} />
                  <div className={Sk} style={{ width: 60, height: 11 }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
