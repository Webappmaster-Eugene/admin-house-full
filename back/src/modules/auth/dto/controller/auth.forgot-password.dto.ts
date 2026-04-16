import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const ForgotPasswordRequestSchema = z.object({
  email: z.string().email('Email должен быть корректным адресом электронной почты'),
});

const ForgotPasswordResponseSchema = z.object({
  data: z.object({
    message: z.string(),
  }),
  statusCode: z.number(),
  message: z.string(),
});

export class ForgotPasswordRequestDto extends createZodDto(ForgotPasswordRequestSchema) {}
export class ForgotPasswordResponseDto extends createZodDto(ForgotPasswordResponseSchema) {}
