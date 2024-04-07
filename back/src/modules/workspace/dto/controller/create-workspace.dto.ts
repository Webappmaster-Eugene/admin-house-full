import { createZodDto } from 'nestjs-zod';
import { WorkspaceCreateCommand } from '../../../../../libs/contracts';
import { Workspace } from '@prisma/client';

export class WorkspaceCreateRequestDto extends createZodDto(
  WorkspaceCreateCommand.RequestSchema,
) {}

export class WorkspaceCreateResponseDto extends createZodDto(
  WorkspaceCreateCommand.ResponseSchema,
) {
  constructor(workspace: Partial<WorkspaceCreateResponseDto>) {
    super();
    Object.assign(this, workspace);
    return this;
  }
}
