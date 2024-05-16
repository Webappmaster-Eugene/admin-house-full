import { createZodDto } from 'nestjs-zod';
import { ProjectUpdateCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type ProjectUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class ProjectUpdateRequestDto extends createZodDto(ProjectUpdateCommand.RequestSchema) {}

export class ProjectUpdateResponseDto extends createZodDto(ProjectUpdateCommand.ResponseSchema) {}
