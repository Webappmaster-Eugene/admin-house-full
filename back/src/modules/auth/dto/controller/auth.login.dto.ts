import { createZodDto } from 'nestjs-zod';
import { AuthLoginCommand } from '../../../../../libs/contracts';

export class AuthLoginRequestDto extends createZodDto(
  AuthLoginCommand.RequestSchema,
) {}

export class AuthLoginResponseDto extends createZodDto(
  AuthLoginCommand.ResponseSchema,
) {}
