import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import type {
  LoginFormData,
  SignupFormData,
} from '../../app/(auth)/schemas/schemas'
import { authService } from '../services/auth'
import { getTokenInfo, isTokenExpired } from '../../utils/jwt-decode'

interface User {
  id: string
  name: string
  email: string
  areaId: string
  createdAt: string
}

interface AuthContextData {
  user: User | null
  token: string | null
  tokenInfo: { email: string; areaId: string } | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (data: LoginFormData) => Promise<void>
  signup: (data: SignupFormData) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [tokenInfo, setTokenInfo] = useState<{
    email: string
    areaId: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!token

  useEffect(() => {
    loadStoredAuth()
  }, [])

  function updateTokenInfo(newToken: string) {
    setToken(newToken)
    const info = getTokenInfo(newToken)
    setTokenInfo(info)

    if (isTokenExpired(newToken)) {
      console.warn('Token expired, logging out')
      logout()
    }
  }

  async function loadStoredAuth() {
    try {
      const storedToken = await authService.getStoredToken()

      if (storedToken) {
        if (isTokenExpired(storedToken)) {
          console.log('Token expired, removing')
          await authService.logout()
        } else {
          updateTokenInfo(storedToken)
        }
      }
    } catch (error) {
      console.error('Error loading authentication:', error)
      await authService.logout()
    } finally {
      setIsLoading(false)
    }
  }

  async function login(data: LoginFormData) {
    setIsLoading(true)
    try {
      const response = await authService.login(data)

      updateTokenInfo(response.token)
      setUser(response.user)
    } finally {
      setIsLoading(false)
    }
  }

  async function signup(data: SignupFormData) {
    setIsLoading(true)
    try {
      const { confirmPassword, ...signupData } = data
      const response = await authService.signup(signupData)

      updateTokenInfo(response.token)
      setUser(response.user)
    } finally {
      setIsLoading(false)
    }
  }

  async function logout() {
    try {
      setIsLoading(true)
      await authService.logout()

      setToken(null)
      setTokenInfo(null)
      setUser(null)
    } catch (error) {
      console.error('Error logging out:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        tokenInfo,
        isLoading,
        isAuthenticated,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
