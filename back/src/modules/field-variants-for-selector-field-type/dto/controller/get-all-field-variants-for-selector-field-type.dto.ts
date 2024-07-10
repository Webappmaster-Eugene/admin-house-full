import { createZodDto } from 'nestjs-zod';
import { FieldVariantsForSelectorFieldTypeGetAllCommand } from 'libs/contracts';

export class FieldVariantsForSelectorFieldTypeGetAllResponseDto extends createZodDto(
  FieldVariantsForSelectorFieldTypeGetAllCommand.ResponseSchema,
) {}
