# BAB AI Backend

Express.js backend API for BAB AI application, deployable to AWS Lambda.

## Prerequisites

- Node.js 20.x
- AWS CLI configured
- AWS SAM CLI (for deployment)
- PostgreSQL database

## Local Development

**⚠️ Database Required:** This backend requires a PostgreSQL database connection to function.

1. Install dependencies:

```bash
npm install
```

2. Set up PostgreSQL database:

   - Install PostgreSQL locally OR use a cloud service (AWS RDS, Neon, etc.)
   - Create a database for your project
   - Run the database schema: `psql -d your_database -f schema.sql`

3. Configure environment:

```bash
copy .env.example .env
```

4. Update `.env` with your database credentials:

   ```
   DB_HOST=your-database-host
   DB_PORT=5432
   DB_DATABASE=your-database-name
   DB_USER=your-username
   DB_PASSWORD=your-password
   ```

5. Start development server:

```bash
npm run dev
```

The server will start on `http://localhost:4000` and require a successful database connection.

## Production Deployment

### Option 1: AWS SAM (Recommended)

1. Build and deploy:

```bash
npm run deploy
```

### Option 2: Manual Lambda Deployment

1. Create deployment package:

```bash
npm install --production
zip -r deployment.zip . -x "node_modules/nodemon/*" ".env" "*.log"
```

2. Upload to AWS Lambda Console
3. Set environment variables in Lambda Console
4. Create API Gateway and connect to Lambda

## Environment Variables

Required environment variables:

- `DB_HOST` - Database host
- `DB_PORT` - Database port (default: 5432)
- `DB_DATABASE` - Database name
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - Frontend URL for CORS

## API Endpoints

- `GET /projects` - Get all projects
- `POST /review-order` - Create review order
- `GET /review-order/:id` - Get review order by ID

## Database Schema

Run `schema.sql` on your PostgreSQL database to create required tables.
