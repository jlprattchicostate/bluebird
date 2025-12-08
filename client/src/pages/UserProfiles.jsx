import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useDashboardPreferences } from '../context/DashboardPreferencesContext'

const NOTIFICATION_CHANNELS = [
  {
    key: 'powderAlerts',
    label: 'Powder + Weather',
    description: 'Get pinged when overnight snowfall or wind gusts exceed your threshold.',
    badge: 'Priority',
  },
  {
    key: 'communityAlerts',
    label: 'Community & Messages',
    description: 'Mentions, group invites, and thread replies from your riding crew.',
    badge: 'Social',
  },
  {
    key: 'systemAlerts',
    label: 'System announcements',
    description: 'Release notes, policy updates, and downtime notices from Bluebird.',
    badge: 'Platform',
  },
]

const DIGEST_OPTIONS = [
  { value: 'realtime', label: 'Real-time', helper: 'Send notifications immediately.' },
  { value: 'daily', label: 'Daily', helper: 'Bundle updates into a morning summary.' },
  { value: 'weekly', label: 'Weekly', helper: 'Sunday wrap-up with key highlights.' },
]

const UserProfiles = () => {
  const { user } = useAuth()
  const { orderedWidgets, toggleWidget, reorderWidgets } = useDashboardPreferences()
  const [draggingId, setDraggingId] = useState(null)
  const [dragOverId, setDragOverId] = useState(null)
  const [notificationPrefs, setNotificationPrefs] = useState({
    powderAlerts: true,
    communityAlerts: true,
    systemAlerts: false,
    digestFrequency: 'daily',
    quietHoursStart: '21:00',
    quietHoursEnd: '06:30',
  })
  const isNotificationEditingDisabled = !user

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

  const toggleNotificationPref = (key) => () => {
    setNotificationPrefs((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleDigestChange = (event) => {
    const { value } = event.target
    setNotificationPrefs((prev) => ({ ...prev, digestFrequency: value }))
  }

  const handleQuietHoursChange = (key) => (event) => {
    const { value } = event.target
    setNotificationPrefs((prev) => ({ ...prev, [key]: value }))
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

      <section className="panel notification-preferences">
        <h2>Notification Preferences</h2>
        <p>
          Choose how Bluebird reaches you about new storms, community chatter, and account changes.
          Syncing with Supabase is around the corner—preview the experience today.
        </p>
        <div className="notification-card">
          {!user && (
            <p className="notification-disabled-hint">Sign in to edit and sync your preferences.</p>
          )}
          <form className="notification-form">
            <div className="notification-grid">
              <fieldset disabled={isNotificationEditingDisabled}>
                <legend>Alert channels</legend>
                <div className="channel-list">
                  {NOTIFICATION_CHANNELS.map((channel) => (
                    <label key={channel.key} className="pref-toggle">
                      <input
                        type="checkbox"
                        checked={notificationPrefs[channel.key]}
                        onChange={toggleNotificationPref(channel.key)}
                      />
                      <div>
                        <span className="pref-toggle-label">{channel.label}</span>
                        <span className="pref-toggle-description">{channel.description}</span>
                      </div>
                      <span className="pref-toggle-pill">{channel.badge}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset disabled={isNotificationEditingDisabled}>
                <legend>Digest cadence</legend>
                <div className="digest-options">
                  {DIGEST_OPTIONS.map((option) => (
                    <label key={option.value} className="digest-option">
                      <input
                        type="radio"
                        name="digest"
                        value={option.value}
                        checked={notificationPrefs.digestFrequency === option.value}
                        onChange={handleDigestChange}
                      />
                      <div>
                        <span className="digest-option-label">{option.label}</span>
                        <span className="digest-option-helper">{option.helper}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset disabled={isNotificationEditingDisabled}>
                <legend>Quiet hours</legend>
                <p className="quiet-hours-helper">Muting notifications keeps dawn patrol zen.</p>
                <div className="quiet-hours">
                  <label>
                    <span>Start</span>
                    <input
                      type="time"
                      value={notificationPrefs.quietHoursStart}
                      onChange={handleQuietHoursChange('quietHoursStart')}
                    />
                  </label>
                  <label>
                    <span>End</span>
                    <input
                      type="time"
                      value={notificationPrefs.quietHoursEnd}
                      onChange={handleQuietHoursChange('quietHoursEnd')}
                    />
                  </label>
                </div>
              </fieldset>
            </div>

            <div className="notification-actions">
              <p className="notification-status">
                {user
                  ? 'Preferences will auto-sync soon—preview changes in-app today.'
                  : 'Login to enable syncing across devices.'}
              </p>
              <button type="button" className="btn-primary" disabled>
                Save preferences (coming soon)
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default UserProfiles
