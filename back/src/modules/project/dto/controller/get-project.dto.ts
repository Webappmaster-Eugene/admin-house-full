import { createZodDto } from 'nestjs-zod';
import { ProjectGetCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type ProjectGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class ProjectGetResponseDto extends createZodDto(ProjectGetCommand.ResponseSchema) {}
