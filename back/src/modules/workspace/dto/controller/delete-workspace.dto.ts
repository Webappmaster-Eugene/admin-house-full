import { createZodDto } from 'nestjs-zod';
import { WorkspaceDeleteCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type WorkspaceDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class WorkspaceDeleteResponseDto extends createZodDto(WorkspaceDeleteCommand.ResponseSchema) {}
