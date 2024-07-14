import { createZodDto } from 'nestjs-zod';
import { FieldVariantsForSelectorFieldTypeGetCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type FieldVariantsForSelectorFieldTypeGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldVariantsForSelectorFieldTypeGetResponseDto extends createZodDto(
  FieldVariantsForSelectorFieldTypeGetCommand.ResponseSchema,
) {}
