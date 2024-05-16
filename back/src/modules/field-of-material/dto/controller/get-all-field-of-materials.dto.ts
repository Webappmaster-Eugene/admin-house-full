import { createZodDto } from 'nestjs-zod';
import { FieldOfMaterialGetAllCommand } from '@numart/house-admin-contracts';

export class FieldOfMaterialGetAllResponseDto extends createZodDto(FieldOfMaterialGetAllCommand.ResponseSchema) {}
