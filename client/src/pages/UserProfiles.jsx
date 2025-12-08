import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useDashboardPreferences } from '../context/DashboardPreferencesContext'

const UserProfiles = () => {
  const { user } = useAuth()
  const { orderedWidgets, toggleWidget, reorderWidgets } = useDashboardPreferences()
  const [draggingId, setDraggingId] = useState(null)
  const [dragOverId, setDragOverId] = useState(null)

  const handleDragStart = (widgetId) => (event) => {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', widgetId)
    setDraggingId(widgetId)
  }

  const handleDragOver = (widgetId) => (event) => {
    event.preventDefault()
    if (widgetId !== draggingId) {
      setDragOverId(widgetId)
    }
  }

  const handleDrop = (widgetId) => (event) => {
    event.preventDefault()
    const sourceId = draggingId || event.dataTransfer.getData('text/plain')
    reorderWidgets(sourceId, widgetId)
    setDraggingId(null)
    setDragOverId(null)
  }

  const handleDragEnd = () => {
    setDraggingId(null)
    setDragOverId(null)
  }

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

      <section className="panel">
        <h2>Home Dashboard Widgets</h2>
        <p>
          Decide which modules appear on your home dashboard and arrange them from top to bottom.
          These preferences sync soon—showing an interactive preview today.
        </p>
        <div className="widget-preferences">
          <div className="widget-preferences-toolbar">
            <p className="widget-preferences-hint">
              Use the Show toggle to enable a widget, then drag each row to reorder from top to bottom.
            </p>
            <button type="button" className="btn-pill" disabled>
              Save layout (coming soon)
            </button>
          </div>
          <ul className="widget-preferences-list">
            {orderedWidgets.map((widget, index) => (
              <li
                key={widget.id}
                className={`widget-row${widget.enabled ? '' : ' is-muted'}${
                  widget.id === draggingId ? ' is-dragging' : ''
                }${widget.id === dragOverId ? ' is-drop-target' : ''}`}
                draggable
                onDragStart={handleDragStart(widget.id)}
                onDragOver={handleDragOver(widget.id)}
                onDragEnter={handleDragOver(widget.id)}
                onDrop={handleDrop(widget.id)}
                onDragEnd={handleDragEnd}
              >
                <div>
                  <p className="widget-name">
                    {index + 1}. {widget.label}
                  </p>
                  <p className="widget-description">{widget.description}</p>
                </div>
                <div className="widget-controls">
                  <span className="widget-drag-handle" aria-hidden="true">
                    ⋮⋮
                  </span>
                  <label className="widget-toggle">
                    <input
                      type="checkbox"
                      checked={widget.enabled}
                      onChange={() => toggleWidget(widget.id)}
                    />
                    <span>Show</span>
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default UserProfiles
