import { useQuery } from '@tanstack/react-query'
import type {
  PagedResponseDto,
  RiskAreaDto,
} from '../../app/(auth)/schemas/schemas'

const ASPNET_BASE_URL = process.env.EXPO_PUBLIC_ASPNET_URL

interface UseRiskAreasParams {
  pageNumber?: number
  pageSize?: number
}

export function useRiskAreas({
  pageNumber = 1,
  pageSize = 100,
}: UseRiskAreasParams = {}) {
  return useQuery({
    queryKey: ['riskAreas', pageNumber, pageSize],
    queryFn: async (): Promise<PagedResponseDto<RiskAreaDto>> => {
      const url = new URL('/risk-areas', ASPNET_BASE_URL)
      url.searchParams.set('pageNumber', pageNumber.toString())
      url.searchParams.set('pageSize', pageSize.toString())

      const response = await fetch(url.toString())

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Error fetching risk areas')
      }

      return response.json()
    },
  })
}
