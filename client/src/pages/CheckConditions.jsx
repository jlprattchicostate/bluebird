import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import useResorts from '../hooks/useResorts'
import useFavorites from '../hooks/useFavorites'

const CheckConditions = () => {
  const { user } = useAuth()
  const { resorts, isLoading, error } = useResorts({ limit: 9 })
  const {
    favorites,
    isLoading: favLoading,
    error: favError,
  } = useFavorites(user ? { user_id: user.id, limit: 9 } : {})

  const resortById = useMemo(() => {
    const map = {}
    resorts.forEach((resort) => {
      map[resort.resort_id] = resort
    })
    return map
  }, [resorts])

  return (
    <main className="page" aria-labelledby="check-conditions-title">
      <header className="page-header">
        <p className="eyebrow">Feature · Check Conditions</p>
        <h1 id="check-conditions-title">Check Conditions</h1>
        <p className="page-intro">
          Browse resort-level telemetry and pin your go-to mountains for quick access when planning a
          ride day.
        </p>
        {!user && (
          <div className="cta-card">
            <p>Sign in to manage your favorite resorts.</p>
            <Link to="/login">Login</Link>
          </div>
        )}
      </header>

      <section className="panel">
        <h2>Resort Directory</h2>
        <p>Instant view into the latest resorts returned by the API.</p>
        {isLoading && <p>Loading resorts…</p>}
        {error && <p className="form-error">{error.message}</p>}
        <div className="placeholder-grid">
          {resorts.map((resort) => (
            <article key={resort.resort_id}>
              <h3>{resort.name}</h3>
              <p>{resort.location || 'Location TBD'}</p>
              <ul>
                <li>{resort.has_parking ? 'Parking available' : 'Parking limited'}</li>
                <li>Created: {new Date(resort.created_at).toLocaleDateString()}</li>
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Live Metrics Snapshot</h2>
        <p>
          Pulls from resort metadata for quick comparisons. Enrich with weather + lift feeds in a
          future iteration.
        </p>
        <div className="placeholder-grid">
          {resorts.slice(0, 3).map((resort) => (
            <article key={resort.resort_id}>
              <h3>{resort.name}</h3>
              <p>{resort.description || 'Metrics incoming from telemetry service.'}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Favorite Resorts</h2>
        {user ? (
          <>
            {favLoading && <p>Loading favorites…</p>}
            {favError && <p className="form-error">{favError.message}</p>}
            {!favLoading && favorites.length === 0 && <p>No favorites yet. Pin one from the list above.</p>}
            <div className="placeholder-grid">
              {favorites.map((fav) => {
                const resort = resortById[fav.resort_id]
                return (
                  <article key={fav.favorite_id ?? `${fav.user_id}-${fav.resort_id}`}>
                    <h3>{resort?.name ?? 'Resort'}</h3>
                    <p>{resort?.location ?? fav.resort_id}</p>
                    <p>Favorited {new Date(fav.favorited_at).toLocaleString()}</p>
                  </article>
                )
              })}
            </div>
          </>
        ) : (
          <p>Sign in to sync your personalized list.</p>
        )}
      </section>
    </main>
  )
}

export default CheckConditions
