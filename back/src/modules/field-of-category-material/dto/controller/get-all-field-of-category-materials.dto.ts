import { createZodDto } from 'nestjs-zod';
import { FieldOfCategoryMaterialGetAllCommand } from '@numart/house-admin-contracts';

export class FieldOfCategoryMaterialGetAllResponseDto extends createZodDto(FieldOfCategoryMaterialGetAllCommand.ResponseSchema) {}
