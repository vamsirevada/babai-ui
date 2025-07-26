// src/utils/api.js - Global API helper with automatic fallback
const isDevelopment = process.env.NODE_ENV === 'development'
const LOCAL_API = 'http://localhost:4000'
const PROD_API = '/api'

// Track local server availability
let localServerAvailable = null

// Test if local server is available
const checkLocalServer = async () => {
  if (!isDevelopment) return false

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 2000) // 2 second timeout

    const response = await fetch(`${LOCAL_API}/health`, {
      method: 'GET',
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    return response.ok
  } catch (error) {
    return false
  }
}

// Initialize local server check on first import
if (isDevelopment && localServerAvailable === null) {
  checkLocalServer().then((available) => {
    localServerAvailable = available
    if (!available) {
      console.warn(
        '🟡 Local development server not available. Using production API.'
      )
    } else {
      console.log('🟢 Local development server connected.')
    }
  })
}

/**
 * Main API call function with automatic fallback
 * @param {string} endpoint - API endpoint (without leading slash)
 * @param {object} options - Fetch options
 * @returns {Promise<Response>} - Fetch response
 */
export const apiCall = async (endpoint, options = {}) => {
  // Clean endpoint
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint

  const localUrl = `${LOCAL_API}/${cleanEndpoint}`
  const prodUrl = `${PROD_API}/${cleanEndpoint}`

  // In production, always use production API
  if (!isDevelopment) {
    return await fetch(prodUrl, options)
  }

  // In development, try local first, then fallback
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000) // 3 second timeout

    const response = await fetch(localUrl, {
      ...options,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (response.ok) {
      localServerAvailable = true
      return response
    }

    throw new Error(`Local server returned ${response.status}`)
  } catch (error) {
    localServerAvailable = false
    console.warn(`Local server failed (${error.message}), using production API`)

    // Fallback to production API
    return await fetch(prodUrl, options)
  }
}

/**
 * Get current API status
 * @returns {object} - API status information
 */
export const getApiStatus = () => ({
  isDevelopment,
  localServerAvailable,
  currentApi: isDevelopment && localServerAvailable ? 'local' : 'production',
  localUrl: LOCAL_API,
  prodUrl: PROD_API,
})

/**
 * Refresh local server status
 * @returns {Promise<boolean>} - Whether local server is available
 */
export const refreshServerStatus = async () => {
  localServerAvailable = await checkLocalServer()
  return localServerAvailable
}

// Helper functions for common API patterns
export const apiGet = (endpoint) => apiCall(endpoint, { method: 'GET' })
export const apiPost = (endpoint, data) =>
  apiCall(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
export const apiPut = (endpoint, data) =>
  apiCall(endpoint, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
export const apiDelete = (endpoint) => apiCall(endpoint, { method: 'DELETE' })
