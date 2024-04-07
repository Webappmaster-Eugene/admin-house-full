import { createZodDto } from 'nestjs-zod';
import { WorkspaceGetCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type WorkspaceGetRequestParamDto = EntityUrlParamCommand.RequestParam;

export class WorkspaceGetResponseDto extends createZodDto(
  WorkspaceGetCommand.ResponseSchema,
) {
  constructor(workspace: Partial<WorkspaceGetResponseDto>) {
    super();
    Object.assign(this, workspace);
    return this;
  }
}
