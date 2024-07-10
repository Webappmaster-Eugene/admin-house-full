import { createZodDto } from 'nestjs-zod';
import { FieldOfCategoryMaterialGetAllCommand } from 'libs/contracts';

export class FieldOfCategoryMaterialGetAllResponseDto extends createZodDto(FieldOfCategoryMaterialGetAllCommand.ResponseSchema) {}
