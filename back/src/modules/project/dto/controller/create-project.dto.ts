import { createZodDto } from 'nestjs-zod';
import { ProjectCreateCommand } from '../../../../../libs/contracts';

export class ProjectCreateRequestDto extends createZodDto(
  ProjectCreateCommand.RequestSchema,
) {}

export class ProjectCreateResponseDto extends createZodDto(
  ProjectCreateCommand.ResponseSchema,
) {
  constructor(project: Partial<ProjectCreateResponseDto>) {
    super();
    Object.assign(this, project);
    return this;
  }
}
