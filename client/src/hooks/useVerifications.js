import { useEffect, useState } from 'react'
import { getVerifications } from '../lib/apiClient'

const DEFAULT_PARAMS = { limit: 10 }

export default function useVerifications(params = DEFAULT_PARAMS) {
  const [verifications, setVerifications] = useState([])
  const [meta, setMeta] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    setError(null)

    getVerifications(params)
      .then((payload) => {
        if (!isMounted) return
        setVerifications(payload?.data ?? [])
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

  return { verifications, meta, isLoading, error }
}
