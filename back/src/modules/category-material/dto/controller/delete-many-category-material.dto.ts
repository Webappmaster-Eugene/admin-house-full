import { createZodDto } from 'nestjs-zod';

import { CategoryMaterialDeleteManyCommand } from 'libs/contracts';

export class CategoryMaterialDeleteManyRequestDto extends createZodDto(CategoryMaterialDeleteManyCommand.RequestSchema) {}

export class CategoryMaterialDeleteManyResponseDto extends createZodDto(CategoryMaterialDeleteManyCommand.ResponseSchema) {}
