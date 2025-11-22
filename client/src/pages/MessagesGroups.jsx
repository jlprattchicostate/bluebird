const MessagesGroups = () => (
  <main className="page" aria-labelledby="messages-groups-title">
    <header className="page-header">
      <p className="eyebrow">Feature · Messages &amp; Group Chats</p>
      <h1 id="messages-groups-title">Messages &amp; Group Chats</h1>
      <p className="page-intro">
        Direct messages, group coordination, and carpool planning spaces powered by realtime
        delivery and notifications.
      </p>
      <nav className="sub-nav" aria-label="Messaging sections">
        <a href="#direct-messages">Direct Messages</a>
        <a href="#group-chats">Group Chats</a>
        <a href="#carpool">Carpool Coordination</a>
      </nav>
    </header>

    <section className="panel" id="direct-messages">
      <h2>Direct Messages</h2>
      <p>One-to-one chat threads with persistent history.</p>
      <div className="placeholder-grid">
        <article>
          <h3>Conversation List</h3>
          <p>Recent chats, unread badges placeholder.</p>
        </article>
        <article>
          <h3>Message Thread</h3>
          <p>Bubble list, timestamps, delivery status placeholder.</p>
        </article>
        <article>
          <h3>Composer</h3>
          <p>Input, attachment button, send CTA placeholder.</p>
        </article>
      </div>
    </section>

    <section className="panel" id="group-chats">
      <h2>Group Chats</h2>
      <p>Create groups for squads riding together.</p>
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

export default MessagesGroups
