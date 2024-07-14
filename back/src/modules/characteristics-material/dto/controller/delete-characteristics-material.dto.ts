import { createZodDto } from 'nestjs-zod';
import { CharacteristicsMaterialDeleteCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type CharacteristicsMaterialDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class CharacteristicsMaterialDeleteResponseDto extends createZodDto(CharacteristicsMaterialDeleteCommand.ResponseSchema) {}
