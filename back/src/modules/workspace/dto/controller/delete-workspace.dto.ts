import { createZodDto } from 'nestjs-zod';
import { WorkspaceDeleteCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type WorkspaceDeleteRequestParamDto =
  EntityUrlParamCommand.RequestUuidParam;

export class WorkspaceDeleteResponseDto extends createZodDto(
  WorkspaceDeleteCommand.ResponseSchema,
) {}
