import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../api/client'
import { API_CONFIG, DEFAULT_PAGINATION } from '../api/config'
import type {
  PagedResponse,
  UserReportsDTO,
  UserReportsQueryParams,
} from '../types/types'

export function useUserReports(
  params: UserReportsQueryParams = DEFAULT_PAGINATION
) {
  const queryParams = new URLSearchParams({
    page: (params.page ?? DEFAULT_PAGINATION.page).toString(),
    size: (params.size ?? DEFAULT_PAGINATION.size).toString(),
    sortBy: params.sortBy ?? 'reportedAt',
    sortDir: params.sortDir ?? DEFAULT_PAGINATION.sortDir,
  })

  return useQuery({
    queryKey: ['userReports', params],
    queryFn: () =>
      apiClient.get<PagedResponse<UserReportsDTO>>(
        `${API_CONFIG.endpoints.userReports.base}?${queryParams}`
      ),
  })
}

export function useUserReport(id: string) {
  return useQuery({
    queryKey: ['userReport', id],
    queryFn: () =>
      apiClient.get<UserReportsDTO>(API_CONFIG.endpoints.userReports.byId(id)),
    enabled: !!id,
  })
}

export function useUserReportsByArea(
  areaId: string,
  params: UserReportsQueryParams = DEFAULT_PAGINATION
) {
  const queryParams = new URLSearchParams({
    page: (params.page ?? DEFAULT_PAGINATION.page).toString(),
    size: (params.size ?? DEFAULT_PAGINATION.size).toString(),
    sortBy: params.sortBy ?? 'reportedAt',
    sortDir: params.sortDir ?? DEFAULT_PAGINATION.sortDir,
  })

  return useQuery({
    queryKey: ['userReports', 'byArea', areaId, params],
    queryFn: () =>
      apiClient.get<PagedResponse<UserReportsDTO>>(
        `${API_CONFIG.endpoints.userReports.byAreaId(areaId)}?${queryParams}`
      ),
    enabled: !!areaId,
  })
}

export function useCreateUserReport() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Omit<UserReportsDTO, 'id' | 'reportedAt'>) =>
      apiClient.post<UserReportsDTO>(
        API_CONFIG.endpoints.userReports.base,
        data
      ),
    onSuccess: newReport => {
      queryClient.invalidateQueries({ queryKey: ['userReports'] })
      if (newReport.areaId) {
        queryClient.invalidateQueries({
          queryKey: ['userReports', 'byArea', newReport.areaId],
        })
      }
      queryClient.invalidateQueries({
        queryKey: ['userReports', 'byUser', newReport.userId],
      })
    },
  })
}
