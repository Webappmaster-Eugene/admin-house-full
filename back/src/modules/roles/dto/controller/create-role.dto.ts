import { createZodDto } from 'nestjs-zod';
import { RoleCreateCommand } from '../../../../../libs/contracts';

export class RoleCreateRequestDto extends createZodDto(
  RoleCreateCommand.RequestSchema,
) {}

export class RoleCreateResponseDto extends createZodDto(
  RoleCreateCommand.ResponseSchema,
) {
  constructor(role: Partial<RoleCreateResponseDto>) {
    super();
    Object.assign(this, role);
    return this;
  }
}
