import { createZodDto } from 'nestjs-zod';
import { WorkspaceGetCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';

export type WorkspaceGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class WorkspaceGetResponseDto extends createZodDto(WorkspaceGetCommand.ResponseSchema) {}
