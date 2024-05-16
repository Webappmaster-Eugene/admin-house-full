import { createZodDto } from 'nestjs-zod';
import { GlobalCategoryMaterialCreateCommand } from '@numart/house-admin-contracts';

export class GlobalCategoryMaterialCreateRequestDto extends createZodDto(GlobalCategoryMaterialCreateCommand.RequestSchema) {}

export class GlobalCategoryMaterialCreateResponseDto extends createZodDto(GlobalCategoryMaterialCreateCommand.ResponseSchema) {}
