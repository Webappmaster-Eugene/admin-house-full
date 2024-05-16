import { createZodDto } from 'nestjs-zod';
import { GlobalCategoryMaterialGetAllCommand } from '@numart/house-admin-contracts';

export class GlobalCategoryMaterialGetAllResponseDto extends createZodDto(GlobalCategoryMaterialGetAllCommand.ResponseSchema) {}
