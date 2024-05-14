import { createZodDto } from 'nestjs-zod';
import { PriceChangingGetCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type PriceChangingGetRequestParamDto =
  EntityUrlParamCommand.RequestUuidParam;

export class PriceChangingGetResponseDto extends createZodDto(
  PriceChangingGetCommand.ResponseSchema,
) {}
