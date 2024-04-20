import { createZodDto } from 'nestjs-zod';
import { WorkspaceCreateCommand } from '../../../../../libs/contracts';

export class WorkspaceCreateRequestDto extends createZodDto(
  WorkspaceCreateCommand.RequestSchema,
) {}

export class WorkspaceCreateResponseDto extends createZodDto(
  WorkspaceCreateCommand.ResponseSchema,
) {}
