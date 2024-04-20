import { createZodDto } from 'nestjs-zod';
import { GlobalCategoryGetCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type GlobalCategoryGetRequestParamDto =
  EntityUrlParamCommand.RequestUuidParam;

export class GlobalCategoryGetResponseDto extends createZodDto(
  GlobalCategoryGetCommand.ResponseSchema,
) {}
