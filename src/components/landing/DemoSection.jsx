import PhoneModel from '../PhoneModel'
import { useState, useEffect, useRef } from 'react'
import '../../devices.min.css'
import Mockup from '../Mockup'

// Animated counter component
const AnimatedCounter = ({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
}) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const counterRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger animation when element is 50% visible and hasn't animated yet
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of element is visible
        rootMargin: '0px 0px -100px 0px', // Start animation a bit earlier
      }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  useEffect(() => {
    if (!hasAnimated) return

    let startTime = null
    const startValue = 0
    const endValue = end

    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)

      // Handle decimal numbers properly
      let currentCount
      if (endValue % 1 !== 0) {
        // For decimal numbers like 4.8
        currentCount = Number(
          (startValue + (endValue - startValue) * easeOutCubic).toFixed(1)
        )
      } else {
        // For whole numbers
        currentCount = Math.floor(
          startValue + (endValue - startValue) * easeOutCubic
        )
      }

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [hasAnimated, end, duration])

  return (
    <span ref={counterRef} className="inline-block">
      {prefix}
      {typeof count === 'number' && count % 1 !== 0
        ? count
        : count.toLocaleString()}
      {suffix}
    </span>
  )
}

const DemoSection = () => {
  const [isPhoneVisible, setIsPhoneVisible] = useState(false)
  const phoneRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger phone animation when section becomes visible
        if (entry.isIntersecting && !isPhoneVisible) {
          setIsPhoneVisible(true)
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: '0px 0px -50px 0px', // Start animation a bit earlier
      }
    )

    if (phoneRef.current) {
      observer.observe(phoneRef.current)
    }

    return () => observer.disconnect()
  }, [isPhoneVisible])

  return (
    <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* Left Side - Header, Description, CTA, and Stats */}
        <div className="text-center lg:text-left px-4 lg:px-8 flex flex-col justify-center">
          {/* Demo Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 px-4 py-2 rounded-full mb-6 mx-auto lg:mx-0">
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

            {/* Enhanced Combined CTA and Stats Card */}
            <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-100/20 to-blue-100/20 animate-pulse"></div>

              <div className="relative z-10">
                {/* CTA Section */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-700 uppercase tracking-wider">
                      Get Started Instantly
                    </span>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>

                  <div className="space-y-4">
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

                    <p className="text-sm text-gray-600">
                      Our AI understands natural language - talk to it like you
                      would to a colleague
                    </p>

                    {/* Three Component Badges */}
                    <div className="flex flex-wrap gap-2 justify-center">
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

                {/* Elegant Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-green-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-gradient-to-r from-green-50 to-blue-50 text-green-700 font-medium rounded-full">
                      Real Impact
                    </span>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center lg:text-left group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-white/80 border border-green-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <svg
                          className="w-5 h-5 text-green-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl lg:text-3xl font-bold text-green-600 group-hover:scale-110 transition-transform duration-300">
                          <AnimatedCounter
                            end={100}
                            suffix="K+"
                            duration={2000}
                          />
                        </div>
                        <div className="text-xs lg:text-sm text-gray-700 font-medium">
                          Messages Analyzed
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center lg:text-left group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-white/80 border border-blue-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <svg
                          className="w-5 h-5 text-blue-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 16L8.586 11.414C9.367 10.633 10.633 10.633 11.414 11.414L16 16M14 14L15.586 12.414C16.367 11.633 17.633 11.633 18.414 12.414L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl lg:text-3xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">
                          <AnimatedCounter
                            end={50}
                            suffix="K+"
                            duration={2300}
                          />
                        </div>
                        <div className="text-xs lg:text-sm text-gray-700 font-medium">
                          Photos Processed
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center lg:text-left group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-white/80 border border-purple-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <svg
                          className="w-5 h-5 text-purple-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl lg:text-3xl font-bold text-purple-600 group-hover:scale-110 transition-transform duration-300">
                          <AnimatedCounter
                            end={95}
                            suffix="%"
                            duration={2600}
                          />
                        </div>
                        <div className="text-xs lg:text-sm text-gray-700 font-medium">
                          Bill Accuracy
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center lg:text-left group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-white/80 border border-orange-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <svg
                          className="w-5 h-5 text-orange-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl lg:text-3xl font-bold text-orange-600 group-hover:scale-110 transition-transform duration-300">
                          <AnimatedCounter
                            end={2.5}
                            suffix="M"
                            duration={2900}
                          />
                        </div>
                        <div className="text-xs lg:text-sm text-gray-700 font-medium">
                          Insights Generated
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - iPhone Mockup */}
        <div
          className="flex justify-center items-center px-4 lg:px-8"
          ref={phoneRef}
        >
          <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto">
            <div
              className={`transform scale-x-90 scale-y-75 sm:scale-x-[120%] md:scale-x-[110%] md:scale-y-[100%] sm:scale-y-[80%] lg:scale-y-[85%] lg:scale-x-[100%] transition-all duration-1000 ease-out origin-center ${
                isPhoneVisible
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-8 opacity-0 lg:translate-x-12'
              }`}
            >
              <PhoneModel />
              {/* <Mockup /> */}

              {/* Decorative elements positioned relative to the phone inside the transform */}
              <div
                className={`absolute -top-4 -right-4 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse transition-all duration-1000 delay-300 ${
                  isPhoneVisible ? 'opacity-50 scale-100' : 'opacity-0 scale-50'
                }`}
              ></div>
              <div
                className={`absolute -bottom-4 -left-4 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse transition-all duration-1000 delay-500 ${
                  isPhoneVisible ? 'opacity-50 scale-100' : 'opacity-0 scale-50'
                }`}
              ></div>
              <div
                className={`absolute top-1/2 -left-6 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse transition-all duration-1000 delay-700 ${
                  isPhoneVisible ? 'opacity-40 scale-100' : 'opacity-0 scale-50'
                }`}
              ></div>
              <div
                className={`absolute top-1/4 -right-5 w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-pulse transition-all duration-1000 delay-900 ${
                  isPhoneVisible ? 'opacity-60 scale-100' : 'opacity-0 scale-50'
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DemoSection
