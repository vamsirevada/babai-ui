# BAB AI - Business Automation & Building AI Platform

A modern construction materials ordering platform with AI-powered procurement automation, built with React, Node.js, and deployed on AWS.

## 🚀 Live Demo

- **Production**: [https://www.bab-ai.com](https://www.bab-ai.com)
- **Admin Dashboard**: [https://www.bab-ai.com/dashboard](https://www.bab-ai.com/dashboard)

## 🏗️ Project Structure

```
bab-ai/
├── frontend/              # React frontend (Vite + Tailwind)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── backend/               # Express.js API (AWS Lambda)
│   ├── src/
│   ├── template.yaml      # SAM template
│   ├── lambda.js          # Lambda handler
│   └── package.json
├── amplify.yml            # AWS Amplify deployment
├── package.json           # Monorepo workspace
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 18** with **Vite**
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Shadcn/ui** components
- **React Router** for navigation

### Backend
- **Node.js** with **Express.js**
- **PostgreSQL** database
- **AWS Lambda** (serverless)
- **API Gateway** for REST API

### Infrastructure
- **AWS Amplify** (frontend hosting)
- **AWS Lambda** (backend API)
- **AWS RDS** (PostgreSQL database)
- **AWS API Gateway** (API management)

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x
- AWS CLI configured
- AWS SAM CLI (for backend deployment)

### 1. Clone and Install
\`\`\`bash
git clone https://github.com/vamsirevada/babai-ui.git
cd bab-ai
npm run install:all
\`\`\`

### 2. Environment Setup

**Frontend (.env):**
\`\`\`bash
cd frontend
cp .env.production.template .env
# Update VITE_API_URL with your backend URL
\`\`\`

**Backend (.env):**
\`\`\`bash
cd backend
cp .env.production.template .env
# Update database credentials
\`\`\`

### 3. Local Development
\`\`\`bash
# Start both frontend and backend
npm run dev

# Or separately:
npm run dev --workspace=frontend  # http://localhost:5173
npm run dev --workspace=backend   # http://localhost:4000
\`\`\`

## 🚚 Deployment

### Frontend (AWS Amplify)
1. Connect your GitHub repo to AWS Amplify
2. Set environment variables in Amplify Console
3. Deploy automatically on push to main

### Backend (AWS Lambda)
\`\`\`bash
cd backend
npm run deploy
\`\`\`

## 📋 Environment Variables

### Frontend (AWS Amplify Console)
\`\`\`
VITE_API_URL=https://your-api-gateway-url.execute-api.region.amazonaws.com/prod
VITE_APP_ENV=production
\`\`\`

### Backend (AWS Lambda Console)
\`\`\`
DB_HOST=your-rds-endpoint
DB_PORT=5432
DB_DATABASE=your-database-name
DB_USER=your-database-user
DB_PASSWORD=your-database-password
NODE_ENV=production
\`\`\`

## 🔧 API Endpoints

- \`GET /projects\` - Get all projects
- \`POST /review-order\` - Create review order
- \`GET /review-order/:id\` - Get review order by ID

## 📱 Features

- **AI-Powered Procurement** - Automated material ordering
- **Real-time Dashboard** - Project and inventory management
- **Mobile Responsive** - Works on all devices
- **Secure Authentication** - JWT-based auth
- **Database Integration** - PostgreSQL with proper schemas

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@bab-ai.com or create an issue in this repository.
