import { createZodDto } from 'nestjs-zod';
import { TypeFieldUpdateCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type TypeFieldUpdateRequestParamDto =
  EntityUrlParamCommand.RequestUuidParam;

export class TypeFieldUpdateRequestDto extends createZodDto(
  TypeFieldUpdateCommand.RequestSchema,
) {}

export class TypeFieldUpdateResponseDto extends createZodDto(
  TypeFieldUpdateCommand.ResponseSchema,
) {}
