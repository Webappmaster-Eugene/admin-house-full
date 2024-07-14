import { createZodDto } from 'nestjs-zod';
import { PriceChangingGetCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type PriceChangingGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class PriceChangingGetResponseDto extends createZodDto(PriceChangingGetCommand.ResponseSchema) {}
