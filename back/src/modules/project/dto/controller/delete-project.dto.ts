import { createZodDto } from 'nestjs-zod';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { ProjectDeleteCommand } from '@numart/house-admin-contracts/commands/project/delete.command';

export type ProjectDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class ProjectDeleteResponseDto extends createZodDto(ProjectDeleteCommand.ResponseSchema) {}
