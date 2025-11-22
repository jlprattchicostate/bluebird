const CommunityFeed = () => (
  <main className="page" aria-labelledby="community-feed-title">
    <header className="page-header">
      <p className="eyebrow">Feature · Community Feed</p>
      <h1 id="community-feed-title">Community Feed</h1>
      <p className="page-intro">
        User-generated reports, photos, vibe checks, and moderation tooling to keep the community
        accurate and safe.
      </p>
      <nav className="sub-nav" aria-label="Community sections">
        <a href="#trending">Trending Posts</a>
        <a href="#composer">Post Composer</a>
        <a href="#moderation">Moderation</a>
      </nav>
    </header>

    <section className="panel" id="trending">
      <h2>Trending Posts</h2>
      <p>Scrollable stack of recent high-signal updates.</p>
      <div className="placeholder-feed">
        <article>
          <h3>Storm Stoke</h3>
          <p>Placeholder for photo, username, timestamp, and resort tag.</p>
        </article>
        <article>
          <h3>Road Watch</h3>
          <p>Placeholder for road hazard PSA and upvote counter.</p>
        </article>
        <article>
          <h3>Lift Line Vibe</h3>
          <p>Placeholder for crowd level + wait time thread.</p>
        </article>
      </div>
    </section>

    <section className="panel" id="composer">
      <h2>Post Composer</h2>
      <p>Interface for rich text, photo uploads, and resort tagging.</p>
      <ul>
        <li>Text area placeholder</li>
        <li>Photo attachment placeholder</li>
        <li>Submission confirmation placeholder</li>
      </ul>
    </section>

    <section className="panel" id="moderation">
      <h2>Moderation &amp; Reporting</h2>
      <p>Tooling to flag unsafe or misleading posts.</p>
      <ol>
        <li>Report button placeholder</li>
        <li>Moderation queue placeholder</li>
        <li>Escalation workflow placeholder</li>
      </ol>
    </section>
  </main>
)

export default CommunityFeed
