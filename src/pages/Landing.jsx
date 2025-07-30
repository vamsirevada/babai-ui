import { useNavigate } from 'react-router-dom'
import { useCallback, lazy, Suspense } from 'react'

// Import section components
import Header from '../components/landing/Header'
import HeroSection from '../components/landing/HeroSection'
import IntelligenceSection from '../components/landing/IntelligenceSection'
import DemoSection from '../components/landing/DemoSection'
import ProblemSection from '../components/landing/ProblemSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import TargetAudienceSection from '../components/landing/TargetAudienceSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import CTASection from '../components/landing/CTASection'
import Footer from '../components/landing/Footer'

// Lazily load the heavy 3D background component
const ThreeBackground = lazy(() => import('../components/ThreeBackground'))

const Landing = () => {
  const navigate = useNavigate()

  const handleGetStarted = useCallback(() => {
    navigate('/dashboard')
  }, [navigate])

  const handleLogin = useCallback(() => {
    navigate('/login')
  }, [navigate])

  const handleRegister = useCallback(() => {
    navigate('/register')
  }, [navigate])

  return (
    <div className="min-h-screen relative bg-gradient-subtle font-body">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense>

      {/* Header */}
      <Header onLogin={handleLogin} onRegister={handleRegister} />

      {/* Main Content */}
      <main className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <HeroSection />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <IntelligenceSection />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <DemoSection />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <ProblemSection />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <FeaturesSection />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <TargetAudienceSection />
        </div>
        <TestimonialsSection />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <CTASection onGetStarted={handleGetStarted} />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Landing
