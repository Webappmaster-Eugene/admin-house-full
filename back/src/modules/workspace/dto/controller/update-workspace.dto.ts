import { createZodDto } from 'nestjs-zod';
import { WorkspaceUpdateCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type WorkspaceUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class WorkspaceUpdateRequestDto extends createZodDto(WorkspaceUpdateCommand.RequestSchema) {}

export class WorkspaceUpdateResponseDto extends createZodDto(WorkspaceUpdateCommand.ResponseSchema) {}
