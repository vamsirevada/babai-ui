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

const Register = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters'
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters'
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        'Password must contain uppercase, lowercase, and number'
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call - replace with actual registration logic
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Check if email already exists (simulation)
      const existingUsers = JSON.parse(
        localStorage.getItem('registeredUsers') || '[]'
      )
      if (existingUsers.some((user) => user.email === formData.email)) {
        setErrors({
          email: 'An account with this email already exists',
        })

        toast({
          variant: 'destructive',
          title: 'Registration failed',
          description: 'An account with this email already exists.',
        })
        return
      }

      // Create user account (simulation)
      const newUser = {
        id: Date.now(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email,
        createdAt: new Date().toISOString(),
      }

      // Store user in localStorage (simulation)
      existingUsers.push(newUser)
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers))

      // Auto sign-in the user
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: newUser.email,
          name: `${newUser.firstName} ${newUser.lastName}`,
          token: 'user-token-' + Date.now(),
        })
      )

      toast({
        title: 'Welcome to bab.ai!',
        description: 'Your account has been created successfully.',
      })

      // Redirect to dashboard
      navigate('/dashboard')
    } catch (error) {
      console.error('Registration error:', error)
      setErrors({
        general: 'Something went wrong. Please try again later.',
      })

      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create account. Please try again later.',
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

        {/* Register Card */}
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
              Create account
            </CardTitle>
            <CardDescription className="text-gray-600">
              Sign up for your bab.ai account
            </CardDescription>
          </CardHeader>

          <CardContent>
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className={
                      errors.firstName
                        ? 'border-red-500 focus:border-red-500'
                        : ''
                    }
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-600">{errors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className={
                      errors.lastName
                        ? 'border-red-500 focus:border-red-500'
                        : ''
                    }
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full ${
                    errors.email ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
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
                  <p className="text-xs text-red-600">{errors.password}</p>
                )}
                <p className="text-xs text-gray-500">
                  Must be 8+ characters with uppercase, lowercase, and number
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className={`w-full pr-10 ${
                      errors.confirmPassword
                        ? 'border-red-500 focus:border-red-500'
                        : ''
                    }`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="text-xs text-gray-600">
                By creating an account, you agree to our{' '}
                <Button
                  variant="link"
                  className="px-0 text-xs text-blue-600 hover:text-blue-800 h-auto"
                >
                  Terms of Service
                </Button>{' '}
                and{' '}
                <Button
                  variant="link"
                  onClick={() => navigate('/privacy-policy')}
                  className="px-0 text-xs text-blue-600 hover:text-blue-800 h-auto"
                >
                  Privacy Policy
                </Button>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Button
                  variant="link"
                  onClick={() => navigate('/login')}
                  className="px-0 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Sign in
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Register
