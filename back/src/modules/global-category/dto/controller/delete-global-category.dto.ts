import { createZodDto } from 'nestjs-zod';
import { GlobalCategoryDeleteCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type GlobalCategoryDeleteRequestParamDto =
  EntityUrlParamCommand.RequestUuidParam;

export class GlobalCategoryDeleteResponseDto extends createZodDto(
  GlobalCategoryDeleteCommand.ResponseSchema,
) {}
