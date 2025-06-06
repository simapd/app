import { useAuth } from '../contexts/auth'

export function useTokenInfo() {
  const { tokenInfo, token, isAuthenticated } = useAuth()

  return {
    email: tokenInfo?.email,
    areaId: tokenInfo?.areaId,
    userId: tokenInfo?.userId,
    tokenInfo,
    token,
    isAuthenticated,
    hasTokenInfo: !!tokenInfo,
  }
}
