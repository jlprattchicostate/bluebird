import { useEffect, useState } from 'react'
import { getRoadReports } from '../lib/apiClient'

const DEFAULT_PARAMS = { limit: 10 }

export default function useRoadReports(params = DEFAULT_PARAMS) {
  const [roadReports, setRoadReports] = useState([])
  const [meta, setMeta] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    setError(null)

    getRoadReports(params)
      .then((payload) => {
        if (!isMounted) return
        setRoadReports(payload?.data ?? [])
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

  return { roadReports, meta, isLoading, error }
}
