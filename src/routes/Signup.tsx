import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import axios from 'axios'
import { signup } from '@/utils/api'
import toast from 'react-hot-toast'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import { ModalLoader } from '@/components/Loader'

export const Route = createFileRoute('/Signup')({
  component: SignUp,
})

interface SignupFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  restaurant_name: string
}

interface SignupError {
  field?: keyof SignupFormData
  message: string
}

function SignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    restaurant_name: '',
  })
  const [errors, setErrors] = useState<SignupError[]>([])
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: SignupError[] = []

    if (!formData.name.trim()) {
      newErrors.push({ field: 'name', message: 'Name is required' })
    }

    if (!formData.email.trim()) {
      newErrors.push({ field: 'email', message: 'Email is required' })
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.push({ field: 'email', message: 'Invalid email format' })
    }

    if (!formData.password) {
      newErrors.push({ field: 'password', message: 'Password is required' })
    } else if (formData.password.length < 6) {
      newErrors.push({ field: 'password', message: 'Password must be at least 6 characters' })
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.push({ field: 'confirmPassword', message: 'Passwords do not match' })
    }

    if (!formData.restaurant_name.trim()) {
      newErrors.push({ field: 'restaurant_name', message: 'Restaurant name is required' })
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    setErrors(prev => prev.filter(err => err.field !== name))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      const { confirmPassword, ...signupData } = formData
      await signup(signupData)

      toast.success('Account created successfully!')
      setTimeout(() => {
        navigate({ to: '/Login' })
      }, 1500)
    } catch (error) {
      const errorMsg = axios.isAxiosError(error) && error.response?.data?.error
        ? error.response.data.error
        : 'An error occurred during signup. Please try again.'
      toast.error(errorMsg)
      setErrors([{ message: errorMsg }])
    } finally {
      setLoading(false)
    }
  }

  const getFieldError = (field: keyof SignupFormData): string | undefined => {
    return errors.find(err => err.field === field)?.message
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center px-4 py-8">
    <div className="w-full max-w-md bg-white rounded-xl shadow-xl hover:shadow-2xl border border-gray-200/50 p-8 transition duration-300 backdrop-blur-sm bg-white/95">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent text-center mb-2">Create Account</h1>
        <p className="text-gray-600 text-center text-sm">Start building your digital menu</p>
        <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full mx-auto mt-4"></div>
      </div>

      {loading && <ModalLoader message="Creating your account..." />}

        {errors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50/80 border border-red-200/50 rounded-lg">
            {errors.map((error, idx) => (
              <p key={idx} className="text-red-700 text-sm">
                {error.message}
              </p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white/50 hover:bg-white ${
                getFieldError('name') ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="John Doe"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white/50 hover:bg-white ${getFieldError('email') ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="johndoe@example.com"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="restaurant_name" className="block text-sm font-medium text-gray-700 mb-1">
              Restaurant Name
            </label>
            <input
              type="text"
              id="restaurant_name"
              name="restaurant_name"
              value={formData.restaurant_name}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white/50 hover:bg-white ${getFieldError('restaurant_name') ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Your Restaurant Name"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                autoComplete=''
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white/50 hover:bg-white ${getFieldError('password') ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="At least 6 characters"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                tabIndex={-1}
              >
                {showPassword ? (
                  <IoEyeOff size={20} />
                ) : (
                  <IoEye size={20} />
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                autoComplete=''
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white/50 hover:bg-white ${getFieldError('confirmPassword') ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Confirm your password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <IoEyeOff size={20} />
                ) : (
                  <IoEye size={20} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg hover:shadow-blue-200 disabled:from-blue-400 disabled:to-blue-500 text-white font-semibold py-2 rounded-lg transition duration-200 mt-6 hover:-translate-y-0.5 disabled:hover:translate-y-0"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-8">
          Already have an account?{' '}
          <a href="/Login" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  )
}