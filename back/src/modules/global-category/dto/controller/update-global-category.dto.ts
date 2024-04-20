import { createZodDto } from 'nestjs-zod';
import { GlobalCategoryUpdateCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type GlobalCategoryUpdateRequestParamDto =
  EntityUrlParamCommand.RequestUuidParam;

export class GlobalCategoryUpdateRequestDto extends createZodDto(
  GlobalCategoryUpdateCommand.RequestSchema,
) {}

export class GlobalCategoryUpdateResponseDto extends createZodDto(
  GlobalCategoryUpdateCommand.ResponseSchema,
) {}
