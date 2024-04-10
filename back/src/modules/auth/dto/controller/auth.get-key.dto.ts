import { createZodDto } from 'nestjs-zod';
import { AuthGetKeyCommand } from '../../../../../libs/contracts';

export class AuthGetKeyResponseDto extends createZodDto(
  AuthGetKeyCommand.ResponseSchema,
) {
  constructor(auth: Partial<AuthGetKeyResponseDto>) {
    super();
    Object.assign(this, auth);
    return this;
  }
}
