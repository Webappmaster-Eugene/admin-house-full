import { createZodDto } from 'nestjs-zod';
import { RoleCreateCommand } from '../../../../../libs/contracts';
import { Role } from '@prisma/client';

export class RoleCreateRequestDto extends createZodDto(
  RoleCreateCommand.RequestSchema,
) {}

export class RoleCreateResponseDto extends createZodDto(
  RoleCreateCommand.ResponseSchema,
) {
  constructor(project: Partial<RoleCreateResponseDto>) {
    super();
    Object.assign(this, project);
    return this;
  }
}
