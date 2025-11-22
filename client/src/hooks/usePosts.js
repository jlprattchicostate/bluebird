import { useEffect, useState } from 'react'
import { getPosts } from '../lib/apiClient'

const DEFAULT_PARAMS = { limit: 10 }

export default function usePosts(params = DEFAULT_PARAMS) {
  const [posts, setPosts] = useState([])
  const [meta, setMeta] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    setError(null)

    getPosts(params)
      .then((payload) => {
        if (!isMounted) return
        setPosts(payload?.data ?? [])
        setMeta(payload?.meta ?? null)
      })
      .catch((err) => {
        if (!isMounted) return
        setError(err)
      })
      .finally(() => {
        if (!isMounted) return
        setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [JSON.stringify(params)])

  return { posts, meta, isLoading, error }
}
