import { createZodDto } from 'nestjs-zod';
import { FieldVariantsForSelectorFieldTypeCreateCommand } from '@numart/house-admin-contracts';

export class FieldVariantsForSelectorFieldTypeCreateRequestDto extends createZodDto(
  FieldVariantsForSelectorFieldTypeCreateCommand.RequestSchema,
) {}

export class FieldVariantsForSelectorFieldTypeCreateResponseDto extends createZodDto(
  FieldVariantsForSelectorFieldTypeCreateCommand.ResponseSchema,
) {}