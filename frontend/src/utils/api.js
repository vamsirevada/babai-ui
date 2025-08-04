// src/utils/api.js - Simple API helper for AWS Amplify
const isDevelopment = import.meta.env.MODE === 'development'

// Simple API configuration for AWS Amplify only
const getApiConfig = () => {
  if (isDevelopment) {
    return {
      baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:4000',
      strategy: 'development',
    }
  }

  // Production - AWS Amplify with your backend API
  return {
    baseUrl: import.meta.env.VITE_API_URL || '/api',
    strategy: 'amplify-production',
  }
}

const config = getApiConfig()
const API_BASE_URL = config.baseUrl

console.log(`🚀 API Configuration: ${config.strategy}`)
console.log(`📡 API Base URL: ${API_BASE_URL}`)

// Generic API request function
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
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
export const getProjects = () => apiRequest('/projects')

export const createReviewOrder = (items) =>
  apiRequest('/review-order', {
    method: 'POST',
    body: JSON.stringify(items),
  })

export const getReviewOrder = (id) => apiRequest(`/review-order?id=${id}`)

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
}
