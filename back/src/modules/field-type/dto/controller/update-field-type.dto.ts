import { createZodDto } from 'nestjs-zod';
import { FieldTypeUpdateCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type FieldTypeUpdateRequestParamDto =
  EntityUrlParamCommand.RequestUuidParam;

export class FieldTypeUpdateRequestDto extends createZodDto(
  FieldTypeUpdateCommand.RequestSchema,
) {}

export class FieldTypeUpdateResponseDto extends createZodDto(
  FieldTypeUpdateCommand.ResponseSchema,
) {}
