import { Button } from '../ui/button.jsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card.jsx'
import { ArrowRight } from 'lucide-react'

const CTASection = ({ onGetStarted }) => {
  return (
    <div>
      <Card className="w-full max-w-6xl mx-auto bg-gradient-primary border-0 text-white relative overflow-hidden shadow-2xl">
        {/* Enhanced background decoration */}
        <div className="absolute inset-0 bg-gradient-primary/95"></div>
        <div
          className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-40 translate-x-40 animate-pulse"
          style={{ animationDuration: '4s' }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32 animate-pulse"
          style={{ animationDuration: '6s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-32 h-32 bg-brand-accent/20 rounded-full -translate-x-16 -translate-y-16 animate-pulse"
          style={{ animationDuration: '5s' }}
        ></div>

        <CardHeader className="relative z-10 px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
          <div className="text-center mb-6">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-brand-white/20 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 backdrop-blur-sm font-body">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-brand-accent"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Trusted by 500+ Construction Teams
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-white mb-4 sm:mb-6 leading-tight text-center px-4 sm:px-0 font-heading">
            Ready to Revolutionize Your Construction Projects with{' '}
            <span className="text-brand-white/90 font-extrabold">bab.ai?</span>
          </CardTitle>
          <CardDescription className="text-brand-white/80 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed text-center px-4 sm:px-0 font-body">
            Join leading builders who've increased project efficiency by 40% and
            reduced delays by 60% using Bab.ai's WhatsApp-native construction
            intelligence platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 px-4 pb-12 lg:px-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              onClick={onGetStarted}
              variant="secondary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-slate-50 px-10 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 font-body"
            >
              Check your Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Enhanced feature list */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <div className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
              <div className="w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-center font-body">
                No Setup Fees
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-center font-body">
                Real-Time Dashboard
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
              <div className="w-8 h-8 bg-slate-400 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-center font-body">
                Expert Support 24/7
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-center font-body">
                AI-Powered Insights
              </span>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="pt-6 border-t border-white/20 text-center">
            <div className="flex flex-wrap justify-center items-center gap-6 opacity-80">
              <div className="text-white/70 text-sm font-medium font-body">
                Featured in Construction Weekly
              </div>
              <div className="text-white/70 text-sm font-medium">•</div>
              <div className="text-white/70 text-sm font-medium font-body">
                Winner: Best AI Tool 2025
              </div>
              <div className="text-white/70 text-sm font-medium">•</div>
              <div className="text-white/70 text-sm font-medium font-body">
                ISO 27001 Certified
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CTASection
