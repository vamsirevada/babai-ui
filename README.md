# BAB AI Dashboard

A modern construction materials ordering platform with WhatsApp integration.

## 🚀 Live Demo

- **Production**: [https://babai-ui.vercel.app](https://babai-ui.vercel.app)
- **Place Order**: [https://babai-ui.vercel.app/place-order](https://babai-ui.vercel.app/place-order)
- **Review Order**: [https://babai-ui.vercel.app/review-order](https://babai-ui.vercel.app/review-order)

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library
- **Deployment**: Vercel
- **Backend**: Node.js (planned)

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

# Start development server
npm run dev

# Build for production
npm run build
```

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
