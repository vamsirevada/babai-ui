import { Button } from '../ui/button.jsx'
import { memo, useState } from 'react'
import { X } from 'lucide-react'

const Logo = () => (
  <div className="flex items-center space-x-3 group cursor-pointer">
    <div className="relative transform transition-all duration-300 group-hover:scale-110">
      {/* Main Logo Container */}
      <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-primary/80 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-brand-primary/25">
        <span className="text-brand-white font-bold text-xl font-heading transform transition-all duration-300 group-hover:scale-110">
          B
        </span>
      </div>

      {/* AI Badge with Pulse Animation */}
      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-functional-success to-functional-success/80 rounded-full flex items-center justify-center shadow-md animate-pulse">
        <span className="text-brand-white text-xs font-bold font-heading">
          ai
        </span>
      </div>

      {/* Floating Dots Animation */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-brand-primary/60 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -top-2 right-1 w-1.5 h-1.5 bg-functional-success/60 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150"></div>
    </div>

    {/* Animated Text */}
    <div className="overflow-hidden">
      <span className="text-2xl font-bold text-brand-charcoal font-heading inline-block transform transition-all duration-500 group-hover:translate-x-1">
        <span className="inline-block transform transition-all duration-300 group-hover:text-brand-primary group-hover:scale-105">
          bab
        </span>
        <span className="inline-block text-functional-success transform transition-all duration-300 delay-75 group-hover:scale-110 group-hover:rotate-3">
          .ai
        </span>
      </span>
    </div>

    {/* Subtle Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 to-functional-success/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm"></div>
  </div>
)

const Header = memo(({ onLogin, onRegister }) => {
  return (
    <header className="relative z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <Logo />
        </div>
      </div>
    </header>
  )
})

export default Header
