import { createZodDto } from 'nestjs-zod';
import { CharacteristicsMaterialDeleteCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';

export type CharacteristicsMaterialDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class CharacteristicsMaterialDeleteResponseDto extends createZodDto(CharacteristicsMaterialDeleteCommand.ResponseSchema) {}
