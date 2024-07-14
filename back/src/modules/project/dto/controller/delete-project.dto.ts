import { createZodDto } from 'nestjs-zod';
import { EntityUrlParamCommand } from 'libs/contracts';
import { ProjectDeleteCommand } from 'libs/contracts';

export type ProjectDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class ProjectDeleteResponseDto extends createZodDto(ProjectDeleteCommand.ResponseSchema) {}
