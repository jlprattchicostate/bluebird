import { useEffect, useState } from 'react'
import { getFavorites } from '../lib/apiClient'

export default function useFavorites(params = {}) {
  const [favorites, setFavorites] = useState([])
  const [meta, setMeta] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    if (!params.user_id) {
      setFavorites([])
      setMeta(null)
      setIsLoading(false)
      setError(null)
      return () => {}
    }

    setIsLoading(true)
    setError(null)

    getFavorites(params)
      .then((payload) => {
        if (!isMounted) return
        setFavorites(payload?.data ?? [])
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

  return { favorites, meta, isLoading, error }
}
