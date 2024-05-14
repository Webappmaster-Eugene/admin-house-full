import { createZodDto } from 'nestjs-zod';
import { CategoryMaterialCreateCommand } from '../../../../../libs/contracts';

export class CategoryMaterialCreateRequestDto extends createZodDto(
  CategoryMaterialCreateCommand.RequestSchema,
) {}

export class CategoryMaterialCreateResponseDto extends createZodDto(
  CategoryMaterialCreateCommand.ResponseSchema,
) {}
