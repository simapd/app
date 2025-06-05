import AsyncStorage from '@react-native-async-storage/async-storage'
import type {
  LoginFormData,
  SignupFormData,
} from '../../app/(auth)/schemas/schemas'

const JAVA_BASE_URL = process.env.EXPO_PUBLIC_JAVA_URL
export const TOKEN_KEY = '@simapd:token'

export interface AuthResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
    areaId: string
    createdAt: string
  }
}

export interface AuthError {
  message: string
  field?: string
}

class AuthService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit
  ): Promise<T> {
    const response = await fetch(`${JAVA_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'Request error')
    }

    return response.json()
  }

  async login(data: LoginFormData): Promise<AuthResponse> {
    const response = await this.makeRequest<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })

    await AsyncStorage.setItem(TOKEN_KEY, response.token)
    return response
  }

  async signup(
    data: Omit<SignupFormData, 'confirmPassword'>
  ): Promise<AuthResponse> {
    const response = await this.makeRequest<AuthResponse>('/api/users/register', {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        areaId: data.areaId,
      }),
    })

    await AsyncStorage.setItem(TOKEN_KEY, response.token)
    return response
  }

  async logout(): Promise<void> {
    await AsyncStorage.removeItem(TOKEN_KEY)
  }

  async getStoredToken(): Promise<string | null> {
    return AsyncStorage.getItem(TOKEN_KEY)
  }
}

export const authService = new AuthService()
