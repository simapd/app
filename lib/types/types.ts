export interface UserResponseDTO {
  id: string
  name: string
  email: string
  areaId: string
  createdAt: string
}

export interface CreateUserRequestDTO {
  name: string
  email: string
  password: string
  areaId: string
}

export interface UpdateUserRequestDTO {
  name?: string
  email?: string
  password?: string
  areaId?: string
}

export interface RiskAreasDTO {
  id: string
  name: string
  description?: string
  latitude: string
  longitude: string
  createdAt: string
}

export interface UpdateRiskAreasDTO {
  name?: string
  description?: string
  latitude?: string
  longitude?: string
}

export interface UserReportsDTO {
  id: string
  areaId?: string
  userId: string
  description: string
  locationInfo?: string
  photoUrl?: string
  isVerified: string
  reportedAt: string
}

export interface UpdateUserReportsDTO {
  areaId?: string
  description?: string
  locationInfo?: string
  photoUrl?: string
  isVerified?: string
}

export interface PagedResponse<T> {
  content: T[]
  pageable: {
    pageNumber: number
    pageSize: number
    sort: {
      sorted: boolean
      unsorted: boolean
      empty: boolean
    }
    offset: number
    paged: boolean
    unpaged: boolean
  }
  totalElements: number
  totalPages: number
  last: boolean
  first: boolean
  numberOfElements: number
  size: number
  number: number
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  empty: boolean
}

export interface PaginationParams {
  page?: number
  size?: number
  sortBy?: string
  sortDir?: 'asc' | 'desc'
}

export interface UserReportsQueryParams extends PaginationParams {
  areaId?: string
  userId?: string
}

export interface MeasurementsDTO {
  id: string
  measurementValue: number
  measuredAt: string
  sensorId: string
}

export interface DailyAggregationDTO {
  date: string
  averageValue: number
  measurementCount: number
  minValue: number
  maxValue: number
  sumValue: number
}

export interface MeasurementsQueryParams extends PaginationParams {
  sensorId?: string
  startDate?: string
  endDate?: string
} 