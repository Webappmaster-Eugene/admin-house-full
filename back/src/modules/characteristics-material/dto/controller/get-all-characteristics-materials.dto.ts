import { createZodDto } from 'nestjs-zod';
import { CharacteristicsMaterialGetAllCommand } from '@numart/house-admin-contracts';

export class CharacteristicsMaterialGetAllResponseDto extends createZodDto(CharacteristicsMaterialGetAllCommand.ResponseSchema) {}
