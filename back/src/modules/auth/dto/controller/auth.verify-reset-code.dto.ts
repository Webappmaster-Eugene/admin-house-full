import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const VerifyResetCodeRequestSchema = z.object({
  email: z.string().email('Email должен быть корректным адресом электронной почты'),
  code: z.string().length(6, 'Код должен содержать 6 символов'),
});

const VerifyResetCodeResponseSchema = z.object({
  data: z.object({
    message: z.string(),
  }),
  statusCode: z.number(),
  message: z.string(),
});

export class VerifyResetCodeRequestDto extends createZodDto(VerifyResetCodeRequestSchema) {}
export class VerifyResetCodeResponseDto extends createZodDto(VerifyResetCodeResponseSchema) {}
