import { createZodDto } from 'nestjs-zod';
import { CharacteristicsMaterialUpdateCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type CharacteristicsMaterialUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class CharacteristicsMaterialUpdateRequestDto extends createZodDto(CharacteristicsMaterialUpdateCommand.RequestSchema) {}

export class CharacteristicsMaterialUpdateResponseDto extends createZodDto(CharacteristicsMaterialUpdateCommand.ResponseSchema) {}
