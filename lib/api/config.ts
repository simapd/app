const JAVA_BASE_URL = process.env.EXPO_PUBLIC_JAVA_URL

export const API_CONFIG = {
  baseURL: JAVA_BASE_URL,
  endpoints: {
    auth: {
      login: '/api/auth/login',
      me: '/api/auth/me',
    },
    users: {
      base: '/api/users',
      register: '/api/users/register',
      byId: (id: string) => `/api/users/${id}`,
    },
    riskAreas: {
      base: '/api/risk-areas',
      byId: (id: string) => `/api/risk-areas/${id}`,
    },
    userReports: {
      base: '/api/user-reports',
      byId: (id: string) => `/api/user-reports/${id}`,
      byAreaId: (areaId: string) => `/api/user-reports/area/${areaId}`,
      byUserId: (userId: string) => `/api/user-reports/user/${userId}`,
    },
    measurements: {
      base: '/api/measurements',
      byId: (id: string) => `/api/measurements/${id}`,
      bySensorId: (sensorId: string) => `/api/measurements/sensor/${sensorId}`,
      dailyAggregation: '/api/measurements/daily-aggregation',
      dailyAverage: '/api/measurements/daily-average',
    },
  },
} as const

export const DEFAULT_PAGINATION = {
  page: 0,
  size: 10,
  sortBy: 'createdAt',
  sortDir: 'desc',
} as const 