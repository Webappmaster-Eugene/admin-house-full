import { createZodDto } from 'nestjs-zod';
import { AuthGenerateKeyCommand } from '../../../../../libs/contracts';

export class AuthGenerateKeyRequestDto extends createZodDto(
  AuthGenerateKeyCommand.RequestSchema,
) {}

export class AuthGenerateKeyResponseDto extends createZodDto(
  AuthGenerateKeyCommand.ResponseSchema,
) {
  constructor(auth: Partial<AuthGenerateKeyResponseDto>) {
    super();
    Object.assign(this, auth);
    return this;
  }
}
