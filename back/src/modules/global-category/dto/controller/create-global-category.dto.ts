import { createZodDto } from 'nestjs-zod';
import { GlobalCategoryCreateCommand } from '../../../../../libs/contracts';

export class GlobalCategoryCreateRequestDto extends createZodDto(
  GlobalCategoryCreateCommand.RequestSchema,
) {}

export class GlobalCategoryCreateResponseDto extends createZodDto(
  GlobalCategoryCreateCommand.ResponseSchema,
) {}
