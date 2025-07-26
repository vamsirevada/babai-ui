# Vercel Environment Variables Setup

## 🚀 Add Environment Variables to Vercel

You need to add your database credentials to Vercel's environment variables:

### 1. Go to Vercel Dashboard

- Visit: https://vercel.com/dashboard
- Select your project: `babai-ui`
- Go to **Settings** → **Environment Variables**

### 2. Add These Variables:

| Variable Name | Value                  | Environment |
| ------------- | ---------------------- | ----------- |
| `DB_USER`     | `babai_admin`          | Production  |
| `DB_HOST`     | `db.bab-ai.com`        | Production  |
| `DB_DATABASE` | `test`                 | Production  |
| `DB_PASSWORD` | `ecq5UmGxgjqDFYZPDZFW` | Production  |
| `DB_PORT`     | `5432`                 | Production  |

### 3. Database Schema

Make sure your PostgreSQL database has these tables:

```sql
-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Items/Materials table
CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Sample Data

Insert some sample data:

```sql
-- Sample projects
INSERT INTO projects (name) VALUES
  ('Sunrise Apartments - Phase 1'),
  ('Golden Heights Commercial'),
  ('Green Valley Residential'),
  ('Metro Mall Construction'),
  ('Skyline Towers - Building A');

-- Sample items
INSERT INTO items (name, category, unit, price, quantity) VALUES
  ('Portland Cement (50kg)', 'Cement', 'bags', 450, 50),
  ('Steel Rods TMT (12mm)', 'Steel', 'tonnes', 65000, 2),
  ('Red Bricks (First Class)', 'Bricks', 'pieces', 8, 5000),
  ('River Sand (M-Sand)', 'Sand', 'cubic feet', 45, 500),
  ('20mm Aggregate', 'Aggregate', 'cubic feet', 55, 300),
  ('PVC Pipes (4 inch)', 'Plumbing', 'feet', 120, 200);
```

### 5. Test Your API

After deployment, test these endpoints:

- https://babai-ui.vercel.app/api/projects
- https://babai-ui.vercel.app/api/items

### 6. Security Notes

- ✅ Environment variables are secure in Vercel
- ✅ SSL connection to AWS RDS is enabled
- ✅ API routes include CORS headers
- ⚠️ Consider adding API authentication for production

### 7. Troubleshooting

If you get connection errors:

1. Check AWS RDS security groups allow connections
2. Verify database credentials in Vercel dashboard
3. Check Vercel function logs for detailed errors
