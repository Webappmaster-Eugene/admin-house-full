import { createZodDto } from 'nestjs-zod';
import { WorkspaceGetAllCommand } from 'libs/contracts';

export class WorkspaceGetAllResponseDto extends createZodDto(WorkspaceGetAllCommand.ResponseSchema) {}
