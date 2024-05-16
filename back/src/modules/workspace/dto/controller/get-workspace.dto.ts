import { createZodDto } from 'nestjs-zod';
import { WorkspaceGetCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type WorkspaceGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class WorkspaceGetResponseDto extends createZodDto(WorkspaceGetCommand.ResponseSchema) {}
