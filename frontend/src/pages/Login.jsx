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
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  QrCode,
  CheckCircle,
} from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import PrefetchLink from '@/components/PrefetchLink'
import { prefetch } from '@/App'

// WhatsApp Logo Component
const WhatsAppIcon = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488" />
  </svg>
)

const Login = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [loginMethod, setLoginMethod] = useState('email') // 'email' or 'whatsapp'
  const [whatsappStep, setWhatsappStep] = useState(1) // 1: Phone, 2: QR/Link, 3: Verification
  const [verificationCode, setVerificationCode] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phoneNumber: '',
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

    if (loginMethod === 'email') {
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
    } else if (loginMethod === 'whatsapp') {
      // Phone number validation
      if (!formData.phoneNumber.trim()) {
        newErrors.phoneNumber = 'Phone number is required'
      } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phoneNumber.trim())) {
        newErrors.phoneNumber = 'Please enter a valid phone number'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generateWhatsAppLink = (phoneNumber, code) => {
    const message = `Hi! I want to sign in to my bab.ai account. My verification code is: ${code}`
    const whatsappBusinessNumber = '+919876543210' // Replace with your actual WhatsApp Business number
    return `https://wa.me/${whatsappBusinessNumber}?text=${encodeURIComponent(
      message
    )}`
  }

  const handleWhatsAppLogin = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Generate verification code
      const code = Math.random().toString(36).substring(2, 8).toUpperCase()
      setVerificationCode(code)

      // Simulate API call to initiate WhatsApp login
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store pending login
      const pendingLogin = {
        phoneNumber: formData.phoneNumber,
        verificationCode: code,
        timestamp: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes
      }

      localStorage.setItem('pendingWhatsAppLogin', JSON.stringify(pendingLogin))

      setWhatsappStep(2)

      toast({
        title: 'WhatsApp login initiated!',
        description: 'Please send the message via WhatsApp to sign in.',
      })
    } catch (error) {
      console.error('WhatsApp login error:', error)
      setErrors({
        general: 'Failed to initiate WhatsApp login. Please try again.',
      })

      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to initiate WhatsApp login.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const simulateWhatsAppVerification = async () => {
    setIsLoading(true)

    try {
      // Simulate verification process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Check if user exists with this phone number
      const registeredUsers = JSON.parse(
        localStorage.getItem('registeredUsers') || '[]'
      )
      const user = registeredUsers.find(
        (u) => u.phoneNumber === formData.phoneNumber
      )

      if (!user) {
        setErrors({
          general:
            'No account found with this phone number. Please register first.',
        })

        toast({
          variant: 'destructive',
          title: 'Account not found',
          description: 'Please register first or try a different login method.',
        })
        return
      }

      // Auto sign-in
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          phoneNumber: user.phoneNumber,
          token: 'whatsapp-login-token-' + Date.now(),
        })
      )

      // Clean up pending login
      localStorage.removeItem('pendingWhatsAppLogin')

      setWhatsappStep(3)

      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in via WhatsApp.',
      })

      // Redirect after showing success
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    } catch (error) {
      console.error('Verification error:', error)
      setErrors({
        general: 'Verification failed. Please try again.',
      })

      toast({
        variant: 'destructive',
        title: 'Verification failed',
        description: 'Please try again or contact support.',
      })
    } finally {
      setIsLoading(false)
    }
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
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-brand-white font-bold text-xl font-heading">
                    B
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-brand-accent to-brand-accent rounded-full flex items-center justify-center">
                  <span className="text-brand-white text-xs font-bold font-heading">
                    ai
                  </span>
                </div>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Welcome back
            </CardTitle>
            <CardDescription className="text-gray-600">
              {loginMethod === 'email'
                ? 'Sign in to your bab.ai account'
                : 'Sign in via WhatsApp for quick access'}
            </CardDescription>

            {/* Login Method Toggle */}
            <div className="flex gap-2 mt-4">
              <Button
                type="button"
                variant={loginMethod === 'email' ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setLoginMethod('email')
                  setWhatsappStep(1)
                  setErrors({})
                }}
                className="flex-1"
              >
                Email
              </Button>
              <Button
                type="button"
                variant={loginMethod === 'whatsapp' ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setLoginMethod('whatsapp')
                  setErrors({})
                }}
                className="flex-1 bg-functional-success hover:bg-functional-success/90 text-brand-white border-functional-success font-body"
              >
                <WhatsAppIcon className="w-4 h-4 mr-1" />
                WhatsApp
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

            {loginMethod === 'email' ? (
              /* Email Login Form */
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
                  className="w-full bg-gradient-primary hover:opacity-90 text-brand-white disabled:opacity-50 font-body"
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
            ) : (
              /* WhatsApp Login Flow */
              <div className="space-y-6">
                {whatsappStep === 1 && (
                  <form onSubmit={handleWhatsAppLogin} className="space-y-4">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <WhatsAppIcon className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-sm text-gray-600">
                        Quick sign-in via WhatsApp for construction
                        professionals
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                        className={`w-full ${
                          errors.phoneNumber
                            ? 'border-red-500 focus:border-red-500'
                            : ''
                        }`}
                      />
                      {errors.phoneNumber && (
                        <p className="text-xs text-red-600">
                          {errors.phoneNumber}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        Enter the phone number linked to your account
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-green-500 hover:bg-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Setting up WhatsApp...
                        </>
                      ) : (
                        <>
                          <WhatsAppIcon className="w-4 h-4 mr-2" />
                          Sign in with WhatsApp
                        </>
                      )}
                    </Button>
                  </form>
                )}

                {whatsappStep === 2 && (
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                      <QrCode className="w-8 h-8 text-white" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Send WhatsApp Message
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Click the button below to open WhatsApp and send the
                        verification message
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-xs text-gray-600 mb-2">
                        Your verification code:
                      </p>
                      <p className="font-mono font-bold text-lg text-green-600">
                        {verificationCode}
                      </p>
                    </div>

                    <Button
                      onClick={() =>
                        window.open(
                          generateWhatsAppLink(
                            formData.phoneNumber,
                            verificationCode
                          ),
                          '_blank'
                        )
                      }
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                    >
                      <WhatsAppIcon className="w-4 h-4 mr-2" />
                      Open WhatsApp & Send Message
                    </Button>

                    <div className="pt-4 border-t">
                      <p className="text-xs text-gray-600 mb-3">
                        Message to send:
                      </p>
                      <div className="p-3 bg-gray-50 rounded-lg text-sm text-left">
                        "Hi! I want to sign in to my bab.ai account. My
                        verification code is: {verificationCode}"
                      </div>
                    </div>

                    <Button
                      onClick={simulateWhatsAppVerification}
                      variant="outline"
                      className="w-full mt-4"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        'I sent the message - Sign Me In'
                      )}
                    </Button>
                  </div>
                )}

                {whatsappStep === 3 && (
                  <div className="text-center space-y-4">
                    <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
                    <h3 className="text-lg font-semibold text-green-600">
                      Welcome Back!
                    </h3>
                    <p className="text-gray-600">
                      You have successfully signed in via WhatsApp.
                    </p>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-600">
                        🎉 Redirecting you to your dashboard...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Button
                  asChild
                  variant="link"
                  className="px-0 text-blue-600 hover:text-blue-800 font-medium"
                >
                  <PrefetchLink to="/register" prefetch={prefetch.register}>
                    Sign up
                  </PrefetchLink>
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
