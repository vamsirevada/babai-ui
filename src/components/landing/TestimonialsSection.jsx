import { Card, CardContent } from '../ui/card.jsx'
import { useState, useEffect, useRef } from 'react'

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

const TestimonialsSection = () => {
  return (
    <div className="bg-gray-50 py-16 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Traction Stats */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Construction Leaders
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join the growing community transforming construction through
            WhatsApp AI
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                <AnimatedCounter end={25} suffix="+" duration={2000} />
              </div>
              <div className="text-sm text-gray-600">Pilot Projects</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                <AnimatedCounter end={200} suffix="+" duration={2500} />
              </div>
              <div className="text-sm text-gray-600">Daily Vendor Quotes</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                <AnimatedCounter
                  end={2.5}
                  prefix="₹"
                  suffix="Cr+"
                  duration={3000}
                />
              </div>
              <div className="text-sm text-gray-600">
                Procurement via WhatsApp
              </div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-orange-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                <AnimatedCounter end={4.8} suffix="/5" duration={2200} />
              </div>
              <div className="text-sm text-gray-600">User Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  R
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-gray-900">
                    Rajesh Kumar
                  </div>
                  <div className="text-sm text-gray-600">
                    Site Engineer, Metro Projects
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Bab.ai has revolutionized how we handle daily reports and
                material requests. Everything happens on WhatsApp now - it's so
                much faster than emails and calls."
              </p>
              <div className="flex text-yellow-400 mt-3">{'★'.repeat(5)}</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  P
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-gray-900">
                    Priya Sharma
                  </div>
                  <div className="text-sm text-gray-600">
                    Project Director, Residential
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The vendor coordination feature is amazing. We get quotes
                instantly and can compare prices right on WhatsApp. Our
                procurement efficiency has doubled."
              </p>
              <div className="flex text-yellow-400 mt-3">{'★'.repeat(5)}</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  A
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-gray-900">Amit Patel</div>
                  <div className="text-sm text-gray-600">
                    Builder, Commercial Projects
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Managing 5 sites simultaneously was chaos before Bab.ai. Now I
                get real-time updates and can make decisions instantly through
                the dashboard."
              </p>
              <div className="flex text-yellow-400 mt-3">{'★'.repeat(5)}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TestimonialsSection
