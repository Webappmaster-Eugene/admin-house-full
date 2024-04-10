import { createZodDto } from 'nestjs-zod';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';
import { WorkspaceChangeOwnerCommand } from '../../../../../libs/contracts/commands/workspace/change-owner.command';

export type WorkspaceChangeOwnerRequestParamDto =
  EntityUrlParamCommand.RequestUuidParam;

export class WorkspaceChangeOwnerRequestDto extends createZodDto(
  WorkspaceChangeOwnerCommand.RequestSchema,
) {}

export class WorkspaceChangeOwnerResponseDto extends createZodDto(
  WorkspaceChangeOwnerCommand.ResponseSchema,
) {
  constructor(workspace: Partial<WorkspaceChangeOwnerResponseDto>) {
    super();
    Object.assign(this, workspace);
    return this;
  }
}
