import { createZodDto } from 'nestjs-zod';
import { UserRegisterCommand } from '../../../../libs/contracts/commands/auth';

export class RegisterRequestDto extends createZodDto(
  UserRegisterCommand.RequestSchema,
) {}

export class RegisterResponseDto extends createZodDto(
  UserRegisterCommand.ResponseSchema,
) {}
