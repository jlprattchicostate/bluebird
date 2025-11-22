import { useEffect, useState } from 'react'
import { getNotifications } from '../lib/apiClient'

const DEFAULT_PARAMS = { limit: 10 }

export default function useNotifications(params = DEFAULT_PARAMS) {
  const [notifications, setNotifications] = useState([])
  const [meta, setMeta] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    setError(null)

    getNotifications(params)
      .then((payload) => {
        if (!isMounted) return
        setNotifications(payload?.data ?? [])
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

  return { notifications, meta, isLoading, error }
}
