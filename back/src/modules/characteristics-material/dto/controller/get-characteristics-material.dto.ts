import { createZodDto } from 'nestjs-zod';
import { CharacteristicsMaterialGetCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type CharacteristicsMaterialGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class CharacteristicsMaterialGetResponseDto extends createZodDto(CharacteristicsMaterialGetCommand.ResponseSchema) {}
