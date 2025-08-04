# Fix Cloud Database Connection

## Current Error Analysis:

- **Your IP:** 183.83.219.160
- **Database:** "test" database
- **User:** babai_admin
- **Issue:** IP not whitelisted in pg_hba.conf

## Solutions:

### 1. Whitelist Your IP in Database Firewall

If using AWS RDS, Azure, or similar:

- Go to your database security groups/firewall rules
- Add your IP: 183.83.219.160/32
- Allow PostgreSQL port 5432

### 2. Update Database Configuration

Your current .env should look like:

```env
DB_HOST=your-database-host.com
DB_PORT=5432
DB_DATABASE=test
DB_USER=babai_admin
DB_PASSWORD=your_password
```

### 3. Test Connection

```cmd
# Test if you can connect manually
psql -h your-database-host.com -U babai_admin -d test
```

### 4. Common Cloud Database Providers:

**AWS RDS:**

- Security Groups → Inbound Rules → Add PostgreSQL (5432) from your IP

**Neon.tech:**

- Automatically allows all IPs (no firewall setup needed)

**Supabase:**

- Project Settings → Database → Connection Pooling → Add IP

**Azure Database:**

- Networking → Firewall rules → Add your IP range
