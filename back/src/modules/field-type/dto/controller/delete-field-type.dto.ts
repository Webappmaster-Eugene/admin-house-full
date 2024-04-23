import { createZodDto } from 'nestjs-zod';
import { FieldTypeDeleteCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type FieldTypeDeleteRequestParamDto =
  EntityUrlParamCommand.RequestUuidParam;

export class FieldTypeDeleteResponseDto extends createZodDto(
  FieldTypeDeleteCommand.ResponseSchema,
) {}
