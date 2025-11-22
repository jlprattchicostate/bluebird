import { useEffect, useState } from 'react'
import { getWeatherReports } from '../lib/apiClient'

const DEFAULT_PARAMS = { limit: 5 }

export default function useWeatherReports(params = DEFAULT_PARAMS) {
  const [reports, setReports] = useState([])
  const [meta, setMeta] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    setError(null)

    getWeatherReports(params)
      .then((payload) => {
        if (!isMounted) return
        setReports(payload?.data ?? [])
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

  return { reports, meta, isLoading, error }
}
