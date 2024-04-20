import { createZodDto } from 'nestjs-zod';
import { ProjectUpdateCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type ProjectUpdateRequestParamDto =
  EntityUrlParamCommand.RequestUuidParam;

export class ProjectUpdateRequestDto extends createZodDto(
  ProjectUpdateCommand.RequestSchema,
) {}

export class ProjectUpdateResponseDto extends createZodDto(
  ProjectUpdateCommand.ResponseSchema,
) {}
