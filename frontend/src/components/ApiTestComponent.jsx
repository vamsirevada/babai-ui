// Test component to verify Lambda API connection
import React, { useState, useEffect } from 'react'
import { testApiConnection, checkHealth, getProjects } from '../utils/api'

const ApiTestComponent = () => {
  const [testResults, setTestResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const runApiTest = async () => {
    setLoading(true)
    try {
      console.log('🚀 Starting API tests...')

      // Test basic connection
      const connectionTest = await testApiConnection()

      // Test specific endpoints
      let projectsTest = null
      try {
        const projects = await getProjects()
        projectsTest = { success: true, data: projects }
      } catch (error) {
        projectsTest = { success: false, error: error.message }
      }

      setTestResults({
        connection: connectionTest,
        projects: projectsTest,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      setTestResults({
        error: error.message,
        timestamp: new Date().toISOString(),
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Auto-run test on component mount
    runApiTest()
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>🧪 Lambda API Connection Test</h2>

      <button onClick={runApiTest} disabled={loading}>
        {loading ? '⏳ Testing...' : '🔄 Run Test Again'}
      </button>

      {testResults && (
        <div
          style={{
            marginTop: '20px',
            backgroundColor: '#f5f5f5',
            padding: '15px',
            borderRadius: '5px',
          }}
        >
          <h3>Test Results:</h3>
          <pre>{JSON.stringify(testResults, null, 2)}</pre>
        </div>
      )}

      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <p>
          <strong>Expected Lambda URL:</strong>{' '}
          https://xu6bjzx45vbot3gwmqfn5f3e3m0ufkma.lambda-url.us-east-1.on.aws
        </p>
        <p>
          <strong>Current API Base:</strong>{' '}
          {import.meta.env.VITE_API_URL || 'Not set'}
        </p>
      </div>
    </div>
  )
}

export default ApiTestComponent
