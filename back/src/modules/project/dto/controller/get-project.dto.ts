import { createZodDto } from 'nestjs-zod';
import { ProjectGetCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type ProjectGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class ProjectGetResponseDto extends createZodDto(ProjectGetCommand.ResponseSchema) {}
