import { createZodDto } from 'nestjs-zod';
import { EntityUrlParamCommand } from 'libs/contracts';
import { WorkspaceChangeOwnerCommand } from 'libs/contracts';

export type WorkspaceChangeOwnerRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class WorkspaceChangeOwnerRequestDto extends createZodDto(WorkspaceChangeOwnerCommand.RequestSchema) {}

export class WorkspaceChangeOwnerResponseDto extends createZodDto(WorkspaceChangeOwnerCommand.ResponseSchema) {}
