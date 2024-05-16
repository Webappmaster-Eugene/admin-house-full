import { createZodDto } from 'nestjs-zod';
import { FieldVariantsForSelectorFieldTypeUpdateCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type FieldVariantsForSelectorFieldTypeUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldVariantsForSelectorFieldTypeUpdateRequestDto extends createZodDto(
  FieldVariantsForSelectorFieldTypeUpdateCommand.RequestSchema,
) {}

export class FieldVariantsForSelectorFieldTypeUpdateResponseDto extends createZodDto(
  FieldVariantsForSelectorFieldTypeUpdateCommand.ResponseSchema,
) {}
