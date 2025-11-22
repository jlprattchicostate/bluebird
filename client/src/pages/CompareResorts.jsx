import useResorts from '../hooks/useResorts'

const CompareResorts = () => {
  const { resorts, isLoading, error } = useResorts({ limit: 6 })
  const comparisonSet = resorts.slice(0, 3)

  return (
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
        <p>Choose up to three resorts (showing first three returned from API for now).</p>
        {isLoading && <p>Loading resorts…</p>}
        {error && <p className="form-error">{error.message}</p>}
        <div className="placeholder-grid">
          {comparisonSet.map((resort) => (
            <article key={resort.resort_id}>
              <h3>{resort.name}</h3>
              <p>{resort.location}</p>
              <p>{resort.has_parking ? 'Parking available' : 'Parking limited'}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Comparison Grid</h2>
        <p>Matrix populated from resort metadata (extend with weather + traffic data later).</p>
        <div className="placeholder-grid">
          {comparisonSet.map((resort) => (
            <article key={resort.resort_id}>
              <h3>{resort.name}</h3>
              <ul>
                <li>Parking: {resort.has_parking ? 'On-site' : 'Off-site only'}</li>
                <li>Added: {new Date(resort.created_at).toLocaleDateString()}</li>
                <li>ID: {resort.resort_id}</li>
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Insights &amp; Recommendations</h2>
        <p>Generated from current selection (placeholder text until scoring rules are defined).</p>
        <ol>
          {comparisonSet.map((resort) => (
            <li key={resort.resort_id}>
              {resort.name}: prioritize for {resort.has_parking ? 'easy arrival' : 'carpool planning'}.
            </li>
          ))}
        </ol>
      </section>
    </main>
  )
}

export default CompareResorts
