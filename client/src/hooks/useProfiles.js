import { useEffect, useState } from 'react'
import { getProfiles } from '../lib/apiClient'

const DEFAULT_PARAMS = { limit: 10 }

export default function useProfiles(params = DEFAULT_PARAMS) {
  const [profiles, setProfiles] = useState([])
  const [meta, setMeta] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    setError(null)

    getProfiles(params)
      .then((payload) => {
        if (!isMounted) return
        setProfiles(payload?.data ?? [])
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

  return { profiles, meta, isLoading, error }
}
