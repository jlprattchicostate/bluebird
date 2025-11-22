const CompareResorts = () => (
  <main className="page" aria-labelledby="compare-resorts-title">
    <header className="page-header">
      <p className="eyebrow">Feature · Compare Resorts</p>
      <h1 id="compare-resorts-title">Compare Resorts</h1>
      <p className="page-intro">
        Side-by-side comparisons across snow totals, crowd levels, parking, and travel times so
        riders can pick the best hill today.
      </p>
    </header>

    <section className="panel">
      <h2>Resort Selector</h2>
      <p>Controls for choosing up to three resorts to compare.</p>
      <ul>
        <li>Search + multi-select placeholder</li>
        <li>Recent selections placeholder</li>
        <li>Favorite pinning placeholder</li>
      </ul>
    </section>

    <section className="panel">
      <h2>Comparison Grid</h2>
      <p>Matrix for key metrics.</p>
      <div className="placeholder-grid">
        <article>
          <h3>Snow &amp; Weather</h3>
          <p>24h snowfall, base depth, wind placeholder.</p>
        </article>
        <article>
          <h3>Crowd Levels</h3>
          <p>Lift wait, parking occupancy placeholder.</p>
        </article>
        <article>
          <h3>Road + Travel</h3>
          <p>Drive time, chain requirements, closures placeholder.</p>
        </article>
      </div>
    </section>

    <section className="panel">
      <h2>Insights &amp; Recommendations</h2>
      <p>Rules engine output for “Best Powder” / “Fastest Laps” recommendations.</p>
      <ol>
        <li>Recommendation card placeholder</li>
        <li>Reasoning summary placeholder</li>
        <li>CTA to share with friends placeholder</li>
      </ol>
    </section>
  </main>
)

export default CompareResorts
