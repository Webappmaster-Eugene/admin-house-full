import { createZodDto } from 'nestjs-zod';
import { FieldVariantsForSelectorFieldTypeDeleteCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type FieldVariantsForSelectorFieldTypeDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldVariantsForSelectorFieldTypeDeleteResponseDto extends createZodDto(
  FieldVariantsForSelectorFieldTypeDeleteCommand.ResponseSchema,
) {}
