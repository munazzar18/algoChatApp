// components/LoginForm.tsx
import { useState } from 'react'

interface LoginFormProps {
  onSubmit: (userName: string) => void
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [userName, setUserName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(userName)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Join Chat</h1>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     text-gray-900 placeholder-gray-400"
            placeholder="Enter your username"
            required
            minLength={2}
            maxLength={20}
          />
        </div>

        <div className="space-y-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg
                     hover:bg-blue-600 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={userName.length < 2}
          >
            Join Chat
          </button>

          <p className="text-sm text-gray-500 text-center">
            By joining, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

        {/* Error Message (if needed) */}
        {userName.length > 20 && (
          <p className="mt-2 text-sm text-red-600">
            Username must be less than 20 characters
          </p>
        )}

        {userName.length === 1 && (
          <p className="mt-2 text-sm text-red-600">
            Username must be at least 2 characters
          </p>
        )}
      </form>
    </div>
  )
}

// Optional: Add loading state handling
interface LoadingLoginFormProps extends LoginFormProps {
  isLoading?: boolean
}

export const LoadingLoginForm = ({
  onSubmit,
  isLoading = false,
}: LoadingLoginFormProps) => {
  const [userName, setUserName] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoading) {
      onSubmit(userName)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Join Chat</h1>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     text-gray-900 placeholder-gray-400
                     disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Enter your username"
            required
            minLength={2}
            maxLength={20}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg
                     hover:bg-blue-600 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center"
            disabled={userName.length < 2 || isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Joining...
              </>
            ) : (
              'Join Chat'
            )}
          </button>

          <p className="text-sm text-gray-500 text-center">
            By joining, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

        {/* Validation Messages */}
        {userName.length > 20 && (
          <p className="mt-2 text-sm text-red-600">
            Username must be less than 20 characters
          </p>
        )}

        {userName.length === 1 && (
          <p className="mt-2 text-sm text-red-600">
            Username must be at least 2 characters
          </p>
        )}
      </form>
    </div>
  )
}
