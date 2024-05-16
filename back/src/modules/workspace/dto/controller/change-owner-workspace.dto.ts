import { createZodDto } from 'nestjs-zod';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { WorkspaceChangeOwnerCommand } from '@numart/house-admin-contracts/commands/workspace/change-owner.command';

export type WorkspaceChangeOwnerRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class WorkspaceChangeOwnerRequestDto extends createZodDto(WorkspaceChangeOwnerCommand.RequestSchema) {}

export class WorkspaceChangeOwnerResponseDto extends createZodDto(WorkspaceChangeOwnerCommand.ResponseSchema) {}
