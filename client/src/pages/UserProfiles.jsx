const UserProfiles = () => (
  <main className="page" aria-labelledby="user-profiles-title">
    <header className="page-header">
      <p className="eyebrow">Feature · User Profiles</p>
      <h1 id="user-profiles-title">User Profiles</h1>
      <p className="page-intro">
        Profiles showcase rider bio, experience level, favorite resorts, and social graph to power
        following + personalization.
      </p>
      <nav className="sub-nav" aria-label="Profile sections">
        <a href="#identity">Identity</a>
        <a href="#favorites">Favorite Resorts</a>
        <a href="#connections">Connections</a>
      </nav>
    </header>

    <section className="panel" id="identity">
      <h2>Profile Identity</h2>
      <p>Editable card with avatar, name, and riding bio.</p>
      <div className="placeholder-grid">
        <article>
          <h3>Profile Header</h3>
          <p>Avatar upload, pronouns, mountain region placeholder.</p>
        </article>
        <article>
          <h3>Experience Level</h3>
          <p>Beginner/intermediate/expert selector placeholder.</p>
        </article>
        <article>
          <h3>Settings Link</h3>
          <p>Edit profile CTA placeholder.</p>
        </article>
      </div>
    </section>

    <section className="panel" id="favorites">
      <h2>Favorite Resorts</h2>
      <p>List of pinned resorts reused across dashboard &amp; compare flows.</p>
      <ul>
        <li>Favorite chips placeholder</li>
        <li>Reorder drag handle placeholder</li>
        <li>Sync with Check Conditions placeholder</li>
      </ul>
    </section>

    <section className="panel" id="connections">
      <h2>Connections &amp; Followers</h2>
      <p>Follow/unfollow interactions plus stats.</p>
      <ol>
        <li>Followers/Following counters placeholder</li>
        <li>Recent activity feed placeholder</li>
        <li>Privacy controls placeholder</li>
      </ol>
    </section>
  </main>
)

export default UserProfiles
