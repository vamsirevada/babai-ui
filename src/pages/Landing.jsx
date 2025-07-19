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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              AI-Powered
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}
                Construction Project Management
              </span>
              <br />
            </h2>
            <p
              className="text-lg text-gray-600 mb-6 max-w-2xl lg:max-w-none leading-relaxed"
              style={{
                animation: 'fadeInUp 0.2s ease-out 0.3s both',
                opacity: '0',
              }}
            >
              Our AI understands WhatsApp photos, bills, and conversations. It
              builds a real-time mental model of each project, learning vendor
              behavior, builder consistency, and site speed to prevent cost
              overruns before they happen.
            </p>

            {/* Enhanced Key Benefits with WhatsApp Focus */}
            <div
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
              style={{
                animation: 'fadeInUp 0.3s ease-out 0.4s both',
                opacity: '0',
              }}
            >
              <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                🧠 Real-time Mental Model
              </Badge>
              <Badge className="bg-purple-50 text-purple-700 border-purple-200">
                🎯 Vendor Behavior Learning
              </Badge>
              <Badge className="bg-orange-50 text-orange-700 border-orange-200">
                ⚡ Instant Project Insights
              </Badge>
            </div>
          </div>
        </div>

        {/* WhatsApp Intelligence Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Bab.ai Reads Your WhatsApp Like a Construction Expert
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI doesn't just analyze text - it understands construction
              context, learns from every interaction, and builds intelligent
              project insights from your existing WhatsApp conversations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* SiteOps AI */}
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              {/* SiteOps Video */}
              <div className="relative rounded-2xl overflow-hidden shadow-md bg-gray-100">
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
                <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent pointer-events-none"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Site Ops</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                AI analyzes site photos to track progress, identify safety
                issues, and measure completion rates. Understands concrete
                quality, structural integrity, and material placement from
                WhatsApp images.
              </p>
            </Card>

            {/* Procurement AI */}
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              {/* Procurement Video */}
              <div className="relative rounded-2xl overflow-hidden shadow-md bg-gray-100">
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
                <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent pointer-events-none"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Procurement
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Automatically extracts quantities, prices, and delivery dates
                from vendor bills and invoices shared in WhatsApp. Builds cost
                databases and predicts budget variances in real-time.
              </p>
            </Card>

            {/* Credit */}
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              {/* Credit Video */}
              <div className="relative rounded-2xl overflow-hidden shadow-md bg-gray-100">
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
                <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent pointer-events-none"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Credit</h3>
              <p className="text-gray-600 leading-relaxed">
                Learns from every chat to understand vendor reliability, builder
                consistency patterns, and site execution speed. Creates
                predictive models for each contractor and project type.
              </p>
            </Card>
          </div>

          {/* Real-time Mental Model */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Real-time Mental Model of Your Projects
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Bab.ai continuously builds and updates a comprehensive
                understanding of each project, learning patterns and predicting
                outcomes based on thousands of WhatsApp interactions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Vendor Behavior Patterns
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Tracks delivery consistency, quality standards, and
                      pricing trends for each supplier
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Builder Consistency Tracking
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Monitors site team performance, communication patterns,
                      and execution reliability
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Site Speed Intelligence
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Analyzes progress photos and updates to predict completion
                      timelines accurately
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Predictive Risk Assessment
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Identifies potential delays and cost overruns before they
                      impact your project
                    </p>
                  </div>
                </div>
              </div>
            </div>
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

          {/* Demo Section Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Intel in one WhatsApp chat
            </h3>
            <p className="text-gray-600 max-w-xl mx-auto">
              "Experience how Bab.ai transforms construction management through
              intelligent WhatsApp — just say 'Hi' to start."
            </p>
          </div>

          {/* iPhone Mockup with Demo Chat */}
          <div className="flex justify-center mb-20">
            <PhoneModel />
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

          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            WhatsApp-Native Construction Intelligence Platform
          </h2>

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
              <p className="text-blue-100 text-sm">
                ✅ No setup fees • ✅ Smart data analysis included • ✅ Live
                project dashboard • ✅ 24/7 support
              </p>
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
