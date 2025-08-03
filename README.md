# BAB.AI - Construction Management Platform

A modern construction materials ordering platform with WhatsApp integration, built with React and Node.js.

## 🚀 Live Demo

- **Production**: [https://babai-ui.vercel.app](https://babai-ui.vercel.app)
- **Place Order**: [https://babai-ui.vercel.app/place-order](https://babai-ui.vercel.app/place-order)
- **Review Order**: [https://babai-ui.vercel.app/review-order](https://babai-ui.vercel.app/review-order)

## 🏗️ Project Structure (Ultra-Clean Monorepo)

```
bab-ai-dashboard/
├── packages/
│   ├── frontend/          # React app (Vite + Tailwind)
│   ├── backend/           # Express API server
│   └── shared/            # Shared utilities
├── amplify.yml            # AWS Amplify deployment config
├── vercel.json            # Vercel deployment config
└── package.json           # Workspace configuration
```

## 🛠️ Tech Stack

### Frontend

- **React** + **Vite**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **React Three Fiber** (3D elements)
- **Custom UI Components**

### Backend

- **Node.js** + **Express**
- **PostgreSQL** database
- **CORS** enabled for frontend integration

### Deployment

**AWS Amplify (Recommended)**:

```bash
git push origin main  # Automatic deployment
```

**Local Development**:

```bash
npm run dev           # Start both frontend and backend
```

## 📱 Features

- ✅ WhatsApp integration for user authentication
- ✅ Responsive mobile-first design
- ✅ Construction materials catalog
- ✅ Bulk order placement
- ✅ Real-time order review and editing
- ✅ Project/site selection
- ✅ Professional UI with modern card layouts

## 🔧 Development Setup

```bash
# Clone the repository
git clone https://github.com/vamsirevada/babai-ui.git
cd babai-ui

# Install dependencies
npm install

# Start development server (both frontend and backend)
npm run dev

# Build for production
npm run build
```

## 🚀 Deployment

### Frontend (AWS Amplify)

1. Connect your GitHub repository to AWS Amplify
2. Amplify will automatically detect `amplify.yml` for build configuration
3. Set environment variables in Amplify Console

### Backend (AWS App Runner/Lambda)

1. **App Runner**: Deploy directly from repository
2. **Lambda**: Use serverless framework or AWS SAM
3. **Database**: Use AWS RDS PostgreSQL

### Alternative: Vercel

- Frontend deploys automatically using `vercel.json` configuration

### Environment Variables

- **Frontend**: Set `VITE_API_URL` to your backend URL
- **Backend**: Configure database connection in `packages/backend/.env`

## 🌐 API Configuration

Currently, the app uses mock data in production. To connect to a real backend:

1. Deploy your backend API to a cloud service
2. Update the API_BASE_URL in the component files:

```javascript
const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://your-backend-api.herokuapp.com' // Your production API
    : 'http://localhost:4000' // Local development
```

3. Or use environment variables:

```bash
# .env.production
VITE_API_BASE_URL=https://your-production-api.com
```

## 📦 Deployment

The app is configured for automatic deployment on Vercel:

1. **Frontend**: Deployed automatically from `main` branch
2. **Backend**: Deploy separately and update API_BASE_URL

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to Vercel
npx vercel --prod
```

## 🔄 Current Status

- ✅ Frontend fully functional with mock data
- ✅ Responsive design optimized for mobile/WhatsApp
- ✅ Production deployment on Vercel
- ⏳ Backend API integration (pending)
- ⏳ Database connectivity (pending)

## 🎯 Next Steps

1. Deploy backend API to cloud service (Heroku, Railway, etc.)
2. Connect PostgreSQL database
3. Implement real WhatsApp API integration
4. Add user authentication
5. Implement order management system

## 📄 License

MIT License - feel free to use this project as needed.
