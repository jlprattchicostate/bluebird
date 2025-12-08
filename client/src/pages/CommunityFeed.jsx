import { useMemo, useState, useCallback } from 'react'
import usePosts from '../hooks/usePosts'
import useResorts from '../hooks/useResorts'

const CommunityFeed = () => {
  const { posts, isLoading, error } = usePosts({ limit: 9 })
  const { resorts } = useResorts({ limit: 100 })
  const [likedPosts, setLikedPosts] = useState(new Set())

  const resortById = useMemo(() => {
    const map = {}
    resorts.forEach((resort) => {
      map[resort.resort_id] = resort
    })
    return map
  }, [resorts])

  const toggleLike = useCallback((postId) => {
    setLikedPosts((prev) => {
      const next = new Set(prev)
      if (next.has(postId)) {
        next.delete(postId)
      } else {
        next.add(postId)
      }
      return next
    })
  }, [])

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
          {posts.map((post) => {
            const liked = likedPosts.has(post.post_id)
            return (
              <article key={post.post_id} className={liked ? 'post-card liked' : 'post-card'}>
                <h3>{post.caption || 'Untitled update'}</h3>
                <p>
                  Resort: {resortById[post.resort_id]?.name ?? 'Unknown'}
                  {resortById[post.resort_id]?.location ? (
                    <span> · {resortById[post.resort_id].location}</span>
                  ) : null}
                </p>
                <p>Vibe: {post.vibe_tag ?? 'n/a'}</p>
                <p>{new Date(post.created_at).toLocaleString()}</p>
                <div className="post-like-meta">
                  <span className="post-like-count" aria-label="1,273 likes">
                    1,273 likes
                  </span>
                  <button
                    type="button"
                    className={liked ? 'post-like-button is-liked' : 'post-like-button'}
                    aria-pressed={liked}
                    aria-label={liked ? 'Unlike post' : 'Like post'}
                    onClick={() => toggleLike(post.post_id)}
                  >
                    <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                      <path d="M12 21s-6.2-4.35-9.33-8.13C1.35 11.19 1 9.9 1 8.56 1 5.64 3.35 3 6.24 3c1.64 0 3.2.81 4.18 2.09A5.07 5.07 0 0 1 14.6 3C17.5 3 20 5.52 20 8.56c0 1.34-.35 2.63-1.67 4.31C18.2 16.65 12 21 12 21z" />
                    </svg>
                  </button>
                </div>
              </article>
            )
          })}
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
