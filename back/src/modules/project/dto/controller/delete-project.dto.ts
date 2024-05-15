import { createZodDto } from 'nestjs-zod';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';
import { ProjectDeleteCommand } from '../../../../../libs/contracts/commands/project/delete.command';

export type ProjectDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class ProjectDeleteResponseDto extends createZodDto(ProjectDeleteCommand.ResponseSchema) {}
