// src/utils/api.js - API helper optimized for AWS Lambda
const isDevelopment = import.meta.env.MODE === 'development'
const apiUrl = import.meta.env.VITE_API_URL

console.log('🔍 Environment Check:', {
  mode: import.meta.env.MODE,
  isDevelopment,
  apiUrl,
  nodeEnv: import.meta.env.NODE_ENV,
})

// API configuration for both local and Elastic Beanstalk backends
const getApiConfig = () => {
  // If we have a Elastic Beanstalk URL (in any environment), use it directly
  if (apiUrl && apiUrl.includes('elasticbeanstalk')) {
    return {
      baseUrl: apiUrl,
      strategy: 'elastic-beanstalk-direct',
      useApiPrefix: false, // Elastic Beanstalk doesn't need /api prefix
    }
  }

  if (isDevelopment) {
    return {
      baseUrl: apiUrl || 'http://localhost:4000',
      strategy: 'local-development',
      useApiPrefix: true, // Local development uses Vite proxy with /api
    }
  }

  // Production fallback - assume Elastic Beanstalk
  return {
    baseUrl:
      'http://babai-backend.eba-qig39iya.us-east-1.elasticbeanstalk.com/',
    strategy: 'eb-production-fallback',
    useApiPrefix: false,
  }
}

const config = getApiConfig()
const API_BASE_URL = config.baseUrl

console.log(`🚀 API Configuration: ${config.strategy}`)
console.log(`📡 API Base URL: ${API_BASE_URL}`)
console.log(`🔧 Use API Prefix: ${config.useApiPrefix}`)

// Generic API request function optimized for Lambda
export const apiRequest = async (endpoint, options = {}) => {
  let url

  if (config.useApiPrefix) {
    // Local development with Vite proxy - keep /api prefix
    url = `${API_BASE_URL}${endpoint}`
  } else {
    // Lambda direct - remove /api prefix and call Lambda directly
    const cleanEndpoint = endpoint.replace(/^\/api/, '') || '/'
    url = `${API_BASE_URL}${cleanEndpoint}`
  }
  const defaultOptions = {
    mode: 'cors',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    cache: 'no-cache',
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  }

  try {
    console.log(`📤 API Request: ${mergedOptions.method || 'GET'} ${url}`)
    const response = await fetch(url, mergedOptions)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log(`📥 API Response: ${url}`, data)
    return data
  } catch (error) {
    console.error(`❌ API Error: ${url}`, error)
    throw error
  }
}

// Specific API functions
export const getProjects = () => apiRequest('/api/projects')

export const createReviewOrder = (items) =>
  apiRequest('/api/review-order', {
    method: 'POST',
    body: JSON.stringify(items),
  })

export const getReviewOrder = (id) => apiRequest(`/api/review-order/${id}`)

// Health check function
export const checkHealth = () => apiRequest('/api/health')

// Test all endpoints
export const testApiConnection = async () => {
  try {
    console.log('🧪 Testing API connection...')

    // Test root endpoint
    const root = await apiRequest('/')
    console.log('✅ Root endpoint:', root)

    // Test health endpoint
    const health = await checkHealth()
    console.log('✅ Health endpoint:', health)

    return { success: true, root, health }
  } catch (error) {
    console.error('❌ API connection test failed:', error)
    return { success: false, error: error.message }
  }
}

// Backward compatibility alias
export const apiCall = (endpoint, options = {}) => {
  // Handle different endpoint formats for backward compatibility
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return apiRequest(cleanEndpoint, options)
}

export default {
  apiRequest,
  apiCall,
  getProjects,
  createReviewOrder,
  getReviewOrder,
  checkHealth,
  testApiConnection,
}
