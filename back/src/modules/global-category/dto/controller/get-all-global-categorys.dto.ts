import { createZodDto } from 'nestjs-zod';
import { GlobalCategoryGetAllCommand } from '../../../../../libs/contracts';

export class GlobalCategoryGetAllResponseDto extends createZodDto(
  GlobalCategoryGetAllCommand.ResponseSchema,
) {}
