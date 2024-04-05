import { createZodDto } from 'nestjs-zod';
import { UserRegisterCommand } from '../../../../libs/contracts';

export class RegisterRequestDto extends createZodDto(
  UserRegisterCommand.RequestSchema,
) {}

export class RegisterResponseDto extends createZodDto(
  UserRegisterCommand.ResponseSchema,
) {}
