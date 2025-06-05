import { jwtDecode } from 'jwt-decode'

export interface JWTPayload {
  areaId: string
  sub: string
  iat: number
  exp: number
}

export function decodeJWT(token: string): JWTPayload | null {
  try {
    const payload = jwtDecode<JWTPayload>(token)
    return payload
  } catch (error) {
    console.error('Error decoding JWT:', error)
    return null
  }
}

export function isTokenExpired(token: string): boolean {
  try {
    const payload = jwtDecode<JWTPayload>(token)
    if (!payload || !payload.exp) {
      return true
    }

    const currentTime = Math.floor(Date.now() / 1000)
    return payload.exp < currentTime
  } catch (error) {
    console.error('Error checking token expiration:', error)
    return true
  }
}

export function getTokenInfo(
  token: string
): { email: string; areaId: string } | null {
  const payload = decodeJWT(token)
  if (!payload) {
    return null
  }

  return {
    email: payload.sub,
    areaId: payload.areaId,
  }
}
