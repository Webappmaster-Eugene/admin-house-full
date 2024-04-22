import { createZodDto } from 'nestjs-zod';
import { TypeFieldGetCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type TypeFieldGetRequestParamDto =
  EntityUrlParamCommand.RequestUuidParam;

export class TypeFieldGetResponseDto extends createZodDto(
  TypeFieldGetCommand.ResponseSchema,
) {}
