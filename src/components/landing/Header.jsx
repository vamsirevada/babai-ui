import { Button } from '../ui/button.jsx'
import { memo, useState } from 'react'
import { X } from 'lucide-react'

const Logo = () => (
  <div className="flex items-center space-x-3">
    <div className="relative">
      <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg">
        <span className="text-brand-white font-bold text-lg font-heading">
          B
        </span>
      </div>
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-accent rounded-full flex items-center justify-center">
        <span className="text-brand-charcoal text-xs font-bold font-heading">
          ai
        </span>
      </div>
    </div>
    <span className="text-2xl font-bold text-brand-charcoal font-heading">
      bab.ai
    </span>
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
