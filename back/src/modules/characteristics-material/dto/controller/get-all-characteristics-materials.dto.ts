import { createZodDto } from 'nestjs-zod';
import { CharacteristicsMaterialGetAllCommand } from 'libs/contracts';

export class CharacteristicsMaterialGetAllResponseDto extends createZodDto(CharacteristicsMaterialGetAllCommand.ResponseSchema) {}
