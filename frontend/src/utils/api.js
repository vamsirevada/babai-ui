// src/utils/api.js - Global API helper with deployment strategy awareness
const isDevelopment = process.env.NODE_ENV === 'development'

// Deployment-aware API configuration
const getApiConfig = () => {
  // Check if running on Vercel (backup deployment)
  const isVercel =
    typeof window !== 'undefined' &&
    window.location.hostname.includes('vercel.app')

  // Check if running on AWS Amplify (primary deployment)
  const isAmplify =
    typeof window !== 'undefined' &&
    window.location.hostname.includes('amplifyapp.com')

  if (isDevelopment) {
    return {
      localApi: 'http://localhost:4000',
      prodApi: '/api', // Fallback to relative API calls
      strategy: 'development',
    }
  }

  if (isVercel) {
    return {
      localApi: null,
      prodApi: '/api', // Vercel serverless functions
      strategy: 'vercel-backup',
    }
  }

  if (isAmplify) {
    return {
      localApi: null,
      prodApi:
        process.env.REACT_APP_API_URL || 'https://your-amplify-api.com/api', // AWS API Gateway or Lambda
      strategy: 'amplify-primary',
    }
  }

  // Default fallback
  return {
    localApi: null,
    prodApi: '/api',
    strategy: 'unknown',
  }
}

const config = getApiConfig()
console.log(`🚀 API Strategy: ${config.strategy}`)

// Track local server availability
let localServerAvailable = null

// Test if local server is available
const checkLocalServer = async () => {
  if (!isDevelopment || !config.localApi) return false

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 2000) // 2 second timeout

    const response = await fetch(`${config.localApi}`, {
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

  const localUrl = config.localApi
    ? `${config.localApi}/${cleanEndpoint}`
    : null
  const prodUrl = `${config.prodApi}/${cleanEndpoint}`

  // In production, always use production API based on deployment strategy
  if (!isDevelopment) {
    console.log(`📡 API Call [${config.strategy}]: ${prodUrl}`)
    return await fetch(prodUrl, options)
  }

  // In development, try local first, then fallback
  if (localUrl) {
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
        console.log(`📡 API Call [local]: ${localUrl}`)
        return response
      }

      throw new Error(`Local server returned ${response.status}`)
    } catch (error) {
      localServerAvailable = false
      console.warn(
        `Local server failed (${error.message}), using production API`
      )
    }
  }

  // Fallback to production API
  console.log(`📡 API Call [fallback]: ${prodUrl}`)
  return await fetch(prodUrl, options)
}

/**
 * Get current API status
 * @returns {object} - API status information
 */
export const getApiStatus = () => ({
  isDevelopment,
  localServerAvailable,
  currentApi: isDevelopment && localServerAvailable ? 'local' : 'production',
  strategy: config.strategy,
  localUrl: config.localApi,
  prodUrl: config.prodApi,
  deployment: {
    isVercel: config.strategy === 'vercel-backup',
    isAmplify: config.strategy === 'amplify-primary',
    isDevelopment: config.strategy === 'development',
  },
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
