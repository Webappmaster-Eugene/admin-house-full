import { createZodDto } from 'nestjs-zod';
import { ProjectGetAllCommand } from '../../../../../libs/contracts';

export class ProjectGetAllResponseDto extends createZodDto(ProjectGetAllCommand.ResponseSchema) {}
