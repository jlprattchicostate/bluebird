import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const HomeDashboard = () => {
  const { user } = useAuth()

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
        <h2>Daily Update Slots</h2>
        <p>Placeholders for 6 AM and 6 PM scheduler-driven summary cards.</p>
        <div className="placeholder-grid">
          <article>
            <h3>Morning Snapshot</h3>
            <ul>
              <li>Overnight snowfall</li>
              <li>Road advisory rollup</li>
              <li>Lift delay alerts</li>
            </ul>
          </article>
          <article>
            <h3>Evening Snapshot</h3>
            <ul>
              <li>Next-day storm outlook</li>
              <li>Trail maintenance notices</li>
              <li>Travel timing guidance</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="panel">
        <h2>Resort Highlights</h2>
        <p>Cards summarizing snow depth, trails open, and wait times per resort.</p>
        <div className="placeholder-grid">
          <article>
            <h3>Flagship Resort</h3>
            <p>Telemetry + trending vibe placeholder.</p>
          </article>
          <article>
            <h3>Favorites Rail</h3>
            <p>{user ? 'Your pinned resorts will render here.' : 'Favorites rail available after login.'}</p>
          </article>
          <article>
            <h3>Alert Banner</h3>
            <p>DOT closures, avalanche warnings, and push notification preview placeholder.</p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default HomeDashboard
