import { createZodDto } from 'nestjs-zod';
import { CategoryMaterialGetAllCommand } from '@numart/house-admin-contracts';

export class CategoryMaterialGetAllResponseDto extends createZodDto(CategoryMaterialGetAllCommand.ResponseSchema) {}
