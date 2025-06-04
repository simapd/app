import { Text } from '@/components/ui/text'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
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
      </ScrollView>
    </SafeAreaView>
  )
}
