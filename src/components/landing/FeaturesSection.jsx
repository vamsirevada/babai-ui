import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card.jsx'
import { Badge } from '../ui/badge'
import { Camera, Sparkles, Brain, Lightbulb, Heart, Users } from 'lucide-react'

const FeaturesSection = () => {
  const features = [
    {
      icon: Camera,
      title: 'WhatsApp Photo Intelligence',
      description:
        'AI analyzes site photos shared in WhatsApp to track progress, identify safety issues, and measure completion rates automatically',
      metric: 'Photo AI',
      gradient: 'from-pink-400 to-rose-400',
    },
    {
      icon: Sparkles,
      title: 'Smart Bill Processing',
      description:
        'Automatically extracts quantities, prices, and delivery dates from vendor bills shared in WhatsApp chats',
      metric: 'Auto Extract',
      gradient: 'from-blue-400 to-cyan-400',
    },
    {
      icon: Brain,
      title: 'Vendor Behavior Learning',
      description:
        'Builds intelligence on vendor reliability, delivery patterns, and quality consistency from chat history',
      metric: 'Smart Learning',
      gradient: 'from-purple-400 to-indigo-400',
    },
    {
      icon: Lightbulb,
      title: 'Real-time Project Model',
      description:
        'Creates and updates a comprehensive mental model of each project from WhatsApp conversations and media',
      metric: 'Live Model',
      gradient: 'from-yellow-400 to-orange-400',
    },
    {
      icon: Heart,
      title: 'Conversation Intelligence',
      description:
        'Understands construction context in chat messages to predict delays, budget issues, and quality concerns',
      metric: 'Context AI',
      gradient: 'from-red-400 to-pink-400',
    },
    {
      icon: Users,
      title: 'Builder Consistency Tracking',
      description:
        'Monitors site team performance and execution patterns through WhatsApp communications and updates',
      metric: 'Team Intel',
      gradient: 'from-green-400 to-emerald-400',
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Trust Indicators */}
      <div className="text-center mb-16">
        <p className="text-gray-500 text-sm mb-6">
          TRUSTED BY LEADING BUILDERS & DEVELOPERS
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 opacity-70">
          <Badge className="bg-blue-100 text-blue-700 px-4 py-2 text-sm font-semibold">
            🏗️ Real Estate
          </Badge>
          <Badge className="bg-orange-100 text-orange-700 px-4 py-2 text-sm font-semibold">
            🏢 Construction
          </Badge>
          <Badge className="bg-purple-100 text-purple-700 px-4 py-2 text-sm font-semibold">
            📋 Project Management
          </Badge>
          <Badge className="bg-green-100 text-green-700 px-4 py-2 text-sm font-semibold">
            🤖 AI Powered
          </Badge>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
        WhatsApp-Native Construction Intelligence Platform
      </h2>

      <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
        Bab.ai continuously builds and updates a comprehensive understanding of
        each project, learning patterns and predicting outcomes based on
        thousands of WhatsApp interactions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const IconComponent = feature.icon
          return (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:scale-105 group bg-gradient-to-br from-white to-gray-50"
            >
              <CardHeader>
                <div
                  className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg`}
                >
                  <IconComponent className="w-7 h-7 text-white drop-shadow-sm" />
                </div>
                <CardTitle className="text-lg flex items-start justify-between gap-3">
                  <span className="flex-1 leading-tight">{feature.title}</span>
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs whitespace-nowrap flex-shrink-0 border border-green-200"
                  >
                    {feature.metric}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default FeaturesSection
