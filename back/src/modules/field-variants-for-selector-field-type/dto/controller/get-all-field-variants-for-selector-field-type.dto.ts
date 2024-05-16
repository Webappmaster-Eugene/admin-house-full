import { createZodDto } from 'nestjs-zod';
import { FieldVariantsForSelectorFieldTypeGetAllCommand } from '@numart/house-admin-contracts';

export class FieldVariantsForSelectorFieldTypeGetAllResponseDto extends createZodDto(
  FieldVariantsForSelectorFieldTypeGetAllCommand.ResponseSchema,
) {}
