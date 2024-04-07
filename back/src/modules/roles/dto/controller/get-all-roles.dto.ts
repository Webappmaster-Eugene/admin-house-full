import { createZodDto } from 'nestjs-zod';
import { RoleGetAllCommand } from '../../../../../libs/contracts';

export class RoleGetAllResponseDto extends createZodDto(
  RoleGetAllCommand.ResponseSchema,
) {
  constructor(project: Partial<RoleGetAllResponseDto>) {
    super();
    Object.assign(this, project);
    return this;
  }
}
