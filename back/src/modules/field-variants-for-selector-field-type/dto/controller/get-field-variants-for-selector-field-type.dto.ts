import { createZodDto } from 'nestjs-zod';
import { FieldVariantsForSelectorFieldTypeGetCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type FieldVariantsForSelectorFieldTypeGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldVariantsForSelectorFieldTypeGetResponseDto extends createZodDto(
  FieldVariantsForSelectorFieldTypeGetCommand.ResponseSchema,
) {}
