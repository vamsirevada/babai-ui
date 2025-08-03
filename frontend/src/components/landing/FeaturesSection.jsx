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
