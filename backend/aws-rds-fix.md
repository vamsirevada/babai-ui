# AWS RDS PostgreSQL Connection Fix

## Current Configuration:

- **RDS Host:** db.bab-ai.com
- **Database:** babai_production
- **User:** babai_admin
- **Your IP:** 183.83.219.160

## Steps to Fix Connection:

### 1. AWS Console - Security Group Fix

```
1. Go to AWS Console → EC2 → Security Groups
2. Find security group for your RDS (usually "rds-launch-wizard-X")
3. Edit Inbound Rules:
   - Type: PostgreSQL
   - Port: 5432
   - Source: 183.83.219.160/32
   - Description: "Dev IP access"
4. Save Rules
```

### 2. Check RDS Instance Settings

```
1. Go to AWS Console → RDS → Databases
2. Click on your PostgreSQL instance
3. Verify:
   - Publicly accessible: Yes
   - VPC security groups: Should include the one you just modified
   - Database name: Should have "babai_production" or create it
```

### 3. Create Database if Needed

```sql
-- Connect as master user to create database
psql -h db.bab-ai.com -U babai_admin -d postgres

-- Create database
CREATE DATABASE babai_production;
GRANT ALL PRIVILEGES ON DATABASE babai_production TO babai_admin;
\q
```

### 4. Test Connection Manually

```cmd
# Test connection from command line
psql -h db.bab-ai.com -U babai_admin -d babai_production

# If successful, run schema
psql -h db.bab-ai.com -U babai_admin -d babai_production -f schema.sql
```

### 5. Restart Backend

```cmd
# Stop current process (Ctrl+C)
npm run dev
```

## Troubleshooting:

**If still getting "no pg_hba.conf entry":**

- Security group rule might take 1-2 minutes to apply
- Try refreshing AWS console and check if rule is active
- Make sure source is exactly: 183.83.219.160/32

**If getting "database does not exist":**

- Connect to 'postgres' database first
- Create 'babai_production' database
- Run schema.sql against the new database

**If SSL errors:**

- RDS requires SSL by default
- Current config should handle this automatically
