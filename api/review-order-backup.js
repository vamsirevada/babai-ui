// api/review-order.js - Simple endpoint that accepts ID as query parameter
import { Pool } from 'pg'

export default async function handler(req, res) {
  // CRITICAL DEBUG: Confirm this handler is being called
  console.log('🚀 REVIEW ORDER FLAT FILE HANDLER INVOKED!')
  console.log('Request URL:', req.url)
  console.log('Request method:', req.method)
  console.log('Full req.query object:', JSON.stringify(req.query, null, 2))

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

  if (req.method !== 'GET') {
    console.log('Method not allowed:', req.method)
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Get ID from query parameter (?id=1) or from path parsing
  const { id } = req.query
  console.log('Extracted ID from query:', id)

  if (!id) {
    console.log('No ID provided')
    return res.status(400).json({
      error: 'ID parameter is required',
      usage: 'Use /api/review-order?id=1 or ensure the ID is in the URL path',
    })
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
    res.json(result.rows[0])
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({
      error: 'Server error',
      details: error.message,
      code: error.code,
    })
  }
}
