import { type SignupFormData, signupSchema } from '@/app/(auth)/schemas/schemas'
import { FormField } from '@/components/form-field'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Text } from '@/components/ui/text'
import Colors from '@/constants/Colors'
import { useAuth } from '@/lib/contexts/auth'
import { useRiskAreas } from '@/lib/hooks/use-risk-areas'
import { useColorScheme } from '@/lib/use-color-scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { Eye, EyeOff, Loader2 } from 'lucide-react-native'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { toast } from 'sonner-native'

export default function SignupScreen() {
  const { signup, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { colorScheme } = useColorScheme()

  const {
    data: riskAreasData,
    isLoading: isLoadingAreas,
    error: areasError,
  } = useRiskAreas()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      areaId: '',
    },
  })

  async function onSubmit(data: SignupFormData) {
    try {
      await signup(data)
      toast.success('Conta criada com sucesso!')
      router.replace('/')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao criar conta'
      toast.error(message)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center py-8">
          <View className="mb-8">
            <Text className="text-3xl font-bold text-foreground mb-2">
              Criar conta
            </Text>
            <Text className="text-lg text-muted-foreground">
              Preencha os dados para criar sua conta
            </Text>
          </View>

          <View className="gap-6">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <FormField
                  label="Nome"
                  errorMsg={errors.name?.message}
                  hasError={!!errors.name}
                >
                  <Input
                    placeholder="Linus Torvalds"
                    value={value}
                    onChangeText={onChange}
                    hasError={!!errors.name}
                    autoCapitalize="words"
                    editable={!isLoading}
                  />
                </FormField>
              )}
            />

            <Controller
              control={control}
              name="areaId"
              render={({ field: { onChange, value } }) => (
                <FormField
                  label="Área de risco"
                  errorMsg={errors.areaId?.message}
                  hasError={!!errors.areaId}
                >
                  <Select
                    value={
                      value
                        ? {
                            value: value,
                            label:
                              riskAreasData?.data?.find(
                                area => area.id === value
                              )?.name || value,
                          }
                        : undefined
                    }
                    onValueChange={option => onChange(option?.value || '')}
                  >
                    <SelectTrigger
                      className={errors.areaId ? 'border-destructive' : ''}
                    >
                      <SelectValue
                        placeholder="Selecione uma área de risco"
                        className="text-foreground"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoadingAreas ? (
                        <View className="p-4 flex-row items-center justify-center">
                          <Loader2
                            size={16}
                            className="text-muted-foreground animate-spin mr-2"
                          />
                          <Text className="text-muted-foreground">
                            Carregando áreas...
                          </Text>
                        </View>
                      ) : areasError ? (
                        <View className="p-4">
                          <Text className="text-destructive text-center">
                            Erro ao carregar áreas
                          </Text>
                        </View>
                      ) : riskAreasData?.data?.length ? (
                        riskAreasData.data.map(area => (
                          <SelectItem
                            key={area.id}
                            value={area.id}
                            label={area.name}
                          />
                        ))
                      ) : (
                        <View className="p-4">
                          <Text className="text-muted-foreground text-center">
                            Nenhuma área encontrada
                          </Text>
                        </View>
                      )}
                    </SelectContent>
                  </Select>
                </FormField>
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <FormField
                  label="Email"
                  errorMsg={errors.email?.message}
                  hasError={!!errors.email}
                >
                  <Input
                    placeholder="torvalds@linux-foundation.org"
                    value={value}
                    onChangeText={onChange}
                    hasError={!!errors.email}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    editable={!isLoading}
                  />
                </FormField>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <FormField
                  label="Senha"
                  errorMsg={errors.password?.message}
                  hasError={!!errors.password}
                >
                  <View className="relative">
                    <Input
                      placeholder="********"
                      value={value}
                      onChangeText={onChange}
                      hasError={!!errors.password}
                      secureTextEntry={!showPassword}
                      editable={!isLoading}
                    />
                    <Pressable
                      onPress={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff
                          size={20}
                          color={Colors[colorScheme].mutedForeground}
                        />
                      ) : (
                        <Eye
                          size={20}
                          color={Colors[colorScheme].mutedForeground}
                        />
                      )}
                    </Pressable>
                  </View>
                </FormField>
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <FormField
                  label="Confirmar senha"
                  errorMsg={errors.confirmPassword?.message}
                  hasError={!!errors.confirmPassword}
                >
                  <View className="relative">
                    <Input
                      placeholder="********"
                      value={value}
                      onChangeText={onChange}
                      hasError={!!errors.confirmPassword}
                      secureTextEntry={!showConfirmPassword}
                      editable={!isLoading}
                    />
                    <Pressable
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeOff
                          size={20}
                          color={Colors[colorScheme].mutedForeground}
                        />
                      ) : (
                        <Eye
                          size={20}
                          color={Colors[colorScheme].mutedForeground}
                        />
                      )}
                    </Pressable>
                  </View>
                </FormField>
              )}
            />
          </View>

          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading || isLoadingAreas}
            className="mt-8"
          >
            <Text>
              {isLoading ? (
                <ActivityIndicator
                  size={16}
                  className="text-primary-foreground"
                />
              ) : (
                'Criar conta'
              )}
            </Text>
          </Button>

          <View className="mt-8 flex-row items-center gap-2 w-full justify-center">
            <Text className="text-muted-foreground">Já tem uma conta?</Text>
            <Pressable
              onPress={() => router.push('/(auth)/login')}
              disabled={isLoading}
            >
              <Text className="text-primary font-semibold">Fazer login</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
