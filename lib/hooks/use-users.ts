import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../api/client'
import { API_CONFIG, DEFAULT_PAGINATION } from '../api/config'
import { authService } from '../services/auth'
import type {
  PagedResponse,
  PaginationParams,
  UpdateUserRequestDTO,
  UserResponseDTO,
} from '../types/types'

export function useUsers(params: PaginationParams = DEFAULT_PAGINATION) {
  const queryParams = new URLSearchParams({
    page: (params.page ?? DEFAULT_PAGINATION.page).toString(),
    size: (params.size ?? DEFAULT_PAGINATION.size).toString(),
    sortBy: params.sortBy ?? DEFAULT_PAGINATION.sortBy,
    sortDir: params.sortDir ?? DEFAULT_PAGINATION.sortDir,
  })

  return useQuery({
    queryKey: ['users', params],
    queryFn: () =>
      apiClient.get<PagedResponse<UserResponseDTO>>(
        `${API_CONFIG.endpoints.users.base}?${queryParams}`
      ),
  })
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () =>
      apiClient.get<UserResponseDTO>(API_CONFIG.endpoints.users.byId(id)),
    enabled: !!id,
  })
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authService.getCurrentUser(),
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: UpdateUserRequestDTO
    }) => authService.updateUser(id, data),
    onSuccess: (updatedUser, { id }) => {
      queryClient.setQueryData(['user', id], updatedUser)
      queryClient.invalidateQueries({ queryKey: ['users'] })

      queryClient.setQueryData(
        ['currentUser'],
        (oldData: UserResponseDTO | undefined) => {
          if (oldData && oldData.id === id) {
            return updatedUser
          }
          return oldData
        }
      )
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => authService.deleteUser(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: ['user', id] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.removeQueries({ queryKey: ['currentUser'] })
    },
  })
}
