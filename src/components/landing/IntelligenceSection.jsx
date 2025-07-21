import { Card } from '../ui/card.jsx'
import { useScrollAnimation } from '../../hooks/use-scroll-animation'

const IntelligenceSection = () => {
  const [titleRef, titleVisible] = useScrollAnimation()
  const [cardsRef, cardsVisible] = useScrollAnimation()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div
        ref={titleRef}
        className={`text-center mb-16 transition-all duration-1000 transform ${
          titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* SEO-optimized heading with construction keywords */}
        {/* Market positioning badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 px-6 py-3 rounded-full mb-6 shadow-sm border border-orange-200">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-red-700 uppercase tracking-wider">
            #1 Construction AI in India
          </span>
        </div>
        <p className="text-xl lg:text-2xl text-gray-600 max-w-5xl mx-auto leading-relaxed mb-10 italic font-semibold px-4">
          "India's first AI-powered construction management platform that
          converts your WhatsApp conversations into actionable project
          intelligence. Get real-time site monitoring, vendor coordination, and
          predictive analytics - all through the messaging app your team already
          uses."
        </p>

        {/* Key value propositions */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 px-4">
          <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-md border border-green-200 hover:shadow-lg transition-shadow duration-300">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              Zero Learning Curve
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-md border border-blue-200 hover:shadow-lg transition-shadow duration-300">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              Real-time Project Insights
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-md border border-purple-200 hover:shadow-lg transition-shadow duration-300">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              Predictive Cost Control
            </span>
          </div>
        </div>
      </div>

      <div
        ref={cardsRef}
        className={`grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 px-4 transition-all duration-1000 transform ${
          cardsVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-12'
        }`}
      >
        {/* SiteOps AI */}
        <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 group border-2 border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 hover:border-green-200 rounded-2xl">
          {/* SiteOps Video */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 mb-6 group-hover:shadow-xl transition-shadow duration-300">
            <video
              className="w-full h-auto"
              autoPlay
              muted
              loop
              playsInline
              loading="lazy"
              poster="/SiteOps-poster.png"
              style={{
                maxHeight: '200px',
                objectFit: 'cover',
              }}
            >
              <source src="/SiteOps.webm" type="video/webm" />
              <source src="/SiteOps.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Site Ops
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Track daily activities & workforce
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Material delivery coordination
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Real-time quality control
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed text-sm px-2">
            "Streamline site operations through intelligent WhatsApp monitoring
            in all construction phases."
          </p>
        </Card>

        {/* Procurement AI */}
        <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 group border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 hover:border-blue-200 rounded-2xl">
          {/* Procurement Video */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 mb-6 group-hover:shadow-xl transition-shadow duration-300">
            <video
              className="w-full h-auto"
              autoPlay
              muted
              loop
              playsInline
              loading="lazy"
              poster="/Procure-poster.png"
              style={{
                maxHeight: '200px',
                objectFit: 'cover',
              }}
            >
              <source src="/Procure.webm" type="video/webm" />
              <source src="/Procure.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              Procurement
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Instant vendor quotes & comparison
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Automated purchase orders
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Delivery tracking & transparency
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed text-sm px-2">
            "Revolutionize procurement flow with AI-powered vendor management
            through WhatsApp."
          </p>
        </Card>

        {/* Credit */}
        <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 group border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 hover:border-purple-200 rounded-2xl">
          {/* Credit Video */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 mb-6 group-hover:shadow-xl transition-shadow duration-300">
            <video
              className="w-full h-auto"
              autoPlay
              muted
              loop
              playsInline
              loading="lazy"
              poster="/Credit-poster.png"
              style={{
                maxHeight: '200px',
                objectFit: 'cover',
              }}
            >
              <source src="/Credit.webm" type="video/webm" />
              <source src="/Credit.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
              Credit
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              AI verifies progress & invoices
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              Automatic credit disbursement
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              Zero cash flow delays
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed text-sm px-2">
            "Smart credit management that triggers direct vendor payments based
            on verified progress."
          </p>
        </Card>
      </div>
    </div>
  )
}

export default IntelligenceSection
