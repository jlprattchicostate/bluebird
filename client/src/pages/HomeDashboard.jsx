import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import useWeatherReports from '../hooks/useWeatherReports'
import useResorts from '../hooks/useResorts'
import useFavorites from '../hooks/useFavorites'
import usePosts from '../hooks/usePosts'
import useNotifications from '../hooks/useNotifications'

const HomeDashboard = () => {
  const { user } = useAuth()
  const { reports, isLoading: weatherLoading, error: weatherError } = useWeatherReports({ limit: 4 })
  const { resorts } = useResorts({ limit: 50 })
  const {
    favorites,
    isLoading: favLoading,
    error: favError,
  } = useFavorites(user ? { user_id: user.id, limit: 6 } : {})
  const {
    posts,
    isLoading: postsLoading,
    error: postsError,
  } = usePosts({ limit: 4 })
  const {
    notifications,
    isLoading: notificationsLoading,
    error: notificationsError,
  } = useNotifications({ limit: 4 })

  const resortById = useMemo(() => {
    const map = {}
    resorts.forEach((resort) => {
      map[resort.resort_id] = resort
    })
    return map
  }, [resorts])

  const favoriteResorts = (user ? favorites : []).map((fav) => resortById[fav.resort_id]).filter(Boolean)
  const featuredResorts = favoriteResorts.length ? favoriteResorts : resorts.slice(0, 3)
  const alertNotifications = notifications.filter((notification) =>
    ['alert', 'system'].includes((notification.type || '').toLowerCase()),
  )
  const communityPosts = posts.slice(0, 3)

  return (
    <main className="page" aria-labelledby="home-dashboard-title">
      <header className="page-header">
        <p className="eyebrow">Feature · Home Dashboard</p>
        <h1 id="home-dashboard-title">Home Dashboard</h1>
        <p className="page-intro">
          Morning / evening condition digests, resort highlights, and community intel aggregated in
          one glanceable surface.
        </p>
        {!user && (
          <div className="cta-card">
            <p>Sign in to unlock personalized resort favorites and notification settings.</p>
            <Link to="/login">Go to login</Link>
          </div>
        )}
      </header>

      <section className="panel">
        <h2>Daily Conditions Digest</h2>
        {weatherLoading && <p>Loading telemetry…</p>}
        {weatherError && <p className="form-error">{weatherError.message}</p>}
        {!weatherLoading && !weatherError && reports.length === 0 && <p>No weather reports yet.</p>}
        <div className="placeholder-grid">
          {reports.slice(0, 2).map((report, index) => (
            <article key={report.weather_id}>
              <h3>{index === 0 ? 'Morning Snapshot' : 'Later Today'}</h3>
              <p>
                {resortById[report.resort_id]?.name ?? 'Unknown resort'} ·{' '}
                {resortById[report.resort_id]?.location ?? 'Location coming soon'}
              </p>
              <ul>
                <li>Snowfall: {report.snowfall ?? '—'} in</li>
                <li>Temp: {report.temperature ?? '—'}°F</li>
                <li>Wind: {report.wind_speed ?? '—'} mph</li>
              </ul>
              <p>Reported {new Date(report.report_time).toLocaleTimeString()}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Resort Highlights</h2>
        {favLoading && user && <p>Loading your favorites…</p>}
        {favError && <p className="form-error">{favError.message}</p>}
        <div className="placeholder-grid">
          {featuredResorts.map((resort) => (
            <article key={resort.resort_id}>
              <h3>{resort.name}</h3>
              <p>{resort.location || 'Location TBD'}</p>
              <ul>
                <li>{resort.has_parking ? 'On-site parking' : 'Limited parking'}</li>
                <li>Added {new Date(resort.created_at).toLocaleDateString()}</li>
              </ul>
            </article>
          ))}
          <article>
            <h3>Alert Banner</h3>
            {notificationsLoading && <p>Checking alerts…</p>}
            {notificationsError && <p className="form-error">{notificationsError.message}</p>}
            {!notificationsLoading && alertNotifications.length === 0 && <p>No active alerts.</p>}
            <ul>
              {alertNotifications.map((notification) => (
                <li key={notification.notification_id}>
                  <strong>{notification.type}</strong>: {notification.message}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="panel">
        <h2>Community Pulse</h2>
        {postsLoading && <p>Loading community feed…</p>}
        {postsError && <p className="form-error">{postsError.message}</p>}
        {!postsLoading && !postsError && communityPosts.length === 0 && <p>No rider updates yet.</p>}
        <div className="placeholder-grid">
          {communityPosts.map((post) => (
            <article key={post.post_id}>
              <h3>{post.caption || 'Untitled update'}</h3>
              <p>
                Resort: {resortById[post.resort_id]?.name ?? 'Unknown'}
                {resortById[post.resort_id]?.location ? (
                  <span> · {resortById[post.resort_id].location}</span>
                ) : null}
              </p>
              <p>Vibe: {post.vibe_tag ?? 'n/a'}</p>
              <p>{new Date(post.created_at).toLocaleString()}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default HomeDashboard
