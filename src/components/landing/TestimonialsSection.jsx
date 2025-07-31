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
    <div className="bg-brand-white py-6 sm:py-8 lg:py-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Traction Stats */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal mb-4 px-4 sm:px-0 font-heading">
            Trusted by Construction Leaders
          </h2>
          <p className="text-lg text-brand-charcoal/70 mb-6 sm:mb-8 px-4 sm:px-0 font-body">
            Join the growing community transforming construction through
            WhatsApp AI
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center group">
              <div className="text-2xl sm:text-3xl font-bold text-brand-primary mb-2 group-hover:scale-110 transition-transform duration-300 font-heading">
                <AnimatedCounter end={25} suffix="+" duration={2000} />
              </div>
              <div className="text-sm text-brand-charcoal/70 font-body">
                Pilot Projects
              </div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-functional-success mb-2 group-hover:scale-110 transition-transform duration-300 font-heading">
                <AnimatedCounter end={200} suffix="+" duration={2500} />
              </div>
              <div className="text-sm text-brand-charcoal/70 font-body">
                Daily Vendor Quotes
              </div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-brand-accent mb-2 group-hover:scale-110 transition-transform duration-300 font-heading">
                <AnimatedCounter
                  end={2.5}
                  prefix="₹"
                  suffix="Cr+"
                  duration={3000}
                />
              </div>
              <div className="text-sm text-brand-charcoal/70 font-body">
                Procurement via WhatsApp
              </div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-brand-primary mb-2 group-hover:scale-110 transition-transform duration-300 font-heading">
                <AnimatedCounter end={4.8} suffix="/5" duration={2200} />
              </div>
              <div className="text-sm text-brand-charcoal/70 font-body">
                User Satisfaction
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          <Card className="bg-brand-white border-2 border-brand-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300 group rounded-2xl overflow-hidden hover:border-brand-primary/40 hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-brand-primary rounded-full flex items-center justify-center text-brand-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300 font-heading">
                  R
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-brand-charcoal text-lg font-body">
                    Rajesh Kumar
                  </div>
                  <div className="text-sm text-brand-charcoal/70 font-medium font-body">
                    Site Engineer, Metro Projects
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-2 -left-2 text-brand-primary/20 text-4xl font-serif">
                  "
                </div>
                <p className="text-brand-charcoal/80 italic leading-relaxed pl-6 text-base font-body">
                  Bab.ai has revolutionized how we handle daily reports and
                  material requests. Everything happens on WhatsApp now - it's
                  so much faster than emails and calls.
                </p>
                <div className="absolute -bottom-2 -right-2 text-brand-primary/20 text-4xl font-serif rotate-180">
                  "
                </div>
              </div>
              <div className="flex text-brand-accent mt-6 text-lg">
                {'★'.repeat(5)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-brand-white border-2 border-functional-success/20 shadow-xl hover:shadow-2xl transition-all duration-300 group rounded-2xl overflow-hidden hover:border-functional-success/40 hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-functional-success rounded-full flex items-center justify-center text-brand-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300 font-heading">
                  P
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-brand-charcoal text-lg font-body">
                    Priya Sharma
                  </div>
                  <div className="text-sm text-brand-charcoal/70 font-medium font-body">
                    Project Director, Residential
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-2 -left-2 text-functional-success/20 text-4xl font-serif">
                  "
                </div>
                <p className="text-brand-charcoal/80 italic leading-relaxed pl-6 text-base font-body">
                  The vendor coordination feature is amazing. We get quotes
                  instantly and can compare prices right on WhatsApp. Our
                  procurement efficiency has doubled.
                </p>
                <div className="absolute -bottom-2 -right-2 text-functional-success/20 text-4xl font-serif rotate-180">
                  "
                </div>
              </div>
              <div className="flex text-brand-accent mt-6 text-lg">
                {'★'.repeat(5)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-brand-white border-2 border-brand-charcoal/20 shadow-xl hover:shadow-2xl transition-all duration-300 group rounded-2xl overflow-hidden hover:border-brand-charcoal/40 hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-brand-charcoal rounded-full flex items-center justify-center text-brand-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300 font-heading">
                  A
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-brand-charcoal text-lg font-body">
                    Amit Patel
                  </div>
                  <div className="text-sm text-brand-charcoal/70 font-medium font-body">
                    Builder, Commercial Projects
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-2 -left-2 text-brand-charcoal/20 text-4xl font-serif">
                  "
                </div>
                <p className="text-brand-charcoal/80 italic leading-relaxed pl-6 text-base font-body">
                  Managing 5 sites simultaneously was chaos before Bab.ai. Now I
                  get real-time updates and can make decisions instantly through
                  the dashboard.
                </p>
                <div className="absolute -bottom-2 -right-2 text-brand-charcoal/20 text-4xl font-serif rotate-180">
                  "
                </div>
              </div>
              <div className="flex text-brand-accent mt-6 text-lg">
                {'★'.repeat(5)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TestimonialsSection
