import * as z from 'zod';

export const profileSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  email: z.string().email({ message: 'Correo electrónico inválido' })
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Requerida' }),
    newPassword: z.string().min(8, {
      message: 'La nueva contraseña debe tener al menos 8 caracteres.'
    }),
    confirmNewPassword: z.string().min(1, { message: 'Requerida' })
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmNewPassword']
  });

export type ProfileFormValues = z.infer<typeof profileSchema>;
export type PasswordFormValues = z.infer<typeof passwordSchema>;
