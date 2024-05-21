import { createZodDto } from 'nestjs-zod';
import { CharacteristicsMaterialCreateCommand } from '@numart/house-admin-contracts';

export class CharacteristicsMaterialCreateRequestDto extends createZodDto(CharacteristicsMaterialCreateCommand.RequestSchema) {}

export class CharacteristicsMaterialCreateResponseDto extends createZodDto(CharacteristicsMaterialCreateCommand.ResponseSchema) {}
