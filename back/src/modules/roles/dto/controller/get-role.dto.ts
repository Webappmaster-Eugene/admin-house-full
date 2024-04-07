import { createZodDto } from 'nestjs-zod';
import { RoleGetCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type RoleGetRequestParamDto = EntityUrlParamCommand.RequestParam;

export class RoleGetResponseDto extends createZodDto(
  RoleGetCommand.ResponseSchema,
) {
  constructor(project: Partial<RoleGetResponseDto>) {
    super();
    Object.assign(this, project);
    return this;
  }
}
