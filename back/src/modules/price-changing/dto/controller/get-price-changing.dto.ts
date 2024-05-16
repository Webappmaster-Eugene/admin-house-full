import { createZodDto } from 'nestjs-zod';
import { PriceChangingGetCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type PriceChangingGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class PriceChangingGetResponseDto extends createZodDto(PriceChangingGetCommand.ResponseSchema) {}
