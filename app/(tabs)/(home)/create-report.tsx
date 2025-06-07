import { FormField } from '@/components/form-field'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { useTokenInfo } from '@/lib/hooks/use-token-info'
import { useCreateUserReport } from '@/lib/hooks/use-user-reports'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { toast } from 'sonner-native'
import {
  type CreateReportFormData,
  createReportSchema,
} from './schemas/schemas'

export default function CreateReport() {
  const router = useRouter()
  const { userId, areaId } = useTokenInfo()
  const createReportMutation = useCreateUserReport()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateReportFormData>({
    resolver: zodResolver(createReportSchema),
    defaultValues: {
      description: '',
      locationInfo: '',
    },
  })

  async function onSubmit(data: CreateReportFormData) {
    if (!userId) {
      toast.error('Usuário não encontrado')
      return
    }

    try {
      await createReportMutation.mutateAsync({
        userId,
        areaId,
        description: data.description.trim(),
        locationInfo: data.locationInfo?.trim() || undefined,
        isVerified: '0',
      })

      toast.success('Relatório enviado com sucesso!')
      router.back()
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao enviar relatório'
      toast.error(errorMessage)
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
              Novo Relatório
            </Text>
            <Text className="text-lg text-muted-foreground">
              Reporte um risco para ajudar a comunidade
            </Text>

            <View className="mt-8 gap-4 bg-muted/20 p-4 rounded-lg">
              <Text className="text-lg font-semibold">Importante</Text>
              <View className="gap-2">
                <Text className="text-sm text-muted-foreground">
                  • Seu relatório será analisado por nossa equipe técnica
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Em caso de risco iminente, procure um local seguro
                  imediatamente
                </Text>
                <Text className="text-sm text-muted-foreground">
                  • Para emergências, ligue 193 (Bombeiros) ou 199 (Defesa
                  Civil)
                </Text>
              </View>
            </View>
          </View>

          <View className="gap-6">
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <FormField
                  label="Descricao"
                  required
                  errorMsg={errors.description?.message}
                  hasError={!!errors.description}
                >
                  <Input
                    placeholder="Descreva o risco observado"
                    value={value}
                    onChangeText={onChange}
                    hasError={!!errors.description}
                    editable={!createReportMutation.isPending}
                  />
                </FormField>
              )}
            />

            <Controller
              control={control}
              name="locationInfo"
              render={({ field: { onChange, value } }) => (
                <FormField
                  label="Localizacao"
                  errorMsg={errors.locationInfo?.message}
                  hasError={!!errors.locationInfo}
                >
                  <Input
                    placeholder="Informe um ponto de referência"
                    value={value}
                    onChangeText={onChange}
                    hasError={!!errors.locationInfo}
                    editable={!createReportMutation.isPending}
                  />
                </FormField>
              )}
            />
          </View>

          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={createReportMutation.isPending}
            className="mt-8"
          >
            <Text>
              {createReportMutation.isPending ? (
                <ActivityIndicator
                  size={16}
                  className="text-primary-foreground"
                />
              ) : (
                'Enviar Relatório'
              )}
            </Text>
          </Button>

          <View className="mt-8 flex-row items-center gap-2 w-full justify-center">
            <Pressable
              onPress={() => router.back()}
              disabled={createReportMutation.isPending}
            >
              <Text className="text-primary font-semibold">Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
