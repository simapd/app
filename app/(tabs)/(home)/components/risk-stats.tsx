import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Text } from '@/components/ui/text'
import Colors from '@/constants/Colors'
import { useDailyAggregation } from '@/lib/hooks/use-measurements'
import { useColorScheme } from '@/lib/use-color-scheme'
import { addDays, format, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Pressable, View } from 'react-native'
import { Bar, CartesianChart } from 'victory-native'

export function RiskStats() {
  const { colorScheme } = useColorScheme()

  const endDate = new Date()
  const startDate = subDays(endDate, 6)

  const { data: dailyAggregationData, isLoading } = useDailyAggregation({
    startDate: format(startDate, 'yyyy-MM-dd'),
    endDate: format(addDays(endDate, 1), 'yyyy-MM-dd'),
  })

  const PRECIPITATION_DATA = []
  for (let i = 0; i < 7; i++) {
    const currentDate = subDays(endDate, 6 - i)
    const dayName = format(currentDate, 'E', { locale: ptBR }).substring(0, 3)
    const dateString = format(currentDate, 'yyyy-MM-dd')
    
    const existingData = dailyAggregationData?.find(item => item.date === dateString)
    
    PRECIPITATION_DATA.push({
      day: dayName,
      precipitation: existingData?.averageValue || 0,
    })
  }

  const todayDateString = format(new Date(), 'yyyy-MM-dd')
  const todayPrecipitation = dailyAggregationData?.find(item => item.date === todayDateString)?.averageValue || 0

  if (isLoading) {
    return (
      <View className="w-full gap-6">
        <Skeleton className="w-full h-58 rounded-2xl" />
        <Skeleton className="w-full h-48 rounded-2xl" />
      </View>
    )
  }

  return (
    <View className="w-full gap-6">
      <Pressable className="w-full p-0">
        <Card className="w-full rounded-2xl">
          <CardHeader>
            <Text className="text-2xl font-semibold">Quantidade de chuva</Text>
          </CardHeader>
          <CardContent className="flex flex-row items-center justify-between">
            <View className="flex flex-col items-center justify-center">
              <View className="flex flex-row items-baseline gap-1">
                <Text className="text-3xl font-semibold">
                  {Math.round(todayPrecipitation)}
                </Text>
                <Text className="text-xl">mm</Text>
              </View>
              <Text className="text-lg">Últimas 24h</Text>
            </View>
            <View className="h-32">
              <View className="flex-1 h-32">
                <CartesianChart
                  data={PRECIPITATION_DATA}
                  xKey="day"
                  yKeys={['precipitation']}
                  domainPadding={{ left: 13, right: 15 }}
                >
                  {({ points, chartBounds }) => (
                    <Bar
                      points={points.precipitation}
                      chartBounds={chartBounds}
                      color={Colors[colorScheme].primary}
                      innerPadding={0.35}
                      roundedCorners={{ topLeft: 6, topRight: 6 }}
                    />
                  )}
                </CartesianChart>
              </View>
              <View className="flex flex-row justify-between gap-1">
                {PRECIPITATION_DATA.map((item, index) => (
                  <Text key={index} className="text-sm font-medium text-center">
                    {item.day.slice(0, 1).toUpperCase() +
                      item.day.slice(1).toLowerCase()}
                  </Text>
                ))}
              </View>
            </View>
          </CardContent>
        </Card>
      </Pressable>
    </View>
  )
}
