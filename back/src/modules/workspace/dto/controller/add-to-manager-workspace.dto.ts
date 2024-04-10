import { createZodDto } from 'nestjs-zod';
import { WorkspaceAddUserToManagerCommand } from '../../../../../libs/contracts/commands/workspace/add-user-to-manager-workspace.command';

export class WorkspaceAddUserToManagerRequestDto extends createZodDto(
  WorkspaceAddUserToManagerCommand.RequestSchema,
) {}

export class WorkspaceAddUserToManagerResponseDto extends createZodDto(
  WorkspaceAddUserToManagerCommand.ResponseSchema,
) {
  constructor(workspace: Partial<WorkspaceAddUserToManagerResponseDto>) {
    super();
    Object.assign(this, workspace);
    return this;
  }
}
