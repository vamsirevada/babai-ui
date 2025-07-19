import { Button } from '../components/ui/button.jsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card.jsx'
import { Badge } from '../components/ui/badge'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BarChart3,
  CreditCard,
  TrendingUp,
  Shield,
  Zap,
  Users,
  MessageCircle,
  Building2,
  Truck,
  HardHat,
} from 'lucide-react'
import PhoneModel from '../components/PhoneModel'
import ThreeBackground from '../components/ThreeBackground'

const Landing = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/dashboard')
  }

  const handleLogin = () => {
    navigate('/login')
  }

  const handleRegister = () => {
    navigate('/register')
  }

  const features = [
    {
      icon: BarChart3,
      title: 'WhatsApp Photo Intelligence',
      description:
        'AI analyzes site photos shared in WhatsApp to track progress, identify safety issues, and measure completion rates automatically',
      metric: 'Photo AI',
    },
    {
      icon: CreditCard,
      title: 'Smart Bill Processing',
      description:
        'Automatically extracts quantities, prices, and delivery dates from vendor bills shared in WhatsApp chats',
      metric: 'Auto Extract',
    },
    {
      icon: TrendingUp,
      title: 'Vendor Behavior Learning',
      description:
        'Builds intelligence on vendor reliability, delivery patterns, and quality consistency from chat history',
      metric: 'Smart Learning',
    },
    {
      icon: Shield,
      title: 'Real-time Project Model',
      description:
        'Creates and updates a comprehensive mental model of each project from WhatsApp conversations and media',
      metric: 'Live Model',
    },
    {
      icon: Zap,
      title: 'Conversation Intelligence',
      description:
        'Understands construction context in chat messages to predict delays, budget issues, and quality concerns',
      metric: 'Context AI',
    },
    {
      icon: Users,
      title: 'Builder Consistency Tracking',
      description:
        'Monitors site team performance and execution patterns through WhatsApp communications and updates',
      metric: 'Team Intel',
    },
  ]

  return (
    <div
      className="min-h-screen relative"
      style={{
        background:
          'linear-gradient(135deg, rgba(219, 234, 254, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(243, 232, 255, 0.3) 100%)',
      }}
    >
      {/* 3D Background */}
      <ThreeBackground />

      {/* Header */}
      <header className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">ai</span>
              </div>
            </div>
            <span className="text-2xl font-bold text-gray-900">bab.ai</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={handleLogin}
              className="text-gray-600 hover:text-gray-900"
            >
              Login
            </Button>
            <Button
              onClick={handleRegister}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Side - GIF and Hello Babai */}
          <div className="text-center">
            {/* Intro Video */}
            <div className="flex justify-center mb-8">
              <div className="relative w-full max-w-lg">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-r from-blue-100 to-purple-100 p-2">
                  <video
                    className="w-full h-auto rounded-xl"
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                      maxHeight: '400px',
                      objectFit: 'cover',
                    }}
                  >
                    <source src="/intro.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Video overlay for better integration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none rounded-xl"></div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-50"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-50"></div>
              </div>
            </div>

            {/* Hello Babai Text */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              <span
                className="text-black inline-block"
                style={{
                  fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                  fontWeight: '600',
                  fontSize: '1.1em',
                  letterSpacing: '0.02em',
                  animation:
                    'helloGlow 3s ease-in-out infinite alternate, slideInLeft 0.8s ease-out 0s both',
                }}
              >
                Hello,
              </span>
              <span
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ml-4 inline-block"
                style={{
                  fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                  fontWeight: '600',
                  fontSize: '1.1em',
                  letterSpacing: '0.02em',
                  animation:
                    'babaiGlow 3s ease-in-out infinite alternate, slideInRight 0.8s ease-out 0.8s both',
                  opacity: '0',
                  transform: 'translateX(30px)',
                }}
              >
                Babai
              </span>
            </h1>
          </div>

          {/* Right Side - Hero Content */}
          <div className="text-center lg:text-left">
            {/* Market positioning badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full mb-4">
              {/* <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div> */}
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488"
                  fill="#25D366"
                />
              </svg>
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                WhatsApp Construction AI Platform
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your WhatsApp into{' '}
              <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2 italic">
                Smart Construction Brain
              </span>
            </h2>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl lg:max-w-none leading-relaxed">
              <span className="font-semibold text-gray-800">
                Works with your existing WhatsApp conversations.
              </span>{' '}
              <span className="font-thin text-gray-800 italic">
                Our AI reads every message, photo, and bill to give you
                real-time project control. Predict delays, prevent cost
                overruns, and manage multiple sites effortlessly.
              </span>
            </p>
            {/* Enhanced Key Benefits with WhatsApp Focus */}
            <div
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
              style={{
                animation: 'fadeInUp 0.3s ease-out 0.4s both',
                opacity: '0',
              }}
            >
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Free to Start
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Works on WhatsApp
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Easy to Learn
              </Badge>
            </div>
          </div>
        </div>

        {/* WhatsApp Intelligence Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            {/* SEO-optimized heading with construction keywords */}
            {/* Market positioning badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full mb-4">
              {/* <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div> */}
              <span className="text-sm font-semibold text-red-700 uppercase tracking-wider">
                #1 Construction AI in India
              </span>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8 italic font-semibold">
              "India's first AI-powered construction management platform that
              converts your WhatsApp conversations into actionable project
              intelligence. Get real-time site monitoring, vendor coordination,
              and predictive analytics - all through the messaging app your team
              already uses."
            </p>

            {/* Key value propositions */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  Zero Learning Curve
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  Real-time Project Insights
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  Predictive Cost Control
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* SiteOps AI */}
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 group border-0 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100">
              {/* SiteOps Video */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 mb-4 group-hover:shadow-xl transition-shadow duration-300">
                <video
                  className="w-full h-auto"
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    maxHeight: '200px',
                    objectFit: 'cover',
                  }}
                >
                  <source src="/SiteOps.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Site Ops
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Track daily activities & workforce
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Material delivery coordination
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Real-time quality control
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm">
                "Streamline site operations through intelligent WhatsApp
                monitoring in all construction phases."
              </p>
            </Card>

            {/* Procurement AI */}
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 group border-0 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100">
              {/* Procurement Video */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 mb-4 group-hover:shadow-xl transition-shadow duration-300">
                <video
                  className="w-full h-auto"
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    maxHeight: '200px',
                    objectFit: 'cover',
                  }}
                >
                  <source src="/Procure.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  Procurement
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Instant vendor quotes & comparison
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Automated purchase orders
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Delivery tracking & transparency
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm">
                "Revolutionize procurement flow with AI-powered vendor
                management through WhatsApp."
              </p>
            </Card>

            {/* Credit */}
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 group border-0 bg-gradient-to-br from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100">
              {/* Credit Video */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 mb-4 group-hover:shadow-xl transition-shadow duration-300">
                <video
                  className="w-full h-auto"
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    maxHeight: '200px',
                    objectFit: 'cover',
                  }}
                >
                  <source src="/Credit.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                  Credit
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  AI verifies progress & invoices
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Automatic credit disbursement
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Zero cash flow delays
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm">
                "Smart credit management that triggers direct vendor payments
                based on verified progress."
              </p>
            </Card>
          </div>
        </div>

        {/* Demo Section */}
        <div className="text-center max-w-4xl mx-auto">
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
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488"
                    fill="#25D366"
                  />
                </svg>
                <span className="text-sm font-semibold text-green-700 uppercase tracking-wider">
                  Live Demo
                </span>
              </div>

              {/* Enhanced Heading */}
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Complete Project Intelligence
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
                  <span className="font-semibold text-gray-800">
                    {' '}
                    actionable construction insights
                  </span>
                  .
                </p>
                <p className="text-base md:text-lg text-gray-500 italic mb-8">
                  No training required • No new apps • Just say "Hi" to start
                </p>
              </div>

              {/* Interactive Feature Pills */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">
                    Real-time Analysis
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">
                    Instant Insights
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">
                    Smart Predictions
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - iPhone Mockup */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <PhoneModel />

                {/* Decorative elements around phone */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-50 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-50 animate-pulse"></div>

                {/* Floating stats around phone */}
                <div className="absolute -left-8 top-1/4 hidden xl:block">
                  <div className="bg-white rounded-lg shadow-lg p-3 border border-gray-100">
                    <div className="text-sm font-semibold text-green-600">
                      100K+
                    </div>
                    <div className="text-xs text-gray-500">Messages</div>
                  </div>
                </div>
                <div className="absolute -right-8 bottom-1/4 hidden xl:block">
                  <div className="bg-white rounded-lg shadow-lg p-3 border border-gray-100">
                    <div className="text-sm font-semibold text-blue-600">
                      95%
                    </div>
                    <div className="text-xs text-gray-500">Accuracy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                100K+
              </div>
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
              <div className="text-3xl font-bold text-orange-600 mb-2">
                2.5M
              </div>
              <div className="text-gray-600">Project Insights Generated</div>
            </div>
          </div>
        </div>

        {/* Problem Statement Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            WhatsApp Communication Chaos We Solve
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Construction teams rely on WhatsApp for project communication, but
            critical insights get lost in endless chat threads
          </p>

          {/* Problem Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <Card className="bg-red-50 border-red-200">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-red-600 mb-2">90%</div>
                <div className="text-red-700 font-medium">
                  Use WhatsApp for Projects
                </div>
                <div className="text-red-600 text-sm mt-1">
                  But insights get lost
                </div>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  500+
                </div>
                <div className="text-orange-700 font-medium">
                  Messages Per Project
                </div>
                <div className="text-orange-600 text-sm mt-1">
                  Manual tracking impossible
                </div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">70%</div>
                <div className="text-blue-700 font-medium">
                  Critical Info in Photos
                </div>
                <div className="text-blue-600 text-sm mt-1">
                  Buried in chat history
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
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
            Bab.ai continuously builds and updates a comprehensive understanding
            of each project, learning patterns and predicting outcomes based on
            thousands of WhatsApp interactions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:scale-105 group"
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:from-blue-200 group-hover:to-purple-200 transition-colors duration-300">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg flex items-start justify-between gap-3">
                      <span className="flex-1 leading-tight">
                        {feature.title}
                      </span>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700 text-xs whitespace-nowrap flex-shrink-0"
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

        {/* Who is it for Section */}
        <div className="max-w-6xl mx-auto px-4 mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Who is it for?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Bab.ai is designed for construction professionals who want to
              streamline their operations through WhatsApp
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Builders
              </h3>
              <p className="text-gray-600">
                Manage multiple projects, track progress, and coordinate with
                teams efficiently through WhatsApp
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Vendors
              </h3>
              <p className="text-gray-600">
                Submit quotes, track orders, and communicate with project teams
                seamlessly via WhatsApp
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-purple-200 group-hover:to-purple-300 transition-all duration-300">
                <HardHat className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Site Engineers
              </h3>
              <p className="text-gray-600">
                Report updates, request materials, and access project data
                instantly through familiar WhatsApp interface
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials & Traction Section */}
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
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    25+
                  </div>
                  <div className="text-sm text-gray-600">Pilot Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    200+
                  </div>
                  <div className="text-sm text-gray-600">
                    Daily Vendor Quotes
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    ₹2.5Cr+
                  </div>
                  <div className="text-sm text-gray-600">
                    Procurement via WhatsApp
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    4.8/5
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
                    material requests. Everything happens on WhatsApp now - it's
                    so much faster than emails and calls."
                  </p>
                  <div className="flex text-yellow-400 mt-3">
                    {'★'.repeat(5)}
                  </div>
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
                  <div className="flex text-yellow-400 mt-3">
                    {'★'.repeat(5)}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      A
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold text-gray-900">
                        Amit Patel
                      </div>
                      <div className="text-sm text-gray-600">
                        Builder, Commercial Projects
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "Managing 5 sites simultaneously was chaos before Bab.ai.
                    Now I get real-time updates and can make decisions instantly
                    through the dashboard."
                  </p>
                  <div className="flex text-yellow-400 mt-3">
                    {'★'.repeat(5)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>

            <CardHeader className="relative z-10">
              <CardTitle className="text-3xl text-white mb-4">
                Ready to Revolutionize Your Construction Projects?
              </CardTitle>
              <CardDescription className="text-blue-100 text-lg max-w-2xl mx-auto">
                Bab.ai transforms WhatsApp into a smart project management tool
                and dashboard, giving you real-time insights and predictive
                analytics to keep your projects on track.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <Button
                  onClick={handleGetStarted}
                  variant="secondary"
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  View Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-blue-100 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>Smart data analysis included</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>Live project dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>24/7 support</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 bab.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
