// api/review-order/[id].js - Vercel serverless function for review order by ID
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

    // Get ID from path parameter
    const { id } = req.query

    if (!id) {
      return res.status(400).json({ error: 'ID parameter is required' })
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
        rejectUnauthorized: false, // More permissive for AWS RDS
      },
      connectionTimeoutMillis: 10000, // 10 second timeout
    })

    console.log('Attempting to connect to database...')
    const result = await pool.query('SELECT * FROM inventory WHERE id = $1', [
      id,
    ])
    console.log('Database query successful, rows:', result.rows.length)

    await pool.end()

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Review order not found',
        id: id,
      })
    }

    // Return the found review order
    res.json(result.rows[0])

    console.log('Review Order Data:', result.rows[0])
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({
      error: 'Server error',
      details: error.message,
      code: error.code,
    })
  }
}
