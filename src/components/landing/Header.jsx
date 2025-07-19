import { Button } from '../ui/button.jsx'

const Header = ({ onLogin, onRegister }) => {
  return (
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
            onClick={onLogin}
            className="text-gray-600 hover:text-gray-900"
          >
            Login
          </Button>
          <Button
            onClick={onRegister}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
