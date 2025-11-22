import supabase from './supabaseClient'

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

if (!API_BASE_URL) {
  throw new Error('Missing VITE_API_URL environment variable for API requests.')
}

const buildUrl = (path) => {
  if (!path.startsWith('/')) {
    throw new Error(`API path must start with '/'. Received: ${path}`)
  }
  return `${API_BASE_URL}${path}`
}

async function createAuthHeaders(existingHeaders) {
  const headers = new Headers(existingHeaders || {})
  headers.set('Accept', 'application/json')

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const token = session?.access_token
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  return headers
}

async function apiRequest(path, options = {}) {
  const url = buildUrl(path)
  const headers = await createAuthHeaders(options.headers)

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`
    try {
      const body = await response.json()
      if (body?.message) {
        errorMessage = body.message
      }
    } catch (err) {
      errorMessage = response.statusText || errorMessage
    }
    const error = new Error(errorMessage)
    error.status = response.status
    throw error
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

const appendSearchParams = (params = {}) => {
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return
    }

    if (typeof value === 'object' && !(value instanceof Date)) {
      searchParams.set(key, JSON.stringify(value))
      return
    }

    searchParams.set(key, value.toString())
  })

  return searchParams.toString()
}

export async function getWeatherReports(params = {}) {
  const searchParams = new URLSearchParams()

  if (params.resort_id) {
    searchParams.set('resort_id', params.resort_id)
  }

  if (params.since) {
    searchParams.set('since', params.since)
  }

  if (params.limit) {
    searchParams.set('limit', params.limit.toString())
  }

  if (params.offset) {
    searchParams.set('offset', params.offset.toString())
  }

  const queryString = searchParams.toString()
  const path = queryString ? `/weather-reports?${queryString}` : '/weather-reports'
  return apiRequest(path)
}

export async function getResorts(params = {}) {
  const queryString = appendSearchParams(params)
  const path = queryString ? `/resorts?${queryString}` : '/resorts'
  return apiRequest(path)
}

export async function getFavorites(params = {}) {
  const queryString = appendSearchParams(params)
  const path = queryString ? `/favorites?${queryString}` : '/favorites'
  return apiRequest(path)
}

export async function getPosts(params = {}) {
  const queryString = appendSearchParams(params)
  const path = queryString ? `/posts?${queryString}` : '/posts'
  return apiRequest(path)
}

export async function getNotifications(params = {}) {
  const queryString = appendSearchParams(params)
  const path = queryString ? `/notifications?${queryString}` : '/notifications'
  return apiRequest(path)
}

export async function getRoadReports(params = {}) {
  const queryString = appendSearchParams(params)
  const path = queryString ? `/road-reports?${queryString}` : '/road-reports'
  return apiRequest(path)
}

export async function getProfiles(params = {}) {
  const queryString = appendSearchParams(params)
  const path = queryString ? `/profiles?${queryString}` : '/profiles'
  return apiRequest(path)
}

export async function getVerifications(params = {}) {
  const queryString = appendSearchParams(params)
  const path = queryString ? `/verifications?${queryString}` : '/verifications'
  return apiRequest(path)
}

export { apiRequest }
