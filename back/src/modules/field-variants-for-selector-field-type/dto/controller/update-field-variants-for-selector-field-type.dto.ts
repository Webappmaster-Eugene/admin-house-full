import { createZodDto } from 'nestjs-zod';
import { FieldVariantsForSelectorFieldTypeUpdateCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type FieldVariantsForSelectorFieldTypeUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldVariantsForSelectorFieldTypeUpdateRequestDto extends createZodDto(
  FieldVariantsForSelectorFieldTypeUpdateCommand.RequestSchema,
) {}

export class FieldVariantsForSelectorFieldTypeUpdateResponseDto extends createZodDto(
  FieldVariantsForSelectorFieldTypeUpdateCommand.ResponseSchema,
) {}
