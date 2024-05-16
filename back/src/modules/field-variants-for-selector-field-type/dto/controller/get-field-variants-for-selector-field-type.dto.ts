import { createZodDto } from 'nestjs-zod';
import { FieldVariantsForSelectorFieldTypeGetCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type FieldVariantsForSelectorFieldTypeGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldVariantsForSelectorFieldTypeGetResponseDto extends createZodDto(
  FieldVariantsForSelectorFieldTypeGetCommand.ResponseSchema,
) {}
