import { createZodDto } from 'nestjs-zod';
import { CharacteristicsMaterialDeleteCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type CharacteristicsMaterialDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class CharacteristicsMaterialDeleteResponseDto extends createZodDto(CharacteristicsMaterialDeleteCommand.ResponseSchema) {}
