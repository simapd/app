import { Skeleton } from '@/components/ui/skeleton'
import { Text } from '@/components/ui/text'
import { useAuth } from '@/lib/contexts/auth'
import { useRiskArea } from '@/lib/hooks/use-risk-areas'
import { useUserReportsByArea } from '@/lib/hooks/use-user-reports'
import { View } from 'react-native'

export function RiskAreaHeader() {
  const { tokenInfo } = useAuth()
  const { data: riskArea, isLoading, error } = useRiskArea(tokenInfo?.areaId || '')
  const { data: reportsData, isLoading: isLoadingReports } = useUserReportsByArea(
    tokenInfo?.areaId || '',
    { size: 10, sortBy: 'reportedAt', sortDir: 'desc' }
  )

  const getRecentSeverity = () => {
    if (isLoadingReports || !reportsData?.content) return "-"
    
    const verifiedReports = reportsData.content.filter(report => report.isVerified === "1")
    if (verifiedReports.length === 0) return "-"
    
    const severity = Math.min(100, verifiedReports.length * 20 + 40)
    return severity.toString()
  }

  const severity = getRecentSeverity()

  if (isLoading) {
    return (
      <View className="flex flex-col items-center justify-center gap-3 py-10">
        <Skeleton className="h-6 w-48" />
        <View className="flex flex-row items-baseline justify-center gap-2 relative">
          <Skeleton className="h-20 w-24" />
          <Skeleton className="h-6 w-12 absolute left-24 top-7" />
        </View>
        <View className="flex flex-col items-center justify-center gap-1">
          <Skeleton className="h-6 w-56" />
          <View className="flex flex-row items-center justify-center gap-6">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
          </View>
        </View>
      </View>
    )
  }

  if (error || !riskArea) {
    return (
      <View className="flex flex-col items-center justify-center gap-3 py-10">
        <Text className="text-xl">Área não encontrada</Text>
        <Text className="text-lg text-muted-foreground text-center">
          Não foi possível carregar as informações da área de risco
        </Text>
      </View>
    )
  }

  return (
    <View className="flex flex-col items-center justify-center gap-3 py-10">
      <Text className="text-xl">{riskArea.name}</Text>
      <View className="flex flex-row items-baseline justify-center gap-2 relative">
        <Text className="text-7xl font-semibold">{severity}</Text>
        {severity !== "-" && (
          <Text className="text-xl absolute left-24 top-7">/100</Text>
        )}
      </View>
      {riskArea.description && (
        <Text className="text-lg leading-none text-muted-foreground">{riskArea.description}</Text>
      )}
    </View>
  )
} 