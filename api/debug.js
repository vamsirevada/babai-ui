// api/debug.js - Debug endpoint to check environment variables and database connection
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    // Check environment variables (without exposing sensitive data)
    const envCheck = {
      DB_USER: !!process.env.DB_USER,
      DB_HOST: !!process.env.DB_HOST,
      DB_DATABASE: !!process.env.DB_DATABASE,
      DB_PASSWORD: !!process.env.DB_PASSWORD,
      DB_PORT: !!process.env.DB_PORT,
      NODE_ENV: process.env.NODE_ENV,
      // Show partial values for debugging (mask sensitive parts)
      DB_HOST_PARTIAL: process.env.DB_HOST
        ? process.env.DB_HOST.substring(0, 10) + '...'
        : 'not set',
      DB_USER_PARTIAL: process.env.DB_USER
        ? process.env.DB_USER.substring(0, 3) + '...'
        : 'not set',
    }

    // Test database connection
    const { Pool } = await import('pg')
    const pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      ssl: {
        rejectUnauthorized: false, // For debugging - more permissive SSL
      },
      connectionTimeoutMillis: 5000, // 5 second timeout
    })

    try {
      const result = await pool.query('SELECT NOW() as current_time')
      await pool.end()

      res.json({
        status: 'success',
        message: 'Database connection successful',
        envVariables: envCheck,
        dbTest: {
          connected: true,
          currentTime: result.rows[0].current_time,
        },
      })
    } catch (dbError) {
      await pool.end()
      throw dbError
    }
  } catch (error) {
    console.error('Debug error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Debug check failed',
      envVariables: {
        DB_USER: !!process.env.DB_USER,
        DB_HOST: !!process.env.DB_HOST,
        DB_DATABASE: !!process.env.DB_DATABASE,
        DB_PASSWORD: !!process.env.DB_PASSWORD,
        DB_PORT: !!process.env.DB_PORT,
      },
      error: error.message,
      code: error.code,
    })
  }
}
