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
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-slate-50',
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
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-50 to-slate-50',
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
      gradient: 'from-slate-500 to-slate-600',
      bgGradient: 'from-slate-50 to-blue-50',
      borderColor: 'border-slate-200',
    },
  ]

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6">
          <Star className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
          <span className="text-xs sm:text-sm font-semibold text-emerald-700 uppercase tracking-wider font-body">
            Who Benefits
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4 px-4 sm:px-0 font-heading">
          Built for Construction Professionals
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto px-4 sm:px-0 font-body">
          Bab.ai seamlessly integrates into your existing WhatsApp workflows,
          empowering every stakeholder in the construction ecosystem
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
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
                    <h3 className="text-xl font-bold text-slate-800 mb-1 font-heading">
                      {audience.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider font-body">
                      {audience.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-700 mb-6 leading-relaxed font-body">
                  {audience.description}
                </p>

                {/* Benefits list */}
                <div className="space-y-3">
                  {audience.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm text-slate-600 font-medium font-body">
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
        <p className="text-slate-500 text-sm mb-4 font-body">
          Ready to transform your construction workflow?
        </p>
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-body">
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
