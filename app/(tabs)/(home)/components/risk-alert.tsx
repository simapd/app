import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Text } from '@/components/ui/text'
import Colors from '@/constants/Colors'
import { useAuth } from '@/lib/contexts/auth'
import { useUserReportsByArea } from '@/lib/hooks/use-user-reports'
import { useColorScheme } from '@/lib/use-color-scheme'
import { AlertTriangle, Info, Shield } from 'lucide-react-native'
import { View } from 'react-native'

export function RiskAlert() {
  const { colorScheme } = useColorScheme()
  const { tokenInfo } = useAuth()
  const { data: reportsData, isLoading } = useUserReportsByArea(
    tokenInfo?.areaId || '',
    { size: 5, sortBy: 'reportedAt', sortDir: 'desc' }
  )

  if (isLoading) {
    return <Skeleton className="w-full h-40 rounded-2xl" />
  }

  const recentReports = reportsData?.content || []
  const verifiedReports = recentReports.filter(
    report => report.isVerified === '1'
  )

  const riskLevel =
    verifiedReports.length >= 3
      ? 'HIGH'
      : verifiedReports.length >= 1
        ? 'MEDIUM'
        : 'LOW'

  const getRiskConfig = () => {
    switch (riskLevel) {
      case 'HIGH':
        return {
          icon: AlertTriangle,
          color: Colors[colorScheme].destructive,
          title: 'Alto risco de deslizamento',
          message:
            'Múltiplos relatórios verificados nas últimas horas. Evacuação preventiva recomendada.',
          bgColor: 'bg-destructive/20',
        }
      case 'MEDIUM':
        return {
          icon: AlertTriangle,
          color: Colors[colorScheme].primary || Colors[colorScheme].destructive,
          title: 'Risco moderado de deslizamento',
          message:
            'Relatórios de risco detectados na área. Mantenha-se alerta e evite áreas de encosta.',
          bgColor: 'bg-primary/20',
        }
      default:
        return {
          icon: Shield,
          color: Colors[colorScheme].primary,
          title: 'Área monitorada',
          message:
            'Nenhum risco iminente detectado. Continue seguindo as orientações de segurança.',
          bgColor: 'bg-background',
        }
    }
  }

  const config = getRiskConfig()
  const IconComponent = config.icon

  return (
    <Card className={`w-full rounded-2xl ${config.bgColor}`}>
      <CardHeader className="flex flex-row items-center gap-4">
        <IconComponent color={config.color} size={20} />
        <Text className="text-2xl font-semibold">{config.title}</Text>
      </CardHeader>
      <CardContent>
        <Text className="text-lg">{config.message}</Text>
        {recentReports.length > 0 && (
          <View className="pt-4">
            <View className="flex-row items-center gap-2">
              <Info color={Colors[colorScheme].mutedForeground} size={14} />
              <Text className="text-sm text-muted-foreground">
                {recentReports.length} relatório(s) recente(s) •{' '}
                {verifiedReports.length} verificado(s)
              </Text>
            </View>
          </View>
        )}
      </CardContent>
    </Card>
  )
}
