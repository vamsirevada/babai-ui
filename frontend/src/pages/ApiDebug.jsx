// Debug page to test API in production
import React, { useState, useEffect } from 'react'

const ApiDebugPage = () => {
  const [debugInfo, setDebugInfo] = useState(null)
  const [testResults, setTestResults] = useState(null)

  useEffect(() => {
    // Collect debug information
    const info = {
      mode: import.meta.env.MODE,
      isDevelopment: import.meta.env.MODE === 'development',
      apiUrl: import.meta.env.VITE_API_URL,
      nodeEnv: import.meta.env.NODE_ENV,
      allEnvVars: import.meta.env,
    }
    setDebugInfo(info)
  }, [])

  const testLambdaDirect = async () => {
    const elasticUrl = 'https://api.bab-ai.com/'

    try {
      console.log('🧪 Testing EB directly...')

      // Test root
      const rootResponse = await fetch(`${elasticUrl}/`)
      const rootData = await rootResponse.json()

      // Test health
      const healthResponse = await fetch(`${elasticUrl}/health`)
      const healthData = await healthResponse.json()

      setTestResults({
        success: true,
        root: { status: rootResponse.status, data: rootData },
        health: { status: healthResponse.status, data: healthData },
      })
    } catch (error) {
      setTestResults({
        success: false,
        error: error.message,
      })
    }
  }

  const testApiUtility = async () => {
    try {
      // Use the API utility function instead of direct fetch
      const data = await api.get('/health')
      setTestResults((prev) => ({
        ...prev,
        apiUtil: {
          success: true,
          data: data,
          error: null,
        },
      }))
    } catch (error) {
      console.error('API Utility test failed:', error)
      setTestResults((prev) => ({
        ...prev,
        apiUtil: {
          success: false,
          data: null,
          error: error.message,
        },
      }))
    }
  }

  const testApiUtil = async () => {
    try {
      // Import API utility dynamically
      const { checkHealth, testApiConnection } = await import('../utils/api')

      console.log('🧪 Testing via API utility...')
      const result = await testApiConnection()

      setTestResults({
        success: true,
        apiUtil: result,
      })
    } catch (error) {
      setTestResults({
        success: false,
        apiUtilError: error.message,
      })
    }
  }

  const testDirectCall = async () => {
    try {
      // Clean URL construction - no double slashes
      const baseUrl =
        import.meta.env.VITE_API_URL?.replace(/\/$/, '') ||
        'https://api.bab-ai.com'
      const url = `${baseUrl}/health`

      const response = await fetch(url)
      const data = await response.json()

      setTestResults((prev) => ({
        ...prev,
        direct: {
          success: response.ok,
          data: data,
          error: response.ok ? null : 'Request failed',
          url: url, // Show the actual URL used
        },
      }))
    } catch (error) {
      console.error('Direct test failed:', error)
      setTestResults((prev) => ({
        ...prev,
        direct: {
          success: false,
          data: null,
          error: error.message,
        },
      }))
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>🔍 API Debug Page</h1>

      <h2>Environment Info:</h2>
      <pre
        style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}
      >
        {JSON.stringify(debugInfo, null, 2)}
      </pre>

      <h2>Test Buttons:</h2>
      <button
        onClick={testDirectCall}
        style={{ margin: '10px', padding: '10px' }}
      >
        Test Lambda Direct
      </button>
      <button
        onClick={testApiUtility}
        style={{ margin: '10px', padding: '10px' }}
      >
        Test API Utility
      </button>

      {testResults && (
        <>
          <h2>Test Results:</h2>
          <pre
            style={{
              background: '#f5f5f5',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            {JSON.stringify(testResults, null, 2)}
          </pre>
        </>
      )}
    </div>
  )
}

export default ApiDebugPage
