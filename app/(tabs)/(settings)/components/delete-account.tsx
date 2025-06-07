import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import Colors from '@/constants/Colors'
import { useTokenInfo } from '@/lib/hooks/use-token-info'
import { useDeleteUser } from '@/lib/hooks/use-users'
import { authService } from '@/lib/services/auth'
import { useColorScheme } from '@/lib/use-color-scheme'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'
import { router } from 'expo-router'
import { ChevronRight, Trash2 } from 'lucide-react-native'
import { useCallback, useRef } from 'react'
import { ActivityIndicator, Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { toast } from 'sonner-native'

export function DeleteAccount() {
  const { colorScheme } = useColorScheme()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { userId } = useTokenInfo()
  const deleteUserMutation = useDeleteUser()

  function handleDeleteAccount() {
    if (!userId) {
      toast.error('Erro ao obter dados do usuário')
      return
    }

    deleteUserMutation.mutate(userId, {
      onSuccess: async () => {
        toast.success('Conta excluída com sucesso!')
        await authService.logout()
        router.replace('/(auth)/login')
        bottomSheetModalRef.current?.dismiss()
      },
      onError: error => {
        toast.error(error.message || 'Erro ao excluir conta')
      },
    })
  }

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  )

  return (
    <>
      <Pressable onPress={handlePresentModalPress} className="w-full">
        <View className="flex flex-row items-center justify-between w-full">
          <View className="flex flex-row items-center gap-4">
            <View className="p-3 rounded-2xl bg-destructive/20">
              <Trash2 color={Colors[colorScheme].destructive} size={20} />
            </View>
            <Text className="text-xl">Excluir conta</Text>
          </View>
          <ChevronRight color={Colors[colorScheme].text} size={20} />
        </View>
      </Pressable>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backgroundStyle={{
          borderWidth: 1,
          borderColor: Colors[colorScheme].border,
          backgroundColor: Colors[colorScheme].background,
        }}
        handleIndicatorStyle={{
          backgroundColor: Colors[colorScheme].border,
        }}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView className="flex flex-col items-center justify-center gap-4 px-6">
          <SafeAreaView
            className="flex flex-col gap-4 w-full"
            edges={['bottom']}
          >
            <View className="flex flex-col items-center gap-4">
              <View className="size-16 rounded-full bg-destructive/20 items-center justify-center">
                <Trash2 color={Colors[colorScheme].destructive} size={24} />
              </View>
              <View className="flex flex-col items-center gap-2">
                <Text className="text-xl font-semibold text-center">
                  Excluir conta
                </Text>
                <Text className="text-muted-foreground text-center text-sm">
                  Tem certeza que deseja excluir sua conta? Esta ação é
                  permanente e todos os seus dados serão perdidos.
                </Text>
              </View>
            </View>
            <View className="flex flex-col gap-3 w-full">
              <Button
                variant="destructive"
                onPress={handleDeleteAccount}
                disabled={deleteUserMutation.isPending}
              >
                <Text className="text-destructive-foreground">
                  {deleteUserMutation.isPending ? (
                    <ActivityIndicator size={16} />
                  ) : (
                    'Confirmar exclusão'
                  )}
                </Text>
              </Button>
              <Button
                variant="outline"
                onPress={() => bottomSheetModalRef.current?.dismiss()}
                disabled={deleteUserMutation.isPending}
              >
                <Text>Cancelar</Text>
              </Button>
            </View>
          </SafeAreaView>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  )
}
