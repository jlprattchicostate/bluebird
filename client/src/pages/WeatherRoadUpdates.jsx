const WeatherRoadUpdates = () => (
  <main className="page" aria-labelledby="weather-road-title">
    <header className="page-header">
      <p className="eyebrow">Feature · Weather &amp; Road Updates</p>
      <h1 id="weather-road-title">Weather &amp; Road Updates</h1>
      <p className="page-intro">
        Aggregates official telemetry, DOT feeds, and hazard alerts into a single trusted stream
        riders can refresh on demand.
      </p>
      <nav className="sub-nav" aria-label="Weather page sections">
        <a href="#official-feeds">Official Feeds</a>
        <a href="#alerts">Alerts &amp; Notifications</a>
        <a href="#hazards">Hazard Playbooks</a>
      </nav>
    </header>

    <section className="panel" id="official-feeds">
      <h2>Official Feeds</h2>
      <p>Placeholder for weather API + transportation data cards.</p>
      <div className="placeholder-grid">
        <article>
          <h3>NOAA Snapshot</h3>
          <p>Temperature, wind, visibility, storm class.</p>
        </article>
        <article>
          <h3>Snowpack Telemetry</h3>
          <p>24h / 72h snowfall, base depth chart.</p>
        </article>
        <article>
          <h3>DOT Road Status</h3>
          <p>Pass closures, chain laws, travel time.</p>
        </article>
      </div>
    </section>

    <section className="panel" id="alerts">
      <h2>Alerts &amp; Notifications</h2>
      <p>Future hooks for push notifications and dashboard banners.</p>
      <ul>
        <li>New hazard alert placeholder</li>
        <li>Closure escalation placeholder</li>
        <li>Auto-dismiss timer placeholder</li>
      </ul>
    </section>

    <section className="panel" id="hazards">
      <h2>Hazard Playbooks</h2>
      <p>Guidance for users when a specific warning is active.</p>
      <ol>
        <li>Heavy snowfall response placeholder</li>
        <li>Black ice warning placeholder</li>
        <li>Avalanche mitigation advisory placeholder</li>
      </ol>
    </section>
  </main>
)

export default WeatherRoadUpdates
