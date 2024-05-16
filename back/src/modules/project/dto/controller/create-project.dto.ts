import { createZodDto } from 'nestjs-zod';
import { ProjectCreateCommand } from '@numart/house-admin-contracts';

export class ProjectCreateRequestDto extends createZodDto(ProjectCreateCommand.RequestSchema) {}

export class ProjectCreateResponseDto extends createZodDto(ProjectCreateCommand.ResponseSchema) {}
