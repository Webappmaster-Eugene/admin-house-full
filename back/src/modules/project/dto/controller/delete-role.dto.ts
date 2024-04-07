import { createZodDto } from 'nestjs-zod';
import { ProjectDeleteCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type ProjectDeleteRequestParamDto = EntityUrlParamCommand.RequestParam;

export class ProjectDeleteResponseDto extends createZodDto(
  ProjectDeleteCommand.ResponseSchema,
) {
  constructor(project: Partial<ProjectDeleteResponseDto>) {
    super();
    Object.assign(this, project);
    return this;
  }
}
