import { createZodDto } from 'nestjs-zod';
import { WorkspaceGetAllCommand } from '../../../../../libs/contracts';

export class WorkspaceGetAllResponseDto extends createZodDto(
  WorkspaceGetAllCommand.ResponseSchema,
) {
  constructor(workspace: Partial<WorkspaceGetAllResponseDto>) {
    super();
    Object.assign(this, workspace);
    return this;
  }
}
