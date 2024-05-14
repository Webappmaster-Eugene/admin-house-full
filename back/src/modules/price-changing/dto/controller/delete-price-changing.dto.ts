import { createZodDto } from 'nestjs-zod';
import { PriceChangingDeleteCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type PriceChangingDeleteRequestParamDto =
  EntityUrlParamCommand.RequestUuidParam;

export class PriceChangingDeleteResponseDto extends createZodDto(
  PriceChangingDeleteCommand.ResponseSchema,
) {}
