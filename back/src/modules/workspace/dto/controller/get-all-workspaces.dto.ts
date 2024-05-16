import { createZodDto } from 'nestjs-zod';
import { WorkspaceGetAllCommand } from '@numart/house-admin-contracts';

export class WorkspaceGetAllResponseDto extends createZodDto(WorkspaceGetAllCommand.ResponseSchema) {}
