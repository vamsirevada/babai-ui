// src/utils/api.js - Global API helper with fallback
const isDevelopment = process.env.NODE_ENV === 'development'
const LOCAL_API = 'http://localhost:4000' || 'http://10.101.56.159:4000'
const PROD_API = '/api'

// Test if local server is available
let localServerAvailable = false

const checkLocalServer = async () => {
  if (!isDevelopment) return false

  try {
    const response = await fetch(`${LOCAL_API}/health`, {
      method: 'GET',
      timeout: 2000, // 2 second timeout
    })
    return response.ok
  } catch {
    return false
  }
}

// Initialize local server check
if (isDevelopment) {
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

export const apiCall = async (endpoint, options = {}) => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint

  const localUrl = `${LOCAL_API}/${cleanEndpoint}`
  const prodUrl = `${PROD_API}/${cleanEndpoint}`

  // In production, always use production API
  if (!isDevelopment) {
    return await fetch(prodUrl, options)
  }

  // In development, try local first, then fallback
  try {
    const response = await fetch(localUrl, {
      ...options,
      timeout: 3000, // 3 second timeout for local calls
    })

    if (response.ok) {
      localServerAvailable = true
      return response
    }

    throw new Error('Local server returned error')
  } catch (error) {
    localServerAvailable = false
    console.warn(`Local server failed (${error.message}), using production API`)

    // Fallback to production API
    return await fetch(prodUrl, options)
  }
}

export const getApiStatus = () => ({
  isDevelopment,
  localServerAvailable,
  currentApi: isDevelopment && localServerAvailable ? 'local' : 'production',
})
