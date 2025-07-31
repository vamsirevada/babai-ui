import { useNavigate } from 'react-router-dom'
import { useCallback, lazy, Suspense, useEffect } from 'react'
import { prefetch } from '../App.jsx'

// Import section components
import Header from '../components/landing/Header'
import HeroSection from '../components/landing/HeroSection'

const IntelligenceSection = lazy(() =>
  import('../components/landing/IntelligenceSection')
)
const DemoSection = lazy(() => import('../components/landing/DemoSection'))
const ProblemSection = lazy(() =>
  import('../components/landing/ProblemSection')
)
const FeaturesSection = lazy(() =>
  import('../components/landing/FeaturesSection')
)
const TargetAudienceSection = lazy(() =>
  import('../components/landing/TargetAudienceSection')
)
const TestimonialsSection = lazy(() =>
  import('../components/landing/TestimonialsSection')
)
const CTASection = lazy(() => import('../components/landing/CTASection'))
const Footer = lazy(() => import('../components/landing/Footer'))
const ThreeBackground = lazy(() => import('../components/ThreeBackground'))

const SectionLoader = () => <div className="w-full h-[50vh]" />

const Landing = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      prefetch.dashboard()
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

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
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="min-h-[calc(100vh-6rem)] flex flex-col justify-center">
            <HeroSection />
          </div>
        </section>

        <Suspense fallback={<SectionLoader />}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div data-section="intelligence" className="mb-16 sm:mb-20">
              <IntelligenceSection />
            </div>
            <div className="space-y-16 sm:space-y-20">
              <DemoSection />
              <ProblemSection />
              <FeaturesSection />
              <TargetAudienceSection />
              <TestimonialsSection />
              <CTASection onGetStarted={handleGetStarted} />
            </div>
          </div>
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default Landing
