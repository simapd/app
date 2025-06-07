import { z } from 'zod'

export const editProfileSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Nome precisa ter pelo menos 3 caracteres.' })
    .max(150, { message: 'Nome não pode ter mais que 150 caracteres.' }),
  email: z
    .string()
    .email({ message: 'Endereço de email inválido.' })
    .max(150, { message: 'Email não pode ter mais que 150 caracteres.' }),
})

export type EditProfileSchema = z.infer<typeof editProfileSchema> 