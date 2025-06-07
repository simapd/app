import { z } from 'zod'

export const createReportSchema = z.object({
  description: z
    .string()
    .min(1, 'Descrição é obrigatória')
    .min(10, 'Descrição deve ter pelo menos 10 caracteres')
    .max(500, 'Descrição deve ter no máximo 500 caracteres'),
  locationInfo: z
    .string()
    .max(100, 'Localização deve ter no máximo 100 caracteres')
    .optional()
    .or(z.literal('')),
})

export type CreateReportFormData = z.infer<typeof createReportSchema> 