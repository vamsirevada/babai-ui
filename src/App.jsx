import { Toaster } from './components/ui/toaster.jsx'
import { Toaster as Sonner } from './components/ui/sonner'
import { TooltipProvider } from './components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

// 1. Lazily import page components
const Index = lazy(() => import('./pages/Index.jsx'))
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Register = lazy(() => import('./pages/Register.jsx'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'))
const ReviewOrder = lazy(() => import('./pages/ReviewOrder.jsx'))
const GetQuote = lazy(() => import('./pages/GetQuote.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

// 2. Create prefetch functions to be used with our prefetching link
export const prefetch = {
  index: () => import('./pages/Index.jsx'),
  dashboard: () => import('./pages/Dashboard.jsx'),
  login: () => import('./pages/Login.jsx'),
  register: () => import('./pages/Register.jsx'),
  privacyPolicy: () => import('./pages/PrivacyPolicy.jsx'),
  reviewOrder: () => import('./pages/ReviewOrder.jsx'),
  getQuote: () => import('./pages/GetQuote.jsx'),
}

const queryClient = new QueryClient()

const PageLoader = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
)

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* 3. Wrap Routes in Suspense for a loading fallback */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/review-order" element={<ReviewOrder />} />
            <Route path="/get-quote" element={<GetQuote />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
