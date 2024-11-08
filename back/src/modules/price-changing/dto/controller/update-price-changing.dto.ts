import { createZodDto } from 'nestjs-zod';
import { PriceChangingUpdateCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type PriceChangingUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class PriceChangingUpdateRequestDto extends createZodDto(PriceChangingUpdateCommand.RequestSchema) {}

export class PriceChangingUpdateResponseDto extends createZodDto(PriceChangingUpdateCommand.ResponseSchema) {}
