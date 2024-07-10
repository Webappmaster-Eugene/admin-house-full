import { createZodDto } from 'nestjs-zod';
import { CharacteristicsMaterialGetCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';

export type CharacteristicsMaterialGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class CharacteristicsMaterialGetResponseDto extends createZodDto(CharacteristicsMaterialGetCommand.ResponseSchema) {}
