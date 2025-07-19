import { Card, CardContent } from '../ui/card.jsx'

const ProblemSection = () => {
  return (
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
            <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
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
  )
}

export default ProblemSection
