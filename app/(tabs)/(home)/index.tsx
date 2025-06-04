import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Text } from '@/components/ui/text'
import Colors from '@/constants/Colors'
import { useColorScheme } from '@/lib/use-color-scheme'
import { AlertTriangle } from 'lucide-react-native'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const { colorScheme } = useColorScheme()
  const isLoading = false

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
      </ScrollView>
    </SafeAreaView>
  )
}
