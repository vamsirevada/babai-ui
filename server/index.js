import express from 'express'
import cors from 'cors'
import pkg from 'pg'

const {Pool} = pkg

const app = express()
app.use(cors())
app.use(express.json())

const pool = new Pool({
		user: 'postgres',
		host: 'localhost',
		database: 'mydb',
		password: 'dhoni',
		port: 5432,
})

app.get('/projects', async (req, res) => {
		try {
				const result = await pool.query('SELECT id, name FROM projects')
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