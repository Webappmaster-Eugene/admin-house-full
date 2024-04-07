import { createZodDto } from 'nestjs-zod';
import { AuthCreateCommand } from '../../../../../libs/contracts';
import { Auth } from '@prisma/client';

export class AuthCreateRequestDto extends createZodDto(
  AuthCreateCommand.RequestSchema,
) {}

export class AuthCreateResponseDto extends createZodDto(
  AuthCreateCommand.ResponseSchema,
) {
  constructor(role: Partial<AuthCreateResponseDto>) {
    super();
    Object.assign(this, role);
    return this;
  }
}
