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
  Phone,
  ShieldCheck,
} from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useEffect } from 'react'

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

const Register = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [registrationMethod, setRegistrationMethod] = useState('email') // 'email' or 'whatsapp'
  const [whatsappStep, setWhatsappStep] = useState(1) // 1: Phone, 2: QR/Link, 3: OTP Entry, 4: Success
  const [verificationCode, setVerificationCode] = useState('')
  const [enteredOtp, setEnteredOtp] = useState('')
  const [otpTimer, setOtpTimer] = useState(300) // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  })

  // OTP Timer Effect
  useEffect(() => {
    let interval = null
    if (whatsappStep === 2 && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((timer) => {
          if (timer <= 1) {
            setCanResend(true)
            return 0
          }
          return timer - 1
        })
      }, 1000)
    } else if (otpTimer === 0) {
      setCanResend(true)
    }
    return () => clearInterval(interval)
  }, [whatsappStep, otpTimer])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    // Special handling for OTP input (only allow digits and limit to 6 characters)
    if (name === 'otp') {
      const otpValue = value.replace(/\D/g, '').slice(0, 6)
      setEnteredOtp(otpValue)
      return
    }

    setFormData({
      ...formData,
      [name]: value,
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

    if (registrationMethod === 'email') {
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
    } else if (registrationMethod === 'whatsapp') {
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
    const message = `Hi! I want to register for bab.ai construction management platform. My verification code is: ${code}`
    const whatsappBusinessNumber = '+919876543210' // Replace with your actual WhatsApp Business number
    return `https://wa.me/${whatsappBusinessNumber}?text=${encodeURIComponent(
      message
    )}`
  }

  const handleWhatsAppRegistration = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Generate verification code
      const code = Math.random().toString(36).substring(2, 8).toUpperCase()
      setVerificationCode(code)

      // Simulate API call to initiate WhatsApp registration
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store pending registration
      const pendingRegistration = {
        phoneNumber: formData.phoneNumber,
        verificationCode: code,
        timestamp: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes
      }

      localStorage.setItem(
        'pendingWhatsAppRegistration',
        JSON.stringify(pendingRegistration)
      )

      // Reset timer and resend state
      setOtpTimer(300) // 5 minutes
      setCanResend(false)
      setEnteredOtp('')
      setWhatsappStep(2)

      toast({
        title: 'WhatsApp registration initiated!',
        description:
          'Please send the message via WhatsApp to complete registration.',
      })
    } catch (error) {
      console.error('WhatsApp registration error:', error)
      setErrors({
        general: 'Failed to initiate WhatsApp registration. Please try again.',
      })

      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to initiate WhatsApp registration.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpVerification = async (e) => {
    e.preventDefault()

    if (!enteredOtp || enteredOtp.length !== 6) {
      setErrors({
        otp: 'Please enter a valid 6-digit OTP',
      })
      return
    }

    setIsLoading(true)

    try {
      // Get pending registration
      const pendingRegistration = JSON.parse(
        localStorage.getItem('pendingWhatsAppRegistration') || '{}'
      )

      // Verify OTP
      if (enteredOtp !== pendingRegistration.verificationCode) {
        setErrors({
          otp: 'Invalid OTP. Please check and try again.',
        })

        toast({
          variant: 'destructive',
          title: 'Invalid OTP',
          description: 'The OTP you entered is incorrect.',
        })
        return
      }

      // Check if OTP expired
      if (new Date() > new Date(pendingRegistration.expiresAt)) {
        setErrors({
          otp: 'OTP has expired. Please request a new one.',
        })

        toast({
          variant: 'destructive',
          title: 'OTP Expired',
          description: 'Please request a new OTP.',
        })
        return
      }

      // Simulate verification process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setWhatsappStep(3)

      toast({
        title: 'OTP Verified!',
        description: 'Creating your account...',
      })

      // Continue with account creation
      setTimeout(() => {
        completeWhatsAppRegistration()
      }, 1000)
    } catch (error) {
      console.error('OTP verification error:', error)
      setErrors({
        otp: 'Verification failed. Please try again.',
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

  const handleResendOtp = async () => {
    setIsLoading(true)

    try {
      // Generate new verification code
      const newCode = Math.random().toString(36).substring(2, 8).toUpperCase()
      setVerificationCode(newCode)

      // Update pending registration with new code
      const pendingRegistration = {
        phoneNumber: formData.phoneNumber,
        verificationCode: newCode,
        timestamp: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes
      }

      localStorage.setItem(
        'pendingWhatsAppRegistration',
        JSON.stringify(pendingRegistration)
      )

      // Reset timer and states
      setOtpTimer(300)
      setCanResend(false)
      setEnteredOtp('')
      setErrors({})

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: 'New OTP sent!',
        description: 'A new verification code has been sent to your WhatsApp.',
      })
    } catch (error) {
      console.error('Resend OTP error:', error)
      toast({
        variant: 'destructive',
        title: 'Failed to resend OTP',
        description: 'Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const completeWhatsAppRegistration = async () => {
    setIsLoading(true)

    try {
      // Simulate verification process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create user account
      const newUser = {
        id: Date.now(),
        firstName: 'WhatsApp',
        lastName: 'User',
        phoneNumber: formData.phoneNumber,
        email: `${formData.phoneNumber.replace(
          /[^\d]/g,
          ''
        )}@whatsapp.bab-ai.com`,
        registrationMethod: 'whatsapp',
        createdAt: new Date().toISOString(),
      }

      // Store user
      const existingUsers = JSON.parse(
        localStorage.getItem('registeredUsers') || '[]'
      )
      existingUsers.push(newUser)
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers))

      // Auto sign-in
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: newUser.email,
          name: `${newUser.firstName} ${newUser.lastName}`,
          phoneNumber: newUser.phoneNumber,
          token: 'whatsapp-user-token-' + Date.now(),
        })
      )

      // Clean up pending registration
      localStorage.removeItem('pendingWhatsAppRegistration')

      setWhatsappStep(4)

      toast({
        title: 'Welcome to bab.ai!',
        description: 'Your WhatsApp registration is complete.',
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

  const simulateWhatsAppVerification = async () => {
    setIsLoading(true)

    try {
      // Simulate WhatsApp message verification process
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Move to OTP entry step
      setWhatsappStep(3)

      toast({
        title: 'Message sent successfully!',
        description:
          'Please enter the OTP you received to complete registration.',
      })
    } catch (error) {
      console.error('WhatsApp verification error:', error)
      toast({
        variant: 'destructive',
        title: 'Verification failed',
        description: 'Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
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
              {registrationMethod === 'email'
                ? 'Sign up for your bab.ai account'
                : 'Register via WhatsApp for quick access'}
            </CardDescription>

            {/* Registration Method Toggle */}
            <div className="flex gap-2 mt-4">
              <Button
                type="button"
                variant={registrationMethod === 'email' ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setRegistrationMethod('email')
                  setWhatsappStep(1)
                  setErrors({})
                }}
                className="flex-1"
              >
                Email
              </Button>
              <Button
                type="button"
                variant={
                  registrationMethod === 'whatsapp' ? 'default' : 'outline'
                }
                size="sm"
                onClick={() => {
                  setRegistrationMethod('whatsapp')
                  setErrors({})
                }}
                className="flex-1 bg-brand-primary hover:bg-brand-accent text-brand-white border-brand-primary"
              >
                <WhatsAppIcon className="w-4 h-4 mr-1" />
                WhatsApp
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {errors.general && (
              <div className="mb-4 p-3 bg-brand-white border border-brand-primary rounded-md">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

            {registrationMethod === 'email' ? (
              /* Email Registration Form */
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
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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
            ) : (
              /* WhatsApp Registration Flow */
              <div className="space-y-6">
                {whatsappStep === 1 && (
                  <form
                    onSubmit={handleWhatsAppRegistration}
                    className="space-y-4"
                  >
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-2">
                        <WhatsAppIcon className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-sm text-gray-600">
                        Quick registration via WhatsApp for construction
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
                        We'll send you a verification message via WhatsApp
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-brand-primary hover:bg-brand-accent text-brand-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Setting up WhatsApp...
                        </>
                      ) : (
                        <>
                          <WhatsAppIcon className="w-4 h-4 mr-2" />
                          Continue with WhatsApp
                        </>
                      )}
                    </Button>
                  </form>
                )}

                {whatsappStep === 2 && (
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto">
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

                    <div className="p-4 bg-brand-white rounded-lg border border-brand-primary">
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
                        "Hi! I want to register for bab.ai construction
                        management platform. My verification code is:{' '}
                        {verificationCode}"
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
                        'I sent the message - Complete Registration'
                      )}
                    </Button>
                  </div>
                )}

                {whatsappStep === 3 && (
                  <form onSubmit={handleOtpVerification} className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShieldCheck className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        Enter Verification Code
                      </h3>
                      <p className="text-sm text-gray-600">
                        Please enter the 6-digit code we sent to your WhatsApp
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="enteredOtp">Verification Code</Label>
                      <Input
                        id="enteredOtp"
                        name="enteredOtp"
                        type="text"
                        placeholder="123456"
                        value={enteredOtp}
                        onChange={handleInputChange}
                        maxLength={6}
                        className={`w-full text-center text-2xl font-mono tracking-wider ${
                          errors.otp
                            ? 'border-red-500 focus:border-red-500'
                            : ''
                        }`}
                        required
                      />
                      {errors.otp && (
                        <p className="text-xs text-red-600">{errors.otp}</p>
                      )}
                    </div>

                    {otpTimer > 0 && (
                      <div className="text-center">
                        <p className="text-sm text-gray-600">
                          Resend code in{' '}
                          <span className="font-medium text-green-600">
                            {Math.floor(otpTimer / 60)}:
                            {(otpTimer % 60).toString().padStart(2, '0')}
                          </span>
                        </p>
                      </div>
                    )}

                    <div className="space-y-3">
                      <Button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white"
                        disabled={
                          isLoading || !enteredOtp || enteredOtp.length !== 6
                        }
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          'Verify & Complete Registration'
                        )}
                      </Button>

                      {canResend && (
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={handleResendOtp}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Resending...
                            </>
                          ) : (
                            'Resend Code'
                          )}
                        </Button>
                      )}
                    </div>
                  </form>
                )}

                {whatsappStep === 4 && (
                  <div className="text-center space-y-4">
                    <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
                    <h3 className="text-lg font-semibold text-green-600">
                      Registration Complete!
                    </h3>
                    <p className="text-gray-600">
                      Welcome to bab.ai! Your WhatsApp registration was
                      successful.
                    </p>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-600">
                        🎉 You can now access our construction management tools
                        and communicate with your team via WhatsApp!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

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
