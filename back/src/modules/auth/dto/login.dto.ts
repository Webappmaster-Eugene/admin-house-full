import { createZodDto } from 'nestjs-zod';
import { UserLoginCommand } from '../../../../libs/contracts';

export class LoginRequestDto extends createZodDto(
  UserLoginCommand.RequestSchema,
) {}

export class LoginResponseDto extends createZodDto(
  UserLoginCommand.ResponseSchema,
) {}
