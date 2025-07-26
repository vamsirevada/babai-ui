// api/[...review-order].js - Catch-all dynamic route for review-order
import { Pool } from 'pg'

export default async function handler(req, res) {
  // CRITICAL DEBUG: Confirm this handler is being called
  console.log('🚀 CATCH-ALL REVIEW ORDER HANDLER INVOKED!')
  console.log('Request URL:', req.url)
  console.log('Request method:', req.method)
  console.log('Full req.query object:', JSON.stringify(req.query, null, 2))
  console.log('req.query["review-order"]:', req.query['review-order'])

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    console.log('Responding to OPTIONS request')
    res.status(200).end()
    return
  }

  // Parse the route to check if it's a review-order request
  const segments = req.query['review-order'] || []
  console.log('Route segments:', segments)

  // Check if this is /api/review-order/[id]
  if (segments.length === 2 && segments[0] === 'review-order') {
    const id = segments[1]
    console.log('Extracted ID from catch-all route:', id)

    if (req.method !== 'GET') {
      console.log('Method not allowed:', req.method)
      return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
      // Check if environment variables are set
      if (
        !process.env.DB_USER ||
        !process.env.DB_HOST ||
        !process.env.DB_DATABASE ||
        !process.env.DB_PASSWORD
      ) {
        console.error('Missing database environment variables')
        return res.status(500).json({
          error: 'Server configuration error',
          details: 'Database environment variables not configured',
        })
      }

      console.log('Fetching review order for ID:', id)

      // Create a connection pool
      const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 5432,
        ssl: {
          rejectUnauthorized: false,
        },
        connectionTimeoutMillis: 10000,
      })

      console.log('Attempting to connect to database...')
      const result = await pool.query('SELECT * FROM inventory WHERE id = $1', [
        id,
      ])
      console.log('Database query successful, rows:', result.rows.length)

      await pool.end()

      if (result.rows.length === 0) {
        console.log('No review order found with ID:', id)
        return res.status(404).json({
          error: 'Review order not found',
          id: id,
        })
      }

      console.log('Review Order Data:', result.rows[0])
      return res.json(result.rows[0])
    } catch (error) {
      console.error('Database error:', error)
      return res.status(500).json({
        error: 'Server error',
        details: error.message,
        code: error.code,
      })
    }
  }

  // If it's not a valid review-order route, return 404
  console.log('Invalid route or not a review-order request')
  return res.status(404).json({
    error: 'Not found',
    message: 'This endpoint only handles /api/review-order/[id] requests',
    receivedSegments: segments,
  })
}
