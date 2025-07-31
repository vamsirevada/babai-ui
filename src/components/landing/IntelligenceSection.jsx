import { Card } from '../ui/card.jsx'
import { useScrollAnimation } from '../../hooks/use-scroll-animation'

const IntelligenceSection = () => {
  const [titleRef, titleVisible] = useScrollAnimation()
  const [cardsRef, cardsVisible] = useScrollAnimation()

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div
        ref={titleRef}
        className={`text-center mb-6 sm:mb-8 transition-all duration-1000 transform ${
          titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Key value propositions */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 px-4">
          <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-md border border-emerald-200 hover:shadow-lg transition-shadow duration-300">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-700 font-body">
              No App
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-md border border-blue-200 hover:shadow-lg transition-shadow duration-300">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-700 font-body">
              No Learning
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-md border border-slate-200 hover:shadow-lg transition-shadow duration-300">
            <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-700 font-body">
              No Setup
            </span>
          </div>
        </div>
      </div>

      <div
        ref={cardsRef}
        className={`grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 px-4 transition-all duration-1000 transform ${
          cardsVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Procurement AI */}
        <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 group border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-slate-50 hover:from-blue-100 hover:to-slate-100 hover:border-blue-200 rounded-2xl">
          {/* Procurement Video */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg bg-slate-100 mb-6 group-hover:shadow-xl transition-shadow duration-300">
            <video
              className="w-full h-auto"
              autoPlay
              muted
              loop
              playsInline
              loading="lazy"
              poster="/Procure-poster.png"
              style={{
                maxHeight: '200px',
                objectFit: 'cover',
              }}
            >
              <source src="/Procure.webm" type="video/webm" />
              <source src="/Procure.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent pointer-events-none"></div>
          </div>

          <p className="text-slate-600 leading-relaxed text-sm px-2 font-body">
            "Revolutionize procurement flow with AI-powered vendor management
            through WhatsApp."
          </p>
        </Card>

        {/* Credit */}
        <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 group border-2 border-slate-100 bg-gradient-to-br from-slate-50 to-emerald-50 hover:from-slate-100 hover:to-emerald-100 hover:border-slate-200 rounded-2xl">
          {/* Credit Video */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg bg-slate-100 mb-6 group-hover:shadow-xl transition-shadow duration-300">
            <video
              className="w-full h-auto"
              autoPlay
              muted
              loop
              playsInline
              loading="lazy"
              poster="/Credit-poster.png"
              style={{
                maxHeight: '200px',
                objectFit: 'cover',
              }}
            >
              <source src="/Credit.webm" type="video/webm" />
              <source src="/Credit.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-600/20 to-transparent pointer-events-none"></div>
          </div>

          <p className="text-slate-600 leading-relaxed text-sm px-2 font-body">
            "Smart credit management that triggers direct vendor payments based
            on verified progress."
          </p>
        </Card>
        {/* SiteOps AI */}
        <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 group border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-blue-50 hover:from-emerald-100 hover:to-blue-100 hover:border-emerald-200 rounded-2xl">
          {/* SiteOps Video */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg bg-slate-100 mb-6 group-hover:shadow-xl transition-shadow duration-300">
            <video
              className="w-full h-auto"
              autoPlay
              muted
              loop
              playsInline
              loading="lazy"
              poster="/SiteOps-poster.png"
              style={{
                maxHeight: '200px',
                objectFit: 'cover',
              }}
            >
              <source src="/SiteOps.webm" type="video/webm" />
              <source src="/SiteOps.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/20 to-transparent pointer-events-none"></div>
          </div>
          <p className="text-slate-600 leading-relaxed text-sm px-2 font-body">
            "Streamline site operations through intelligent WhatsApp monitoring
            in all construction phases."
          </p>
        </Card>
      </div>
    </div>
  )
}

export default IntelligenceSection
