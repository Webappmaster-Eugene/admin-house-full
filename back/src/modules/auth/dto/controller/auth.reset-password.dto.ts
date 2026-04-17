import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const ResetPasswordRequestSchema = z
  .object({
    email: z.string().email('Email должен быть корректным адресом электронной почты'),
    code: z.string().length(6, 'Код должен содержать 6 символов'),
    password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
    confirmPassword: z.string().min(6, 'Подтверждение пароля обязательно'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Пароли должны совпадать',
    path: ['confirmPassword'],
  });

const ResetPasswordResponseSchema = z.object({
  data: z.object({
    message: z.string(),
  }),
  statusCode: z.number(),
  message: z.string(),
});

export class ResetPasswordRequestDto extends createZodDto(ResetPasswordRequestSchema) {}
export class ResetPasswordResponseDto extends createZodDto(ResetPasswordResponseSchema) {}
