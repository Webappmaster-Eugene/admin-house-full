import { createZodDto } from 'nestjs-zod';
import { CharacteristicsMaterialGetCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type CharacteristicsMaterialGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class CharacteristicsMaterialGetResponseDto extends createZodDto(CharacteristicsMaterialGetCommand.ResponseSchema) {}
