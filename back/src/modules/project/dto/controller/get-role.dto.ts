import { createZodDto } from 'nestjs-zod';
import { ProjectGetCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type ProjectGetRequestParamDto = EntityUrlParamCommand.RequestParam;

export class ProjectGetResponseDto extends createZodDto(
  ProjectGetCommand.ResponseSchema,
) {
  constructor(project: Partial<ProjectGetResponseDto>) {
    super();
    Object.assign(this, project);
    return this;
  }
}
