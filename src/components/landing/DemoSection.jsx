import PhoneModel from '../PhoneModel'

const DemoSection = () => {
  return (
    <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap');

        @keyframes typewriter {
          0% {
            width: 0;
            border-right: 3px solid #374151;
          }
          99% {
            border-right: 3px solid #374151;
          }
          100% {
            width: auto;
            border-right: 3px solid transparent;
          }
        }

        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes babaiGlow {
          0% {
            text-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
            transform: translateX(0) scale(1);
          }
          100% {
            text-shadow: 0 0 20px rgba(147, 51, 234, 0.4),
              0 0 30px rgba(59, 130, 246, 0.2);
            transform: translateX(0) scale(1.02);
          }
        }

        @keyframes helloGlow {
          0% {
            text-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
            transform: translateX(0) scale(1);
          }
          100% {
            text-shadow: 0 0 15px rgba(0, 0, 0, 0.4),
              0 0 25px rgba(55, 65, 81, 0.3);
            transform: translateX(0) scale(1.02);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Demo Section with Enhanced Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        {/* Left Side - Header and Description */}
        <div className="text-center lg:text-left">
          {/* Demo Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 px-4 py-2 rounded-full mb-6">
            <svg
              className="w-5 h-5 text-green-600"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <polygon points="10,8 16,12 10,16" fill="currentColor" />
            </svg>
            <span className="text-sm font-semibold text-green-700 uppercase tracking-wider">
              Live Demo
            </span>
          </div>

          {/* Enhanced Heading */}
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Project Intelligence
            </span>
            <br />
            <span className="text-gray-700 text-2xl md:text-3xl lg:text-4xl">
              in One WhatsApp Chat
            </span>
          </h3>

          {/* Enhanced Description */}
          <div className="max-w-2xl lg:max-w-none">
            <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
              Watch how Bab.ai instantly transforms your everyday WhatsApp
              conversations into
              <span className="font-semibold">
                {' '}
                actionable construction insights
              </span>
              .
            </p>

            {/* Enhanced "Just say Hi" Call-to-Action */}
            <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-blue-50 border-2 border-green-200 rounded-xl p-6 mb-6 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-100/20 to-blue-100/20 animate-pulse"></div>

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700 uppercase tracking-wider">
                    Get Started Instantly
                  </span>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>

                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-800">
                    No training required • No setup needed
                  </p>

                  {/* Main "Just say Hi" emphasis */}
                  <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-md border border-green-200">
                    <svg
                      className="w-5 h-5 text-green-600"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M8 12L11 15L16 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      Just say "Hi" to start
                    </span>
                    <svg
                      className="w-5 h-5 text-blue-600"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <p className="text-sm text-gray-600 mt-2">
                    Our AI understands natural language - talk to it like you
                    would to a colleague
                  </p>

                  {/* Three Component Badges inside the box */}
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    <div className="flex items-center gap-2 bg-white/80 border border-blue-200 px-3 py-1.5 rounded-full shadow-sm">
                      <svg
                        className="w-3.5 h-3.5 text-blue-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-xs font-semibold text-blue-700">
                        Your Project
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/80 border border-green-200 px-3 py-1.5 rounded-full shadow-sm">
                      <svg
                        className="w-3.5 h-3.5 text-green-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="text-xs font-semibold text-green-700">
                        Your WhatsApp
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/80 border border-purple-200 px-3 py-1.5 rounded-full shadow-sm">
                      <img
                        src="/brain.png"
                        alt="Brain"
                        className="w-3.5 h-3.5 object-contain"
                      />
                      <span className="text-xs font-semibold text-[#EF5050]">
                        Our Brain
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - iPhone Mockup */}
        <div className="flex justify-center">
          <div className="relative max-w-xs sm:max-w-sm lg:max-w-md">
            <div className="transform scale-x-90 scale-y-75 sm:scale-x-[120%] md:scale-x-[110%] md:scale-y-[100%] sm:scale-y-[80%] lg:scale-y-[80%] lg:scale-x-[105%] transition-transform duration-500 origin-center">
              <PhoneModel />
              {/* Decorative elements positioned relative to the phone inside the transform */}
              <div className="absolute -top-4 -right-4 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute top-1/2 -left-6 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-40 animate-pulse"></div>
              <div className="absolute top-1/4 -right-5 w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full opacity-60 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">100K+</div>
          <div className="text-gray-600">WhatsApp Messages Analyzed</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
          <div className="text-gray-600">Site Photos Processed</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
          <div className="text-gray-600">Accuracy in Bill Extraction</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">2.5M</div>
          <div className="text-gray-600">Project Insights Generated</div>
        </div>
      </div>
    </div>
  )
}

export default DemoSection
