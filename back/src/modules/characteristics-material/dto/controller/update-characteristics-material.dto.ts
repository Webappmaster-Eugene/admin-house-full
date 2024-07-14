import { createZodDto } from 'nestjs-zod';
import { CharacteristicsMaterialUpdateCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type CharacteristicsMaterialUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class CharacteristicsMaterialUpdateRequestDto extends createZodDto(CharacteristicsMaterialUpdateCommand.RequestSchema) {}

export class CharacteristicsMaterialUpdateResponseDto extends createZodDto(CharacteristicsMaterialUpdateCommand.ResponseSchema) {}
