import { createZodDto } from 'nestjs-zod';
import { WorkspaceDeleteCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type WorkspaceDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class WorkspaceDeleteResponseDto extends createZodDto(WorkspaceDeleteCommand.ResponseSchema) {}
