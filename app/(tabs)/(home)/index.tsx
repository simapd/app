import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Text } from '@/components/ui/text'
import Colors from '@/constants/Colors'
import { useColorScheme } from '@/lib/use-color-scheme'
import { AlertTriangle } from 'lucide-react-native'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Bar, CartesianChart } from 'victory-native'

export default function Home() {
  const { colorScheme } = useColorScheme()
  const isLoading = false

  const PRECIPITATION_DATA = [
    { day: 'Dom', precipitation: 5 },
    { day: 'Seg', precipitation: 12 },
    { day: 'Ter', precipitation: 18 },
    { day: 'Qua', precipitation: 25 },
    { day: 'Qui', precipitation: 15 },
    { day: 'Sex', precipitation: 7 },
    { day: 'Sáb', precipitation: 6 },
  ]

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          paddingHorizontal: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex flex-col items-center justify-center gap-3 py-10">
          <Text className="text-xl">Morro do Macaco</Text>
          <View className="flex flex-row items-baseline justify-center gap-2 relative">
            <Text className="text-7xl font-semibold">78</Text>
            <Text className="text-xl absolute left-24 top-7">/100</Text>
          </View>
          <View className="flex flex-col items-center justify-center gap-1">
            <Text className="text-xl leading-none">Evite áreas de encosta</Text>
            <View className="flex flex-row items-center justify-center gap-6">
              <Text className="text-xl">
                U: <Text className="text-xl font-semibold">72%</Text>
              </Text>
              <Text className="text-xl">
                C: <Text className="text-xl font-semibold">82mm</Text>
              </Text>
            </View>
          </View>
        </View>

        {isLoading ? (
          <Skeleton className="w-full h-40 rounded-2xl" />
        ) : (
          <Card className="w-full rounded-2xl">
            <CardHeader className="flex flex-row items-center gap-4">
              <AlertTriangle
                color={Colors[colorScheme].destructive}
                size={20}
              />
              <Text className="text-2xl font-semibold">
                Alto risco de deslizamento
              </Text>
            </CardHeader>
            <CardContent>
              <Text className="text-lg">
                Precipitação intensa nas últimas 24 horas. Evacuação preventiva
                recomendada.
              </Text>
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <Skeleton className="w-full h-58 rounded-2xl" />
        ) : (
          <Card className="w-full rounded-2xl">
            <CardHeader>
              <Text className="text-2xl font-semibold">
                Quantidade de chuva
              </Text>
            </CardHeader>
            <CardContent className="flex flex-row items-center justify-between">
              <View className="flex flex-col items-center justify-center">
                <View className="flex flex-row items-baseline gap-1">
                  <Text className="text-3xl font-semibold">82</Text>
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
                    <Text
                      key={index}
                      className="text-sm font-medium text-center"
                    >
                      {item.day}
                    </Text>
                  ))}
                </View>
              </View>
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <Skeleton className="w-full h-48 rounded-2xl" />
        ) : (
          <Card className="w-full rounded-2xl">
            <CardHeader>
              <Text className="text-2xl font-semibold">Movimentação</Text>
            </CardHeader>
            <CardContent className="flex flex-row items-center justify-between gap-4">
              <View className="flex flex-col items-center justify-center">
                <View className="flex flex-row items-baseline gap-1">
                  <Text className="text-3xl font-semibold">0.70</Text>
                  <Text className="text-xl">m/s</Text>
                </View>
                <Text className="text-lg">Instável</Text>
              </View>
              <View className="flex-1 w-full gap-1 items-end justify-between">
                <View className="flex flex-row items-center gap-6">
                  <Text className="text-lg">Ontem</Text>
                  <Text className="text-lg font-semibold">0.45 m/s</Text>
                </View>
                <View className="flex flex-row items-center gap-6">
                  <Text className="text-lg">Quinta</Text>
                  <Text className="text-lg font-semibold">0.90 m/s</Text>
                </View>
                <View className="flex flex-row items-center gap-6">
                  <Text className="text-lg">Quarta</Text>
                  <Text className="text-lg font-semibold">0.45 m/s</Text>
                </View>
              </View>
            </CardContent>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
