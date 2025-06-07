import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../api/client'
import { API_CONFIG, DEFAULT_PAGINATION } from '../api/config'
import type {
  DailyAggregationDTO,
  MeasurementsDTO,
  MeasurementsQueryParams,
  PagedResponse,
} from '../types/types'

export function useMeasurements(
  params: MeasurementsQueryParams = DEFAULT_PAGINATION
) {
  const queryParams = new URLSearchParams({
    page: (params.page ?? DEFAULT_PAGINATION.page).toString(),
    size: (params.size ?? DEFAULT_PAGINATION.size).toString(),
    sortBy: params.sortBy ?? 'measuredAt',
    sortDir: params.sortDir ?? DEFAULT_PAGINATION.sortDir,
  })

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
    queryKey: ['measurements', params],
    queryFn: () =>
      apiClient.get<PagedResponse<MeasurementsDTO>>(
        `${API_CONFIG.endpoints.measurements.base}?${queryParams}`
      ),
  })
}

export function useMeasurement(id: string) {
  return useQuery({
    queryKey: ['measurement', id],
    queryFn: () =>
      apiClient.get<MeasurementsDTO>(
        API_CONFIG.endpoints.measurements.byId(id)
      ),
    enabled: !!id,
  })
}

export function useMeasurementsBySensor(
  sensorId: string,
  params: MeasurementsQueryParams = DEFAULT_PAGINATION
) {
  return useMeasurements({
    ...params,
    sensorId,
  })
}

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

export function useDailyAverage(
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
    queryKey: ['dailyAverage', params],
    queryFn: () =>
      apiClient.get<number>(
        `${API_CONFIG.endpoints.measurements.dailyAverage}?${queryParams}`
      ),
  })
}
