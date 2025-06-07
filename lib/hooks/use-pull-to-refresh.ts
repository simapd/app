import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

export function usePullToRefresh(queryKeys: string[][] = [['userReports']]) {
  const queryClient = useQueryClient()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true)
    
    try {
      await Promise.all(
        queryKeys.map(queryKey =>
          queryClient.invalidateQueries({ queryKey })
        )
      )
      
      await Promise.all(
        queryKeys.map(queryKey =>
          queryClient.refetchQueries({ queryKey })
        )
      )
    } catch (error) {
      console.error('Error refreshing data:', error)
    } finally {
      setIsRefreshing(false)
    }
  }, [queryClient, queryKeys])

  return {
    isRefreshing,
    onRefresh,
  }
} 