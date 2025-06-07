import { Card, CardContent } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import Colors from '@/constants/Colors'
import { useColorScheme } from '@/lib/use-color-scheme'
import { MessageCircleWarning } from 'lucide-react-native'
import { Pressable, View } from 'react-native'

interface CreateReportButtonProps {
  onPress: () => void
}

export function CreateReportButton({ onPress }: CreateReportButtonProps) {
  const { colorScheme } = useColorScheme()

  return (
    <Pressable onPress={onPress} className="w-full">
      <Card className="w-full rounded-2xl p-5">
        <CardContent className="flex flex-row items-center justify-between gap-4 p-0">
          <MessageCircleWarning
            color={Colors[colorScheme].text}
            size={48}
          />
          <View className="flex-1 items-start justify-center gap-4">
            <Text className="text-2xl font-semibold">Reporte um risco</Text>
            <Text className="text-lg">
              Caso detecte algum risco de deslizamento, ajude a comunidade
              reportando aqui.
            </Text>
          </View>
        </CardContent>
      </Card>
    </Pressable>
  )
} 