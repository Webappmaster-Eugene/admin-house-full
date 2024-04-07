import { createZodDto } from 'nestjs-zod';
import { RoleDeleteCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type RoleDeleteRequestParamDto = EntityUrlParamCommand.RequestParam;

export class RoleDeleteResponseDto extends createZodDto(
  RoleDeleteCommand.ResponseSchema,
) {
  constructor(project: Partial<RoleDeleteResponseDto>) {
    super();
    Object.assign(this, project);
    return this;
  }
}
