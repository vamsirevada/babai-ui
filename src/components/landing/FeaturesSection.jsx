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
        <div className="flex flex-wrap justify-center items-center gap-6 opacity-90">
          <Badge
            className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-5 py-3 text-sm font-semibold border border-blue-200 hover:from-blue-200 hover:to-blue-300 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md flex items-center gap-2 animate-bounce"
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
                className="text-blue-600"
              />
              <path
                d="M12 2L21 7V21H13V13H11V21H3V7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                className="text-blue-500"
                fill="none"
              />
              <circle
                cx="12"
                cy="9"
                r="1.5"
                fill="currentColor"
                className="text-yellow-400"
                style={{
                  animation: 'pulse 3s ease-in-out infinite',
                }}
              />
            </svg>
            Real Estate
          </Badge>
          <Badge
            className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 px-5 py-3 text-sm font-semibold border border-orange-200 hover:from-orange-200 hover:to-orange-300 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md flex items-center gap-2 animate-bounce"
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
                className="text-orange-200"
              />
              <rect
                x="4"
                y="8"
                width="16"
                height="10"
                rx="1"
                fill="currentColor"
                className="text-orange-300"
              />
              <rect
                x="6"
                y="10"
                width="3"
                height="6"
                rx="0.5"
                fill="currentColor"
                className="text-orange-600"
              />
              <rect
                x="10"
                y="10"
                width="3"
                height="6"
                rx="0.5"
                fill="currentColor"
                className="text-orange-600"
              />
              <rect
                x="14"
                y="10"
                width="3"
                height="6"
                rx="0.5"
                fill="currentColor"
                className="text-orange-600"
              />
              <circle
                cx="12"
                cy="6"
                r="1"
                fill="currentColor"
                className="text-yellow-400"
                style={{
                  animation: 'ping 4s ease-in-out infinite',
                }}
              />
            </svg>
            Construction
          </Badge>
          <Badge
            className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 px-5 py-3 text-sm font-semibold border border-purple-200 hover:from-purple-200 hover:to-purple-300 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md flex items-center gap-2 animate-bounce"
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
                className="text-purple-200"
              />
              <rect
                x="5"
                y="6"
                width="14"
                height="2"
                rx="1"
                fill="currentColor"
                className="text-purple-400"
              />
              <rect
                x="5"
                y="9"
                width="10"
                height="1.5"
                rx="0.75"
                fill="currentColor"
                className="text-purple-500"
              />
              <rect
                x="5"
                y="11.5"
                width="12"
                height="1.5"
                rx="0.75"
                fill="currentColor"
                className="text-purple-500"
              />
              <rect
                x="5"
                y="14"
                width="8"
                height="1.5"
                rx="0.75"
                fill="currentColor"
                className="text-purple-500"
              />
              <circle
                cx="19"
                cy="7"
                r="2"
                fill="currentColor"
                className="text-green-400"
              />
              <path
                d="M18 7L18.7 7.7L20.3 6.1"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  animation: 'pulse 2s ease-in-out infinite',
                }}
              />
            </svg>
            Project Management
          </Badge>
          <Badge
            className="bg-gradient-to-r from-green-100 to-emerald-200 text-green-700 px-5 py-3 text-sm font-semibold border border-green-200 hover:from-green-200 hover:to-emerald-300 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md flex items-center gap-2 animate-bounce"
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
                className="text-green-200"
              />
              <circle
                cx="12"
                cy="12"
                r="6"
                fill="currentColor"
                className="text-green-300"
              />
              <circle
                cx="12"
                cy="12"
                r="4"
                fill="currentColor"
                className="text-green-400"
              />
              <circle
                cx="12"
                cy="12"
                r="2"
                fill="currentColor"
                className="text-green-600"
                style={{
                  animation: 'pulse 2.5s ease-in-out infinite',
                }}
              />
              <circle
                cx="8"
                cy="8"
                r="1"
                fill="currentColor"
                className="text-blue-400"
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
                className="text-purple-400"
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
                className="text-orange-400"
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
