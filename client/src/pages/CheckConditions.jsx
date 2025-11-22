const CheckConditions = () => (
  <main className="page" aria-labelledby="check-conditions-title">
    <header className="page-header">
      <p className="eyebrow">Feature · Check Conditions</p>
      <h1 id="check-conditions-title">Check Conditions</h1>
      <p className="page-intro">
        Resort-specific dashboards showing snow totals, lift status, visibility, and user-favorite
        shortcuts for rapid decisions.
      </p>
      <nav className="sub-nav" aria-label="Check Conditions sections">
        <a href="#resort-directory">Resort Directory</a>
        <a href="#live-metrics">Live Metrics</a>
        <a href="#favorites">Favorite Resorts</a>
      </nav>
    </header>

    <section className="panel" id="resort-directory">
      <h2>Resort Directory</h2>
      <p>Placeholder for searchable list of supported resorts plus state filters.</p>
      <div className="placeholder-grid">
        <article>
          <h3>Search &amp; Filter</h3>
          <p>Input + tags placeholder.</p>
        </article>
        <article>
          <h3>Resort Card</h3>
          <p>Lift count, terrain status, ops hours placeholder.</p>
        </article>
        <article>
          <h3>API Error State</h3>
          <p>Fallback messaging placeholder.</p>
        </article>
      </div>
    </section>

    <section className="panel" id="live-metrics">
      <h2>Live Metrics</h2>
      <p>Section for snow depth charts, hourly temps, and camera snapshots.</p>
      <ul>
        <li>Live snowfall ticker placeholder</li>
        <li>Lift + trail heatmap placeholder</li>
        <li>Visibility + wind status placeholder</li>
      </ul>
    </section>

    <section className="panel" id="favorites">
      <h2>Favorite Resorts</h2>
      <p>Personalized quick access rail.</p>
      <ol>
        <li>Heart toggle interaction placeholder</li>
        <li>Persistent storage notice placeholder</li>
        <li>Reorder / priority logic placeholder</li>
      </ol>
    </section>
  </main>
)

export default CheckConditions
