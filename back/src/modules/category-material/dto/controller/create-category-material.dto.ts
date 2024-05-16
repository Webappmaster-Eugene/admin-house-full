import { createZodDto } from 'nestjs-zod';
import { CategoryMaterialCreateCommand } from '@numart/house-admin-contracts';

export class CategoryMaterialCreateRequestDto extends createZodDto(CategoryMaterialCreateCommand.RequestSchema) {}

export class CategoryMaterialCreateResponseDto extends createZodDto(CategoryMaterialCreateCommand.ResponseSchema) {}
