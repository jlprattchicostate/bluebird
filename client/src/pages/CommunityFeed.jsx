import { useMemo } from 'react'
import usePosts from '../hooks/usePosts'
import useResorts from '../hooks/useResorts'

const CommunityFeed = () => {
  const { posts, isLoading, error } = usePosts({ limit: 9 })
  const { resorts } = useResorts({ limit: 100 })

  const resortById = useMemo(() => {
    const map = {}
    resorts.forEach((resort) => {
      map[resort.resort_id] = resort
    })
    return map
  }, [resorts])

  return (
    <main className="page" aria-labelledby="community-feed-title">
      <header className="page-header">
        <p className="eyebrow">Feature · Community Feed</p>
        <h1 id="community-feed-title">Community Feed</h1>
        <p className="page-intro">
          User-generated reports, photos, vibe checks, and moderation tooling to keep the community
          accurate and safe.
        </p>
      </header>

      <section className="panel">
        <h2>Trending Posts</h2>
        <p>Recent activity from riders. Hooked up to the posts API.</p>
        {isLoading && <p>Loading posts…</p>}
        {error && <p className="form-error">{error.message}</p>}
        {!isLoading && !error && posts.length === 0 && <p>No posts yet. Be the first to report conditions.</p>}
        <div className="placeholder-grid">
          {posts.map((post) => (
            <article key={post.post_id}>
              <h3>{post.caption || 'Untitled update'}</h3>
              <p>
                Resort: {resortById[post.resort_id]?.name ?? 'Unknown'}
                {resortById[post.resort_id]?.location ? (
                  <span> · {resortById[post.resort_id].location}</span>
                ) : null}
              </p>
              <p>Vibe: {post.vibe_tag ?? 'n/a'}</p>
              <p>{new Date(post.created_at).toLocaleString()}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Post Composer</h2>
        <p>Interface for rich text, photo uploads, and resort tagging (implementation forthcoming).</p>
        <ul>
          <li>Text area placeholder</li>
          <li>Photo attachment placeholder</li>
          <li>Submission confirmation placeholder</li>
        </ul>
      </section>

      <section className="panel">
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
}

export default CommunityFeed
