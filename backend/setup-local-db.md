# Local PostgreSQL Setup for BAB AI

## Option 1: Install PostgreSQL Locally (Windows)

1. **Download PostgreSQL:**

   - Go to https://www.postgresql.org/download/windows/
   - Download and install PostgreSQL 15 or 16
   - Remember the password you set for the `postgres` user

2. **Create Database:**

   ```cmd
   # Open Command Prompt as Administrator
   cd "C:\Program Files\PostgreSQL\15\bin"

   # Connect to PostgreSQL
   psql -U postgres

   # Create database and user
   CREATE DATABASE babai_dev;
   CREATE USER babai_admin WITH PASSWORD 'your_secure_password';
   GRANT ALL PRIVILEGES ON DATABASE babai_dev TO babai_admin;
   \q
   ```

3. **Update .env file:**

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=babai_dev
   DB_USER=babai_admin
   DB_PASSWORD=your_secure_password
   ```

4. **Initialize Schema:**
   ```cmd
   cd backend
   psql -U babai_admin -d babai_dev -f schema.sql
   ```

## Option 2: Use Docker (If you have Docker installed)

1. **Run PostgreSQL in Docker:**

   ```cmd
   docker run --name babai-postgres -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=babai_dev -p 5432:5432 -d postgres:15
   ```

2. **Update .env file:**
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=babai_dev
   DB_USER=postgres
   DB_PASSWORD=mypassword
   ```

## Option 3: Free Cloud Database (Neon.tech)

1. **Go to https://neon.tech** and create free account
2. **Create a new project**
3. **Copy connection details to .env**
4. **No firewall issues - works from anywhere**
