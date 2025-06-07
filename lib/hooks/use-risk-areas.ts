import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type {
  PagedResponseDto,
  RiskAreaDto,
} from '../../app/(auth)/schemas/schemas'
import { apiClient } from '../api/client'
import { API_CONFIG } from '../api/config'
import { RiskAreasDTO, UpdateRiskAreasDTO } from '../types/types'

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

export function useRiskArea(id: string) {
  return useQuery({
    queryKey: ['riskArea', id],
    queryFn: () =>
      apiClient.get<RiskAreasDTO>(API_CONFIG.endpoints.riskAreas.byId(id)),
    enabled: !!id,
  })
}

export function useCreateRiskArea() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Omit<RiskAreasDTO, 'id' | 'createdAt'>) =>
      apiClient.post<RiskAreasDTO>(API_CONFIG.endpoints.riskAreas.base, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['riskAreas'] })
    },
  })
}

export function useUpdateRiskArea() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: UpdateRiskAreasDTO
    }) => apiClient.put<void>(API_CONFIG.endpoints.riskAreas.byId(id), data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['riskArea', id] })
      queryClient.invalidateQueries({ queryKey: ['riskAreas'] })
    },
  })
}

export function useDeleteRiskArea() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      apiClient.delete<void>(API_CONFIG.endpoints.riskAreas.byId(id)),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['riskArea', id] })
      queryClient.invalidateQueries({ queryKey: ['riskAreas'] })
    },
  })
}