import { Card } from '../ui/card.jsx'

const IntelligenceSection = () => {
  return (
    <div className="max-w-6xl mx-auto mb-20">
      <div className="text-center mb-12">
        {/* SEO-optimized heading with construction keywords */}
        {/* Market positioning badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full mb-4">
          <span className="text-sm font-semibold text-red-700 uppercase tracking-wider">
            #1 Construction AI in India
          </span>
        </div>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8 italic font-semibold">
          "India's first AI-powered construction management platform that
          converts your WhatsApp conversations into actionable project
          intelligence. Get real-time site monitoring, vendor coordination, and
          predictive analytics - all through the messaging app your team already
          uses."
        </p>

        {/* Key value propositions */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              Zero Learning Curve
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              Real-time Project Insights
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              Predictive Cost Control
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* SiteOps AI */}
        <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 group border-0 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100">
          {/* SiteOps Video */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 mb-4 group-hover:shadow-xl transition-shadow duration-300">
            <video
              className="w-full h-auto"
              autoPlay
              muted
              loop
              playsInline
              style={{
                maxHeight: '200px',
                objectFit: 'cover',
              }}
            >
              <source src="/SiteOps.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Site Ops
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Track daily activities & workforce
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Material delivery coordination
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Real-time quality control
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed text-sm">
            "Streamline site operations through intelligent WhatsApp monitoring
            in all construction phases."
          </p>
        </Card>

        {/* Procurement AI */}
        <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 group border-0 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100">
          {/* Procurement Video */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 mb-4 group-hover:shadow-xl transition-shadow duration-300">
            <video
              className="w-full h-auto"
              autoPlay
              muted
              loop
              playsInline
              style={{
                maxHeight: '200px',
                objectFit: 'cover',
              }}
            >
              <source src="/Procure.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              Procurement
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Instant vendor quotes & comparison
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Automated purchase orders
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Delivery tracking & transparency
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed text-sm">
            "Revolutionize procurement flow with AI-powered vendor management
            through WhatsApp."
          </p>
        </Card>

        {/* Credit */}
        <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 group border-0 bg-gradient-to-br from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100">
          {/* Credit Video */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 mb-4 group-hover:shadow-xl transition-shadow duration-300">
            <video
              className="w-full h-auto"
              autoPlay
              muted
              loop
              playsInline
              style={{
                maxHeight: '200px',
                objectFit: 'cover',
              }}
            >
              <source src="/Credit.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
              Credit
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              AI verifies progress & invoices
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              Automatic credit disbursement
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              Zero cash flow delays
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed text-sm">
            "Smart credit management that triggers direct vendor payments based
            on verified progress."
          </p>
        </Card>
      </div>
    </div>
  )
}

export default IntelligenceSection
