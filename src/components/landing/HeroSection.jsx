import { Badge } from '../ui/badge'
import { useScrollAnimation } from '../../hooks/use-scroll-animation'

const HeroSection = () => {
  const [videoRef, videoVisible] = useScrollAnimation()
  const [contentRef, contentVisible] = useScrollAnimation()

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
        {/* Left Side - GIF and Hello Babai */}
        <div
          ref={videoRef}
          className={`text-center order-1 lg:order-1 transition-all duration-1000 transform ${
            videoVisible
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-12'
          }`}
        >
          {/* Intro Video */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-50 p-2">
                <video
                  className="w-full h-auto rounded-xl"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/intro-poster.png"
                  style={{
                    maxHeight: '280px',
                    objectFit: 'cover',
                  }}
                >
                  <source src="/intro.webm" type="video/webm" />
                  <source src="/intro.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Video overlay for better integration */}
                <div className="absolute inset-0 bg-gray-900/5 pointer-events-none rounded-xl"></div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-blue-200 rounded-full opacity-40"></div>
              <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 bg-emerald-200 rounded-full opacity-40"></div>
            </div>
          </div>

          {/* Hello Babai Text */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-3 leading-tight px-4 sm:px-0 font-heading">
            <span
              className="text-blue-800 inline-block"
              style={{
                fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                fontWeight: '600',
                fontSize: '1.1em',
                letterSpacing: '0.02em',
                animation:
                  'helloGlow 3s ease-in-out infinite alternate, slideInLeft 0.8s ease-out 0s both',
              }}
            >
              Hello,
            </span>
            <span
              className="bg-gradient-to-r from-slate-600 to-emerald-600 bg-clip-text text-transparent ml-3 sm:ml-4 inline-block"
              style={{
                fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                fontWeight: '600',
                fontSize: '1.1em',
                letterSpacing: '0.02em',
                animation:
                  'babaiGlow 3s ease-in-out infinite alternate, slideInRight 0.8s ease-out 0.8s both',
              }}
            >
              I'm Babai
            </span>
          </h1>
        </div>

        {/* Right Side - Hero Content */}
        <div
          ref={contentRef}
          className={`text-center lg:text-left order-2 lg:order-2 transition-all duration-1000 transform ${
            contentVisible
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-12'
          }`}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-brand-charcoal mb-3 sm:mb-4 leading-tight px-4 sm:px-0 font-heading">
            Construction, Simplified.
            <span className="text-brand-primary block mt-2 font-semibold">
              Directly on WhatsApp
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-brand-charcoal/70 mb-4 sm:mb-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0 font-body">
            <span className="font-normal text-brand-charcoal/80 italic">
              Procure materials, compare suppliers, and access finance all in
              one chat.
            </span>
          </p>

          {/* Enhanced Key Benefits with WhatsApp Focus */}
          <div
            className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start mb-4 sm:mb-6 px-4 sm:px-0"
            style={{
              animation: 'fadeInUp 0.3s ease-out 0.4s both',
              opacity: '0',
            }}
          >
            <Badge className="bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary border border-brand-primary/30 px-3 sm:px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 text-sm font-body">
              Instant Quotes
            </Badge>
            <Badge className="bg-brand-charcoal/5 hover:bg-brand-charcoal/10 text-brand-charcoal border border-brand-charcoal/20 px-3 sm:px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 text-sm font-body">
              Smart Comparisons
            </Badge>
            <Badge className="bg-functional-success/10 hover:bg-functional-success/20 text-functional-success border border-functional-success/30 px-3 sm:px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 text-sm font-body">
              Easy Credit
            </Badge>
          </div>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <div className="flex justify-center mt-8 sm:mt-12">
        <div
          className="flex flex-col items-center space-y-3 group cursor-pointer"
          onClick={() => {
            const intelligenceSection = document.querySelector(
              '[data-section="intelligence"]'
            )
            if (intelligenceSection) {
              intelligenceSection.scrollIntoView({ behavior: 'smooth' })
            }
          }}
        >
          {/* Simple text cue */}
          <span className="text-xs text-brand-charcoal/50 uppercase tracking-wider font-medium group-hover:text-brand-charcoal/70 transition-colors duration-300 font-body">
            Scroll below to know more
          </span>

          {/* Clean arrow */}
          <svg
            className="w-4 h-4 text-brand-charcoal/40 group-hover:text-brand-charcoal/60 group-hover:translate-y-1 transition-all duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>

          {/* Subtle line */}
          <div className="w-px h-8 bg-brand-charcoal/20 opacity-60"></div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
