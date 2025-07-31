import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card.jsx'
import { Badge } from '../ui/badge'
import { Camera, Sparkles, Brain, Lightbulb, Heart, Users } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/use-scroll-animation'

const FeaturesSection = () => {
  const [titleRef, titleVisible] = useScrollAnimation()
  const [featuresRef, featuresVisible] = useScrollAnimation()

  const features = [
    {
      icon: Camera,
      title: 'WhatsApp Photo Intelligence',
      description:
        'AI analyzes site photos shared in WhatsApp to track progress, identify safety issues, and measure completion rates automatically',
      metric: 'Photo AI',
      gradient: 'from-brand-primary to-brand-primary', // Brand primary
    },
    {
      icon: Sparkles,
      title: 'Smart Bill Processing',
      description:
        'Automatically extracts quantities, prices, and delivery dates from vendor bills shared in WhatsApp chats',
      metric: 'Auto Extract',
      gradient: 'from-brand-charcoal to-brand-charcoal', // Brand charcoal
    },
    {
      icon: Brain,
      title: 'Vendor Behavior Learning',
      description:
        'Builds intelligence on vendor reliability, delivery patterns, and quality consistency from chat history',
      metric: 'Smart Learning',
      gradient: 'from-functional-success to-functional-success', // Success green
    },
    {
      icon: Lightbulb,
      title: 'Real-time Project Model',
      description:
        'Creates and updates a comprehensive mental model of each project from WhatsApp conversations and media',
      metric: 'Live Model',
      gradient: 'from-brand-primary to-brand-charcoal', // Primary + charcoal blend
    },
    {
      icon: Heart,
      title: 'Conversation Intelligence',
      description:
        'Understands construction context in chat messages to predict delays, budget issues, and quality concerns',
      metric: 'Context AI',
      gradient: 'from-brand-charcoal to-functional-success', // Charcoal + success blend
    },
    {
      icon: Users,
      title: 'Builder Consistency Tracking',
      description:
        'Monitors site team performance and execution patterns through WhatsApp communications and updates',
      metric: 'Team Intel',
      gradient: 'from-functional-success to-brand-primary', // Success + primary blend
    },
  ]

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Trust Indicators */}
      <div
        ref={titleRef}
        className={`text-center mb-6 sm:mb-8 transition-all duration-1000 transform ${
          titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-brand-charcoal/70 text-xs sm:text-sm mb-4 sm:mb-6 px-4 font-body uppercase tracking-wide">
          TRUSTED BY LEADING BUILDERS & DEVELOPERS
        </p>
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 opacity-90 px-4">
          <Badge
            className="bg-brand-primary/90 text-brand-white px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-bold border border-brand-primary hover:bg-brand-primary transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md flex items-center gap-2 animate-bounce font-body"
            style={{ animationDuration: '3s', animationDelay: '0s' }}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 21V7L12 2L21 7V21H13V13H11V21H3Z"
                fill="currentColor"
                className="text-brand-white"
              />
              <path
                d="M12 2L21 7V21H13V13H11V21H3V7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                className="text-brand-white"
                fill="none"
              />
              <circle
                cx="12"
                cy="9"
                r="1.5"
                fill="currentColor"
                className="text-brand-accent"
                style={{
                  animation: 'pulse 3s ease-in-out infinite',
                }}
              />
            </svg>
            Real Estate
          </Badge>
          <Badge
            className="bg-brand-charcoal/90 text-brand-white px-5 py-3 text-sm font-bold border border-brand-charcoal hover:bg-brand-charcoal transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md flex items-center gap-2 animate-bounce font-body"
            style={{ animationDuration: '3s', animationDelay: '0.5s' }}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="2"
                y="3"
                width="20"
                height="18"
                rx="2"
                fill="currentColor"
                className="text-brand-white/20"
              />
              <rect
                x="4"
                y="8"
                width="16"
                height="10"
                rx="1"
                fill="currentColor"
                className="text-brand-white/30"
              />
              <rect
                x="6"
                y="10"
                width="3"
                height="6"
                rx="0.5"
                fill="currentColor"
                className="text-brand-white"
              />
              <rect
                x="10"
                y="10"
                width="3"
                height="6"
                rx="0.5"
                fill="currentColor"
                className="text-brand-white"
              />
              <rect
                x="14"
                y="10"
                width="3"
                height="6"
                rx="0.5"
                fill="currentColor"
                className="text-brand-white"
              />
              <circle
                cx="12"
                cy="6"
                r="1"
                fill="currentColor"
                className="text-brand-accent"
                style={{
                  animation: 'ping 4s ease-in-out infinite',
                }}
              />
            </svg>
            Construction
          </Badge>
          <Badge
            className="bg-functional-success/90 text-brand-white px-5 py-3 text-sm font-bold border border-functional-success hover:bg-functional-success transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md flex items-center gap-2 animate-bounce font-body"
            style={{ animationDuration: '3s', animationDelay: '1s' }}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="4"
                width="18"
                height="16"
                rx="2"
                fill="currentColor"
                className="text-brand-white/20"
              />
              <rect
                x="5"
                y="6"
                width="14"
                height="2"
                rx="1"
                fill="currentColor"
                className="text-brand-white/40"
              />
              <rect
                x="5"
                y="9"
                width="10"
                height="1.5"
                rx="0.75"
                fill="currentColor"
                className="text-brand-white/50"
              />
              <rect
                x="5"
                y="11.5"
                width="12"
                height="1.5"
                rx="0.75"
                fill="currentColor"
                className="text-brand-white/50"
              />
              <rect
                x="5"
                y="14"
                width="8"
                height="1.5"
                rx="0.75"
                fill="currentColor"
                className="text-brand-white/50"
              />
              <circle
                cx="19"
                cy="7"
                r="2"
                fill="currentColor"
                className="text-brand-white"
              />
              <path
                d="M18 7L18.7 7.7L20.3 6.1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-functional-success"
                style={{
                  animation: 'pulse 2s ease-in-out infinite',
                }}
              />
            </svg>
            Project Management
          </Badge>
          <Badge
            className="bg-brand-primary/90 text-brand-white px-5 py-3 text-sm font-bold border border-brand-primary hover:bg-brand-primary transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md flex items-center gap-2 animate-bounce font-body"
            style={{ animationDuration: '3s', animationDelay: '1.5s' }}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="8"
                fill="currentColor"
                className="text-brand-white/20"
              />
              <circle
                cx="12"
                cy="12"
                r="6"
                fill="currentColor"
                className="text-brand-white/30"
              />
              <circle
                cx="12"
                cy="12"
                r="4"
                fill="currentColor"
                className="text-brand-white/40"
              />
              <circle
                cx="12"
                cy="12"
                r="2"
                fill="currentColor"
                className="text-brand-white"
                style={{
                  animation: 'pulse 2.5s ease-in-out infinite',
                }}
              />
              <circle
                cx="8"
                cy="8"
                r="1"
                fill="currentColor"
                className="text-brand-white/60"
                style={{
                  transformOrigin: '12px 12px',
                  animation: 'spin 8s linear infinite',
                }}
              />
              <circle
                cx="16"
                cy="8"
                r="1"
                fill="currentColor"
                className="text-brand-white/60"
                style={{
                  transformOrigin: '12px 12px',
                  animation: 'spin 8s linear infinite',
                  animationDelay: '0.5s',
                }}
              />
              <circle
                cx="16"
                cy="16"
                r="1"
                fill="currentColor"
                className="text-brand-accent"
                style={{
                  transformOrigin: '12px 12px',
                  animation: 'spin 8s linear infinite',
                  animationDelay: '1s',
                }}
              />
            </svg>
            AI Powered
          </Badge>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center text-brand-charcoal mb-4 font-heading">
        WhatsApp-Native Construction Intelligence Platform
      </h2>

      <p className="text-lg text-brand-charcoal/70 text-center max-w-3xl mx-auto mb-12 font-body leading-relaxed">
        Bab.ai continuously builds and updates a comprehensive understanding of
        each project, learning patterns and predicting outcomes based on
        thousands of WhatsApp interactions.
      </p>

      <div
        ref={featuresRef}
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 transform ${
          featuresVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-12'
        }`}
      >
        {features.map((feature, index) => {
          const IconComponent = feature.icon
          return (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 border border-brand-charcoal/10 shadow-md hover:scale-105 group bg-gradient-to-br from-brand-white to-brand-charcoal/5 p-6"
            >
              {/* 2x2 Grid Layout */}
              <div className="grid grid-cols-[auto_1fr] grid-rows-2 gap-x-4 gap-y-2 mb-4 items-center">
                {/* Icon - spans both rows in left column */}
                <div
                  className={`w-12 h-12 ${
                    index === 0
                      ? 'bg-brand-primary'
                      : index === 1
                      ? 'bg-brand-charcoal'
                      : index === 2
                      ? 'bg-functional-success'
                      : index === 3
                      ? 'bg-brand-primary'
                      : index === 4
                      ? 'bg-brand-charcoal'
                      : 'bg-functional-success'
                  } rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300 shadow-lg row-span-2`}
                >
                  <IconComponent className="w-6 h-6 text-brand-white drop-shadow-sm" />
                </div>

                {/* Title - first row, right column */}
                <h3 className="text-sm font-semibold text-brand-charcoal leading-tight self-end font-body">
                  {feature.title}
                </h3>

                {/* Metric - second row, right column */}
                <div className="flex justify-start self-start">
                  <Badge
                    variant="secondary"
                    className={`${
                      index === 0
                        ? 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary'
                        : index === 1
                        ? 'bg-brand-charcoal/10 border-brand-charcoal/20 text-brand-charcoal'
                        : index === 2
                        ? 'bg-functional-success/10 border-functional-success/20 text-functional-success'
                        : index === 3
                        ? 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary'
                        : index === 4
                        ? 'bg-brand-charcoal/10 border-brand-charcoal/20 text-brand-charcoal'
                        : 'bg-functional-success/10 border-functional-success/20 text-functional-success'
                    } text-xs font-medium px-3 py-1 border transition-all duration-200 group-hover:bg-opacity-20 flex-shrink-0 flex items-center gap-1 font-body`}
                  >
                    {feature.metric}
                  </Badge>
                </div>
              </div>

              {/* Description below */}
              <p className="text-brand-charcoal/70 text-sm leading-relaxed font-body">
                {feature.description}
              </p>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default FeaturesSection
