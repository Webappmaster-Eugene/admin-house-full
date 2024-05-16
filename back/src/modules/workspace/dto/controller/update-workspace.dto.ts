import { createZodDto } from 'nestjs-zod';
import { WorkspaceUpdateCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type WorkspaceUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class WorkspaceUpdateRequestDto extends createZodDto(WorkspaceUpdateCommand.RequestSchema) {}

export class WorkspaceUpdateResponseDto extends createZodDto(WorkspaceUpdateCommand.ResponseSchema) {}
