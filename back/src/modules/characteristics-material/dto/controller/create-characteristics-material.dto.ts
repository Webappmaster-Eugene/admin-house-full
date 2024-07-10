import { createZodDto } from 'nestjs-zod';
import { CharacteristicsMaterialCreateCommand } from 'libs/contracts';

export class CharacteristicsMaterialCreateRequestDto extends createZodDto(CharacteristicsMaterialCreateCommand.RequestSchema) {}

export class CharacteristicsMaterialCreateResponseDto extends createZodDto(CharacteristicsMaterialCreateCommand.ResponseSchema) {}
