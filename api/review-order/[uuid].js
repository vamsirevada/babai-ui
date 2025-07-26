// api/review-order/[uuid].js - Vercel serverless function for path parameter
import { Pool } from 'pg'

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
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

    // Get UUID from path parameter
    const { uuid } = req.query

    if (!uuid) {
      return res.status(400).json({ error: 'UUID parameter is required' })
    }

    console.log('Fetching review order for UUID:', uuid)

    // Validate UUID format (optional but recommended)
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(uuid)) {
      return res.status(400).json({ error: 'Invalid UUID format' })
    }

    // Create a connection pool
    const pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 5432,
      ssl: {
        rejectUnauthorized: false, // More permissive for AWS RDS
      },
      connectionTimeoutMillis: 10000, // 10 second timeout
    })

    console.log('Attempting to connect to database...')
    const reviewOrder = await pool.query(
      'SELECT * FROM inventory WHERE id = $1',
      [uuid]
    )
    console.log('Database query successful, rows:', reviewOrder.rows.length)

    await pool.end()

    // Return structured response
    if (reviewOrder.rows.length === 0) {
      res.json({
        uuid: uuid,
        customerInfo: {},
        items: [],
        status: 'not_found',
      })
    } else {
      res.json({
        uuid: uuid,
        data: reviewOrder.rows,
        status: 'found',
      })
    }

    console.log('Review Order Data:', reviewOrder.rows)
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({
      error: 'Server error',
      details: error.message,
      code: error.code,
    })
  }
}
