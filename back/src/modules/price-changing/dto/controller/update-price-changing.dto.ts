import { createZodDto } from 'nestjs-zod';
import { PriceChangingUpdateCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type PriceChangingUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class PriceChangingUpdateRequestDto extends createZodDto(PriceChangingUpdateCommand.RequestSchema) {}

export class PriceChangingUpdateResponseDto extends createZodDto(PriceChangingUpdateCommand.ResponseSchema) {}
