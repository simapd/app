import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Text } from '@/components/ui/text'
import Colors from '@/constants/Colors'
import { useAuth } from '@/lib/contexts/auth'
import { useUserReportsByArea } from '@/lib/hooks/use-user-reports'
import { useColorScheme } from '@/lib/use-color-scheme'
import { format } from 'date-fns'
import { AlertTriangle, CheckCircle, Clock, MapPin } from 'lucide-react-native'
import { ScrollView, View } from 'react-native'

export function RecentReports() {
  const { colorScheme } = useColorScheme()
  const { tokenInfo } = useAuth()
  const { data: reportsData, isLoading, error } = useUserReportsByArea(
    tokenInfo?.areaId || '',
    { size: 3, sortBy: 'reportedAt', sortDir: 'desc' }
  )

  if (isLoading) {
    return (
      <View className="w-full gap-4">
        <Text className="text-xl font-semibold">Relatórios Recentes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="w-72 h-32 rounded-2xl" />
            ))}
          </View>
        </ScrollView>
      </View>
    )
  }

  if (error || !reportsData?.content.length) {
    return (
      <View className="w-full gap-4">
        <Text className="text-xl font-semibold">Relatórios Recentes</Text>
        <Card className="w-full rounded-2xl">
        <CardContent className="flex items-center justify-center py-8">
          <View className="flex items-center gap-2">
            <AlertTriangle color={Colors[colorScheme].mutedForeground} size={24} />
            <Text className="text-lg text-muted-foreground">
              Nenhum relatório encontrado
            </Text>
          </View>
        </CardContent>
      </Card>
      </View>
    )
  }

  return (
    <View className="w-full gap-4">
      <Text className="text-xl font-semibold">Relatórios Recentes</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-4">
          {reportsData.content.map((report) => (
            <Card key={report.id} className="w-72 rounded-2xl">
              <CardHeader className="pb-2">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    {report.isVerified === "1" ? (
                      <CheckCircle 
                        color={Colors[colorScheme].primary} 
                        size={16} 
                      />
                    ) : (
                      <Clock 
                        color={Colors[colorScheme].mutedForeground} 
                        size={16} 
                      />
                    )}
                    <Text className="text-xs text-muted-foreground">
                      {report.isVerified === "1" ? "Verificado" : "Pendente"}
                    </Text>
                  </View>
                  <Text className="text-xs text-muted-foreground">
                    {format(new Date(report.reportedAt), 'dd/MM/yyyy')}
                  </Text>
                </View>
              </CardHeader>
              <CardContent className="pt-0">
                <Text className="text-sm font-medium mb-2 line-clamp-2">
                  {report.description}
                </Text>
                {report.locationInfo && (
                  <View className="flex-row items-center gap-1">
                    <MapPin 
                      color={Colors[colorScheme].mutedForeground} 
                      size={12} 
                    />
                    <Text className="text-xs text-muted-foreground line-clamp-1">
                      {report.locationInfo}
                    </Text>
                  </View>
                )}
              </CardContent>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  )
} 