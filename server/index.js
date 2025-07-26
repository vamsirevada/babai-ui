import express from 'express'
import cors from 'cors'
import pkg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const {Pool} = pkg

const app = express()
app.use(cors())
app.use(express.json())

const pool = new Pool({
		user: process.env.DB_USER,
		host: process.env.DB_HOST,
		database: process.env.DB_DATABASE,
		password: process.env.DB_PASSWORD,
		port: process.env.DB_PORT,
		ssl: {
				rejectUnauthorized: false,
		}
})

// This async function will try to connect to the database.
const checkDbConnection = async () => {
		try {
				const client = await pool.connect()
				// If the connection is successful, it will log this message.
				console.log('✅ Successfully connected to the database!')
				client.release() // It's important to release the client back to the pool.
		} catch (error) {
				// If there is an error, it will log the error message.
				console.error('❌ Error connecting to the database:', error.stack)
		}
}

// Call the function right after initializing the pool.
checkDbConnection()
// --- END: Database Connection Check ---

app.get('/projects', async (req, res) => {
		try {
				const result = await pool.query('SELECT id, name FROM projects')
				res.json(result.rows)
		} catch (error) {
				console.error(error)
				res.status(500).send('Server error')
		}
})

app.get('/inventory', async (req, res) => {
		try {
				const result = await pool.query('SELECT * FROM inventory')
				res.json(result.rows)
		} catch (error) {
				console.error(error)
				res.status(500).send('Server error')
		}
})

app.get('/items', async (req, res) => {
		try {
				const result = await pool.query('SELECT * FROM items')
				res.json(result.rows)
		} catch (error) {
				console.error(error)
				res.status(500).send('Server error')
		}
})

app.listen(4000, () => console.log('Server running on port 4000'))