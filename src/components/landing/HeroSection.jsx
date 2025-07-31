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
          <div className="flex justify-center mb-6 sm:mb-8">
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
                    maxHeight: '300px',
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 leading-tight px-4 sm:px-0 font-heading">
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
              className="bg-gradient-to-r from-slate-600 to-emerald-600 bg-clip-text text-transparent ml-2 sm:ml-4 inline-block"
              style={{
                fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                fontWeight: '600',
                fontSize: '1.1em',
                letterSpacing: '0.02em',
                animation:
                  'babaiGlow 3s ease-in-out infinite alternate, slideInRight 0.8s ease-out 0.8s both',
                opacity: '0',
                transform: 'translateX(30px)',
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
          {/* Market positioning badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-slate-300 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 shadow-sm">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488"
                fill="currentColor"
                className="text-functional-success"
              />
            </svg>
            <span className="text-xs sm:text-sm font-medium text-brand-charcoal/80 uppercase tracking-wider font-body">
              WhatsApp Construction AI Platform
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-brand-charcoal mb-4 sm:mb-6 leading-tight px-4 sm:px-0 font-heading">
            Transform Your WhatsApp into{' '}
            <span className="text-brand-primary block mt-2 font-semibold">
              Smart Construction Brain
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-brand-charcoal/70 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0 font-body">
            <span className="font-semibold text-brand-charcoal">
              Works with your existing WhatsApp conversations.
            </span>{' '}
            <span className="font-normal text-brand-charcoal/80 italic">
              Our AI reads every message, photo, and bill to give you real-time
              project control. Predict delays, prevent cost overruns, and manage
              multiple sites effortlessly.
            </span>
          </p>

          {/* Enhanced Key Benefits with WhatsApp Focus */}
          <div
            className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start mb-6 sm:mb-8 px-4 sm:px-0"
            style={{
              animation: 'fadeInUp 0.3s ease-out 0.4s both',
              opacity: '0',
            }}
          >
            <Badge className="bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary border border-brand-primary/30 px-3 sm:px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 text-sm font-body">
              Free to Start
            </Badge>
            <Badge className="bg-brand-charcoal/5 hover:bg-brand-charcoal/10 text-brand-charcoal border border-brand-charcoal/20 px-3 sm:px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 text-sm font-body">
              Works on WhatsApp
            </Badge>
            <Badge className="bg-functional-success/10 hover:bg-functional-success/20 text-functional-success border border-functional-success/30 px-3 sm:px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 text-sm font-body">
              Easy to Learn
            </Badge>
          </div>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <div className="flex justify-center mt-12 sm:mt-16">
        <div className="flex flex-col items-center space-y-3 group cursor-pointer">
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
