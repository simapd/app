import { FormField } from '@/components/form-field'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import Colors from '@/constants/Colors'
import { useTokenInfo } from '@/lib/hooks/use-token-info'
import { useCurrentUser, useUpdateUser } from '@/lib/hooks/use-users'
import { useColorScheme } from '@/lib/use-color-scheme'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronRight } from 'lucide-react-native'
import { useCallback, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator, Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { toast } from 'sonner-native'
import {
  type EditProfileSchema,
  editProfileSchema,
} from '../schemas/schemas'

export function EditProfile() {
  const { colorScheme } = useColorScheme()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { userId } = useTokenInfo()
  const { data: currentUser } = useCurrentUser()
  const updateUserMutation = useUpdateUser()

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  function onSubmit(data: EditProfileSchema) {
    if (!userId) {
      toast.error('Erro ao obter dados do usuário')
      return
    }

    updateUserMutation.mutate(
      {
        id: userId,
        data: {
          name: data.name,
          email: data.email,
        },
      },
      {
        onSuccess: () => {
          toast.success('Perfil atualizado com sucesso!')
          bottomSheetModalRef.current?.dismiss()
        },
        onError: error => {
          toast.error(error.message || 'Erro ao atualizar perfil')
        },
      }
    )
  }

  const handlePresentModalPress = useCallback(() => {
    if (currentUser) {
      reset({
        name: currentUser.name,
        email: currentUser.email,
      })
    }
    bottomSheetModalRef.current?.present()
  }, [reset, currentUser])

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

  if (!currentUser) {
    return null
  }

  return (
    <>
      <Pressable onPress={handlePresentModalPress} className="w-full">
        <View className="flex-row w-full items-center justify-between gap-3 bg-muted px-5 py-4 rounded-2xl">
          <View className="flex-row items-center gap-3">
            <View className="size-16 rounded-full bg-primary/20 items-center justify-center">
              <Text className="text-2xl font-bold text-primary">
                {currentUser.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View className="flex flex-col">
              <Text className="text-xl font-semibold leading-none">
                {currentUser.name}
              </Text>
              <Text className="text-muted-foreground leading-1">
                {currentUser.email}
              </Text>
            </View>
          </View>
          <ChevronRight color={Colors[colorScheme].text} size={24} />
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
            <Text className="text-xl font-semibold">Editar perfil</Text>
            <View className="flex flex-col w-full">
              <Controller
                name="name"
                control={control}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <FormField required label="Nome" errorMsg={error?.message}>
                    <Input
                      placeholder="Seu nome completo"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCapitalize="words"
                      hasError={!!error}
                    />
                  </FormField>
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <FormField required label="Email" errorMsg={error?.message}>
                    <Input
                      placeholder="seu@email.com"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect={false}
                      keyboardType="email-address"
                      textContentType="emailAddress"
                      hasError={!!error}
                    />
                  </FormField>
                )}
              />
            </View>
            <Button
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || updateUserMutation.isPending}
            >
              <Text className="text-primary-foreground">
                {updateUserMutation.isPending ? (
                  <ActivityIndicator
                    size={16}
                    className="text-primary-foreground"
                  />
                ) : (
                  'Salvar'
                )}
              </Text>
            </Button>
          </SafeAreaView>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  )
}
