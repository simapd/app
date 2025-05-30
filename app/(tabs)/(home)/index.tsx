import { Text } from '@/components/ui/text'
import { useColorScheme } from '@/lib/use-color-scheme'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const { colorScheme } = useColorScheme()

  return (
    <SafeAreaView className="flex-1 items-center justify-center gap-6 px-6">
      <Text>Hello World!</Text>
    </SafeAreaView>
  )
}
