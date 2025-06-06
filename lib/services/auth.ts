import AsyncStorage from '@react-native-async-storage/async-storage'
import type {
  LoginFormData,
  SignupFormData,
} from '../../app/(auth)/schemas/schemas'
import type { UpdateUserRequestDTO, UserResponseDTO } from '../types/types'

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
    const headers = {
      ...options.headers,
      'Content-Type': 'application/json',
    }

    const response = await fetch(`${JAVA_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`
      )
    }

    if (
      response.status === 204 ||
      response.headers.get('content-length') === '0'
    ) {
      return undefined as T
    }

    const contentType = response.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      return response.json()
    }

    return undefined as T
  }

  private async makeAuthenticatedRequest<T>(
    endpoint: string,
    options: RequestInit
  ): Promise<T> {
    const token = await this.getStoredToken()

    if (!token) {
      throw new Error('Token não encontrado. Faça login novamente.')
    }

    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    }

    return this.makeRequest<T>(endpoint, {
      ...options,
      headers,
    })
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
    const response = await this.makeRequest<AuthResponse>(
      '/api/users/register',
      {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          areaId: data.areaId,
        }),
      }
    )

    await AsyncStorage.setItem(TOKEN_KEY, response.token)
    return response
  }

  async getCurrentUser(): Promise<UserResponseDTO> {
    return this.makeAuthenticatedRequest<UserResponseDTO>('/api/auth/me', {
      method: 'GET',
    })
  }

  async updateUser(
    id: string,
    data: UpdateUserRequestDTO
  ): Promise<UserResponseDTO> {
    return this.makeAuthenticatedRequest<UserResponseDTO>(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteUser(id: string): Promise<void> {
    await this.makeAuthenticatedRequest<void>(`/api/users/${id}`, {
      method: 'DELETE',
    })
  }

  async logout(): Promise<void> {
    await AsyncStorage.removeItem(TOKEN_KEY)
  }

  async getStoredToken(): Promise<string | null> {
    return AsyncStorage.getItem(TOKEN_KEY)
  }
}

export const authService = new AuthService()
