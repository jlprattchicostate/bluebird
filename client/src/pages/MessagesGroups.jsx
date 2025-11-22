import useNotifications from '../hooks/useNotifications'
import { useAuth } from '../context/AuthContext'

const MessagesGroups = () => {
  const { user } = useAuth()
  const { notifications, isLoading, error } = useNotifications(
    user ? { user_id: user.id, limit: 10 } : { limit: 10 },
  )

  return (
    <main className="page" aria-labelledby="messages-groups-title">
      <header className="page-header">
        <p className="eyebrow">Feature · Messages &amp; Group Chats</p>
        <h1 id="messages-groups-title">Messages &amp; Group Chats</h1>
        <p className="page-intro">
          Direct messages, group coordination, and carpool planning spaces powered by realtime
          delivery and notifications.
        </p>
        {!user && (
          <div className="cta-card">
            <p>Sign in to see your personalized alerts and chat previews.</p>
          </div>
        )}
      </header>

      <section className="panel" id="direct-messages">
        <h2>Recent Alerts (pre-messaging)</h2>
        <p>Using notifications feed until dedicated chat service is available.</p>
        {isLoading && <p>Loading notifications…</p>}
        {error && <p className="form-error">{error.message}</p>}
        {!isLoading && !error && notifications.length === 0 && <p>No notifications yet.</p>}
        <div className="placeholder-grid">
          {notifications.map((notification) => (
            <article key={notification.notification_id}>
              <h3>{notification.title ?? 'Notification'}</h3>
              <p>{notification.body ?? 'No message content'}</p>
              <p>{new Date(notification.sent_at).toLocaleString()}</p>
              <p>Status: {notification.read ? 'Read' : 'Unread'}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel" id="group-chats">
        <h2>Group Chats</h2>
        <p>Create groups for squads riding together (UI placeholder until API available).</p>
        <ul>
          <li>Group creation flow placeholder</li>
          <li>Invite via username/link placeholder</li>
          <li>Push notification options placeholder</li>
        </ul>
      </section>

      <section className="panel" id="carpool">
        <h2>Carpool Coordination</h2>
        <p>Logistics add-ons for carpool &amp; meetup planning.</p>
        <ol>
          <li>Trip itinerary placeholder</li>
          <li>Passenger slots placeholder</li>
          <li>Safety checklist placeholder</li>
        </ol>
      </section>
    </main>
  )
}

export default MessagesGroups
