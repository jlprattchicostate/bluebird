const HomeDashboard = () => (
  <main className="page" aria-labelledby="home-dashboard-title">
    <header className="page-header">
      <p className="eyebrow">Feature · Home Dashboard</p>
      <h1 id="home-dashboard-title">Home Dashboard</h1>
      <p className="page-intro">
        Morning/evening digests, resort summary cards, and trending alerts that greet every
        rider when they open Bluebird.
      </p>
    </header>

    <section className="panel">
      <h2>Daily Update Cycles</h2>
      <p>
        Two refresh slots (6 AM · 6 PM) summarize weather, snowfall, and closures. Each slot
        will hydrate from the scheduler service.
      </p>
      <div className="placeholder-grid">
        <article>
          <h3>Morning Snapshot</h3>
          <ul>
            <li>Overnight snowfall + storm grade</li>
            <li>First chair temperatures</li>
            <li>Travel advisory roll-up</li>
          </ul>
        </article>
        <article>
          <h3>Evening Snapshot</h3>
          <ul>
            <li>Lift + trail availability for tomorrow</li>
            <li>Overnight storm outlook</li>
            <li>Road condition forecast</li>
          </ul>
        </article>
      </div>
    </section>

    <section className="panel">
      <h2>Resort Summary Cards</h2>
      <p>Each card combines official telemetry and crowd-sourced metrics.</p>
      <div className="placeholder-grid">
        <article>
          <h3>Flagship Resort</h3>
          <p>Snow depth, 24h snowfall, lift status placeholder.</p>
        </article>
        <article>
          <h3>Favorites Rail</h3>
          <p>Favorite resort shortcut tiles placeholder.</p>
        </article>
        <article>
          <h3>Alert Banner</h3>
          <p>Road closures + push notification preview placeholder.</p>
        </article>
      </div>
    </section>

    <section className="panel">
      <h2>Trending Community Posts</h2>
      <p>Surfaced by upvotes + recency, linking into the Community Feed.</p>
      <ol>
        <li>High-signal storm warning placeholder.</li>
        <li>Photo post placeholder.</li>
        <li>Vibe report placeholder.</li>
        <li>Carpool shout placeholder.</li>
        <li>Safety advisory placeholder.</li>
      </ol>
    </section>
  </main>
)

export default HomeDashboard
