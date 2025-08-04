# BAB AI - Business Automation & Building AI Platform

A production-ready full-stack application with React frontend and Node.js backend, optimized for AWS deployment.

## 🏗️ Architecture

- **Frontend**: React + Vite + TailwindCSS → **AWS Amplify**
- **Backend**: Node.js + Express + PostgreSQL → **AWS Lambda**
- **Database**: PostgreSQL (local) / AWS RDS (production)

## 📁 Project Structure

```
bab-ai/
├── amplify.yml           # AWS Amplify build config
├── frontend/             # React application
│   ├── src/             # Source code
│   ├── public/          # Static assets
│   ├── package.json     # Frontend dependencies
│   └── node_modules/    # Frontend packages
└── backend/             # Node.js API
    ├── src/
    │   └── index.js     # Express server + Lambda handler
    ├── package.json     # Backend dependencies
    ├── node_modules/    # Backend packages
    └── template.yaml    # SAM deployment config
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL (local development)
- AWS CLI configured (for deployment)

### Local Development

**Frontend** (Terminal 1):

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

**Backend** (Terminal 2):

```bash
cd backend
cp .env.example .env # Configure database
npm install
npm run dev          # http://localhost:4000
```

## 📦 Deployment

### Frontend → AWS Amplify

1. Connect GitHub repo to AWS Amplify
2. Set environment variable: `VITE_API_URL` = your Lambda API URL
3. Deploy automatically on git push

### Backend → AWS Lambda

```bash
cd backend
npm run deploy       # SAM guided deployment
```

## 🌍 Environment Variables

### Frontend (.env)

```bash
VITE_API_URL=http://localhost:4000
VITE_APP_ENV=development
VITE_APP_TITLE=BAB AI
```

### Backend (.env)

```bash
NODE_ENV=development
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=babai_dev
DB_USER=postgres
DB_PASSWORD=your_password
DB_SSL=false
FRONTEND_URL=http://localhost:5173
```

## 🔗 API Endpoints

- `GET /` - Health check
- `GET /health` - Database health
- `GET /projects` - List projects
- `GET /inventory` - List inventory
- `GET /items` - List items
- `GET /review-order/:id` - Order details
- `POST /submit-order` - Submit order

## 🛠️ Scripts

### Frontend

```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview build
```

### Backend

```bash
npm run start        # Production server
npm run dev          # Development server
npm run deploy       # Deploy to Lambda
```

## 🎯 Development Workflow

1. **Clone & Setup**:

   ```bash
   git clone <repo>
   cd bab-ai
   ```

2. **Frontend**:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Backend**:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run dev
   ```

## 📄 License

Private - All Rights Reserved

---

**🎉 Clean, minimal, and production-ready!**
