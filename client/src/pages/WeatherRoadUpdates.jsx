import useWeatherReports from '../hooks/useWeatherReports'

const WeatherRoadUpdates = () => {
  const { reports, isLoading, error } = useWeatherReports({ limit: 5 })

  return (
    <main className="page" aria-labelledby="weather-road-title">
      <header className="page-header">
        <p className="eyebrow">Feature · Weather &amp; Road Updates</p>
        <h1 id="weather-road-title">Weather &amp; Road Updates</h1>
        <p className="page-intro">
          Aggregates official telemetry, DOT feeds, and hazard alerts into a single stream riders can
          refresh on demand.
        </p>
      </header>

      <section className="panel">
        <h2>Latest Weather Reports</h2>
        {isLoading && <p>Loading reports…</p>}
        {error && <p className="form-error">{error.message}</p>}
        {!isLoading && !error && reports.length === 0 && <p>No reports available yet.</p>}

        <div className="placeholder-grid">
          {reports.map((report) => (
            <article key={report.weather_id}>
              <h3>{new Date(report.report_time).toLocaleString()}</h3>
              <p>Resort: {report.resort_id}</p>
              <ul>
                <li>Snowfall: {report.snowfall ?? '—'} in</li>
                <li>Temperature: {report.temperature ?? '—'}°F</li>
                <li>Wind Speed: {report.wind_speed ?? '—'} mph</li>
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Alerts &amp; Notifications</h2>
        <p>Hooks for push notifications and dashboard banners.</p>
        <ul>
          <li>New hazard alert placeholder</li>
          <li>Closure escalation placeholder</li>
          <li>Auto-dismiss timer placeholder</li>
        </ul>
      </section>
    </main>
  )
}

export default WeatherRoadUpdates
