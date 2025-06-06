import { Text } from '@/components/ui/text'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DeleteAccount } from './components/delete-account'
import { Developers } from './components/developers'
import { EditProfile } from './components/edit-profile'
import { Logout } from './components/logout'
import { ThemeChanger } from './components/theme-changer'

export default function Settings() {
  return (
    <SafeAreaView className="flex-1 gap-6 items-center justify-center px-6">
      <View className="w-full items-start">
        <Text className="text-3xl font-semibold">Configurações</Text>
      </View>
      <View className="flex-1 w-full gap-8">
        <View className="flex flex-col w-full gap-2">
          <Text className="font-medium text-muted-foreground">Perfil</Text>
          <EditProfile />
        </View>

        <View className="flex flex-col w-full gap-2">
          <Text className="font-medium text-muted-foreground">Sistema</Text>
          <ThemeChanger />
        </View>

        <View className="flex flex-col w-full gap-2">
          <Text className="font-medium text-muted-foreground">Sobre</Text>
          <Developers />
        </View>

        <View className="flex flex-col w-full gap-2">
          <Text className="font-medium text-muted-foreground">Conta</Text>
          <View className="flex flex-col gap-3">
            <Logout />
            <DeleteAccount />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
