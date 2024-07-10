import { createZodDto } from 'nestjs-zod';
import { CategoryMaterialGetAllCommand } from 'libs/contracts';

export class CategoryMaterialGetAllResponseDto extends createZodDto(CategoryMaterialGetAllCommand.ResponseSchema) {}
