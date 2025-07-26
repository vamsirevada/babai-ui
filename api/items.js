// api/items.js - Vercel serverless function (converted from your Express route)
import { Pool } from 'pg'

// Create a connection pool (same as your server/index.js)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: process.env.NODE_ENV === 'production',
  },
})

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
    // Same query as your Express route
    const result = await pool.query('SELECT * FROM items')
    res.json(result.rows)
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({
      error: 'Server error',
      details:
        process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}
