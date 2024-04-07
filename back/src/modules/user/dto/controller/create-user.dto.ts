import { createZodDto } from 'nestjs-zod';
import { UserCreateCommand } from '../../../../../libs/contracts';

export class UserCreateRequestDto extends createZodDto(
  UserCreateCommand.RequestSchema,
) {}

export class UserCreateResponseDto extends createZodDto(
  UserCreateCommand.ResponseSchema,
) {
  constructor(user: Partial<UserCreateResponseDto>) {
    super();
    Object.assign(this, user);
    return this;
  }
}
