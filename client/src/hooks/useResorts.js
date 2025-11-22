import { useEffect, useState } from 'react'
import { getResorts } from '../lib/apiClient'

const DEFAULT_PARAMS = { limit: 10 }

export default function useResorts(params = DEFAULT_PARAMS) {
  const [resorts, setResorts] = useState([])
  const [meta, setMeta] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    setError(null)

    getResorts(params)
      .then((payload) => {
        if (!isMounted) return
        setResorts(payload?.data ?? [])
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

  return { resorts, meta, isLoading, error }
}
