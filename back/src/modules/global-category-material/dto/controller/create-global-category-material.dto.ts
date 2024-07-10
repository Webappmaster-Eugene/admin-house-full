import { createZodDto } from 'nestjs-zod';
import { GlobalCategoryMaterialCreateCommand } from 'libs/contracts';

export class GlobalCategoryMaterialCreateRequestDto extends createZodDto(GlobalCategoryMaterialCreateCommand.RequestSchema) {}

export class GlobalCategoryMaterialCreateResponseDto extends createZodDto(GlobalCategoryMaterialCreateCommand.ResponseSchema) {}
