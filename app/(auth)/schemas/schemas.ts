import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail deve ser válido')
    .max(150, 'E-mail deve ter no máximo 150 caracteres'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(50, 'Senha deve ter no máximo 50 caracteres'),
})

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Nome é obrigatório')
      .max(150, 'Nome deve ter no máximo 150 caracteres'),
    email: z
      .string()
      .min(1, 'E-mail é obrigatório')
      .email('E-mail deve ser válido')
      .max(150, 'E-mail deve ter no máximo 150 caracteres'),
    password: z
      .string()
      .min(1, 'Senha é obrigatória')
      .min(6, 'Senha deve ter pelo menos 6 caracteres')
      .max(50, 'Senha deve ter no máximo 50 caracteres'),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
    areaId: z
      .string()
      .min(1, 'Área de risco é obrigatória')
      .cuid2('ID de área de risco inválido'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Senhas não coincidem',
    path: ['confirmPassword'],
  })

export type LoginFormData = z.infer<typeof loginSchema>
export type SignupFormData = z.infer<typeof signupSchema>

export interface RiskAreaDto {
  id: string
  name: string
  latitude: number
  longitude: number
}

export interface PagedResponseDto<T> {
  pageNumber: number
  pageSize: number
  totalPages: number
  totalRecords: number
  data: T[]
}
