import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../api/client'
import { API_CONFIG, DEFAULT_PAGINATION } from '../api/config'
import type {
  PagedResponse,
  UpdateUserReportsDTO,
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

export function useUserReportsByUser(
  userId: string,
  params: UserReportsQueryParams = DEFAULT_PAGINATION
) {
  const queryParams = new URLSearchParams({
    page: (params.page ?? DEFAULT_PAGINATION.page).toString(),
    size: (params.size ?? DEFAULT_PAGINATION.size).toString(),
    sortBy: params.sortBy ?? 'reportedAt',
    sortDir: params.sortDir ?? DEFAULT_PAGINATION.sortDir,
  })

  return useQuery({
    queryKey: ['userReports', 'byUser', userId, params],
    queryFn: () =>
      apiClient.get<PagedResponse<UserReportsDTO>>(
        `${API_CONFIG.endpoints.userReports.byUserId(userId)}?${queryParams}`
      ),
    enabled: !!userId,
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

export function useUpdateUserReport() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: UpdateUserReportsDTO
    }) =>
      apiClient.put<UserReportsDTO>(
        API_CONFIG.endpoints.userReports.byId(id),
        data
      ),
    onSuccess: (updatedReport, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['userReport', id] })
      queryClient.invalidateQueries({ queryKey: ['userReports'] })
      if (updatedReport.areaId) {
        queryClient.invalidateQueries({
          queryKey: ['userReports', 'byArea', updatedReport.areaId],
        })
      }
      queryClient.invalidateQueries({
        queryKey: ['userReports', 'byUser', updatedReport.userId],
      })
    },
  })
}

export function useDeleteUserReport() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      apiClient.delete<void>(API_CONFIG.endpoints.userReports.byId(id)),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['userReport', id] })
      queryClient.invalidateQueries({ queryKey: ['userReports'] })
    },
  })
}

export function useRefreshUserReports() {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({ queryKey: ['userReports'] })
  }
}
