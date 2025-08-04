// src/utils/api.js - API helper optimized for AWS Lambda
const isDevelopment = import.meta.env.MODE === 'development'

// API configuration for both local and Lambda backends
const getApiConfig = () => {
  const apiUrl = import.meta.env.VITE_API_URL

  if (isDevelopment) {
    return {
      baseUrl: apiUrl || 'http://localhost:4000',
      strategy: apiUrl?.includes('lambda-url')
        ? 'lambda-development'
        : 'local-development',
    }
  }

  // Production - AWS Amplify with Lambda backend
  return {
    baseUrl:
      apiUrl ||
      'https://xu6bjzx45vbot3gwmqfn5f3e3m0ufkma.lambda-url.us-east-1.on.aws',
    strategy: 'lambda-production',
  }
}

const config = getApiConfig()
const API_BASE_URL = config.baseUrl

console.log(`🚀 API Configuration: ${config.strategy}`)
console.log(`📡 API Base URL: ${API_BASE_URL}`)

// Generic API request function optimized for Lambda
export const apiRequest = async (endpoint, options = {}) => {
  // For local development, use /api prefix (handled by Vite proxy)
  // For production, call Lambda URL directly without /api prefix
  let url

  if (isDevelopment && !API_BASE_URL.includes('lambda-url')) {
    // Local development with proxy - keep /api prefix
    url = `${API_BASE_URL}${endpoint}`
  } else {
    // Production Lambda or development with Lambda URL - remove /api prefix
    const cleanEndpoint = endpoint.replace(/^\/api/, '')
    url = `${API_BASE_URL}${cleanEndpoint}`
  }

  const defaultOptions = {
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
