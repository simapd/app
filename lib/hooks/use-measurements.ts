import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../api/client'
import { API_CONFIG } from '../api/config'
import type { DailyAggregationDTO } from '../types/types'

export function useDailyAggregation(
  params: {
    sensorId?: string
    startDate?: string
    endDate?: string
  } = {}
) {
  const queryParams = new URLSearchParams()

  if (params.sensorId) {
    queryParams.append('sensorId', params.sensorId)
  }
  if (params.startDate) {
    queryParams.append('startDate', params.startDate)
  }
  if (params.endDate) {
    queryParams.append('endDate', params.endDate)
  }

  return useQuery({
    queryKey: ['dailyAggregation', params],
    queryFn: () =>
      apiClient.get<DailyAggregationDTO[]>(
        `${API_CONFIG.endpoints.measurements.dailyAggregation}?${queryParams}`
      ),
  })
}
