import { createZodDto } from 'nestjs-zod';
import { PriceChangingDeleteCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type PriceChangingDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class PriceChangingDeleteResponseDto extends createZodDto(PriceChangingDeleteCommand.ResponseSchema) {}
