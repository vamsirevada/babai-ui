import { Building2, Truck, HardHat } from 'lucide-react'

const TargetAudienceSection = () => {
  return (
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
          <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-blue-500 group-hover:to-indigo-600 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-110">
            <Building2 className="w-8 h-8 text-white drop-shadow-sm" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Builders</h3>
          <p className="text-gray-600">
            Manage multiple projects, track progress, and coordinate with teams
            efficiently through WhatsApp
          </p>
        </div>

        <div className="text-center group">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-emerald-500 group-hover:to-green-600 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-110">
            <Truck className="w-8 h-8 text-white drop-shadow-sm" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Vendors</h3>
          <p className="text-gray-600">
            Submit quotes, track orders, and communicate with project teams
            seamlessly via WhatsApp
          </p>
        </div>

        <div className="text-center group">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-purple-500 group-hover:to-violet-600 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-110">
            <HardHat className="w-8 h-8 text-white drop-shadow-sm" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Site Engineers
          </h3>
          <p className="text-gray-600">
            Report updates, request materials, and access project data instantly
            through familiar WhatsApp interface
          </p>
        </div>
      </div>
    </div>
  )
}

export default TargetAudienceSection
