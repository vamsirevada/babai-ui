import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

const Login = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call - replace with actual authentication logic
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Demo credentials check
      if (formData.email === 'demo@bab.ai' && formData.password === 'demo123') {
        // Store user session (in real app, you'd get this from API)
        localStorage.setItem(
          'user',
          JSON.stringify({
            email: formData.email,
            name: 'Demo User',
            token: 'demo-token-' + Date.now(),
          })
        )

        toast({
          title: 'Welcome back!',
          description: 'You have successfully signed in to bab.ai',
        })

        // Redirect to dashboard
        navigate('/dashboard')
      } else {
        // Handle invalid credentials
        setErrors({
          general:
            'Invalid email or password. Try demo@bab.ai with password: demo123',
        })

        toast({
          variant: 'destructive',
          title: 'Sign in failed',
          description: 'Invalid email or password. Please try again.',
        })
      }
    } catch (error) {
      console.error('Login error:', error)
      setErrors({
        general: 'Something went wrong. Please try again later.',
      })

      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to sign in. Please try again later.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToHome = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={handleBackToHome}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {/* Login Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">ai</span>
                </div>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Welcome back
            </CardTitle>
            <CardDescription className="text-gray-600">
              Sign in to your bab.ai account
            </CardDescription>
          </CardHeader>

          <CardContent>
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email (try: demo@bab.ai)"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full ${
                    errors.email ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password (try: demo123)"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className={`w-full pr-10 ${
                      errors.password
                        ? 'border-red-500 focus:border-red-500'
                        : ''
                    }`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <Button
                  variant="link"
                  className="px-0 text-sm text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </Button>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Button
                  variant="link"
                  onClick={() => navigate('/register')}
                  className="px-0 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Sign up
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login
