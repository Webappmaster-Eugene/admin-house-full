import { createZodDto } from 'nestjs-zod';
import { ProjectGetAllCommand } from '@numart/house-admin-contracts';

export class ProjectGetAllResponseDto extends createZodDto(ProjectGetAllCommand.ResponseSchema) {}
