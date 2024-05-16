import { createZodDto } from 'nestjs-zod';
import { FieldVariantsForSelectorFieldTypeDeleteCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type FieldVariantsForSelectorFieldTypeDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldVariantsForSelectorFieldTypeDeleteResponseDto extends createZodDto(
  FieldVariantsForSelectorFieldTypeDeleteCommand.ResponseSchema,
) {}
