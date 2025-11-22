import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const UserProfiles = () => {
  const { user } = useAuth()

  return (
    <main className="page" aria-labelledby="user-profiles-title">
      <header className="page-header">
        <p className="eyebrow">Feature · User Profiles</p>
        <h1 id="user-profiles-title">User Profiles</h1>
        <p className="page-intro">
          Central place for riders to manage bios, experience levels, and favorite resorts that
          drive personalization across Bluebird.
        </p>
        {!user && (
          <div className="cta-card">
            <p>Create or access your profile after signing in.</p>
            <Link to="/login">Go to login</Link>
          </div>
        )}
      </header>

      <section className="panel">
        <h2>Profile Identity</h2>
        <p>Placeholder cards for avatar, pronouns, and riding bio.</p>
        <div className="placeholder-grid">
          <article>
            <h3>Avatar &amp; Bio</h3>
            <p>{user ? 'Show edit form' : 'Visible once authenticated.'}</p>
          </article>
          <article>
            <h3>Experience Meter</h3>
            <p>Skill slider + terrain preferences placeholder.</p>
          </article>
          <article>
            <h3>Settings Actions</h3>
            <p>Buttons for editing notifications and privacy.</p>
          </article>
        </div>
      </section>

      <section className="panel">
        <h2>Favorite Resorts</h2>
        <p>Persisted list powering dashboard shortcuts and compare flow.</p>
        <div className="placeholder-grid">
          <article>
            <h3>Favorites Rail</h3>
            <p>{user ? 'List pinned resorts + reorder affordance.' : 'Login to manage favorites.'}</p>
          </article>
          <article>
            <h3>Sync Status</h3>
            <p>Displays last sync with Supabase.</p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default UserProfiles
