import { useNavigate } from 'react-router-dom'
import ThreeBackground from '../components/ThreeBackground'

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

const Landing = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/dashboard')
  }

  const handleLogin = () => {
    navigate('/login')
  }

  const handleRegister = () => {
    navigate('/register')
  }

  return (
    <div
      className="min-h-screen relative"
      style={{
        background:
          'linear-gradient(135deg, rgba(219, 234, 254, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(243, 232, 255, 0.3) 100%)',
      }}
    >
      {/* 3D Background */}
      <ThreeBackground />

      {/* Header */}
      <Header onLogin={handleLogin} onRegister={handleRegister} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 relative z-10">
        <HeroSection />
        <IntelligenceSection />
        <DemoSection />
        <ProblemSection />
        <FeaturesSection />
        <TargetAudienceSection />
        <TestimonialsSection />
        <CTASection onGetStarted={handleGetStarted} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Landing
