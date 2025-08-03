// api/projects.js - Vercel serverless function (converted from your Express route)
import {Pool} from 'pg'

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
				res.status(405).json({error: 'Method not allowed'})
				return
		}

		try {
				const result = await pool.query('SELECT id, name FROM projects')
				console.log('Database query successful, rows:', result.rows.length)
				res.status(200).json(result.rows)
		} catch (error) {
				console.error('Database error in /api/projects:', error)
				res.status(500).json({
						error: 'Server error',
						details: error.message,
				})
		}
}
