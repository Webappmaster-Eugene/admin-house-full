import { createZodDto } from 'nestjs-zod';
import { FieldTypeGetCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type FieldTypeGetRequestParamDto =
  EntityUrlParamCommand.RequestUuidParam;

export class FieldTypeGetResponseDto extends createZodDto(
  FieldTypeGetCommand.ResponseSchema,
) {}
