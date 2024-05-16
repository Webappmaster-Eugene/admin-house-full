import { createZodDto } from 'nestjs-zod';
import { WorkspaceCreateCommand } from '@numart/house-admin-contracts';

export class WorkspaceCreateRequestDto extends createZodDto(WorkspaceCreateCommand.RequestSchema) {}

export class WorkspaceCreateResponseDto extends createZodDto(WorkspaceCreateCommand.ResponseSchema) {}
