import { createZodDto } from 'nestjs-zod';
import { ProjectGetAllCommand } from '../../../../../libs/contracts';

export class ProjectGetAllResponseDto extends createZodDto(
  ProjectGetAllCommand.ResponseSchema,
) {
  constructor(project: Partial<ProjectGetAllResponseDto>) {
    super();
    Object.assign(this, project);
    return this;
  }
}
