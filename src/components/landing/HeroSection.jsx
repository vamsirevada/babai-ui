import { Badge } from '../ui/badge'

const HeroSection = () => {
  return (
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
            Our AI reads every message, photo, and bill to give you real-time
            project control. Predict delays, prevent cost overruns, and manage
            multiple sites effortlessly.
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

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap');

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
    </div>
  )
}

export default HeroSection
