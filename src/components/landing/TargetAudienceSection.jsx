import { Building2, Truck, HardHat, Star, CheckCircle } from 'lucide-react'

const TargetAudienceSection = () => {
  const audiences = [
    {
      icon: Building2,
      title: 'Builders & Developers',
      subtitle: 'Project Orchestrators',
      description:
        'Transform WhatsApp conversations into actionable project intelligence. Monitor progress, predict delays, and manage multiple sites effortlessly.',
      benefits: [
        'Real-time project monitoring',
        'Automated progress tracking',
        'Vendor performance insights',
      ],
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
    },
    {
      icon: Truck,
      title: 'Vendors & Suppliers',
      subtitle: 'Material Partners',
      description:
        'Streamline order management and delivery tracking through WhatsApp. Build trust with builders through transparent communication.',
      benefits: [
        'Instant quote submissions',
        'Order status tracking',
        'Payment visibility',
      ],
      gradient: 'from-emerald-500 to-green-600',
      bgGradient: 'from-emerald-50 to-green-50',
      borderColor: 'border-emerald-200',
    },
    {
      icon: HardHat,
      title: 'Site Engineers',
      subtitle: 'Ground Execution',
      description:
        'Report site updates, request materials, and access project data instantly. Stay connected with the project team effortlessly.',
      benefits: [
        'Quick status updates',
        'Material request tracking',
        'Safety issue reporting',
      ],
      gradient: 'from-purple-500 to-violet-600',
      bgGradient: 'from-purple-50 to-violet-50',
      borderColor: 'border-purple-200',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 mt-20">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 px-4 py-2 rounded-full mb-6">
          <Star className="w-5 h-5 text-green-600" />
          <span className="text-sm font-semibold text-green-700 uppercase tracking-wider">
            Who Benefits
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Built for Construction Professionals
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Bab.ai seamlessly integrates into your existing WhatsApp workflows,
          empowering every stakeholder in the construction ecosystem
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {audiences.map((audience, index) => {
          const IconComponent = audience.icon
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${audience.bgGradient} border-2 ${audience.borderColor} rounded-2xl p-8 group hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden`}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>

              <div className="relative z-10">
                {/* Icon and header */}
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${audience.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300 shadow-lg`}
                  >
                    <IconComponent className="w-7 h-7 text-white drop-shadow-sm" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {audience.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      {audience.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {audience.description}
                </p>

                {/* Benefits list */}
                <div className="space-y-3">
                  {audience.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600 font-medium">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <p className="text-gray-500 text-sm mb-4">
          Ready to transform your construction workflow?
        </p>
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <span>Get Started with WhatsApp</span>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default TargetAudienceSection
