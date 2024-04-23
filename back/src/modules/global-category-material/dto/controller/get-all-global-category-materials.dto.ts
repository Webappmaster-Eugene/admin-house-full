import { createZodDto } from 'nestjs-zod';
import { GlobalCategoryMaterialGetAllCommand } from '../../../../../libs/contracts';

export class GlobalCategoryMaterialGetAllResponseDto extends createZodDto(
  GlobalCategoryMaterialGetAllCommand.ResponseSchema,
) {}
