import { Card } from '../ui/card.jsx'
import { useScrollAnimation } from '../../hooks/use-scroll-animation'
import RotatingText from '../ui/RotatingText.jsx'

const IntelligenceSection = () => {
  const [cardsRef, cardsVisible] = useScrollAnimation()

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Animated Highlight Section */}
      <div className="text-center mb-12 sm:mb-16 px-4">
        <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-charcoal mb-8 font-heading flex items-center justify-center gap-4 flex-wrap">
          <span>No</span>
          <RotatingText
            texts={['App', 'Learning', 'Setup']}
            mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={'last'}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-120%' }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </div>
        <p className="text-lg sm:text-xl text-brand-charcoal/70 max-w-2xl mx-auto font-body">
          Start using AI-powered construction management instantly on WhatsApp
        </p>
      </div>

      <div
        ref={cardsRef}
        className={`grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 px-4 transition-all duration-1000 transform ${
          cardsVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Procurement AI */}
        <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 group border-2 border-brand-primary/20 bg-gradient-to-br from-brand-primary/5 to-brand-white hover:from-brand-primary/10 hover:to-brand-white hover:border-brand-primary/30 rounded-2xl h-80">
          {/* Procurement Video */}
          <div className="relative w-full h-full overflow-hidden">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              loading="lazy"
              poster="/Procure-poster.png"
            >
              <source src="/Procure.webm" type="video/webm" />
              <source src="/Procure.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Overlay - Shows on Hover */}
            <div className="absolute inset-0 bg-brand-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
              <p className="text-brand-white text-center leading-relaxed text-sm font-body">
                "Gets instant quotes from vendors, compares prices, generates
                purchase orders, and tracks deliveries"
              </p>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
          </div>

          {/* Key Feature - Positioned at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
            <div className="bg-brand-white/95 backdrop-blur-sm rounded-lg py-3 px-4 shadow-lg">
              <div className="text-sm font-semibold text-brand-charcoal font-body">
                Your Purchase Manager-In your Pocket
              </div>
            </div>
          </div>
        </Card>

        {/* Credit */}
        <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 group border-2 border-brand-charcoal/20 bg-gradient-to-br from-brand-charcoal/5 to-brand-white hover:from-brand-charcoal/10 hover:to-brand-white hover:border-brand-charcoal/30 rounded-2xl h-80">
          {/* Credit Video */}
          <div className="relative w-full h-full overflow-hidden">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              loading="lazy"
              poster="/Credit-poster.png"
            >
              <source src="/Credit.webm" type="video/webm" />
              <source src="/Credit.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Overlay - Shows on Hover */}
            <div className="absolute inset-0 bg-brand-charcoal/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
              <p className="text-brand-white text-center leading-relaxed text-sm font-body">
                "No Guesswork. Smart limits. Simple terms. Releases credit
                straight to vendors."
              </p>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
          </div>

          {/* Key Feature - Positioned at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
            <div className="bg-brand-white/95 backdrop-blur-sm rounded-lg py-3 px-4 shadow-lg">
              <div className="text-sm font-semibold text-brand-charcoal font-body">
                Your Personal Banker-Instant Credit
              </div>
            </div>
          </div>
        </Card>
        {/* SiteOps AI */}
        <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 group border-2 border-functional-success/20 bg-gradient-to-br from-functional-success/5 to-brand-white hover:from-functional-success/10 hover:to-brand-white hover:border-functional-success/30 rounded-2xl h-80">
          {/* SiteOps Video */}
          <div className="relative w-full h-full overflow-hidden">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              loading="lazy"
              poster="/SiteOps-poster.png"
            >
              <source src="/SiteOps.webm" type="video/webm" />
              <source src="/SiteOps.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Overlay - Shows on Hover */}
            <div className="absolute inset-0 bg-functional-success/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
              <p className="text-brand-white text-center leading-relaxed text-sm font-body">
                "Tracks work, people, and progress smartly. Provides in detail
                analysis and suggestions.(Coming Soon)"
              </p>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
          </div>

          {/* Key Feature - Positioned at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
            <div className="bg-brand-white/95 backdrop-blur-sm rounded-lg py-3 px-4 shadow-lg">
              <div className="text-sm font-semibold text-brand-charcoal font-body">
                Your Site Supervisor-On Duty Always
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default IntelligenceSection
