import { createZodDto } from 'nestjs-zod';
import { FieldOfMaterialGetAllCommand } from '../../../../../libs/contracts';

export class FieldOfMaterialGetAllResponseDto extends createZodDto(FieldOfMaterialGetAllCommand.ResponseSchema) {}
