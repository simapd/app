import { Text } from '@/components/ui/text'
import Colors from '@/constants/Colors'
import { useColorScheme } from '@/lib/use-color-scheme'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Bar, CartesianChart } from 'victory-native'

export default function Measurements() {
  const { colorScheme } = useColorScheme()

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
    <SafeAreaView className="flex-1 gap-6 items-center justify-center px-6">
      <View className="h-44 w-full">
        <View className="flex-1 h-44">
          <CartesianChart
            data={PRECIPITATION_DATA}
            xKey="day"
            yKeys={['precipitation']}
            domainPadding={{ left: 30, right: 30 }}
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
        <View className="flex flex-row justify-between px-4">
          {PRECIPITATION_DATA.map((item, index) => (
            <Text key={index} className="font-medium text-center">
              {item.day}
            </Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}
