import { useMemo } from 'react'
import useWeatherReports from '../hooks/useWeatherReports'
import useResorts from '../hooks/useResorts'
import useRoadReports from '../hooks/useRoadReports'
import useNotifications from '../hooks/useNotifications'

const WeatherRoadUpdates = () => {
  const { reports, isLoading, error } = useWeatherReports({ limit: 5 })
  const {
    resorts,
    isLoading: resortsLoading,
    error: resortsError,
  } = useResorts({ limit: 50 })
  const {
    roadReports,
    isLoading: roadsLoading,
    error: roadsError,
  } = useRoadReports({ limit: 6 })
  const {
    notifications,
    isLoading: alertsLoading,
    error: alertsError,
  } = useNotifications({ limit: 6 })

  const resortById = useMemo(() => {
    const map = {}
    resorts.forEach((resort) => {
      map[resort.resort_id] = resort
    })
    return map
  }, [resorts])

  const hazardAlerts = notifications.filter((notification) =>
    ['alert', 'system'].includes((notification.type || '').toLowerCase()),
  )

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
        <h2>Alerts & Notifications</h2>
        {alertsLoading && <p>Loading alerts…</p>}
        {alertsError && <p className="form-error">{alertsError.message}</p>}
        {!alertsLoading && hazardAlerts.length === 0 && <p>No active system alerts.</p>}
        <ul>
          {hazardAlerts.map((notification) => (
            <li key={notification.notification_id}>
              <strong>{notification.type}</strong>: {notification.message}{' '}
              <span>({new Date(notification.sent_at).toLocaleString()})</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h2>Latest Weather Reports</h2>
        {isLoading && <p>Loading reports…</p>}
        {error && <p className="form-error">{error.message}</p>}
        {resortsError && <p className="form-error">{resortsError.message}</p>}
        {!isLoading && !error && reports.length === 0 && <p>No reports available yet.</p>}

        <div className="placeholder-grid">
          {reports.map((report) => (
            <article key={report.weather_id}>
              <h3>{new Date(report.report_time).toLocaleString()}</h3>
              <p>
                Resort: {resortById[report.resort_id]?.name ?? 'Unknown resort'}
                {resortById[report.resort_id]?.location ? (
                  <span> · {resortById[report.resort_id].location}</span>
                ) : null}
              </p>
              {resortsLoading && !resortById[report.resort_id] && <p>Loading resort details…</p>}
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
        <h2>Road Status &amp; Visibility</h2>
        {roadsLoading && <p>Loading road reports…</p>}
        {roadsError && <p className="form-error">{roadsError.message}</p>}
        {!roadsLoading && !roadsError && roadReports.length === 0 && <p>No road reports logged yet.</p>}
        <div className="placeholder-grid">
          {roadReports.map((road) => (
            <article key={road.road_id}>
              <h3>{resortById[road.resort_id]?.name ?? 'Unknown resort'}</h3>
              <p>
                Status: <strong>{road.road_status ?? 'n/a'}</strong>
              </p>
              <p>Visibility: {road.visibility ?? 'n/a'}</p>
              <p>Updated {new Date(road.updated_at).toLocaleTimeString()}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default WeatherRoadUpdates
